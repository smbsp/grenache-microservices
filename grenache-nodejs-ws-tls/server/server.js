// Import necessary modules from Grenache, Node.js, and other utilities
const Link = require('grenache-nodejs-link') // Grenache link for peer communication
const { PeerRPCServer } = require('grenache-nodejs-ws') // Grenache WebSocket-based RPC server
const fs = require('fs') // File system module for reading certificate files
const path = require('path') // Path module for handling file paths

// Initialize and start the Grenache link, connecting to the Grape node (DHT)
const link = new Link({
  grape: 'http://127.0.0.1:30001', // Address of the Grape node (acts as a DHT for peer discovery)
})
link.start()

// Array storing the fingerprints of valid client certificates
// These are used to authenticate the clients during the handshake
const VALID_FINGERPRINTS = [
  '3D:F1:1C:C9:0F:66:07:24:A1:0F:38:4F:E8:7E:E6:64:26:66:0C:66', // Example fingerprint
]

// Function to verify the client certificate during the TLS WebSocket handshake
function verifyClient(info, cb) {
  const cert = info.req.socket.getPeerCertificate() // Get the client's certificate

  // Check if the fingerprint is in the list of valid fingerprints
  if (VALID_FINGERPRINTS.indexOf(cert.fingerprint) !== -1) {
    return cb(true) // Allow the connection if the fingerprint is valid
  }

  // Reject the connection if the fingerprint is invalid
  return cb(false, 401, 'Forbidden')
}

// Server configuration options, including secure TLS settings
const opts = {
  secure: {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'server-key.pem')), // Server's private key
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'server-crt.pem')), // Server's certificate
    ca: fs.readFileSync(path.join(__dirname, 'certs', 'ca-crt.pem')), // Certificate authority chain (optional)
    requestCert: true, // Request a certificate from the client
    rejectUnauthorized: false, // Note: This setting should be handled carefully in production (it should be `true`)
    verifyClient: verifyClient, // Use the custom function to verify the client certificate during handshake
  },
}

// Initialize the RPC server with the configured options
const peer = new PeerRPCServer(link, opts)
peer.init() // Prepare the server to handle requests

// Create a transport service to listen for incoming RPC requests
const service = peer.transport('server')
service.listen(1337) // Listen on port 1337 for RPC requests

// Announce the service periodically so it remains discoverable in the DHT
setInterval(function () {
  link.announce('rpc_whitelist_service', service.port, {}) // Announce every 1 second
}, 1000)

// Define action-based permissions for clients based on their certificate fingerprint
// For example, only specific clients are allowed to perform certain actions
const permissions = {
  deleteHarddisk: [], // No clients are allowed to perform this dangerous action
  ping: ['3D:F1:1C:C9:0F:66:07:24:A1:0F:38:4F:E8:7E:E6:64:26:66:0C:66'], // Only a specific client can perform "ping"
}

// Function to check if a client is allowed to perform a specific action
function isAllowedToPerformAction(action, fingerprint) {
  if (!permissions[action]) {
    return false // If the action is not defined in permissions, deny by default
  }

  // Allow the action if the client's fingerprint is in the list of permitted fingerprints
  if (permissions[action].indexOf(fingerprint) !== -1) {
    return true
  }

  // Deny if the fingerprint is not found in the permissions list for this action
  return false
}

// Handle incoming RPC requests and enforce action-based permissions
service.on('request', (rid, key, payload, handler, cert) => {
  // Check if the client is allowed to perform the requested action
  if (isAllowedToPerformAction(payload.action, cert.fingerprint)) {
    handler.reply(null, payload.action + ' action is allowed for this client') // Allow the action and send a success message
    return
  }

  // If the client is not allowed, respond with a forbidden error
  handler.reply(new Error('forbidden'))
})

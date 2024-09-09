// Import necessary modules from Grenache, Node.js, and other utilities
const fs = require('fs') // File system module for reading certificate files
const path = require('path') // Path module for handling file paths
const { PeerRPCClient } = require('grenache-nodejs-ws') // Grenache WebSocket-based RPC client
const Link = require('grenache-nodejs-link') // Grenache link for peer communication

// Initialize and start the Grenache link, connecting to the Grape node (DHT)
const link = new Link({
  grape: 'http://127.0.0.1:30001', // Address of the Grape node (acts as a DHT for peer discovery)
})
link.start()

// Client-side TLS configuration for secure communication with the RPC server
const secure = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'client1-key.pem')), // Client's private key
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'client1-crt.pem')), // Client's certificate
  ca: fs.readFileSync(path.join(__dirname, 'certs', 'ca-crt.pem')), // Certificate authority chain (optional)
  rejectUnauthorized: false, // Note: This setting should be handled carefully in production (it should be `true`)
}

// Initialize the RPC client with the secure TLS options
const peer = new PeerRPCClient(link, { secure: secure })
peer.init() // Prepare the client to make requests

// Make an RPC request to perform the 'ping' action on the RPC server
peer.request(
  'rpc_whitelist_service', // Service name to call
  { action: 'ping' }, // Payload containing the action to perform
  { timeout: 10000 }, // Request timeout of 10 seconds
  (err, data) => {
    // Callback function to handle the response from the server
    console.log(err, data) // Logs: null 'ping action is allowed for this client'
  }
)

// Make an RPC request to perform the 'deleteHarddisk' action, which is unauthorized
peer.request(
  'rpc_whitelist_service', // Service name to call
  { action: 'deleteHarddisk' }, // Payload containing the action to perform
  { timeout: 10000 }, // Request timeout of 10 seconds
  (err, data) => {
    // Callback function to handle the response from the server
    console.log(err, data) // Logs: Error: forbidden
  }
)

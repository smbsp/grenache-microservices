'use strict' // Enables strict mode, which helps catch common JavaScript mistakes and improves performance.

// Import Grenache HTTP client and link modules.
const Grenache = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')

// Create a new Grenache PeerRPCClient.
const Peer = Grenache.PeerRPCClient

// Set up the Link configuration, specifying the Grape node address (usually the tracker).
const link = new Link({
  grape: 'http://127.0.0.1:30001', // Address of the Grape node that facilitates peer discovery.
})
link.start() // Start the link so it can communicate with the Grape node.

// Initialize a new PeerRPCClient with the previously configured link.
const peer = new Peer(link, {})
peer.init() // Initialize the peer client to make it ready for requests.

// Define the query object. It includes an action (method) and the corresponding arguments.
// const query = {
//   action: 'getHelloWorld', // The action to be performed by the server (in this case, 'getHelloWorld').
//   args: [{ name: 'Paolo' }], // Arguments passed to the action. Here, it’s an object with a name key.
// }

const query = {
  action: 'getHostname',
  args: [{ ip: '8.8.8.8' }],
}

// Send a request to the service named 'dns:service' (this is a service name, not an actual DNS lookup).
peer.request('dns:service', query, { timeout: 10000 }, (err, data) => {
  if (err) {
    console.error(err) // Log any errors if the request fails.
    process.exit(1) // Exit the process with a failure code.
  }

  // Log the response from the server if the request is successful.
  console.log('query response:')
  console.log(data) // Display the returned data.
  console.log('---') // Separator for better readability in the console.
})

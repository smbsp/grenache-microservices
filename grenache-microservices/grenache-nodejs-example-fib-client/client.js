'use strict' // Enforces strict mode which helps in catching common coding errors and unsafe actions like global variable declarations.

// Importing the necessary modules:
// - PeerRPCClient: A client used to communicate with Grenache RPC workers over WebSocket.
// - Link: Provides the connection layer between nodes using the Grape DHT (Distributed Hash Table).
const { PeerRPCClient } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')

// Initializes and starts the Link, allowing the node to interact with the Grape DHT.
const link = new Link({
  grape: 'http://127.0.0.1:30001', // URL of the Grape node (DHT node) for peer-to-peer communication.
  requestTimeout: 10000, // Sets the timeout for Grape requests in milliseconds (10 seconds here).
})
link.start()

// Creates an instance of the PeerRPCClient for handling RPC (Remote Procedure Call) requests
// and initializes it. This client connects to the Grape DHT to find available RPC workers.
const peer = new PeerRPCClient(link, {})
peer.init()

// Payload containing the input for the RPC request. In this case, it's a number for which
// we want to find the corresponding Fibonacci sequence value.
const payload = { number: 10 }

peer.request(
  'fibonacci_worker', // The name of the worker service registered in Grape that computes Fibonacci numbers.
  payload, // The data being sent to the worker, in this case, the number 10.
  { timeout: 100000 }, // Timeout for the RPC request, in milliseconds (100 seconds here).
  (err, result) => {
    // Callback function to handle the response from the worker.
    if (err) throw err // Throws an error if the RPC request fails.
    // Logs the result, indicating the Fibonacci number at the specified position in the sequence.
    console.log(
      'Fibonacci number at place',
      payload.number,
      'in the sequence:',
      result
    )
  }
)

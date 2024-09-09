'use strict' // Enforces strict mode to catch common errors and unsafe actions (e.g., global variable declarations).

// Import the necessary modules:
// - PeerRPCServer: Used to create an RPC server that listens to requests and provides responses over WebSocket.
// - Link: Provides the connection layer for interacting with the Grape DHT (Distributed Hash Table).
const { PeerRPCServer } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')

// Returns the nth fibonacci number
function fibonacci(n) {
  if (n === 0 || n === 1) return n

  let prev1 = 1,
    prev2 = 0
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2
    prev2 = prev1
    prev1 = current
  }

  return prev1
}

// Initialize and start the Link, allowing the node to interact with the Grape DHT.
const link = new Link({
  grape: 'http://127.0.0.1:30001', // URL of the Grape node (DHT node) for peer-to-peer communication.
})
link.start()

// Create an instance of PeerRPCServer to handle incoming RPC requests and initialize it.
const peer = new PeerRPCServer(link, {})
peer.init()

// Create a transport service to handle RPC communications and set it to listen on port 1337.
const service = peer.transport('server')
service.listen(1337)

// Repeatedly announce (every second) that this service is available under the name 'fibonacci_worker'
// so that other nodes can find and use this worker for Fibonacci calculations.
setInterval(() => {
  link.announce('fibonacci_worker', service.port, {})
}, 1000)

// Listen for incoming RPC requests:
// - `rid`: Request ID, used to track requests.
// - `key`: Key used in routing.
// - `payload`: Data sent by the client, which in this case contains the number for Fibonacci calculation.
// - `handler`: Object that handles the response.
// The Fibonacci function is called with the input number, and the result is sent back as a response.
service.on('request', (rid, key, payload, handler) => {
  const result = fibonacci(payload.number)
  handler.reply(null, result)
})

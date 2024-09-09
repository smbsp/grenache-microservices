'use strict' // Enables strict mode for better error checking and improved code performance.

const { Api } = require('bfx-wrk-api') // Import the `Api` class from the Bitfinex work API library.
const dns = require('dns') // Import the native Node.js DNS module for resolving domain names and IP addresses.

class dnsService extends Api {
  // Define a new service class named `dnsService` that extends the `Api` class.

  // Method 1: Handles a simple greeting action.
  getHelloWorld(space, args, cb) {
    const name = args.name // Extract the name from the provided arguments.
    const res = 'Hello ' + name // Create a response string that includes the provided name.

    cb(null, res) // Return the response via the callback (no error, so `null` is passed as the first argument).
  }

  // Method 2: Handles DNS reverse lookup to get the hostname from an IP address.
  getHostname(space, args, cb) {
    const ip = args.ip // Extract the IP address from the provided arguments.
    if (!ip) return cb(new Error('ERR_ARGS_NO_IP')) // If no IP is provided, return an error.

    dns.reverse(ip, (err, res) => {
      // Use the `dns.reverse` method to perform a reverse lookup (IP to hostname).
      if (err) return cb(err) // If there's an error in the DNS lookup, return it via the callback.
      cb(null, [ip, res]) // If successful, return the IP and its resolved hostname(s) in an array.
    })
  }
}

module.exports = dnsService // Export the `dnsService` class so it can be used elsewhere.

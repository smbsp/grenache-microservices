
# Grenache Microservices Repository

Welcome to the **Grenache Microservices** repository! This repository showcases various Node.js clients of **Grenache**, a high-performance, decentralized microservices framework by Bitfinex. Powered by a Distributed Hash Table (DHT) network, Grenache facilitates seamless microservice communication. Whether you are looking to explore decentralized service discovery, RPC, WebSockets, or the Publisher/Subscriber model, this repository has examples to help you get started.

## What is Grenache?

Grenache is a microservices framework built on **Kademlia DHT**. It allows decentralized communication between services and leverages **Grape** nodes for orchestrating microservices. The framework is lightweight, scalable, and designed for high-availability systems that need to operate efficiently in distributed environments. 

### Key Features:
- **Decentralized Service Discovery**: Microservices register and discover each other via a DHT network.
- **RPC (Remote Procedure Call)**: Facilitates fast, scalable inter-service communication.
- **Publisher/Subscriber Messaging**: Supports message broadcasting to multiple subscribers.
- **WebSocket and HTTP Support**: Flexible transport layers for different use cases.
- **TLS Encryption**: Secure WebSocket communication with TLS.

## Repository Structure

This repository contains several folders, each demonstrating different features of Grenache using various communication methods and tools:

### 1. **grenache-microservices**
An example of basic microservice communication using Grenache's service discovery and RPC mechanisms. This is a great place to understand the fundamental setup.

#### Features:
- Service registration and discovery.
- RPC-based communication between services.

### 2. **grenache-nodejs-ws-tls**
An implementation of WebSocket-based microservices with **TLS** (Transport Layer Security) support for secure communication between services.

#### Features:
- WebSocket microservice communication.
- TLS encryption for secure transport.

### 3. **grenache-nodejs-ws**
An example demonstrating WebSocket-based communication between microservices, which offers a fast and lightweight alternative to HTTP-based communication.

#### Features:
- WebSocket-based inter-service communication.
- Low-latency messaging.

### 4. **grenache-pub-sub**
An implementation of the **Publisher/Subscriber** model in Grenache, where services can broadcast messages to multiple subscribers.

#### Features:
- Efficient message broadcasting using the Pub/Sub model.
- Real-time communication for event-driven systems.

### 5. **grenache-svc-js**
This folder contains a CLI tool, **svc-js-cli**, designed to interact with microservices built using Grenache. It simplifies microservice interactions via a command-line interface, ideal for testing and debugging.

#### Features:
- CLI tool for managing and interacting with services.
- Simplified development and testing.

## Getting Started

### Prerequisites:
- **Node.js** (v12 or higher).
- **Grenache** packages installed via npm.

To install the necessary packages, run:

\`\`\`bash
npm install grenache-grape grenache-nodejs-link grenache-nodejs-ws
\`\`\`

### Running a Grape Node

Grape is the DHT node implementation that powers the communication between services. You can start a Grape node using the following command:

\`\`\`bash
grape --dp 20001 --apw 30001
\`\`\`

This starts a Grape node on the default ports.

### Running the Examples

To run the examples provided in this repository, navigate to the specific folder (e.g., \`grenache-microservices\`) and follow the instructions in the respective folder's README.

---

## Why Grenache?

- **Decentralization**: Built on a DHT network, Grenache enables decentralized microservice discovery and communication.
- **Resilience**: The DHT architecture ensures high availability and fault tolerance.
- **Flexibility**: Easily switch between different communication methods (HTTP, WebSocket, Pub/Sub).
- **Security**: Built-in TLS support for secure WebSocket communications.

## Useful Resources

- [Grenache on GitHub](https://github.com/bitfinexcom/grenache)
- [Grenache Documentation](https://grenache.readthedocs.io/en/latest/)
- [Grenache NPM](https://www.npmjs.com/package/grenache-grape)

---

## Conclusion

This repository serves as an excellent starting point for exploring the various features of Grenache. Whether you're looking to implement decentralized service discovery or secure microservice communication with WebSockets and TLS, you'll find the examples here informative and easy to follow. Dive in and start building your decentralized microservices today!

Feel free to experiment, contribute, and share your feedback.

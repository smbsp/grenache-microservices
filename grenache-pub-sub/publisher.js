const { PeerPub } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')

const _ = require('lodash')

const link = new Link({
  grape: 'http://127.0.0.1:30001',
})
link.start()

const peer = new PeerPub(link, {})
peer.init()

const service = peer.transport('server')
service.listen(_.random(1000) + 1024)

setInterval(function () {
  link.announce('pub_test', service.port, {})
}, 1000)

setInterval(() => {
  service.pub('world')
}, 100)

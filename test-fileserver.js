let { WebSocket } = require("ws");
let DHT = require("@hyperswarm/dht-relay");
let Stream = require("@hyperswarm/dht-relay/ws");
let crypto = require("hypercore-crypto");

const socket = new WebSocket("ws://localhost:8080");
const dht = new DHT(new Stream(true, socket));

(async () => {
  let keyPair = crypto.keyPair(crypto.data(Buffer.from("test-channel")));
  // create a server to listen for secure connections
  const server = dht.createServer((socket) => {
    socket.on("data", (data) => console.log(data.toString("utf8")));

    socket.write("hello world");
  });

  console.log(keyPair.publicKey.toString("hex"));

  await server.listen(keyPair);
})();

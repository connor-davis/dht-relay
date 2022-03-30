let { WebSocketServer } = require("ws");

let DHT = require("@hyperswarm/dht");
let { relay } = require("@hyperswarm/dht-relay");
let Stream = require("@hyperswarm/dht-relay/ws");

const dht = new DHT();
const server = new WebSocketServer({ port: 8080 });

server.on("connection", (socket) => {
  relay(dht, new Stream(false, socket));
});

server.on("listening", () => console.log("Server is listening."));

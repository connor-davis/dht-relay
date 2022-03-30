let { WebSocket } = require("ws");
let DHT = require("@hyperswarm/dht-relay");
let Stream = require("@hyperswarm/dht-relay/ws");
let crypto = require("hypercore-crypto");

const socket = new WebSocket("ws://localhost:8080");
const dht = new DHT(new Stream(true, socket));

(async () => {
  let keyPair = crypto.keyPair(crypto.data(Buffer.from("test-channel")));

  try {
    // create a server to listen for secure connections
    const noiseSocket = dht.connect(
      Buffer.from(
        "50e37ded750d25ef7b774e44112b1aafa5b9d11ba0021f771f1eff8684824ea7",
        "hex"
      )
    );

    noiseSocket.on("open", function () {
      // noiseSocket fully open with the other peer
      console.log("Noise socket is open");
    });

    noiseSocket.on("data", (data) => console.log(data.toString("utf-8")));
    noiseSocket.write("ping");
  } catch (error) {
    console.log(error);
  }
})();

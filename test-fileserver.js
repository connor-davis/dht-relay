let DHT = require("@hyperswarm/dht");
let crypto = require("hypercore-crypto");

const node = new DHT({});

(async () => {
  let keyPair = crypto.keyPair(crypto.data(Buffer.from("test-channel")));
  let server = node.createServer();

  server.on("connection", function (socket) {
    socket.on("data", (data) => console.log(data.toString("utf8")));

    socket.write("pong");
  });

  await server.listen(keyPair);
})();

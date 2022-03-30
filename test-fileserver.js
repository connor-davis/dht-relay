let DHT = require("@hyperswarm/dht");
let crypto = require("hypercore-crypto");

const node = new DHT({});

(async () => {
  let keyPair = crypto.keyPair(crypto.data(Buffer.from(key)));
  let server = node.createServer();

  server.on("connection", function (socket) {
    if (stdio) pump(process.stdin, socket, process.stdout);
    else {
      let local = net.connect(port, "localhost");
      pump(socket, local, socket);
    }
  });
  
  await server.listen(keyPair);
})();

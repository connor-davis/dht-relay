let DHT = require("@hyperswarm/dht");
let crypto = require("hypercore-crypto");
let express = require("express");
let app = express();
let http = require("http").createServer(app);
let bodyParser = require("body-parser");
let cors = require("cors");
let net = require("net");
let pump = require("pump");

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors("*"));

app.get("/", async (request, response) => {
  return response.render("pages/welcome");
});

app.post("/", async (request, response) => {
  console.log(request.body);

  return response.status(200).json({ message: "Hello World" });
});

http.listen(2042, () => console.log("http server listening"));

let node = new DHT({});

(async () => {
  let keyPair = crypto.keyPair(crypto.data(Buffer.from("test-channel")));
  let server = node.createServer();

  let local = net.connect(4000, "localhost");

  server.on("connection", function (socket) {
    pump(socket, local, socket);
  });

  await server.listen(keyPair);
})();

// let { WebSocket } = require("ws");
let DHT = require("./index");
let Stream = require("./ws");
let crypto = require("hypercore-crypto");
let httpZ = require("http-z");

let socket = new WebSocket("ws://localhost:8080");
let dht = new DHT(new Stream(true, socket));

let decoder = new TextDecoder();
let encoder = new TextEncoder();

let connect = (key) => {
  let keyPair = crypto.keyPair(crypto.data(Buffer.from(key)));
  let noiseSocket = dht.connect(keyPair.publicKey);

  return noiseSocket;
};

let build = (packet) => builder.build(packet);

// let request = (method, path, data, socket, callback) => {
//   let object;

//   if (data) {
//     let body = JSON.stringify(data, null, 2);

//     object = {
//       method,
//       target: path,
//       path,
//       protocolVersion: "HTTP/1.1",
//       headers: [
//         { name: "Host", value: "http://localhost:2042" },
//         { name: "Content-Type", value: "application/json" },
//         { name: "Content-Length", value: `${body.length}` },
//       ],
//     };
//   } else {
//     object = {
//       method,
//       target: path,
//       path,
//       protocolVersion: "HTTP/1.1",
//       headers: [{ name: "Host", value: "http://localhost:2042" }],
//     };
//   }

//   let packet = httpZ.build(object);

//   packet += body;

//   socket.write(packet);

//   socket.on("data", (data) => {
//     try {
//       let packetString = decoder.decode(data);

//       console.log(packetString);

//       //   let packet = httpZ.parse(packetString);

//       //   callback(packet, null);
//     } catch (error) {
//       callback(null, error);
//     }
//   });
// };

let get = (path, socket) => {
  return new Promise((resolve, reject) => {
    let object = {
      method: "GET",
      target: path,
      path,
      protocolVersion: "HTTP/1.1",
      headers: [{ name: "Host", value: "http://localhost:2042" }],
    };

    let packet = httpZ.build(object);

    socket.write(packet);

    socket.on("data", (data) => {
      let packetString = decoder.decode(data);

      let packet = httpZ.parse(packetString);

      resolve(packet);
    });
  });
};

window.connect = connect;
window.build = build;
window.network = {
  get,
};

window.DHT = DHT;
window.Stream = Stream;
window.Crypto = crypto;
window.Buffer = Buffer;
window.TextDecoder = TextDecoder;
window.TextEncoder = TextEncoder;

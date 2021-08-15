const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("connected with socket id = ", socket.id);

  socket.on("msg_send", (data) => {
    // sends the message to every connected clients
    // io.emit("msg_rcvd", data);

    // sends back the message to same socket
    // socket.emit("msg_rcvd", data);

    // sends the message to all clients (except self)
    socket.broadcast.emit("msg_rcvd", data);
  });
});

app.use("/", express.static(__dirname + "/public"));

server.listen(3344, () => {
  console.log("Server started on http://localhost:3344");
});

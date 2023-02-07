const express = require("express");
const app = express();

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const cors = require("cors");
const PORT = 3001;

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));

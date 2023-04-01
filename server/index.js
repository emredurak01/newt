const express = require("express");
const app = express();

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const cors = require("cors");
const PORT = 3001;

const {
  addRoom,
  getRooms,
  setRooms,
  setVideoUrlForRoom,
  getVideoUrlForRoom,
} = require("./rooms.js");
const { addUser, getUsersInRoom, removeUser } = require("./users");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    addRoom(room);
    socket.join(user.room);

    const videoUrl = getVideoUrlForRoom(room);
    if (videoUrl) {
      socket.emit("selectedVideo", videoUrl);
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (getUsersInRoom(user?.room).length === 0) {
      let populatedRooms = getRooms().filter(function (e) {
        return e !== user?.room;
      });
      setRooms(populatedRooms);
    }

    io.in(user?.room).emit("userList", getUsersInRoom(user?.room));
  });

  socket.on("selectedVideo", ({ room, videoUrl }) => {
    setVideoUrlForRoom(room, videoUrl);
    io.in(room.room).emit("selectedVideo", videoUrl);
  });

  socket.on("getUsers", ({ room }) => {
    io.in(room).emit("userList", getUsersInRoom(room));
  });
});

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));

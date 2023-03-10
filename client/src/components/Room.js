import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Video from "./Video";

const socket = io.connect("http://localhost:3001");

function Room() {
  const { roomParam } = useParams();
  const [room, setRoom] = useState(roomParam);
  const [name, setName] = useState(uuidv4().slice(0, 6));
  const [userList, setUserList] = useState([]);

  const playSearchedVideo = (item) => {
    console.log(item.id.videoId);
  };

  useEffect(() => {
    socket.emit("join", { name, room });
  }, [name, room]);

  useEffect(() => {
    socket.emit("getUsers", { room });
    socket.on("userList", (data) => {
      setUserList(data);
    });
  }, [room]);

  return (
    <div>
      <Video playSearchedVideo={playSearchedVideo}></Video>

      <div>Room: {room}</div>
      <div>Name: {name}</div>
      <div>
        Userlist:
        {userList.map((item, index) => {
          return <div key={index}>{item.name}</div>;
        })}
      </div>
    </div>
  );
}

export default Room;

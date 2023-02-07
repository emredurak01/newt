import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const navigate = useNavigate();

  const joinRoom = () => {
    const roomID = uuidv4().slice(0, 6);
    navigate({
      pathname: `/room/${roomID}`,
    });
  };

  return (
    <div>
      <button onClick={joinRoom}>Create room</button>
    </div>
  );
}

export default Home;

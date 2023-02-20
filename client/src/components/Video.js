import React from "react";
import Player from "./Player";
import Search from "./Search";

function Video({ playSearchedVideo }) {
  return (
    <div>
      <Player></Player>
      <Search playSearchedVideo={playSearchedVideo}></Search>
    </div>
  );
}

export default Video;

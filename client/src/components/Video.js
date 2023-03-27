import React from "react";
import Player from "./Player";
import ReactPlayer from "react-player";
import Search from "./Search";

function Video({ selectedVideo, playSearchedVideo }) {
  return (
    <div>
      <ReactPlayer
        url={
          selectedVideo
            ? `https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`
            : ""
        }
      />

      <Search playSearchedVideo={playSearchedVideo}></Search>
    </div>
  );
}

export default Video;
import React from "react";
import ReactPlayer from "react-player";
import Search from "./Search";

function Video({
  selectedVideo,
  playSearchedVideo,
  onPlay,
  onPause,
  isPlaying,
}) {
  return (
    <div>
      {selectedVideo ? (
        <div>
          <ReactPlayer
            url={
              selectedVideo
                ? `https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`
                : ""
            }
            onPlay={() => onPlay()}
            onPause={() => onPause()}
            playing={isPlaying}
            controls={true}
          />
        </div>
      ) : null}
      <Search playSearchedVideo={playSearchedVideo}></Search>
    </div>
  );
}

export default Video;

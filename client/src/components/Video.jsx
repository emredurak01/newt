import React from "react";
import ReactPlayer from "react-player";

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
        <div className="flex justify-center ">
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
            className="w-full h-80 rounded-md"
          />
        </div>
      ) : null}
    </div>
  );
}

export default Video;

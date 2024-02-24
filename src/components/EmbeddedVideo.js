import React from "react";

const EmbeddedVideo = ({ videoUrl }) => {
  return (
    <div>
      <iframe
        width="400"
        height="225"
        src={videoUrl}
        title="Embedded YouTube Video"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default EmbeddedVideo;
import React from "react";
import ReactPlayer from "react-player";
import useMediaStream from "../hooks/useMediaStream";

const CameraPlayer = (props) => {
  const { stream } = useMediaStream();
  console.log(stream);

  const { cam, height, width } = props;

  console.log(cam.url, "URL ==== pass the url from the selected camera");
  if (!cam) {
    return <p>No Camera Found!</p>;
  }

  return (
    <ReactPlayer
      url={stream}
      muted
      playing
      width={width - 10}
      height={height - 10}
      style={{ border: "4px solid darkGreen", borderRadius: 4 }}
    />
  );
};

export default CameraPlayer;

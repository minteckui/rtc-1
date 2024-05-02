import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
// import useMediaStream from "../hooks/useMediaStream";
import { useSocket } from "../context";

const CameraPlayer = (props) => {
  // const { stream } = useMediaStream();
  // console.log(stream);
  const socket = useSocket();
  const [url, setUrl] = useState(null);

  console.log(url, "url");

  const { cam, height, width } = props;

  useEffect(() => {
    socket.onAny((event, data) => {
      console.log(event, "event name");
      const videoBlob = new Blob([data], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);
      console.log(videoUrl, "videoURL");
      setUrl(videoUrl);
    });
  }, [socket]);

  // console.log(cam.url, "URL ==== pass the url from the selected camera");
  if (!cam) {
    return <p>No Camera Found!</p>;
  }

  return (
    <ReactPlayer
      muted
      url={url}
      // controls

      // muted
      // playing
      width={width - 10}
      height={height - 10}
      style={{ border: "4px solid darkGreen", borderRadius: 4 }}
    />
  );
};

export default CameraPlayer;

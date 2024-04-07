import { useState, useEffect, useRef } from "react";

const useMediaStream = () => {
  const [stream, setStream] = useState(null);
  const isStreamSet = useRef(false);

  useEffect(() => {
    let mediaStream = null;

    const getMediaStream = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log("Setting your stream");
        setStream(mediaStream);
      } catch (e) {
        console.log("Error in media navigator", e);
      }
    };

    if (!isStreamSet.current) {
      getMediaStream();
      isStreamSet.current = true;
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
          mediaStream.removeTrack(track);
        });
        // Release the reference to the stream
        setStream(null);
        console.log("Stream closed");
      }
    };
  }, []);

  return {
    stream,
  };
};

export default useMediaStream;

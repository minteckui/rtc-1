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


export const useVideoRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     if (mediaRecorder) {
  //       mediaRecorder.getTracks().forEach((track) => {
  //         track.stop();
  //         mediaRecorder.removeTrack(track);
  //       });
  //       // Release the reference to the stream
  //       setMediaRecorder(null);
  //       console.log("recorder stream closed");
  //     }
  //   };
  // }, [mediaRecorder]);

  async function initRecording() {

    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      return;
    }

    try {
      const screenStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1920,
          height: 1080,
        },
        audio: false,
      });
      const stream = new MediaStream([...screenStream.getTracks()]);
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        console.log(e.data);
        setChunks((prevChunks) => [...prevChunks, e.data]);
      };

      recorder.onstop = () => {
        setIsRecording(false);
        const blob = new Blob(chunks, {
          type: 'video/webm',
        });

        const formData = new FormData();
        formData.append('file', blob);

        // Send recorded data to the server
        fetch('http://localhost:8001/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

      setMediaRecorder(recorder);
      setIsRecording(true);
      recorder.start();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return { initRecording, isRecording };
};







import { useState, useEffect } from "react";
import { useSocket } from "../context";

export const useVideoRecorder = (stream) => {
  console.log(stream);
  const socket = useSocket();

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  async function toggleVideoStreamRecording() {
    console.log("started");
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      socket.emit("endVideoChunks");
      return;
    }

    try {
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        console.log("event", event);
        if (event.data.size > 0) {
          socket.emit("videoChunks", event.data);
        }
      };

      setMediaRecorder(recorder);
      setIsRecording(true);
      recorder.start(2000);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
    };
  });
  return { toggleVideoStreamRecording, isRecording };
};

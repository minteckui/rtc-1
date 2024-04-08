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


// let mediaRecorder;
// const chunks =[];

// export async function startRecording(userId, roomId, socket) {
//   try {
//     const screenStream = await navigator.mediaDevices.getUserMedia({
//       video: {
//         width: 1920,
//         height: 1080,
//       },
//       audio: false,
//     });
//     const stream = new MediaStream([...screenStream.getTracks()]);
//     mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.start();

//     mediaRecorder.ondataavailable = function (e) {
//       chunks.push(e.data);
//     };

//     mediaRecorder.onstop = function (e) {
//       const blob = new Blob(chunks, {
//         type: "video/webm",
//       });

//       const formData = new FormData();
//       formData.append("file", blob);

//       // Send recorded data to the server
//       fetch("http://localhost:5000/upload", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.text())
//         .then((result) => {
//           console.log(result);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     };

//     // Emit event to the server indicating start of recording
//     socket.emit("start-video-recording", userId, roomId);

//     // Rest of your recording logic...
//   } catch (error) {
//     console.log(error);
//     alert(error);
//   }
// }


// export  function stopRecording (){
//   mediaRecorder.stop();
// }


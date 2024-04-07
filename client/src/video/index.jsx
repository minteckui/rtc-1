import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

const socket = io("http://localhost:8000");

function VideoCall() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("sachin");

  const userVideo = useRef();
  const connectionRef = useRef();
  const myVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (myVideo) {
        myVideo.current.srcObject = stream;
      }
    });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, [myVideo]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    try {
      
      connectionRef.current.destroy();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h4">Basic React JS video calling</Typography>
              <Typography variant="subtitle1">
                Copy your ID and anyone using the same server can use it to call you and vice versa!
              </Typography>
            </Grid>
            <Grid item>
              <video ref={myVideo} autoPlay playsInline muted style={{ width: "300px" }} />
              <Typography variant="body1">{caller}</Typography>
              <Typography variant="body2">{me}</Typography>
            </Grid>
            <Grid item>
              {callAccepted && !callEnded ? (
                <video ref={userVideo} autoPlay playsInline style={{ width: "300px" }} />
              ) : (
                <div>
                  <img
                  alt='imsg'
                    src="https://w0.peakpx.com/wallpaper/416/423/HD-wallpaper-devil-boy-in-mask-red-hoodie-dark-background-4ef517.jpg"
                    style={{ width: "4rem", borderRadius: "50%" }}
                  />
                  <Typography variant="body1">{idToCall}</Typography>
                </div>
              )}
            </Grid>
            <Grid item>
              <TextField
                label="ID to Call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              {callAccepted && !callEnded ? (
                <Button variant="contained" onClick={leaveCall}>
                  End Call
                </Button>
              ) : (
                <Button variant="contained" onClick={() => callUser(idToCall)}>
                  Call
                </Button>
              )}
            </Grid>
            <Grid item>
              {receivingCall && !callAccepted && (
                <div>
                  <Typography variant="body1">{caller} is calling...</Typography>
                  <Button variant="contained" onClick={answerCall}>
                    Answer
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default VideoCall;

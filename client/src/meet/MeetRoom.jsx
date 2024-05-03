import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

//MUI
import { Grid, Box, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import { useSocket } from "../context";
import usePeer from "../hooks/usePeer";
import useMediaStream from "../hooks/useMediaStream";
import usePlayer from "../hooks/usePlayer";

import Player from "../component/Player";
import Bottom from "../component/Bottom";
import { useParams } from "react-router-dom";
import { useVideoRecorder } from "../hooks/useRecorderStream";

const MeetRoom = () => {
  const socket = useSocket();
  const { roomId } = useParams();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { startVideoRecording, stopVideoRecording, isRecording } =
    useVideoRecorder(stream);
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleHandRaise,
    toggleVideo,
    leaveRoom,
    startRecording,
    stopRecording,
    // toggleRecording,
  } = usePlayer(myId, roomId, peer);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket || !peer) return;
    const handleUserConnected = (newUser) => {
      console.log(`user connected in room with userId ${newUser}`);

      const call = peer.call(newUser, stream);
      console.log("calling...", call);

      if (call) {
        // if there is no streams
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: "",
            muted: true,
            playing: false,
            handRaise: false,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [newUser]: call,
        }));

        call.on("stream", (incomingStream) => {
          console.log(`incoming stream from (calling) ${newUser}`);
          setPlayers((prev) => ({
            ...prev,
            [newUser]: {
              url: incomingStream,
              muted: true,
              playing: true,
              handRaise: false,
            },
          }));

          setUsers((prev) => ({
            ...prev,
            [newUser]: call,
          }));
        });
      }
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayers, socket, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        if (copy[userId]) {
          copy[userId].muted = !copy[userId].muted;
          return { ...copy };
        } else {
          return prev;
        }
      });
    };

    const handleToggleVideo = (userId) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        if (copy[userId]) {
          copy[userId].playing = !copy[userId].playing;
          return { ...copy };
        } else {
          return prev;
        }
      });
    };

    const handleHandRaise = (userId) => {
      console.log(`user with id ${userId} hand raised`);

      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        if (copy[userId]) {
          copy[userId].handRaise = !copy[userId].handRaise;
          return { ...copy };
        } else {
          return prev;
        }
      });
    };

    const handleUserLeave = (userId) => {
      console.log(`user ${userId} is leaving the room`);
      users[userId]?.close();
      const playersCopy = cloneDeep(players);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    };

    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-toggle-hand-raise", handleHandRaise);
    socket.on("user-leave", handleUserLeave);
    socket.on("start-video-recording", startVideoRecording);
    socket.on("stop-video-recording", stopVideoRecording);
    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-toggle-hand-raise", handleHandRaise);
      socket.off("user-leave", handleUserLeave);
      socket.off("start-video-recording", startVideoRecording);
      socket.off("stop-video-recording", stopVideoRecording);
    };
  }, [
    players,
    setPlayers,
    socket,
    startVideoRecording,
    stopVideoRecording,
    users,
  ]);

  useEffect(() => {
    if (!peer) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);
      console.log("answering the call...", call);
      if (call) {
        call.on("stream", (incomingStream) => {
          console.log(`incoming stream from ${callerId}`);
          setPlayers((prev) => ({
            ...prev,
            [callerId]: {
              url: incomingStream,
              muted: true,
              playing: true,
              handRaise: false,
            },
          }));

          setUsers((prev) => ({
            ...prev,
            [callerId]: call,
          }));
        });
      }
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!myId) return;
    console.log(`setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream || "",
        muted: true,
        playing: !!stream,
        handRaise: false,
      },
    }));
  }, [myId, setPlayers, stream]);

  console.log(playerHighlighted, nonHighlightedPlayers);

  return (
    <Box display="flex" justifyContent="center">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h5" gutterBottom>
            Main Video
          </Typography>
          <Box>
            {playerHighlighted ? (
              <div style={{ position: "relative" }}>
                <Player
                  url={playerHighlighted.url}
                  muted={playerHighlighted.muted}
                  playing={playerHighlighted.playing}
                  handRaise={playerHighlighted.handRaise}
                  startRecording={() => {
                    startRecording();
                  }}
                  stopRecording={() => {
                    stopRecording();
                  }}
                  isActive
                />
                <Bottom
                  muted={playerHighlighted.muted}
                  playing={playerHighlighted.playing}
                  handRaise={playerHighlighted.handRaise}
                  toggleHandRaise={toggleHandRaise}
                  toggleAudio={toggleAudio}
                  toggleVideo={toggleVideo}
                  leaveRoom={leaveRoom}
                />
              </div>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  color: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 400,
                }}
              >
                <AccountCircle
                  sx={{
                    fontSize: 400,
                    color: "gray",
                    marginTop: "auto",
                    height: "100%",
                  }}
                />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" gutterBottom>
            Other Participants
          </Typography>
          <div style={{ height: "calc(100vh - 80px)", overflow: "auto" }}>
            {Object.keys(nonHighlightedPlayers).map((playerId) => {
              const { url, muted, playing, handRaise } =
                nonHighlightedPlayers[playerId];
              return (
                <Player
                  key={playerId}
                  url={url}
                  muted={muted}
                  playing={playing}
                  handRaise={handRaise}
                  isActive={false}
                  startRecording={() => {
                    startRecording();
                  }}
                  stopRecording={() => {
                    stopRecording();
                  }}
                  isRecording={isRecording}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeetRoom;

import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

//MUI
import { Grid, Container } from "@mui/material";

import { useSocket } from "../context";
import usePeer from "../hooks/usePeer";
import useMediaStream from "../hooks/useMediaStream";
import usePlayer from "../hooks/usePlayer";

import Player from "../component/Player";
import Bottom from "../component/Bottom";
import { useParams } from "react-router-dom";

const MeetRoom = () => {
  const socket = useSocket();
  const { roomId } = useParams();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom } =
    usePlayer(myId, roomId, peer);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log(`user connected in room with userId ${newUser}`);

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [newUser]: call,
        }));
      });
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
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
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
    socket.on("user-leave", handleUserLeave);
    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [players, setPlayers, socket, users]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={8}>
          {playerHighlighted && (
            <div style={{ position: "relative" }}>
              <Player
                url={playerHighlighted.url}
                muted={playerHighlighted.muted}
                playing={playerHighlighted.playing}
                isActive
              />
              <Bottom
                muted={playerHighlighted.muted}
                playing={playerHighlighted.playing}
                toggleAudio={toggleAudio}
                toggleVideo={toggleVideo}
                leaveRoom={leaveRoom}
              />
            </div>
          )}
        </Grid>
        <Grid item  xs={4}>
          <div style={{ height: "100%", overflow: "auto", border: "1px solid" }}>
            {Object.keys(nonHighlightedPlayers).map((playerId) => {
              const { url, muted, playing } = nonHighlightedPlayers[playerId];
              return <Player key={playerId} url={url} muted={muted} playing={playing} isActive={false} />;
            })}
          </div>
        </Grid>
        {/* <CopySection roomId={roomId} /> */}
      </Grid>
    </Container>
  );
};

export default MeetRoom;

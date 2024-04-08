import { useState } from "react";
import { cloneDeep } from "lodash";
import { useSocket } from "../context";
import { useNavigate } from "react-router-dom";

const usePlayer = (myId, roomId, peer) => {
  const socket = useSocket();
  const [players, setPlayers] = useState({});
  const navigate = useNavigate();
  const playersCopy = cloneDeep(players);

  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId];

  console.log(players)

  const nonHighlightedPlayers = playersCopy;

  const leaveRoom = () => {
    socket.emit("user-leave", myId, roomId);
    console.log("leaving room", roomId);
    peer?.disconnect();
    navigate("/");
  };

  const toggleAudio = () => {
    console.log("I toggled my audio");
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].muted = !copy[myId].muted;
      return { ...copy };
    });
    socket.emit("user-toggle-audio", myId, roomId);
  };

  const toggleHandRaise = () => {
    console.log("I toggled my hand Raise");
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].handRaise = !copy[myId].handRaise;
      return { ...copy };
    });
    socket.emit("user-toggle-hand-raise", myId, roomId);
  };

  const toggleVideo = () => {
    console.log("I toggled my video");
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].playing = !copy[myId].playing;
      return { ...copy };
    });
    socket.emit("user-toggle-video", myId, roomId);
  };

  return { players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleHandRaise,toggleVideo, leaveRoom };
};

export default usePlayer;

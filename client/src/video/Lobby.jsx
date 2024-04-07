import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";
import { SocketContext } from "../context";

function Lobby() {
  const [meetingId, setMeetingId] = useState("");
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const handleJoin = () => {
    navigate(`/meeting/${meetingId}`);
  };

  const handleCreate = () => {
    socket.emit("createMeeting", { meetingId });
    navigate(`/meeting/${meetingId}`);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Video Conference Lobby
      </Typography>
      <TextField
        label="Meeting ID"
        variant="outlined"
        fullWidth
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained" color="primary" onClick={handleJoin} style={{ marginRight: "10px" }}>
        Join Meeting
      </Button>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Meeting
      </Button>
    </Container>
  );
}

export default Lobby;

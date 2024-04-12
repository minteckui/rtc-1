import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { TextField, Button, styled, Typography, Divider } from "@mui/material";

// import styles from '@/styles/home.module.css'
import { useState } from "react";

const HomeContainer = styled("div")({
  maxWidth: 600,
  margin: "auto",
  display: "flex",
  paddingTop: "4rem",
});

const EnterRoomContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  marginTop: "16px",
});

const InputField = styled(TextField)({
  width: "70%",
  marginBottom: "12px",
});

const JoinRoomButton = styled(Button)({
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 24px",
  borderRadius: "4px",
});


const CreateRoomButton = styled(Button)({
  backgroundColor: "#007bff",
  color: "white",
  padding: "10px 24px",
  borderRadius: "4px",
});

export default function MeetLobby() {
  const router = useNavigate();
  const [roomId, setRoomId] = useState("");

  const createAndJoin = () => {
    const roomId = uuidv4();
    router(`/${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) router(`/${roomId}`);
    else {
      alert("Please provide a valid room id");
    }
  };
  return (
    <HomeContainer>
      <div style={{ padding:'2rem', width:'100%', textAlign:'center',borderRadius:'1rem', border:'1px solid darkgrey' }}>
        <Typography variant="h4" gutterBottom color='secondary' fontWeight={800} align="center">
          Video Call
        </Typography>
        <EnterRoomContainer>
          <InputField placeholder="Enter Meeting ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
          <JoinRoomButton variant="contained" onClick={joinRoom}>
            Join Room
          </JoinRoomButton>
        </EnterRoomContainer>
        
        <Divider style={{marginBlock:'1rem', color:'violet', }}><Typography color='secondary' variant="h6">OR</Typography></Divider>
        <CreateRoomButton variant="contained" onClick={createAndJoin}>
          Create a new room
        </CreateRoomButton>
      </div>
    </HomeContainer>
  );
}

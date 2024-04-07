import { IconButton, Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const Bottom = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        bottom: 18,
        left: 0,
        right: 0,
        mx: "auto",
        width: 200,
      }}>
      <IconButton style={{ backgroundColor: "aqua" }} onClick={toggleAudio}>
        {muted ? <MicOffIcon fontSize="large" /> : <MicIcon fontSize="large" />}
      </IconButton>
      <IconButton style={{ backgroundColor: "aliceblue" }} onClick={toggleVideo}>
        {playing ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
      </IconButton>
      <IconButton style={{ backgroundColor: "tomato" }} onClick={leaveRoom}>
        <PhoneDisabledIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default Bottom;

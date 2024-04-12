import { IconButton, Box,Tooltip } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import BackHandIcon from '@mui/icons-material/BackHand';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';

const Bottom = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom,handRaise,toggleHandRaise } = props;

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
        width: 300,
      }}
    >
      <Tooltip title={muted ? "Unmute" : "Mute"}>
        <IconButton
          style={{ backgroundColor: "#8c8bff" }}
          onClick={toggleAudio}
        >
          {muted ? (
            <MicOffIcon fontSize="large" />
          ) : (
            <MicIcon fontSize="large" />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title={handRaise ? "Lower hand" : "Raise hand"}>
        <IconButton
          style={{ backgroundColor: "#d39b7c" }}
          onClick={toggleHandRaise}
        >
          {handRaise ? (
            <BackHandIcon fontSize="large" />
          ) : (
            <DoNotTouchIcon fontSize="large" />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title={playing ? "Stop video" : "Start video"}>
        <IconButton
          style={{ backgroundColor: "#8c8bff" }}
          onClick={toggleVideo}
        >
          {playing ? (
            <VideocamIcon fontSize="large" />
          ) : (
            <VideocamOffIcon fontSize="large" />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Leave room">
        <IconButton style={{ backgroundColor: "tomato" }} onClick={leaveRoom}>
          <PhoneDisabledIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Bottom;

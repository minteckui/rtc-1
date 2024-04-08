import React from "react";
import ReactPlayer from "react-player";
import { Paper } from "@mui/material";
import { Mic, MicOff, AccountCircle, RecordVoiceOver } from "@mui/icons-material";
import PanToolIcon from "@mui/icons-material/PanTool";

const iconsStyle = {
  padding: "4px",
  position: "absolute",
  borderRadius: "50%",
  top: 10,
  right: 10,
  backgroundColor: "wheat",
};

const Player = (props) => {
  const { url, muted, playing, isActive, handRaise, toggleRecording, isRecording } = props;

  return (
    <Paper
      style={{
        position: "relative",
        marginBottom: 16,
        textAlign: "center",
        height: isActive ? "90vh" : 200,
        backgroundColor: "#272727",
      }}>
      {playing ? (
        <ReactPlayer url={url} muted={muted} playing={playing} width="100%" height="100%" />
      ) : (
        <AccountCircle sx={{ fontSize: isActive ? 400 : 100, color: "gray", marginTop: "auto", height: "100%" }} />
      )}

      {!isActive ? (
        muted ? (
          <MicOff fontSize="small" sx={iconsStyle} />
        ) : (
          <Mic fontSize="small" sx={iconsStyle} />
        )
      ) : null}
      {!isActive && handRaise && <PanToolIcon fontSize="small" sx={{ ...iconsStyle, left: 10 }} />}
      {!isActive ? !isRecording ? <RecordVoiceOver color="primary" onClick={toggleRecording} fontSize="small" sx={{ ...iconsStyle, left: 0, bottom: 0, right: 0, margin: 'auto', top: 'inherit' }} /> : <RecordVoiceOver color="error" onClick={toggleRecording} fontSize="small" sx={{ ...iconsStyle, left: 0, bottom: 0, right: 0, margin: 'auto', top: 'inherit' }} /> : null}
    </Paper>
  );
};

export default Player;

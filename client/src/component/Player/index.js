import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Button, Paper } from "@mui/material";
import { Mic, MicOff, AccountCircle } from "@mui/icons-material";
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
  const {
    url,
    muted,
    playing,
    isActive,
    handRaise,
    toggleRecording,
    isRecording,
  } = props;
  const [recodingStated, setRecordingStared] = useState(false);

  return (
    <Paper
      style={{
        position: "relative",
        marginBottom: 16,
        textAlign: "center",
        height: isActive ? "90vh" : 200,
        backgroundColor: "#272727",
      }}
    >
      {isRecording && <p style={{ color: "red" }}> Video is getting recoded</p>}
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width="100%"
          height="100%"
        />
      ) : (
        <AccountCircle
          sx={{
            fontSize: isActive ? 400 : 100,
            color: "gray",
            marginTop: "auto",
            height: "100%",
          }}
        />
      )}

      {!isActive ? (
        muted ? (
          <MicOff fontSize="small" sx={iconsStyle} />
        ) : (
          <Mic fontSize="small" sx={iconsStyle} />
        )
      ) : null}
      {!isActive && handRaise && (
        <PanToolIcon fontSize="small" sx={{ ...iconsStyle, left: 10 }} />
      )}
      {!isActive && playing && (
        <Button
          color="warning"
          onClick={() => {
            setRecordingStared((ps) => !ps);
            toggleRecording();
          }}
          size="small"
        >
          {recodingStated ? "Stop Recording" : "Start Recoding"}
        </Button>
      )}
    </Paper>
  );
};

export default Player;

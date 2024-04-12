import { useState } from "react";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Typography, Paper, Popper, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import CameraPlayer from "./CameraPlayer";
import ControlPanel from "./Controls";

export default function CameraPlayerList({ selectedCam }) {
  let height = 800;
  let width = 1050;
  let camLength = selectedCam?.length;

  const onControlClick = (cam, action) => {
    console.log(cam, action);
    switch (action) {
      case "up":
        // Handle up action
        break;
      case "down":
        // Handle down action
        break;
      case "left":
        // Handle left action
        break;
      case "right":
        // Handle right action
        break;
      case "center":
        // Handle center action
        break;
      case "rotateLeft":
        // Handle rotate left action
        break;
      case "rotateRight":
        // Handle rotate right action
        break;
      case "zoomIn":
        // Handle zoom in action
        break;
      case "zoomOut":
        // Handle zoom out action
        break;
      default:
        break;
    }
  };

  if (camLength >= 2) {
    height = 400;
    width = 500;
  }

  if (!camLength) {
    return (
      <Typography align="center" variant="h4" color="primary">
        No Camera Selected!
      </Typography>
    );
  }

  if (camLength === 1) {
    return (
      <Paper
        style={{
          maxHeight: "calc(100vh - 50px)",
          overflowY: "auto",
          padding: 8,
        }}
      >
        <div
          style={{
            display: "grid",
            columnGap: 8,
            gridTemplateColumns: "1fr 150px",
            placeItems: "center",
            placeContent: "center",
          }}
        >
          <CameraPlayer height={height} width={width} cam={selectedCam[0]} />
          <ControlPanel onControlClick={onControlClick} cam={selectedCam[0]} />
        </div>
      </Paper>
    );
  }

  return (
    <Paper
      style={{ maxHeight: "calc(100vh - 50px)", overflowY: "auto", padding: 8 }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          rowGap: 8,
          columnGap: 8,
          gridAutoRows: height,
          placeItems: "center",
          placeContent: "center",
        }}
      >
        {selectedCam.map((cam, _) => (
          <div key={cam.id} style={{ position: "relative" }}>
            <CameraPlayer height={height} width={width} cam={selectedCam[0]} />
            <ControlPopper onControlClick={onControlClick} cam={cam} />
          </div>
        ))}
      </div>
    </Paper>
  );
}

function ControlPopper({ onControlClick, cam }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div style={{ position: "absolute", top: -10, right: -8 }}>
        <IconButton
          style={{ background: "white" }}
          color="secondary"
          size="small"
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
          <ControlPanel onControlClick={onControlClick} cam={cam} />
        </Popper>
      </div>
    </ClickAwayListener>
  );
}

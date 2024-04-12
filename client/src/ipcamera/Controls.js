import React from "react";
import { IconButton, Divider, Button } from "@mui/material";
import {
  ArrowRight,
  ArrowLeft,
  CenterFocusStrong,
  RotateRight,
  RotateLeft,
  ZoomIn,
  ZoomOut,
  ArrowDropUp,
  ArrowDropDown,
} from "@mui/icons-material";

const iconButtonZoomStyle = { backgroundColor: "#ffcfcf", margin: 4 };
const iconButtonJoyStickStyle = { backgroundColor: "#2d82dd", margin: 1 };
const iconButtonTiltStyle = { backgroundColor: "#f2ffcd", margin: 4 };

const ControlPanel = ({ onControlClick, cam }) => {
  console.log(cam, "from ====== control pannel");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 4,
        padding: 4,
        backgroundColor: "#4242429e",
      }}
    >
      <Button
        onClick={() => onControlClick(cam, "up")}
        color="primary"
        style={iconButtonJoyStickStyle}
      >
        <ArrowDropUp />
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={iconButtonJoyStickStyle}
          color="primary"
          onClick={() => onControlClick(cam, "left")}
        >
          <ArrowLeft />
        </Button>
        <Button
          color="warning"
          style={iconButtonJoyStickStyle}
          onClick={() => onControlClick(cam, "center")}
        >
          <CenterFocusStrong />
        </Button>
        <Button
          style={iconButtonJoyStickStyle}
          color="primary"
          onClick={() => onControlClick(cam, "right")}
        >
          <ArrowRight />
        </Button>
      </div>
      <Button
        style={iconButtonJoyStickStyle}
        color="primary"
        onClick={() => onControlClick(cam, "down")}
      >
        <ArrowDropDown />
      </Button>
      <Divider style={{ marginBlock: 8 }} flexItem />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          style={iconButtonTiltStyle}
          color="success"
          onClick={() => onControlClick(cam, "rotateLeft")}
        >
          <RotateLeft />
        </IconButton>
        <IconButton
          style={iconButtonTiltStyle}
          color="success"
          onClick={() => onControlClick(cam, "rotateRight")}
        >
          <RotateRight />
        </IconButton>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          color="error"
          style={iconButtonZoomStyle}
          onClick={() => onControlClick(cam, "zoomOut")}
        >
          <ZoomOut />
        </IconButton>
        <IconButton
          style={iconButtonZoomStyle}
          color="error"
          onClick={() => onControlClick(cam, "zoomIn")}
        >
          <ZoomIn />
        </IconButton>
      </div>
    </div>
  );
};

export default ControlPanel;

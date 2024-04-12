import React from "react";
import { IconButton, Grid, Divider } from "@mui/material";
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
const iconButtonJoyStickStyle = { backgroundColor: "#e0efff", margin: 1 };
const iconButtonTiltStyle = { backgroundColor: "#f2ffcd", margin: 4 };

const ControlPanel = ({ onControlClick,cam}) => {
    console.log(cam, 'from ====== control pannel')
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{
        border: "1px solid lightgrey",
        borderRadius: 4,
        padding:4,
        backgroundColor: "#ffffff9e",
      }}
    >
      <IconButton
        onClick={() => onControlClick(cam,"up")}
        color="primary"
        style={iconButtonJoyStickStyle}
      >
        <ArrowDropUp />
      </IconButton>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          style={iconButtonJoyStickStyle}
          color="primary"
          onClick={() => onControlClick(cam,"left")}
        >
          <ArrowLeft />
        </IconButton>
        <IconButton
          color="secondary"
          style={iconButtonJoyStickStyle}
          onClick={() => onControlClick(cam,"center")}
        >
          <CenterFocusStrong />
        </IconButton>
        <IconButton
          style={iconButtonJoyStickStyle}
          color="primary"
          onClick={() => onControlClick(cam,"right")}
        >
          <ArrowRight />
        </IconButton>
      </Grid>
      <IconButton
        style={iconButtonJoyStickStyle}
        color="primary"
        onClick={() => onControlClick(cam,"down")}
      >
        <ArrowDropDown />
      </IconButton>
      <Divider style={{ marginBlock: 8 }} flexItem />
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <IconButton
          style={iconButtonZoomStyle}
          color="error"
          onClick={() => onControlClick(cam,"zoomIn")}
        >
          <ZoomIn />
        </IconButton>
        <IconButton
          style={iconButtonTiltStyle}
          color="success"
          onClick={() => onControlClick(cam,"rotateLeft")}
        >
          <RotateLeft />
        </IconButton>
        <IconButton
          style={iconButtonTiltStyle}
          color="success"
          onClick={() => onControlClick(cam,"rotateRight")}
        >
          <RotateRight />
        </IconButton>
        <IconButton
          color="error"
          style={iconButtonZoomStyle}
          onClick={() => onControlClick(cam,"zoomOut")}
        >
          <ZoomOut />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ControlPanel;

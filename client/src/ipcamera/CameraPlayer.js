import React from "react";
import ReactPlayer from "react-player";
import useMediaStream from "../hooks/useMediaStream";



const CameraPlayer = (props) => {
  const { stream } = useMediaStream()
  console.log(stream)

  const { url, height, width } = props;
  // if (!url ) {
  //   return <p>No Url found!</p>
  // }

  return (

    <ReactPlayer url={stream} muted playing width={width-10} height={height-10} style={{ border: '4px solid aliceblue', borderRadius:4 }} />
    

    
  );
};

export default CameraPlayer;

import ReactPlayer from "react-player";
// import cx from "classnames";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import styles from "@/component/Player/index.module.css";

const Player = (props) => {
  const { url, muted, playing, isActive } = props;
  return (
    <div
      style={{ position: "relative" }}

      // className={cx(styles.playerContainer, {
      //   [styles.notActive]: !isActive,
      //   [styles.active]: isActive,
      //   [styles.notPlaying]: !playing,
      // })}
    >
      {playing ? (
        <ReactPlayer url={url} muted={muted} playing={playing} width="100%" height={isActive ? 600 : 280} />
      ) : (
        <AccountCircleIcon style={{ fontSize: isActive ? "600px" : 150 }} />
      )}

      {!isActive ? (
        muted ? (
          <MicOffIcon fontSize="small" style={{ position: "absolute", top: 10, backgroundColor: "wheat" }} />
        ) : (
          <MicIcon fontSize="small" style={{ position: "absolute", top: 10, backgroundColor: "wheat" }} />
        )
      ) : undefined}
    </div>
  );
};

export default Player;

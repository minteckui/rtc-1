import { Routes, Route } from "react-router-dom";
// import LobbyScreen from "./screens/Lobby";
// import RoomPage from "./screens/Room";
// import VideoCall from "./video";
// import Lobby from "./video/Lobby";
// import Meeting from "./video/Meeting";
import MeetLobby from "./meet/MeetLobby";
import MeetRoom from "./meet/MeetRoom";
import IPCamera from "./ipcamera";

function App() {
  return (
    <IPCamera />
    // <Routes>
    //   <Route path="/" element={<MeetLobby />} />
    //   <Route path="/:roomId" element={<MeetRoom />} />
    // </Routes>
  );
}

export default App;

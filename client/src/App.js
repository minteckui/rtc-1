import { Routes, Route } from "react-router-dom";

import MeetLobby from "./meet/MeetLobby";
import MeetRoom from "./meet/MeetRoom";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          minWidth: 45,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
     <Routes>
      <Route path="/" element={<MeetLobby />} />
      <Route path="/:roomId" element={<MeetRoom />} />
    </Routes>
    </ThemeProvider>
  );
}

export default App;

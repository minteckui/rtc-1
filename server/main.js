const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const meetings = {}; // Object to store active meetings and participants

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    // Handle user disconnection from the meeting
    const meetingId = socket.meetingId;
    const participantId = socket.id;

    if (meetingId && meetings[meetingId]) {
      // Remove the participant from the meeting
      meetings[meetingId] = meetings[meetingId].filter((participant) => participant !== participantId);

      // Notify other participants about the disconnection
      socket.to(meetingId).emit("userDisconnected", participantId);
    }
  });

  socket.on("startMeeting", ({ name }) => {
    // Handle starting a new meeting
    const meetingId = socket.id;
    socket.join(meetingId);
    socket.name = name;

    meetings[meetingId] = [socket.id]; // Add the host to the meeting

    socket.emit("meetingStarted", meetingId);
  });

  socket.on("joinMeeting", ({ meetingId, name }) => {
    // Handle joining an existing meeting
    if (!meetings[meetingId]) {
      // Meeting does not exist
      socket.emit("meetingError", "Meeting not found");
      return;
    }

    socket.join(meetingId);
    socket.meetingId = meetingId;
    socket.name = name;

    // Notify other participants about the new participant
    socket.to(meetingId).emit("userConnected", socket.id);

    // Send the list of participants to the new participant
    const participants = meetings[meetingId].filter((participant) => participant !== socket.id);
    socket.emit("participants", participants);
    meetings[meetingId].push(socket.id); // Add the participant to the meeting
  });

  socket.on("callUser", (data) => {
    // Handle initiating a call between participants
    console.log(`Incoming call from ${data.from}`);
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    // Handle answering a call
    console.log(`Answering call from ${data.from}`);
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(8000, () => console.log("Server is running on port 8000"));

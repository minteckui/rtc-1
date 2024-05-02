const { Server } = require("socket.io");
const fs = require("fs");
const io = new Server(8000, {
  cors: true,
});

const videoChunksDir = "videos"; // Directory to store video chunks
const mergedFilePath = `${videoChunksDir}/video_${Date.now()}.mp4`; // Path for merged chunks file

// Create directory if it doesn't exist
if (!fs.existsSync(videoChunksDir)) {
  fs.mkdirSync(videoChunksDir);
}

function appendChunkToFile(chunk) {
  fs.appendFileSync(mergedFilePath, chunk);
}

const mapUserPeerIdToSocketId = new Map();
// let fileWriteStream = null;

io.on("connection", (socket) => {
  console.log("server is connected", socket.id);

  socket.on("join-room", (roomId, userId) => {
    console.log(`a new user ${userId} joined room ${roomId}`);
    socket.join(roomId);
    mapUserPeerIdToSocketId.set(userId, socket.id);
    socket.to(roomId).emit("user-connected", userId); // Emit to others in the room
  });

  socket.on("user-toggle-audio", (userId, roomId) => {
    socket.to(roomId).emit("user-toggle-audio", userId); // Emit to others in the room
  });

  socket.on("user-toggle-video", (userId, roomId) => {
    socket.to(roomId).emit("user-toggle-video", userId); // Emit to others in the room
  });

  socket.on("user-toggle-hand-raise", (userId, roomId) => {
    socket.to(roomId).emit("user-toggle-hand-raise", userId); // Emit to others in the room
  });

  socket.on("user-leave", (userId, roomId) => {
    socket.leave(roomId);
    socket.to(roomId).emit("user-leave", userId); // Emit to others in the room
  });

  socket.on("toggle-video-recording", (userId, roomId, playerId) => {
    console.log("toggle-video-recording");
    socket.to(roomId).emit("toggle-video-recording", userId);
    // const socketId = mapUserPeerIdToSocketId.get(playerId);
    // if (socketId) {
    //   socket.to(socketId).emit("toggle-video-recording", userId); // Emit to a specific socket
    // }
  });

  socket.on("videoChunks", (data) => {
    console.log(data, "chunks");
    appendChunkToFile(data);
  });
});
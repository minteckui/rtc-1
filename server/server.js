const { Server } = require("socket.io");
const fs = require("fs");
const io = new Server(8000, {
  cors: true,
});

const mapUserPeerIdToSocketId = new Map();
// let fileWriteStream = null;

io.on("connection", (socket) => {
  console.log("server is connected", socket.id);

  // socket.on("start-recording", (userId, roomId, playerId) => {
  //   console.log("User started recording");
  //   socket.join(roomId);

  //   if (fileWriteStream) {
  //     console.warn("Recording already in progress.");
  //     return;
  //   }
  //   const socketId = mapUserPeerIdToSocketId.get(playerId);
  //   socket.to(socketId).emit("start-recording", userId);

  //   const filePath = "./temp/video_temp.webm";
  //   fileWriteStream = fs.createWriteStream(filePath);

  //   fileWriteStream.on("error", (err) => {
  //     console.error("Error writing to file:", err);
  //     fileWriteStream.end();
  //     fileWriteStream = null;
  //   });


  // });
  // socket.on("chunk", (chunk) => {
  //   fileWriteStream.write(Buffer.from(chunk, "base64"));
  // });

  // socket.on("stop-recording", () => {
  //   console.log("User stopped recording");
  //   if (fileWriteStream) {
  //     fileWriteStream.end();
  //     fileWriteStream = null;
  //     console.log("Recorded file saved:", filePath);
  //   } else {
  //     console.warn("Recording was not started.");
  //   }
  // });

  socket.on("join-room", (roomId, userId) => {
    console.log(`a new user ${userId} joined room ${roomId}`);
    socket.join(roomId);
    mapUserPeerIdToSocketId.set(userId, socket.id);
    socket.broadcast.to(roomId).emit("user-connected", userId);
  });

  socket.on("user-toggle-audio", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
  });

  socket.on("user-toggle-video", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-toggle-video", userId);
  });

  socket.on("user-toggle-hand-raise", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-toggle-hand-raise", userId);
  });

  socket.on("user-leave", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-leave", userId);
  });

  socket.on('toggle-video-recording', (userId, roomId, playerId) => {
    console.log("toggle-video-recoding")
    socket.join(roomId)
    const socketId = mapUserPeerIdToSocketId.get(playerId)
    socket.to(socketId).emit('toggle-video-recording', userId)
  })
});

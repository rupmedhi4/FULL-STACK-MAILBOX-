
import { Server } from 'socket.io';
import http from 'http'
import express from 'express'


const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,

  }
})

const users = {}

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
    users[userId] = socket.id;
  });

  socket.on("mailSent", (data) => {
    const receiverId = data.emitData?.receiverId;
    const receiverSocketId = users[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMail", data);
      console.log(`Mail delivered to ${receiverId}`);
    } else {
      console.log(`Receiver ${receiverId} is not connected`);
    }
  });

  socket.on("disconnect", () => {
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

export { app, io, server }

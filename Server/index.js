require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("../routes/userRoutes");
const messagesRoute = require("../routes/messagesRoute");

const socket = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/message", messagesRoute);

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("Connected to Mongoose");
    const server = app.listen(process.env.PORT || 3333, () =>
      console.log("Server running on port " + process.env.PORT)
    );

    const io = socket(server, {
      cors: {
        origin: "http://localhost:3000",
        Credentials: true,
      },
    });

    global.onlineUsers = new Map();

    io.on("connection", (socket) => {
      global.chatSocket = socket;
      socket.on("add-user", (userID) => {
        onlineUsers.set(userID, socket.id);
      });

      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
      });
    });
  })
  .catch((err) => console.error(err));

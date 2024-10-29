import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT | 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

export let io;

app.prepare().then(() => {
  const httpServer = createServer(handler);

  io = new Server(httpServer);
  let onlineUsers = [];

  io.on("connection", (socket) => {

    // When a new user joins
    socket.on('addNewUser', (loginUser) => {
      console.log("Login User:", loginUser);

      // Check if the user is unique
      if (loginUser && !onlineUsers.some(user => user.userId === loginUser.userId)) {
        onlineUsers.push({
          userId: loginUser.userId,
          username: loginUser.username,
          socketId: socket.id,
        });
      }

      // Broadcast the updated online users list
      io.emit('getUsers', onlineUsers);
    });

    // When a user disconnects
    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

      // Broadcast the updated online users list
      io.emit('getUsers', onlineUsers);
    });

    // When a message is sent from a client
    socket.on('sendMessage', (data) => {
      const recipientSocketId = onlineUsers[data.recipientId];
      console.log("Data from Client:", data);
      console.log("RecipientSocketId:", recipientSocketId);

      if (data.recipientId) {
        // Emit the message to the recipient
        io.to(data.recipientId).emit('getMessage', data);
        console.log("Message sent to recipient:", data.recipientId);
      } else {
        console.log("User not found or offline:", data.recipientId);
      }
    });

    socket.on('disconnect', () => {
      // Clean up disconnected user from onlineUsers
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
          break;
        }
      }
    });

    socket.on('call', (partcipants) => {
      if (partcipants) {
        io.to(partcipants.receiver.socketId).emit('incomingCall', partcipants);
      }
    });

    socket.on('webrtcSignal', async (data) => {
      if (data.isCaller) {
        if (data.ongoingCall.partcipants.receiver.socketId) {
          io.to(data.ongoingCall.partcipants.receiver.socketId).emit(
            'webrtcSignal', data
          )
        }
      } else {
        if (data.ongoingCall.partcipants.caller.socketId) {
          io.to(data.ongoingCall.partcipants.caller.socketId).emit(
            'webrtcSignal', data
          )
        }
      }
    });

    socket.on('hangup', async (data) => {
      let socketIdToEmitTo;

      if (data?.ongoingCall.partcipants.caller.userId === data.userHangupId) {
        socketIdToEmitTo = data?.ongoingCall.partcipants.receiver.socketId
      } else {
        socketIdToEmitTo = data?.ongoingCall.partcipants.caller.socketId
      }

      if (socketIdToEmitTo) {
        io.to(socketIdToEmitTo).emit('hangup');
      }
    });


  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
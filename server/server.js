// server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize express and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // Change this to your domain in production
    methods: ['GET', 'POST']
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Socket.IO server is running.');
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for 'message' events from client
  socket.on('message', (data) => {
    console.log(`Message received: ${data}`);

    // Broadcast message to all connected clients
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

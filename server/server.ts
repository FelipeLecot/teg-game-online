import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

// Inicializamos Express y HTTP Server
const app = express();
const server = http.createServer(app);

// Inicializamos Socket.IO con CORS
const io = new Server(server, {
  cors: {
    origin: '*', // En producción: reemplazar con tu dominio
    methods: ['GET', 'POST']
  }
});

// Ruta básica
app.get('/', (req: Request, res: Response) => {
  res.send('Socket.IO server is running.');
});

// Manejador de conexión Socket.IO
io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Escuchar eventos 'message'
  socket.on('message', (data: string) => {
    console.log(`Message received: ${data}`);

    // Reenviar el mensaje a todos los clientes conectados
    io.emit('message', data);
  });

  // Manejador de desconexión
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
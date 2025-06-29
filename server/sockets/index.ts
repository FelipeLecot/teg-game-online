import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from '../types/SocketEvents.ts';
import { handleGameEvents } from './gameHandlers.ts';

// Esta función se llama desde server.ts
export function registerSocketHandlers(io: Server<ServerToClientEvents>) {
  io.on('connection', (socket: Socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    // Registrar handlers de eventos de juego
    handleGameEvents(socket, io);
  });
}

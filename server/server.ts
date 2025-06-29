import express from 'express';
import http from 'http';
import { parseCookies } from './helpers/getCookies.ts'
import { Server, Socket } from 'socket.io';
import { Game } from './types.ts'

// discard-cards
// discard-effects-cards

const gamesArr:Game[] = []

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket: Socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  const cookies = parseCookies(socket.handshake.headers.cookie)
  const game = gamesArr[cookies.gameId];
  
  socket.on('draw-card', () => {
    // Enviar la carta SOLO al jugador que la pidió
    socket.emit('your-cards', game.methods.drawCard(cookies.playerId));
  });

  socket.on('play-card', ({ cardId }) => {
    const success = game.methods.playCard(socket.id, cardId);
    if (success) {
      const card = { id: cardId, name: 'País X' }; // deberías buscar el nombre real de la carta
      io.emit('card-played', { card, by: socket.id });
    }
  });

  socket.on('end-turn', () => {
    game.methods.advanceTurn(socket.id);

    const currentPlayer = game.players[game.turn];
    io.emit('turn-changed', currentPlayer.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
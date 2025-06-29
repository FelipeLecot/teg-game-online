import express from 'express';
import http from 'http';
import { parseCookies } from './helpers/getCookies.ts'
import { Server, Socket } from 'socket.io';
import { Game } from './types.ts'
import { getPlayerAndGameInfo } from './helpers/getPlayerAndGameInfo.ts';

// attack-country {
//  set game attack
// }

const gamesArr: Game[] = []
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
  const cookies = parseCookies(socket.handshake.headers.cookie);

  socket.on('play-effect-card', ({ cardName }) => {
    try {
      const { game, playerIndex, player } = getPlayerAndGameInfo(gamesArr, cookies);
      const hasCard = player.hasEffectCard(cardName);
      if (!hasCard) {
        throw new Error(`Player ${player.name} do not has this card`);
      }
      if (!player.isPlayerTurn()) {
        throw new Error(`Is not ${player.name} turn`);
      }
      io.emit('effect-card-played', game.playEffectCard(playerIndex, cardName));
      return true;
    } catch (error) {
      console.error(error);
      socket.emit('error', error.message)
    }
  });

  socket.on('end-turn', () => {
    const { game, playerIndex, player } = getPlayerAndGameInfo(gamesArr, cookies);
    if (!player.isPlayerTurn()) {
      return socket.emit('error', `Is not ${player.name} turn`)
    }
    game.advanceTurn();
    io.emit('turn-changed', playerIndex);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
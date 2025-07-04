import express from 'express';
import http from 'http';
import { Game } from './components/Game.ts';
import { parseCookies } from './helpers/getCookies.ts'
import { Server, Socket } from 'socket.io';
import { GameType, CountryType } from './types.ts'
import { getPlayerAndGameInfo } from './helpers/getPlayerAndGameInfo.ts';
import { updatePlayersStatus } from './helpers/updatePlayersStatus.ts';

const gamesArr: GameType[] = []
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

	socket.on('create-game', () => {
		try {
			const cookies = parseCookies(socket.handshake.headers.cookie);
			const game = new Game(cookies.playerName);
			gamesArr.push(game);
			return true
		} catch (error) {
			console.error(error);
			socket.emit('error', error.message);
		}
	})

	socket.on('join-game', () => {
		try {
			const cookies = parseCookies(socket.handshake.headers.cookie);
			const game = gamesArr[cookies.gameId];
			game.addNewPlayer(cookies.playerName, socket.id);
			return true
		} catch (error) {
			console.error(error);
			socket.emit('error', error.message);
		}
	})

	socket.on('play-effect-card', (cardName: string) => {
		try {
			const cookies = parseCookies(socket.handshake.headers.cookie);
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
			socket.emit('error', error.message);
		}
	});

	socket.on('end-turn', () => {
		try {
			const cookies = parseCookies(socket.handshake.headers.cookie);
			const { game, playerIndex, player } = getPlayerAndGameInfo(gamesArr, cookies);
			if (!player.isPlayerTurn()) throw new Error(`Is not ${player.name} turn`);

			const turn = game.advanceTurn();

			io.emit('turn-changed', turn);
		} catch (error) {
			console.error(error);
			socket.emit('error', error.message);
		}
	});

	socket.on('set-attack', (attackingCountry: string, defensiveCountry: string, diceCard: number[]) => {
		try {
			const cookies = parseCookies(socket.handshake.headers.cookie);
			const { game, playerIndex, player } = getPlayerAndGameInfo(gamesArr, cookies);
			if (!player.isPlayerTurn()) throw new Error(`Is not ${player.name} turn`);
			let countryObj: CountryType | undefined;
			const defensePlayerIndex = game.players.findIndex(player => {
				countryObj = player.countries.find((country) => country.name == defensiveCountry);
				return countryObj !== undefined;
			});

			const defensePlayer = game.players[defensePlayerIndex];
			if (!countryObj?.isNeighbor(attackingCountry)) throw new Error(`Countries are not neighbor`);

			game.setAttack(playerIndex, defensePlayerIndex, attackingCountry, defensiveCountry, diceCard);

			io.emit('attack-setted', { attackPlayer: player.name, defensePlayer });
			io.to(defensePlayer.socketId).emit('set-defense', defensiveCountry);
			return true;
		} catch (error) {
			console.error(error);
			socket.emit('error', error.message);
		}
	});

	socket.on('defense-setted', (isHandCard: boolean, diceCard: number[] | undefined) => {
		try {
			const cookies = parseCookies(socket.handshake.headers.cookie);
			const { game, playerIndex, player } = getPlayerAndGameInfo(gamesArr, cookies);
			if (!isHandCard && diceCard) throw new Error("Can't draw a card when a deck card is played");
			if (isHandCard && !diceCard) throw new Error("No card selected");
			if (!isHandCard) diceCard = player.getDiceCard(1)[0];
			if (!diceCard) throw new Error("Error drawing a dice card");

			game.setDefense(playerIndex, diceCard);
			game.attackConclude();
			io.emit('attack-conclude', { defensiveCard: diceCard });
			updatePlayersStatus(io, game)
			return true;
		} catch (error) {
			console.error(error);
			socket.emit('error', error.message);
		}
	})
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
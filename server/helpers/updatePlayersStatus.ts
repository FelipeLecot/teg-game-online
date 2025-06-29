import { Server } from 'socket.io';
import { GameType } from '../types.ts';

export function updatePlayersStatus(io: Server, game: GameType) {
	game.players.forEach((player, index) => {
		const currentSocketId = player.socketId;
		const playerStatus = player.getStatus();

		playerStatus.forEach(status => {
			io.to(currentSocketId).emit('set-player-name', status.name);
			io.to(currentSocketId).emit('set-dice-cards', status.dicecards);
			io.to(currentSocketId).emit('set-effect-cards', status.effectcards);
			io.to(currentSocketId).emit('set-countries', status.countries);
			io.to(currentSocketId).emit('set-buff', status.buff);
			io.to(currentSocketId).emit('set-debuff', status.debuff);
		})
	});
}
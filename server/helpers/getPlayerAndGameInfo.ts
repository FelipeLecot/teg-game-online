import { Game } from "../types";

export function getPlayerAndGameInfo (gamesArr: Game[], cookies, ) {
    const game = gamesArr[cookies.gameId];
    let playerIndex = game.players.findIndex(p => {p.name === cookies.playerName});
    const player = game.players[playerIndex];

    return { game, playerIndex, player }
}
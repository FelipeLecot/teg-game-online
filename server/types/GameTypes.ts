export interface Card {
  id: string;
  name: string;
}

export interface Player {
  id: string;
  username: string;
  hand: Card[];
}

export interface Game {
  id: string;
  players: Player[];
  deck: Card[];
  discardPile: Card[];
  currentTurnIndex: number;
}
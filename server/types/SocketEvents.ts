import { Card } from './GameTypes.ts';

export interface ClientToServerEvents {
  'draw-card': () => void;
  'play-card': (data: { cardId: string }) => void;
  'end-turn': () => void;
}

export interface ServerToClientEvents {
  'your-cards': (cards: Card[]) => void;
  'turn-changed': (playerId: string) => void;
  'card-played': (info: { card: Card, by: string }) => void;
}
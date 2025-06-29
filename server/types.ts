export enum EnumGameStates {
  Waiting = 'waiting',
  Started = 'started',
  Ended = 'ended'
}

export enum EnumObjectiveType {
  Player = 'player',
  Continent = 'continent',
  Country = 'country'
}

export enum EnumEffectCards {
  Spy = 'spy',
  Conquer = 'conquer',
  Buff = 'buff',
  Debuff = 'debuff',
  Steal = 'steal',
  ConquerConditional = 'conquer_conditional',
  Block = 'block',
  GameRule = 'gamerule'
}

export enum EnumEffectTargetCards {
  Players = 'players',
  Countries = 'countries'
}

export type ActionType = {
  type: string;
  playerIndex: number;
  data?: any;
  status?: 'pending' | 'success' | 'failed';
}

export type BufferTypes = {
  type: string;
  value: number
}

export type DebufferTypes = {
  type: string;
  value: number
}

export type PlayerStatus = {
  name: string;
  dicecards: number | number[][];
  effectcards: number | EffectCardType[];
  countries: CountryType[];
  buff: BufferTypes[];
  debuff: DebufferTypes[];
}

export interface GameType {
  state: EnumGameStates;
  owner: string;
  turn: number;
  round: number;
  players: PlayerType[];
  gameConfig: GameConfigType[],
  countries: CountryType[];
  continents: ContinentType[];
  
  actions: ActionType[];
  getDiceCard: () => number[][];
  setDefense: (playerIndex: number, diceCard: number[]) => number[]; // card
  attackConclude: () => void;
  getCountryOwner: (country: string) => string;
  setAttack: (playerIndex: number, defensePlayerIndex: number, attackingCountry: string, defensiveCountry: string, diceCard: number[]) => void; // events
  playEffectCard: (playerIndex: number, cardName: string) => void; // events
  isPlayerTurn: (playerIndex: number) => boolean;
  advanceTurn: () => number; // turn
}

export interface GameConfigType {
  type: string;
  value: string | number | boolean;
}

export interface ObjectiveType {
  description: string;
  players: number;
  objetiveConditions: ObjectiveConditionType[]
}

export interface ObjectiveConditionType {
  type: EnumObjectiveType;
  amount: number;
  target: string;
}

export interface PlayerType {
  name: string;
  socketId: string;
  dicecards: number[][];
  effectcards: EffectCardType[];
  countries: CountryType[];
  getDiceCard: () => number[];
  getStatus: () => PlayerStatus[];
  isPlayerTurn: () => boolean;
  hasEffectCard: (card: string) => boolean;
  hasDiceCard: (card: number[]) => boolean;
  addDiceCards: (cards: number[][]) => void;
  color: string;
}

export interface EffectCardType {
  name: string;
  description: string;
  type: EnumEffectCards;
  target: EnumEffectTargetCards;
}

export interface CountryType {
  name: string;
  neighbors: string[];
  continent: string;
  isNeighbor: (country: string) => boolean;
}

export interface ContinentType {
  countries: string[];
  reward: number;
  name: string;
  color: string;
}

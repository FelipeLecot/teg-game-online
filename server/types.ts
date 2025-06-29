export enum EnumGameStates {
  Waiting = 'waiting',
  Started = 'started',
  Attacking = 'attacking'
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

export interface Game {
  state: EnumGameStates;
  requiredPlayers: number;
  owner: string;
  turn: number;
  round: number;
  players: Player[];
  gameConfig: GameConfig[],
  
  playEffectCard: (playerIndex: number, cardName: string) => void;
  isPlayerTurn: (playerIndex: number) => boolean;
  advanceTurn: () => void;
}

export interface GameConfig {
  type: string;
  value: string | number | boolean;
}

export interface Objective {
  description: string;
  players: number;
  objetiveConditions: ObjectiveCondition[]
}

export interface ObjectiveCondition {
  type: EnumObjectiveType;
  amount: number;
  target: string;
}

export interface Player {
  name: string;
  dicecards: number[][];
  effectcards: EffectCard[];
  countries: Country[];
  isPlayerTurn: () => boolean;
  hasEffectCard: (card: string) => boolean;
  hasDiceCard: (card: string) => boolean;
}

export interface EffectCard {
  type: EnumEffectCards;
  target: EnumEffectTargetCards;
}

export interface Country {
  name: string;
  neighbors: string[];
  continent: string;
}

export interface Continent {
  countries: string[];
  reward: number;
}
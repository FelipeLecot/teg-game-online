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

export type ID = string;

export interface Game {
  id: ID;
  state: EnumGameStates;
  requiredPlayers: number;
  owner: ID;
  turn: number;
  round: number;
  players: Player[];
}

export interface GameConfig {
  id: ID;
  gameID: ID;
  type: string;
  value: string | number | boolean;
}

export interface Objective {
  id: ID;
  description: string;
  players: number;
  playerId: ID;
  gameId: ID;
}

export interface ObjectiveCondition {
  id: ID;
  objectiveId: ID;
  conditionId: ID;
  type: EnumObjectiveType;
  amount: number;
  target: string;
}

export interface Player {
  id: ID;
  name: string;
  countries: Country[];
  color: string
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
export type OwnedCountry = Country & { owned?: Player }

export interface Continent {
  countries: string[];
  reward: number;
}
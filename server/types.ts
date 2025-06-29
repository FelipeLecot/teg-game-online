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

export type ActionType = {
  type: string;
  playerIndex: number;
  data?: any;
  status?: 'pending' | 'success' | 'failed';
}

export type Event = { // update states of dice cards, effect cards, etc.
  type: string;
  playerIndex: number;
  data?: Partial<{
    dicecards: any;
    effectcards: any;
    countries: any;
    buff: any;
    debuff: any;
  }>;
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
  
  playEffectCard: (playerIndex: number, cardName: string) => void;
  isPlayerTurn: (playerIndex: number) => boolean;
  advanceTurn: () => void;
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
  dicecards: number[][];
  effectcards: EffectCardType[];
  countries: CountryType[];
  isPlayerTurn: () => boolean;
  hasEffectCard: (card: string) => boolean;
  hasDiceCard: (card: number[]) => boolean;
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
}

export interface ContinentType {
  countries: string[];
  reward: number;
  name: string;
  color: string;
}

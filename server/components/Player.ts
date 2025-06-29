import { CountryType, EffectCardType, PlayerType } from "../types";

const PLAYER_COLORS = ["red", "blue", "green", "yellow", "purple", "orange", "black", "white", "pink", "purple"];

export class Player implements PlayerType {
    name: string;
    dicecards: number[][];
    effectcards: EffectCardType[];
    color: string;
    countries: CountryType[];
    
    constructor(name: string) {
        this.name = name;
        this.color = PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];
        this.dicecards = [];
        this.effectcards = [];
        this.countries = [];
    }
    
    isPlayerTurn(): boolean {
        return false;
    }
    
    hasEffectCard(card: string): boolean {
        return this.effectcards.some((c) => c.name === card);
    }
    
    hasDiceCard(card: number[]): boolean {
        return this.dicecards.some((d) => d.join("") === card.join(""));
    }
}
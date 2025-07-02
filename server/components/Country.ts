import { CountryType } from "../types";

export class Country implements CountryType {
    name: string;
    neighbors: string[];
    continent: string;

    constructor(name: string, neighbors: string[] = [], continent: string = "") {
        this.name = name;
        this.neighbors = neighbors;
        this.continent = continent;
    }

    isNeighbor = (country: string) => {
        return this.neighbors.includes(country);
    };
}
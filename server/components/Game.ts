import { CountryType, PlayerType, ActionType, EffectCardType, GameType, ContinentType, EnumGameStates, GameConfigType } from "../types.ts";
import { Player } from "./Player.ts";
const FAKE_COUNTRY_NAMES = [
  "Atlantis",
  "Elbonia",
  "Gondor",
  "Narnia",
  "Wakanda",
  "Hogwarts",
  "Asgard",
  "Mordor",
  "Rivendell",
  "Krypton",
  "Metropolis",
  "Gotham",
  "Springfield",
  "Bedrock",
  "Neverland",
  "Oz",
  "Camelot",
  "Shire",
  "Hyrule",
  "Dalaran",
  "Pandaria",
  "Azeroth",
  "Tamriel",
  "Rapture",
  "Columbia",
  "Midgard",
  "Valhalla",
  "Bikini Bottom",
  "Wonderland",
  "Discworld",
  "Tatooine",
  "Endor",
  "Dagobah",
  "Kashyyyk",
  "Hoth",
  "Mustafar",
  "Arrakis",
  "Gilead",
  "Panem",
  "Westeros",
  "Essos",
  "Zarnovia",
  "Eldurak",
  "Mytheria",
  "Drakoria",
  "Virelia",
  "Kandoria",
  "Thalvaria",
  "Brelmoth",
  "Nemorin",
  "Ostoria",
  "Quirania",
  "Soltheris",
  "Velmora",
  "Jundaria",
  "Aurenwald",
  "Zelvarin",
  "Corthana",
  "Maldrak",
  "Ylliria",
  "Xarnthos",
  "Peronia",
  "Liberlandia",
  "Wascadascar",
];

const FAKE_CONTINENT_NAMES = [
  "Arkanor",
  "Veltharia",
  "Drokar",
  "Zynthor",
  "Lumora",
  "Targanis",
  "Mirelia",
  "Ulvaron",
  "Nythoria",
  "Xalandra",
];

const CONTINENT_COLOR = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "cyan",
  "gray",
];

export class Game implements GameType {
  countries: CountryType[] = [];
  continents: ContinentType[] = []
  players: PlayerType[] = [];
  turn = 0;
  round = 0;
  state = "waiting" as EnumGameStates;
  owner: string = "";
  gameConfig: GameConfigType[] = [];
  actions: ActionType[] = []
  
  constructor(owner: string, players: PlayerType[] = []) {
    this.owner = owner;
    this.players = players;
    this.players.push(new Player(owner));
  }

  playEffectCard: (playerIndex: number, cardName: string) => void;
  isPlayerTurn: (playerIndex: number) => boolean;

  generateCountriesAndAssignToPlayers() {
    const numCountries = this.players.length * 8;
    const selectedNames = FAKE_COUNTRY_NAMES.slice(0, numCountries);
    const continentCount = this.continents.length;

    const allCountries: CountryType[] = selectedNames.map((name, idx) => {
      const continent = this.continents[idx % continentCount];
      continent.countries.push(name);
      return new Country()
    });

    const adjacency: Record<string, Set<string>> = {};

    for (const country of allCountries) {
      adjacency[country.name] = new Set();
    }

    for (const country of allCountries) {
      const sameContinent = allCountries.filter(
        (c) => c.continent === country.continent && c.name !== country.name
      );
      const otherContinent = allCountries.filter(
        (c) => c.continent !== country.continent
      );

      const numNeighbors = Math.min(
        allCountries.length - 1,
        Math.floor(Math.random() * 5) + 1
      );

      const neighbors = new Set<string>();

      const numSameContinent = Math.floor(numNeighbors * 0.7);
      const numOtherContinent = numNeighbors - numSameContinent;

      while (neighbors.size < numSameContinent && sameContinent.length > 0) {
        const candidate =
          sameContinent[Math.floor(Math.random() * sameContinent.length)];
        if (candidate.name !== country.name) {
          neighbors.add(candidate.name);
        }
      }

      while (neighbors.size < numNeighbors && otherContinent.length > 0) {
        const candidate =
          otherContinent[Math.floor(Math.random() * otherContinent.length)];
        if (candidate.name !== country.name) {
          neighbors.add(candidate.name);
        }
      }

      for (const neighbor of neighbors) {
        adjacency[country.name].add(neighbor);
        adjacency[neighbor].add(country.name);
      }
    }

    for (const country of allCountries) {
      country.neighbors = [...adjacency[country.name]];
    }
  }

  advanceTurn: () => void;
}

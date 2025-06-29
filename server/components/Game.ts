import { CountryType, PlayerType, ActionType, EffectCardType, GameType, ContinentType, EnumGameStates, GameConfigType } from "../types.ts";
import { Country } from "./Country.ts";
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
  turnOffset = 0;
  round = 0;
  state = "waiting" as EnumGameStates;
  owner: string = "";
  gameConfig: GameConfigType[] = [];
  actions: ActionType[] = []
  availableDiceCards: number[][] = []
  
  constructor(owner: string) {
    this.owner = owner;
    this.players = [];
    this.players.push(new Player(owner));
  }

  setAttack = (playerIndex: number, defensePlayerIndex: number, attackingCountry: string, defensiveCountry: string, diceCard: number[]) => {
    if (!this.isPlayerTurn(playerIndex)) {
      throw new Error("It's not the player's turn");
    }
    const attackingPlayer = this.players[playerIndex];
    const defendingPlayer = this.players[defensePlayerIndex];
    const attackingCountryObj = attackingPlayer.countries.find(c => c.name === attackingCountry);
    const defensiveCountryObj = defendingPlayer.countries.find(c => c.name === defensiveCountry);
    if (!attackingCountryObj || !defensiveCountryObj) {
      throw new Error("Invalid countries for attack");
    }
    if (!attackingCountryObj.isNeighbor(defensiveCountry)) {
      throw new Error("Countries are not neighbors");
    }
    if (attackingPlayer.hasDiceCard(diceCard)) {
      attackingPlayer.dicecards = attackingPlayer.dicecards.filter(card => card.join("") !== diceCard.join(""));
    } else {
      throw new Error("Player does not have the specified dice card");
    }

    this.actions.push({
      type: "attack",
      playerIndex,
      status: "pending",
      data: {
        defensePlayerIndex,
        attackingCountry,
        defensiveCountry,
        attackDiceCard: diceCard,
      },
    } as ActionType)
  };

  setDefense = (playerIndex: number, diceCard: number[]) => {
    if (this.actions[this.actions.length - 1].data.defensePlayerIndex !== playerIndex) {
      throw new Error("It's not the defending player's turn");
    }
    const defendingPlayer = this.players[playerIndex];
    if (defendingPlayer.hasDiceCard(diceCard)) {
      defendingPlayer.dicecards = defendingPlayer.dicecards.filter(card => card.join("") !== diceCard.join(""));
    } else {
      throw new Error("Player does not have the specified dice card");
    }

    this.actions[this.actions.length - 1].data.defenseDiceCard = diceCard;
  };

  attackConclude = () => {
    if (this.actions.length === 0 || this.actions[this.actions.length - 1].status !== "pending") {
      throw new Error("No pending attack to conclude");
    }
    const lastAction = this.actions[this.actions.length - 1];

    const attackingPlayer = this.players[lastAction.playerIndex];
    const defendingPlayer = this.players[lastAction.data.defensePlayerIndex];

    if (!attackingPlayer || !defendingPlayer) {
      throw new Error("Invalid players for attack conclusion");
    }

    let defendingScore = 0;
    let attackingScore = 0;
    for (let i = 0; i < 3; i++) {
      if (lastAction.data.attackDiceCard[i] < lastAction.data.defenseDiceCard[i]) {
        attackingScore ++;
      }
      else {
        defendingScore ++;
      }
    }

    if (attackingScore > defendingScore) {
       const lostCountryIndex = defendingPlayer.countries.findIndex(
        (c) => c.name === lastAction.data.defensiveCountry
      );

      if (lostCountryIndex !== -1) {
        const [lostCountry] = this.players[lastAction.playerIndex].countries.splice(lostCountryIndex, 1);

        this.players[lastAction.data.defensePlayerIndex].countries.push(lostCountry);
      }
    }

    this.actions[this.actions.length - 1].status = "success";
    return lastAction;
  };

  addPlayer = (playerName: string, socketId: string) => {
    if (this.players.length >= 8) {
      throw new Error("Maximum number of players reached");
    }
    const newPlayer = new Player(playerName, socketId);
    this.players.push(newPlayer);
  };

  private generateDiceCards() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        for (let k = 0; k < 6; k++) {
          this.availableDiceCards.push([i + 1, j + 1, k + 1]);
        }
      }
    }

    this.availableDiceCards = this.availableDiceCards.sort(() => Math.random() - 0.5);
  }

  startGame = () => {
    this.state = "started" as EnumGameStates;
    this.generateCountriesAndAssignToPlayers();
    this.generateDiceCards();
    this.assignDiceCards();
    this.assignEffectCards();
  }

  playEffectCard = (playerIndex: number, cardName: string) => {
    
  };

  getDiceCard = (n = 1) => {
    if (this.availableDiceCards.length < n) {
      throw new Error("Not enough dice cards available");
    }
    let cards: number[][] = [];
    for (let i = 0; i < n; i++) {
      const cardIndex = Math.floor(Math.random() * this.availableDiceCards.length);
      let card = this.availableDiceCards.splice(cardIndex, 1)[0];
      if (!card) {
        throw new Error("Failed to get a dice cards");
      }
      
      cards.push(card)
    }
    return cards;
  }

  isPlayerTurn = (playerIndex: number) => {
    return ((this.turn + 1) % this.players.length + this.turnOffset % this.players.length) === playerIndex;
  };

  private generateCountriesAndAssignToPlayers() {
    const numCountries = this.players.length * 8;
    const selectedNames = FAKE_COUNTRY_NAMES.slice(0, numCountries);
    const continentCount = this.continents.length;

    const allCountries: CountryType[] = selectedNames.map((name, idx) => {
      const continent = this.continents[idx % continentCount];
      continent.countries.push(name);
      return new Country(
        name,
        [],
        continent.name
      )
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

  private assignDiceCards() {
    const numCardsPerPlayer: number = this.gameConfig.find(config => config.type === "diceCards")?.value as number || 7;
    
    for (const player of this.players) {
      player.dicecards = [];
      for (let i = 0; i < numCardsPerPlayer; i++) {
        if (this.availableDiceCards.length === 0) {
          throw new Error("No dice cards available");
        }
        const cardIndex = Math.floor(Math.random() * this.availableDiceCards.length);
        const card = this.availableDiceCards[cardIndex];
        player.dicecards.push(card);
        this.availableDiceCards.splice(cardIndex, 1);
      }
    }
  }

  private assignEffectCards() {

  }

  advanceTurn = () => {
    this.turn = this.turn + 1;
    if ((this.turn + 1) % this.players.length + this.turnOffset % this.players.length === 0) {
      this.endRound();
    }
    return (this.turn + 1) % this.players.length + this.turnOffset % this.players.length;
  };

  private endRound = () => {
    this.round++;
    this.turnOffset++;
    this.players.forEach((element, index) => {
      const diceCardsToAdd = element.countries.length % 2 + Math.floor(element.countries.length);
      const newDiceCards = this.getDiceCard(diceCardsToAdd);
      this.players[index].addDiceCards(newDiceCards); 
    })
  };

  addDiceCardToDeck = () => {

  }

  addEffectCardToDeck = () => {

  }

  getCountryOwner = (country: string) => {
    const foundPlayer = this.players.find(player => player.countries.some(c => c.name === country));
    if (!foundPlayer) {
      throw new Error(`Country ${country} does not have an owner`);
    }
    return foundPlayer.name;
  }
}

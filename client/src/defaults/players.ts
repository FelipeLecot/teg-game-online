import { defaultCountries } from "./countries"
import type { Player } from "../utils/types"

const basePlayers: Player[] = [
  {
    id: 'gnasgmsagkva',
    name: 'Player',
    countries: [],
    color: 'red',
  },
  {
    id: 'asgnaskgmsagkva',
    name: 'Player 2',
    countries: [],
    color: 'green',
  },
  {
    id: 'fagnsava',
    name: 'Player 3',
    countries: [],
    color: 'blue',
  },
]

// Distribuir los países entre los jugadores (round-robin)
const defaultPlayers: Player[] = [...basePlayers]
defaultCountries.forEach((country, index) => {
  const playerIndex = index % defaultPlayers.length
  defaultPlayers[playerIndex].countries.push(country)
})

export { defaultPlayers }
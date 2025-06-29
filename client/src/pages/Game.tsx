import React from "react"
import type { Country, Player } from "../utils/types"
import { io, type Socket } from "socket.io-client"
import { defaultCountries } from "../defaults/countries"
import { defaultPlayers } from "../defaults/players"
import { defaultCards } from "../defaults/cards"
import CountriesList from "../components/hud/countries_list"
import PlayersList from "../components/hud/players_list"
import CardList from "../components/hud/card_list"

let socket: Socket

type Props = {
  playerName: string;
  gameKey: string;
}

// --- CONTEXTO DE ACCIONES ---
type GameActionsContextType = {
  setTargetCountry: (countryName: string | undefined) => void;
}

const GameActionsContext = React.createContext<GameActionsContextType | null>(null)

export const useGameActions = () => {
  const context = React.useContext(GameActionsContext)
  if (!context) throw new Error("useGameActions must be used within GameActionsContext.Provider")
  return context
}

// --- CONTEXTO DE VALORES ---
type GameValuesContextType = {
  targetCountry: string | undefined;
  turn: number;
}

const GameValuesContext = React.createContext<GameValuesContextType | null>(null)

export const useGameValues = () => {
  const context = React.useContext(GameValuesContext)
  if (!context) throw new Error("useGameValues must be used within GameValuesContext.Provider")
  return context
}

// --- COMPONENTE GAME ---
export default function Game({ playerName = 'Guest', gameKey = '' }: Props) {
  const [players, setPlayers] = React.useState<Player[]>(defaultPlayers)

  const [turn, setTurn] = React.useState<number>(0)
  const [targetCountry, setTargetCountry] = React.useState<string | undefined>(undefined)
  
  const [cards, setCards] = React.useState<number[][]>(defaultCards)

  React.useEffect(() => {
    socket = io(gameKey !== '' ? gameKey : "http://localhost:3000")

    socket.on("connect", () => {
      console.log("Connected to socket game:", socket.id)
      setPlayers(prev => [...prev, {
        id: socket.id ?? '',
        name: playerName,
        countries: [],
        color: 'yellow'
      }])
    })

    socket.on("update_cards", (newCards: number[][]) => {
      setCards(newCards)
    })

    // return () => socket.disconnect()
  }, [])

  console.log(targetCountry)

  const gameActions = React.useMemo(() => ({
    setTargetCountry,
  }), [])

  const gameValues = React.useMemo(() => ({
    targetCountry,
    turn,
  }), [targetCountry, turn])

  return (
    <GameActionsContext.Provider value={gameActions}>
      <GameValuesContext.Provider value={gameValues}>
        <main>
          <CountriesList list={players} />
          <PlayersList list={players} />
          <CardList list={cards} />
        </main>
      </GameValuesContext.Provider>
    </GameActionsContext.Provider>
  )
}

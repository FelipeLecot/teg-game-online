import React from "react"
import type { Player } from "../utils/types"
import { io, type Socket } from "socket.io-client"
import { defaultPlayers } from "../defaults/players"
import { defaultCards } from "../defaults/cards"
import CountriesList from "../components/hud/countries_list"
import PlayersList from "../components/hud/players_list"
import CardList from "../components/hud/card_list"
import { defaultCountries } from "../defaults/countries"
import generateContinentsWithCountries from "../defaults/logic/generateContinents"
import type { selectedCardType } from "../utils/clientTypes"
import AttackButton from "../components/common/attack_button"
import { playerOwnsCountry } from "../logic/playerOwnsCountry"
import { playerHasNeighborOf } from "../logic/playerHasNeighborOf"
import { getNeighboringCountryOfPlayer } from "../logic/getNeighboringCountryOfPlayer"

let socket: Socket

type Props = {
  playerName: string;
  gameKey: string;
}

type GameActionsContextType = {
  setTargetCountry: (countryName: string | undefined) => void;
  setSelectedCard: (selectedCard: selectedCardType) => void;
}

const GameActionsContext = React.createContext<GameActionsContextType | null>(null)

export const useGameActions = () => {
  const context = React.useContext(GameActionsContext)
  if (!context) throw new Error("useGameActions must be used within GameActionsContext.Provider")
  return context
}

type GameValuesContextType = {
  targetCountry: string | undefined;
  turn: number;
  selectedCard: selectedCardType | undefined;
}

const GameValuesContext = React.createContext<GameValuesContextType | null>(null)

export const useGameValues = () => {
  const context = React.useContext(GameValuesContext)
  if (!context) throw new Error("useGameValues must be used within GameValuesContext.Provider")
  return context
}

let continents = generateContinentsWithCountries(defaultCountries)
let localPlayerIndex = 0


export default function Game({ playerName = 'Guest', gameKey = '' }: Props) {
  const [players, setPlayers] = React.useState<Player[]>(defaultPlayers)

  const [turn, setTurn] = React.useState<number>(0)
  const [targetCountry, setTargetCountry] = React.useState<string | undefined>(undefined)
  const [selectedCard, setSelectedCard] = React.useState<selectedCardType | undefined>(undefined)
  
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

  const setTargetCountryHandler = (newValue: string | undefined)=> {
    if(newValue !== undefined && (playerOwnsCountry(players[localPlayerIndex], newValue) || !playerHasNeighborOf(players[localPlayerIndex], newValue))) return

    setTargetCountry(newValue)
  }

  const gameActions = React.useMemo(() => ({
    setTargetCountry: setTargetCountryHandler,
    setSelectedCard,
  }), [])

  const gameValues = React.useMemo(() => ({
    targetCountry,
    turn,
    selectedCard,
  }), [targetCountry, turn, selectedCard])

  const attack = ()=>{
    if(!targetCountry) return 
    const originCountry = getNeighboringCountryOfPlayer(players[localPlayerIndex], targetCountry)
    if(!originCountry) return 
    socket.emit("set-attack", originCountry, targetCountry, selectedCard)
  }

  return (
    <GameActionsContext.Provider value={gameActions}>
      <GameValuesContext.Provider value={gameValues}>
        <main>
          <CountriesList list={players} continents={continents} localPlayerIndex={localPlayerIndex} />
          <PlayersList list={players} />
          <CardList list={cards} />

          <AttackButton selectedCard={selectedCard} targetCountry={targetCountry} attack={attack}/>
        </main>
      </GameValuesContext.Provider>
    </GameActionsContext.Provider>
  )
}

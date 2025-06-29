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

export default function Game ({playerName = 'Guest', gameKey = ''}: Props){
  const [countries, setCountries] = React.useState<Country[]>(defaultCountries)
  const [turn, setTurn] = React.useState<number>(0)
  const [players, setPlayers] = React.useState<Player[]>(defaultPlayers)
  const [cards, setCards] = React.useState<number[][]>(defaultCards)

  React.useEffect(() => {
    // Connect to the socket game
    socket = io(gameKey !== '' ? gameKey : "http://localhost:3000")

    socket.on("connect", () => {
      console.log("Connected to socket game:", socket.id)
      setPlayers([...players, {
        id: socket.id ?? '',
        name: playerName,
        countries: []
      }])
      setCountries(defaultCountries)
    })

    // update cards
    socket.on("update_cards", (newCards: number[][]) => {
      setCards(newCards)
    })

    // return () => {
    //   socket.disconnect()
    // }
  }, [])

  return (
    <main>
      <CountriesList list={countries}/>
      <PlayersList list={players} turn={turn}/>
      <CardList list={cards} />
    </main>
  )
}
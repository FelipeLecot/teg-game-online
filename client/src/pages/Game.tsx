import React from "react"
import type { Player } from "../utils/types"
import { io, type Socket } from "socket.io-client"
import CardList from "../components/hud/cardList"
import PlayersList from "../components/hud/playersList"

const defaultCards: number[][] = [
  [3, 3, 1],
  [3, 3, 2],
  [4, 3, 2],
  [5, 3, 2],
]

const defaultPlayers: Player[] = [
  {
    id: 'gnasgmsagkva',
    name: 'Player',
    countries: [],
  },
  {
    id: 'asgnaskgmsagkva',
    name: 'Player 2',
    countries: [],
  },
  {
    id: 'fagnsava',
    name: 'Player 3',
    countries: [],
  },
]

let socket: Socket

type Props = {
    playerName: string;
    gameKey: string;
}

export default function Game ({playerName = 'Guest', gameKey = ''}: Props){
    
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
      <PlayersList list={players} turn={turn}/>
      <CardList list={cards} />
    </main>
  )
}
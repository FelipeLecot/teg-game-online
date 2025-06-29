
import React from 'react'
import './globals.css'
import Menu from './pages/Menu'
import Game from './pages/Game'

function App() {
  const [playerName, setPlayerName] = React.useState('')
  const [gameKey, setGameKey] = React.useState('')
  const [page, setPage] = React.useState('game')
  const connectToGame = (playerName: string, gameKey: string)=>{
    setPlayerName(playerName)
    setGameKey(gameKey)
    setPage('game')
  }

  const pages: {[key:string]: any} = {
    'menu': <Menu connectToGame={connectToGame}/>,
    'game': <Game gameKey={gameKey} playerName={playerName}/>
  }
  return pages[page]
}

export default App

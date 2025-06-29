
import React from 'react'
import './globals.css'
import Menu from './pages/Menu'
import Game from './pages/Game'

function App() {
  const [playerName, setPlayerName] = React.useState('')
  const [serverIp, setServerIp] = React.useState('')
  const [page, setPage] = React.useState('menu')
  const connectToGame = (playerName: string, serverIp: string)=>{
    setPlayerName(playerName)
    setServerIp(serverIp)
    setPage('game')
  }

  const pages: {[key:string]: any} = {
    'menu': <Menu connectToGame={connectToGame}/>,
    'game': <Game serverIp={serverIp} playerName={playerName}/>
  }
  return pages[page]
}

export default App

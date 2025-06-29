type Props = {
    connectToGame: Function
}

export default function Menu ({connectToGame}:Props) {
    const connect = ()=>{
        const playerName_input = document.getElementById('playername_input') as HTMLInputElement
        const gameKey_input = document.getElementById('gamekey_input') as HTMLInputElement

        if(!playerName_input || !gameKey_input || !gameKey_input.value) return 
        connectToGame(playerName_input.value ?? 'Guest', gameKey_input)
    }

    return <main className="main-menu">
        <input id='playername_input' placeholder="player name..."/>
        <input id='gamekey_input' placeholder="game key..."/>

        <button onClick={connect}>Connect</button>
    </main>
}
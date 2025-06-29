type Props = {
    connectToGame: Function
}

export default function Menu ({connectToGame}:Props) {
    const connect = ()=>{
        const playerName_input = document.getElementById('playername_input') as HTMLInputElement
        const serverIp_input = document.getElementById('serverip_input') as HTMLInputElement

        if(!playerName_input || !serverIp_input || !serverIp_input.value) return 
        connectToGame(playerName_input.value ?? 'Guest', serverIp_input)
    }

    return <main>
        <input id='playername_input' placeholder="player name..."/>
        <input id='serverip_input' placeholder="server ip..."/>

        <button onClick={connect}>Connect</button>
    </main>
}
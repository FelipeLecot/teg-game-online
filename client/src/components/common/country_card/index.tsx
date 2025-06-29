import type React from 'react'
import { useGameActions, useGameValues } from '../../../pages/Game'
import type { OwnedCountry } from '../../../utils/types'
// import PlayerIcon from '../player_icon'
import styles from './styles.module.css'


export default function CountryCard ({country, continentColor, allowed, owned}: {country: OwnedCountry, continentColor: string, allowed: boolean, owned: boolean}) {
  const { setTargetCountry } = useGameActions()
  const { targetCountry } = useGameValues()
    return <div
        key={Math.random()}
        className={'card-country' + (targetCountry === country.name ? ' selected' : '')}
        // className={[styles.card, targetCountry === country.name ? styles.selected : ''].join(' ')}
        onClick={()=>{setTargetCountry(country.name)}}
        style={{ 
            '--background': continentColor, 
            boxShadow: allowed ? '0 0 5px white' : owned ? '0 0 5px lime' : '0 0 5px red',
            color: allowed ? 'black' : owned ? 'lime' : 'red'
        } as React.CSSProperties}
    >
        {/* {country.owned && <PlayerIcon playerData={country.owned} hasTheTurn={false}/>} */}
        <h4>{country.name}</h4>
        <hr />
        <ul>
            {country.neighbors.map(neig=>{
                return <li key={Math.random()}>
                    {neig}
                </li>
            })}
        </ul>
    </div>
}
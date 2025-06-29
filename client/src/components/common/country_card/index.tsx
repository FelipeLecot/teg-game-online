import { useGameActions, useGameValues } from '../../../pages/Game'
import type { OwnedCountry } from '../../../utils/types'
import PlayerIcon from '../player_icon'
import styles from './styles.module.css'


export default function CountryCard ({country, continentColor}: {country: OwnedCountry, continentColor: string}) {
  const { setTargetCountry } = useGameActions()
  const { targetCountry } = useGameValues()
    return <div
        key={Math.random()}
        className='card-country'
        // className={[styles.card, targetCountry === country.name ? styles.selected : ''].join(' ')}
        onClick={()=>{setTargetCountry(country.name)}}
        style={{ background: continentColor }}
    >
        {country.owned && <PlayerIcon playerData={country.owned} hasTheTurn={false}/>}
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
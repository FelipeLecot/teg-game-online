import { useGameActions, useGameValues } from '../../../pages/Game'
import type { Country } from '../../../utils/types'
import styles from './styles.module.css'


export default function CountryCard ({country}: {country: Country}) {
  const { setTargetCountry } = useGameActions()
  const { targetCountry } = useGameValues()
    return <div
        key={Math.random()}
        className={[styles.card, targetCountry === country.name ? styles.selected : ''].join(' ')}
        onClick={()=>{setTargetCountry(country.name)}}
    >
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
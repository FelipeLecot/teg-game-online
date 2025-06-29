import type { Country } from '../../../utils/types'
import styles from './styles.module.css'


export default function CountryCard ({country}: {country: Country}) {
    return <div
        key={Math.random()}
        className={styles.card}
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
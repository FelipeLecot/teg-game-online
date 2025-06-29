import { divideCountriesByContinent } from "../../../logic/divideCountriesByContinent"
import joinCountries from "../../../logic/joinCountries"
import { playerHasNeighborOf } from "../../../logic/playerHasNeighborOf"
import type { OwnedCountry, Player } from "../../../utils/types"
import CountryCard from "../../common/country_card"
import styles from './styles.module.css'
import './styles.scss'

export default function CountriesList({ list, localPlayerIndex, continents }: { list: Player[], localPlayerIndex: number, continents: {[key:string]: {name: string, color: string}} }) {
  if (!list || list.length === 0) return null

  const joinedList: OwnedCountry[] = joinCountries(list)
  const sortedList = divideCountriesByContinent(joinedList)

  const Column = ({ title, array }: { title: string, array: OwnedCountry[] }) => {
    return (
      <div key={title} className="card-stack">
        <h4>{title}</h4>
        <ul>
          {array.map(country => (
            <CountryCard key={country.name} country={country} continentColor={continents[country.continent].color} allowed={playerHasNeighborOf(list[localPlayerIndex], country.name)} />
          ))}
        </ul>
      </div>
    )
  }

  return (
    <ul className={styles.countriesList}>
      {Object.keys(sortedList).map(continent => (
        <Column key={continent} title={continent} array={sortedList[continent]} />
      ))}
    </ul>
  )
}

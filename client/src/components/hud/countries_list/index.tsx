import { divideCountriesByContinent } from "../../../logic/divideCountriesByContinent"
import joinCountries from "../../../logic/joinCountries"
import type { OwnedCountry, Player } from "../../../utils/types"
import CountryCard from "../../common/country_card"
import styles from './styles.module.css'

export default function CountriesList({ list, continents }: { list: Player[], continents: {[key:string]: {name: string, color: string}} }) {
  if (!list || list.length === 0) return null

  const joinedList: OwnedCountry[] = joinCountries(list)
  const sortedList = divideCountriesByContinent(joinedList)

  const Column = ({ title, array }: { title: string, array: OwnedCountry[] }) => {
    return (
      <div key={title}>
        <h4>{title}</h4>
        <ul>
          {array.map(country => (
            <CountryCard key={country.name} country={country} continentColor={continents[country.continent].color} />
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

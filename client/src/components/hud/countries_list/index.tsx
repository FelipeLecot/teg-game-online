import { divideCountriesByContinent } from "../../../logic/divideCountriesByContinent"
import type { Country, Player } from "../../../utils/types"
import CountryCard from "../../common/country_card"
import styles from './styles.module.css'

type OwnedCountry = Country & { owned: string }

function joinCountries(players: Player[]): OwnedCountry[] {
  const result: OwnedCountry[] = []

  for (const player of players) {
    for (const country of player.countries) {
      result.push({ ...country, owned: player.name })
    }
  }

  return result
}

export default function CountriesList({ list }: { list: Player[] }) {
  if (!list || list.length === 0) return null

  const joinedList = joinCountries(list)
  const sortedList = divideCountriesByContinent(joinedList)

  const Column = ({ title, array }: { title: string, array: OwnedCountry[] }) => {
    return (
      <div key={title}>
        <h4>{title}</h4>
        <ul>
          {array.map(country => (
            <CountryCard key={country.name} country={country} />
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

import { divideCountriesByContinent } from "../../../logic/divideCountriesByContinent";
import type { Country } from "../../../utils/types";
import CountryCard from "../../common/country_card";
import styles from './styles.module.css'

export default function CountriesList ({list}: {list: Country[]}) {
    if(!list || list.length === 0) return 
    let sortedList = divideCountriesByContinent(list)

    const Column = ({title, array}: {title: string, array: Country[]}) => {
        return <div key={Math.random()}>
            <h4>{title}</h4>
            <ul>
                {array.map(country=>{
                    return <CountryCard country={country}/>
                })}
            </ul>
        </div>
    }
    
    return <ul className={styles.countriesList}>
        {Object.keys(sortedList).map(countryName=>{
            return <Column title={countryName} array={sortedList[countryName]} />
        })}
    </ul>
}
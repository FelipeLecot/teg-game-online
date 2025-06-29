import type { OwnedCountry } from "../utils/types";

export const divideCountriesByContinent = (countries: OwnedCountry[]) => {
    const result: { [key: string]: OwnedCountry[] } = {};

    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];
        if (!result[country.continent]) {
            result[country.continent] = [];
        }
        result[country.continent].push(country);
    }

    return result;
};
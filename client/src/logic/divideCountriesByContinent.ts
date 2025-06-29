import type { Country } from "../utils/types";

export const divideCountriesByContinent = (countries: Country[]) => {
    const result: { [key: string]: Country[] } = {};

    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];
        if (!result[country.continent]) {
            result[country.continent] = [];
        }
        result[country.continent].push(country);
    }

    return result;
};
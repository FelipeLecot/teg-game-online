import type { Country } from "../../utils/types";

export default function generateContinentsWithCountries(countries: Country[]) {
    const continentsMap: {[key: string]: {name: string, color: string}} = {};

    // Group countries by continent
    countries.forEach(country => {
        const { continent } = country;
        if (!continentsMap[continent]) {
            continentsMap[continent] = {
                name: continent,
                color: getRandomColor() // Generate a random color for each continent
            };
        }
    });

    // Convert the continentsMap object to an array
    return continentsMap
}

// Function to generate a random color in hex format
function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`; // Ensure it's 6 digits
}
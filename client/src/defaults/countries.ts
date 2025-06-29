export const defaultCountries = [
    {
        name: "Argentina",
        neighbors: ["Chile", "Brazil"],
        continent: "South America"
    },
    {
        name: "Brazil",
        neighbors: ["Argentina", "Colombia", "Peru"],
        continent: "South America"
    },
    {
        name: "Chile",
        neighbors: ["Argentina", "Peru"],
        continent: "South America"
    },
    {
        name: "Peru",
        neighbors: ["Chile", "Brazil", "Colombia"],
        continent: "South America"
    },
    {
        name: "Colombia",
        neighbors: ["Brazil", "Peru", "Mexico"],
        continent: "South America"
    },
    {
        name: "Mexico",
        neighbors: ["Colombia", "United States"],
        continent: "North America"
    },
    {
        name: "United States",
        neighbors: ["Mexico", "Canada"],
        continent: "North America"
    },
    {
        name: "Canada",
        neighbors: ["United States", "Greenland"],
        continent: "North America"
    },
    {
        name: "Greenland",
        neighbors: ["Canada", "Iceland"],
        continent: "Europe"
    },
    {
        name: "Iceland",
        neighbors: ["Greenland"],
        continent: "Europe"
    }
];

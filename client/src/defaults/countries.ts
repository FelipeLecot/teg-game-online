export const defaultCountries = [
  // América del Sur
  { name: "Argentina", neighbors: ["Chile", "Brazil"], continent: "South America" },
  { name: "Brazil", neighbors: ["Argentina", "Colombia", "Peru"], continent: "South America" },
  { name: "Chile", neighbors: ["Argentina", "Peru"], continent: "South America" },
  { name: "Peru", neighbors: ["Chile", "Brazil", "Colombia"], continent: "South America" },
  { name: "Colombia", neighbors: ["Brazil", "Peru", "Mexico"], continent: "South America" },

  // América del Norte
  { name: "Mexico", neighbors: ["Colombia", "United States"], continent: "North America" },
  { name: "United States", neighbors: ["Mexico", "Canada"], continent: "North America" },
  { name: "Canada", neighbors: ["United States", "Greenland"], continent: "North America" },

  // Europa
  { name: "Greenland", neighbors: ["Canada", "Iceland"], continent: "Europe" },
  { name: "Iceland", neighbors: ["Greenland", "Norway"], continent: "Europe" },
  { name: "Norway", neighbors: ["Iceland", "Sweden", "Finland"], continent: "Europe" },
  { name: "Sweden", neighbors: ["Norway", "Finland"], continent: "Europe" },
  { name: "Finland", neighbors: ["Norway", "Sweden", "Russia"], continent: "Europe" },

  // Asia
  { name: "Russia", neighbors: ["Finland", "China", "Mongolia"], continent: "Asia" },
  { name: "China", neighbors: ["Russia", "India", "Mongolia"], continent: "Asia" },
  { name: "Mongolia", neighbors: ["Russia", "China"], continent: "Asia" },
  { name: "India", neighbors: ["China", "Pakistan"], continent: "Asia" },
  { name: "Pakistan", neighbors: ["India", "Afghanistan"], continent: "Asia" },
  { name: "Afghanistan", neighbors: ["Pakistan"], continent: "Asia" },

  // África
  { name: "Egypt", neighbors: ["Libya", "Sudan"], continent: "Africa" },
  { name: "Libya", neighbors: ["Egypt", "Sudan", "Algeria"], continent: "Africa" },
  { name: "Algeria", neighbors: ["Libya", "Mali"], continent: "Africa" },
  { name: "Mali", neighbors: ["Algeria", "Senegal"], continent: "Africa" },
  { name: "Senegal", neighbors: ["Mali"], continent: "Africa" },
  { name: "Sudan", neighbors: ["Libya", "Egypt"], continent: "Africa" },

  // Oceanía
  { name: "Australia", neighbors: ["New Zealand", "Indonesia"], continent: "Oceania" },
  { name: "New Zealand", neighbors: ["Australia"], continent: "Oceania" },
  { name: "Indonesia", neighbors: ["Australia", "Papua New Guinea"], continent: "Oceania" },
  { name: "Papua New Guinea", neighbors: ["Indonesia"], continent: "Oceania" }
]

import type { Player } from "../utils/types";

export function playerOwnsCountry(player: Player, countryName: string): boolean {
  return player.countries.some(country =>
    country.name === countryName
  )
}
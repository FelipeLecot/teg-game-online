import type { Player } from "../utils/types"

export function playerHasNeighborOf(player: Player, targetCountryName: string): boolean {
  return player.countries.some(country =>
    country.neighbors.includes(targetCountryName)
  )
}

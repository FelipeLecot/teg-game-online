import type { Player } from "../utils/types"

export function getNeighboringCountryOfPlayer(player: Player, targetCountryName: string): string | undefined {
  const match = player.countries.find(country =>
    country.neighbors.includes(targetCountryName)
  )
  return match?.name
}

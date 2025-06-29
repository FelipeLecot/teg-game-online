import type { OwnedCountry, Player } from "../utils/types"

export default function joinCountries(players: Player[]): OwnedCountry[] {
  const result: OwnedCountry[] = []

  for (const player of players) {
    for (const country of player.countries) {
      result.push({ ...country, owned: player.name })
    }
  }

  return result
}

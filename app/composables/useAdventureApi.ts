import type { AdventureSummary } from "~/types/adventure-types"

export function useAdventureApi() {
  const api = useWonServiceApi()

  /**
   * Returns a list of adventures -- just the metadata, not the full documents.
   * @returns 
   */
  const fetchAdventures = async () => {
    const results = await api.get<AdventureSummary[]>('/adventures')
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get adventures. (%d)', results.status)
      return []
    }
  }

  return {
    fetchAdventures
  }
}
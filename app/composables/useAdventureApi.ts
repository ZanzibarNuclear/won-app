import type { AdventureSummary, StorylineSummary, Storyline } from "~/types/adventure-types"

export function useAdventureApi() {
  const api = useWonServiceApi()

  /**
   * Returns a list of adventures
   * @returns 
   */
  const fetchAdventures = async () => {
    const results = await api.get<AdventureSummary[]>('adv/adventures')
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get adventures. (%d)', results.status)
      return []
    }
  }

  /**
   * Returns a list of adventures
   * @returns 
   */
  const fetchStorylines = async () => {
    const results = await api.get<StorylineSummary[]>('adv/storylines')
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get adventures. (%d)', results.status)
      return []
    }
  }

  /**
   * Returns a list of adventures
   * @returns 
   */
  const fetchStoryline = async (id: string) => {
    const results = await api.get<Storyline>('adv/storylines/' + id)
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get adventures. (%d)', results.status)
      return null
    }
  }

  return {
    fetchAdventures,
    fetchStorylines,
    fetchStoryline
  }
}
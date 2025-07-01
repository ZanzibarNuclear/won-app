import type { AdventureSummary, StorylineSummary, Storyline, Chapter } from "~/types/adventure-types"

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
   * Returns an adventure with the given ID
   * @returns Storyline, including chapters, if successful; otherwise null
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

  /**
   * Adds a new storyline to the mix
   * @returns Storyline object if successful; otherwise null
   */
  const addStoryline = async (title: string, description: string) => {
    const results = await api.post<Storyline>('adv/storylines', { title, description })
    if (results.ok) {
      return results.data
    } else {
      console.log('Unable to add new storyline. (%d)', results.status)
      return null
    }
  }

  /**
   * Submits changes to storyline for safe keeping.
   * @returns Storyline object if successful; otherwise null
   */
  const updateStoryline = async (summary: StorylineSummary) => {
    const results = await api.patch<Storyline>(`adv/storylines/${summary._id}`, summary)
    if (results.ok) {
      return results.data
    } else {
      console.log('Unable to update storyline. (%d)', results.status)
      return null
    }
  }

  /**
   * Returns a list of adventures
   * @returns 
   */
  const addChapter = async (storylineId: string, chapterInfo: Chapter) => {
    console.log('api.addChapter', storylineId, chapterInfo)
    const results = await api.post<Chapter>(`adv/storylines/${storylineId}/chapters`, chapterInfo)
    if (results.ok) {
      return results.data
    } else {
      console.log('Something went wrong. Unable to get adventures. (%d)', results.status)
      return null
    }
  }

  /**
   * Submits changes to chapter for safe keeping.
   * @returns Storyline object if successful; otherwise null
   */
  const updateChapter = async (storylineId: string, chapterInfo: Chapter) => {
    console.log('api.updateChapter', storylineId, chapterInfo)
    const results = await api.patch<Chapter>(`adv/storylines/${storylineId}/chapters/${chapterInfo._id}`, chapterInfo)
    if (results.ok) {
      return results.data
    } else {
      console.log('Unable to update storyline. (%d)', results.status)
      return null
    }
  }

  return {
    fetchAdventures,
    fetchStorylines,
    addStoryline,
    updateStoryline,
    fetchStoryline,
    addChapter,
    updateChapter
  }
}
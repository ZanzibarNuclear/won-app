import type {
  UsersReturned,
  ApiKeys,
  FluxRatingBatch,
  FluxRatingLevel,
  FluxRating
} from '~/types/won-types'

export function useAdminService() {

  const api = useWonServiceApi()

  const fetchSystemUsers = async () => {
    console.log('Looking for users')
    const response = await api.get<UsersReturned>('access/users')
    const { items, total, hasMore } = response.data

    console.log('found ' + total + ' users')
    console.log(hasMore ? 'there are more.' : 'that is all.')

    return items
  }

  const showApiKeys = async (userId: string) => {
    console.log('Show all keys for system users')
    const keys = await api.get<ApiKeys[]>('access/keys?userId=' + userId)
    console.log('keys: ' + JSON.stringify(keys))
    return keys.data
  }

  const assignApiKey = async (userId: string) => {
    console.log('Requesting key for system user')
    const key = await api.post<ApiKeys>('access/keys', { userId })
    console.log('key: ' + JSON.stringify(key))
    return key.data
  }

  // == Flux moderation ==

  const fetchRatingLevels = async () => {
    const result = await api.get<FluxRatingLevel[]>('flux-moderation/rating-levels')
    if (result.ok) {
      return result.data
    }
    return []
  }

  const fetchFluxRatings = async (limit: number, offset: number, filters: any) => {

    //  ratingsFilter: string[] = [], needsReview = true

    console.log('Get flux ratings for review')

    const params = new URLSearchParams()

    // Always include limit parameter
    params.append('limit', limit.toString())


    // Include needsReview parameter if true
    if (filters.needsReview) {
      params.append('needsReview', "true")
    } else {
      // as items get reviewed, needsReview list will dwindle naturally; no need to offset
      params.append('offset', offset.toString())
    }

    // Add rating filters if provided
    if (filters.rating && filters.rating !== 'all') {
      params.append('ratings', filters.rating)
    }

    const url = `flux-moderation/ratings?${params.toString()}`
    console.log(`Fetching ratings with URL: ${url}`)

    try {
      const ratings = await api.get<FluxRatingBatch>(url)
      if (ratings.status === 200) {
        return ratings.data
      } else {
        console.error(`Error fetching ratings: ${ratings.status}`)
        return null
      }
    } catch (error) {
      console.error('Failed to fetch flux ratings:', error)
      return null
    }
  }

  // Confirm a flux rating (approve with current rating)
  const confirmFluxRating = async (id: number, note: string | null = null) => {
    const payload = {
      actionTaken: 'accepted',
      reviewNote: note
    }
    const update = await api.put<FluxRating>(`flux-moderation/ratings/${id}`, payload)
    return update
  }

  // Adjust a flux rating to a different value
  const adjustFluxRating = async (id: number, newRating: string | null, note: string | null = null) => {
    const payload = {
      actionTaken: 'modified',
      rating: newRating,
      reviewNote: note
    }
    const update = await api.put<FluxRating>(`flux-moderation/ratings/${id}`, payload)
    return update
  }

  // Block a flux (hide from view, except author and admin)
  const blockFlux = async (id: number) => {
    const update = await api.put(`flux-moderation/ratings/${id}/block`)
    return update.data
  }

  // Block a flux (hide from view, except author and admin)
  const unblockFlux = async (id: number) => {
    const update = await api.put(`flux-moderation/ratings/${id}/unblock`)
    return update.data
  }

  // Block a flux (hide from view, except author and admin)
  const deleteFlux = async (id: number) => {
    const update = await api.put(`flux-moderation/ratings/${id}/delete`)
    return update.data
  }

  // Delete a flux (could be removed completely - might just be hidden)
  const restoreFlux = async (id: number) => {
    const update = await api.put(`flux-moderation/ratings/${id}/restore`)
    return update.data
  }

  return {
    fetchSystemUsers,
    showApiKeys,
    assignApiKey,
    fetchRatingLevels,
    fetchFluxRatings,
    confirmFluxRating,
    adjustFluxRating,
    blockFlux,
    unblockFlux,
    deleteFlux,
    restoreFlux
  }
}
import type {
  UsersReturned,
  ApiKeys,
  FluxRatingBatch,
  FluxRatingLevel,
  FluxRating,
  Inspiration,
  InspirationsReturned,
  InspirationStats
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

    const params = new URLSearchParams()

    params.append('limit', limit.toString())

    if (filters.needsReview) {
      params.append('needsReview', "true")
    } else {
      // as items get reviewed, needsReview list will dwindle naturally; no need to offset
      params.append('offset', offset.toString())
    }

    if (filters.rating && filters.rating !== 'all') {
      params.append('ratings', filters.rating)
    }

    const url = `flux-moderation/ratings?${params.toString()}`
    try {
      const ratings = await api.get<FluxRatingBatch>(url)
      if (ratings.ok) {
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
    const update = await api.put(`flux-moderation/fluxes/${id}/block`)
    return update.data
  }

  // Block a flux (hide from view, except author and admin)
  const unblockFlux = async (id: number) => {
    const update = await api.put(`flux-moderation/fluxes/${id}/unblock`)
    return update.data
  }

  // Block a flux (hide from view, except author and admin)
  const deleteFlux = async (id: number) => {
    const update = await api.put(`flux-moderation/fluxes/${id}/delete`)
    return update.data
  }

  // Delete a flux (could be removed completely - might just be hidden)
  const restoreFlux = async (id: number) => {
    const update = await api.put(`flux-moderation/fluxes/${id}/restore`)
    return update.data
  }

  // == Inspiration management ==

  const fetchInspirations = async (limit: number = 20, offset: number = 0, filters: any = {}) => {
    const params = new URLSearchParams()
    params.append('limit', limit.toString())
    params.append('offset', offset.toString())

    if (filters.active !== undefined) {
      params.append('active', filters.active.toString())
    }

    console.log('get inspirations')
    const url = `inspirations?${params.toString()}`
    try {
      const response = await api.get<InspirationsReturned>(url)
      if (response.ok) {
        return response.data
      } else {
        console.error(`Error fetching inspirations: ${response.status}`)
        return null
      }
    } catch (error) {
      console.error('Failed to fetch inspirations:', error)
      return null
    }
  }

  const getInspiration = async (id: number) => {
    try {
      console.log('get inspired', id)
      const response = await api.get<Inspiration>(`inspirations/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch inspiration:', error)
      return null
    }
  }

  const createInspiration = async (inspiration: {
    title?: string
    content?: string
    media_url?: string
    weight?: number
    active?: boolean
  }) => {
    try {
      console.log('create inspiration', inspiration)
      const response = await api.post<Inspiration>('inspirations', inspiration)
      return response.data
    } catch (error) {
      console.error('Failed to create inspiration:', error)
      throw error
    }
  }

  const updateInspiration = async (id: number, inspiration: {
    title?: string
    content?: string
    media_url?: string
    weight?: number
    active?: boolean
  }) => {
    try {
      console.log('update inspiration', id, inspiration)
      const response = await api.put<Inspiration>(`inspirations/${id}`, inspiration)
      return response.data
    } catch (error) {
      console.error('Failed to update inspiration:', error)
      throw error
    }
  }

  const deleteInspiration = async (id: number) => {
    try {
      console.log('bye-bye inspiration', id)
      const response = await api.put(`inspirations/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to delete inspiration:', error)
      throw error
    }
  }

  const toggleInspirationActive = async (id: number) => {
    try {
      const response = await api.put<Inspiration>(`inspirations/${id}/toggle`)
      return response.data
    } catch (error) {
      console.error('Failed to toggle inspiration:', error)
      throw error
    }
  }

  const getInspirationStats = async () => {
    try {
      const response = await api.get<InspirationStats>('inspirations/stats')
      return response.data
    } catch (error) {
      console.error('Failed to fetch inspiration stats:', error)
      return null
    }
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
    restoreFlux,
    fetchInspirations,
    getInspiration,
    createInspiration,
    updateInspiration,
    deleteInspiration,
    toggleInspirationActive,
    getInspirationStats
  }
}
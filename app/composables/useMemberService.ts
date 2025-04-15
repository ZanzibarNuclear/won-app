import type { UserProfile } from '~/types/won-types'

export function useWonFeedback() {

  const api = useWonServiceApi()

  const updateUserProfile = async (changes: UserProfile) => {
    const response = await api.put('/me/profile', {
      ...changes
    })
    return response
  }

  return {
    updateUserProfile
  }
}
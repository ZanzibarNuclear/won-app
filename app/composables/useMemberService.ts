import type { UserProfileDeltas } from '~/types/won-types'

export function useMemberService() {

  const api = useWonServiceApi()

  const updateUserProfile = async (changes: UserProfileDeltas) => {
    const response = await api.put('me/profile', {
      ...changes
    })
    return response
  }

  return {
    updateUserProfile
  }
}
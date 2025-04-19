import type { UserProfile, UserProfileDeltas } from '~/types/won-types'

export function useMemberService() {

  const api = useWonServiceApi()

  const getUserProfile = async (): Promise<UserProfile> => {
    const profile = await api.get('me/profile')
    return profile.data as UserProfile
  }

  const updateUserProfile = async (changes: UserProfileDeltas) => {
    const response = await api.put('me/profile', {
      ...changes
    })
    return response
  }

  return {
    getUserProfile,
    updateUserProfile
  }
}
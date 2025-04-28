import type { FluxUser, UserProfileDeltas, UserProfile } from '~/types/won-types'

export function useMemberService() {

  const api = useWonServiceApi()

  const updateUserProfile = async (changes: UserProfileDeltas) => {
    const response = await api.put<UserProfile>('me/profile', {
      ...changes
    })
    return response.data
  }

  const joinFlux = async (profileChanges: UserProfileDeltas) => {
    const response = await api.post<FluxUser>('me/flux-activation', {
      profileChanges
    })
    return response.data
  }

  return {
    updateUserProfile,
    joinFlux
  }
}
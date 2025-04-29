import type { FluxUser, UserProfileDeltas, UserProfile } from '~/types/won-types'

export function useMemberService() {

  const api = useWonServiceApi()

  const updateUserProfile = async (changes: UserProfileDeltas) => {
    const response = await api.put<UserProfile>('me/profile', {
      ...changes
    })
    return response.data
  }

  const joinFlux = async (changes: UserProfileDeltas) => {
    const response = await api.post<FluxUser>('me/flux-activation', {
      ...changes
    })
    return response.data
  }

  const getFluxUser = async () => {
    const response = await api.get<FluxUser>('me/flux-activation')
    return response.data
  }

  return {
    updateUserProfile,
    joinFlux,
    getFluxUser
  }
}
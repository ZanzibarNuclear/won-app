import { defineStore } from 'pinia'
import type {
  FluxUser,
  UserInfo,
  UserProfile,
} from '../types/won-types'

type UserData = {
  user: UserInfo | null
  fluxUser: FluxUser | null
}

export const useUserStore = defineStore('user', () => {
  const userData: UserData = reactive({
    user: null,
    fluxUser: null
  })

  const setActiveUser = (activeUser: any) => {
    userData.user = activeUser
  }

  const isSignedIn = computed(() => {
    return !!userData.user?.id
  })

  const user = computed(() => {
    return userData.user
  })

  const clearUser = () => {
    userData.user = null
  }

  const isProfileLoaded = computed(() => {
    return !!userData.user?.profile
  })

  const profile = computed(() => {
    return userData.user?.profile
  })

  /**
   * overwrite profile
   */
  async function setProfile(data: UserProfile) {
    if (userData.user) {
      userData.user.profile = { ...data }
      userData.user.alias = data.alias ?? ''
    }
  }

  /** 
   * merge given fields with existing profile 
   */
  function updateProfile(deltas: any) {
    if (userData.user) {
      const updated = Object.assign({}, userData.user?.profile, deltas)
      setProfile(updated)
    }
  }

  const setFluxUser = (fluxUser: FluxUser) => {
    userData.fluxUser = fluxUser
  }

  const fluxAuthor = computed(() => {
    return {
      id: userData.fluxUser?.id,
      handle: profile.value?.handle,
      alias: profile.value?.alias,
      avatar: profile.value?.avatar,
      joinedAt: userData.user?.profile?.createdAt,
      followers: userData.fluxUser?.followers,
      following: userData.fluxUser?.following,
    }
  })

  return {
    setActiveUser,
    isSignedIn,
    user,
    clearUser,
    setProfile,
    updateProfile,
    isProfileLoaded,
    profile,
    setFluxUser,
    fluxAuthor
  }
})

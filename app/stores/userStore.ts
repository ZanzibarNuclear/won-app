import { defineStore } from 'pinia'
import type {
  FluxUser,
  UserInfo,
  UserProfile,
} from '../types/won-types'

type UserData = {
  user: UserInfo | null
}

export const useUserStore = defineStore('userStore', () => {
  const userData: UserData = reactive({
    user: null,
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

  const isFluxUserLoaded = computed(() => {
    return !!userData.user?.fluxUser
  })

  const fluxUser = computed(() => {
    return userData.user?.fluxUser
  })

  const setFluxUser = (fluxUser: FluxUser) => {
    if (userData.user) {
      userData.user.fluxUser = fluxUser
    }
  }

  const fluxAuthor = computed(() => {
    return {
      id: fluxUser.value?.id,
      handle: profile.value?.handle,
      alias: profile.value?.alias,
      avatar: profile.value?.avatar,
      joinedAt: userData.user?.profile?.createdAt,
      followers: fluxUser.value?.followers,
      following: fluxUser.value?.following,
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
    isFluxUserLoaded,
    setFluxUser,
    fluxAuthor
  }
})

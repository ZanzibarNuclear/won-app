import { defineStore } from 'pinia'
import type {
  UserInfo,
  UserProfile,
} from '../types/won-types'

type UserData = {
  user: UserInfo | null
}

export const useUserStore = defineStore('user', () => {
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

  async function setProfile(data: UserProfile) {
    if (userData.user) {
      userData.user.profile = { ...data }
      userData.user.alias = data.alias ?? ''
    }
  }

  return {
    setActiveUser,
    isSignedIn,
    user,
    clearUser,
    setProfile,
    isProfileLoaded,
    profile,
  }
})

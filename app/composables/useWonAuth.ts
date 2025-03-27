export function useWonAuth() {
  const user = useState('user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  const userStore = useUserStore()
  const { wonServiceUrl } = useRuntimeConfig().public
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const loginWithOAuth = async (provider: string) => {
    // This method is now handled by the modal flow in OAuthCard.vue
    // We'll keep this as a stub that can be called from other components
    console.log(`OAuth login with ${provider} initiated`)
    // The actual implementation is in OAuthCard.vue
  }

  const loginWithMagicLink = async (email: string, alias: string, token: string) => {
    try {
      const data = {
        email,
        alias,
        token
      }
      return await $fetch(`${wonServiceUrl}/login/magiclink`, {
        method: 'POST',
        body: data,
        credentials: 'include', // This is crucial for sending cookies
      })
    } catch (error: any) {
      console.error('Error logging in with magic link', error)
      return { status: 'error', message: error.message }
    }
  }

  const getCurrentUser = async () => {
    try {
      const api = useWonServiceApi()

      loading.value = true
      const userData = await api.get('/me')
      console.log('found current user:', userData)

      userStore.setActiveUser(userData as { id: string, alias: string, roles: string[] })
      return userData
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err
        console.error('Error fetching user info', err.message)
      } else {
        error.value = new Error('An unknown error occurred')
        console.error('Error fetching user info', err)
      }
    } finally {
      loading.value = false
    }
  }

  const findIdentity = async (provider: string) => {
    await getCurrentUser()
    if (!userStore.isSignedIn && provider) {
      console.log('Did not find user with active session. Attempting OAuth login.')
      await loginWithOAuth(provider)
    }
  }

  const signOut = async () => {
    try {
      await useWonServiceApi().delete('/login')
      userStore.clearUser()
    } catch (err) {
      console.error('Error signing out', err)
    }
  }

  async function checkAuthStatus() {
    try {
      const { data } = await useFetch(`${wonServiceUrl}/user/me`)
      const userData = data.value as { user?: typeof user.value }
      if (userData.user) {
        user.value = userData.user
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to check auth status:', error)
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    loginWithOAuth,
    loginWithMagicLink,
    getCurrentUser,
    findIdentity,
    signOut,
    checkAuthStatus
  }
}

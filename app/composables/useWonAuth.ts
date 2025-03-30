import type { SupportedOAuthProviders, UserCredentials } from '~/types/won-types'

export function useWonAuth() {
  const wonService = useWonServiceApi()
  const userStore = useUserStore()
  const { wonServiceUrl } = useRuntimeConfig().public

  const loginWithOAuth = async (provider: SupportedOAuthProviders) => {
    // This method is now handled by the modal flow in OAuthCard.vue
    // We'll keep this as a stub that can be called from other components
    console.log(`OAuth login with ${provider} initiated`)
    // The actual implementation is in OAuthCard.vue
  }

  const loginWithMagicLink = async (email: string, token: string) => {
    try {
      const data = {
        email,
        alias: '',
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
      const userData = await wonService.get('/me')
      console.log('found current user:', userData)
      userStore.setActiveUser(userData)
      return userData
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error fetching user info', err.message)
      } else {
        console.error('Error fetching user info', err)
      }
    }
  }

  const findIdentity = async (provider: SupportedOAuthProviders) => {
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

  return {
    loginWithOAuth,
    loginWithMagicLink,
    getCurrentUser,
    findIdentity,
    signOut,
  }
}

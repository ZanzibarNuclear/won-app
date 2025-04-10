import type { SupportedOAuthProviders, UserCredentials } from '~/types/won-types'

export function useWonAuth() {
  const { wonServiceUrl } = useRuntimeConfig().public
  const wonServiceApi = useWonServiceApi()
  const userStore = useUserStore()

  const loginWithOAuth = async (provider: SupportedOAuthProviders) => {
    navigateTo(`${wonServiceUrl}/login/${provider}`, {
      external: true
    })
  }

  const loginWithMagicLink = async (email: string, token: string) => {
    let response = null
    try {
      const data = {
        email,
        alias: '',
        token
      }
      response = await $fetch(`${wonServiceUrl}/login/magiclink`, {
        method: 'POST',
        body: data,
        credentials: 'include', // This is crucial for sending cookies
      })
    } catch (error: any) {
      console.warn('Error logging in with magic link', error)
      return { status: 'failure', message: 'System error. Sorry about that.' }
    } finally {
      console.log(response)
      return response
    }
  }

  const getCurrentUser = async () => {
    try {
      const userData = await wonServiceApi.get('me')
      userStore.setActiveUser(userData.data)
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
    let response = null
    try {
      response = await $fetch(`${wonServiceUrl}/login`, {
        method: 'DELETE',
        credentials: 'include',
      })
    } catch (err) {
      console.error('Error signing out', err)
    }
    userStore.clearUser()
  }

  return {
    loginWithOAuth,
    loginWithMagicLink,
    getCurrentUser,
    findIdentity,
    signOut,
  }
}

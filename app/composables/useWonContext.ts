export function useWonContext() {
  const redirectCookie = useCookie('redirect-after-signin')

  /**
   * Plants a cookie to remember where we were before signing in.
   * 
   * @returns the route stored in the cookie
   */
  function setReturnRoute(route: string) {
    redirectCookie.value = route
  }

  /**
   * Returns the path to return to after signing in. One-time use, so clears the cookie.
   * 
   * @returns the route stored in the cookie
   */
  function grabReturnRoute(): string {
    const route = redirectCookie.value
    redirectCookie.value = null
    return route || '/won-guide'
  }

  return {
    setReturnRoute,
    grabReturnRoute,
  };
}
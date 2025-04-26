import { useCookies } from '@vueuse/integrations/useCookies';

export function useWonContext() {
  const cookies = useCookies()

  function setReturnRoute(route: string) {
    cookies.set('redirect-after-signin', route, { path: '/' })
  }

  function getReturnRoute(): string {
    const route = cookies.get('redirect-after-signin')
    return route || '/won-guide'
  }

  return {
    setReturnRoute,
    getReturnRoute,
  };
}
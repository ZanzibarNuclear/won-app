export const useWonServiceApi = () => {
  return {
    get: async (url: string) => {
      const response = await $fetch.raw(`${useRuntimeConfig().public.wonServiceUrl}/api/${url}`, {
        credentials: 'include',
      });
      return {
        status: response.status,
        data: response._data,
      };
    },
    post: async (url: string, data: any) => {
      console.log(`posting to ${url}:`, data);
      const response = await $fetch.raw(`${useRuntimeConfig().public.wonServiceUrl}/api/${url}`, {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      return {
        status: response.status,
        data: response._data,
      };
    },
    put: async (url: string, data?: any) => {
      console.log(`putting to ${url}:`, data);
      const response = await $fetch.raw(`${useRuntimeConfig().public.wonServiceUrl}/api/${url}`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
      return {
        status: response.status,
        data: response._data,
      };
    },
    delete: async (url: string) => {
      const response = await $fetch.raw(`${useRuntimeConfig().public.wonServiceUrl}/api/${url}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      return {
        status: response.status,
        data: response._data,
      };
    },
  }
}

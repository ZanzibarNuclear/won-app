export const useWonServiceApi = () => {
  return {
    get: async <T>(url: string) => {
      const response = await $fetch.raw(`${useRuntimeConfig().public.wonServiceUrl}/api/${url}`, {
        credentials: 'include',
      });
      return {
        status: response.status,
        ok: response.status === 200,
        data: response._data as T,
      };
    },
    post: async <T>(url: string, data: any) => {
      const response = await $fetch.raw(`${useRuntimeConfig().public.wonServiceUrl}/api/${url}`, {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      return {
        status: response.status,
        ok: response.status === 201 || response.status === 200,
        data: response._data as T,
      };
    },
    postImage: async <T>(url: string, data: any, progress: any) => {
      const response = await $fetch.raw(`${useRuntimeConfig().public.wonServiceUrl}/api/${url}`, {
        method: 'POST',
        body: data,
        credentials: 'include',
        onUploadProgress: (event: any) => {
          progress.value = Math.round((event.loaded / event.total) * 100)
        }
      });
      return {
        status: response.status,
        ok: response.status === 201 || response.status === 200,
        data: response._data as T,
      };
    },
    put: async <T>(url: string, data?: any) => {
      const response = await $fetch.raw(`${useRuntimeConfig().public.wonServiceUrl}/api/${url}`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
      return {
        status: response.status,
        ok: response.status === 200 || response.status === 201,
        data: response._data as T,
      };
    },
    patch: async <T>(url: string, data?: any) => {
      const response = await $fetch.raw(`${useRuntimeConfig().public.wonServiceUrl}/api/${url}`, {
        method: 'PATCH',
        body: data,
        credentials: 'include',
      });
      return {
        status: response.status,
        ok: response.status === 200,
        data: response._data as T,
      };
    },
    delete: async <T>(url: string) => {
      const response = await $fetch.raw(`${useRuntimeConfig().public.wonServiceUrl}/api/${url}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      return {
        status: response.status,
        ok: response.status === 204 || response.status === 200,
        data: response._data as T,
      };
    },
  }
}

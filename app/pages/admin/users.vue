<template>
  <UContainer>
    <h1>WoN Administration</h1>
    <div>Let's administer things. Whee!!!</div>
    <div v-if="!userList">
      <UButton @click="reloadUsers" label="Load Users" />
    </div>
    <div>
      <h2 class="text-xl font-bold mb-2">Users</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-500">
            <th class="border p-2 text-left">ID</th>
            <th class="border p-2 text-left">Alias</th>
            <th class="border p-2 text-left">Email</th>
            <th class="border p-2 text-left">System Bot</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in userList"
            :key="user.id"
            class="border-b"
            @click="() => pickUser(user)"
          >
            <td class="border p-2">{{ user.id }}</td>
            <td class="border p-2">{{ user.alias }}</td>
            <td class="border p-2">{{ user.email }}</td>
            <td class="border p-2 text-center">
              <span v-if="user.systemBot" class="text-green-500">✓</span>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="focusedUser">
      <div v-if="apiKeys && apiKeys.length" class="mt-12">
        <h2 class="text-xl font-bold mb-2">API Keys</h2>
        <div class="my-4">Hey, {{ focusedUser.alias }}. We found your keys.</div>
        <div>
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-500">
                <th class="border p-2 text-left">Created On</th>
                <th class="border p-2 text-left">Key Hash</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="key in apiKeys" :key="key.id" class="border-b">
                <td class="border p-2">{{ formatDateTime(new Date(key.createdAt)) }}</td>
                <td class="border p-2">{{ key.keyHash }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <div class="my-4">{{ focusedUser.alias }} does not have any API keys</div>
      </div>
      <UButton @click="generateKeyForUser" label="Assign API Key" class="mt-6" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useAdminService } from '~/composables/useAdminService'
import type { ApiKeys, Users } from '~/types/won-types'

const adminSvc = useAdminService()
const userList: Ref<Users[] | null> = ref(null)
const focusedUser: Ref<Users | null> = ref(null)
const apiKeys: Ref<ApiKeys[] | null> = ref(null)

const reloadUsers = async () => {
  userList.value = await adminSvc.fetchSystemUsers()
}
onMounted(() => {
  reloadUsers()
})

const pickUser = async (user: Users) => {
  focusedUser.value = user
  const keys = await adminSvc.showApiKeys(focusedUser.value.id)
  apiKeys.value = keys
}
const generateKeyForUser = async () => {
  if (focusedUser.value) {
    const key = await adminSvc.assignApiKey(focusedUser.value.id)
    if (!apiKeys.value) {
      apiKeys.value = []
    }
    apiKeys.value.push(key)
    console.log('generated key: ' + JSON.stringify(key))
  } else {
    alert('Hey, you. Pick a user first.')
  }
}
</script>

<style scoped>
th {
  font-size: small;
}
td {
  font-size: x-small;
}
</style>

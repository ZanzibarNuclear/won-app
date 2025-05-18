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
      <div>We are looking at you, {{ focusedUser.alias }} ({{ focusedUser.id }})</div>
      <div v-if="apiKeys && apiKeys.length">
        <h3>We found your keys.</h3>
        <ul>
          <li v-for="key in apiKeys">Piss off!!</li>
        </ul>
      </div>
      <div v-else>
        <h3>What keys?</h3>
      </div>
      <UButton @click="generateKeyForUser" label="Assign API Key" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useAdminService } from '~/composables/useAdminService'
import type { Users } from '~/types/won-types'

const adminSvc = useAdminService()
const { data: users } = await useAsyncData('users', () => adminSvc.fetchSystemUsers())

const userList: Ref<Users[] | null> = ref(null)
const focusedUser: Ref<Users | null> = ref(null)
const apiKeys: Ref<any | null> = ref(null)

const reloadUsers = async () => {
  userList.value = await adminSvc.fetchSystemUsers()
}
const pickUser = async (user: Users) => {
  focusedUser.value = user
  const keys = await adminSvc.showApiKeys(focusedUser.value.id)
  apiKeys.value = keys
}
const generateKeyForUser = async () => {
  if (focusedUser.value) {
    const key = await adminSvc.assignApiKey(focusedUser.value.id)
    console.log('generated key: ' + JSON.stringify(key))
  } else {
    alert('Hey, you. Pick a user first.')
  }
}
</script>

<style scoped></style>

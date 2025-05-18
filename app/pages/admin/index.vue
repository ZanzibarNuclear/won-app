<template>
  <UContainer>
    <h1>WoN Administration</h1>
    <div>Let's administer things. Whee!!!</div>
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
          <tr v-for="user in users" :key="user.id" class="border-b" @click="() => pickUser(user)">
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
  </UContainer>
</template>

<script setup lang="ts">
import { useAdminService } from '~/composables/useAdminService'
import type { Users } from '~/types/won-types'

const adminSvc = useAdminService()
const { data: users } = await useAsyncData('users', () => adminSvc.fetchSystemUsers())

const focusedUser: Ref<Users | null> = ref(null)

const pickUser = (user: Users) => {
  focusedUser.value = user
}
</script>

<style scoped></style>

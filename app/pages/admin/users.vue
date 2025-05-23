<template>
  <UContainer>
    <div class="flex items-center mb-6">
      <UButton to="/admin" icon="i-heroicons-arrow-left" variant="ghost" class="mr-2" />
      <h1 class="text-2xl font-bold">User Administration</h1>
    </div>

    <UCard class="mb-8">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">System Users</h2>
          <UButton
            v-if="!userList"
            @click="reloadUsers"
            label="Load Users"
            icon="i-heroicons-arrow-path"
            color="primary"
            variant="soft"
          />
          <UButton
            v-else
            @click="reloadUsers"
            icon="i-heroicons-arrow-path"
            color="gray"
            variant="ghost"
            size="sm"
          />
        </div>
      </template>

      <div v-if="userList && userList.length > 0">
        <UTable :rows="userList" :columns="userColumns" @select="pickUser" hover>
          <template #systemBot-data="{ row }">
            <UBadge v-if="row.systemBot" color="green" variant="subtle" label="Yes" />
            <span v-else>-</span>
          </template>
        </UTable>
      </div>
      <div v-else-if="userList && userList.length === 0" class="py-8 text-center text-gray-500">
        No users found in the system
      </div>
      <div v-else class="py-8 text-center text-gray-500">
        Click "Load Users" to view system users
      </div>
    </UCard>

    <UCard v-if="focusedUser" class="mb-8">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">User Details: {{ focusedUser.alias }}</h2>
          <UBadge v-if="focusedUser.systemBot" color="green" variant="subtle" label="System Bot" />
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-500">User ID</p>
          <p class="font-mono">{{ focusedUser.id }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Email</p>
          <p>{{ focusedUser.email }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Created</p>
          <p>{{ formatDateTime(new Date(focusedUser.createdAt)) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Last Sign In</p>
          <p>{{ formatDateTime(new Date(focusedUser.lastSignInAt)) }}</p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton
            @click="generateKeyForUser"
            label="Assign API Key"
            icon="i-heroicons-key"
            color="primary"
          />
        </div>
      </template>
    </UCard>

    <UCard v-if="focusedUser && apiKeys">
      <template #header>
        <h2 class="text-xl font-semibold">API Keys</h2>
      </template>

      <div v-if="apiKeys.length > 0">
        <UTable :rows="apiKeys" :columns="apiKeyColumns">
          <template #createdAt-data="{ row }">
            {{ formatDateTime(new Date(row.createdAt)) }}
          </template>
          <template #expiresAt-data="{ row }">
            {{ formatDateTime(new Date(row.expiresAt)) }}
          </template>
        </UTable>
      </div>
      <div v-else class="py-4 text-center text-gray-500">
        {{ focusedUser.alias }} does not have any API keys
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { useAdminService } from '~/composables/useAdminService'
import type { ApiKeys, Users } from '~/types/won-types'

const adminSvc = useAdminService()
const userList: Ref<Users[] | null> = ref(null)
const focusedUser: Ref<Users | null> = ref(null)
const apiKeys: Ref<ApiKeys[] | null> = ref(null)

// Table columns definition
const userColumns = [
  { key: 'id', label: 'ID' },
  { key: 'alias', label: 'Alias' },
  { key: 'email', label: 'Email' },
  { key: 'systemBot', label: 'System Bot' },
]

const apiKeyColumns = [
  { key: 'createdAt', label: 'Created On' },
  { key: 'keyHash', label: 'Key Hash' },
  { key: 'expiresAt', label: 'Expires On' },
]

// Format date and time for display
const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

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
    alert('Please select a user first.')
  }
}
</script>

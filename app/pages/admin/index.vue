<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-4">WoN Administration</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Welcome to the administration area. This section is only available to users with admin
        privileges.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <UCard v-for="(item, index) in adminMenuItems" :key="index"
        class="hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-center mb-4">
          <UIcon :name="item.icon" class="text-2xl mr-2 text-primary" />
          <h2 class="text-xl font-semibold">{{ item.title }}</h2>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ item.description }}</p>
        <template #footer>
          <div class="flex justify-end">
            <UButton :to="item.path" color="primary" variant="soft" :label="item.buttonText" :icon="item.buttonIcon" />
          </div>
        </template>
      </UCard>
    </div>

    <USeparator :avatar="{ src: '/images/radiation-symbol.svg' }" class="h-px" />

    <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
      <h3 class="text-lg font-medium mb-4">Admin Quick Stats</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <UCard v-for="(stat, index) in quickStats" :key="index">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary mb-2">{{ stat.value }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{{ stat.label }}</div>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// Mock data for admin menu items
const adminMenuItems = [
  {
    title: 'User Admin',
    description: 'Manage system users and API keys',
    icon: 'i-heroicons-users',
    path: '/admin/users',
    buttonText: 'Manage Users',
    buttonIcon: 'i-heroicons-arrow-right',
  },
  {
    title: 'Flux Admin',
    description: 'Review and moderate flagged flux content',
    icon: 'i-heroicons-flag',
    path: '/admin/fluxes',
    buttonText: 'Review Fluxes',
    buttonIcon: 'i-heroicons-arrow-right',
  },
  {
    title: 'Enlightenment Content',
    description: 'Manage inspirational content for the enlightenment page',
    icon: 'i-heroicons-light-bulb',
    path: '/admin/inspirations',
    buttonText: 'Manage Content',
    buttonIcon: 'i-heroicons-arrow-right',
  },
  {
    title: 'Event Viewer',
    description: 'Monitor system events and activity',
    icon: 'i-heroicons-chart-bar',
    path: '/admin/events',
    buttonText: 'View Events',
    buttonIcon: 'i-heroicons-arrow-right',
  },
  {
    title: 'User Feedback',
    description: 'Review feedback submitted by users',
    icon: 'i-heroicons-chat-bubble-left-right',
    path: '/admin/feedback',
    buttonText: 'View Feedback',
    buttonIcon: 'i-heroicons-arrow-right',
  },
]

// Mock data for quick stats
const quickStats = [
  { label: 'Total Users', value: '1,245' },
  { label: 'Flagged Content', value: '23' },
  { label: 'New Events (24h)', value: '156' },
  { label: 'Pending Feedback', value: '12' },
]
</script>

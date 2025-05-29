<template>
  <UContainer>
    <div class="flex items-center mb-6">
      <UButton to="/admin" icon="i-heroicons-arrow-left" variant="ghost" class="mr-2" />
      <h1 class="text-2xl font-bold">Event Viewer</h1>
    </div>

    <UCard class="mb-8">
      <template #header>
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 class="text-xl font-semibold">System Events</h2>
          <div class="flex flex-wrap gap-2">
            <UInput
              v-model="searchQuery"
              placeholder="Search events..."
              icon="i-heroicons-magnifying-glass"
              class="w-full md:w-48"
              size="sm"
              @input="filterEvents"
            />
            <USelect
              v-model="eventType"
              :options="eventTypeOptions"
              placeholder="Event Type"
              size="sm"
              class="w-full md:w-40"
              @update:modelValue="filterEvents"
            />
            <USelect
              v-model="timeRange"
              :options="timeRangeOptions"
              placeholder="Time Range"
              size="sm"
              class="w-full md:w-40"
              @update:modelValue="filterEvents"
            />
            <UButton
              @click="refreshEvents"
              icon="i-heroicons-arrow-path"
              color="primary"
              variant="soft"
              size="sm"
            />
          </div>
        </div>
      </template>

      <div class="overflow-x-auto">
        <UTable
          :rows="filteredEvents"
          :columns="eventColumns"
          :sort="{ column: 'timestamp', direction: 'desc' }"
          @select="selectEvent"
          hover
        >
          <template #timestamp-data="{ row }">
            {{ formatDateTime(new Date(row.timestamp)) }}
          </template>
          <template #level-data="{ row }">
            <UBadge :color="getEventLevelColor(row.level)" size="xs">
              {{ row.level.toUpperCase() }}
            </UBadge>
          </template>
          <template #message-data="{ row }">
            <div class="truncate max-w-md" :title="row.message">{{ row.message }}</div>
          </template>
        </UTable>
      </div>

      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            Showing {{ filteredEvents.length }} of {{ totalEvents }} events
          </div>
          <UPagination
            v-if="totalPages > 1"
            v-model="currentPage"
            :total="totalPages"
            :ui="{ wrapper: 'flex items-center gap-1' }"
          />
        </div>
      </template>
    </UCard>

    <UCard v-if="selectedEvent">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Event Details</h2>
          <UBadge :color="getEventLevelColor(selectedEvent.level)">
            {{ selectedEvent.level.toUpperCase() }}
          </UBadge>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-500">Event ID</p>
          <p class="font-mono">{{ selectedEvent.id }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Timestamp</p>
          <p>{{ formatDateTime(new Date(selectedEvent.timestamp)) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Source</p>
          <p>{{ selectedEvent.source }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">User</p>
          <p>{{ selectedEvent.userId || 'System' }}</p>
        </div>
      </div>

      <div class="mb-4">
        <p class="text-sm text-gray-500">Message</p>
        <p>{{ selectedEvent.message }}</p>
      </div>

      <div v-if="selectedEvent.details">
        <p class="text-sm text-gray-500 mb-2">Details</p>
        <pre class="bg-gray-50 dark:bg-gray-800 p-3 rounded overflow-x-auto font-mono text-xs">{{
          JSON.stringify(selectedEvent.details, null, 2)
        }}</pre>
      </div>
    </UCard>

    <UCard v-if="showTimeline" class="mt-8">
      <template #header>
        <h2 class="text-xl font-semibold">Event Timeline</h2>
      </template>

      <div class="relative py-8">
        <div
          class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"
        ></div>

        <div v-for="(event, index) in timelineEvents" :key="event.id" class="relative mb-8">
          <div class="flex items-center">
            <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                :class="`w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${getEventLevelBgColor(
                  event.level,
                )}`"
              ></div>
            </div>

            <div :class="`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 ml-auto'}`">
              <div class="font-medium">{{ formatDateTime(new Date(event.timestamp)) }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ event.source }}</div>
            </div>

            <div :class="`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`">
              <div class="font-medium">{{ event.message }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ event.userId || 'System' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton @click="showTimeline = false" label="Close Timeline" variant="ghost" />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
// Mock event data interface
interface SystemEvent {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'debug'
  source: string
  message: string
  userId?: string
  details?: any
}

// State
const searchQuery = ref('')
const eventType = ref('')
const timeRange = ref('24h')
const currentPage = ref(1)
const totalPages = ref(5)
const totalEvents = ref(156)
const selectedEvent = ref<SystemEvent | null>(null)
const showTimeline = ref(false)

// Table columns
const eventColumns = [
  { key: 'timestamp', label: 'Timestamp', sortable: true },
  { key: 'level', label: 'Level', sortable: true },
  { key: 'source', label: 'Source', sortable: true },
  { key: 'message', label: 'Message' },
  { key: 'userId', label: 'User', sortable: true },
]

// Filter options
const eventTypeOptions = [
  { label: 'All Types', value: '' },
  { label: 'Authentication', value: 'auth' },
  { label: 'User Activity', value: 'user' },
  { label: 'Content', value: 'content' },
  { label: 'System', value: 'system' },
  { label: 'API', value: 'api' },
]

const timeRangeOptions = [
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'All Time', value: 'all' },
]

// Mock events data
const events = ref<SystemEvent[]>([
  {
    id: 'evt_1001',
    timestamp: '2023-05-22T14:32:45Z',
    level: 'info',
    source: 'auth',
    message: 'User signed in successfully',
    userId: 'user_123',
    details: { ip: '192.168.1.1', browser: 'Chrome', device: 'Desktop' },
  },
  {
    id: 'evt_1002',
    timestamp: '2023-05-22T13:15:22Z',
    level: 'warning',
    source: 'content',
    message: 'Content flagged by system bot',
    details: { contentId: 'flux_456', reason: 'Potential misinformation' },
  },
  {
    id: 'evt_1003',
    timestamp: '2023-05-22T12:05:11Z',
    level: 'error',
    source: 'api',
    message: 'API rate limit exceeded',
    userId: 'user_789',
    details: { endpoint: '/api/fluxes', method: 'GET', statusCode: 429 },
  },
  {
    id: 'evt_1004',
    timestamp: '2023-05-22T11:45:33Z',
    level: 'info',
    source: 'user',
    message: 'User profile updated',
    userId: 'user_456',
    details: { fields: ['avatar', 'bio'] },
  },
  {
    id: 'evt_1005',
    timestamp: '2023-05-22T10:22:18Z',
    level: 'debug',
    source: 'system',
    message: 'Scheduled maintenance task completed',
    details: { task: 'cleanup_old_sessions', duration: '3.5s' },
  },
  {
    id: 'evt_1006',
    timestamp: '2023-05-22T09:17:42Z',
    level: 'info',
    source: 'content',
    message: 'New flux posted',
    userId: 'user_123',
    details: { contentId: 'flux_789' },
  },
  {
    id: 'evt_1007',
    timestamp: '2023-05-22T08:05:19Z',
    level: 'warning',
    source: 'auth',
    message: 'Failed login attempt',
    details: { ip: '203.0.113.42', attempts: 3 },
  },
])

// Timeline events (subset for visualization)
const timelineEvents = computed(() => {
  return events.value.slice(0, 5)
})

// Filtered events based on search and filters
const filteredEvents = computed(() => {
  let filtered = [...events.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (event) =>
        event.message.toLowerCase().includes(query) ||
        event.source.toLowerCase().includes(query) ||
        (event.userId && event.userId.toLowerCase().includes(query)),
    )
  }

  // Apply event type filter
  if (eventType.value) {
    filtered = filtered.filter((event) => event.source === eventType.value)
  }

  // Time range filtering would be implemented here in a real app

  return filtered
})

// formatDateTime is provided by auto-loaded utils

// Get color for event level badge
const getEventLevelColor = (level: string) => {
  const colorMap: Record<string, string> = {
    info: 'blue',
    warning: 'yellow',
    error: 'red',
    debug: 'gray',
  }
  return colorMap[level] || 'gray'
}

// Get background color for timeline dots
const getEventLevelBgColor = (level: string) => {
  const colorMap: Record<string, string> = {
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    debug: 'bg-gray-500',
  }
  return colorMap[level] || 'bg-gray-500'
}

// Event handlers
const refreshEvents = () => {
  // In a real implementation, this would fetch fresh data from the API
  console.log('Refreshing events')
}

const filterEvents = () => {
  // This would trigger API calls with filters in a real implementation
  console.log('Filtering events:', {
    search: searchQuery.value,
    type: eventType.value,
    timeRange: timeRange.value,
  })
}

const selectEvent = (event: SystemEvent) => {
  selectedEvent.value = event
}

onMounted(() => {
  // Initial data load
  refreshEvents()
})
</script>

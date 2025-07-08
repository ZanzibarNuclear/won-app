<template>
  <UContainer>
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <UButton to="/admin" icon="i-ph-arrow-left-duotone" variant="ghost" class="mr-2" />
        <h1 class="text-2xl font-bold">Preload Enlightenment</h1>
      </div>
      <UButton @click="showCreateForm = true" icon="i-ph-plus-duotone" color="primary" label="Add Inspiration" />
    </div>

    <!-- Stats Cards -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" v-if="stats">
      <UCard>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary mb-2">{{ stats.total }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Total Inspirations</div>
        </div>
      </UCard>
      <UCard>
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600 mb-2">{{ stats.active }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </div>
      </UCard>
      <UCard>
        <div class="text-center">
          <div class="text-3xl font-bold text-orange-600 mb-2">{{ stats.total - stats.active }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Inactive</div>
        </div>
      </UCard>
      <UCard>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">{{ stats.total - stats.active }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Inactive</div>
        </div>
      </UCard>
    </div> -->

    <!-- Filters -->
    <UCard class="mb-6">
      <div class="flex flex-wrap gap-4 items-center">
        <select v-model="filters.active" class="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <UButton @click="loadInspirations" icon="i-heroicons-arrow-path" :loading="loading" color="primary" size="sm"
          label="Refresh" />
        <UButton @click="clearFilters" icon="i-heroicons-x-mark" color="neutral" variant="soft" size="sm"
          label="Clear" />
      </div>
    </UCard>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <UIcon name="i-ph-arrow-clockwise-duotone" class="animate-spin text-2xl" />
    </div>

    <!-- Inspirations Grid -->
    <div v-else-if="inspirations && inspirations.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="inspiration in inspirations" :key="inspiration.id"
        class="hover:shadow-lg transition-shadow duration-200">
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-2">
            <span class="px-2 py-1 text-xs rounded-full"
              :class="inspiration.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
              {{ inspiration.active ? 'Active' : 'Inactive' }}
            </span>
          </div>
          <div class="relative">
            <button @click="toggleDropdown(inspiration.id)" class="p-1 hover:bg-gray-100 rounded">
              <UIcon name="i-heroicons-ellipsis-vertical" class="w-4 h-4" />
            </button>
            <div v-if="openDropdown === inspiration.id"
              class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button @click="openEditForm(inspiration)"
                class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Edit
              </button>
              <button @click="toggleActive(inspiration)"
                class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                {{ inspiration.active ? 'Deactivate' : 'Activate' }}
              </button>
              <button @click="openDeleteModal(inspiration)"
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-3">
          <div v-if="inspiration.title" class="font-semibold text-lg">
            {{ inspiration.title }}
          </div>

          <div v-if="inspiration.content" class="text-gray-700 dark:text-gray-300">
            {{ truncateText(inspiration.content, 100) }}
          </div>

          <div v-if="inspiration.mediaUrl" class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img v-if="isImage(inspiration.mediaUrl)" :src="inspiration.mediaUrl"
              :alt="inspiration.title || 'Inspiration media'" class="w-full h-full object-cover" />
            <video v-else-if="isVideo(inspiration.mediaUrl)" :src="inspiration.mediaUrl" controls
              class="w-full h-full object-cover" />
            <div v-else class="flex items-center justify-center h-full text-gray-500">
              <UIcon name="i-heroicons-link" class="text-2xl" />
            </div>
          </div>

          <div class="flex items-center justify-between text-sm text-gray-500">
            <span>Weight: {{ inspiration.weight }}</span>
            <span>{{ formatDate(inspiration.createdAt) }}</span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <UIcon name="i-heroicons-light-bulb" class="text-4xl text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No inspirations found</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        {{ filters.active
          ? 'Try adjusting your filters'
          : 'Get started by adding your first inspiration' }}
      </p>
      <UButton v-if="!filters.active" @click="showCreateForm = true" icon="i-heroicons-plus" color="primary"
        label="Add Inspiration" />
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateForm">
      <UForm :schema="inspirationSchema" :state="state" @submit="saveInspiration" class="space-y-4">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">
                {{ editingInspiration ? 'Edit Inspiration' : 'Add New Inspiration' }}
              </h3>
              <UButton @click="closeForm" icon="i-heroicons-x-mark" variant="ghost" size="sm" />
            </div>
          </template>

          <UFormField label="Weight" name="weight">
            <UInput v-model.number="state.weight" type="number" min="1" max="100" placeholder="1" />
          </UFormField>

          <UFormField label="Title" name="title">
            <UInput v-model="state.title" placeholder="Optional title" />
          </UFormField>

          <UFormField label="Content" name="content">
            <UTextarea v-model="state.content" placeholder="Inspiration content" :rows="4" />
          </UFormField>

          <UFormField label="Media URL" name="media_url">
            <UInput v-model="state.media_url" placeholder="https://example.com/image.jpg" />
          </UFormField>

          <UFormField name="active">
            <UCheckbox v-model="state.active" label="Active" />
          </UFormField>

          <template #footer>
            <div class="flex justify-end space-x-2">
              <UButton @click="closeForm" variant="ghost" label="Cancel" />
              <UButton type="submit" :loading="saving" color="primary"
                :label="editingInspiration ? 'Update' : 'Create'" />
            </div>
          </template>
        </UCard>
      </UForm>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteForm">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-red-600">Delete Inspiration</h3>
        </template>

        <template #content>
          <p class="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this inspiration? This action cannot be undone.
          </p>
        </template>

        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton @click="showDeleteForm = false" variant="ghost" label="Cancel" />
            <UButton @click="confirmDelete" :loading="deleting" color="error" label="Delete" />
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { Inspiration, InspirationStats } from '~/types/won-types'
import type { FormSubmitEvent } from '@nuxt/ui'
import { z } from 'zod'

const userStore = useUserStore()
const adminService = useAdminService()

const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const inspirations = ref<Inspiration[]>([])
const stats = ref<InspirationStats | null>(null)
const showCreateForm = ref(false)
const showDeleteForm = ref(false)
const editingInspiration = ref<Inspiration | null>(null)
const inspirationToDelete = ref<Inspiration | null>(null)
const openDropdown = ref<number | null>(null)

// Validation schema
const inspirationSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  media_url: z.string().url().optional().or(z.literal('')),
  weight: z.number().min(1).max(100).default(1),
  active: z.boolean().default(true)
})

type Schema = z.output<typeof inspirationSchema>

// Filters
const filters = reactive({
  active: ''
})

// Form
const state = reactive<Partial<Schema>>({
  title: '',
  content: '',
  media_url: '',
  weight: 1,
  active: true
})

watch(
  () => userStore.user,
  (newUser) => {
    if (newUser === null) {
      console.log('no user')
      return
    }
    console.log('live user', newUser)
    if (newUser && !userStore.isAdmin) {
      navigateTo('/enlightenment')
    }
  },
  { immediate: true },
)

// Load data
const loadInspirations = async () => {
  loading.value = true
  try {
    const filterParams: any = {}
    if (filters.active) filterParams.active = filters.active === 'true'

    const result = await adminService.fetchInspirations(50, 0, filterParams)
    if (result) {
      inspirations.value = result.items
    }
  } catch (error) {
    console.error('Failed to load inspirations:', error)
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    const result = await adminService.getInspirationStats()
    if (result) {
      stats.value = result
    }
  } catch (error) {
    console.error('Failed to load stats:', error)
  }
}

// Actions
const clearFilters = () => {
  filters.active = ''
  loadInspirations()
}

const toggleDropdown = (id: number) => {
  openDropdown.value = openDropdown.value === id ? null : id
}

const openEditForm = (inspiration: Inspiration) => {
  editingInspiration.value = inspiration
  state.title = inspiration.title || ''
  state.content = inspiration.content || ''
  state.media_url = inspiration.mediaUrl || ''
  state.weight = Number(inspiration.weight)
  state.active = inspiration.active
  showCreateForm.value = true
  openDropdown.value = null
}

const closeForm = () => {
  showCreateForm.value = false
  editingInspiration.value = null
  resetForm()
}

const resetForm = () => {
  state.title = ''
  state.content = ''
  state.media_url = ''
  state.weight = 1
  state.active = true
}

const saveInspiration = async (event: FormSubmitEvent<Schema>) => {
  console.log('saveInspiration', event)
  saving.value = true
  try {
    if (editingInspiration.value) {
      await adminService.updateInspiration(editingInspiration.value.id, event.data)
    } else {
      await adminService.createInspiration(event.data)
    }
    closeForm()
    await loadInspirations()
    await loadStats()
  } catch (error) {
    console.error('Failed to save inspiration:', error)
  } finally {
    saving.value = false
  }
}

const toggleActive = async (inspiration: Inspiration) => {
  try {
    await adminService.toggleInspirationActive(inspiration.id)
    await loadInspirations()
    await loadStats()
    openDropdown.value = null
  } catch (error) {
    console.error('Failed to toggle inspiration:', error)
  }
}

const openDeleteModal = (inspiration: Inspiration) => {
  inspirationToDelete.value = inspiration
  showDeleteForm.value = true
  openDropdown.value = null
}

const confirmDelete = async () => {
  if (!inspirationToDelete.value) return

  deleting.value = true
  try {
    await adminService.deleteInspiration(inspirationToDelete.value.id)
    showDeleteForm.value = false
    inspirationToDelete.value = null
    await loadInspirations()
    await loadStats()
  } catch (error) {
    console.error('Failed to delete inspiration:', error)
  } finally {
    deleting.value = false
  }
}

// Helpers
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const isImage = (url: string) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
}

const isVideo = (url: string) => {
  return /\.(mp4|webm|ogg)$/i.test(url)
}

// Watchers
watch(filters, () => {
  loadInspirations()
}, { deep: true })

// Lifecycle
onMounted(() => {
  loadInspirations()
  // loadStats()
})

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('.relative')) {
      openDropdown.value = null
    }
  })
})
</script>
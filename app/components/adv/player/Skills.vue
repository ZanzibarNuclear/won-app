<template>
  <div class="bg-uranium dark:bg-gray-800 rounded-lg border p-4 mb-6">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Skills</h3>
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-xs text-gray-600 dark:text-gray-400">Problem Solving</span>
        <div class="flex space-x-1">
          <div v-for="i in 5" :key="i" class="w-2 h-2 rounded-full"
            :class="i <= 3 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'"></div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-xs text-gray-600 dark:text-gray-400">Critical Thinking</span>
        <div class="flex space-x-1">
          <div v-for="i in 5" :key="i" class="w-2 h-2 rounded-full"
            :class="i <= 4 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'"></div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-xs text-gray-600 dark:text-gray-400">Scientific Knowledge</span>
        <div class="flex space-x-1">
          <div v-for="i in 5" :key="i" class="w-2 h-2 rounded-full"
            :class="i <= 2 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Skills component - currently shows mock data
</script>
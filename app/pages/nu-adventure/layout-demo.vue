<template>
  <div>
    <!-- Main content area -->
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Adventure Game Test Screen</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white dark:bg-cooling-tower p-6 rounded-lg border">
          <h2 class="text-xl font-semibold mb-4">Current Scene</h2>
          <div class="prose max-w-none">
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              You stand at the entrance of an ancient cave. The air is thick with mystery,
              and you can hear the distant sound of water dripping from stalactites.
              Your torch flickers, casting dancing shadows on the rough stone walls.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Two paths lie before you: one leads deeper into the darkness,
              while the other seems to glow with a faint blue light.
            </p>
          </div>

          <div class="space-y-3 mt-6">
            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Venture into the darkness
            </button>
            <button class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
              Follow the blue light
            </button>
            <button class="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors">
              Examine the cave entrance
            </button>
          </div>
        </div>

        <div class="bg-white dark:bg-cooling-tower p-6 rounded-lg border">
          <h2 class="text-xl font-semibold mb-4">Scene Information</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-700 dark:text-gray-300">Location</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Ancient Cave - Entrance Chamber</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700 dark:text-gray-300">Time</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Late afternoon</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700 dark:text-gray-300">Atmosphere</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Mysterious, slightly damp</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700 dark:text-gray-300">Available Actions</h3>
              <ul class="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                <li>Explore deeper</li>
                <li>Follow light source</li>
                <li>Search for clues</li>
                <li>Use inventory items</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <h3 class="font-semibold text-yellow-800 mb-2">Layout Features</h3>
        <ul class="text-sm text-yellow-700 space-y-1">
          <li>• Left sidebar: Navigation tree with chapter/scene progress</li>
          <li>• Center area: Main game content with vertical scrolling</li>
          <li>• Right sidebar: Player status, inventory, and achievements</li>
          <li>• Responsive design that adapts to different screen sizes</li>
          <li>• Dynamic content areas that can be updated as the game progresses</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'adventure',
})
</script>
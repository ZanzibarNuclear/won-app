<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <NavAdvPlayerHeader />

    <!-- Main content area with sidebars -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar -->
      <aside class="w-64  dark:bg-cooling-tower border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <slot name="left-sidebar">
          <!-- Default left sidebar content -->
          <div class="p-4">
            <h3 class="text-sm font-semibold mb-3">Navigation</h3>
            <nav class="space-y-1">
              <div class="text-xs mb-2">Chapter 1: The Beginning</div>
              <a href="#"
                class="block px-3 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-100 rounded-md">Scene 1:
                Arrival</a>
              <a href="#"
                class="block px-3 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-100 rounded-md">Scene 2:
                First
                Choice</a>
              <div class="text-xs mb-2 mt-4">Chapter 2: The Journey</div>
              <a href="#" class="block px-3 py-2 text-sm text-gray-500 dark:text-gray-300">Scene 3: The Forest</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-500 dark:text-gray-300">Scene 4: The Cave</a>
            </nav>
          </div>
        </slot>
      </aside>

      <!-- Central Content Area -->
      <main class="flex-1 overflow-y-auto bg-white dark:bg-graphite">
        <slot />
      </main>

      <!-- Right Sidebar -->
      <aside
        class="w-64 bg-gray-50 dark:bg-cooling-tower border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
        <slot name="right-sidebar">
          <!-- Default right sidebar content -->
          <div class="p-4">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">Inventory</h3>
            <div class="space-y-2">
              <div class="flex items-center p-2 bg-white dark:bg-cooling-tower rounded border">
                <div class="w-8 h-8 bg-blue-100 rounded mr-3"></div>
                <div>
                  <div class="text-sm font-medium">Magic Key</div>
                  <div class="text-xs text-gray-500">Opens locked doors</div>
                </div>
              </div>
              <div class="flex items-center p-2 bg-white dark:bg-cooling-tower rounded border">
                <div class="w-8 h-8 bg-green-100 rounded mr-3"></div>
                <div>
                  <div class="text-sm font-medium">Health Potion</div>
                  <div class="text-xs text-gray-500">Restores 50 HP</div>
                </div>
              </div>
              <div class="flex items-center p-2 bg-white dark:bg-cooling-tower rounded border">
                <div class="w-8 h-8 bg-yellow-100 rounded mr-3"></div>
                <div>
                  <div class="text-sm font-medium">Torch</div>
                  <div class="text-xs text-gray-500">Lights dark areas</div>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </aside>
    </div>
  </div>
</template>

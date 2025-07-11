<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <NavAdvPlayerHeader />

    <!-- Main content area with sidebars -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar -->
      <AdvPlayerContextAside>
        <template #context-sections>
          <AdvPlayerAdventureProgress />
          <AdvPlayerProgressSummary />
          <AdvPlayerQuickActions />
        </template>
      </AdvPlayerContextAside>

      <!-- Central Content Area -->
      <main class="flex-1 overflow-y-auto bg-white dark:bg-graphite">
        <slot />
      </main>

      <!-- Right Sidebar -->
      <AdvPlayerDetailAside>
        <template #detail-sections>
          <AdvPlayerCharacterStats />
          <AdvPlayerInventory />
          <AdvPlayerAchievements />
          <AdvPlayerSkills />
          <AdvPlayerActions />
        </template>
      </AdvPlayerDetailAside>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

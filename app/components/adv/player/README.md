# Adventure Player Components

This directory contains components for the adventure game player interface, organized into a flexible sidebar system.

## Component Architecture

The sidebar system consists of two main container components, each managing their own set of section components:

### ContextAside (Left Sidebar)

Manages macro-level context information about the adventure:

- **AdvPlayerAdventureProgress** - Current storyline and navigation tree
- **AdvPlayerProgressSummary** - Statistics about completed content
- **AdvPlayerQuickActions** - Go back, reset game buttons

### DetailAside (Right Sidebar)

Manages detail-level player information:

- **AdvPlayerCharacterStats** - Health, energy, experience, level
- **AdvPlayerInventory** - Items with icons and counts
- **AdvPlayerAchievements** - Earned and unearned achievements
- **AdvPlayerSkills** - Visual skill indicators
- **AdvPlayerActions** - Use items, add random items

## Usage

### Default Layout

The adventure layout automatically shows all sections:

```vue
<template>
  <!-- Uses adventure layout with default sections -->
  <div>Your page content</div>
</template>

<script setup>
definePageMeta({
  layout: 'adventure',
})
</script>
```

### Custom Sections

Override specific sections using named slots:

```vue
<template>
  <!-- Override context sections -->
  <template #context-sections>
    <AdvPlayerAdventureProgress />
    <MyCustomSection />
  </template>

  <!-- Override detail sections -->
  <template #detail-sections>
    <AdvPlayerCharacterStats />
    <AdvPlayerInventory />
    <MyCustomDetailSection />
  </template>
</template>
```

### Individual Section Control

Each section can be shown/hidden based on game state:

```vue
<template>
  <template #context-sections>
    <AdvPlayerAdventureProgress v-if="showProgress" />
    <AdvPlayerQuickActions v-if="showActions" />
  </template>
</template>

<script setup>
const showProgress = computed(() => gameState.currentStoryline.value !== null)
const showActions = computed(() => gameState.sceneHistory.value.length > 0)
</script>
```

## Section Components

### Context Sections

#### AdvPlayerAdventureProgress

- Shows current storyline title
- Displays chapter and scene navigation with completion status
- Visual indicators for completed, current, and available content

#### AdvPlayerProgressSummary

- Chapters completed count
- Scenes visited count
- Current chapter index

#### AdvPlayerQuickActions

- Go back button (disabled when no history)
- Reset game button with confirmation

### Detail Sections

#### AdvPlayerCharacterStats

- Animated health and energy bars
- Experience points display
- Current level

#### AdvPlayerInventory

- Items with icons, names, and descriptions
- Count indicators for stackable items
- Empty state message

#### AdvPlayerAchievements

- Earned achievements with green styling
- Unearned achievements with gray styling
- Progress indicators where applicable

#### AdvPlayerSkills

- Visual skill indicators (currently mock data)
- 5-dot rating system
- Three skills: Problem Solving, Critical Thinking, Scientific Knowledge

#### AdvPlayerActions

- Use health potion (disabled when none available)
- Add random item (for testing)

## Game State Integration

All components integrate with the `useAdventureGameState` composable:

```typescript
const gameState = useAdventureGameState()

// Access current state
const currentStoryline = gameState.currentStoryline.value
const playerStatus = gameState.playerStatus.value

// Trigger actions
gameState.addToInventory(item)
gameState.earnAchievement(achievementId)
gameState.updatePlayerStats(newStats)
```

## Customization

### Adding New Sections

1. Create a new component following the section pattern
2. Add it to the appropriate aside component
3. Use conditional rendering based on game state

### Section Pattern

```vue
<template>
  <div class="bg-white dark:bg-cooling-tower rounded-lg border p-4 mb-6">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Section Title</h3>
    <!-- Section content -->
  </div>
</template>

<script setup lang="ts">
const gameState = useAdventureGameState()
</script>
```

## Styling

All components use consistent Tailwind CSS classes:

- **Container**: `bg-white dark:bg-cooling-tower rounded-lg border p-4 mb-6`
- **Headers**: `text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3`
- **Text**: `text-xs text-gray-600 dark:text-gray-400`
- **Interactive**: Hover states and transitions throughout

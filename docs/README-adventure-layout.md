# Adventure Game Layout

This layout provides a three-panel structure designed for adventure games with dynamic content areas.

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    Header (NavAdvPlayerHeader)              │
├─────────────┬───────────────────────────────┬───────────────┤
│             │                               │               │
│   Left      │         Main Content          │    Right      │
│ Sidebar     │      (Vertical Scrolling)     │   Sidebar     │
│             │                               │               │
│ Navigation  │                               │   Inventory   │
│ Progress    │                               │   Character   │
│ Tree        │                               │   Stats       │
│             │                               │               │
└─────────────┴───────────────────────────────┴───────────────┘
```

## Features

- **Header**: Fixed navigation header with game controls
- **Left Sidebar**: Navigation tree, chapter/scene progress (256px width)
- **Main Content**: Central area with vertical scrolling for game content
- **Right Sidebar**: Player status, inventory, achievements (256px width)
- **No Footer**: Clean, focused gaming experience
- **Responsive**: Adapts to different screen sizes
- **Dynamic Content**: All areas can be updated as the game progresses

## Usage

### Basic Usage

```vue
<template>
  <div>
    <!-- Your main game content goes here -->
    <h1>Welcome to the Adventure!</h1>
    <p>Your game content...</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'adventure',
})
</script>
```

### Customizing Sidebar Content

The layout provides default content for both sidebars, but you can customize them by:

1. **Creating a composable** to manage sidebar state
2. **Using provide/inject** to pass data between components
3. **Using a global store** (Pinia/Vuex) for game state

### Example: Dynamic Navigation Tree

```vue
<script setup lang="ts">
// In your game component
const gameState = useGameState() // Your game state management

// Update navigation when game progresses
watch(
  () => gameState.currentChapter,
  (newChapter) => {
    // Update navigation tree
  },
)
</script>
```

### Example: Dynamic Inventory

```vue
<script setup lang="ts">
// In your game component
const inventory = useInventory() // Your inventory management

// Update inventory when items are collected/used
watch(
  () => inventory.items,
  (newItems) => {
    // Update inventory display
  },
)
</script>
```

## Styling

The layout uses Tailwind CSS classes:

- **Left/Right Sidebars**: `w-64 bg-gray-50 border-r/l border-gray-200`
- **Main Content**: `flex-1 overflow-y-auto bg-white`
- **Responsive**: Uses flexbox for proper layout

## Game State Management

For dynamic content, consider using:

1. **Composables**: `useGameState()`, `useInventory()`, `useProgress()`
2. **Stores**: Pinia store for complex game state
3. **Props/Events**: Pass data between parent and child components

## Example Pages

- `nu-adventure/player.vue` - Basic game player
- `nu-adventure/layout-demo.vue` - Layout demonstration

## Responsive Behavior

- **Desktop**: Full three-panel layout
- **Tablet**: Sidebars may collapse or stack
- **Mobile**: Single column layout with collapsible sidebars

## Accessibility

- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast color scheme

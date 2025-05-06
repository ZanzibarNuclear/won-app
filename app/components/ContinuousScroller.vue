<template>
  <div ref="scrollContainer" class="scroller overflow-y-auto" @scroll="handleScroll">
    <div ref="contentWrapper">
      <slot name="items" />
      <div v-if="loadingInProgress" class="py-4 text-center">
        <UIcon name="i-ph-fan-duotone" class="animate-spin" />
        Loading more...
      </div>
      <div v-else-if="noMoreItems" class="py-4 text-center text-gray-500">
        {{ noMoreMessage || 'The End' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  hasMore: boolean
  loadingInProgress: boolean
  noMoreMessage?: string
}>()

const emit = defineEmits<{
  'load-more': []
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const contentWrapper = ref<HTMLElement | null>(null)
const noMoreItems = computed(() => !props.hasMore && !props.loadingInProgress)

// Check if we need to load more content
function checkContentHeight() {
  if (!scrollContainer.value || !contentWrapper.value) return

  const containerHeight = scrollContainer.value.clientHeight
  const contentHeight = contentWrapper.value.clientHeight

  // If content doesn't fill the container and we have more items to load
  if (contentHeight < containerHeight && props.hasMore && !props.loadingInProgress) {
    loadMore()
  }
}

// Debounced scroll handler
const handleScroll = useDebounceFn((event: Event) => {
  if (!scrollContainer.value || props.loadingInProgress || !props.hasMore) return

  const container = scrollContainer.value
  const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight

  // If we're within 100px of the bottom, load more
  if (scrollBottom < 100) {
    loadMore()
  }
}, 100)

async function loadMore() {
  if (props.loadingInProgress) return

  emit('load-more')
}

onMounted(() => {
  checkContentHeight()
})

watch(
  () => props.hasMore,
  () => {
    nextTick(() => {
      checkContentHeight()
    })
  },
)

watch(
  () => props.loadingInProgress,
  (newValue) => {
    if (!newValue) {
      // Check if we need more content after loading completes
      nextTick(() => {
        checkContentHeight()
      })
    }
  },
)
</script>

<style scoped>
.scroller {
  /* This will position the scroller between header and footer */
  height: calc(
    90vh - var(--header-height, 4rem) - var(--footer-height, 4rem) - var(--page-title-height, 3rem)
  );
  /* Remove fixed positioning, let the parent control layout */
  width: 100%;
}
</style>

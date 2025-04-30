<template>
  <div class="border-b pb-6 border-gray-200">
    <h3>What's on your mind?</h3>
    <div v-if="userStore.isFluxUserLoaded" class="flex gap-4">
      <TiptapEditorV1
        rows="1"
        class="flex-1"
        auto-size
        @post-flux-message="handlePostFlux"
        @cancel-flux="cancelReply"
        :initial-content="initialContent"
        placeholder="What do you want to tell the world?"
        :save-button-label="saveButtonLabel"
      />
    </div>
    <div v-else>
      <h2>Want to share your thoughts?</h2>
      <p>
        <NuxtLink to="/flux-app/join" class="block text-center text-lg text-[nuclear]"
          >Sign in to participate.</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  replyingTo: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['cancelReply'])

const fluxStore = useFluxStore()
const userStore = useUserStore()
const { createFlux } = useFluxService()

const initialContent = ref('')
const placeholder = computed(() =>
  props.replyingTo ? 'Write your reaction...' : "What's nu(-clear)?",
)
const saveButtonLabel = computed(() => (props.replyingTo ? 'React' : 'Flux it'))

async function handlePostFlux(contentToPost) {
  if (!contentToPost || contentToPost.length === 0) {
    alert('You have to write something to flux it.')
    return
  }
  const newFlux = await createFlux(contentToPost, props.replyingTo?.id)
  if (props.replyingTo) {
    fluxStore.addReply(newFlux)
  } else {
    fluxStore.addToTimeline(newFlux)
  }
}

function cancelReply() {
  emit('cancelReply')
}
</script>

<style scoped>
button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.replying-to {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 0.9em;
}

.cancel-reply {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>

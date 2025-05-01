<template>
  <div v-if="userStore.isFluxUserLoaded" class="mx-auto">
    <h3>What would you like to share?</h3>
    <TiptapEditor
      :initial-content="props.post?.postContent"
      placeholder="What's nu(clear)?"
      save-label="Flux it"
      save-icon="i-ph-lightning-duotone"
      cancel-label="Cancel"
      cancel-icon="i-ph-x-circle-duotone"
      @save-content="onSave"
      @cancel-edit="onCancel"
    />
  </div>
  <div v-else>
    <h3>Join Flux if you would like to share your thoughts.</h3>
    <p>
      <NuxtLink to="/flux-app/join" class="block text-center text-lg text-[nuclear]"
        >Sign in to participate.</NuxtLink
      >
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  post: {
    type: Object,
    default: null,
  },
  replyingTo: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['cancelReply'])

const toast = useToast()
const userStore = useUserStore()
const fluxStore = useFluxStore()
const { createFlux } = useFluxService()

const onSave = async (content: string) => {
  console.log('Posting flux: ' + content)
  if (!content || content.length === 0) {
    toast.add({
      title: 'Nothing to Flux',
      description: 'You have to write something before you flux it.',
      icon: 'i-ph-warning-duotone',
      color: 'warning',
      duration: 3000,
    })
    return
  }

  const newFlux = await createFlux(content, props.replyingTo?.id)
  if (props.replyingTo) {
    fluxStore.addReply(newFlux)
  } else {
    fluxStore.addToTimeline(newFlux)
  }
}

const onCancel = () => {
  console.log()
}
</script>

<style scoped></style>

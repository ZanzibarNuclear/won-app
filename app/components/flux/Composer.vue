<template>
  <div v-if="userStore.isFluxUserLoaded" class="mx-auto">
    <h3>What would you like to share?</h3>
    <TiptapEditor
      :initial-content="props.post?.postContent"
      placeholder="What's nu(clear)?"
      save-label="Flux it"
      save-icon="i-ph-lightning-duotone"
      cancel-label="Clear"
      cancel-icon="i-ph-x-circle-duotone"
      @save-content="onFlux"
      @cancel-edit="onCancelFlux"
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

const userStore = useUserStore()

onMounted(() => {
  if (!props.post) {
    console.log('Must be a new post. Have fun.')
  }
})

const onFlux = (content: string) => {
  console.log(content)
}

const onCancelFlux = () => {
  console.log()
}
</script>

<style scoped></style>

<template>
  <div
    v-if="userStore.isFluxUserLoaded"
    class="mx-auto w-full px-3 pb-3 border border-cherenkov rounded-lg"
  >
    <UBadge class="mt-3 float-right" color="neutral">{{
      isReaction ? 'Reaction' : 'New Flux'
    }}</UBadge>
    <h3 v-if="isReaction">What do you have to say about that?</h3>
    <h3 v-else>What's nu(-clear)?</h3>
    <TiptapEditor
      placeholder="What's nu(clear)?"
      save-label="Flux it"
      save-icon="i-ph-lightning-duotone"
      cancel-label="Cancel"
      cancel-icon="i-ph-x-circle-duotone"
      :initial-content="startingContent"
      @save-content="onSave"
      @cancel-edit="onCancel"
    />
  </div>
  <div v-else class="p-3 text-center border border-cherenkov rounded-lg">
    <h3>Want to react to this?</h3>
    <div>Sign in to your account, and sign up for Flux.</div>
    <div class="text-center my-4">
      <UButton to="/flux-app/join" label="Join & Sign Up" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Flux } from '~/types/won-types'

const props = defineProps({
  reactingTo: {
    type: Object as PropType<Flux | null>,
    required: false,
  },
  forEdit: {
    type: Object as PropType<Flux | null>,
    required: false,
  },
})
const emit = defineEmits(['close'])

const toast = useToast()
const userStore = useUserStore()
const fluxStore = useFluxStore()
const { createFlux, updateFlux } = useFluxService()

const isReaction = computed(() => !!props.reactingTo)

const startingContent = computed(() => {
  return !!props.forEdit ? props.forEdit.content : undefined
})
// onMounted(() => {
//   if (props.reactingTo) {
//     console.log('reacting to: ' + JSON.stringify(props.reactingTo))
//   }
//   if (props.forEdit) {
//     console.log('editing: ' + JSON.stringify(props.forEdit))
//   }
// })

const onCreateFlux = async (content: string) => {
  const reactingTo = props.reactingTo ? props.reactingTo.id : null
  const newFlux = await createFlux(content, reactingTo)
  if (props.reactingTo) {
    fluxStore.addReaction(newFlux)
  } else {
    fluxStore.addToTimeline(newFlux)
  }
}

const onUpdateFlux = async (content: string) => {
  const fluxDelta = await updateFlux(props.forEdit.id, content)
  console.log(fluxDelta)
  if (fluxDelta) {
    fluxStore.updateFlux(fluxDelta)
    fluxStore.setActiveFlux(fluxDelta)
  }
}

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
  console.log('saving')
  if (props.forEdit) {
    console.log('an edit')
    await onUpdateFlux(content)
  } else {
    console.log('a new flux')
    await onCreateFlux(content)
  }
  emit('close')
}

const onCancel = () => {
  emit('close')
}
</script>

<style scoped></style>

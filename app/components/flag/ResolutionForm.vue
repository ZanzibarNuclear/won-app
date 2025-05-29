<template>
  <UContainer>
    <h3>Resolution</h3>
    <div class="text-sm mb-6 text-cooling-tower dark:text-cooling-tower-dark">
      <div>Dev Notes:</div>
      <ul>
        <li>Let's add some handy action buttons. Block, delete, etc.</li>
        <li>We also need a way to notify the author of the flux.</li>
      </ul>
    </div>
    <div v-if="flux">
      Action Buttons:
      <UButton
        v-if="!flux.blockedAt"
        label="Block Flux"
        variant="subtle"
        class="mr-2"
        @click="handleBlockFlux"
      />
      <UButton
        v-if="flux.blockedAt"
        label="Unblock Flux"
        variant="subtle"
        class="mr-2"
        @click="handleUnblockFlux"
      />
      <UButton
        v-if="!flux.deletedAt"
        label="Delete Flux"
        variant="subtle"
        class="mr-2"
        @click="handleDeleteFlux"
      />
      <UButton
        v-if="flux.deletedAt"
        label="Restore Flux"
        variant="subtle"
        class="mr-2"
        @click="handleRestoreFlux"
      />
      <UButton label="Notify Author" variant="subtle" @click="handleNotifyAuthor" />
    </div>
    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <UFormField label="Resolution Note" name="note" description="For internal use only.">
        <UTextarea v-model="state.note" class="w-full" />
      </UFormField>
      <UButton v-if="!done" type="submit" label="Resolve" />
      <UButton v-if="done" label="Finish" @click="emit('close')" />
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps(['flag', 'flux'])
const emit = defineEmits(['resolved', 'close'])

const schema = z.object({
  note: z.string().optional(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  note: undefined,
})

const flagSvc = useFlagService()
const done = ref(false)

const toast = useToast()
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
  console.log('Resolving flag: %o', event.data)
  const result = await flagSvc.resolveFlag(props.flag.id, state.note)
  console.log('Result of resolving flag: %o', result)
  if (result) {
    done.value = true
    emit('resolved')
  } else {
    console.log('Something went wrong while resolving.')
  }
}

const adminSvc = useAdminService()
const handleBlockFlux = async () => {
  await adminSvc.blockFlux(props.flux.id)
}
const handleUnblockFlux = async () => {
  await adminSvc.unblockFlux(props.flux.id)
}
const handleDeleteFlux = async () => {
  await adminSvc.deleteFlux(props.flux.id)
}
const handleRestoreFlux = async () => {
  await adminSvc.restoreFlux(props.flux.id)
}
const handleNotifyAuthor = () => {
  // Placeholder for notifying the author logic
  alert('Yes, yes, we will notify the author.')
}
</script>

<style scoped>
ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}
</style>

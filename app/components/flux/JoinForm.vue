<template>
  <div>
    <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
      <UFormField
        label="Screen Name (alias)"
        name="alias"
        help="The name you want to show others. Might be an alias."
        hint="e.g., Big Winner"
      >
        <UInput v-model="state.alias" class="w-full" />
      </UFormField>

      <UFormField
        label="Handle"
        name="handle"
        help="A system-friendly name used to identify you."
        hint="e.g., lucky-seven"
      >
        <UInput v-model="state.handle" class="w-full" />
      </UFormField>
      <UButtonGroup>
        <UButton type="button" label="Generate handle" @click="genHandle" />
        <UButton
          color="neutral"
          type="button"
          label="Check availability"
          @click="checkProposedHandle"
        />
      </UButtonGroup>

      <UFormField
        label="Terms of Use"
        name="agreeToTerms"
        help="You do not have to agree, but you cannot use Flux unless you do."
      >
        <UCheckbox
          v-model="state.agreeToTerms"
          class="w-full"
          label="I have read and agree to the terms of use."
        />
        Here are the
        <NuxtLink
          class="hover:bg-gray-200 hover:dark:bg-gray-500"
          external
          target="_blank"
          to="https://nuclearambitions.com/legal/terms-of-use"
          >Terms of Use</NuxtLink
        >.
      </UFormField>

      <UButton type="submit" block class="my-6" label="Join Flux" />
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits(['ready'])
const userStore = useUserStore()
const toast = useToast()

const schema = z.object({
  alias: z.string().min(1, 'Alias is required').max(50, 'Shorter, please'),
  handle: z
    .string()
    .min(1, 'Handle is required')
    .max(50, 'Shorter, please')
    .regex(
      new RegExp(/^[a-zA-Z0-9._\-~]+$/),
      'May only contain letters, digits, or special characters: .-_~',
    ),
  agreeToTerms: z.boolean(),
})
type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  alias: undefined,
  handle: undefined,
  agreeToTerms: undefined,
})

onMounted(() => {
  state.alias = userStore.profile?.alias ?? undefined
  state.handle = userStore.profile?.handle ?? undefined
})

const genHandle = () => {
  state.handle = suggestHandle()
}

const checkProposedHandle = async () => {
  if (state.handle && state.handle.length > 2) {
    const isNotTaken = await usePublicAccess().isHandleAvailable(state.handle)
    if (isNotTaken) {
      toast.add({
        title: 'Available',
        description: 'That handle is not taken.',
      })
    } else {
      toast.add({
        title: 'Taken',
        description: 'That handle is already in use.',
      })
    }
  } else {
    toast.add({
      title: 'Pick a handle',
      description: 'Please enter a handle you would like.',
    })
  }
}

// TODO: detect whether alias and handle are already set

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('ready to flux?', event)
  // TODO: send changed fields in call to join flux
  emit('ready')
}
</script>

<style scoped>
a {
  text-decoration: underline;
}
.rules-list {
  margin: 1rem 2rem;
  padding: 0;
}

.rules-list dt {
  font-weight: bold;
  margin-top: 1rem;
}

.rules-list dd {
  margin-left: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}
</style>

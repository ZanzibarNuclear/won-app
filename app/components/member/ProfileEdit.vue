<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { UserProfile } from '~/types/won-types'

interface Props {
  initialProfile?: UserProfile
}
const props = defineProps<Props>()
const emit = defineEmits(['saveUpdates', 'cancelChanges'])

const WRITE_IN_MAX_LENGTH = 400

const schema = z.object({
  fullName: z.string().min(1, 'Name is required').max(100, 'Shorter, please'),
  alias: z.string().min(1, 'Alias is required').max(50, 'Shorter, please'),
  handle: z
    .string()
    .min(1, 'Handle is required')
    .max(50, 'Shorter, please')
    .regex(
      new RegExp(/^[a-zA-Z0-9._\-~]+$/),
      'May only contain letters, digits, or special characters: .-_~',
    ), // system generated option?
  avatar: z.string().optional(),
  glamShot: z.string().optional(),
  bio: z.string().max(WRITE_IN_MAX_LENGTH).optional(),
  location: z.string().max(80).optional(),
  website: z.string().max(500).url('Invalid URL').optional(),
  whyJoined: z.string().max(WRITE_IN_MAX_LENGTH).optional(),
  whyNuclear: z.string().max(WRITE_IN_MAX_LENGTH).optional(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  fullName: props.initialProfile?.fullName ?? undefined,
  alias: props.initialProfile?.alias ?? undefined,
  handle: props.initialProfile?.handle ?? undefined,
  bio: props.initialProfile?.bio ?? undefined,
  location: props.initialProfile?.location ?? undefined,
  website: props.initialProfile?.website ?? undefined,
  whyJoined: props.initialProfile?.whyJoined ?? undefined,
  whyNuclear: props.initialProfile?.whyNuclear ?? undefined,
})

// TODO: idea!! use a modal to generate suggestions and pick a favorite
// TODO: check with server that handle is available as part of client-side validation
const genHandle = () => {
  state.handle = suggestHandle()
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('saveUpdates', event.data)
}
</script>

<template>
  <div>
    <UForm :schema="schema" :state="state" class="min-w-80 space-y-6" @submit="onSubmit">
      <UFormField
        label="Your Name"
        name="name"
        help="Your real name, or whatever you want us to call you."
        hint="e.g., Zanzibar Nuhero"
      >
        <UInput v-model="state.fullName" class="w-full" />
      </UFormField>

      <UFormField
        label="Screen Name"
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

      <UButton class="mb-4" color="neutral" @click="genHandle">Suggest a handle</UButton>

      <UFormField
        label="Biography"
        name="bio"
        help="A brief version of your story."
        :hint="`${WRITE_IN_MAX_LENGTH} character limit`"
      >
        <UTextarea v-model="state.bio" placeholder="Tell the world about yourself" class="w-full" />
      </UFormField>

      <UFormField
        label="Location"
        name="location"
        help="Where you live or where you are, in a general way."
        hint="Not too precise, please"
      >
        <UInput v-model="state.location" placeholder="Where you live" class="w-full" />
      </UFormField>

      <UFormField
        label="Website"
        name="website"
        help="Your personal or business website, maybe your blog."
        hint="e.g., https://nuclearambitions.com"
      >
        <UInput v-model="state.website" type="url" class="w-full" />
      </UFormField>

      <UFormField
        label="Why You Joined"
        name="joinReason"
        help="What you hope to get out of being a member of the World of Nuclear."
        :hint="`${WRITE_IN_MAX_LENGTH} character limit`"
      >
        <UTextarea v-model="state.whyJoined" class="w-full" />
      </UFormField>

      <UFormField
        label="Why Nuclear"
        name="nuclearLikes"
        help="What draws you to nuclear energy?"
        :hint="`${WRITE_IN_MAX_LENGTH} character limit`"
      >
        <UTextarea v-model="state.whyNuclear" class="w-full" />
      </UFormField>

      <UButton type="submit" block class="mt-4">Save Changes</UButton>
      <UButton @click="() => emit('cancelChanges')" block color="warning" class="mt-4"
        >Cancel Changes</UButton
      >
    </UForm>
  </div>
</template>

<style scoped></style>

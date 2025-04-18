<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { UserProfile } from '~/types/won-types'

interface Props {
  initialProfile?: UserProfile
}
const props = defineProps<Props>()
const emit = defineEmits(['saveUpdates'])

const schema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  alias: z.string().min(1, 'Alias is required'),
  handle: z
    .string()
    .min(1, 'Handle is required')
    .max(25, 'Shorter, please')
    .regex(
      new RegExp(/^[a-zA-Z0-9._\-~]+$/),
      'May only contain letters, digits, or special characters: .-_~',
    ), // system generated option?
  avatar: z.string().url('Invalid URL').optional(),
  glamShot: z.string().url('Invalid URL').optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid URL').optional(),
  whyJoined: z.string().optional(),
  whyNuclear: z.string().optional(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  fullName: props.initialProfile?.fullName ?? undefined,
  alias: props.initialProfile?.alias ?? undefined,
  handle: props.initialProfile?.handle ?? undefined,
  avatar: props.initialProfile?.avatar ?? undefined,
  glamShot: props.initialProfile?.glamShot ?? undefined,
  bio: props.initialProfile?.bio ?? undefined,
  location: props.initialProfile?.location ?? undefined,
  website: props.initialProfile?.website ?? undefined,
  whyJoined: props.initialProfile?.whyJoined ?? undefined,
  whyNuclear: props.initialProfile?.whyNuclear ?? undefined,
})

// watchEffect(() => {
//   if (userStore.profile) {
//     const { profile } = userStore
//     state.fullName = profile.fullName ?? undefined
//     state.alias = profile.alias ?? undefined
//     state.handle = profile.handle ?? undefined
//     state.avatar = profile.avatar ?? undefined
//     state.glamShot = profile.glamShot ?? undefined
//     state.bio = profile.bio ?? undefined
//     state.location = profile.location ?? undefined
//     state.website = profile.website ?? undefined
//     state.whyJoined = profile.whyJoined ?? undefined
//     state.whyNuclear = profile.whyNuclear ?? undefined
//   }
// })

// TODO: idea!! use a modal to generate suggestions and pick a favorite
const genHandle = () => {
  state.handle = suggestHandle()
}

// TODO: check with server that handle is available as part of client-side validation

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('saveUpdates', event.data)
}
</script>

<template>
  <div>
    <UForm :schema="schema" :state="state" class="min-w-80 space-y-6" @submit="onSubmit">
      <UFormField label="Your Name" name="name">
        <UInput
          v-model="state.fullName"
          placeholder="Your real name, or whatever you want us to call you"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Screen Name" name="alias" hint="e.g., Wonder Person">
        <UInput
          v-model="state.alias"
          placeholder="Your online (alternate?) identity"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Handle" name="handle" hint="e.g., person-of-wonder">
        <UInput v-model="state.handle" placeholder="How the system will know you" class="w-full" />
        <UButton class="mt-2" color="neutral" @click="genHandle">Try a suggestion</UButton>
      </UFormField>
      <UFormField label="Avatar" name="avatar">
        <div class="flex flex-row space-x-2 mb-2">
          <UAvatar src="/images/Zanzibar.jpg" size="3xl" />
          <UIcon name="i-ph-pencil" class="size-5" />
        </div>
        <UInput v-model="state.avatar" type="url" placeholder="URL to your avatar" class="w-full" />
      </UFormField>
      <UFormField label="Profile Picture" name="profilePic">
        <div class="flex flex-row space-x-2">
          <NuxtImg src="/images/Zanzibar.jpg" class="w-1/4 mb-2" />
          <UIcon name="i-ph-pencil" class="size-5" />
        </div>
        <UInput
          v-model="state.glamShot"
          type="url"
          placeholder="URL to your profile photo"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Bio" name="bio">
        <UTextarea v-model="state.bio" placeholder="Tell the world about yourself" class="w-full" />
      </UFormField>
      <UFormField label="Location" name="location" hint="Not too precise">
        <UInput v-model="state.location" placeholder="Where you live" class="w-full" />
      </UFormField>
      <UFormField label="Website" name="website" hint="Personal, business, your blog...">
        <UInput
          v-model="state.website"
          type="url"
          placeholder="URL of your digital home"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Why You Joined" name="joinReason">
        <UTextarea
          v-model="state.whyJoined"
          placeholder="Tell others why you joined the World of Nuclear?"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Why Nuclear" name="nuclearLikes">
        <UTextarea
          v-model="state.whyNuclear"
          placeholder="What do you like about nuclear energy?"
          class="w-full"
        />
      </UFormField>
      <UButton type="submit" block class="mt-4">Save Changes</UButton>
    </UForm>
  </div>
</template>

<style scoped></style>

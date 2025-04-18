<template>
  <UContainer class="flex flex-col items-center">
    <h1>Member Profile</h1>
    <div class="mb-24">
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
          <UInput
            v-model="state.handle"
            placeholder="How the system will know you"
            class="w-full"
          />
          <UButton class="mt-2" color="neutral" @click="genHandle">Try a suggestion</UButton>
        </UFormField>
        <UFormField label="Avatar" name="avatar">
          <div class="flex flex-row space-x-2 mb-2">
            <UAvatar src="/images/Zanzibar.jpg" size="3xl" />
            <UIcon name="i-ph-pencil" class="size-5" />
          </div>
          <UInput
            v-model="state.avatar"
            type="url"
            placeholder="URL to your avatar"
            class="w-full"
          />
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
          <UTextarea
            v-model="state.bio"
            placeholder="Tell the world about yourself"
            class="w-full"
          />
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
            v-model="state.whyJoin"
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
  </UContainer>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { UserProfile, UserProfileDeltas } from '~/types/won-types'

const memberService = useMemberService()
const userStore = useUserStore()
const toast = useToast()

const initialState = ref(null)

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
  whyJoin: z.string().optional(),
  whyNuclear: z.string().optional(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  fullName: undefined,
  alias: undefined,
  handle: undefined,
  avatar: undefined,
  glamShot: undefined,
  bio: undefined,
  location: undefined,
  website: undefined,
  whyJoin: undefined,
  whyNuclear: undefined,
})

const {
  data: profile,
  status,
  error,
  refresh,
  clear,
} = await useAsyncData('mountains', () => useMemberService().getUserProfile())

watchEffect(() => {
  if (profile.value) {
    state.fullName = profile.value.fullName ?? undefined
    state.alias = profile.value.alias ?? undefined
    state.handle = profile.value.handle ?? undefined
    state.avatar = profile.value.avatar ?? undefined
    state.glamShot = profile.value.glamShot ?? undefined
    state.bio = profile.value.bio ?? undefined
    state.location = profile.value.location ?? undefined
    state.website = profile.value.website ?? undefined
    state.whyJoin = profile.value.whyJoined ?? undefined
    state.whyNuclear = profile.value.whyNuclear ?? undefined
  }
})

onMounted(async () => {
  if (!userStore.isSignedIn) {
    toast.add({
      title: 'Not signed in',
      description: 'Looks like you need to sign in',
      color: 'warning',
    })
    // } else if (!userStore.isProfileLoaded) {
    //   const profile = await memberService.getUserProfile()
    //   userStore.setProfile(profile as UserProfile)
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const deltas: UserProfileDeltas = {
    fullName: event.data.fullName,
    alias: event.data.alias,
    handle: event.data.handle,
    avatar: event.data.avatar || null,
    glamShot: event.data.glamShot || null,
    bio: event.data.bio || null,
    location: event.data.location || null,
    website: event.data.website || null,
    whyJoined: event.data.whyJoin || null,
    whyNuclear: event.data.whyNuclear || null,
  }

  console.log('Mapped Deltas:', deltas)

  // Assuming you send the deltas to an API or handle them further
  try {
    await memberService.updateUserProfile(deltas)
    toast.add({
      title: 'Success',
      description: 'Your profile has been updated.',
      color: 'success',
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update your profile. Please try again.',
      color: 'error',
    })
  }
}

const genHandle = () => {
  const candidate = pick(adjectives) + '-' + pick(nouns)
  state.handle = candidate
}

function pick(words: string[]): string {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex] as string
}

const adjectives = [
  'Happy',
  'Bright',
  'Clever',
  'Brave',
  'Calm',
  'Quick',
  'Strong',
  'Sweet',
  'Sharp',
  'Bold',
  'Kind',
  'Large',
  'Small',
  'Tall',
  'Short',
  'Soft',
  'Hard',
  'Warm',
  'Cool',
  'Clean',
  'Fresh',
  'Dark',
  'Light',
  'Smooth',
  'Rough',
  'Quiet',
  'Loud',
  'Rich',
  'Poor',
  'Young',
  'Old',
  'New',
  'Good',
  'Bad',
  'Fine',
  'Fair',
  'True',
  'False',
  'Full',
  'Empty',
  'Sweet',
  'Sour',
  'Bitter',
  'Sharp',
  'Flat',
  'Round',
  'Wide',
  'Narrow',
  'Deep',
  'Shallow',
  'Bright',
  'Dull',
  'Clean',
  'Dirty',
  'Soft',
  'Hard',
  'Hot',
  'Cold',
  'Quick',
  'Slow',
  'Strong',
  'Weak',
  'Brave',
  'Cowardly',
  'Happy',
  'Sad',
  'Angry',
  'Calm',
  'Busy',
  'Lazy',
  'Early',
  'Late',
  'High',
  'Low',
  'Thick',
  'Thin',
  'Sweet',
  'Salty',
  'Fresh',
  'Stale',
  'Light',
  'Heavy',
  'Clear',
  'Cloudy',
  'Smooth',
  'Rough',
  'Bright',
  'Dark',
  'Soft',
  'Hard',
  'Warm',
  'Cool',
  'Young',
  'Old',
  'New',
  'Feeble',
  'Modern',
  'Simple',
  'Complex',
  'Useful',
  'Cranky',
]

const nouns = [
  'Atom',
  'Uranium',
  'Plutonium',
  'Thorium',
  'Iodine',
  'Lead',
  'Zircaloy',
  'Reactor',
  'Core',
  'Fuel',
  'Fuel-Rod',
  'Assembly',
  'Moderator',
  'Coolant',
  'Control-Rod',
  'Containment',
  'Turbine',
  'Generator',
  'Steam',
  'Pressurizer',
  'Vessel',
  'Reaction',
  'Fission',
  'Fusion',
  'Neutron',
  'Proton',
  'Electron',
  'Isotope',
  'Radiation',
  'Decay',
  'Dose',
  'Shielding',
  'Waste',
  'Enrichment',
  'Centrifuge',
  'Safeguard',
  'Detector',
  'Monitoring',
  'Meltdown',
  'Criticality',
  'Cross-Section',
  'Flux',
  'Power',
  'Electricity',
  'Cooling-Tower',
  'Condenser',
  'Pump',
  'Loop',
]
</script>

<style scoped></style>

<template>
  <UContainer class="w-3/4">
    <h1>Member Profile</h1>
    <h2>View / Edit</h2>
    <UForm :schema="schema" :state="state" class="w-1/2 min-w-80 space-y-6" @submit="onSubmit">
      <UFormField label="Screen Name" name="screenName" hint="e.g., Johnny B. Goode">
        <UInput v-model="state.screenName" placeholder="How others will know you" class="w-full" />
      </UFormField>
      <UFormField label="Handle" name="handle" hint="e.g., Johnny-B-Goode">
        <UInput v-model="state.handle" placeholder="How the system will know you" class="w-full" />
        <UButton class="mt-2" color="neutral" @click="genHandle">Try a suggestion</UButton>
      </UFormField>
      <UFormField label="Bio" name="bio">
        <UTextarea v-model="state.bio" placeholder="Tell us about yourself" class="w-full" />
      </UFormField>
      <UFormField label="Location" name="location" hint="Not too precise">
        <UInput v-model="state.location" placeholder="Where you are" class="w-full" />
      </UFormField>
      <UFormField label="Website" name="website" hint="About you, your business, your blog...">
        <UInput
          v-model="state.website"
          type="url"
          placeholder="URL of your digital home"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Join Reason" name="joinReason">
        <UTextarea
          v-model="state.joinReason"
          placeholder="Tell others why you joined the World of Nuclear?"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Why Nuclear?" name="nuclearLikes">
        <UTextarea
          v-model="state.nuclearLikes"
          placeholder="What do you like about nuclear energy?"
          class="w-full"
        />
      </UFormField>
      <UButton type="submit" class="mt-4">Update Profile</UButton>
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  screenName: z.string().min(1, 'Screen name is required'),
  handle: z
    .string()
    .min(1, 'Handle is required')
    .max(25, 'Shorter, please')
    .regex(
      new RegExp(/^[a-zA-Z0-9._\-~]+$/),
      'May only contain letters, digits, or special characters: .-_~',
    ), // system generated option?
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid URL').optional(),
  joinReason: z.string().optional(),
  nuclearLikes: z.string().optional(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  screenName: undefined,
  handle: undefined,
  bio: undefined,
  location: undefined,
  website: undefined,
  email: undefined,
  joinReason: undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: 'The form has been submitted. (Yeah, not really)',
    color: 'success',
  })
  console.log(event.data)
}

const genHandle = () => {
  const candidate = pick(adjectives) + '-' + pick(nouns)
  state.handle = candidate
}

function pick(words: string[]): string {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
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

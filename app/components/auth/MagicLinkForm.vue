<template>
  <ClientOnly>
    <div class="rounded-lg">
      <UForm :state="state" :schema="schema" @submit.prevent="onSubmit">
        <div class="flex flex-col items-center">
          <UFormGroup
            class="w-5/6"
            name="email"
            :ui="formGroupStyle"
            label="Email address"
            required
            help="Check your spelling before you send."
          >
            <UInput v-model="state.email" placeholder="email address" icon="i-ph-envelope" />
          </UFormGroup>
          <UButton
            type="submit"
            label="Send Magic Link"
            :ui="buttonStyle"
            icon="i-ph-arrow-circle-right-duotone"
          />
          <NuxtTurnstile v-model="state.token" class="my-4" />
        </div>
      </UForm>
    </div>
    <UModal v-model="notification.show" :title="notification.heading">
      <UCard>
        <template #header
          ><span class="text-lg font-bold">{{ notification.heading }}</span></template
        >
        <div>{{ notification?.message }}</div>
        <template #footer>
          <UButton @click="() => (notification.show = false)">Close</UButton>
        </template>
      </UCard>
    </UModal>
  </ClientOnly>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  email: z.string().email(),
  token: z.string(),
})
type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  token: undefined,
})

const notification = reactive({
  show: false,
  heading: '',
  message: '',
})

const notify = (heading: string, message: string) => {
  notification.heading = heading
  notification.message = message
  notification.show = true
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('You say your email address is ' + event.data.email + '. We shall see...')
  const response: any = await useWonAuth().loginWithMagicLink(
    event.data.email,
    'Nuclear Fan',
    event.data.token,
  )
  notify(
    response.status === 'success' ? 'Magic Link Sent' : 'Error Sending Magic Link',
    response.message,
  )
}

const formGroupStyle = {
  wrapper: '',
  inner: '',
  label: {
    wrapper: 'flex content-center items-center justify-between',
    base: 'block font-medium my-1',
    required: "after:content-['*'] after:ms-0.5",
  },
  size: {
    '2xs': 'text-xs',
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base',
  },
  container: 'mt-1 relative',
  description: 'text-xs',
  hint: 'text-xs',
  help: 'mt-2 pl-2 text-xs',
  error: 'text-xs mt-2',
  default: {
    size: 'sm',
  },
}
const buttonStyle = {
  rounded: 'rounded-full',
}
</script>

<style></style>

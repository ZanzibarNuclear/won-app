<template>
  <div class="w-3/4">
    <h2>Establish Your Flux Identity</h2>
    <div v-if="!userStore.isSignedIn">
      <h3>Sign in</h3>
      <div>
        You must be signed in to join Flux. We will create a free account for your if you need one.
      </div>
      <UButton @click="goToSignIn" label="Sign in to the World of Nuclear" block />
    </div>
    <div v-else>
      <h3>Choose Your Alias and Handle</h3>
      <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
        <div v-if="hasAlias && !aliasIsInEdit">
          <MemberProfileField
            :value="state.alias"
            :name="fields.alias.label"
            :explanation="fields.alias.explanation"
          >
            <UButton icon="i-ph-pencil" @click="editAlias" />
          </MemberProfileField>
        </div>
        <UFormField
          v-else
          name="alias"
          :label="fields.alias.label"
          :description="fields.alias.explanation"
          :hint="fields.alias.hint"
        >
          <UInput v-model="state.alias" class="w-full" />
          <UButton
            v-if="hasAlias"
            class="mt-2"
            color="warning"
            label="Use what I have"
            @click="revertAlias"
          />
        </UFormField>

        <div v-if="hasHandle && !handleIsInEdit">
          <MemberProfileField
            :value="state.handle"
            :name="fields.handle.label"
            :explanation="fields.handle.explanation"
          >
            <UButton icon="i-ph-pencil" @click="editHandle" />
          </MemberProfileField>
        </div>
        <div v-else>
          <UFormField
            name="handle"
            :label="fields.handle.label"
            :description="fields.handle.explanation"
            :hint="fields.handle.hint"
            :help="fields.handle.help"
          >
            <UInput v-model="state.handle" class="w-full" />
          </UFormField>
          <UButtonGroup class="mt-2">
            <UButton
              v-if="hasAlias"
              color="warning"
              label="Use what I have"
              @click="revertHandle"
            />
            <UButton type="button" label="Generate handle" @click="genHandle" />
            <UButton
              v-if="!hasHandle || state.handle !== userStore.profile?.handle"
              color="neutral"
              type="button"
              label="Check availability"
              @click="checkProposedHandle"
            />
          </UButtonGroup>
        </div>

        <UButton type="submit" block class="my-6" label="Join Flux" />
      </UForm>
    </div>
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
      'Only letters, numbers, periods (.), underscores (_), dashes (-) and tildes (~). No spaces or tabs.',
    ),
})
type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  alias: undefined,
  handle: undefined,
})

const fields = {
  alias: {
    label: 'Alias',
    explanation:
      'People will get to know you by your alias, or screen name. Think of it as branding for yourself.',
    hint: 'e.g., Mr. Lucky',
  },
  handle: {
    label: 'Handle',
    explanation:
      'This is used to find you. Each handle is a unique combination of letters, numbers and special characters.',
    help: 'You can use letters, numbers, periods (.), underscore (_), dash (-) and tilde (~). No spaces or tabs.',
    hint: 'e.g., lucky-7s',
  },
}

const goToSignIn = () => {
  useWonContext().setReturnRoute('/flux-app/join')
  navigateTo('/sign-in')
}

const hasAlias = computed(() => {
  return userStore.profile && userStore.profile.alias
})
const aliasIsInEdit = ref(false)
const editAlias = () => {
  aliasIsInEdit.value = true
}
const revertAlias = () => {
  state.alias = userStore.profile?.alias ?? undefined
  aliasIsInEdit.value = false
}

const hasHandle = computed(() => {
  return userStore.profile && userStore.profile.handle
})
const handleIsInEdit = ref(false)
const editHandle = () => {
  handleIsInEdit.value = true
}
const revertHandle = () => {
  state.handle = userStore.profile?.handle ?? undefined
  handleIsInEdit.value = false
}

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
        title: 'Available!',
        description: 'You can make it yours.',
      })
    } else {
      toast.add({
        title: 'Taken',
        description: 'Sorry, that handle is already in use.',
      })
    }
  } else {
    toast.add({
      title: 'Pick a handle',
      description: 'Please enter a handle you would like.',
    })
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('ready to flux?', event)

  let updates: any = {}
  const proposedAlias = event.data.alias
  if (proposedAlias && event.data.alias !== userStore.profile?.alias) {
    updates.alias = proposedAlias
  }
  const proposedHandle = event.data.handle
  if (proposedHandle && event.data.handle !== userStore.profile?.handle) {
    updates.handle = proposedHandle
  }

  const fluxUser = await useMemberService().joinFlux(updates)
  userStore.setFluxUser(fluxUser)
  userStore.updateProfile(updates)
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

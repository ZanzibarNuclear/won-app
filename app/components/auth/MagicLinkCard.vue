<template>
  <UCard>
    <template #header>
      <div class="text-lg font-bold pb-4">Request a magic link</div>
      <div class="font-body text-sm">
        Tell us your email address, and we will send you a link. Click the link to return here, all
        signed in.
      </div>
    </template>
    <div class="mx-auto max-w-md">
      <AuthMagicLinkForm />
    </div>
  </UCard>
</template>

<script lang="ts" setup>
const magicForm = reactive({
  email: '',
  alias: '',
  token: '',
  needAccount: false,
  active: true,
})

const emailFeedback = reactive({
  done: false,
  show: false,
  heading: '',
  message: '',
})

const needAccountLabel = computed(() => {
  return magicForm.needAccount ? 'I need an account' : 'I have an account'
})

const enableResend = () => {
  magicForm.active = true
  emailFeedback.done = false
}

// TODO: add field validation

const login = async () => {
  magicForm.active = false
  const response: any = await useWonAuth().loginWithMagicLink(
    magicForm.email,
    magicForm.alias,
    magicForm.token,
  )

  if (response.status === 'success') {
    emailFeedback.heading = 'Magic Link Sent'
    emailFeedback.message = response.message
  } else {
    emailFeedback.heading = 'Error Sending Magic Link'
    emailFeedback.message = response.message
  }
  emailFeedback.show = true
  emailFeedback.done = true
}
</script>

<template>
  <div>
    <button @click="authenticate('google')">Login with Google</button>
    <button @click="authenticate('facebook')">Login with Facebook</button>
    <button @click="authenticate('discord')">Login with Discord</button>
    <button @click="authenticate('x')">Login with X</button>

    <iframe v-if="popupVisible" ref="popup" :src="popupUrl" style="display: none"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: false,
      popupUrl: '',
    }
  },
  methods: {
    authenticate(provider) {
      this.popupUrl = `${useRuntimeConfig().public.wonServiceUrl}/login/${provider}`
      this.popupVisible = true

      const popupWindow = window.open(this.popupUrl, '_blank', 'width=500,height=600')

      const interval = setInterval(() => {
        try {
          if (popupWindow.closed) {
            clearInterval(interval)
            this.popupVisible = false
            alert('Authentication completed!')
          }
        } catch (e) {}
      }, 500)
    },
  },
}
</script>

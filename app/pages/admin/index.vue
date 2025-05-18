<template>
  <UContainer>
    <h1>WoN Administration</h1>
    <div>Let's administer things. Whee!!!</div>

    <div>
      <div>Users</div>
      <ul>
        <li v-for="user in users">
          {{ user.id }} - {{ user.alias }} - {{ user.email }} - is a bot? {{ user.systemBot }}
        </li>
      </ul>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useAdminService } from '~/composables/useAdminService'

const adminSvc = useAdminService()
const { data: users } = await useAsyncData('users', () => adminSvc.fetchSystemUsers())
</script>

<style scoped></style>

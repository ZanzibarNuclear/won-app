<template>
  <div v-if="profile">
    <div>ID: {{ profile.id }}</div>
    <div>Screen name (alias): {{ profile.alias }}</div>
    <div>Handle: {{ profile.handle }}</div>
    <div>Full name: {{ profile.fullName }}</div>
    <div>Avatar: {{ profile.avatar }}</div>
    <div>Profile pic: {{ profile.glamShot }}</div>
    <div>Bio: {{ profile.bio }}</div>
    <div>Location: {{ profile.location }}</div>
    <div>Website: {{ profile.website }}</div>
    <div>Why you joined: {{ profile.whyJoined }}</div>
    <div>Why you like nuclear: {{ profile.whyNuclear }}</div>
    <div>Karma: {{ profile.karmaScore }}</div>
    <div>Joined: {{ profile.createdAt }}</div>
    <div>Last update: {{ profile.updatedAt }}</div>
  </div>
</template>

<script setup lang="ts">
const { profile } = useUserStore()
</script>

<style scoped></style>

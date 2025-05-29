<template>
  <div>
    <h1>Violation Reports</h1>
    <p>People have flagged issues that need attention.</p>
    <p>The resolution might be that there is no issue.</p>
    <p>And we might need to block content or suspend a member.</p>
    <p>Shall we take a look?</p>

    <div>
      <ul>
        <li v-for="reason in reasons">{{ reason.code }} - {{ reason.description }}</li>
      </ul>
    </div>

    <div>
      <ul>
        <li v-for="flag in flags">{{ JSON.stringify(flag) }}</li>
      </ul>
    </div>

    <div>Place to review items.</div>
  </div>
</template>

<script setup lang="ts">
import type { Flag, ReasonCodeType } from '~/types/won-types'

const flagSvc = useFlagService()

const flags = ref<Flag[]>([])
const reasons = ref<ReasonCodeType[]>([])

onMounted(async () => {
  const result = await flagSvc.fetchFlags()
  flags.value = result.items
  console.log('%o', flags.value)
  reasons.value = await flagSvc.fetchReasonCodes()
})
</script>

<style scoped></style>

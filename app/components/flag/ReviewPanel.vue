<template>
  <UContainer>
    <h1>Violation Reports</h1>
    <div class="my-4">
      People have flagged issues that need attention. The resolution might be that there
      is no issue. And we might need to block content or suspend a member.
    </div>
    <div class="my-4">Shall we take a look?</div>

    <div class="grid grid-cols-[1fr_3fr] gap-2 my-4 w-3/4 mx-auto">
      <div class="font-bold">Code</div>
      <div class="font-bold">Description</div>
      <template v-for="reason in reasons">
        <div>{{ reason.code }}</div>
        <div>{{ reason.description }}</div>
      </template>
    </div>

    <UTable v-if="flags" :data="flags" :columns="columns" class="flex-1" />

    <div>Place to review items.</div>
  </UContainer>
</template>

<script setup lang="ts">
import type { Flag, ReasonCodeType } from "~/types/won-types";

const flagSvc = useFlagService();

const flags = ref<Flag[]>();
const reasons = ref<ReasonCodeType[]>([]);

const columns = [
  { accessorKey: "id", header: "Flag ID" },
  { accessorKey: "reportedBy", header: "Reporter" },
  { accessorKey: "contentKey", header: "Flux ID" },
  { accessorKey: "reasons", header: "Reasons" },
  { accessorKey: "createdAt", header: "Reported At" },
];

onMounted(async () => {
  const result = await flagSvc.fetchFlags();
  flags.value = result.items;
  console.log("%o", flags.value);
  reasons.value = await flagSvc.fetchReasonCodes();
});
</script>

<style scoped></style>

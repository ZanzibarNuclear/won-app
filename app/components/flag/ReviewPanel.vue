<template>
  <UContainer>
    <h1>Violation Reports</h1>
    <div class="my-4">
      People have flagged issues that need attention. The resolution might be that there is no
      issue. And we might need to block content or suspend a member.
    </div>
    <div class="my-4">Shall we take a look?</div>

    <UModal title="Reason Codes">
      <UButton label="Reason Codes" class="mx-auto" />
      <template #content>
        <div class="grid grid-cols-[1fr_3fr] gap-2 my-4 w-3/4 mx-auto">
          <div class="font-bold">Code</div>
          <div class="font-bold">Description</div>
          <template v-for="reason in reasons">
            <div>{{ reason.code }}</div>
            <div>{{ reason.description }}</div>
          </template>
        </div>
      </template>
    </UModal>

    <UTable v-if="flags" :data="flags" :columns="columns" class="flex-1" />

    <div>Place to review items.</div>
  </UContainer>
</template>

<script setup lang="ts">
import type { ReasonCodeType } from '~/types/won-types'
import type { TableColumn } from '@nuxt/ui'

type FlagReport = {
  id: number
  reporter: {
    handle: string
  }
  contentKey: string
  reasons: string[]
  createdAt: string
}

const flagSvc = useFlagService()

const flags = ref<FlagReport[]>()
const reasons = ref<ReasonCodeType[]>([])

const activeFlag = ref<FlagReport | null>(null)

const UButton = resolveComponent('UButton')
const columns: TableColumn<FlagReport>[] = [
  {
    accessorKey: 'id',
    header: 'Flag ID',
    cell: ({ row }) => {
      return h(UButton, {
        label: String(row.getValue('id')),
        variant: 'subtle',
        color: 'primary',
        onClick: () => {
          openForReview(row.getValue('id'))
        },
      })
    },
  },
  { accessorKey: 'reporter.handle', header: 'Reporter' },
  { accessorKey: 'contentKey', header: 'Flux ID' },
  { accessorKey: 'reasons', header: 'Reasons' },
  {
    accessorKey: 'createdAt',
    header: 'Reported At',
    cell: ({ row }) => {
      return formatDateTime(new Date(row.getValue('createdAt')))
    },
  },
]

onMounted(async () => {
  const result = await flagSvc.fetchFlags()
  if (result && 'items' in result) {
    flags.value = result.items
    console.log('%o', flags.value)
  }
  reasons.value = await flagSvc.fetchReasonCodes()
})

const openForReview = (flagId: number) => {
  console.log('Opening flag for review:', flagId)
  activeFlag.value = flags.value?.find((f) => f.id === flagId) || null
  if (!activeFlag.value) {
    console.error('Flag not found:', flagId)
  }
}
</script>

<style scoped></style>

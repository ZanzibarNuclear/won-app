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

    <div v-if="activeFlag">
      <UCard class="p-6 w-3/4 mx-auto">
        <template #header>
          <div class="text-2xl font-bold">Flag Details</div>
        </template>
        <template #footer>
          <UButton label="Close" variant="subtle" color="secondary" @click="activeFlag = null" />
        </template>
        <div class="mb-4"><strong>Reporter:</strong> {{ activeFlag.reporter.handle }}</div>
        <div class="mb-4">
          <strong>Flux ID:</strong><UButton label="Show Flux" @click="viewFlux" />
        </div>
        <div class="mb-4">
          <strong>Reasons:</strong>
          <ul>
            <li v-for="reason in activeFlag.reasons" :key="reason">{{ reason }}</li>
          </ul>
        </div>
        <div class="mb-4">
          <strong>Reported At:</strong> {{ formatDateTime(new Date(activeFlag.createdAt)) }}
        </div>
        <div class="mb-4">
          <strong>Message:</strong> {{ activeFlag.message || 'No message provided.' }}
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { ReasonCodeType, Flag, Flux } from '~/types/won-types'
import type { TableColumn } from '@nuxt/ui'

const flagSvc = useFlagService()
const fluxSvc = useFluxService()

const flags = ref<Flag[]>()
const reasons = ref<ReasonCodeType[]>([])

const activeFlag = ref<Flag | null>(null)
const activeFlux = ref<Flux | null>(null)

const UButton = resolveComponent('UButton')
const columns: TableColumn<Flag>[] = [
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
  console.log('Opening flag %d for review', flagId)
  activeFlag.value = flags.value?.find((f) => f.id === flagId) || null
  if (!activeFlag.value) {
    console.error('Flag not found: %d', flagId)
  }
}

const viewFlux = async () => {
  if (!activeFlag.value) return
  const fluxId = activeFlag.value.contentKey
  const flux = await fluxSvc.getFlux(parseInt(fluxId))
  if (flux) {
    activeFlux.value = flux
    console.log('Flux details: %o', activeFlux.value)
  } else {
    console.error('Flux not found for ID: %d', fluxId)
  }
}
</script>

<style scoped></style>

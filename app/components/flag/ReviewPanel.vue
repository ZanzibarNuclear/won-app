<template>
  <UContainer>
    <h1 class="text-2xl font-bold">Flag Review</h1>
    <div class="flex justify-between align-top mb-6">
      <div class="space-y-2 text-sm flex-grow">
        <div>When people have issues, we need to into them.</div>
        <div>If the problem is real, let's resolve it. We always do our best.</div>
      </div>
      <FlagReasonCodesPanel />
    </div>

    <UTable v-if="flags" :data="flags" :columns="columns" class="flex-1" />

    <div v-if="activeFlag" class="w-3/4 mx-auto gap-y-6">
      <FluxFlagReport :active-flag="activeFlag" @view-flux="viewFlux" @close="handleClose" />

      <div v-if="activeFlux">
        <h2 class="text-cherenkov text-center">Subject of Review</h2>
        <FluxSimpleView :flux="activeFlux" />
        <div class="mt-4">
          <UButton
            label="Close Flux Details"
            variant="subtle"
            color="secondary"
            @click="activeFlux = null"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { ReasonCodeType, Flag, Flux } from '~/types/won-types'
import type { TableColumn } from '@nuxt/ui'

const flagSvc = useFlagService()
const fluxSvc = useFluxService()

const handleClose = () => {
  activeFlag.value = null
  activeFlux.value = null
}
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

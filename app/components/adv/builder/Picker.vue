<template>
  <div v-if="showLabel" class="flex items-center gap-2">
    <span v-if="label" class="font-bold">{{ label }}: </span>
    <USelect :items="options" v-model="selected" :size="size" :placeholder="placeholder" :class="selectClass"
      @update:model-value="onChoose" />
    <UButton v-if="showButton" @click="() => onChoose(selected)" :label="buttonLabel" />
  </div>
  <USelect v-else :items="options" v-model="selected" :size="size" :placeholder="placeholder" :class="selectClass"
    @update:model-value="onChoose" />
</template>

<script setup lang="ts">
interface PickerItem {
  _id: string
  title: string
}

interface PickerOption {
  value: string
  label: string
}

interface Props {
  items: PickerItem[]
  label?: string
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  selectClass?: string
  showButton?: boolean
  buttonLabel?: string
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an item',
  size: 'sm',
  selectClass: '',
  showButton: false,
  buttonLabel: 'Go',
  showLabel: false
})

const emit = defineEmits<{
  (e: 'chosen', id: string): void
}>()

const selected = ref('.')

const options = computed(() => {
  const itemOptions = props.items.map((item) => ({
    value: item._id,
    label: item.title,
  }))
  const defaultOption = { value: '.', label: `--${props.placeholder}--` }
  return [defaultOption, ...itemOptions]
})

function onChoose(val: string) {
  if (props.showButton && val === '.') {
    alert(`Please ${props.placeholder.toLowerCase()}.`)
    return
  }
  emit('chosen', val)
}
</script>

<style scoped></style>
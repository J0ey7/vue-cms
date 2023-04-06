<template>
  <div>
    <baseEchart :options="option"></baseEchart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from '@/shared/components/echart/base-echart.vue'
import { defineProps, computed } from 'vue'
const props = defineProps<{
  pipeData: Array<{
    name: string
    value: any
  }>
}>()

const option = computed(() => {
  return {
    series: [
      {
        type: 'pie',
        data: props.pipeData
      }
    ]
  }
})
</script>

<style scoped></style>

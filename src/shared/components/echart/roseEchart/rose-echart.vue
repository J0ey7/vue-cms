<template>
  <div>
    <baseEchart :options="option"></baseEchart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from '@/shared/components/echart/base-echart.vue'
import { computed, defineProps } from 'vue'
const props = defineProps<{
  roseData: Array<{
    name: string
    value: any
  }>
}>()

const option = computed(() => {
  return {
    series: [
      {
        type: 'pie',
        roseType: 'area',
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>

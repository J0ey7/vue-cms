<template>
  <div>
    <div ref="echartRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts" setup>
// withDefaults为ts类型声明设定默认值
import { defineProps, withDefaults, ref, onMounted, watchEffect } from 'vue'

import { EChartsOption } from 'echarts'
import initEchart from './hooks/init_echarts'

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: any
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)
const echartRef = ref<HTMLElement>()
onMounted(() => {
  const { echartInstance, setOptions } = initEchart(echartRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="less" scoped></style>

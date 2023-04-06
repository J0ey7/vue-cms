<template>
  <div><baseEchart :options="option"></baseEchart></div>
</template>

<script setup lang="ts">
import baseEchart from '../base-echart.vue'
import * as echarts from 'echarts'
import { defineProps } from 'vue'
import { computed } from '@vue/reactivity'

const props = defineProps<{
  dataAxis: string[]
  data: number[]
}>()

let yMax = 500
let dataShadow = []

// 渐变阴影效果
for (let i = 0; i < props.data.length; i++) {
  dataShadow.push(yMax)
}

const option = computed(() => {
  return {
    title: {
      text: '特性示例：渐变色 阴影 点击缩放',
      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    xAxis: {
      data: props.dataAxis,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.data
      }
    ]
  }
})
</script>

<style scoped></style>

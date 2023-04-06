<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <card title="分类1">
          <pipe-echarts :pipe-data="categoryGoodsCount"></pipe-echarts>
        </card>
      </el-col>
      <el-col :span="10">
        <card title="分类2">
          <map-echarts :map-data="addressGoodsSale"></map-echarts
        ></card>
      </el-col>
      <el-col :span="7">
        <card title="分类3">
          <roseEcharts :rose-data="categoryGoodsCount"></roseEcharts
        ></card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <card title="分类1">
          <lineEcharts v-bind="categoryGoodsSale"></lineEcharts>
        </card>
      </el-col>
      <el-col :span="12">
        <card title="分类1">
          <barEcharts v-bind="categoryGoodsFavor"></barEcharts>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import card from '@/shared/components/card/card.vue'
import pipeEcharts from '@/shared/components/echart/pipeEchart/pipe-echarts.vue'
import roseEcharts from '@/shared/components/echart/roseEchart/rose-echart.vue'
import lineEcharts from '@/shared/components/echart/lineEchart/line-echart.vue'
import barEcharts from '@/shared/components/echart/barEchart/bar-echart.vue'
import mapEcharts from '@/shared/components/echart/mapEchart/map-echart.vue'
export default defineComponent({
  name: 'dashboard',
  components: {
    card,
    pipeEcharts,
    roseEcharts,
    lineEcharts,
    barEcharts,
    mapEcharts
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    // echarts传入的对象
    // 1.饼图配置
    const categoryGoodsCount: any = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale: any = computed(() => {
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      const xLabels = []
      const values = []
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })

    const categoryGoodsFavor = computed(() => {
      const dataAxis: string[] = []
      const data: number[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (let item of categoryGoodsFavor) {
        dataAxis.push(item.name)
        data.push(item.goodsFavor)
      }

      return { dataAxis, data }
    })

    const addressGoodsSale: any = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped></style>

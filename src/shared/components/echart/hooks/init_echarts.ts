import * as echarts from 'echarts'
import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  // 获取地图数据

  const echartInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  // echarts重新渲染的方法
  const updateSize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    updateSize()
  })
  return {
    echartInstance,
    setOptions,
    updateSize
  }
}

<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'LineChart',
  mounted() {
    const myChart = echarts.init(this.$refs.charts)
    myChart.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      grid: {
        left: 0, top: 0, right: 0, bottom: 0
      },
      series: [
        {
          type: 'line',
          data: [5, 20, 5, 20, 5, 20, 5, 20, 5],
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 0
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'purple'
              },
              {
                offset: 1,
                color: 'white'
              }
            ])
          }
        }
      ]
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>

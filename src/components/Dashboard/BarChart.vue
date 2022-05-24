<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'BarChart',
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
        left: 0, top: 0, right: 0, bottom: 10
      },
      tooltip: {
        show: true
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70],
          type: 'bar'
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

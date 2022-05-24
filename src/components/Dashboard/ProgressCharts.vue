<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'ProgressCharts',
  mounted() {
    const myChart = echarts.init(this.$refs.charts)
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 50
      },
      xAxis: {
        type: 'value',
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        type: 'category',
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [59],
          barWidth: 10,
          color: 'yellowGreen',
          showBackground: true,
          label: {
            show: true,
            formatter: '|',
            position: 'right'
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

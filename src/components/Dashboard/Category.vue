<template>
  <div>

    <div class="header">
      <span>销售额类别占比</span>
      <el-radio-group v-model="tabPosition" size="small">
        <el-radio-button label="all">全部渠道</el-radio-button>
        <el-radio-button label="online">线上</el-radio-button>
        <el-radio-button label="store">门店</el-radio-button>
      </el-radio-group>
    </div>

    <div ref="chart1" class="chart" />

  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Category',
  data() {
    return {
      tabPosition: 'all'
    }
  },
  mounted() {
    const myChart1 = echarts.init(this.$refs.chart1)
    myChart1.setOption({
      title: {
        text: '视频',
        subText: '1048',
        left: 'center',
        top: 'center',
        show: true
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          labelLine: {
            show: true
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })

    myChart1.on('mouseover', params => {
      const { name, value } = params.data
      myChart1.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;
  margin-top: -5px;
}

.chart {
  border: 1px solid red;
  width: 100%;
  height: 295px;
  margin-top: 20px;
}
</style>

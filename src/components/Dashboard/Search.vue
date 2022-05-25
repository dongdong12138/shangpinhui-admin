<template>
  <div>

    <div class="header">
      <span>线上热门搜索</span>
      <el-dropdown placement="bottom-end">
        <i class="el-icon-more" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="main">
      <div class="chart-container">
        <div><span class="searchText">搜索用户数</span><i class="el-icon-info" /></div>
        <div><span class="searchNum">12321</span><span>17.1</span><i class="icon up arrow" style="top: -3px" /></div>
        <div ref="chart1" class="chart" />
      </div>
      <div class="chart-container">
        <div><span class="searchText">人均搜索次数</span><i class="el-icon-info" /></div>
        <div><span class="searchNum">12321</span><span>17.1</span><i class="icon down arrow" style="top: 3px" /></div>
        <div ref="chart2" class="chart" />
      </div>
    </div>

    <el-table border style="width: 100%; margin-top: 10px;">
      <el-table-column type="index" label="排名" width="80" />
      <el-table-column prop="name" label="搜索关键字" />
      <el-table-column prop="address" sortable label="用户数" />
      <el-table-column prop="address" sortable label="周涨幅" />
    </el-table>

    <el-pagination
      style="text-align: right; margin-top: 10px"
      layout="prev, pager, next"
      :total="1000"
    />

  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Search',
  mounted() {
    const myChart1 = echarts.init(this.$refs.chart1)
    myChart1.setOption({
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
                color: '#60b5d8'
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
    const myChart2 = echarts.init(this.$refs.chart2)
    myChart2.setOption({
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
                color: '#60b5d8'
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

<style scoped lang="scss">
i.arrow {
  display: inline-block;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  &.up { border-bottom-color: red; }
  &.down { border-top-color: green; }
}

.icon {
  margin-right: 8px;
  margin-left: 2px;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.main {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  color: #ccc;
  > .chart-container {
    width: 45%;
    > div {
      margin: 15px 0;
      &:first-child { margin-top: 0; }
      &:last-child { margin-bottom: 0; }
    }
    .searchText {
      margin-right: 10px;
    }
    .searchNum {
      font-size: 25px;
      margin-right: 25px;
      color: #000;
    }
  }
}

.chart {
  width: 100%;
  height: 50px;
}
</style>

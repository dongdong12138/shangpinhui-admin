<template>
  <el-card class="box-card">

    <div slot="header" class="header clearfix">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="saleCount" />
        <el-tab-pane label="访问量" name="visitCount" />
      </el-tabs>
      <div class="date-container">
        <span @click="setDay">今日</span><span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span><span @click="setYear">本年</span>
        <el-date-picker
          v-model="dateArr"
          style="width: 250px; margin-left: 20px"
          size="mini"
          type="daterange"
          range-separator="-"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>

      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div ref="charts" class="charts" />
          </el-col>
          <el-col :span="6">
            <h3 class="saleRank-title">门店{{ title }}排名</h3>
            <ol class="saleRank-list">
              <li v-for="item in 7" :key="item">
                <i :class="{ top3: item <= 3 }">{{ item }}</i><div>肯德基<span>124578</span></div>
              </li>
            </ol>
          </el-col>
        </el-row>
      </div>

    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'

export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'saleCount',
      dateArr: [],
      myChart: null,
      saleData: [10, 52, 200, 334, 450, 330, 220, 10, 52, 200, 334, 390],
      visitData: [34, 89, 108, 28, 10, 67, 59, 301, 62, 87, 31, 106]
    }
  },
  computed: {
    title() {
      return this.activeName === 'saleCount' ? '销售额' : '访问量'
    }
  },
  watch: {
    title(newValue) {
      this.myChart.setOption({
        title: {
          text: `${newValue}趋势`
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '40%',
            data: newValue === '访问量' ? this.visitData : this.saleData
          }
        ]
      })
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.charts)
    this.myChart.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '40%',
          data: this.saleData
        }
      ]
    })
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },

    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.dateArr = [day, day]
    },
    setWeek() {
      const monday = dayjs().day(1).format('YYYY-MM-DD')
      const sunday = dayjs().day(7).format('YYYY-MM-DD')
      this.dateArr = [monday, sunday]
    },
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.dateArr = [start, end]
    },
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.dateArr = [start, end]
    }
  }
}
</script>

<style scoped lang="scss">
ol, li { margin: 0; padding: 0; list-style: none; }
::v-deep .el-card__header {
  border-bottom: none;
}
::v-deep .el-card__body { display: none; }

.clearfix:before, .clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
  margin-top: 20px;
}

.header {
  position: relative;
}

.date-container {
  position: absolute;
  right: 0;
  top: -4px;
}

.date-container > span {
  margin: 0 10px;
}

.charts {
  width: 100%;
  height: 300px;
}

.saleRank-title {
  font-weight: normal;
  font-size: 16px;
  margin-top: -2px;
}
.saleRank-list {
  li {
    display: flex;
    align-items: center;
    height: 40px;
    i {
      display: block;
      font-style: normal;
      width: 20px;
      height: 20px;
      font-size: 15px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      color: #000;
      &.top3 {
        background: #000;
        color: #fff;
      }
    }
    div {
      flex: 1;
      margin-left: 30px;
      display: flex;
      justify-content: space-between;
      padding-right: 10px;
    }
  }
}
</style>

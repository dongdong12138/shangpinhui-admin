<template>
  <el-card class="box-card">

    <div slot="header" class="header clearfix">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="saleCount" />
        <el-tab-pane label="访问量" name="visitCount" />
      </el-tabs>
      <div class="date-container">
        <span>今日</span><span>本周</span><span>本月</span><span>本年</span>
        <el-date-picker
          v-model="value1"
          style="width: 250px; margin-left: 20px"
          size="mini"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>

      <div>
        <el-row :gutter="10">
          <el-col :span="16">111</el-col>
          <el-col :span="8">222</el-col>
        </el-row>
      </div>

    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'saleCount',
      value1: ''
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
>>> .el-card__header {
  border-bottom: none;
}
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
.date-container > span { margin: 0 10px; }
</style>

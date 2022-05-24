<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <Card title="总销售额" count="￥12345">
            <template slot="charts">
              <div style="font-size: 15px">
                <span>周同比 56.67%</span><i class="icon up arrow" style="top: -3px" />
                <span>日同比 16.67%</span><i class="icon down arrow" style="top: 3px" />
              </div>
            </template>
            <template slot="footer">
              <span>日销售额 ￥2367</span>
            </template>
          </Card>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Card title="访问量" count="5482">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer">
              <span>日访问量 1234</span>
            </template>
          </Card>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Card title="支付笔数" count="562">
            <template slot="charts">
              <BarChart />
            </template>
            <template slot="footer">
              <span>转化率 65%</span>
            </template>
          </Card>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Card title="运营活动效果" count="59%">
            <template slot="charts">
              <div>444</div>
            </template>
            <template slot="footer">
              <div style="font-size: 15px">
                <span>周同比 56.67%</span><i class="icon up arrow" style="top: -3px" />
                <span>日同比 16.67%</span><i class="icon down arrow" style="top: 3px" />
              </div>
            </template>
          </Card>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/Dashboard/Card'
import LineChart from '@/components/Dashboard/LineChart'
import BarChart from '@/components/Dashboard/BarChart'

export default {
  name: 'Dashboard',
  components: { BarChart, LineChart, Card },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
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
</style>

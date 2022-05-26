<template>
  <div>
    <el-card>

      <el-table :data="skuList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="skuName" label="名称" align="center" />
        <el-table-column prop="skuDesc" label="描述" align="center" />
        <el-table-column label="默认图片" width="110" align="center">
          <template v-slot="{ row }">
            <img :src="row.skuDefaultImg" alt="image" style="width: 80px; height: 80px">
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量(KG)" width="80" align="center" />
        <el-table-column prop="price" label="价格(元)" width="80" align="center" />
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <el-button v-if="row.isSale === 0" type="success" icon="el-icon-top" size="mini" @click="onSale(row)" />
            <el-button v-else type="info" icon="el-icon-bottom" size="mini" @click="cancelSale(row)" />
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="$message.info('正在开发中')" />
            <el-button type="info" icon="el-icon-info" size="mini" @click="lookSkuDetail(row)" />
            <el-button type="danger" icon="el-icon-delete" size="mini" />
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="margin-top: 10px; text-align: center"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <el-drawer title="我是标题" :visible.sync="drawer" direction="rtl" :show-close="false" size="50%" :with-header="false">
        <el-row>
          <el-col :span="5" class="col-left">名称</el-col>
          <el-col :span="16">{{ skuDetail.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="col-left">描述</el-col>
          <el-col :span="16">{{ skuDetail.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="col-left">价格</el-col>
          <el-col :span="16">{{ skuDetail.price }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="col-left">平台属性</el-col>
          <el-col :span="16">
            <el-tag v-for="attr in skuDetail.skuAttrValueList" :key="attr.id" type="success" style="margin-right: 10px">
              {{ attr.attrId }}-{{ attr.valueId }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="col-left">商品图片</el-col>
          <el-col :span="16">
            <el-carousel trigger="click" height="300px">
              <el-carousel-item v-for="item in skuDetail.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="image">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      skuList: [],
      skuDetail: {},
      drawer: false
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    getSkuList() {
      const { page, limit } = this
      this.$API.sku.reqSkuList(page, limit).then(result => {
        // console.log('reqSkuList:', result)
        const { records, total } = result.data
        this.skuList = records
        this.total = total
      })
    },

    onSale(row) {
      this.$API.sku.reqOnSale(row.id).then(result => {
        // console.log('reqOnSale:', result)
        row.isSale = 1
        this.$message.success('上架成功')
      })
    },

    cancelSale(row) {
      this.$API.sku.reqCancelSale(row.id).then(result => {
        // console.log('reqCancelSale:', result)
        row.isSale = 0
        this.$message.success('下架成功')
      })
    },

    lookSkuDetail(row) {
      this.drawer = true
      this.$API.sku.reqSkuDetail(row.id).then(result => {
        // console.log('reqSkuDetail:', result)
        this.skuDetail = result.data
      })
    },

    handleSizeChange(val) {
      this.limit = val
      this.getSkuList()
    },

    handleCurrentChange(val) {
      this.page = val
      this.getSkuList()
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.col-left {
  font-size: 25px;
  font-weight: bold;
  text-align: right;
  margin-right: 20px;
}

::v-deep .el-carousel__button {
  width: 10px;
  height: 10px;
  background: orange;
  border-radius: 50%;
}
</style>

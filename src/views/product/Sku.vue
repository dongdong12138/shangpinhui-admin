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
            <el-button type="info" icon="el-icon-info" size="mini" />
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
      skuList: []
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    getSkuList() {
      const { page, limit } = this
      this.$API.sku.reqSkuList(page, limit).then(result => {
        console.log('reqSkuList:', result)
        const { records, total } = result.data
        this.skuList = records
        this.total = total
      })
    },

    onSale(row) {
      this.$API.sku.reqOnSale(row.id).then(result => {
        console.log('reqOnSale:', result)
        row.isSale = 1
        this.$message.success('上架成功')
      })
    },

    cancelSale(row) {
      this.$API.sku.reqCancelSale(row.id).then(result => {
        console.log('reqCancelSale:', result)
        row.isSale = 0
        this.$message.success('下架成功')
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

<style scoped>

</style>

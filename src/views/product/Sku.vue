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
          <el-button type="success" icon="el-icon-top" size="mini" />
          <el-button type="info" icon="el-icon-bottom" size="mini" />
          <el-button type="primary" icon="el-icon-edit" size="mini" />
          <el-button type="info" icon="el-icon-info" size="mini" />
          <el-button type="danger" icon="el-icon-delete" size="mini" />
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

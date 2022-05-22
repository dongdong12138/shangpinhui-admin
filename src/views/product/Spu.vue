<template>
  <div class="container">

    <el-card class="card">
      <CategorySelect :disable="false" @getCategoryForm="getCategoryForm" />
    </el-card>

    <el-card>

      <!--spu 列表-->
      <div>
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="attrName" label="spu名称" />
          <el-table-column prop="attrName" label="spu描述" />
          <el-table-column label="操作">
            <template v-slot="{ row, $index }">
              <el-button type="success" icon="el-icon-plus" size="mini" />
              <el-button type="warning" icon="el-icon-edit" size="mini" />
              <el-button type="info" icon="el-icon-info" size="mini" />
              <el-button type="danger" icon="el-icon-delete" size="mini" />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="100"
          :current-page="1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="prev, pager, next, jumper, ->, sizes, total"
          style="text-align: center; margin-top: 10px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </el-card>

  </div>
</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
      categoryForm: { category1: '', category2: '', category3: '' }
    }
  },
  methods: {
    getCategoryForm(form) {
      this.categoryForm = form
      const { category1, category2, category3 } = form
      this.getAttrInfoList(category1, category2, category3)
    },
    getAttrInfoList(category1Id, category2Id, category3Id) {
      console.log(category1Id, category2Id, category3Id)
      // try {
      //   this.$API.attr.reqAttrInfoList(category1Id, category2Id, category3Id).then(result => {
      //     console.log('reqAttrInfoList:', result)
      //     if (result.code === 200) {
      //       this.attrInfoList = result.data
      //     }
      //   })
      // } catch (err) {
      //   console.log('reqAttrInfoList:', err)
      // }
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>

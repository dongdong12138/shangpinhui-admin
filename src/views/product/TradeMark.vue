<template>
  <div>

    <el-button type="primary" icon="el-icon-plus" class="btn-add">添加</el-button>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="no" label="序号" width="80" align="center" />
      <el-table-column prop="name" label="品牌名称" />
      <el-table-column label="品牌LOGO">
        <img src="" alt="logo">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      :current-page="5"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="10"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      tableData: [
        { no: '1', name: '小米', address: '上海市普陀区金沙江路 1518 弄' },
        { no: '2', name: '苹果', address: '上海市普陀区金沙江路 1517 弄' },
        { no: '3', name: '华为', address: '上海市普陀区金沙江路 1519 弄' },
        { no: '4', name: '三星', address: '上海市普陀区金沙江路 1516 弄' }
      ]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped lang="scss">
.btn-add { margin: 10px 0; }
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>

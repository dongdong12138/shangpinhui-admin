<template>
  <div>

    <el-button type="primary" icon="el-icon-plus" class="btn-add" @click="showDialog('添加品牌')">添加</el-button>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column label="品牌LOGO">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" alt="logo" style="height: 50px">
        </template>
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
      :current-page="page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" :label-width="formLabelWidth">
          <el-input v-model="brandName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div class="el-upload">
              <img v-if="logoUrl" :src="logoUrl" class="avatar" alt="logo">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      tableData: [],
      page: 1,
      limit: 5,
      total: 0,
      dialogFormVisible: false,
      dialogTitle: '',
      brandName: '',
      formLabelWidth: '100px',
      logoUrl: ''
    }
  },
  mounted() {
    this.getTradeMarkList()
  },
  methods: {
    showDialog(title = '修改品牌') {
      this.dialogTitle = title
      this.dialogFormVisible = true
    },

    handleEdit(index, row) {
      console.log(index, row)
      this.showDialog()
    },
    handleDelete(index, row) {
      console.log(index, row)
    },

    handleSizeChange(val) {
      this.limit = val
      this.getTradeMarkList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getTradeMarkList()
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    getTradeMarkList() {
      const { page, limit } = this
      try {
        this.$API.tradeMark.reqTradeMarkList(page, limit).then(res => {
          console.log('getTradeMarkList:', res)
          this.tableData = res.data.records
          this.total = res.data.total
        })
      } catch (err) {
        console.log('getTradeMarkList err:', err)
      }
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

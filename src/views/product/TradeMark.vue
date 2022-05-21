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
      <el-form ref="tradeMarkForm" :rules="rules" :model="tradeMarkForm" style="width: 80%">
        <el-form-item prop="tmName" label="品牌名称" :label-width="formLabelWidth">
          <el-input v-model="tradeMarkForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="logoUrl" label="品牌LOGO" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="/dev-api2/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div class="el-upload">
              <img v-if="tradeMarkForm.logoUrl" :src="tradeMarkForm.logoUrl" class="avatar" alt="logo">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
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
      formLabelWidth: '100px',
      tradeMarkForm: { id: '', tmName: '', logoUrl: '' },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌LOGO' }
        ]
      }
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
    closeDialog() {
      this.dialogFormVisible = false
      Object.assign(this.tradeMarkForm, { id: '', tmName: '', logoUrl: '' })
    },
    confirmDialog() {
      this.$refs.tradeMarkForm.validate((valid) => {
        if (!valid) return
        try {
          this.$API.tradeMark.reqAddorUpdateTradeMark(this.tradeMarkForm).then(res => {
            console.log('reqAddorUpdateTradeMark:', res)
            if (res.code === 200) {
              this.getTradeMarkList()
              const message = this.tradeMarkForm.id ? '修改品牌成功' : '添加品牌成功'
              this.$message.success(message)
              this.closeDialog()
            }
          })
        } catch (err) {
          console.log('reqAddorUpdateTradeMark err:', err)
        }
      })
    },

    handleEdit(index, row) {
      Object.assign(this.tradeMarkForm, row)
      this.showDialog()
    },
    handleDelete(index, row) {
      this.$confirm(`是否删除${row.tmName}品牌?`, '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        try {
          this.$API.tradeMark.reqDeleteTradeMark(row.id).then(result => {
            // console.log('reqDeleteTradeMark:', result)
            if (result.code === 200) {
              this.getTradeMarkList()
              this.$message.success('删除成功')
            }
          })
        } catch (err) {
          console.log('reqDeleteTradeMark err:', err)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    handleSizeChange(val) {
      this.limit = val
      this.getTradeMarkList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getTradeMarkList()
    },

    handleAvatarSuccess(res) {
      this.tradeMarkForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPGorPNG) {
        this.$message.error('上传 LOGO 图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传 LOGO 图片大小不能超过 2MB!')
      }
      return isJPGorPNG && isLt2M
    },

    getTradeMarkList() {
      const { page, limit } = this
      try {
        this.$API.tradeMark.reqTradeMarkList(page, limit).then(res => {
          // console.log('getTradeMarkList:', res)
          this.tableData = res.data.records
          this.total = res.data.total
          if (!this.tableData.length) {
            this.page -= 1
            this.getTradeMarkList()
          }
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

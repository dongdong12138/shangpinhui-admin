<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">

      <!--SPU名称-->
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" />
      </el-form-item>

      <!--品牌-->
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>

      <!--SPU描述-->
      <el-form-item label="SPU描述">
        <el-input type="textarea" :rows="4" placeholder="SPU描述" />
      </el-form-item>

      <!--SPU图片-->
      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <!--销售属性-->
      <el-form-item label="销售属性">
        <el-select placeholder="还有3未选择">
          <el-option />
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <el-table border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="name" label="属性名" />
          <el-table-column prop="address" label="属性值名称列表" />
          <el-table-column prop="address" label="操作" />
        </el-table>
      </el-form-item>

      <!--保存 / 取消-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>

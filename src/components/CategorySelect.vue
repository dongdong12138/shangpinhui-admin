<template>
  <div>

    <el-card class="card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="一级分类">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.card {
  margin: 20px 0;
}
</style>

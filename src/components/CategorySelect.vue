<template>
  <div>
    <el-form :inline="true" :model="categoryForm" :disabled="disable" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="categoryForm.category1" placeholder="请选择">
          <el-option v-for="category1 in category1List" :key="category1.id" :label="category1.name" :value="category1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryForm.category2" placeholder="请选择">
          <el-option v-for="category2 in category2List" :key="category2.id" :label="category2.name" :value="category2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryForm.category3" placeholder="请选择">
          <el-option v-for="category3 in category3List" :key="category3.id" :label="category3.name" :value="category3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  // eslint-disable-next-line vue/require-prop-types
  props: ['disable'],
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      categoryForm: { category1: '', category2: '', category3: '' }
    }
  },
  watch: {
    'categoryForm.category1'(newValue) {
      this.categoryForm.category2 = ''
      this.category2List = []
      this.category3List = []
      newValue && this.getCategory2(newValue)
    },
    'categoryForm.category2'(newValue) {
      this.categoryForm.category3 = ''
      this.category3List = []
      newValue && this.getCategory3(newValue)
    },
    'categoryForm.category3'(newValue) {
      newValue && this.$emit('getCategoryForm', this.categoryForm)
    }
  },
  mounted() {
    this.getCategory1()
  },
  methods: {
    getCategory1() {
      try {
        this.$API.attr.reqCategory1().then(result => {
          // console.log('reqCategory1:', result)
          if (result.code === 200) {
            this.category1List = result.data
          }
        })
      } catch (err) {
        console.log('reqCategory1:', err)
      }
    },
    getCategory2(category1Id) {
      try {
        this.$API.attr.reqCategory2(category1Id).then(result => {
          // console.log('reqCategory2:', result)
          if (result.code === 200) {
            this.category2List = result.data
          }
        })
      } catch (err) {
        console.log('reqCategory2:', err)
      }
    },
    getCategory3(category2Id) {
      try {
        this.$API.attr.reqCategory3(category2Id).then(result => {
          // console.log('reqCategory3:', result)
          if (result.code === 200) {
            this.category3List = result.data
          }
        })
      } catch (err) {
        console.log('reqCategory3:', err)
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>

    <el-card class="card">
      <el-form :inline="true" :model="categoryForm" class="demo-form-inline">
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
    </el-card>

    <el-card>
      <el-button type="primary" icon="el-icon-plus" class="btn-add">添加属性</el-button>
      <el-table :data="attrInfoList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="attrName" label="属性名称" width="150" />
        <el-table-column label="属性值列表">
          <template slot-scope="{ row }">
            <el-tag v-for="attrValue in row.attrValueList" :key="attrValue.id" type="success" style="margin: 0 10px">{{ attrValue.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <el-button size="mini" type="warning" icon="el-icon-edit" />
          <el-button size="mini" type="danger" icon="el-icon-delete" />
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['attrInfoList'],
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      categoryForm: {
        category1: '',
        category2: '',
        category3: ''
      }
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
      newValue && this.$emit('getCategoryId', this.categoryForm)
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
.card {
  margin: 20px 0;
}
</style>

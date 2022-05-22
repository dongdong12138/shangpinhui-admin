<template>
  <div>

    <el-card class="card">
      <CategorySelect @getCategoryForm="getCategoryForm" />
    </el-card>

    <el-card>

      <!--属性表格-->
      <div v-show="isTable">
        <el-button :disabled="!categoryForm.category3" type="primary" icon="el-icon-plus" @click="isTable = false">添加属性</el-button>
        <el-table :data="attrInfoList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="attrName" label="属性名称" width="150" />
          <el-table-column label="属性值列表">
            <template v-slot="{ row }">
              <el-tag v-for="attrValue in row.attrValueList" :key="attrValue.id" type="success" style="margin: 0 10px">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template v-slot="{ row, $index }">
              <el-button size="mini" type="warning" icon="el-icon-edit" style="margin-right: 10px" @click="editAttr(row)" />
              <el-popconfirm :key="$index" :title="`确定删除${row.attrName}吗？`" @onConfirm="deleteAttr(row)">
                <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--属性操作-->
      <div v-show="!isTable">
        <el-form :model="attrInfo" :inline="true" class="demo-form-inline">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-row>
          <el-button :disabled="!attrInfo.attrName" type="primary" icon="el-icon-plus" @click="addAttrValue">添加属性值</el-button>
          <el-button @click="cancelAddAttr">取消</el-button>
        </el-row>
        <el-table :data="attrInfo.attrValueList" border style="width: 100%; margin: 20px 0">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="attrName" label="属性值名称">
            <template v-slot="{ row, $index }">
              <el-input v-show="row.flag" :ref="$index" v-model="row.valueName" size="mini" placeholder="请输入属性值名称" @blur="toggleLookAdnEdit(row)" @keyup.native.enter="toggleLookAdnEdit(row)" />
              <span v-show="!row.flag" style="display: block" @click="tapSpan(row, $index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <el-button v-show="isTable" size="mini" type="warning" icon="el-icon-edit" @click="isTable = false" />
            <template v-slot="{ row, $index }">
              <el-popconfirm :key="$index" :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-button type="primary" @click="saveAddAttr">保存</el-button>
          <el-button @click="cancelAddAttr">取消</el-button>
        </el-row>
      </div>

    </el-card>

  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'Attr',
  data() {
    return {
      categoryForm: { category1: '', category2: '', category3: '' },
      isTable: true,
      attrInfoList: [],
      attrInfo: {
        'attrName': '',
        'attrValueList': [
          // { 'attrId': 0, 'valueName': '' }
        ],
        'categoryId': 0,
        'categoryLevel': 3,
        'flag': true
      }
    }
  },
  methods: {
    getCategoryForm(form) {
      this.categoryForm = form
      const { category1, category2, category3 } = form
      this.getAttrInfoList(category1, category2, category3)
    },
    getAttrInfoList(category1Id, category2Id, category3Id) {
      try {
        this.$API.attr.reqAttrInfoList(category1Id, category2Id, category3Id).then(result => {
          // console.log('reqAttrInfoList:', result)
          if (result.code === 200) {
            this.attrInfoList = result.data
          }
        })
      } catch (err) {
        console.log('reqAttrInfoList:', err)
      }
    },

    /**
     * 编辑属性
     * @param row 属性信息
     */
    editAttr(row) {
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
      this.isTable = false
    },

    /**
     * 删除属性
     * @param row 属性信息
     */
    deleteAttr(row) {
      try {
        this.$API.attr.reqDeleteAttrInfo(row.id).then(result => {
          // console.log('reqDeleteAttrInfo:', result)
          if (result.code === 200) this.getCategoryForm(this.categoryForm)
        })
      } catch (err) {
        console.log('reqDeleteAttrInfo:', err)
      }
    },

    /**
     * 添加属性值
     */
    addAttrValue() {
      this.attrInfo.attrValueList.push({ 'attrId': this.attrInfo.id, 'valueName': '', 'flag': true })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },

    /**
     * 取消
     */
    cancelAddAttr() {
      this.isTable = true
      const originAttrInfo = { 'attrName': '', 'attrValueList': [], 'categoryId': 0 }
      Object.assign(this.attrInfo, originAttrInfo)
    },

    /**
     * 切换属性值名称输入框的查看与编辑
     * @param row 属性信息
     */
    toggleLookAdnEdit(row) {
      if (!row.valueName.trim()) {
        this.$message.warning('属性值不可以为空')
        return
      }
      const isRepeat = this.attrInfo.attrValueList.some(item => {
        if (row !== item) return item.valueName === row.valueName
      })
      if (isRepeat) {
        row.valueName = ''
        this.$message.warning('该属性值已存在')
        return
      }
      row.flag = false
    },

    /**
     * 点击属性值进入编辑状态
     * @param row 属性信息
     * @param index
     */
    tapSpan(row, index) {
      row.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },

    /**
     * 删除属性值
     * @param index
     */
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },

    /**
     * 保存属性及属性值
     */
    saveAddAttr() {
      // 整理参数对象
      this.attrInfo.categoryId = this.categoryForm.category3
      this.attrInfo.id = this.attrInfo.id ? this.attrInfo.id : 123
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName) {
          delete item.flag
          return true
        }
      })
      // 发请求
      try {
        this.$API.attr.reqSaveAttrInfo(this.attrInfo).then(result => {
          // console.log('reqSaveAttrInfo:', result)
          if (result.code === 200) {
            this.$message.success('保存成功')
            // this.$emit('getCategoryId', this.categoryForm)
            this.getCategoryForm(this.categoryForm)
            this.cancelAddAttr()
          }
        })
      } catch (err) {
        console.log('reqSaveAttrInfo err:', err)
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

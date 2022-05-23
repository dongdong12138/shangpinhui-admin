<template>
  <div class="container">

    <el-card class="card">
      <CategorySelect :disable="scene !== 0" @getCategoryForm="getCategoryForm" />
    </el-card>

    <el-card>

      <!-- spu列表 -->
      <div v-show="scene === 0">
        <el-button :disabled="!categoryForm.category3" type="primary" icon="el-icon-plus" @click="addSpu">添加SPU</el-button>
        <el-table :data="spuList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="spuName" label="spu名称" />
          <el-table-column prop="description" label="spu描述" />
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <HintButton title="添加sku" type="success" icon="el-icon-plus" size="mini" @click="addSpu" />
              <HintButton title="修改spu" type="warning" icon="el-icon-edit" size="mini" @click="updateSpu(row)" />
              <HintButton title="查看当前spu全部sku列表" type="info" icon="el-icon-info" size="mini" />
              <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon="el-icon-info" icon-color="red" :title="`确定删除${row.spuName}吗？`" @onConfirm="deleteSpu(row)">
                <HintButton slot="reference" title="删除spu" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          :current-page="page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
          style="text-align: center; margin-top: 10px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- 添加spu | 修改spu -->
      <SpuForm v-show="scene === 1" ref="spuForm" :category3-id="categoryForm.category3" @changeScene="changeScene" />

      <!-- 添加sku -->
      <SkuForm v-show="scene === 2" />

    </el-card>

  </div>
</template>

<script>
import SpuForm from '@/components/Spu/SpuForm'
import SkuForm from '@/components/Spu/SkuForm'

export default {
  name: 'Spu',
  components: { SkuForm, SpuForm },
  data() {
    return {
      categoryForm: { category1: '', category2: '', category3: '' },
      scene: 0, // 0:spu列表, 1:添加spu|修改spu, 2:添加sku
      page: 1,
      limit: 5,
      total: 0,
      spuList: []
    }
  },
  methods: {
    getCategoryForm(form) {
      this.categoryForm = form
      this.getSpuList()
    },
    changeScene(value) {
      this.scene = value
      if (value === 0) {
        this.getSpuList()
      }
    },

    /**
     * 添加 spu
     */
    addSpu() {
      this.scene = 1
      this.$refs.spuForm.initSpuForm()
    },

    /**
     * 修改 spu
     * @param row spu 信息
     */
    updateSpu(row) {
      this.scene = 1
      this.$refs.spuForm.initSpuForm(row)
    },

    /**
     * 删除 spu
     * @param row spu 信息
     */
    deleteSpu(row) {
      try {
        this.$API.spu.reqDeleteSpu(row.id).then(result => {
          console.log('reqDeleteSpu:', result)
          this.getSpuList()
          this.$message.success('删除成功')
        })
      } catch (err) {
        console.log('reqDeleteSpu err:', err)
      }
    },

    /**
     * 每页显示条数变化
     * @param val 显示条数
     */
    handleSizeChange(val) {
      console.log('每页显示条数变化:', val)
      this.limit = val
      this.page = 1
      this.getSpuList()
    },

    /**
     * 当前页码变化
     * @param val 当前页码
     */
    handleCurrentChange(val) {
      console.log('当前页码变化:', val)
      this.page = val
      this.getSpuList()
    },

    /**
     * 查询 spu 数据列表
     */
    getSpuList() {
      const { page, limit } = this
      const { category3: category3Id } = this.categoryForm
      try {
        this.$API.spu.reqSpuList(page, limit, category3Id).then(result => {
          console.log('reqSpuList:', result)
          const { records, total } = result.data
          if (!records.length && page > 1) {
            this.page -= 1
            this.getSpuList()
          }
          this.spuList = records
          this.total = total
        })
      } catch (err) {
        console.log('reqSpuList err:', err)
      }
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>

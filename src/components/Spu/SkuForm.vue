<template>
  <div>
    <el-form ref="form" label-width="80px">

      <!--SPU名称-->
      <el-form-item label="SPU名称">
        <span>海绵宝宝</span>
      </el-form-item>

      <!--SKU名称-->
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" />
      </el-form-item>

      <!--价格-->
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" />
      </el-form-item>

      <!--重量-->
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" />
      </el-form-item>

      <!--规格描述-->
      <el-form-item label="规格描述">
        <el-input type="textarea" :rows="4" placeholder="规格描述" />
      </el-form-item>

      <!--平台属性-->
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" value="">
              <el-option value="" />
            </el-select>
          </el-form-item>
          <el-form-item label="无线通信">
            <el-select placeholder="请选择" value="">
              <el-option value="" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <!--销售属性-->
      <el-form-item label="销售属性">
        <el-form label-width="80px">
          <el-form-item label="颜色">
            <el-select placeholder="请选择" value="">
              <el-option value="" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <!--图片列表-->
      <el-form-item label="图片列表">
        <el-table border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="80" align="center" />
          <el-table-column label="图片" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="address" label="操作" show-overflow-tooltip />
        </el-table>
      </el-form-item>

      <!--按钮-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      imageList: [],
      saleAttrList: [],
      attrInfoList: []
    }
  },
  methods: {
    initSkuForm(row, categoryForm) {
      const { id } = row
      const { category1, category2, category3 } = categoryForm
      this.getImageList(id)
      this.getSaleAttrList(id)
      this.getAttrInfoList(category1, category2, category3)
    },
    getImageList(spuId) {
      try {
        this.$API.sku.reqImageList(spuId).then(result => {
          console.log('reqImageList:', result)
          this.imageList = result.data
        })
      } catch (err) {
        console.log('reqImageList err:', err)
      }
    },
    getSaleAttrList(spuId) {
      try {
        this.$API.sku.reqSaleAttrList(spuId).then(result => {
          console.log('reqSaleAttrList:', result)
          this.saleAttrList = result.data
        })
      } catch (err) {
        console.log('reqSaleAttrList err:', err)
      }
    },
    getAttrInfoList(category1Id, category2Id, category3Id) {
      try {
        this.$API.sku.reqAttrInfoList(category1Id, category2Id, category3Id).then(result => {
          console.log('reqAttrInfoList:', result)
          this.attrInfoList = result.data
        })
      } catch (err) {
        console.log('reqAttrInfoList err:', err)
      }
    }
  }
}
</script>

<style scoped>

</style>

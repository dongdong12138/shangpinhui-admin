<template>
  <div>
    <el-form ref="form" label-width="80px">

      <!--SPU名称-->
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>

      <!--SKU名称-->
      <el-form-item label="SKU名称">
        <el-input v-model="skuForm.skuName" placeholder="SKU名称" />
      </el-form-item>

      <!--价格-->
      <el-form-item label="价格(元)">
        <el-input v-model="skuForm.price" type="number" placeholder="价格(元)" />
      </el-form-item>

      <!--重量-->
      <el-form-item label="重量(千克)">
        <el-input v-model="skuForm.weight" placeholder="重量(千克)" />
      </el-form-item>

      <!--规格描述-->
      <el-form-item label="规格描述">
        <el-input v-model="skuForm.skuDesc" type="textarea" :rows="4" placeholder="规格描述" />
      </el-form-item>

      <!--平台属性-->
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item v-for="attr in attrInfoList" :key="attr.id" :label="attr.attrName" style="margin-bottom: 5px">
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option v-for="value in attr.attrValueList" :key="value.id" :label="value.valueName" :value="`${attr.id}:${value.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <!--销售属性-->
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item v-for="saleAttr in saleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
            <el-select v-model="saleAttr.attrIdAndValueId" placeholder="请选择">
              <el-option v-for="value in saleAttr.spuSaleAttrValueList" :key="value.id" :label="value.saleAttrValueName" :value="`${saleAttr.id}:${value.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <!--图片列表-->
      <el-form-item label="图片列表">
        <el-table :data="imageList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="80" align="center" />
          <el-table-column label="图片">
            <template v-slot="{ row }">
              <img :src="row.imgUrl" alt="image" style="width: 100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" />
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template v-slot="{ row }">
              <el-tag v-if="row.isDefault" type="success">默认</el-tag>
              <el-button v-else type="primary" size="mini" @click="setDefault(row)">设为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <!--按钮-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
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
      multipleSelection: [],
      saleAttrList: [],
      attrInfoList: [],
      category3Id: '',
      skuDefaultImg: '',
      spu: {},
      skuForm: {
        skuName: '',
        price: '',
        weight: '',
        skuDesc: ''
      }
    }
  },
  methods: {
    initSkuForm(row, categoryForm) {
      console.log(row)
      const { id } = row
      const { category1, category2, category3 } = categoryForm
      this.category3Id = category3
      this.spu = row
      this.getImageList(id)
      this.getSaleAttrList(id)
      this.getAttrInfoList(category1, category2, category3)
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    setDefault(row) {
      this.imageList.forEach(item => { item.isDefault = 0 })
      row.isDefault = 1
      this.skuDefaultImg = row.imgUrl
    },

    onCancel() {
      this.$emit('changeScene', 0)
      Object.assign(this._data, this.$options.data())
    },
    onSubmit() {
      const { category3Id, skuDefaultImg, attrInfoList, saleAttrList, multipleSelection } = this
      const { spuId, tmId } = this.spu
      const { weight, skuDesc, price, skuName } = this.skuForm
      const skuAttrValueList = attrInfoList.filter(item => !!item.attrIdAndValueId)
      skuAttrValueList.forEach(item => {
        const arr = item.attrIdAndValueId.split(':')
        item.attrId = arr[0]
        item.valueId = arr[1]
      })
      const skuSaleAttrValueList = saleAttrList.filter(item => !!item.attrIdAndValueId)
      skuSaleAttrValueList.forEach(item => {
        const arr = item.attrIdAndValueId.split(':')
        item.saleAttrId = arr[0]
        item.saleAttrValueId = arr[1]
      })
      multipleSelection.forEach(item => { item.spuImgId = item.id })
      const skuInfo = {
        category3Id, spuId, tmId, skuDefaultImg, weight, skuDesc, price, skuName, skuAttrValueList, skuSaleAttrValueList, skuImageList: multipleSelection
      }
      try {
        this.$API.spu.reqSaveSkuInfo(skuInfo).then(result => {
          console.log('reqSaveSkuInfo:', result)
          this.onCancel()
          this.$message.success('保存成功')
        })
      } catch (err) {
        console.log('reqSaveSkuInfo:', err)
      }
    },

    getImageList(spuId) {
      try {
        this.$API.spu.reqSpuImageList(spuId).then(result => {
          console.log('reqImageList:', result)
          result.data.forEach(item => {
            item.isDefault = 0
          })
          this.imageList = result.data
        })
      } catch (err) {
        console.log('reqImageList err:', err)
      }
    },
    getSaleAttrList(spuId) {
      try {
        this.$API.spu.reqSaleAttrList(spuId).then(result => {
          console.log('reqSaleAttrList:', result)
          this.saleAttrList = result.data
        })
      } catch (err) {
        console.log('reqSaleAttrList err:', err)
      }
    },
    getAttrInfoList(category1Id, category2Id, category3Id) {
      try {
        this.$API.spu.reqAttrInfoList(category1Id, category2Id, category3Id).then(result => {
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

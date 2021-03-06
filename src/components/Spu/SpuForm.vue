<template>
  <div>
    <el-form ref="form" :model="spuForm" label-width="80px">

      <!--SPU名称-->
      <el-form-item label="SPU名称">
        <el-input v-model="spuForm.spuName" placeholder="SPU名称" />
      </el-form-item>

      <!--品牌-->
      <el-form-item label="品牌">
        <el-select v-model="spuForm.trademarkId" placeholder="请选择品牌">
          <el-option v-for="trademark in trademarkList" :key="trademark.id" :label="trademark.tmName" :value="trademark.id" />
        </el-select>
      </el-form-item>

      <!--SPU描述-->
      <el-form-item label="SPU描述">
        <el-input v-model="spuForm.description" type="textarea" :rows="4" placeholder="SPU描述" />
      </el-form-item>

      <!--SPU图片-->
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api2/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuForm.imageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="image">
        </el-dialog>
      </el-form-item>

      <!--销售属性-->
      <el-form-item label="销售属性">
        <el-select v-model="spuForm.attrId" :placeholder="`还有${unSelectSaleAttr.length}未选择`">
          <el-option v-for="attr in unSelectSaleAttr" :key="attr.id" :label="attr.name" :value="`${attr.id}:${attr.name}`" />
        </el-select>
        <el-button :disabled="!spuForm.attrId" type="primary" icon="el-icon-plus" @click="addSaleAttr">添加销售属性</el-button>
        <el-table :data="spuForm.spuSaleAttrList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="saleAttrName" label="属性名" />
          <el-table-column label="属性值名称列表">
            <template v-slot="{ row, $index }">
              <el-tag v-for="(tag, index) in row.spuSaleAttrValueList" :key="tag.id" closable :disable-transitions="false" @close="handleClose(row, index)">{{ tag.saleAttrValueName }}</el-tag>
              <el-input v-if="row.inputVisible" :ref="$index" v-model="row.inputValue" class="input-new-tag" size="small" @keyup.enter.native="handleInputConfirm(row)" @blur="handleInputConfirm(row)" />
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row, $index)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template v-slot="{ row, $index }">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spuForm.spuSaleAttrList.splice($index, 1)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <!--保存 / 取消-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  // eslint-disable-next-line vue/require-prop-types
  props: ['category3Id'],
  data() {
    return {
      rowId: '',
      dialogVisible: false,
      dialogImageUrl: '',
      // inputVisible: false,
      trademarkList: [],
      attrList: [],
      spuForm: {
        spuName: '',
        description: '',
        spuSaleAttrList: [],
        trademarkId: '',
        imageList: [],
        attrId: ''
      }
    }
  },
  computed: {
    unSelectSaleAttr() {
      return this.attrList.filter(item => {
        return this.spuForm.spuSaleAttrList.every(value => item.name !== value.saleAttrName)
      })
    }
  },
  methods: {
    initSpuForm(spu) {
      if (spu) {
        const { id } = spu
        this.rowId = id
        this.getSpu(id)
        this.getTrademarkList()
        this.getImageList(id)
        this.getAttrList()
      } else {
        this.getTrademarkList()
        this.getAttrList()
      }
    },

    handleSuccess(response, file, fileList) {
      fileList.forEach(item => {
        item.url = item.response.data
      })
      this.spuForm.imageList = fileList
    },
    handleRemove(file, fileList) {
      this.spuForm.imageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.spuForm.attrId.split(':')
      this.spuForm.spuSaleAttrList.push({ baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] })
      this.spuForm.attrId = ''
    },

    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1)
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row
      if (!inputValue.trim()) {
        this.$message.warning('属性值不能为空')
        return
      }
      if (row.spuSaleAttrValueList.length) {
        const isRepeat = row.spuSaleAttrValueList.some(item => item.saleAttrValueName === inputValue)
        if (isRepeat) {
          this.$message.warning('属性值不能重复')
          return
        }
      }
      row.spuSaleAttrValueList.push({ baseSaleAttrId, saleAttrValueName: inputValue })
      row.inputVisible = false
    },
    addSaleAttrValue(row, index) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },

    onCancel() {
      this.$emit('changeScene', 0)
      Object.assign(this._data, this.$options.data())
    },
    onSubmit() {
      const { category3Id, rowId } = this
      const { description, imageList, spuName, spuSaleAttrList, trademarkId } = this.spuForm
      const id = rowId || undefined
      const spuInfo = { id, category3Id, description, spuImageList: imageList, spuName, spuSaleAttrList, tmId: trademarkId }
      imageList.forEach(item => {
        item.imgName = item.name
        item.imgUrl = item.url
      })
      try {
        this.$API.spu.reqSaveOrUpdateSpu(spuInfo).then(result => {
          // console.log('reqSaveOrUpdateSpu:', result)
          this.onCancel()
        })
      } catch (err) {
        console.log('reqSaveOrUpdateSpu err:', err)
      }
    },

    /**
     * 查询 spu 信息
     * @param spuId
     */
    getSpu(spuId) {
      try {
        this.$API.spu.reqSpu(spuId).then(result => {
          // console.log('reqSpu:', result)
          const { spuName, description, spuSaleAttrList, tmId } = result.data
          Object.assign(this.spuForm, { spuName, description, spuSaleAttrList, trademarkId: tmId })
        })
      } catch (err) {
        console.log('reqSpu err:', err)
      }
    },
    /**
     * 查询品牌列表
     */
    getTrademarkList() {
      try {
        this.$API.spu.reqTrademarkList().then(result => {
          // console.log('reqTrademarkList:', result)
          this.trademarkList = result.data
        })
      } catch (err) {
        console.log('reqTrademarkList err:', err)
      }
    },
    /**
     * 查询 spu 图片列表
     * @param spuId
     */
    getImageList(spuId) {
      try {
        this.$API.spu.reqImageList(spuId).then(result => {
          // console.log('reqImageList:', result)
          result.data.forEach(item => {
            item.name = item.imgName
            item.url = item.imgUrl
          })
          this.spuForm.imageList = result.data
        })
      } catch (err) {
        console.log('reqImageList err:', err)
      }
    },

    /**
     * 查询属性列表
     */
    getAttrList() {
      try {
        this.$API.spu.reqAttrList().then(result => {
          // console.log('reqAttrList:', result)
          this.attrList = result.data
        })
      } catch (err) {
        console.log('reqAttrList err:', err)
      }
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

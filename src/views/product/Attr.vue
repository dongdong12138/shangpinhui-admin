<template>
  <div>
    <CategorySelect :attr-info-list="attrInfoList" @getCategoryId="getCategoryId" />
  </div>
</template>

<script>
export default {
  name: 'Attr',
  data() {
    return {
      attrInfoList: []
    }
  },
  methods: {
    getCategoryId(ids) {
      const { category1, category2, category3 } = ids
      this.getAttrInfoList(category1, category2, category3)
    },
    getAttrInfoList(category1Id, category2Id, category3Id) {
      try {
        this.$API.attr.reqAttrInfoList(category1Id, category2Id, category3Id).then(result => {
          console.log('reqAttrInfoList:', result)
          if (result.code === 200) {
            this.attrInfoList = result.data
          }
        })
      } catch (err) {
        console.log('reqAttrInfoList:', err)
      }
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <div>
    <CategorySelect @getCategoryId="getCategoryId" />
  </div>
</template>

<script>
export default {
  name: 'Attr',
  methods: {
    getCategoryId(ids) {
      console.log('ids:', ids)
    }
  }
}
</script>

<style scoped>
</style>

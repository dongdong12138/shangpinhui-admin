<template>
  <section>
    <header>
      <span>{{ title }}</span>
      <i class="el-icon-info" />
    </header>
    <section class="price">{{ count }}</section>
    <section class="charts">
      <slot name="charts" />
    </section>
    <footer>
      <slot name="footer" />
    </footer>
  </section>
</template>

<script>
export default {
  name: 'Card',
  // eslint-disable-next-line vue/require-prop-types
  props: ['title', 'count']
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
}
.price {
  font-size: 30px;
  padding: 10px 0;
}
.charts {
  height: 40px;
  line-height: 40px;
}
footer {
  border-top: 1px solid #eee;
  padding-top: 10px;
}
</style>

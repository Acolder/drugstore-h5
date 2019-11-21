<template>
  <div class="has-header">
    <mt-header fixed title="使用帮助"></mt-header>
    <ul class="useHelps">
      <li><img src="./img/01.png" /></li>
      <li><img src="./img/02.png" /></li>
      <li><img src="./img/03.png" /></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'useHelps'
};
</script>

<style lang="less" scoped>
  .useHelps {
    li {
      width: 100%;
      img {
        width: 100%;
        display: block;
      }
    }
  }
</style>

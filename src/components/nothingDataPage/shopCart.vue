<template>
  <div class="nothing-data-page">
    <img src="./img/shop-cart.png" />
    <label class="txt">{{txt}}</label>
  </div>
</template>
<style lang="less" scoped>
 @import './nothing.less';
</style>
<script>
export default {
  props: {
    txt: {
      type: String,
      default: ''
    }
  }
};
</script>


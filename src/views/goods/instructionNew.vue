<template>
  <div class="goods-detailins" :class="{'from':from==2}">
    <mt-header fixed title="说明书"  v-show="from == 1"  class="ins-header">
      <a slot="left" @click="$router.go(-1);">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="goods-detailsIn" v-html="goodsDetail.instructions">
    </div>
  </div>
</template>
<script>
export default {
  props: ['goodsDetail', 'productId', 'getByself', 'getFast', 'getCommon', 'from'],
  data() {
    return {
      classIndex: 2
    };
  },
  components: {
  },
  methods: {
  }
};
</script>
<style lang="less" scoped>
  @lineColor:#dfdfdf;
  .goods-detailins.from{
    padding-top: 0;
  }
  .goods-detailins{
    padding-bottom: 44px;
    background-color: #ffffff;
    h3{
      font-size:16px;
      color: #333333;
      padding: 10px 0;
      text-align: center;
      border-bottom: 1px solid  @lineColor;
      font-weight: bold;
    }
    .goods-detailsIn{
      padding: 10px 10px 20px;
      font-size:14px;
      color: #333333;
      img{
        display: block;
        width:100% !important;
        height: auto !important;
      }
    }
    .goods-detailins.goods-fromclass{
      padding-top: 0;
    }
  }
</style>
<style lang="less">
  .goods-detailsIn{
    padding: 10px 10px 20px;
    font-size:14px;
    color: #333333;
    img{
      width:100%;
    }
  }
</style>

<template>
  <div class="goods-detail" :class="{'from':from==2}">
    <div class="goods-detailsgood" v-html="goodsDetail.productDetail" >
    </div>
  </div>
</template>
<script>
export default {
  props: ['goodsDetail', 'productId', 'getByself', 'getFast', 'getCommon', 'from'],
  data() {
    return {
      classIndex: 2,
    };
  },
  components: {
  },
  methods: {
  }
};
</script>
<style lang="less">
  @lineColor:#dfdfdf;
  .goods-detail.from{
    padding-top: 0;
  }
.goods-detail{
  /*padding-top: 44px;*/
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
  .goods-detailsgood{
    padding: 10px 10px 20px;
    font-size:14px;
    color: #333333;
    width:100%;
    word-wrap:break-word;
    img{
      width:100% !important;
      height: auto !important;
    }
  }
  .goods-detail.goods-fromclass{
    padding-top: 0;
  }
}
</style>
<style lang="less">
  .goods-detailsgood{
    padding: 10px 10px 20px;
    font-size:14px;
    color: #333333;
    width:100%;
    word-wrap:break-word;
    img{
      width:100%;
    }
  }
</style>

<template>
  <div class="goodsList">
    <div class="list" v-for="(goods,index) in goodsData" :key="index">
      <div class="tap">
        <div class="jk-banner">
          <!-- <div class="title" >{{goods.news_category_id}}</div> -->
          <div class="swiper">
            <a href="javascript:void(0);">
              <img :src="goods.picture_path" alt="">
            </a>
          </div>
        </div>
      </div>
      <div class="goodsitem">
        <div class="item" v-for="(products,index) in goods.products" :key="index" @click="goDetail(products)">
          <img :src="products.productmainimage" alt="">
          <p class="subtitle">{{products.productname}}</p>
          <span class="pirce">￥{{products.productmarkprice.toFixed(2)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: { goodsData: Array },
  methods: {
    goDetail(products) {
      let getbyself = products.productid ? products.getbyself : '';
      let getcommon = products.productid ? products.getcommon : '';
      let getfast = products.productid ? products.getfast : '';
      this.$router.push('/goods/goodsDetail?productId=' + products.productid + '&getByself=' + getbyself + '&getCommon=' + getcommon + '&getFast=' + getfast);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../styles/mixin.less";
.goodsList{
  background: #fff;
  margin-top: 10px;
}
.list{
  margin-bottom: 10px;
  .jk-banner{
    // padding: 10px;
    // border-bottom: 1px solid #e0e0e0;
    .title{
      text-align: center;
      font-size: 14px;
      color: #333;
      padding: 5px 0;
    }
    .swiper{
      height: 95px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .goodsitem{
    display: -webkit-box;
    overflow-x: scroll;
    line-height: 20px;
    text-align: center;
    padding-top:10px;
    margin-right: 10px;
    border-bottom: @border-line;
    .item{
      width: 90px;
      margin: 0 0 10px 10px;
      text-align: center;
      img{
        display: block;
        width: 90px;
        height: 100px;
        // border: 1px solid #ccc;
      }
    }
    .subtitle{
      width: 90px;
      font-size: 13px;
      margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pirce{
      display: block;
      color: #ff2400;
      margin-top: 5px;
    }
  }
}
.list:last-child{
  margin: 0;
  .goodsitem{
    border:none;
  }
}

</style>

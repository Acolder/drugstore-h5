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
import { getGood } from '@/api/goodDetail';
export default {
  // props: ['goodsDetail', 'productId', 'getByself', 'getFast', 'getCommon', 'from'],
  data() {
    return {
      classIndex: 2,
      goodsDetail: {},
      productId: 0,
      getByself: '',
      getFast: '',
      getCommon: '',
      from: 1
    };
  },
  components: {
  },
  methods: {
    // 地址参数，查询请求
    fromWeb() {
      // 地址参数
      this.productId = this.$route.query.productId;
      this.getByself = this.$route.query.getByself;
      this.getFast = this.$route.query.getFast;
      this.getCommon = this.$route.query.getCommon;
      // 境外
      let isTransnational = this.$route.query.isTransnational;
      if (!isTransnational) {
        this.isTransnational = false;
      } else {
        this.isTransnational = isTransnational;
      }
      if (this.$route.query.from) {
        if (this.$route.query.from === 2 || this.$route.query.from === '2') {
          // app端 2, web端 1
          this.from = this.$route.query.from;
        } else {
          this.from = 1;
        }
      } else {
        this.from = 1;
      }
      // 推荐医师id
      if (this.$route.query.recommendId) {
        this.recommendId = this.$route.query.recommendId;
      }
      // 地址判断标题显示
      let path = this.$route.path;
      if (path.indexOf('goodsDetail') >= 0) {
        this.classIndex = 1;
      } else if (path.indexOf('goodsLink') >= 0) {
        this.classIndex = 2;
      } else if (path.indexOf('goodsEvaluation') >= 0) {
        this.classIndex = 3;
      } else if (path.indexOf('instruction') >= 0) {
        this.classIndex = 4;
      }
      // 需要查询商品详情
      getGood(this.productId, this.getByself, this.getFast, this.getCommon, this.isTransnational).then((res) => {
        if (res.data.resultCode === '0') {
          this.goodsDetail = res.data.resultData;
        }
      });
    }
  },
  watch: {
    // 路径变化重新请求
    '$route'(to, from) {
      this.fromWeb();
    }
  },
  mounted() {
    this.fromWeb();
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

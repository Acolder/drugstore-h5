<template>
  <div class="goods-content" style="padding-top: 144px;">
    <div class="goods-swiper">
      <mt-swipe :auto="0" :show-indicators="false" @change="handleChange" >
        <mt-swipe-item v-for="item in goodsDetail.productSubImages" :key="item" >
          <img :src="item" alt="" >
        </mt-swipe-item>
      </mt-swipe>
      <div class="goods-circle">{{swipeIndex}}/{{productSubImagesLength}}</div>
    </div>
    <div class="goods-more">
      <ul class="goodsname-ul">
        <button v-show="getFast && isNight">夜间快送</button>
        <h5>{{goodsDetail.productName}}</h5>
      </ul>
      <ul class="goods-infor">
        <li>{{goodsDetail.description}}</li>
        <li></li>
      </ul>
      <ul class="goods-infor">
        <li><p>{{goodsDetail.productSpecification}}</p></li>
        <li>
          <span></span>
        </li>
        <li>
          <a @click="goInstruction()">说明书</a>
        </li>
      </ul>
      <ul class="goods-num">
        <li>￥{{goodsDetail.productMarkprice}}</li>
      </ul>
      <ul class="goods-num">
        <li>
          <div class="goods-km">
            <img src="./img/iconpla_yaodiandhd@2x.png" alt="">
            <i>由{{goodsDetail.sellerName}}，为您提供药品服务</i>
          </div>
        </li>
        <li>销售量：{{goodsDetail.productSalesVolume}}</li>
      </ul>
    </div>
    <div class="goods-row"></div>
    <div class="prescriptionNo" v-show="goodsDetail.isOtc == '2'||goodsDetail.isOtc == 2">
      <img src="./img/iconfont_bottle@2x.png" alt="" >
      <span>本品为处方药，购买需凭医生处方，请咨询药师了解详情。</span>
    </div>
    <div class="goods-row" v-show="goodsDetail.isOtc == '2'||goodsDetail.isOtc == 2"></div>
    <div class="goods-evaluation" >
      <h3>商品评价</h3>
      <div class="goods-evalOne" v-show="commentList !== 0">
        <div class="goods-evalTop">
          <img :src="commentList.userIcon" alt="" v-show="commentList.userIcon">
          <span>{{commentList.nickname}}</span>
        </div>
        <div class="goods-evalBottom">
          {{commentList.content}}
        </div>
      </div>
      <div class="goods-evalSee" v-show="commentList !== 0">
        <a @click="goEvaluation()">查看全部评价</a>
      </div>
      <div class="goods-evalSee" v-show="commentList === 0||commentList == undefined">
        <a>暂无评价</a>
      </div>
    </div>
    <div class="goods-row"></div>
    <div class="goods-detail"  style="padding-top: 0px;">
      <h3>商品详情</h3>
      <div class="goods-detailsgood" v-html="goodsDetail.productDetail">
      </div>
    </div>
    <div class="goods-row"></div>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Toast, MessageBox } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
export default {
  props: ['goodsDetail', 'swipeIndex', 'commentList', 'productSubImages', 'productSubImagesLength', 'productId', 'getByself', 'getFast', 'getCommon', 'from', 'recommendId', 'getTransnational'],
  data() {
    return {
      swipes: [],
      classIndex: 1,
      isNight: false
    };
  },
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem,
    Toast,
    MessageBox
  },
  methods: {
    // 跳转说明书
    goInstruction() {
      this.$router.push({ path: `/goodsapp/goodsAppinstruction?productId=${this.productId}&getByself=${this.getByself}&getCommon=${this.getCommon}&getFast=${this.getFast}&recommendId=${this.recommendId}&getTransnational=${this.getTransnational}` });
    },
    // 跳转评价
    goEvaluation() {
      this.$emit('refreshbizlines', 3);
    },
    // 轮播图
    handleChange(index) {
      this.swipeIndex = index + 1;
    },
    // 夜间快送
    isAtNight() {
      javaAjax.post(`${process.env.ES_BASE_HOST}/elasticsearch/night/isAtNight`).then(res => {
        if (res.status === 200 && res.data.resultCode === '0') {
          this.isNight = res.data.resultData;
        }
      });
    },
  },
  mounted() {
    this.isAtNight();
  }
};
</script>
<style lang="less" scoped>
  @lineColor:#dfdfdf;
  .goods-content{
    width:100%;
    /*padding: 44px 0 45px;*/
  }
  .goods-swiper{
    width:100%;
    height: 265px;
    background: #ffffff;
    border-bottom: 1px solid  @lineColor;
    position: relative;
    .mint-swipe {
      height: 265px;
    }
    img{
      display: block;
      width: 100%;
      height:265px;
    }
  }
  .goods-more{
    padding:10px;
    font-size:12px;
    background-color: #ffffff;
    .goodsname-ul{
      display: flex;
      button{
        padding: 0 8px;
        height: 20px;
        background-color: #085198;
        border-radius: 5px;
        font-size: 11px;
        color: #ffffff;
        margin-right:10px;
      }
      h5{
        font-size:15px;
        color: #333;
        font-weight: bold;
      }
    }
    .goods-infor{
      margin-top:10px;
      display: flex;
      li:nth-child(1){
        width:77%;
        color: #333;
        word-wrap: break-word;
      }
      li:nth-child(2){
        width:4%;
        display: flex;
        justify-content:center;
        span{
          display: block;
          width: 1px;
          height:100%;
          background: #e5e5e5;
        }
      }
      li:nth-child(3){
        width:19%;
        display: flex;
        justify-content:center;
        align-items:center;
        color: #959595;
        a{
          display: flex;
          justify-content:center;
          align-items:center;
          width:90%;
          height: 20px;
          border-radius: 2px;
          border: solid 1px #c3c3c3;
          font-size:12px;
          color: #959595;
        }
      }
    }
    p{
      color: #888888;
    }
    .goods-num{
      margin-top:10px;
      margin-bottom:3px;
      display: flex;
      justify-content:space-between;
      li:nth-child(1){
        font-size:20px;
        color: #fe4d57;
        max-width:80%;
        .goods-km{
          background-color: #ddf8f9;
          border-radius: 4px;
          padding: 3px 7px;
          line-height:16px;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 15px;
            height: 15px;
            margin-right: 5px;
          }
          i{
            font-size: 12px;
            color: #81b3b5;
          }
        }

      }
      li:nth-child(2){
        color: #999999;
        font-size:11px;
      }
    }
  }
  .goods-row{
    width:100%;
    height: 10px;
    background-color: #f5f5f5;
  }
  .goods-evaluation{
    width:100%;
    padding: 10px 0 20px 10px;
    background-color: #ffffff;
    h3{
      font-size:14px;
      color: #333333;
      font-weight: bold;
      padding-bottom: 10px;
      border-bottom: 1px solid @lineColor;
    }
  }
  .goods-evalTop{
    margin-top: 10px;
    display: flex;
    align-items: center;
    img{
      width: 25px;
      height: 25px;
    }
    span{
      margin-left:10px;
      font-size:13px;
      color: #333;
    }
  }
  .goods-evalBottom{
    margin-top:10px;
    font-size: 12px;
    color: #333333;
  }
  .goods-evalSee{
    width:100%;
    margin-top:10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 23px;
    font-size:12px;
    a{
      width: 90px;
      color:#0ccdd3;
      background-color: #ffffff;
      border-radius: 11px;
      border: solid 1px #0ccdd3;
      text-align: center;
    }
  }
  .goods-detail{
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
      padding: 10px 10px 20px 10px;
      width:100%;
      font-size:14px;
      color: #333333;
      word-wrap:break-word;
      img{
        width:100% !important;
        height: auto !important;
      }
    }
  }
  .goods-evalOne{
    padding-right: 10px;
  }
  .goods-circle{
    position: absolute;
    right:7px;
    bottom: 7px;
    width: 25px;
    height: 25px;
    background-color: rgb(133,133,133);
    z-index: 100;
    border-radius: 50%;
    color: #ffffff;
    font-size: 10px;
    line-height: 25px;
    text-align: center;
  }
  ul.byCome{
    background-color:#fbfbfc ;
    display: flex;
    justify-content:space-between;
    padding: 15px;
    li{
      display: flex;
      align-items: center;
      img{
        width:14px;
        height: 12px;
        display: inline-block;
        margin-right: 3px;
      }
      span{
        font-size: 11px;
      }
    }
  }
  .prescriptionNo{
    padding: 15px;
    font-size: 12px;
    color: #fe4d57;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    img{
      width: 11px;
      height: 14px;
      margin-right: 5px;
    }
  }
</style>
<style lang="less">
  .goods-detailsgood{
    padding: 10px 10px 20px 10px;
    width:100%;
    font-size:14px;
    color: #333333;
    word-wrap:break-word;
    img{
      width:100%;
    }
    /deep/p {
      img {
        display: block;
        padding: 0;
        margin: 0;
      }
    }
  }
</style>

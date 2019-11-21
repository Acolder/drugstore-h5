<template>
  <div class="goods-content">
    <div class="goods-swiper">
      <mt-swipe :auto="0" :show-indicators="false" @change="handleChange" >
        <mt-swipe-item v-for="item in goodsDetail.productSubImages" :key="item">
            <img :src="item" alt="" @click="viewBigImg(item)">
        </mt-swipe-item>
      </mt-swipe>
      <div class="goods-circle">{{swipeIndex}}/{{productSubImagesLength}}</div>
    </div>
    <div class="goods-more">
      <div class="h5">
        <div>
          <label v-show="getByselfProductInfo">自提</label>
          <label v-show="getFastProductInfo">快送</label>
          <label v-show="getCommonProductInfo">商城</label>
          <label v-show="getTransnationalProductInfo">跨境购</label>
          <span>药多多·医多多·健康多</span>
        </div>
        <h5>
          {{goodsDetail.productName}}
        </h5>
      </div>
      <ul class="goods-infor">
        <li>{{goodsDetail.description}}</li>
        <li>
          <span></span>
        </li>
        <li>
          <a @click="goInstruction()">说明书</a>
        </li>
      </ul>
      <p>￥{{priceNum}}</p>
      <ul class="goods-num">
        <li style="margin-top: 0">规格：{{goodsDetail.productSpecification}}</li>
        <li>浏览量：{{goodsDetail.productPv}}</li>
      </ul>
      <!--<ul class="goods-address">-->
        <!--<li>-->
          <!--<span>收货地址</span>-->
          <!--福田诉讼的国际福田诉讼的国际福田诉讼的国际福田诉讼的国际-->
        <!--</li>-->
        <!--<li>-->
          <!--<img src="./img/pla_icon_modify.png" alt="">-->
        <!--</li>-->
      <!--</ul>-->
    </div>
    <!-- <ul class="byCome">
      <li>
        <img src="./img/iconfont_lift@2x.png" alt="" v-if="getByself===''|| getByself===undefined">
        <img src="./img/iconfont_liftok@2x.png" alt="" v-else>
        <span>药柜自提</span>
      </li>
      <li>
        <img src="./img/iconfont_distribution@2x.png" alt="" v-if="getFast===''|| getFast===undefined">
        <img src="./img/iconfont_distributionok@2x.png" alt="" v-else>
        <span>药店速达</span>
      </li>
      <li>
        <img src="./img/iconfont_send@2x.png" alt="" v-if="getCommon===''&&(isTransnational===false||isTransnational==='false')">
        <img src="./img/iconfont_sendok@2x.png" alt="" v-else>
        <span>商城配送</span>
      </li>
    </ul> -->
    <div class="goods-row"></div>
    <div class="prescriptionNo" v-show="goodsDetail.isOtc == '2'||goodsDetail.isOtc == 2">
      <img src="./img/iconfont_bottle@2x.png" alt="" >
      <span>本品为处方药，购买需凭医生处方，请咨询药师了解详情。</span>
    </div>
    <div class="lj"  v-show="goodsDetail.productCoupon && goodsDetail.productCoupon.length > 0">
      <div class="ljList">
        <div style="display: block;min-width: 30px;">
          领劵
        </div>
        <ul>
          <li v-for="(item,index) in goodsDetail.productCoupon" v-show="index==0" v-bind:key="item.couponId">
            <h1>满{{item.useTheThreshold}}减{{item.preferentialAmount}}</h1>
            <!--<img src="./img/pla_iconfont_couponslabel@3x.png" alt="">-->
          </li>
        </ul>
      </div>
      <div class="more-btn" @click="couponOpen">
        <img src="../aboutUs/img/icon_jt@3x.png" alt="">
      </div>
    </div>
    <div class="goods-row"></div>
    <div class="goods-row" v-show="goodsDetail.isOtc == '2'||goodsDetail.isOtc == 2"></div>
    <div class="goods-evaluation" >
      <h3>商品评价</h3>
      <div class="goods-evalOne" v-show="commentList !== 0">
        <div class="goods-evalTop">
          <img :src="commentList.userIcon" alt="" v-show="commentList.userIcon">
          <img src="./img/niming.png" alt="" v-show="!commentList.userIcon">
          <span>{{commentList.nickname? commentList.nickname : '匿名用户'}}</span>
        </div>
        <div class="goods-evalBottom">
          {{commentList.content}}
        </div>
      </div>
      <div class="goods-evalSee" v-show="commentList !== 0">
        <a @click="goEvaluation()">查看全部评价</a>
      </div>
      <div class="goods-evalSee" v-show="commentList === 0||commentList == undefined">
        <a class="goods-evalSeeNo">暂无评价~</a>
      </div>
    </div>
    <div class="goods-row"></div>
    <div class="goods-detail" style="padding-top:0">
      <h3>商品详情</h3>
      <div class="goods-detailsgood" v-html="goodsDetail.productDetail">
      </div>
    </div>
    <div class="goods-row"></div>
    <div class="common-mask" @click="closeBigImg" v-show="isBigImage"></div>
    <img :src="bigImage" class="big-img" v-show="isBigImage"/>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Toast } from 'mint-ui';
export default {
  props: ['priceNum', 'getCommonProductInfo', 'getByselfProductInfo', 'getFastProductInfo', 'getTransnationalProductInfo', 'goodsDetail', 'swipeIndex', 'commentList', 'productSubImages', 'productSubImagesLength', 'productId', 'getByself', 'getFast', 'getCommon', 'from', 'recommendId', 'isTransnational'],
  data() {
    return {
      swipes: [],
      classIndex: 1,
      cartShow: true,
      isBigImage: false,  // 大图模式
      bigImage: ''
    };
  },
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem,
    Toast
  },
  methods: {
    // 跳转说明书
    goInstruction() {
      this.$router.push({ path: `/goods/instructionNew?from=1&productId=${this.productId}&getByself=${this.getByself}&getCommon=${this.getCommon}&getFast=${this.getFast}&recommendId=${this.recommendId}&isTransnational=${this.isTransnational}` });
    },
    // 跳转评价
    goEvaluation() {
      this.$emit('refreshbizlines', 3);
    },
    // 轮播图
    handleChange(index) {
      this.swipeIndex = index + 1;
    },
    // 查看大图
    viewBigImg(src) {
      this.bigImage = src;
      this.isBigImage = true;
    },
    // 关闭大图模式
    closeBigImg() {
      this.isBigImage = false;
    },
    // 打开优惠劵弹窗
    couponOpen() {
      this.$emit('couponOpen', true);
    }
  }
};
</script>
<style lang="less" scoped>
  @import '../../styles/mixin.less';
  @lineColor:#dfdfdf;
  .goods-content{
    width:100%;
    /*padding: 44px 0 45px;*/
  }
  .goods-swiper{
    width:100%;
    height: 375px;
    background: @white-color;
    position: relative;
    border-bottom: 1px solid @lineColor;
    .mint-swipe {
      height: 375px;
    }
    img{
      display: block;
      width: 100%;
      height:355px;
      margin: 0 auto;
    }
  }
  .goods-more{
    padding:10px;
    font-size:12px;
    background-color: @white-color;
    .h5{
      // height: 18px;
      // line-height: 18px;
      div{
        label {
          float: left;
          height: 18px;
          line-height:18px;
          font-size: 10px;
          color: @white-color;
          border-radius: 15px;
          padding: 0 7px;
          background: @green-color;
          margin: 1px 6px 0 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        span{
          font-size: 12px;
          color: #a3a3a3;
        }
      }
      h5{
        font-size:15px;
        color: #333;
        font-weight: bold;
        display: block;
        margin-top: 10px;
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
      font-size:20px;
      color: #fe4d57;
      margin-top:10px;
    }
    .goods-num,.goods-address{
      margin-top:10px;
      margin-bottom:3px;
      display: flex;
      justify-content:space-between;
      li:nth-child(1){
        color: #888888;
        margin-top:10px;
      }
      li:nth-child(2){
        color: #999999;
        font-size:11px;
      }
    }
    .goods-address{
      margin-top:20px;
      li:nth-child(1){
        margin-top: 0;
        flex:1;
        font-size: 14px;
        color: #10b7bc;
        span{
          color: #333333;
        }
      }
      li:nth-child(2){
        width:17px;
        height: 16px;
        img{
          width:100%;
          height: 100%;
        }
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
    a.goods-evalSeeNo{
      color: #999999;
      border:none;
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
  .lj{
    padding:0 10px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333333;
    justify-content: space-between;
    .ljList{
      display: flex;
      flex-direction:row;
      align-items: center;
      ul{
        height: 22px;
        display: flex;
        li{
          width:100px;
          height: 22px;
          margin:0 8px;
          background-image: url("./img/pla_iconfont_couponslabel@3x.png");
          background-repeat:no-repeat;
          background-size:100% 100%;
          -moz-background-size:100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          h1{
            left:7px;
            top:0;
            white-space: nowrap;
            color: #fff;
          }
        }
      }
    }
    .more-btn{
      img{
        width: 8px;
        height: 15px;
      }
    }
  }
  .big-img{
    .align-center(fixed);
    width: 86%;
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

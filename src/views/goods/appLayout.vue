<template>
  <div class="applayout"  style="position: relative;left:0;top:0;width: 100%;height: 100%;">
    <!--<div class="goodsheader-name">-->
      <!--{{goodsDetail.productName}}-->
    <!--</div>-->
    <share-header style="position:fixed;width:100%;top: 0px;left: 0;z-index:200"></share-header>
    <header title="" style="position:fixed;width:100%;top: 60px;left: 0;z-index:200" class="goods-header" v-show="classIndex!==4">
      <ul class="goods-headerCenter">
        <li @click="goRoute(1)" :class="{'goods-selected': classIndex == 1 }">商品</li>
        <li @click="goRoute(2)" :class="{'goods-selected': classIndex == 2 }">详情</li>
        <li @click="goRoute(3)" :class="{'goods-selected': classIndex == 3 }">评价</li>
      </ul>
    </header>
    <router-view :goodsDetail="goodsDetail" :commentList="commentList" :getTransnational="getTransnational" :swipeIndex="swipeIndex" v-on:refreshbizlines="goRoute" :recommendId="recommendId" :productSubImages="productSubImages" :productSubImagesLength="productSubImagesLength" :productId="productId" :getByself="getByself" :getFast="getFast"  :getCommon="getCommon" :from="from"></router-view>
    <footer  style="position:fixed;" class="goods-footer" v-if="from == 1 || from == null ">
      <a class="goods-sline" @click="goInquiry()">
        <img slot="icon" src='./img/iconfont_pla_pharmacist@2x.png'/>
        咨询药师
      </a>
      <a  class="goods-sline" @click="goShopCart()" style="position: relative">
        <v-cart-num style="top: -8px;right: 15px;"></v-cart-num>
        <img slot="icon" src='./img/icon_shopping@2x.png'/>
        购物车
      </a>
      <a @click="addShopCart()" :class="{'noClick':isBuy==false}">
        加入购物车
      </a>
      <a  @click="goBuy()" :class="{'noClick':isBuy==false}">
        立即购买
      </a>
    </footer>
    <v-noaddr :has-show="hasNoAddr"></v-noaddr>

  </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui';
import noAddr from '../../components/noAddrPop/noAddr.vue';
import { getGoodNew } from '@/api/goodDetail';
import shopCartNum from '../../components/shopCartNum/index.vue';
import shareHeader from '@/components/share/shareHeader';
export default {
  data() {
    return {
      productId: 0,
      getByself: '',
      getFast: '',
      getCommon: '',
      from: 1,
      getTransnational: 0,
      hasNoAddr: false,
      goodsDetail: {},
      commentList: {},
      productSubImages: [],
      productSubImagesLength: 1,
      swipeIndex: 0,
      recommendId: '',
      classIndex: 1,
      isBuy: true,
    };
  },
  components: {
    'v-noaddr': noAddr,
    MessageBox,
    Toast,
    'v-cart-num': shopCartNum,
    'share-header': shareHeader
  },
  methods: {
    // 点击跳转路由
    goRoute(classIndex) {
      if (classIndex === 1) {
        this.$router.replace({ path: `/goodsapp/appGoodsDetail?productId=${this.productId}&getByself=${this.getByself}&getCommon=${this.getCommon}&getFast=${this.getFast}&recommendId=${this.recommendId}&getTransnational=${this.getTransnational}` });
      } else if (classIndex === 2) {
        this.$router.replace({ path: `/goodsapp/goodsAppLink?productId=${this.productId}&getByself=${this.getByself}&getCommon=${this.getCommon}&getFast=${this.getFast}&recommendId=${this.recommendId}&getTransnational=${this.getTransnational}` });
      } else if (classIndex === 3) {
        this.$router.replace({ path: `/goodsapp/goodsAppEvaluation?productId=${this.productId}&getByself=${this.getByself}&getCommon=${this.getCommon}&getFast=${this.getFast}&recommendId=${this.recommendId}&getTransnational=${this.getTransnational}` });
      }
    },
    // 点击返回上一页
    historyURL() {
      this.$router.go(-1);
    },
    // 弹窗
    mesAlert() {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('micromessenger') < 0) {
        // 非微信 打开
        let hasApp = true;
        let t = 1000;
        setTimeout(function () {
          if (!hasApp) {
            if ((ua.indexOf('android') !== -1) || (ua.indexOf('Adr') !== -1)) {
              window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kmyy.intellpharmacy&fromcase=40003';
            } else if ((ua.indexOf('iphone') !== -1) || (ua.indexOf('ipad') !== -1) || (ua.indexOf('ipod') !== -1)) {
              window.location.href = 'https://itunes.apple.com/cn/app/id1395275648?mt=8';
            } else {
              window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kmyy.intellpharmacy&fromcase=40003';
            }
          }
        }, 2000);
        let t1 = Date.now();
        window.location.href = 'kmyhl://';
        setTimeout(function () {
          let t2 = Date.now();
          hasApp = !(!t1 || t2 - t1 < 2000);
        }, t);
      } else {
        // 微信 跳转引导页
        this.$router.push({
          path: '/QRcode/wxtemp',
          query: { returnUrl: `${process.env.WEB_HOST}/goodsapp/appGoodsDetail?productId=${this.productId}&getByself=${this.getByself}&getCommon=${this.getCommon}&getFast=${this.getFast}&recommendId=${this.recommendId}&getTransnational=${this.getTransnational}` }
        });
      }
    },
    // 咨询药师
    goInquiry() {
      this.mesAlert();
    },
    // 购物车
    goShopCart() {
      this.mesAlert();
    },
    // 加入购物车
    addShopCart() {
      this.mesAlert();
    },
    // 显示弹窗
    showPops() {
      this.showPop = true;
    },
    // 关闭弹窗
    closePops() {
      this.showPop = false;
    },
    // 立即购买
    goBuy() {
      this.mesAlert();
    },
    // 地址参数，查询请求
    fromWeb() {
      // 地址参数
      this.productId = this.$route.query.productId;
      this.getByself = this.$route.query.getByself;
      this.getFast = this.$route.query.getFast;
      this.getCommon = this.$route.query.getCommon;
      // 境外
      this.getTransnational = this.$route.query.getTransnational;
      // 推荐医师id
      if (this.$route.query.recommendId) {
        this.recommendId = this.$route.query.recommendId;
      }
      // 地址判断标题显示
      let path = this.$route.path;
      if (path.indexOf('appGoodsDetail') >= 0) {
        this.classIndex = 1;
      } else if (path.indexOf('goodsAppLink') >= 0) {
        this.classIndex = 2;
      } else if (path.indexOf('goodsAppEvaluation') >= 0) {
        this.classIndex = 3;
      } else if (path.indexOf('goodsAppinstruction') >= 0) {
        this.classIndex = 4;
      }
      // 需要查询商品详情
      getGoodNew(this.productId, this.getByself, this.getFast, this.getCommon, this.getTransnational).then((res) => {
        if (res.data.resultCode === '0') {
          let urlList = res.data.resultData.productSubImages.split(',');
          if (urlList.length > 0) {
            res.data.resultData.productSubImages = [];
            for (let i = 0; i < urlList.length; i++) {
              let item = urlList[i];
              if (item !== '') {
                res.data.resultData.productSubImages.push(item);
              }
            }
          }
          if (res.data.resultData.commentList.length > 0) {
            this.commentList = res.data.resultData.commentList[0];
          } else {
            this.commentList = 0;
          }
          this.productSubImagesLength = res.data.resultData.productSubImages.length;
          // 轮播图个数大于0
          if (this.productSubImagesLength > 0) {
            this.swipeIndex = 1;
          }
          this.goodsDetail = res.data.resultData;
          this.goodsDetail.isOtc = parseInt(this.goodsDetail.isOtc, 10);
          this.isBuy = res.data.resultData.isBuy;
          this.goodsDetail.sellerName = this.goodsDetail.sellerUser.sellerName;
          this.goodsDetail.productMarkprice = this.goodsDetail.productMarkprice.toFixed(2);
          document.title = this.goodsDetail.productName;
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
<style lang="less">
  @headerHeight: 44px;
  @fff: #ffffff;
  .goodsheader-name{
    width:100%;
    position: fixed;
    width:100%;
    top: 0;left: 0;
    height: 44px;
    text-align: center;
    font-size: 18px;
    line-height:44px;
    color: #333333;
    border-bottom: 1px solid #dfdfdf;
    background: @fff;
    z-index: 200;
  }
  .goods-header{
    height:@headerHeight;
    background: @fff;
    border-bottom: 1px solid  #dfdfdf;
    position: relative;
    z-index: 10;
    .goods-return{
      position: absolute;
      left:10px;
      top:0;
    }
    .mint-button--default{
      background: @fff;
      box-shadow:none;
    }
    .goods-back{
      height: 43px;
    }
    .mint-button-icon {
      width: 10px;
      height: 18px;
    }
    .goods-headerCenter{
      position: relative;
      width:119px;
      margin-left:auto;
      margin-right: auto;
      display: flex;
      height: 44px;
      line-height: 44px;
      font-size:15px;
      justify-content:space-between;
      color: #333;
    }
    .goods-selected{
      border-bottom: 2px solid #0ccdd3;
      color:#0ccdd3;
    }
  }
  .goods-footer{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height: 45px;
    background-color:@fff ;
    border-top: solid 1px #f4f4f4;
    a{
      height: 44px;
      width:28%;
      float: left;
      display: flex;
      /*margin-top:7px;*/
      justify-content: center;
      align-items:center;
      flex-direction:column;
      color: @fff;
      font-size:14px;
      img{
        width:16px;
        height: 16px;
      }
    }
    a:nth-child(1){
      color: #0ccdd3;
    }
    a:nth-child(3){
      background-image: linear-gradient(67deg,#00dbd5 0%,#1fc2eb 100%),
      linear-gradient( #0092ef,#0092ef);
    }
    a:nth-child(4){
      background-color: #fe4d57;
    }
    .goods-sline{
      width:22%;
      font-size:10px;
      color: #666;
    }
  }
  .goods-footer a.noClick{
    background-image: none;
    background-color: #b2b2b2;
  }
  .goods-footer a:nth-child(3).noClick{
    border-right: 1px solid #ffffff;
  }
  .applayout{
    .goods-detail{
      padding-top: 104px;
    }
    .goods-detailins{
      padding-top: 104px;
    }
    .ins-header{
      margin-top: 60px;
    }
    .goods-eval{
      padding-top: 104px;
    }
  }
</style>


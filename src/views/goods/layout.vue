<template>
  <div class="goods-layout">
    <div :class="{'goods-cartAdd':cartShow||couponShow}">
      <div class="goods-cartAddOn" v-show="cartShow||couponShow"></div>
      <header title="" style="position:fixed;width:100%;top: 0;left: 0;z-index:200" class="goods-header" v-show="(from == 1|| from == null)&& classIndex!==4">
        <a  slot="left" class="goods-return" @click="historyURL">
          <mt-button icon="back" class="goods-back"></mt-button>
        </a>
        <ul class="goods-headerCenter">
          <li @click="goRoute(1)" :class="{'goods-selected': classIndex == 1 }">商品</li>
          <li @click="goRoute(2)" :class="{'goods-selected': classIndex == 2 }">详情</li>
          <li @click="goRoute(3)" :class="{'goods-selected': classIndex == 3 }">评价</li>
        </ul>
      </header>
      <router-view
        @couponOpen="couponOpenCheck"
        :priceNum="priceNum"
        :getCommonProductInfo="getCommonProductInfo" :getByselfProductInfo="getByselfProductInfo" :getFastProductInfo="getFastProductInfo" :getTransnationalProductInfo="getTransnationalProductInfo"
        :goodsDetail="goodsDetail" :commentList="commentList" :isTransnational="isTransnational" :swipeIndex="swipeIndex" v-on:refreshbizlines="goRoute" :recommendId="recommendId" :productSubImages="productSubImages" :productSubImagesLength="productSubImagesLength" :productId="productId" :getByself="getByself" :getFast="getFast"  :getCommon="getCommon" :from="from"></router-view>
      <footer  style="position:fixed;" class="goods-footer" v-if="from == 1 || from == null ">
        <a class="goods-sline pharmacist" @click="goInquiry()" >
          <img slot="icon" src='./img/iconfont_pla_pharmacist@2x.png'/>
          咨询药师
        </a>
        <a class="goods-sline" @click="goShopCart()" style="position: relative">
          <v-cart-num style="top: -8px;right: 15px;"></v-cart-num>
          <img slot="icon" src='./img/icon_shopping@2x.png'/>
          购物车
        </a>
        <!-- <a @click="addShopCart(1)" :class="{'noClick':isBuy==false}">
          加入购物车
        </a>
        <a @click="addShopCart(2)" :class="{'noClick':isBuy==false}">
          立即购买
        </a> -->
        <a @click="addShopCart(1)" v-if="resData && resData.isBuyAll1 && resData.isBuyAll2">
          加入购物车
        </a>
        <a @click="addShopCart(2)" v-if="resData && resData.isBuyAll1 && resData.isBuyAll2">
          立即购买
        </a>
        <a class="no-click" v-if="resData && !resData.isBuyAll1">
          暂无库存
        </a>
        <a class="no-click" v-if="resData && resData.isBuyAll1 && !resData.isBuyAll2">
          <label>暂不支持线上购买</label>
          <label class="txt">请前往门店购买</label>
        </a>
      </footer>
      <v-noaddr :has-show="hasNoAddr"></v-noaddr>
    </div>
    <div class="goods-gwc" v-if="cartShow">
      <img src="./img/pla_icon_shyclose.png" alt="" class="goods-gwcClose" @click="cartClose">
      <ul class="goods-gwctop">
        <li>
          <img :src="resData.productMainImage" alt="">
        </li>
        <li>
          <h6 v-if="chooseTypeNum==1">￥{{getByselfProductInfo && getByselfProductInfo.productMarkprice.toFixed(2)}}</h6>
          <span v-show="chooseTypeNum==1">已选:“药柜自提”</span>
          <h6 v-if="chooseTypeNum==2">￥{{getFastProductInfo && getFastProductInfo.productMarkprice.toFixed(2)}}</h6>
          <span v-show="chooseTypeNum==2">已选:“药店快送”</span>
          <h6 v-if="chooseTypeNum==3">￥{{getCommonProductInfo && getCommonProductInfo.productMarkprice.toFixed(2)}}</h6>
          <span v-show="chooseTypeNum==3">已选:“商城配送”</span>
          <h6 v-if="chooseTypeNum==4">￥{{getTransnationalProductInfo && getTransnationalProductInfo.productMarkprice.toFixed(2)}}</h6>
          <span v-show="chooseTypeNum==4">已选:“跨境配送”</span>
        </li>
      </ul>
      <ul class="goods-gwcChoose">
        <li>
          <span>配送方式</span>
          <div v-if="getByselfProductInfo&&getByselfProductInfo.isBuy && chooseTypeNum==1">
            <i></i>
            <span @click="OpenMapm">
            步行导航
            </span>
          </div>
        </li>
        <li @click="chooseType(4)"  :class="{'goods-chooseOk': chooseTypeNum==4}"  v-if="getTransnationalProductInfo&&getTransnationalProductInfo.isBuy">
          <div class="goods-liOn">
            <span>跨境配送</span>
            <i>(预计7天送达)</i>
          </div>
          <h6 v-if="(chooseTypeNum==4)&&getTransnationalProductInfo.sellerUser&&getTransnationalProductInfo.sellerUser.sellerName">由{{getTransnationalProductInfo.sellerUser.sellerName}}，为您提供药品服务</h6>
        </li>
        <li class="goods-chooseIsBuy" v-if="getTransnationalProductInfo && (!getTransnationalProductInfo.isBuy || !getTransnationalProductInfo.sellerUser.isBuy)">
          <div class="goods-liOn">
            <span>跨境配送</span>
            <i v-if="!getTransnationalProductInfo.isBuy">(暂无库存)</i>
            <i v-else>(暂不支持线上购买)</i>
          </div>
        </li>
        <li @click="chooseType(1)" :class="{'goods-chooseOk': chooseTypeNum==1}" v-if="getByselfProductInfo&&getByselfProductInfo.isBuy">
          <div class="goods-liOn">
            <span>药柜自提</span>
            <i>(预计{{getByselfTime}}分钟取药)</i>
          </div>
          <h6 v-if="(chooseTypeNum==1)&&getByselfProductInfo.sellerUser&&getByselfProductInfo.sellerUser.sellerName">由{{getByselfProductInfo.sellerUser.sellerName}}，为您提供药品服务</h6>
        </li>
        <li class="goods-chooseIsBuy"  v-if="getByselfProductInfo && (!getByselfProductInfo.isBuy || !getByselfProductInfo.sellerUser.isBuy)">
          <div class="goods-liOn">
            <span>药柜自提</span>
            <i v-if="!getByselfProductInfo.isBuy">(暂无库存)</i>
            <i v-else>(暂不支持线上购买)</i>
          </div>
        </li>
        <li @click="chooseType(2)"  :class="{'goods-chooseOk': chooseTypeNum==2}" v-if="getFastProductInfo&&getFastProductInfo.isBuy">
          <div class="goods-liOn">
            <span>药店快送</span>
            <i>(核心区域预计30分钟送达)</i>
          </div>
          <h6 v-if="(chooseTypeNum==2)&&getFastProductInfo.sellerUser&&getFastProductInfo.sellerUser.sellerName">由{{getFastProductInfo.sellerUser.sellerName}}，为您提供药品服务</h6>
        </li>
        <li class="goods-chooseIsBuy"  v-if="getFastProductInfo && (!getFastProductInfo.isBuy || !getFastProductInfo.sellerUser.isBuy)">
          <div class="goods-liOn">
            <span>药店快送</span>
            <i v-if="!getFastProductInfo.isBuy">(暂无库存)</i>
            <i v-else>(暂不支持线上购买)</i>
          </div>
        </li>
        <li @click="chooseType(3)"  :class="{'goods-chooseOk': chooseTypeNum==3}" v-if="getCommonProductInfo&&getCommonProductInfo.isBuy">
          <div class="goods-liOn">
            <span>商城配送</span>
            <i>(预计3天送达)</i>
          </div>
          <h6 v-if="(chooseTypeNum==3)&&getCommonProductInfo.sellerUser&&getCommonProductInfo.sellerUser.sellerName">由{{getCommonProductInfo.sellerUser.sellerName}}，为您提供药品服务</h6>
        </li>
        <li class="goods-chooseIsBuy"  v-if="getCommonProductInfo && (!getCommonProductInfo.isBuy || !getCommonProductInfo.sellerUser.isBuy)">
          <div class="goods-liOn">
            <span>商城配送</span>
            <i v-if="!getCommonProductInfo.isBuy">(暂无库存)</i>
            <i v-else>(暂不支持线上购买)</i>
          </div>
        </li>
      </ul>
      <ul class="goods-gwcNum">
        <li>购买数量</li>
        <li>
          <span @click="lessNum">-</span>
          <span class="goods-numCenter">{{cartNum}}</span>
          <span @click="addNum">+</span>
        </li>
      </ul>
      <div class="goods-gwcOk">
        <button @click="nextSure()">
          确定
        </button>
      </div>
    </div>
    <div class="goods-gwc" v-if="couponShow" style="height: 360px;">
      <img src="./img/pla_icon_shyclose.png" alt="" class="goods-gwcClose" @click="couponClose">
      <div class="yhj-title">优惠券</div>
      <ul class="yhj-list">
        <li v-for="(coupon,counum) in goodsDetail.productCoupon" v-bind:key="coupon.couponId">
          <div>
            <div class="yhj-money">
              <i>¥</i>
              <b>{{coupon.preferentialAmount}}</b>
            </div>
            <div class="yhj-man">
              满{{coupon.useTheThreshold}}可用
            </div>
          </div>
          <div>
            <div class="yhj-name">{{coupon.couponName}}</div>
            <!--"businessType":  1 商城   2  药店   3  药柜    4  跨境电商-->
            <div class="yhj-use">
              仅用于<span v-show="coupon.businessType == 1">商城</span>
              <span v-show="coupon.businessType == 2">药店</span>
              <span v-show="coupon.businessType == 3">药柜</span>
              <span v-show="coupon.businessType == 4">跨境电商</span>
            </div>
            <div class="yhj-time">
              <!-- useTimeType 1：有效时间 2：起止时间 -->
              <div v-show="coupon.useTimeType == 1">{{coupon.startDate | timeEdit(coupon.endDate)}}</div>
              <div v-show="coupon.useTimeType == 2">有效期:{{coupon.effectiveDate}}天内</div>
              <div class="yhj-btn">
                <div class="yhj-btnNno" v-if = '(coupon.total? coupon.total: 0)< coupon.limitCollarPerPerson' @click="addCoupon(coupon.couponId, coupon.securitiesInformationId, coupon.sellerUserId, counum)">点击领取</div>
                <div class="yhj-btnOk" v-else>已领取</div>
                <!--<div class="yhj-btnNno" @click="addCoupon(coupon.couponId, coupon.securitiesInformationId, coupon.sellerUserId, counum)">可{{coupon.total}}||{{coupon.limitCollarPerPerson}}</div>-->
              </div>
            </div>
            <div class="yhj-ylImg" v-if="coupon.isState == 1">
              <!--已领取图标-->
              <img src="./img/pla_icon_yiling@3x.png" alt="">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui';
import { addShop, createOrder, bus } from '@/api/shopCart';
import noAddr from '../../components/noAddrPop/noAddr.vue';
import { getGoodNew, prescCall } from '@/api/goodDetail';
import { goLogin } from '@/api/user';
import shopCartNum from '../../components/shopCartNum/index.vue';
import { getToken } from '@/utils/auth';
import { formatDate } from '@/utils/date';
import { distanceByLnglat, openMap, distanceTime } from '@/api/coordinate.js';
import javaAjax from '@/utils/javaApiRequest';
export default {
  data() {
    return {
      cartShow: false,
      couponShow: false,
      productId: 0,
      getByself: '',
      getFast: '',
      getCommon: '',
      from: 1,
      isTransnational: false,
      hasNoAddr: false,
      goodsDetail: {},
      commentList: {},
      productSubImages: [],
      productSubImagesLength: 1,
      swipeIndex: 0,
      recommendId: '',
      classIndex: 1,
      isBuy: true,
      cartNum: 1,
      chooseTypeNum: 0,
      cartShowNum: 0,
      getCommonProductInfo: null,
      getByselfProductInfo: null,
      getFastProductInfo: null,
      getTransnationalProductInfo: null,
      priceNum: 0,
      resData: null,
      getByselfParm: 0,
      getFastParm: 0,
      getCommonParm: 0,
      getTransnationalParm: 0,
      getByselfTime: 6,
      // jqok: true, // 优惠卷领取
    };
  },
  components: {
    'v-noaddr': noAddr,
    MessageBox,
    Toast,
    'v-cart-num': shopCartNum
  },
  filters: {
    timeEdit(startDate, endDate) {
      let s = formatDate(new Date(Number(startDate)), 'yyyy.MM.dd');
      let e = formatDate(new Date(Number(endDate)), 'yyyy.MM.dd');
      return `${s}-${e}`;
    }
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
      let getTransnational = this.$route.query.getTransnational;
      if (!getTransnational) {
        this.getTransnational = '';
      } else {
        this.getTransnational = getTransnational;
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
      } else if (path.indexOf('goodsLinkNew') >= 0) {
        this.classIndex = 2;
      } else if (path.indexOf('goodsEvaluation') >= 0) {
        this.classIndex = 3;
      } else if (path.indexOf('instructionNew') >= 0) {
        this.classIndex = 4;
      }
      // 需要查询商品详情
      getGoodNew(this.productId, this.getByself, this.getFast, this.getCommon, this.getTransnational).then((res) => {
        console.log(res);
        if (res.data.resultCode === '0') {
          let resData = res.data.resultData;
          this.resData = resData;
          console.log(this.resData);
          let urlList = resData.productSubImages.split(',');
          if (urlList.length > 0) {
            resData.productSubImages = [];
            for (let i = 0; i < urlList.length; i++) {
              let item = urlList[i];
              if (item !== '') {
                resData.productSubImages.push(item);
              }
            }
          }
          if (resData.commentList && resData.commentList.length > 0) {
            this.commentList = resData.commentList[0];
          } else {
            this.commentList = 0;
          }
          this.productSubImagesLength = resData.productSubImages.length;
          // 轮播图个数大于0
          if (this.productSubImagesLength > 0) {
            this.swipeIndex = 1;
          }
          this.goodsDetail = resData;
          this.goodsDetail.isOtc = parseInt(this.goodsDetail.isOtc, 10);
          // 判断配送方式
          let priceArr = [];
          if (resData.getCommonProductInfo) {
            this.getCommonProductInfo = resData.getCommonProductInfo;
            if (this.getCommonProductInfo.productMarkprice) {
              if (this.getCommonProductInfo.isBuy) {
                this.chooseTypeNum = 3;
              }
              priceArr.push(this.getCommonProductInfo.productMarkprice.toFixed(2));
            }
          }
          if (resData.getFastProductInfo) {
            this.getFastProductInfo = resData.getFastProductInfo;
            if (this.getFastProductInfo.productMarkprice) {
              if (this.getFastProductInfo.isBuy) {
                this.chooseTypeNum = 2;
              }
              priceArr.push(this.getFastProductInfo.productMarkprice.toFixed(2));
            }
          }
          if (resData.getByselfProductInfo) {
            this.getByselfProductInfo = resData.getByselfProductInfo;
            if (this.getByselfProductInfo.productMarkprice) {
              if (this.getByselfProductInfo.isBuy) {
                this.chooseTypeNum = 1;
              }
              priceArr.push(this.getByselfProductInfo.productMarkprice.toFixed(2));
            }
          }
          if (resData.getTransnationalProductInfo) {
            this.getTransnationalProductInfo = resData.getTransnationalProductInfo;
            if (this.getTransnationalProductInfo.productMarkprice) {
              if (this.getTransnationalProductInfo.isBuy) {
                this.chooseTypeNum = 4;
              }
              priceArr.push(this.getTransnationalProductInfo.productMarkprice.toFixed(2));
            }
          }
          // 价格排序
          this.priceSort(priceArr);
          // 药柜时间
          this.selfTime();
        }
      });
    },
    // 价格排序
    priceSort(priceArr) {
      if (!this.chooseTypeNum) {
        // 无法购买
        this.isBuy = false;
      }
      if (priceArr.length === 0) {
        this.priceNum = 0;
      }
      if (priceArr.length === 1) {
        this.priceNum = priceArr[0];
      } else if (priceArr.length >= 2) {
        priceArr.sort(function (a, b) {
          return a - b;
        });
        let pLength = priceArr.length - 1;
        if (priceArr[0] === priceArr[pLength]) {
          this.priceNum = priceArr[0];
        } else {
          this.priceNum = `${priceArr[0]}-${priceArr[pLength]}`;
        }
      }
    },
    // 判断是否登录
    isToken() {
      let token = getToken();
      if (token) {
        return true;
      } else {
        Toast('用户未登录，请先登录');
        goLogin();
      }
    },
    // 点击跳转路由
    goRoute(classIndex) {
      if (classIndex === 1) {
        this.$router.replace({ path: `/goods/goodsDetail?productId=${this.productId}&getByself=${this.getByself}&getCommon=${this.getCommon}&getFast=${this.getFast}&recommendId=${this.recommendId}&isTransnational=${this.isTransnational}` });
      } else if (classIndex === 2) {
        this.$router.replace({ path: `/goods/goodsLinkNew?from=${this.from}&productId=${this.productId}&getByself=${this.getByself}&getCommon=${this.getCommon}&getFast=${this.getFast}&recommendId=${this.recommendId}&isTransnational=${this.isTransnational}` });
      } else if (classIndex === 3) {
        this.$router.replace({ path: `/goods/goodsEvaluation?productId=${this.productId}&getByself=${this.getByself}&getCommon=${this.getCommon}&getFast=${this.getFast}&recommendId=${this.recommendId}&isTransnational=${this.isTransnational}` });
      }
    },
    // 点击返回上一页
    historyURL() {
      this.$router.go(-1);
    },
    // 在线问医
    goInquiry() {
      /**
      this.$router.push({
        path: `/inquiry/consultPharmacist`,
        query: {
          prodName: this.goodsDetail.productName,
          description: this.goodsDetail.description,
          price: this.goodsDetail.productMarkprice,
          prodId: this.productId,
          prodPhotoPath: this.goodsDetail.productMainImage,
          getByself: this.getByself,
          getFast: this.getFast,
          getCommon: this.getCommon
        }
      });
       **/
      if (!this.goodsDetail.productMarkprice || this.goodsDetail.productMarkprice === 'undefined') {
        Toast('网络异常');
        return;
      } else {
        let url = `${process.env.WEB_HOST}/inquiry/consultPharmacist?prodName=${this.goodsDetail.productName}&description=${this.goodsDetail.description}&price=${this.goodsDetail.productMarkprice}&prodId=${this.productId}&prodPhotoPath=${this.goodsDetail.productMainImage}&getByself=${this.getByself}&getFast=${this.getFast}&getCommon=${this.getCommon}`;
        location.href = url;
      }
    },
    // 购物车
    goShopCart() {
      this.$router.push({ path: '/shopCart/index' });
    },
    // 加入购物车立即购买点击，判断是否登录，处方药，弹窗
    addShopCart(num) {
      if (this.isToken()) {
        // 可否购买
        if (!this.isBuy) {
          Toast('商品暂无库存，无法加入购物车、购买');
        } else {
          // 先判断是否为处方药
          if (this.goodsDetail.isOtc === 2) {
            prescCall(this.goodsDetail.productName, this.productId);
          } else {
            this.cartShow = true;
            this.cartShowNum = num;
            // 1添加购物车，2立即购买
          }
        }
      }
    },
    // 显示弹窗
    showPops() {
      this.showPop = true;
    },
    selfTime() {
      // 计算药柜自提时间
      let coordinate = JSON.parse(sessionStorage.getItem('coordinate'));
      if (this.getByselfProductInfo && this.getByselfProductInfo.isBuy) {
        let m = distanceByLnglat(coordinate.longitude, coordinate.latitude, this.getByselfProductInfo.sellerUser.longitude, this.getByselfProductInfo.sellerUser.latitude);
        let mdata = distanceTime(m);
        this.getByselfTime = mdata.time;
      }
    },
    // 关闭弹窗
    closePops() {
      this.showPop = false;
    },
    // 购物车，立即购买选择的配送方式传参
    getParameter() {
      if (this.chooseTypeNum === 1) {
        this.getByselfParm = this.getByself;
        this.getFastParm = '';
        this.getCommonParm = '';
        this.getTransnationalParm = '';
      } else if (this.chooseTypeNum === 2) {
        this.getByselfParm = '';
        this.getFastParm = this.getFast;
        this.getCommonParm = '';
        this.getTransnationalParm = '';
      } else if (this.chooseTypeNum === 3) {
        this.getByselfParm = '';
        this.getFastParm = '';
        this.getCommonParm = this.getCommon;
        this.getTransnationalParm = '';
      } else if (this.chooseTypeNum === 4) {
        this.getByselfParm = '';
        this.getFastParm = '';
        this.getCommonParm = '';
        this.getTransnationalParm = this.getTransnational;
      }
    },
    // 加入购物车
    addCart() {
      this.getParameter();
      addShop(this.productId, this.getByselfParm, this.getFastParm, this.getCommonParm, this.getTransnationalParm, this.recommendId, this.cartNum).then((res) => {
        if (res.data.resultCode === '0') {
          Toast(res.data.msg);
          bus.$emit('txt', 'add');
          let productId = sessionStorage.getItem('addProductId');
          let productIds = productId ? productId.split(',').map(Number) : [];
          productIds.push(this.productId);
          sessionStorage.setItem('addProductId', productIds);
          this.cartClose();
        } else if (res.data.resultCode === '-2') {
          Toast('用户未登录，请先登录');
          goLogin();
        } else {
          Toast('添加失败，请稍后重试~');
        }
      });
    },
    // 立即购买
    goBuy() {
      this.getParameter();
      // 生成订单地址判断 根据配送方式
      let products = [];
      let product = {
        productId: this.productId,
        getByself: this.getByselfParm,
        getFast: this.getFastParm,
        getCommon: this.getCommonParm,
        quantity: this.cartNum,
        cartId: null,
        recommendId: this.recommendId,
        getTransnational: this.getTransnationalParm,
      };
      products.push(product);
      createOrder(products);
    },
    // 关闭购物车弹窗
    cartClose() {
      this.cartShow = false;
    },
    // 打开优惠卷弹窗
    couponOpenCheck(item) {
      if (item) {
        this.couponShow = true;
      }
    },
    // 关闭优惠卷弹窗
    couponClose() {
      this.couponShow = false;
    },
    // 数量减少
    lessNum() {
      if (this.cartNum <= 1) {
        return;
      } else {
        this.cartNum -= 1;
      }
    },
    // 数量增加
    addNum() {
      this.cartNum++;
    },
    // 变换配送方式
    chooseType(num) {
      this.chooseTypeNum = num;
    },
    // 购物车弹窗点击确定
    nextSure() {
      if (this.cartShowNum === 1) {
        // 添加购物车
        this.addCart();
      } else if (this.cartShowNum === 2) {
        // 立即购买
        this.goBuy();
      }
    },
    // 步行导航,打开地图
    OpenMapm() {
      //  目的地经纬度,名称,地址
      console.log(this.getByselfProductInfo.sellerUser.latitude, this.getByselfProductInfo.sellerUser.longitude, this.getByselfProductInfo.sellerUser.sellerName, this.getByselfProductInfo.sellerUser.sellerAddress);
      openMap(this.getByselfProductInfo.sellerUser.latitude, this.getByselfProductInfo.sellerUser.longitude, this.getByselfProductInfo.sellerUser.sellerName, this.getByselfProductInfo.sellerUser.sellerAddress);
      // openMap(22.568089, 114.051769, '深圳康美总部仓库', '下梅林泰科路3号康美药业有限公司仓库');
    },
    // 加入优惠券
    addCoupon(couponId, securitiesInformationId, sellerUserId, counum) {
      if (this.isToken()) {
        console.log(couponId, securitiesInformationId, sellerUserId);
        let url = '/mall/coupon/addReceiveCouponRecords';
        let data = {
          couponId: couponId,
          securitiesInformationId: securitiesInformationId,
          sellerUserId: sellerUserId
        };
        javaAjax.post(url, data).then(res => {
          console.log(res);
          if (res.status === 200 && res.data.resultCode === '0') {
            Toast(res.data.msg);
            this.goodsDetail.productCoupon[counum].isState = 1;
            this.goodsDetail.productCoupon[counum].total++;
          } else {
            Toast(res.data.msg);
          }
        });
      }
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
  @import '../../styles/mixin.less';
  @headerHeight: 44px;
  @fff: #ffffff;
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
      border-bottom: 2px solid @green-color;
      color:@green-color;
    }
  }
  .goods-footer{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height: 45px;
    background-color:@fff ;
    box-shadow: 0 0px 20px rgb(219, 216, 216);
    a{
      width:28%;
      height:100%;
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
    a:nth-child(3){
      background-image: linear-gradient(-67deg, #24BEEF 0%, #00dbd5 100%), linear-gradient(#00dbd5, #00dbd5);
      // background-image: linear-gradient(-67deg,#0092ef 0%,#7b7ef1 100%),
      // linear-gradient( #0092ef,#0092ef);
    }
    a:nth-child(4){
      background-color: #fe4d57;
    }
    .goods-sline{
      width:22%;
      font-size:10px;
      color: #666;
    }
    .pharmacist {
      color: @green-color;
    }
  }
  .goods-footer a.no-click{
    width: 56%;
    background: #b2b2b2;
    .txt {
      font-size: 11px;
    }
  }
  // .goods-footer a:nth-child(3).no-click{
  //   border-right: 1px solid #ffffff;
  // }
  .goods-layout{
    .goods-content{
      padding: 44px 0 45px;
    }
     .goods-detail{
      padding-top: 44px;
    }
     .goods-detailins{
      padding-top: 44px;
    }
    .goods-eval{
      padding-top: 44px;
    }
  }
  .goods-cartAdd{
    position: fixed;
    bottom: 0;
    left:0;
    width:100%;
    height:100%;
  }
  .goods-cartAddOn{
    position: fixed;
    bottom: 0;
    left:0;
    width:100%;
    height:100%;
    background-color: #000000;
    opacity: 0.5;
    z-index:400;
  }
  .goods-gwc{
    position: fixed;
    bottom: 0;
    left:0;
    width:100%;
    background-color: #ffffff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    z-index: 200;
  }
  .goods-gwcClose{
    position: absolute;
    right:15px;
    top:10px;
    width:15px;
    height: 15px;
  }
  .goods-gwctop{
    height: 140px;
    border-bottom: 1px solid #e8e8e8;
    margin: 10px;
    display: flex;
    align-items:flex-end;
    li:nth-child(1){
      margin-right: 10px;
      margin-bottom: 10px;
      width: 107px;
      height: 107px;
      background-color: #eeeeee;
      border-radius: 5px;
      border: solid 1px #e3e3e3;
      overflow: hidden;
      img{
        width:107px;
        height: 107px;
      }
    }
    li:last-child{
      margin-bottom: 10px;
      h6{
        font-size: 16px;
        color: #ff4c56;
      }
      span{
        display: inline-block;
        margin-top:10px;
        font-size:12px;
        color: #333333;
      }
    }
  }
  .goods-gwcChoose{
    li:first-child{
      display: flex;
      justify-content: space-between;
      margin:19px 10px 0;
      span{
        font-size: 13px;
        color: #333333;
      }
      div{
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eefbfb;
        padding: 5px 10px;
        i{
          display: flex;
          width:10px;
          height: 10px;
          background: url("./img/pla_icon_addadss.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 2px;
        }
        span{
          font-size: 12px;
          color: #05d7d8;
        }
      }
    }
    li:not(:first-child){
      margin-top:15px;
      width:100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction:column ;
      .goods-liOn{
        width: 80%;
        height: 30px;
        background-color: #f6f6f6;
        border-radius: 15px;
        line-height: 30px;
        text-align: center;
        span{
          font-size: 13px;
          color: #333333;
        }
        i{
          font-size: 12px;
          color: #6e6e6e;
        }
      }
      h6{
        font-size: 12px;
        color: #888888;
        font-weight: normal;
      }
    }
    li:not(:first-child).goods-chooseOk{
      div.goods-liOn{
        background-color: #ffeff0;
        border-radius: 30px;
        border: solid 1px #ff838a;
        span,i{
          color: #f63e48;
        }
      }
    }
  }
  .goods-gwcNum{
    padding: 24px 10px 24px;
    display: flex;
    justify-content: space-between;
    li:last-child{
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      line-height: 24px;
      span{
        display: inline-block;
        width:19px;
        font-size: 20px;
        font-weight: normal;
        text-align: center;
        margin-left:8px;
      }
      span.goods-numCenter{
        width: 43px;
        background-color: #f5f5f5;
        border-radius: 2px;
        font-size: 12px;
        color: #333333;
        text-align: center;
      }
    }
  }
  .goods-gwcOk{
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;
    button{
      width: 80%;
      height: 100%;
      background-color: #00dbd5;
      border-radius: 15px;
      font-size:15px;
      color: #ffffff;
    }
  }
  .goods-gwcChoose li.goods-chooseIsBuy .goods-liOn{
    background-color: #f6f6f6;
  }
  .goods-gwcChoose li.goods-chooseIsBuy .goods-liOn span,.goods-gwcChoose li.goods-chooseIsBuy .goods-liOn i{
    color: #c5c5c5;
  }
  .yhj-title{
    width:100%;
    height:30px;
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #333333;
  }
  .yhj-list{
    width:100%;
    height: 280px;
    overflow-y: scroll;
    li{
      color: #ffffff;
      padding-left: 8px;
      padding-right: 8px;
      width:100%;
      height: 98px;
      display: flex;
      margin-top: 13px;
      >div{
        background-repeat:no-repeat;
        background-size:100% 100%;
        -moz-background-size:100% 100%;
        height: 100%;
      }
      >div:nth-child(1){
        background-image: url("./img/pla_icon_couponsleft@3x.png");
        width:31%;
        .yhj-money{
          margin-top:23px;
          display: flex;
          justify-content: center;
          align-items: baseline;
          i{
            font-size: 18px;
          }
          b{
            font-size: 35px;
          }
        }
        .yhj-man{
          font-size: 12px;
          margin-top: 13px;
          text-align: center;
        }
      }
      >div:nth-child(2){
        background-image: url("./img/pla_icon_couponsright@3x.png");
        width:79%;
        padding-left: 10px;
        position: relative;
        .yhj-ylImg{
          position: absolute;
          right:1px;
          top:1px;
          img{
            width:40px;
            height:33px;
          }
        }
        .yhj-name{
          margin-top:15px;
          font-size: 16px;
          color: #f63e48;
        }
        .yhj-use{
          font-size: 11px;
          color: #f63e48;
          margin-top: 7px;
        }
        .yhj-time{
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #555555;
          >div:nth-child(1){
            margin-top: 8px;
          }
        }
        .yhj-btn{
          margin-right: 10px;
          >div{
            width: 65px;
            height:24px;
            border-radius: 24px;
            font-size: 11px;
            /*padding: 2px 5px;*/
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .yhj-btnNno{
            background-color: #fc5f68;
            color: #ffffff;
          }
          .yhj-btnOk{
            border: solid 1px #aca6a7;
            color: #aca6a7;
          }
        }
      }
    }
  }
</style>

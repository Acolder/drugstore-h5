<template>
  <div class="has-header gray-background">
    <mt-header fixed title="提交订单">
      <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="drugstore-addr" v-if="orderInfo && orderInfo.getByselfOrder">
      <span class="top clearfix">
        <label class="left txt-border blue-txt">最近自提点</label>
        <span class="right txt-border" @click="openMaps">
          <img src="./img/icon-bxdh.png">
          <label>步行导航</label>
        </span>
      </span>
      <span class="drugstore-info display-box">
        <span class="box-flex left-box">
          <img src="./img/icon-kmyg.png">
          <label>{{goodsData.sellerUser.sellerName}}</label>
        </span>
      <span class="right-box">
          <img src="./img/icon-bx.png">
          <label v-if="distanceTxtTime">{{distanceTxtTime.hintTxt}}</label>
        </span>
      </span>
      <label class="addr">地址：{{goodsData.sellerUser.sellerAddress}}</label>
    </div>
    <div class="delivery-info" @click="goCheckAddr" v-else>
      <span class="name-phone clearfix" v-if="userInfo">
        <label class="name">收货人：{{userInfo.name}}</label>
        <label>{{userInfo.phone}}</label>
      </span>
      <span class="com-txt" v-else>点击补全收货人信息</span>
      <label class="mint-cell-allow-right addr">收货地址：{{addrTxt}}</label>
    </div>
    <div class="mgb10 tenant-box" v-if="goodsData">
      <div class="goods-way-box">
        <span>
          <label class="name">{{goodsData.sellerUser.sellerName}}</label>
          <label class="way" v-html="orderInfo.getFastOrder ? '速达' : orderInfo.getCommonOrder ? '商城' : orderInfo.getByselfOrder ? '自提' : orderInfo.transnationalOrder ? '跨境' : ''"></label>
        </span>
        <label class="right time" v-html="orderInfo.getFastOrder ? '30分钟速达' : orderInfo.getCommonOrder ? '3天送达' : orderInfo.transnationalOrder ? '7天送达' : ''"></label>
      </div>
      <ul class="drug-lists">
        <li class="display-box" v-for="durgList in goodsData.products" :key="durgList.productId">
          <span class="img-box">
            <img :src="durgList.productMainImage" />
          </span>
          <span class="box-flex drug-info">
            <span class="drug-top display-box">
              <p class="box-flex drug-name">{{durgList.productName}}</p>
              <label class="left price">￥{{Number(durgList.productMarkprice).toFixed(2)}}</label>
            </span>
          <span class="bottom clearfix">
              <label class="left dosage">{{durgList.productSpecification}}</label>
              <label class="right num">×{{durgList.quantity}}</label>
            </span>
          </span>
        </li>
      </ul>
    </div>
    <div class="drug-info-box">
      <div class="mint-cell-allow-right drug-infos clearfix">
        <label class="left">优惠券</label>
        <label class="right" style="color: #0ccdd3" v-if="couponShow == 1"  @click="goCoupon"> {{CouponMsg}}</label>
        <label class="right" style="color: #0ccdd3" v-if="couponShow == 2"  @click="goCoupon"> 有可用优惠券</label>
        <label class="right" v-if="couponShow == 3"  @click="goCoupon"> 无可用优惠券</label>
      </div>
      <router-link to="/shopCart/invoice" class="mint-cell-allow-right drug-infos clearfix" v-if="orderInfo && orderInfo.getCommonOrder">
        <label class="left">发票信息</label>
        <label class="right">{{invoiceInfo ? invoiceInfo.invoiceTitle : '不开发票'}}</label>
      </router-link>
      <div class="drug-infos">
        <span class="info-box clearfix">
          <label class="left">商品金额</label>
          <label class="right">￥{{(totalPrice - postage + couponPrice).toFixed(2)}}</label>
        </span>
        <span class="info-box freight clearfix">
          <label class="left">运费</label>
          <label class="right">￥{{Number(postage).toFixed(2)}}</label>
        </span>
        <span class="info-box freight clearfix">
          <label class="left">优惠券</label>
          <label class="right" style="color:#ff5d65 ">-￥{{Number(couponPrice).toFixed(2)}}</label>
        </span>
      </div>
      <div class="drug-infos clearfix" style='padding-bottom:40px;'>
        <label class="left">金额合计</label>
        <label class="right price">￥{{totalPrice.toFixed(2)}}</label>
      </div>
    </div>
    <div class="amount-bottom-box">
      <span class="left sum">合计:
        <label v-if="orderInfo">￥{{totalPrice.toFixed(2)}}</label>
      </span>
      <label class="right submit" @click="submitOrder">提交订单</label>
    </div>
  </div>
</template>
<script>
import { Header, Toast } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
import { getCoordinate, openMap, distanceByLnglat, distanceTime, locationName } from '@/api/coordinate';
import { goPay } from '@/api/goPay';
import { goLogin } from '@/api/user';
export default {
  data() {
    return {
      orderInfo: null,
      goodsData: null,
      totalPrice: 0,
      postage: 0,
      couponPrice: 0,
      userInfo: null,
      locationCoor: null,
      addrTxt: '',
      resData: {},
      addressInfo: null,
      invoiceInfo: null,
      subFlg: true,
      getByself: null,
      getFast: null,
      getCommon: null,
      transnational: null,
      distanceTxtTime: null,
      noGoods: false,
      coupon: 0,
      couponId: 0,
      securitiesInformationId: 0,
      receiveId: 0,
      couponShow: 3,
      CouponMsg: ''
    };
  },
  components: {
    'mt-header': Header,
  },
  mounted() {
    this.getOrderInfo();
    this.getAddrInfo();
    this.getInvoice();
  },
  methods: {
    // 初始化获取信息
    getOrderInfo() {
      // 查看地址栏是否传输优惠券选择信息
      this.couponId = this.$route.query.couponId ? this.$route.query.couponId : 0;
      this.securitiesInformationId = this.$route.query.securitiesInformationId ? this.$route.query.securitiesInformationId : 0;
      this.receiveId = this.$route.query.receiveId ? this.$route.query.receiveId : 0;
      this.CouponMsg = this.$route.query.msg ? this.$route.query.msg : 0;
      // 取订单信息
      this.orderInfo = JSON.parse(sessionStorage.getItem('shopCartOrder'));
      let orderInfo = this.orderInfo;
      if (orderInfo) {
        let getByselfOrder = orderInfo.getByselfOrder;
        let getCommonOrder = orderInfo.getCommonOrder;
        let getFastOrder = orderInfo.getFastOrder;
        let transnationalOrder = orderInfo.transnationalOrder;
        this.goodsData = getByselfOrder ? getByselfOrder : getCommonOrder ? getCommonOrder : getFastOrder ? getFastOrder : transnationalOrder ? transnationalOrder : null;
        console.log(this.goodsData, '生成订单商品详情');
        this.totalPrice = this.goodsData ? Number(this.goodsData.totalPrice) : 0;
        this.postage = this.goodsData ? Number(this.goodsData.postage) : 0;
        this.couponPrice = this.goodsData ? Number(this.goodsData.couponPrice) : 0;
        this.coupon = this.goodsData.productCoupon.length > 0 ? this.goodsData.productCoupon : 0;
        sessionStorage.setItem('OrderCoupon', JSON.stringify(this.coupon));
        if (this.CouponMsg && this.couponId) {
          // 有选择优惠券
          this.couponShow = 1;
        } else if (!this.CouponMsg && this.coupon) {
          // 有优惠卷没选择
          this.couponShow = 2;
        } else if (!this.coupon) {
          // 无优惠券
          this.couponShow = 3;
        }
        if (getByselfOrder) {
          this.getDistanceTime();
        }
      }
    },
    // 获取地址信息
    getAddrInfo() {
      let checkAddress = JSON.parse(sessionStorage.getItem('selectedAddress'));
      let orderInfo = this.orderInfo;
      let addressInfo = checkAddress ? checkAddress : orderInfo ? (orderInfo.defultAddress ? orderInfo.defultAddress : null) : null;
      console.log(checkAddress, '2.', (orderInfo ? orderInfo.defultAddress : null));
      this.addressInfo = addressInfo;
      if (addressInfo) {
        this.userInfo = {
          name: addressInfo.addressName,
          phone: addressInfo.addressPhone
        };
        this.addrTxt = addressInfo.addressProvince + addressInfo.addressCity + addressInfo.addressDistrict + addressInfo.addressDetail + addressInfo.addressNum;
      } else {
        this.locationCoor = JSON.parse(sessionStorage.getItem('coordinate'));
        if (this.locationCoor) {
          this.getAddrName();
        } else {
          getCoordinate(res => {
            if (res.latitude) {
              this.locationCoor = res;
              this.getAddrName();
            }
          });
        }
      }
    },
    // 获取发票信息
    getInvoice() {
      let invoiceInfos = JSON.parse(sessionStorage.getItem('invoice'));
      if (invoiceInfos && invoiceInfos.invoiceInfo) {
        this.invoiceInfo = {
          invoiceTitle: invoiceInfos.invoiceTitle,
          invoiceType: invoiceInfos.invoiceType,
          content: invoiceInfos.content,
          taxNum: invoiceInfos.payTaxes
        };
      }
    },
    // 选择收货地址
    goCheckAddr() {
      let name = this.$route.name;
      this.$router.push({
        path: '/addressMgr/select',
        query: { from: name }
      });
      let orderInfo = this.orderInfo;
      let getFast = '';
      let lon = 0;
      let lat = 0;
      if (orderInfo && orderInfo.getFastOrder) {
        let sellerUser = orderInfo.getFastOrder.sellerUser;
        getFast = sellerUser.sellerUserId;
        lon = sellerUser.latitude;
        lat = sellerUser.longitude;
      }
      let addressArg = {
        getFast: getFast,
        lon: lon,
        lat: lat
      };
      sessionStorage.setItem('addressArg', JSON.stringify(addressArg));
    },
    // 根据当前定位获取信息
    getAddrName() {
      console.log(this.locationCoor);
      let locationCoor = this.locationCoor;
      locationName(locationCoor.latitude, locationCoor.longitude, res => {
        console.log(res, '获取的地址信息');
        if (res.result) {
          let result = res.result;
          this.addrTxt = result.formatted_address ? result.formatted_address : '';
        }
      });
    },
    // 步行导航
    openMaps() {
      if (this.orderInfo && this.orderInfo.getByselfOrder) {
        let sellerUser = this.orderInfo.getByselfOrder.sellerUser;
        let latitude = sellerUser.latitude; // 目的地纬度
        let longitude = sellerUser.longitude; // 目的地经度
        let name = sellerUser.sellerName;
        let addr = sellerUser.sellerAddress;
        openMap(latitude, longitude, name, addr);
      }
    },
    // 计算时间距离
    getDistanceTime() {
      getCoordinate((res) => {
        if (this.orderInfo && this.orderInfo.getByselfOrder && res.latitude) {
          let sellerUser = this.orderInfo.getByselfOrder.sellerUser;
          let latitude1 = res.latitude; // 当前纬度
          let longitude1 = res.longitude; // 当前经度
          let latitude2 = sellerUser.latitude; // 目的地纬度
          let longitude2 = sellerUser.longitude; // 目的地经度
          this.distance = distanceByLnglat(longitude1, latitude1, longitude2, latitude2);
          this.distanceTxtTime = distanceTime(this.distance);
        }
      });
    },
    // 提交订单
    submitOrder(msg) {
      let addressInfo = this.addressInfo;
      let orderInfo = this.orderInfo;
      if ((!addressInfo || !addressInfo.addressId) && !orderInfo.getByselfOrder) {
        Toast('请补全地址信息');
        return false;
      }
      if (orderInfo.getByselfOrder) {
        this.orderContent(orderInfo.getByselfOrder, 'self');
      }
      if (orderInfo.getFastOrder) {
        this.orderContent(orderInfo.getFastOrder, 'fast');
      }
      if (orderInfo.getCommonOrder) {
        this.orderContent(orderInfo.getCommonOrder, 'common');
      }
      if (orderInfo.transnationalOrder) {
        this.orderContent(orderInfo.transnationalOrder, 'tran');
      }
      let url = '/mall/order/submitOrder';
      let data = {
        getByself: this.getByself,
        getFast: this.getFast,
        getCommon: this.getCommon,
        transnational: this.transnational,
        orderSource: 3,
        version: '3.1.0'
      };
      // return false;
      console.log(JSON.stringify(data), '参数');
      if (this.subFlg) {
        this.subFlg = false;
        javaAjax.post(url, data).then((res) => {
          this.subFlg = true;
          if (res.status === 200) {
            let resData = res.data;
            if (resData.resultCode === '0') {
              let resultData = resData.resultData[0];
              let payMsg = {
                orderList: resultData.orderId,
                orderAmount: resultData.orderAmount,
                sellerName: this.goodsData.sellerUser.sellerName,
                payType: 'product'
              };
              goPay(payMsg);
            } else if (resData.resultCode === '-2') {
              goLogin();
            } else {
              Toast(resData.msg);
            }
          }
        });
      }
    },
    // 提交信息
    orderContent(order, type) {
      let products = [];
      let addressId = this.addressInfo ? Number(this.addressInfo.addressId) : '';
      order.products.forEach(res => {
        let product = {
          productId: res.productId,
          sellerUserId: res.sellerUserId,
          quantity: res.quantity,
          cartId: res.cartId,
          recommendId: res.recommendId
        };
        products.push(product);
      });
      let con = {
        addressId: addressId,
        invoiceInfo: this.invoiceInfo,
        products: products,
        isOtc: order.isOtc,
        couponId: this.couponId ? this.couponId : 0,
        securitiesInformationId: this.securitiesInformationId ? this.securitiesInformationId : 0,
        receiveId: this.receiveId ? this.receiveId : 0
      };
      if (type === 'self') {
        this.getByself = con;
      }
      if (type === 'fast') {
        this.getFast = con;
      }
      if (type === 'common') {
        this.getCommon = con;
      }
      if (type === 'tran') {
        this.transnational = con;
      }
    },
    // 优惠券信息跳转
    goCoupon() {
      this.$router.push({ path: '/submitOrder/chooseCoupon' });
    }
  },
  // destroyed() {
  //   sessionStorage.removeItem('selectedAddress');
  // }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';
.has-header {
  height: 100%;
  margin-bottom: 40px;
}

.drugstore-addr {
  padding: 10px 12px 8px;
  border-bottom: @border-line;
  background: @white-color;
  margin-bottom: 10px;

  img {
    float: left;
  }

  .top {
    .txt-border {
      font-size: 11px;
      text-align: center;
      padding: 2px 5px;
      border-radius: 4px;
    }

    .blue-txt {
      color: @green-color;
      border: solid 1px @green-color;
    }

    .right {
      color: @black-color;
      border: solid 1px @black-color;
    }

    img {
      width: 12px;
      height: 14px;
      margin: 4px 4px 0 0;
    }
  }

  .drugstore-info {
    line-height: 20px;
    margin: 10px 0 2px;

    .left-box {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 8px;

      img {
        width: 16px;
        height: 14px;
        margin: 2px 6px 0 0;
      }

      label {
        float: left;
        font-size: 15px;
        max-width: calc(100% - 50px);
        .aline-text-overflow(22px);
        line-height: 20px;
      }
    }

    .right-box {
      img {
        width: 11px;
        height: 15px;
        margin: 3px 6px 0 0;
      }

      label {
        font-size: 14px;
      }
    }
  }

  .addr {
    line-height: 24px;
    font-size: 14px;
  }
}

// .icon{
//   display: inline-block;
//   background: url("./img/order.png");
//   background-size: 48px;
//   vertical-align: middle;
// }
// .mall-way {
//   .icon{
//     height: 16px;
//     background-position: 0 0;
//   }
// }
// .promptly-way{
//   .icon{
//     height: 18px;
//     background-position: -21px 0;
//     background-size: 45px;
//   }
// }
.delivery-info {
  display: block;
  padding: 15px 12px 12px;
  font-size: 15px;
  line-height: 24px;
  // border-bottom: @border-line;
  margin-bottom: 10px;
  background: @white-color;

  .com-txt {
    display: block;
    color: @color999;
    margin-bottom: 3px;
  }

  // .d-tlt{
  //   display: block;
  //   color: @green-color;
  // }
  .name-phone {
    .name {
      display: inline-block;
      margin-right: 20px;
    }
  }

  .addr {
    position: relative;
    display: block;
    width: 100%;
    padding-right: 10px;

    &:after {
      top: 13px;
      right: 2px;
      .cell-allow-1px(9px, @black-color);
    }
  }
}

.tenant-box {

  // .t-icon{
  //   width: 17px;
  //   margin: 14px 5px 0 3px;
  // }
  // .sc-icon{
  //   width: 16px;
  //   margin-right: 6px;
  // }
  .goods-way-box {
    height: 44px;
    line-height: 44px;
    border-bottom: @border-line;
    background: @white-color;
    .padding-12px;

    .icon {
      width: 22px;
    }

    .name {
      font-size: 15px;
      // padding: 0 3px;
    }

    .way {
      .border-radius-btn(19px, 4px, @green-color, 4px, 11px);
      line-height: 17px;
      margin-left: 11px;
    }

    .time {
      color: @green-color;
    }
  }

  .drug-lists {
    background: @white-color;

    li {
      padding: 12px 12px 10px;
      border-bottom: @border-line;

      .img-box {
        display: block;
        width: 85px;
        height: 85px;
        padding: 10px;
        text-align: center;
        border: @border-line;
        margin-right: 12px;

        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }

      .drug-info {
        margin-top: 22px;

        .drug-top {

          // .transnational{
          //   float: left;
          //   .background-radius-btn(18px, 5px, @green-color, 5px,12px);
          //   line-height: 16px;
          //   margin-right: 5px;
          // }
          .drug-name {
            font-size: 15px;
            line-height: 14px;
            margin: 0 6px 3px 0;
            .aline-text-overflow(18px);
            white-space: normal;
          }

          .price {
            font-size: 14px;
            color: @red-color;
          }
        }

        .bottom {
          .dosage {
            line-height: 16px;
            font-size: 12px;
            color: @color999;
          }
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.drug-info-box {
  .drug-info-box.mgb40 {
    margin-bottom: 40px;
  }

  .no-freight .drug-infos {
    height: 36px;

    .freight {
      display: none;
    }
  }

  .drug-infos {
    position: relative;
    display: block;
    // height: 72px;
    line-height: 36px;
    font-size: 15px;
    padding: 0 12px;
    border-bottom: @border-line;
    background: @white-color;

    .left {
      color: @black-color;
    }

    .right {
      color: @color999;
    }

    .price {
      color: @red-color;
    }

    .info-box {
      display: block;
      height: 36px;
    }
  }

  .drug-infos:last-child {
    border: none;
  }

  .drug-infos.mint-cell-allow-right {
    height: 36px;
    padding-right: 33px;

    &:after {
      right: 16px;
      .cell-allow-1px(9px, @black-color);
    }
  }
}

.amount-bottom-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  border-top: @border-line;
  background: @white-color;

  .sum {
    padding-left: 12px;
    font-size: 16px;

    label {
      color: @red-color;
      margin-right: 10px;
    }
  }

  .submit {
    padding: 0 30px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    background: @green-color;
  }
}

// .delivery-info{
//   margin-bottom: 10px;
// }
.delivery-way {
  .align-center(fixed);
  width: 80%;
  padding: 18px;
  border-radius: 5px;
  background: #fff;

  .addr-hint {
    display: block;
    text-align: left;
    font-size: 15px;
    font-weight: bold;
  }

  .hint-txt {
    display: block;
    font-size: 14px;
    margin-top: 12px;
  }

  .btn-box {
    display: block;
    font-size: 14px;
    text-align: center;
    margin-top: 20px;

    .btn {
      float: right;
      font-size: 12px;
      color: #019C72;
      margin-left: 20px;
    }
  }
}

</style>

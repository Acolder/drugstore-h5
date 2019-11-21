<template>
  <div class="pay-boxs has-header">
    <mt-header fixed title="支付">
      <!-- <router-link to="/submitOrder/multWayDelivery" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link> -->
      <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="money-num" v-if="payMsg">￥{{Number(payMsg.orderAmount).toFixed(2)}}</div>
    <div class="count-down-box" v-if="payMsg && payMsg.payType === 'product'">
      订单已提交，请您在30分钟内完成支付，剩余支付时间
      <v-count-down :surplus-time="surplusTime" @timeEnd="goOrderDetail" v-if="surplusTime"></v-count-down>，超时订单将会自动关闭。
    </div>
    <div class="gray-background pay-box">
      <label class="white-background txt">选择支付方式</label>
      <span class="white-background way">
        <span class="left">
          <img class="icon" src="./img/icon-weixin.png" />
          <label>微信支付</label>
        </span>
        <div class="drug-check right">
          <input type="checkbox" checked class="mint-checkbox-input">
          <i class="mint-checkbox-core"></i>
        </div>
      </span>
    </div>
    <div class="pay-btn" @click="goPayment">确认支付</div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
import ajax from '@/utils/ajax';
/* eslint-disable */
import wx from 'weixin-js-sdk';
import { goPay } from '@/api/goPay';
import { getQueryString } from '@/utils/index';
import countDown from './../../components/countDown/index.vue';
import { goLogin } from '@/api/user';
export default {
  data() {
    return {
      payMsg: null,
      surplusTime: 0
    };
  },
  mounted() {
    this.getInit();
  },
  components: {
    'v-count-down': countDown
  },
  methods: {
    getInit() {
      let payMsg = JSON.parse(sessionStorage.getItem('payMsg'));
      let payType = payMsg.payType;
      let orderId = payMsg.orderList;
      let fromCondition = sessionStorage.getItem('from-condition');
      this.payMsg = payMsg;
      if (payType === 'product') {
        this.getSurplusTime(orderId);
      }
      if (fromCondition === '1') {
        sessionStorage.removeItem('from-condition');
        this.goOrderDetail();
      }
    },
    // 获取支付剩余时间
    getSurplusTime(orderId) {
      javaAjax.post('/mall/order/queryOrderSurplusTime', {
        orderId: orderId
      }).then((res) => {
        if (res.status === 200 && res.data.resultCode === '0') {
          this.surplusTime = res.data.resultData.surplusTime;
          if (this.surplusTime === 0) {
            this.goOrderDetail();
          }
        }
      });
    },
    // 订单详情
    goOrderDetail() {
      // payType: product(商品) prescription(处方) jinmu(脉诊仪)
      let payType = this.payMsg.payType;
      let orderId = this.payMsg.orderList;
      let wxUnionId = sessionStorage.getItem('wxUnionId');
      let hasYhl = wxUnionId ? false : true;  // 是药葫芦还是微信药柜场景
      if (payType === 'product') {
        // this.$router.push({
        //   path: '/order/detail', query: { orderId: orderId }
        // });
        window.location.href = `${process.env.WEB_HOST}/order/detail?orderId=${orderId}`;
      }
      if (payType === 'prescription' && hasYhl) {
        sessionStorage.setItem('formPayments', 'all');
        this.$router.push({
          path: '/prescription/index', query: { order_id: orderId }
        });
      }
      if (payType === 'prescription' && !hasYhl) {
        window.location.href = `${process.env.WEB_HOST}/prescriptionwx/detail?orderId=${orderId}`;
      }
      if (payType === 'jinmu') {
        // 因为支付id不是订单id   所以需要取出之前保存user以及订单id 用于查询订单详情
        let user = JSON.parse(sessionStorage.getItem('equipmentUser'));
        let id = JSON.parse(sessionStorage.getItem('equipmentId'));
        this.$router.push('/equipment/equipmentMyListDetails?user=' + user + '&id=' + id);
      }
    },
    // 去支付
    goPayment() {
      this.getWxConfig().then(openId => {
        return this.requestPay(openId);
      }).then(resData => {
        this.wxPay(resData);
      }).catch(function (error) {
        Toast(JSON.stringify(error));
      })
    },
    // 获取支付信息
    getWxConfig() {
      return new Promise((resolve, reject) => {
        let payMsg = this.payMsg;
        let thisUrl = window.location.href;
        let code = getQueryString('code');
        let _this = this;
        ajax.post('/api/system/getWxJsConfig', {
          url: thisUrl,
          appId: 'AppId',
          appSecret: 'Secret',
          code: code
        }).then((res) => {
          if (res.status === 200 && res.data.code === 0) {
            resolve(res.data.data.openid);
          }
          else {
            reject(res.data);
          }
        });
      })
    },
    // 请求支付接口
    requestPay(openId) {
      return new Promise((resolve, reject) => {
        let payMsg = this.payMsg;
        let url = '/api/pay/wxpay';
        if (openId) {
          let data = {
            OrderId: payMsg.orderList,
            PayFee: payMsg.orderAmount,
            Category: payMsg.payType,
            StoreName: payMsg.sellerName,
            OpenId: openId,
            PayType: '2',
          };
          ajax.post(url, data).then((res) => {
            if (res.status === 200) {
              let resData = res.data;
              if (resData.code === 0) {
                resolve(resData.data);
              }
              else if (resData.code === -2) {
                const _this = this;
                let payMsg = JSON.parse(sessionStorage.getItem('payMsg'));
                let orderType = payMsg.payType; // 订单类型
                if (orderType == 'jinmu') { // 脉诊仪
                  _this.$router.push('/equipment/login');
                  return false;
                }
                goLogin();
              }
              else {
                Toast(resData.message);
              }
            }
            else {
              reject(res);
            }
          });
        }
      });
    },
    // 请求微信支付
    wxPay(resData) {
      let _this = this;
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
      function onBridgeReady() {
        /* eslint-disable */
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'timeStamp': resData.timestamp,
            'nonceStr': resData.nonce_str,
            'package': 'prepay_id=' + resData.prepay_id,
            'signType': 'MD5',
            'paySign': resData.sign,
            'appId': resData.appid
          },
          function (res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              _this.$router.push({ path: '/payment/pay-success' });
            }
            else {
              // alert(JSON.stringify(res));
              _this.$router.push({ path: '/payment/pay-error' });
            }
          }
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/mixin.less";
.height(@size) {
  height: @size;
  line-height: @size;
}
.pay-boxs{
  height: 100%;
  background: @white-color;
}
.money-num{
  font-size:26px;
  text-align:center;
  padding: 36px 0 30px;
  // label{
  //   font-size: 26px;
  // }
}
.count-down-box{
  padding: 0 20px;
  line-height: 22px;
  font-size: 15px;
}
.pay-box {
  width: 100%;
  padding-top: 10px;
  margin: 40px 0 50px;
  font-size: 15px;
  .txt {
    display: block;
    .height(40px);
    padding: 0 12px;
    // border-bottom: @border-line;
  }
  .way {
    display: block;
    .height(48px);
    line-height: 42px;
    padding: 0 12px;
    border-top: @border-line;
    border-bottom: @border-line;
    .icon {
      width: 26px;
      height: 26px;
      margin-right: 6px;
      vertical-align: middle;
    }
  }
}
.pay-btn {
  display: block;
  font-size: 16px;
  .height(40px);
  color: @white-color;
  text-align: center;
  border-radius: 5px;
  background: @green-color;
  margin: 0 12px;
}
</style>


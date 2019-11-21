<template>
  <div class="equipmentPayment">
    <mt-header title="支付">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="equipmentPaymentMain">
      <div class="money">￥{{payInfo.pay_money}}</div>
      <div class="mode">
        <div>
          <img class="weixin" src="./img/icon-weixin.png" />
          <div>微信支付</div>
        </div>
        <img class="icon" src="./img/icon_cg.png" />
      </div>
      <div class="equipment-btn" @click="goPayment">确认支付</div>
    </div>
  </div>
</template>
<script>
import { getQueryString } from '@/utils/index';
import wxjs from '@/utils/wxjsInterface';
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      weixincode: '',
      payInfo: {},
      // 微信js sdk 实例对象
      wx: null,
      // 请求返回的微信config对象
      wxResponseConfig: {},
      payData: {}
    };
  },
  methods: {
    back() {
      this.$router.push('/equipment/index');
    },
    // 确认
    goPayment() {
      console.log('确认');
      console.log('请求返回的微信config对象', this.wxResponseConfig);
      console.log('支付的信息', this.payInfo);
      let data = {
        PayType: '2',
        Category: 'jinmu',
        StoreName: '',
        PayFee: this.payInfo.pay_money,
        OrderId: this.payInfo.pay_id,
        OpenId: this.wxResponseConfig.openid,
      };
      console.log('参数', data);
      ajax.post(`/api/pay/wxpay`, data).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          console.log('成功');
          this.payData = res.data.data;
          this.weixinPay(this.payData);
        }
      });
    },
    // 请求微信支付
    weixinPay(resData) {
      console.log('请求微信支付', resData);
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
            console.log(res);
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              console.log('付款成功');
            }
            else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              console.log('付款取消');
            } else {
              console.log(res);
            }
          }
        );
      }
    },
  },
  created() {
    // 需要支付的订单数据
    this.payInfo = JSON.parse(sessionStorage.getItem('equipmentPay'));
    console.log('订单数据', this.payInfo);
    let _self = this;
    let code = getQueryString('code');
    // 微信code值
    _self.weixincode = code;
    console.log('微信code', this.weixincode);
    wxjs.init(code).then((res) => {
      console.log('微信', res);
      _self.wx = res.wx;
      console.log('微信js sdk 实例对象', _self.wx);
      _self.wxResponseConfig = res.wxconfig;
      console.log('微信config对象', _self.wxResponseConfig);
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/mixin.less";
.equipmentPayment{
  padding-top: 0.1px;
  .equipmentPaymentMain{
    margin-top: 44px;
    .money{
      height: 160px;
      line-height: 160px;
      text-align: center;
    }
    .mode{
      height: 50px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      >div{
        height: 50px;
        display: flex;
        align-items: center;
        }
      .weixin{
        width: 26px;
        height: 26px;
        margin-right: 10px;
      }
      .icon{
        width: 20px;
        height: 20px;
      }
    }
    .equipment-btn{
      margin-top: 20px;
      width: 100%;
      height: 44px;
      line-height: 44px;
      text-align: center;
      color: #fff;
      background: #0ccdd3;
    }
  }
}
</style>
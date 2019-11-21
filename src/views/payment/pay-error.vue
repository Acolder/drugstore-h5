<template>
  <div class="has-header">
    <mt-header fixed title="支付结果">
      <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <i class="mint-toast-icon mintui mintui-field-error pay-error-icon"></i>
    <p class="pay-tips">支付失败，请重新支付！</p>
    <div class="btn-group">
      <mt-button type="primary" size="large" @click="rePay">继续支付</mt-button>
      <mt-button type="default" class="default-btn" size="large" @click="gotoIndex" v-if="hasYhl">返回首页</mt-button>
    </div>
  </div>
</template>

<script>
import { Header, Button } from 'mint-ui';
import { goPay } from '@/api/goPay';
export default {
  name: 'pay-error',
  data() {
    return {
      hasYhl: true  // 是药葫芦还是微信药柜场景
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button
  },
  mounted() {
    this.getInit();
    sessionStorage.setItem('from-condition', '1');
  },
  methods: {
    getInit() {
      let wxUnionId = sessionStorage.getItem('wxUnionId');
      this.hasYhl = wxUnionId ? false : true;
    },
    gotoIndex() {
      const _this = this;
      let payMsg = JSON.parse(sessionStorage.getItem('payMsg'));
      let orderType = payMsg.payType; // 订单类型
      if (orderType === 'jinmu') { // 脉诊仪
        sessionStorage.removeItem('from-condition');
        _this.$router.push('/equipment/index');
        return false;
      }
      sessionStorage.removeItem('from-condition');
      this.$router.push({ path: '/' });
    },
    // 继续支付
    rePay() {
      sessionStorage.removeItem('from-condition');
      let payMsg = JSON.parse(sessionStorage.getItem('payMsg'));
      goPay(payMsg);
    }
  }
};
</script>

<style lang="less" scoped>
  @color33: #333;
  @color99: #999;
  .pay-error-icon {
    height: 50px;
    font-size: 60px;
    color: @color99;
    margin-top: 80px;
  }
  .pay-tips {
    text-align: center;
    font-size: 17px;
    color: @color33;
  }
  .btn-group {
    padding: 0 10px;
    margin-top: 80px;
    button {
      margin: 10px 0;
      &.default-btn {
        color: @color99;
      }
    }
  }
</style>

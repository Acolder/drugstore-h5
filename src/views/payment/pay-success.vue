<template>
  <div class="has-header">
    <mt-header fixed title="支付结果">
      <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <i class="mint-toast-icon mintui mintui-field-success pay-success-icon"></i>
    <p class="pay-tips">支付成功</p>
    <div class="btn-group">
      <mt-button type="primary" size="large" @click="gotoOrder">查看订单</mt-button>
      <div @click="goIndex">
        <mt-button type="default" size="large" v-if="hasYhl">返回首页</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Header, Button } from 'mint-ui';
export default {
  name: 'pay-success',
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
    // 查看订单
    gotoOrder() {
      // const _this = this;
      let payMsg = JSON.parse(sessionStorage.getItem('payMsg'));
      let orderType = payMsg.payType; // 订单类型
      let orderId = payMsg.orderList; // 订单id
      sessionStorage.removeItem('from-condition');
      if (orderType === 'product') { // 商品
        // this.$router.push({
        //   path: '/order/detail',
        //   query: { orderId: orderId }
        // });
        window.location.href = `${process.env.WEB_HOST}/order/detail?orderId=${orderId}`;
      } else if (orderType === 'prescription' && this.hasYhl) { // 处方
        sessionStorage.setItem('formPayments', 'yes');
        this.$router.push({
          path: '/prescription/index',
          query: { order_id: orderId }
        });
      } else if (orderType === 'prescription' && !this.hasYhl) { // 处方(微信药柜场景)
        // this.$router.push({
        //   path: '/prescriptionwx/detail', query: { orderId: orderId }
        // });
        window.location.href = `${process.env.WEB_HOST}/prescriptionwx/detail?orderId=${orderId}`;
      } else if (orderType === 'jinmu') { // 脉诊仪
        let user =  JSON.parse(sessionStorage.getItem('equipmentUser'));
        let id =  JSON.parse(sessionStorage.getItem('equipmentId'));
        this.$router.push('/equipment/equipmentMyListDetails?user=' + user + '&id=' + id);
      }
    },
    goIndex() {
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
    }
  }
};

</script>
<style lang="less" scoped>
@color33: #333;
@color99: #999;
@color-green: #2AA515;

.pay-success-icon {
  height: 50px;
  font-size: 60px;
  color: @color-green;
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

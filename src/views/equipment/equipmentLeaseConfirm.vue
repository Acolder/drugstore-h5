<template>
<div class="equipmentConfirm">
  <mt-header title="确认订单">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="equipmentConfirmMain">
    <div class="form-item">收货信息</div>
    <div class="orderAddress">
      <img src="./imgs/icon_bx.png">
      <div class="orderAddress-txt">
        <div class="orderAddress-top">
         <!-- 该收获人为 需要寄过来的位置（用户） -->
          <p class="name">收货人：{{orderData.consignee_name}}</p>
          <p>{{orderData.consignee_phone}}</p>
        </div>
        <div class="orderAddress-bot">
          地址：<span>{{orderData.consignee_address}}</span> <span>{{orderData.consignee_detail_address}}</span>
        </div>
      </div>
    </div>
    <div class="line10"></div>
    <div class="form-item">押金</div>
    <div class="form-item">
      <p>总押金</p>
      <p>￥{{orderData.pay_money}}</p>
    </div>
    <div class="tips">
      押金将在设备归还后原路返回至您的账户。
    </div>
    <div class="form-item">租借须知</div>
    <div class="notice">
      <p>1、押金在设备归还后自动原路退还。</p>
      <p>2、租金在归还设备时支付。</p>
      <p>3、使用天数将在确认收货后第二天开始计算。</p>
      <p>4、返还设备的运费需用户自行承担。</p>
      <p>5、最少租用时间为7天，少于7天，租金将按7天计算</p>
    </div>
    <div class="agreement">
      <!--点击切换是否接受用户协议-->
      <img src="./imgs/icon_cg.png" alt="" @click="changTabs"  v-if="isShow">
      <img src="./imgs/icon_n_swmr.png" alt="" @click="changTabs" v-else>
      我已阅读并同意<span @click="accept">《脉诊仪借还协议》</span>
    </div>
  </div>
   <!--用户协议组件-->
  <div class="userpro-wrapper" v-show="userAgreement">
    <user-protocol @handle='accept'></user-protocol>
  </div>
  <div class="equipment-btn" :class="bgColor?'': 'huisi'" @click="equipmentSub">订单支付</div>
</div>
</template>

<script>
// import wxjs from '@/utils/wxjsInterface';
import { goPay } from '@/api/goPay';
// 组件用户协议
import equipmentAgreement from './equipmentAgreement.vue';
import ajax from '@/utils/ajax';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      id: this.$route.query.id ? this.$route.query.id : '',
      user: this.$route.query.user ? this.$route.query.user : '',
      // 是否同意协议 默认为true
      isShow: false,
      bgColor: false,
      // 用户协议
      userAgreement: false,
      // 订单的支付信息
      orderData: {},
      goToPay: false,
    };
  },
  components: {
    // 组件用户协议
    'user-protocol': equipmentAgreement
  },
  methods: {
    // 通过订单ID获取确认信息及支付数据
    getOrderData() {
      ajax.get(`/api/borrow/GetPayDepositData/` + this.id).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          this.orderData = res.data.data;
          this.goToPay = true;
          // 将设备的需要支付的押金信息保存
          sessionStorage.setItem('equipmentPay', JSON.stringify(res.data.data));
          // 保存user以及订单id 用于后面查询订单详情
          sessionStorage.setItem('equipmentUser', JSON.stringify(res.data.data.borrow_account));
          sessionStorage.setItem('equipmentId', JSON.stringify(this.id));
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 500
          });
        }
      });
    },
    // 接受协议点击事件
    changTabs() {
      if (this.isShow === true) {
        this.isShow = false;
        this.bgColor = false;
      } else {
        this.isShow = true;
        this.bgColor = true;
      }
      console.log(this.isShow, this.bgColor);
    },
    // 点击协议
    accept() {
      this.userAgreement = !this.userAgreement;
      console.log('点击协议');
    },
    // 订单支付
    equipmentSub() {
      console.log('是否接受协议:', this.isShow, '是否可以去支付:', this.goToPay);
      if (!this.isShow) {
        return false;
      }
      if (!this.goToPay) {
        return false;
      }
      console.log('可以去支付了');
      // 保存user以及订单id 用于后面查询订单详情
      // sessionStorage.setItem('equipmentUser', JSON.stringify(this.user));
      // sessionStorage.setItem('equipmentId', JSON.stringify(this.id));
      console.log(JSON.parse(sessionStorage.getItem('equipmentPay')));
      console.log(JSON.parse(sessionStorage.getItem('equipmentUser')));
      console.log(JSON.parse(sessionStorage.getItem('equipmentId')));
      let payMsg = {
        // 订单支付id
        orderList: this.orderData.pay_id,
        // 订单金额
        orderAmount: this.orderData.pay_money,
        // 订单商户id
        sellerName: '',
        // 订单商品类型
        payType: 'jinmu'
      };
      console.log(payMsg);
      goPay(payMsg);
      // 微信支付
      // let url = `${process.env.WEB_HOST}/equipment/equipmentPayment`;
      // let link = wxjs.getOpenIdUrl(url);
      // location.href = link;
    },
  },
  created() {
    this.getOrderData();
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.line10{
  height: 10px;
  background: #eeeef3;
}
.userpro-wrapper {
  position: relative;
  height: 100%;
  text-align: center;
}
.equipmentConfirm{
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 0.1px;
  .equipmentConfirmMain{
    background: #eeeef3;
    position: absolute;
    top: 44px;
    bottom: 44px;
    left: 0px;
    right: 0px;
    padding-bottom: 20px;
    overflow: auto;
    .form-item{
      height: 44px;
      background: #fff;
      padding: 0 10px;
      color: #333333;
      font-size: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
    }
    .orderAddress{
      height: 95px;
      background: #fff;
      padding: 0 10px;
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      >img{
        margin-top: 5px;
        width: 12.5px;
        height: 16.5px;
      }
      .orderAddress-txt{
        margin-left: 8px;
        flex: 1;
        color: #475669;
        font-size: 15px;
        .orderAddress-top{
          display: flex;
          align-items: center;
          justify-content: space-between;
          line-height: 25px;
          .name{
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .orderAddress-bot{
          height: 40px;
          line-height: 20px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .tips{
      height: 35px;
      line-height: 35px;
      padding-left: 10px;
      color: #999999;
      background: #eeeef3;
    }
    .notice{
      padding: 15px 10px;
      background: #fff;
    }
    .agreement{
      background: #eeeef3;
      padding-top: 80px;
      height: 30px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px
      }
      span {
        color: #0ccdd3;
      }
    }
  }
  .equipment-btn{
    position: fixed;
    width: 100%;
    height: 44px;
    line-height: 44px;
    bottom: 0;
    text-align: center;
    color: #fff;
    background: #0ccdd3;
  }
  .equipment-btn2{
    position: fixed;
    width: 100%;
    height: 40px;
    line-height: 40px;
    bottom: 48px;
    text-align: center;
    color: #fff;
    background: #0ccdd3;
  }
  .equipment-btn.huisi{
    background: #ccc;
  }
}
</style>
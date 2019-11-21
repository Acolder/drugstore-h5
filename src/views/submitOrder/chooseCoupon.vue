<template>
  <div>
    <mt-header title="选择优惠券">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <ul class="yhj-list">
      <li v-for="coupon in OrderCoupon" :key="coupon.couponId" @click="chooseOk(coupon.couponId, coupon.securitiesInformationId, coupon.receiveId, coupon.preferentialAmount, coupon.useTheThreshold)">
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
          <div class="yhj-use">
            仅用于<span v-show="coupon.businessType == 1">商城</span>
            <span v-show="coupon.businessType == 2">药店</span>
            <span v-show="coupon.businessType == 3">药柜</span>
            <span v-show="coupon.businessType == 4">跨境电商</span>
          </div>
          <div class="yhj-time">
            <!--<div v-show="coupon.useTimeType == 1">{{coupon.startDate}}-{{coupon.endDate}}</div>-->
            <!--<div v-show="coupon.useTimeType == 2">{{coupon.effectiveDate}}</div>-->

            <span v-if="coupon.useTimeType==1">有效期:{{coupon.useTimeType| dateFormat(coupon.startDate, coupon.endDate)}}</span>
            <span v-if="coupon.useTimeType==2">使用时间:{{coupon.useTimeType| dateFormat(coupon.downStartDate, coupon.downEndDate)}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Header, Toast } from 'mint-ui';
import { createOrder } from '@/api/shopCart';
import { formatDate, calculateDiffTime } from '@/utils/date';
export default {
  data() {
    return {
      OrderCoupon: []
    };
  },
  components: {
    'mt-header': Header,
  },
  mounted() {
    this.getOrderInfo();
  },
  filters: {
    // 计算优惠券时间
    dateFormat(useTimeType, downStartDate, downEndDate) {
      // 1：起止时间，2：有效时间
      if (useTimeType === 1) {
        let StartDate = formatDate(new Date(Number(downStartDate)), 'yyyy.MM.dd');
        let EndDate = formatDate(new Date(Number(downEndDate)), 'yyyy.MM.dd');
        console.log(`${StartDate}-${EndDate}`, '结果');
        return `${StartDate}-${EndDate}`;
      } else if (useTimeType === 2) {
        return calculateDiffTime(Number(downStartDate) / 1000, Number(downEndDate) / 1000);
      }
    }
  },
  methods: {
    // 初始化获取信息
    getOrderInfo() {
      this.OrderCoupon = JSON.parse(sessionStorage.getItem('OrderCoupon'));
      if (!this.OrderCoupon) {
        Toast('暂无优惠券');
      }
      console.log(this.OrderCoupon);
    },
    // 选择优惠券
    chooseOk(couponId, securitiesInformationId, receiveId, preferentialAmount, useTheThreshold) {
      console.log(couponId, securitiesInformationId, receiveId, preferentialAmount, useTheThreshold);
      // 重新生成订单
      let products = JSON.parse(sessionStorage.getItem('products'));
      let msg = `满${useTheThreshold}-${preferentialAmount}`;
      createOrder(products, couponId, securitiesInformationId, receiveId, msg);
      /**
      this.$router.push({
        path: '/submitOrder/multWayDelivery',
        query: {
          couponId: couponId,
          securitiesInformationId: securitiesInformationId,
          receiveId: receiveId,
          msg: `满${preferentialAmount}-${useTheThreshold}`
        }
      });
       **/
    }
  }
};

</script>
<style lang="less" scoped>
  .yhj-list{
    width:100%;
    height: auto;
    padding-top: 49px;
    padding-bottom: 20px;
    li{
      color: #ffffff;
      padding-left: 12px;
      padding-right: 12px;
      width:100%;
      height: 98px;
      display: flex;
      margin-top: 12px;
      >div{
        background-repeat:no-repeat;
        background-size:100% 100%;
        -moz-background-size:100% 100%;
        height: 100%;
      }
      >div:nth-child(1){
        background-image: url("../goods/img/pla_icon_couponsleft@3x.png");
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
        background-image: url("../goods/img/pla_icon_couponsright@3x.png");
        width:79%;
        padding-left:15px;
        position: relative;
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
      }
    }
  }
</style>


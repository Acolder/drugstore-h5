<template>
  <div class="markesCom" v-if="markesInfo.length > 0 ">
    <div class="box-item" v-for="(item,index) in markesInfo" :key="index">
      <div class="pic">
        <span class="symbol">￥</span>
        <span class="num">{{item.preferentialAmount}}</span>
      </div>
      <div class="content">
        <div class="full">满{{item.useTheThreshold}}元可用</div>
        <div class="time">{{item.useTimeType === 1 ? item.startDate + '~' + item.endDate : '领取后' + item.effectiveDate + '天后'}}</div>
        <div class="btn" @click="receive(item)">立即领取</div>
      </div>
    </div>
  </div>
</template>

<script>
import javaAjax from '@/utils/javaApiRequest';
import { formatDate } from '@/utils/date';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      markesInfo: [],
    };
  },
  methods: {
    getMarkes() {
      let param = {
        sellerUserId: '1',
        couponType: 1
      };
      let _self = this;
      javaAjax.post('/mall/coupon/queryAllCoupons', param).then(res => {
        console.log(res);
        if (res.status === 200 && res.data.resultCode === '0') {
          this.markesInfo = res.data.resultData;
          for (let i = 0; i < this.markesInfo.length; i++) {
            // let date = new Date();
            // console.log(this.markesInfo[i].endDate);
            if (this.markesInfo[i].useTimeType === 1) {
              this.markesInfo[i].startDate = formatDate(new Date(Number(_self.markesInfo[i].startDate)), 'yyyy-MM-dd');
              this.markesInfo[i].endDate = formatDate(new Date(Number(_self.markesInfo[i].endDate)), 'yyyy-MM-dd');
              // console.log(new Date(_self.markesInfo[i].startDate));
            }
          }
        }
      });
    },
    receive(item) {
      let param = {
        couponId: item.couponId,
        securitiesInformationId: item.securitiesInformationId,
        sellerUserId: item.sellerUserId
      };
      javaAjax.post('/mall/coupon/addReceiveCouponRecords', param).then(res => {
        console.log(res);
        if (res.status === 200 && res.data.resultCode === '0') {
          // 11
          Toast(res.data.msg);
        } else if (res.data.resultCode === '-2') {
          Toast(res.data.msg + '请先登录');
        }
      });
    },
  },
  created() {
    this.getMarkes();
  }
};
</script>

<style lang="less" scoped>
.markesCom{
  // width: 100%;
  height: 96px;
  overflow-x: scroll;
  background: #fff;
  padding: 10px;
  white-space: nowrap;
  .box-item{
    // float: left;
    // display: flex;
    // justify-content: space-around;
    // align-content: center;
    height: 100%;
    display: inline-block;
    margin-right: 15px;
    .pic{
      width: 120px;
      height: 100%;;
      line-height: 76px;
      background: url('./img/pla_icon_couponsleft@3x.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      float: left;
      span{
        &:nth-child(1){
          font-size: 18px;
          color: #fff;
        }
        &:nth-child(2){
          font-size: 36px;
          color: #fff;
        }
      }
    }
    .content{
      float: left;
      width: 200px;
      height: 100%;
      background: url('./img/pla_icon_couponsright@3x.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 5px 10px;
      position: relative;
      .full{
        color: #f63e48;
      }
      .num{
        color: #555;
      }
      .btn{
        position: absolute;
        right: 5px;
        top: 5px;
        background-color: #fc5f68;
        border-radius: 10px;
        padding: 5px;
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
</style>

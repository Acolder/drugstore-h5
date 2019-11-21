<template>
  <div class="markes">
    <!-- <mt-header fixed title="优惠券">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header> -->
    <div class="markes-item" v-for="(item,index) in markesInfo" :key="index">
      <div class="title">
        <img src="./img/icon-kmyg.png" alt="">
        <i>{{item.sellerName}}</i>
      </div>
      <div class="content">
        <div class="content-left">
          <div class="pic">
            <span>￥</span>
            <span>{{item.preferentialAmount}}</span>
          </div>
          <div class="full">
            满{{item.useTheThreshold}}元可用
          </div>
        </div>
        <div class="content-right">
          <div class="detail">
            <div class="name">{{item.couponName}}</div>
            <div class="time-dec">
              <div class="dec">有效期</div>
              <div class="time" v-if="item.useTimeType === 1">{{item.startDate }}~{{item.endDate}}</div>
              <div class="time" v-else>领取后{{item.effectiveDate}}天后</div>
            </div>
          </div>
          <div class="btn">
            <button @click="receive(item)">立即领取</button>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="item.ruleDescription">
        <span :class="item.ishiden ? 'hidentext' : 'showtext'">{{item.ruleDescription}}</span>
        <i :class="item.ishiden ? 'aoorw' : 'downarrow'" @click="arrowActive(index)" v-if="item.ruleDescription.length>25"></i>
      </div>
    </div>
  </div>
</template>

<script>
import javaAjax from '@/utils/javaApiRequest';
import { formatDate } from '@/utils/date';
import { Toast } from 'mint-ui';
import { setToken } from '@/utils/auth';
import { getQueryString } from '@/utils/index';
export default {
  data() {
    return {
      markesInfo: [],
    };
  },
  methods: {
    getMarkes() {
      let param = {
        sellerUserId: this.$route.query.id,
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
            this.$set(this.markesInfo[i], 'ishiden', true);
            if (this.markesInfo[i].useTimeType === 1) {
              this.markesInfo[i].startDate = formatDate(new Date(Number(_self.markesInfo[i].startDate)), 'yyyy-MM-dd');
              this.markesInfo[i].endDate = formatDate(new Date(Number(_self.markesInfo[i].endDate)), 'yyyy-MM-dd');
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
    arrowActive(index) {
      if (this.markesInfo[index].ishiden) {
        console.log(index);
        this.markesInfo[index].ishiden = false;
        console.log(this.markesInfo);
      } else {
        this.markesInfo[index].ishiden = true;
      }
    },
    getTitle() {
      return '优惠券';
    }
  },
  created() {
    this.$nextTick(function () {
      (function (doc, win) {
        let docEl = doc.documentElement;
        let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        let recalc = function () {
          let clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = (clientWidth >= 750 ? 100 : clientWidth / 750 * 100) + 'px';
        };
        recalc();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);
    });
    if (this.$route.query.token) {
      setToken(this.$route.query.token);
    }
    this.getMarkes();
    /* eslint-disable */
    if(getQueryString('from') === 'app'){
      HealthBAT.getTitle('优惠券');
    }
  }
};
</script>

<style lang="less" scoped>
.markes{
  width: 100%;
  min-height: 100%;
  background-color: #f3f3f3;
  padding: .2rem;
  // padding-top: 44px;
  .markes-item{
    background: #fff;
    border-radius: .1rem;
    padding: .15rem;
    margin-top: .2rem;
    .title{
      height: .9rem;
      line-height: .9rem;
      border-bottom: .01rem solid #e0e0e0;
      img{
        width: .32rem;
        height: .29rem;
      }
      i{
        font-size: .32rem;
        color: #333;
        margin-left: .1rem;
      }
    }
    .content{
      margin-top: .1rem;
      display: flex;
      .content-left{
        width: 2rem;
        height: 1.81rem;
        background: url('./img/pla_icon_couponsleft@3x.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding-top: .25rem;
        .pic{
          span{
            color: #fff;
            &:nth-child(1) {
              font-size: .30rem;
            }
            &:nth-child(2){
              font-size: .60rem;
            }
          }
        }
        .full{
          font-size: .2rem;
          color: #fff;
        }
      }
      .content-right{
        flex: 1;
        background: url('./img/pla_icon_couponsright@3x.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        .detail{
          padding-top: .25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: .3rem;
          width: 3.16rem;
          .name{
            color: #f63e48;
            font-size: .32rem;
          }
          .time-dec{
            color: #555555;
            font-size: .1rem;
            .time{
              width: 3.16rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
        .btn{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-right: .15rem;
          button{
            background-color: #fc5f68;
            border-radius: .2rem;
            color: #fff;
            font-size: .24rem;
            padding: .15rem;
          }
        }
      }
    }
    .bottom{
      margin-top: .15rem;
      font-size: .2rem;
      display: flex;
      justify-content: space-around;
      .hidentext{
        display: inline-block;
        width: 5.9rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        flex: 1;
      }
      .showtext{
        display: inline-block;
        width: 5.9rem;
        flex: 1;
      }
      .aoorw{
        display: inline-block;
        width: .24rem;
        height: .16rem;
        background: url('./img/iconfont-arrow-down@2x.png') no-repeat;
        background-size: 100% 100%;
        margin-top: .12rem;
        transform:rotate(360deg);
        transition: transform 0.5s;
        margin-left: .15rem;
      }
      .downarrow{
        display: inline-block;
        width: .24rem;
        height: .16rem;
        background: url('./img/iconfont-arrow-down@2x.png') no-repeat;
        background-size: 100% 100%;
        margin-top: .12rem;
        transform:rotate(180deg);
        transition: transform 0.5s;
        margin-left: .15rem;
      }
    }
  }
}
</style>

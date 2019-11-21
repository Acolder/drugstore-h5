<template>
  <div class="container">
    <mt-header title="优惠券">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <ul class="coupon-title">
      <li @click="goRoute(1)" :class="{'couponActive': classIndex == 1 }">可用</li>
      <li class="grayBorder"></li>
      <li @click="goRoute(2)" :class="{'couponActive': classIndex == 2 }">不可用</li>
    </ul>
    <ul v-if="canUse" class="uselist">
      <li class="coupon-box" v-for="(coupon,index) in canList" :key="index">
        <div class="couponBox-title">
          <img src="./img/xh_order_yg.png" alt="">
          <span>{{coupon.sellerName}}</span>
        </div>
        <div class="coupon-content">
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
            <div class="yhj-time">
              <div>
                <span v-if="coupon.useTimeType==1">有效期</span>
                <span v-if="coupon.useTimeType==2">使用时间</span>
                <br>
                <span v-if="coupon.useTimeType==1">{{coupon.useTimeType| dateFormat(coupon.startDate, coupon.endDate)}}</span>
                <span v-if="coupon.useTimeType==2">{{coupon.useTimeType| dateFormat(coupon.downStartDate, coupon.downEndDate)}}</span>
              </div>
              <div  class="yhj-btn" @click="goUse(coupon.only, coupon.productId, coupon.businessType, coupon.sellerUserId)">
                去使用
              </div>
            </div>
          </div>
        </div>
        <div class="showDetailp">
          <p ref="couponp" v-show="!coupon.spanLongShow" style="width: 100%;">{{coupon.ruleDescription}}</p>
          <p  class="onlyOne" v-show="coupon.spanLongShow && !coupon.spanLongOk">{{coupon.ruleDescription}}</p>
          <p  v-show="coupon.spanLongShow && coupon.spanLongOk">{{coupon.ruleDescription}}</p>
          <img src="./img/xh_arrow_down.png" alt="" v-show="coupon.spanLongShow && !coupon.spanLongOk" @click="spanDown(index,coupon.spanLongOk)">
          <img src="./img/icon_xss.png" alt="" v-show="coupon.spanLongShow && coupon.spanLongOk" @click="spanDown(index,coupon.spanLongOk)">
        </div>
      </li>
    </ul>
    <ul v-if="!canUse"  class="uselist">
      <li class="coupon-box"  v-for="(coupon,index) in noList" :key="index">
        <div class="couponBox-title">
          <img src="./img/xh_order_yg.png" alt="">
          <span>{{coupon.sellerName}}</span>
        </div>
        <div class="coupon-content noUse">
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
            <div class="yhj-time">
              <div>
                <span v-if="coupon.useTimeType==1">有效期</span>
                <span v-if="coupon.useTimeType==2">使用时间</span>
                <br>
                <span v-if="coupon.useTimeType==1">{{coupon.useTimeType| dateFormat(coupon.startDate, coupon.endDate)}}</span>
                <span v-if="coupon.useTimeType==2">{{coupon.useTimeType| dateFormat(coupon.downStartDate, coupon.downEndDate)}}</span>
              </div>
            </div>
            <div class="coupon-imgAlert">
              <!--"state": 我的优惠状态 3.已使用  5.未使用(已领取) 6.已过期-->
              <img src="./img/xh_icon_ygq.png" alt="" class="couponImg-overdue" v-show="coupon.state == 6">
              <img src="./img/xh_icon_ysy.png" alt="" class="couponImg-use" v-show="coupon.state == 3">
            </div>
          </div>
        </div>
        <div>
          <p ref="couponp" v-show="!coupon.spanLongShow">{{coupon.ruleDescription}}</p>
          <p  class="onlyOne" v-show="coupon.spanLongShow && !coupon.spanLongOk">{{coupon.ruleDescription}}</p>
          <p  v-show="coupon.spanLongShow && coupon.spanLongOk">{{coupon.ruleDescription}}</p>
          <img src="./img/xh_arrow_down.png" alt="" v-show="coupon.spanLongShow && !coupon.spanLongOk" @click="spanDown(index,coupon.spanLongOk)">
          <img src="./img/icon_xss.png" alt="" v-show="coupon.spanLongShow && coupon.spanLongOk" @click="spanDown(index,coupon.spanLongOk)">
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import javaAjax from '@/utils/javaApiRequest';
import { Toast } from 'mint-ui';
import { formatDate, calculateDiffTime } from '@/utils/date';
export default {
  data() {
    return {
      classIndex: 1,
      canUse: true,
      canList: [],
      noList: []
    };
  },
  mounted() {
    this.getInfo({ myStateAvailable: 5 });
  },
  filters: {
    // 计算优惠券时间
    dateFormat(useTimeType, downStartDate, downEndDate) {
      // 1：起止时间，2：有效时间
      if (useTimeType === 1) {
        let StartDate = formatDate(new Date(Number(downStartDate)), 'yyyy.MM.dd');
        let EndDate = formatDate(new Date(Number(downEndDate)), 'yyyy.MM.dd');
        return `${StartDate}-${EndDate}`;
      } else if (useTimeType === 2) {
        return calculateDiffTime(Number(downStartDate) / 1000, Number(downEndDate) / 1000);
      }
    },
    spanLong(span) {
      return span;
    }
  },
  methods: {
    // F-1:获取数据信息
    getInfo(parmas) {
      let url = '/mall/coupon/queryMyCoupon';
      javaAjax.post(url, parmas).then((res) => {
        console.log(res);
        if (res.status === 200) {
          let resData = res.data;
          if (resData.resultCode === '0') {
            if (!resData.resultData || resData.resultData.length === 0) {
              Toast('暂无优惠券');
            } else {
              // this.couponList = resData.resultData;
              if (parmas.myStateAvailable) {
                this.canList = resData.resultData;
                console.log(this.canList, '可用');
                this.canList.forEach(res => {
                  this.$set(res, 'spanLongOk', false);
                  this.$set(res, 'spanLongShow', false);
                });
                this.$nextTick(() => {
                  this.$refs.couponp.forEach((res, index) => {
                    if (res.offsetHeight > 20) {
                      this.$set(this.canList[index], 'spanLongShow', true);
                    }
                  });
                });
              } else if (parmas.myStateUnavailable) {
                this.noList = resData.resultData;
                console.log(this.noList, '不可用');
                this.noList.forEach(res => {
                  this.$set(res, 'spanLongOk', false);
                  this.$set(res, 'spanLongShow', false);
                });
                this.$nextTick(() => {
                  this.$refs.couponp.forEach((res, index) => {
                    if (res.offsetHeight > 20) {
                      this.$set(this.noList[index], 'spanLongShow', true);
                    }
                  });
                });
              }
            }
          } else {
            Toast('请稍后重试');
          }
        }
      });
    },
    // F-2:点击状态切换
    goRoute(classIndex) {
      if (classIndex === this.classIndex) {
        return;
      }
      this.classIndex = classIndex;
      if (classIndex === 1) {
        this.canUse = true;
        this.getInfo({ myStateAvailable: 5 });
      } else if (classIndex === 2) {
        this.canUse = false;
        this.getInfo({ myStateUnavailable: '3, 6' });
      }
    },
    // F-3:优惠券使用
    goUse(only, productId, businessType, sellerUserId) {
      console.log(only, productId, businessType, sellerUserId);
      if (only === 0 || (only === 1 && !productId)) {
        this.$router.push({
          path: '/home/index'
        });
      } else if (only === 1 && productId) {
        //  商品类型  1 商城   2  药店   3  药柜    4  跨境电商 默认为1
        let data = {
          productId: productId,
          getCommon: '',
          getFast: '',
          getByself: '',
          getTransnational: ''
        };
        if (businessType === 1) {
          data.getCommon = sellerUserId;
        } else if (businessType === 2) {
          data.getFast = sellerUserId;
        } else if (businessType === 3) {
          data.getByself = sellerUserId;
        } else if (businessType === 4) {
          data.getTransnational = sellerUserId;
        }
        this.$router.push({
          path: '/goods/goodsDetail',
          query: data
        });
      }
    },
    // F-4：内容展开
    spanDown(index, spanLongOk) {
      if (this.classIndex === 1) {
        this.$set(this.canList[index], 'spanLongOk', !spanLongOk);
      } else if (this.classIndex === 2) {
        this.$set(this.noList[index], 'spanLongOk', !spanLongOk);
      }
    }
  }
};
</script>
<style scoped lang="less">
  .container{
    position:absolute;width:100%;height:100%;top:0;left:0;overflow-y:auto;
    background-color:#efeff4;
    color: #333;
  }
  .fff{
    background: #ffffff;
  }
  .borderBottom{
    border-bottom:1px solid #e0e0e0;
  }
  .coupon-title{
    .borderBottom;
    .fff;
    position: fixed;
    left:0;
    top:40px;
    width:100%;
    height: 47px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index:20;
    li{
      width:70px;
      height: 100%;
      line-height: 45px;
      font-size: 16px;
      display: flex;
      justify-content: center;
    }
    .grayBorder{
      width:1px;
      height: 80%;
      background:  #e5e5e5;
    }
    .couponActive{
      color:#0ccdd4;
      border-bottom: 1px solid #0ccdd4;
    }
  }
  .coupon-box{
    margin: 10px;
    border-radius: 5px;
    .fff;
    padding:0 7px 15px;
    .couponBox-title{
      .borderBottom;
      height: 45px;
      line-height: 45px;
      img{
        width:16px;
        height: 15px;
      }
      span{
        font-size: 15px;
        margin-left: 4px;
      }
    }
    .coupon-content{
      color: #ffffff;
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
    .coupon-content.noUse{
      position: relative;
      >div:nth-child(1){
        background-image: url("./img/pla_icon_coupons.png");
      }
      >div:nth-child(2){
        background-image: url("./img/pla_icon_couponsee.png");
        .yhj-name{
          color: #fdc7cb;
        }
        .yhj-time{
          color:#fdc7cb;
        }
        .coupon-imgAlert{
          width: 60px;
          height: 38px;
          position: absolute;
          right:15px;
          top:15px;
          img{
            width:100%;
            height: 100%;
          }
        }
      }
    }
    .yhj-btn{
      height: 22px;
      margin-right: 10px;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      font-size: 11px;
      /*padding: 2px 5px;*/
      background-color: #fc5f68;
      color: #ffffff;
      margin-top: 25px;
    }
    >div:last-child{
      display: flex;
      align-items: center;
      margin-top: 9px;
      p{
        flex:1;
        margin-right: 15px;
        line-height: 20px;
      }
      img{
        width:12px;
        height: 8px;
      }
    }
  }
.uselist{
  margin-top: 97px;
}
.onlyOne{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
  .showDetailp{
    width: 100%;
    p{
      width:80%;
      word-break: break-all;
    }
  }
</style>

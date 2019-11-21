<template>
  <div class="has-header gray-background detail-page" v-if="orderInfo">
    <mt-header fixed title="订单详情">
      <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="hint-box" v-if="hasPay || orderInfo.status === 20">
      <label class="txt1" v-if="hasPay">请在48小时内去指定药柜取货</label>
      <span class="txt-box" v-if="orderInfo.status === 20">
        <label class="txt1">已成功取货</label>
        <p class="txt2">若存在取货失败的商品，请联系工作人员</p>
      </span>
    </div>
    <!-- 订单状态线 start -->
    <div class="white-background state-wire">
      <i class="line"></i>
      <div class="display-box state-box">
        <!-- <span class="box-flex box make-prescription" :class="orderInfo.status === 5 || orderInfo.status === 10 || orderInfo.status === 15 || orderInfo.status === 1 || orderInfo.status === 20 ? 'on' : ''"> -->
        <span class="box-flex box make-prescription on">
          <i class="img"></i>
          <label class="txt">医生开方</label>
        </span>
        <span class="box-flex box user-affirm" :class="orderInfo.status === 10 || orderInfo.status === 15 || orderInfo.status === 1 || orderInfo.status === 20 ? 'on' : ''">
          <i class="img"></i>
          <label class="txt">用户确认</label>
        </span>
        <span class="box-flex box pay-money" :class="hasPay || orderInfo.status === 20 ? 'on' : ''">
          <i class="img"></i>
          <label class="txt">付款</label>
        </span>
        <span class="box-flex box deal-complete" :class="orderInfo.status === 20 ? 'on' : ''">
          <i class="img"></i>
          <label class="txt">完成</label>
        </span>
      </div>
    </div>
    <!-- 订单状态线 end -->
    <!-- 药柜地址和导航 start-->
    <div class="white-background display-box address-navigation" v-if="hasPay || orderInfo.status === 20">
      <span class="box-flex businesses-box">
        <span class="businesses-name">{{orderInfo.sellername}}</span>
        <p class="businesses-address">地址: {{orderInfo.machine_address}}</p>
      </span>
      <span class="navigation-box" v-if="lonLat">
        <v-distance-time class="distance-time" :location="lonLat"></v-distance-time>
        <v-open-map :seller-user="sellerUser" v-if="sellerUser" class="right"></v-open-map>
      </span>
    </div>
    <!-- 药柜地址和导航 end-->
    <!-- 用户信息/主诉辩证 start-->
    <div class="white-background info-box" v-if="userInfo">
      <span class="display-box box user-info">
        <label class="txt">患者信息</label>
        <span class="box-flex">
          <span class="display-box con">
            <label class="box-flex name">{{userInfo.username}} / </label>
            <label v-html="userInfo.gender === 0 ? '女 ' : '男 '"></label>
            <label>{{userInfo.age}}岁 / {{userInfo.tel}}</label>
          </span>
        </span>
      </span>
      <span class="display-box box describe">
        <label>主诉及辩证</label>
        <label class="box-flex con">{{userInfo.diagnosis}}</label>
      </span>
    </div>
    <!-- 用户信息/主诉辩证 end-->
    <!-- 西药清单 start-->
    <div class="white-background western-medicine-list" v-if="drugList">
      <label class="tlt">西药清单</label>
      <ul class="list-box">
        <li v-for="(drug, i) in drugList" :key="drug[i]">
          <span class="display-box top">
            <span class="box-flex">
              <label class="tlt-txt">{{drug.medicines}}</label>
              <label class="category red-category" v-if="drug.icotc === '1'">OTC</label>
              <label class="category red-category" v-if="drug.icotc === '2'">RX</label>
              <label class="category green-category" v-if="drug.icotc === '3'">OTC</label>
            </span>
            <label class="num">×{{drug.dose}}</label>
          </span>
          <p class="specification-addr">{{drug.goods_norms}} {{drug.goods_orgin}}</p>
          <p class="usage">用法: {{drug.m_usage}} {{drug.medperday}} {{drug.medperdos}}</p>
        </li>
      </ul>
    </div>
    <!-- 西药清单 end-->
    <!-- 金额 start-->
    <div class="white-background price-order">
      <span class="display-box box">
        <label>诊金</label>
        <label class="box-flex con">￥{{orderInfo.treat_fee}}</label>
      </span>
      <span class="display-box box">
        <label>处方金额</label>
        <label class="box-flex con">￥{{userInfo.money}}</label>
      </span>
      <span class="display-box box">
        <label>运费</label>
        <label class="box-flex con">￥{{orderInfo.logistics_fee}}</label>
      </span>
      <span class="display-box box amount-box">
        <label>总计</label>
        <label class="box-flex con">￥{{orderInfo.order_price}}</label>
      </span>
    </div>
    <!-- 金额 end-->
    <!-- 订单信息 start-->
    <div class="white-background price-order order-info" :class="(orderInfo.status === 99 || orderInfo.status === 101 || orderInfo.status === 102 || orderInfo.status === 104) || hasPay || orderInfo.status === 20? 'has-fixed' : ''">
      <span class="display-box box">
        <label>订单编号</label>
        <label class="box-flex con">{{orderInfo.order_id}}</label>
      </span>
      <span class="display-box box">
        <label>下单时间</label>
        <label class="box-flex con">{{orderInfo.create_time}}</label>
      </span>
      <span class="display-box box" v-if="hasPay || orderInfo.status === 20">
        <label>确认时间</label>
        <label class="box-flex con">{{orderInfo.confirm_time}}</label>
      </span>
    </div>
    <!-- 订单信息 end-->
    <!-- 不同状态操作按钮 start-->
    <div class="make-prescription-btn" v-if="waitConfirm">
      <span class="btn cancel-btn" @click="cancleOrder">取消处方</span>
      <span class="btn affirm-btn" @click="confirmOrder">确认处方</span>
    </div>
    <!-- <div class="fixed-btn order-cancel-btn" v-if="orderInfo.status === 99 || orderInfo.status === 101 || orderInfo.status === 102">订单已取消</div> -->
    <div class="fixed-btn order-gray-btn" v-if="showCancel">订单已取消</div>
    <div class="fixed-btn order-gray-btn" v-if="orderInfo.status === 104">订单已过期</div>
    <div class="fixed-btn order-gray-btn" v-if="orderInfo.status === 20">订单已完成</div>
    <!-- <div class="fixed-btn check-code" v-if="(orderInfo.status === 10 || orderInfo.status === 15) && orderInfo.pay_status === 1">去支付</div> -->
    <div class="fixed-btn green-btn" v-if="hasPay" @click="checkCode(orderInfo.extractcode)">查看取货码</div>
    <!-- 不同状态操作按钮 end-->
    <v-pickup-code @hidePop="hidePop" :pickup-code="codeTxt" :is-show="showCode"></v-pickup-code>
  </div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui';
import ajax from '@/utils/ajax';
import doctorAjax from '@/utils/doctorAjax';
import distanceTime from '@/components/distanceTime/index';
import openMap from '@/components/openMap/index';
import pickupCode from '@/components/pickupCode/index.vue';
export default {
  data() {
    return {
      unionId: '',
      orderId: '',
      orderInfo: null,
      userInfo: null,
      drugList: null,
      lonLat: null,
      waitConfirm: false,
      showCancel: false,
      showCode: false,
      hasPay: false,
      codeTxt: ''
    };
  },
  components: {
    'v-pickup-code': pickupCode,
    'v-distance-time': distanceTime,
    'v-open-map': openMap
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    // 获取订单详情
    getDetail() {
      this.orderId = this.$route.query.orderId;
      this.unionId = sessionStorage.getItem('wxUnionId');
      // doctorAjax.get(`/api/order/getPatientOrderDetail/${this.orderId}`).then((res) => {
      ajax.post('/api/user/getwxpatientorderdetail', {
        orderId: this.orderId,
        unionId: this.unionId
      }).then((res) => {
        if (res.status === 200) {
          let resCode = res.data.code;
          let resData = res.data.data;
          if (resCode === 0 && resData) {
            let docprescriptions = resData.docprescriptions[0];
            let orderInfo = resData;
            this.orderInfo = resData;
            this.userInfo = docprescriptions;
            this.drugList = docprescriptions.docprescriptiondetails;
            this.lonLat = {
              longitude: resData.longitude,
              latitude: resData.latitude
            };
            this.sellerUser = {
              longitude: resData.longitude,
              latitude: resData.latitude,
              sellerName: resData.sellername,
              sellerAddress: resData.detail_address
            };
            // this.lonLat = {
            //   longitude: '114.060686',
            //   latitude: '22.626826'
            // };
            // 待确认
            if (resData.status === 5) {
              this.waitConfirm = true;
            }
            // 订单已取消
            if (resData.status === 99 || resData.status === 101 || resData.status === 102) {
              this.showCancel = true;
            }
            // 已支付
            if ((orderInfo.status === 10 || orderInfo.status === 15) && orderInfo.pay_status === 2) {
              this.hasPay = true;
            }
          }
        }
      });
    },
    // 取消订单
    cancleOrder() {
      MessageBox.prompt('确定要取消吗？如果是请输入取消理由', '取消处方').then(({ value, action }) => {
        doctorAjax.post('/api/order/cancleOrder', {
          orderId: this.orderId,
          cancleRemark: value || ''
        }).then((res) => {
          if (res.status === 200) {
            let resCode = res.data.code;
            if (resCode === 0) {
              console.log(res);
              this.waitConfirm = false;
              this.showCancel = true;
            }
            else {
              Toast(res.message);
            }
          }
        }).catch(err => {
          if (err === 'cancel') {
            console.log('已取消');
          }
        });
      });
    },
    confirmOrder() {
      this.$router.push({
        path: '/prescriptionwx/buy',
        query: {
          order_id: this.orderId
        }
      });
    },
    // 查看取货码
    checkCode(code) {
      this.codeTxt = code;
      this.showCode = true;
    },
    // 隐藏取货码弹窗
    hidePop(msg) {
      this.showCode = msg;
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';
.detail-page{
  overflow: hidden;
}
.hint-box{
  padding: 8px 26px;
  background: @green-color;
  color: @white-color;
  text-align: center;
  .txt1{
    &:before{
      content: "";
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 6px;
      background: url('./img/xh_cfsl_ts.png');
      background-size: 100% 100%;
      vertical-align: middle;
    }
    font-weight: bold;
  }
  .txt-box{
    .txt2{
      margin-top: 5px;
      font-size: 12px;
    }
  }
}
.state-wire{
  height: 86px;
  padding: 0 15px;
  .line{
    display: block;
    width: calc(100% - 60px);
    height: 32px;
    margin: 0 auto;
    border-bottom: solid 2px #e6e6e6;
  }
  .state-box{
    height: 66px;
    margin-top: -14px;
    .box{
      text-align: center;
      .img{
        display: block;
        width: 30px;
        height: 30px;
        margin: 0 auto 5px;
      }
      .txt{
        color: @color999;
      }
    }
    .box.on{
      .txt{
        color: @green-color;
      }
    }
    // .make-prescription .img{
    //   background: url('./img/icon_yskfh.png');
    // }
    .make-prescription.on .img{
      background: url('./img/icon_yskf.png');
    }
    .user-affirm .img{
      background: url('./img/icon_yhqr.png');
    }
    .user-affirm.on .img{
      background: url('./img/icon_yhqrl.png');
    }
    .pay-money .img{
      background: url('./img/icon_fk.png');
    }
    .pay-money.on .img{
      background: url('./img/icon_fkl.png');
    }
    .deal-complete .img{
      background: url('./img/icon_wc.png');
    }
    .deal-complete.on .img{
      background: url('./img/icon_wcl.png');
    }
    .box .img{
      background-size: 100% 100%;
    }
    .box.on .img{
      background-size: 100% 100%;
    }
  }
}
.address-navigation{
  padding: 0 10px;
  margin: 10px 0;
  .businesses-box{
    padding: 13px 0;
    .businesses-name{
      font-size: 15px;
      &:before{
        content: '';
        display: inline-block;
        width: 15px;
        height: 13px;
        margin-right: 5px;
        background: url('./img/order-sd.png');
        background-size: 100% 100%;
      }
    }
    .businesses-address{
      line-height: 24px;
      text-align: justify;
      word-break: break-all;
    }
  }
  .navigation-box{
    padding: 14px 0 14px 15px;
    .distance-time{
      margin-bottom: 10px;
    }
  }
}
.info-box{
  .box{
    padding: 12px 10px;
    line-height: 22px;
    font-size: 15px;
    .con{
      color: @color666;
      text-align: right;
    }
  }
  .user-info{
    border-bottom: @border-line;
    .name{
      .aline-text-overflow(22px);
      margin-right: 5px;
    }
  }
}
.western-medicine-list{
  margin: 10px 0;
  .tlt{
    display: block;
    height: 42px;
    line-height: 42px;
    padding: 0 10px;
    font-size: 15px;
    border-bottom: @border-line;
  }
  .list-box{
    padding-left: 10px;
    li{
      padding: 12px 10px 15px 0;
      border-bottom: @border-line;
      .top{
        height: 22px;
        line-height: 22px;
        .tlt-txt{
          float: left;
          max-width: calc(100% - 70px);
          .aline-text-overflow(22px);
          font-size: 15px;
        }
        .category{
          float: left;
          width: 32px;
          height: 16px;
          line-height: 16px;
          margin: 3px 0 0 6px;
          border-radius: 50%;
          font-size: 12px;
          color: @white-color;
          text-align: center;
        }
        .red-category{
          background: #e60012;
        }
        .green-category{
          background: #1e9243;
        }
      }
      .specification-addr{
        line-height: 22px;
        margin: 12px 0;
        font-size: 12px;
        color: #808080;
      }
      .usage{
        line-height: 22px;
      }
    }
    li:last-child{
      border: none;
    }
  }
}
.price-order{
  .box{
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    font-size: 15px;
    .con{
      color: @color666;
      text-align: right;
    }
  }
  .amount-box{
    border-top: @border-line;
    font-size: 16px;
  }
}
.order-info{
  margin-top: 10px;
  .box{
    border-bottom: @border-line;
  }
  .box:last-child{
    border: none;
  }
}
.has-fixed{
  margin-bottom: 54px;
}
.make-prescription-btn{
  margin: 20px 0 20px;
  padding-left: 10px;
  .btn{
    width: calc(50% - 14px);
    margin-right: 10px;
  }
  .cancel-btn{
    .border-radius-btn(30px, 0, @green-color, 5px, 14px);
  }
  .affirm-btn{
    .background-radius-btn(30px, 0, @green-color, 5px, 14px);
  }
}
.fixed-btn{
  position: fixed;
  bottom: 0;
  width: 100%;
}
.order-gray-btn{
  .background-radius-btn(44px, 0, #b0b0b3, 0, 15px);
}
.green-btn{
  .background-radius-btn(44px, 0, @green-color, 0, 15px);
}
</style>

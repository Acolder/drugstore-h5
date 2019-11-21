<template>
  <div class="has-header gray-background">
    <mt-header fixed title="我的订单">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="display-box white-background order-type">
      <label class="box-flex" @click="whole" :class="{'on':activeNum == 0}">全部</label>
      <label class="box-flex" @click="payment" :class="{'on':activeNum == 1}">待付款</label>
      <label class="box-flex" @click="distribution" :class="{'on':activeNum == 2}">待配送</label>
      <label class="box-flex" @click="collect" :class="{'on':activeNum == 3}">待收货</label>
      <label class="box-flex" @click="evaluate" :class="{'on':activeNum == 4}">待评价</label>
    </div>
    <div class="noInfo" v-if="orderData.length == 0">
      <div class="img"></div>
      <!-- <img src="./img/icon_zwpj@2x.png" alt=""> -->
      <p>暂无订单~</p>
    </div>
    <div class="page-loadmore-wrapper" v-if="orderData.length !== 0">
      <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottomAllLoaded='bottomLoaded' ref="loadmore">
        <ul class="order-list">
          <li v-for="(order,index) in orderData" :key="index">
            <div class="top white-background">
              <span class="left" v-if="order.sellerUser">
                <i class="icon" :class="{'icon2': (order.orderStatus === '20'||order.orderStatus === '30') && order.orderTransport == 3}"></i>
                <label>{{order.sellerUser.sellerName}}</label>
              </span>
              <label class="right red-txt" v-if="order.orderStatus === '0'">已取消</label>
              <label class="right red-txt" v-if="order.orderStatus == 10">待付款</label>
              <label class="right red-txt" v-if="order.orderStatus === '20' && order.orderTransport != 3">待配送</label>
              <label class="right red-txt" v-if="order.orderStatus === '30' && order.orderTransport != 3">待收货</label>
              <label class="right red-txt" v-if="(order.orderStatus === '20'||order.orderStatus === '30') && order.orderTransport == 3">待取货</label>
              <label class="right red-txt" v-if="order.orderStatus == 40">交易成功</label>
              <label class="right red-txt" v-if="order.orderStatus == 50">已退款</label>
              <label class="right red-txt" v-if="order.orderStatus == 60">部分退款</label>
              <label class="right red-txt" v-if="order.orderStatus == 70">退款中</label>
              <label class="right red-txt" v-if="order.orderStatus == 80">待评价</label>
            </div>
            <!-- <div class="display-box white-background addr-box">
              <span class="right-box">
                <span class="distance">
                  <i class="icon"></i>
                  <label>800m | 10分钟</label>
                </span>
                <span class="avigraph">
                  <i class="icon"></i>
                  <label>步行导航</label>
                </span>
              </span>
            </div> -->
            <ul class="white-background drug-list" @click.stop.prevent="orderDetail(order)">
              <li class="display-box" v-for="(detail,j) in order.orderDetail" :key="j">
                <div v-if="detail.proudct !== null">
                  <span class="img-box">
                    <img :src="detail.proudct.productMainImage"/>
                  </span>
                  <span class="box-flex drug-info">
                    <span class="drug-top display-box">
                      <i class="kuajing" v-if="order.orderTransport == 4">跨境购</i>
                      <p class="box-flex drug-name">{{detail.proudct.productName}}</p>
                      <label class="price">{{Number(detail.proudct.productMarkprice).toFixed(2)}}</label>
                    </span>
                    <span class="bottom">
                      <label class="left dosage">{{detail.proudct.productSpecification}}</label>
                      <label class="right num">×{{detail.quantity}}</label>
                    </span>
                  </span>
                </div>
              </li>
            </ul>
            <div class="white-background total-box">
              <label>共{{order.orderDetail.length}}件商品 合计: </label>
              <label class="red-txt">￥{{Number(order.orderPayment).toFixed(2)}}</label>
            </div>
            <div class="white-background btn-box">
              <!-- 取消订单 -->
              <label class="red-btn" v-show="order.orderStatus === '10' || order.orderStatus === '20'" @click="cancel(order.orderId)">取消订单</label>
              <!-- 去付款 -->
              <label class="blue-btn" v-show="order.orderStatus === '10'" @click="goBuy(order.orderPayment,order.orderId)">去付款</label>
                 <!--查看物流  不需要这个按钮-->
              <!-- <label class="red-btn"  v-show="order.orderStatus === '30' && order.orderTransport == 2" @click="seeLogisticsFast(order.orderId)">查看配送</label> -->
              <!--查看物流 -->
              <label class="red-btn"  v-show="order.orderStatus === '30' && order.orderTransport == 1" @click="see(order.logisticsNumber,order.logisticsType, order.orderTransport, order.orderId)">查看物流</label>
              <!-- 确认收货 -->
              <label class="blue-btn" v-show="order.orderStatus == '30' && order.orderTransport != 3" @click="confirm(order.orderId)">确认收货</label>
              <!-- 查看取货码 -->
              <label class="blue-btn" v-show="(order.orderStatus === '20'||order.orderStatus === '30') && order.orderTransport ==3" @click="seeCode(order)">查看取货码</label>
              <!-- 去评价 -->
              <label class="blue-btn" v-show="order.orderStatus === '80'" @click="goEvaluate(order.orderId)">去评价</label>
              <!-- 查看评价 -->
              <label class="blue-btn"  v-show="order.orderStatus === '40'" @click="seeEvaluate(order.orderId)">查看评价</label>
            </div>
            <!-- <div class="allScreen" @click="StopSeeCode($event)" v-show="codeShow">
              <dl class="seeCode" v-for="(detail, index) in order.orderDetail" :key="index">
                <dt class="seeCodeIn"></dt>
                <dd class="seeCodeIn">药品取货码</dd>
                <dd class="seeCodeIn">{{order.extractCode}}</dd>
                <dd class="seeCodeIn">在药柜上输入取货码，拿取药品</dd>
              </dl>
            </div> -->
          </li>
            <!--取货码-->
            <div class="allScreen" @click="StopSeeCode($event)" v-if="codeShow">
              <dl class="seeCode">
                <dd class="seeCodeIn" v-for="(detail, index) in seeCodeOrder.orderDetail" :key="index">
                  <div class="box-proudit">
                    <span class="img-box">
                      <img :src="detail.proudct.productMainImage"/>
                    </span>
                    <span class="detaic">
                      <p class="top-o">{{detail.proudct.productName}}</p>
                      <p class="bottom">{{detail.proudct.productSpecification}}</p>
                    </span>
                  </div>
                  <div class="box-roght">
                    <span class="text">取货码</span>
                    <span class="code">{{seeCodeOrder.extractCode}}</span>
                  </div>
                </dd>
                <dd class="seeCodeBOttom">在药柜上输入取货码，拿取药品  </dd>
              </dl>
            </div>
        </ul>
        <!-- <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus === 'loading'">{{bottomText}}</span>
          <span v-show="bottomStatus === 'pull'">上拉加载更多</span>
          <span v-show="bottomStatus === 'drop'">释放立即加载</span>
        </div> -->
      </mt-loadmore>
      <!-- 支付 -->
      <!-- <v-payment v-show="buyShow" :res-data="buyData"></v-payment> -->
    </div>
  </div>

</template>
<script>
import { Header, Loadmore, Toast, Indicator } from 'mint-ui';
// import {  } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
import { goPay } from '@/api/goPay.js';
import { goEvaluateBtn, cancelOrderBtn, seeLogisticsBtn, receiptOrderBtn, nseeEvaluateBtn, seeLogisticsFastBtn } from '@/api/orderButton';
// import payment from './../../components/payment/payment.vue';
export default {
  data() {
    return {
      orderData: [],
      bottomText: '正在加载中...',
      bottomLoaded: false,
      bottomStatus: '',
      activeNum: 0,
      bottomShow: false,
      buyShow: false,
      buyData: {},
      codeShow: false,
      status: {
        pageNum: 1,
        pageSize: '3',
        status: ''
      },
      seeCodeOrder: {}
    };
  },
  components: {
    'mt-header': Header,
    'mt-loadmore': Loadmore,
    // 'v-payment': payment,
    Toast
  },
  computed: {
    offset() {
      return (this.orderData.length / 3) + 1;
    }
  },
  methods: {
    loadTop() {
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
        this.status.pageNum = 1;
        this.status.pageSize = '3';
        this.status.status = this.status.status;
        this.bottomLoaded = false;
        this.getData();
      }, 1000);
    },
    loadBottom() {
      this.status.pageNum += 1;
      let _self = this;
      javaAjax.post('/mall/order/queryByUser', _self.status).then(res => {
        if (res.status === 200 && res.data.resultCode === '0') {
          let a = res.data.resultData.data;
          if (a.length === 0) {
            this.bottomLoaded = true;
            Toast('已经加载完了哦！');
          }
          this.orderData = [...this.orderData, ...a];
        }
      });
      // console.log(this.status);
      // this.getData();
      this.$refs.loadmore.onBottomLoaded();
    },
    // handleTopChange(status) {
    //   this.bottomStatus = status;
    // },
    // bottomStatusChange(status) {
    //   console.log(status);
    // },
    // 切换导航
    whole() {
      this.status.status = '';
      this.status.pageNum = 1;
      this.activeNum = 0;
      this.getData();
    },
    payment() {
      this.status.status = '10';
      this.status.pageNum = 1;
      this.activeNum = 1;
      this.getData();
    },
    distribution() {
      this.status.status = '20';
      this.status.pageNum = 1;
      this.activeNum = 2;
      this.getData();
    },
    collect() {
      this.status.status = '30';
      this.status.pageNum = 1;
      this.activeNum = 3;
      this.getData();
    },
    evaluate() {
      this.status.status = '80';
      this.status.pageNum = 1;
      this.activeNum = 4;
      this.getData();
    },
    // 获取订单列表数据
    getData() {
      let _self = this;
      javaAjax.post('/mall/order/queryByUser', _self.status).then(res => {
        if (res.status === 200 && res.data.resultCode === '0') {
          console.log(res);
          this.orderData = res.data.resultData.data;
          if (this.orderData.length < 3) {
            this.bottomLoaded = true;
          } else {
            this.bottomLoaded = false;
          }
        }
      });
    },
    // 返回个人中心
    goBack() {
      this.$router.push('/myCenter/index');
    },
    // 跳转到订单详情页
    orderDetail(order) {
      // this.$router.push({ path: '/order/detail?orderId=' + order.orderId });
      // this.$router.push({
      //   path: '/order/detail',
      //   query: { orderId: order.orderId }
      // });
      window.location.href = `${process.env.WEB_HOST}/order/detail?orderId=${order.orderId}`;
    },
    // 取消订单
    cancel(orderId) {
      Indicator.open({
        text: '操作中...',
        spinnerType: 'fading-circle'
      });
      cancelOrderBtn(orderId).then((res) => {
        Indicator.close();
        if (res.data.resultCode === '0') {
          Toast('取消订单成功');
          this.getData();
        } else {
          Toast('取消失败');
        }
      });
    },
    // 去评价
    goEvaluate(orderId) {
      goEvaluateBtn(orderId);
    },
    // 去付款
    goBuy(Payment, id) {
      goPay({ orderList: id, orderAmount: Payment, payType: 'product' });
    },
    seeLogisticsFast(id) {
      seeLogisticsFastBtn(id);
    },
    // 查看物流
    see(logisticsNumber, logisticsType, orderTransport, orderId) {
      seeLogisticsBtn(logisticsNumber, logisticsType, orderTransport, orderId);
    },
    // 确认收货
    confirm(id) {
      Indicator.open({
        text: '操作中...',
        spinnerType: 'fading-circle'
      });
      receiptOrderBtn(id).then((res) => {
        Indicator.close();
        if (res.data.resultCode === '0') {
          Toast('确认收货成功');
          this.status.pageNum = 1;
          this.getData();
          // this.activeNum = 4;
        } else {
          Toast(res.data.msg);
        }
      });
    },
    // 查看评价
    seeEvaluate(orderId) {
      nseeEvaluateBtn(orderId);
    },
    // 查看取货码
    seeCode(order) {
      this.codeShow = true;
      this.seeCodeOrder = order;
    },
    // 关闭取货码
    StopSeeCode(e) {
      this.codeShow = false;

    },
  },
  created() {
    this.activeNum = this.$route.query.orderNum ? this.$route.query.orderNum : 0;
    if (this.activeNum === '0') {
      this.status.status = '';
    }
    if (this.activeNum === '1') {
      this.status.status = '10';
    }
    if (this.activeNum === '2') {
      this.status.status = '20';
    }
    if (this.activeNum === '3') {
      this.status.status = '30';
    }
    if (this.activeNum === '4') {
      this.status.status = '80';
    }
    this.getData();
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/mixin.less";
@red-color2: #f75858;
.page-loadmore-wrapper {
  // margin-top: 46px;
  position: absolute;
  top: 90px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background: #e0e0e0;
}
.red-txt {
  color: @red-color2;
}
.icon {
  display: inline-block;
  background: url("./img/order.png") no-repeat;
  vertical-align: middle;
}
.order-type {
  height: 46px;
  line-height: 46px;
  font-size: 15px;
  text-align: center;
  border-bottom: @border-line;
  position: fixed;
  top: 44;
  left: 0;
  right: 0;
  .on {
    color: @green-color;
  }
}
.order-list {
  padding-bottom: 15px;
  li {
    margin-bottom: 10px;
    .top {
      height: 36px;
      line-height: 36px;
      padding: 0 12px;
      font-size: 13px;
      .icon {
        width: 14px;
        height: 20px;
        background-size: 55px;
        background-position: -38px -50px;
        margin-right: 2px;
      }
      .icon2 {
        width: 16px;
        height: 19px;
        background-position: -17px -17px;
        background-size: 40px;
      }
    }
    .addr-box {
      padding: 0 12px 10px;
      .box-flex {
        line-height: 20px;
        font-size: 12px;
        margin: 3px 15px 0 0;
      }
      .right-box {
        display: block;
        text-align: right;
        font-size: 11px;
        width: 100%;
        .distance {
          display: block;
          .icon {
            width: 11px;
            height: 20px;
            background-size: 37px;
            background-position: 0px -30px;
            margin-right: 2px;
          }
        }
        .avigraph {
          .border-radius-btn(20px,6px,@black-color,4px,12px);
          line-height: 17px;
          .icon {
            width: 12px;
            height: 14px;
            background-size: 48px;
            background-position: -16px -45px;
          }
        }
      }
    }
    .drug-list {
      li {
        padding: 7px 12px;
        background: #fafafa;
        margin-bottom: 4px;
        div {
        display: flex;
        width: 100%;
        }
        .img-box {
          display: inline-block;
          width: 68px;
          height: 68px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .drug-info {
          margin-left: 10px;
          .drug-top {
            font-size: 14px;
            margin-bottom: 5px;
            .drug-name {
              width: 130px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-size: 14px;
            }
            .price{
              margin-left: 90px;
            }
          }
          .bottom {
            font-size: 12px;
            color: @color999;
          }
        }
      }
      li:last-child {
        margin: 0;
      }
    }
    .total-box {
      height: 34px;
      line-height: 34px;
      padding-right: 12px;
      text-align: right;
      font-size: 14px;
      border-bottom: @border-line;
    }
    .btn-box {
      padding: 12px;
      text-align: right;
      label {
        margin-left: 14px;
      }
      .red-btn {
        .border-radius-btn(30px,15px,@red-color2,4px,12px);
      }
      .blue-btn {
        .border-radius-btn(30px,15px,@green-color,4px,12px);
      }
    }
  }
  li:last-child {
    margin: 0;
  }
}
.noInfo{
  text-align: center;
  background: #fff;
  overflow: hidden;
  .img{
    background: url('./img/icon_zwpj@2x.png') no-repeat;
    width: 356px;
    height: 212px;
    margin: 150px auto -36px;
    background-size: 100%;
  }
  p{
    font-size: 14px;
    color: #666666;
    margin-top: 18px;
  }
}
.allScreen{
  width:100%;
  height: 100%;
  background: rgba(0,0,0,.3);
  position:fixed;
  left:0px;
  top:0px;
  bottom: 0;
  right: 0;
  display:block;
  z-index:100000;
  .seeCode{
    border-radius: 5px;
    width:300px;
    height: 180px;
    background-color:#fff;
    position:absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    margin: auto;
    z-index:99;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .seeCodeIn{
      display: flex;
      border-bottom: 1px solid #666;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      .box-proudit{
        display: flex;
        .img-box{
          width: 50px;
          height: 50px;
          display: block;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .detaic{
          display: block;
          margin-left: 14px;
          .top-o{
            color: #333;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 100px;
          }
          .bottom{
            color: #949494;
            font-size: 12px;
            margin-top: 6px
          }
        }
      }
    }
    .box-roght{
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .text{
        color: #333;
        display: block;
      }
      .code{
        font-size: 18px;
        font-weight: 900;
        color: #3a9dff;
      }
    }
    .seeCodeIn:nth-last-child(1){
      border-bottom: 0;
    }
    .seeCodeBOttom{
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #c1c1c1;
      font-size: 12px;
    }
  }
}
.kuajing{
  padding: 2px 5px;
  background: @green-color;
  color: #fff;
  border-radius: 3px;
  margin-right: 5px;
  font-size: 10px;
}
// .allScreen{
//   width:100%;
//   height: 100%;
//   background: rgba(0,0,0,.3);
//   position:absolute;
//   left:0px;
//   top:0px;
//   display:block;
//   z-index:100000;
//   .seeCode{
//     border-radius: 5px;
//     width:60%;
//     height:180px;
//     background-color:#fff;
//     position:absolute;
//     left: 0; top: 0; right: 0; bottom: 0;
//     margin: auto;
//     z-index:99;
//     padding: 20px;
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     justify-content: center;
//     dt,dd{
//       display: block;
//     }
//     dt{
//       width:60px;
//       height: 60px;
//       position: absolute;
//       top:-30px;
//       left: 0;
//       right:0;
//       margin-left: auto;
//       margin-right:auto;
//       background-color: #089efd;
//       border-radius: 50%;
//       background-image:url("./img/icon-qhm@2x.png") ;
//       background-size: 100%;
//     }
//     dd:nth-child(2){
//       font-size: 17px;
//       color: #333333;
//       margin-top:15px;
//     }
//     dd:nth-child(3){
//       margin-top:13px;
//       font-size: 24px;
//       color: #089efd;
//     }
//     dd:nth-child(4){
//       font-size: 12px;
//       color: #666666;
//       margin-top:15px;
//       text-align: center;
//       align-content:center;
//     }
//   }
// }
</style>

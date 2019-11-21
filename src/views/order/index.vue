<template>
  <div class="orders">
    <mt-header
      fixed
      title="订单详情"
    >
      <a
        slot="left"
        @click="goBack"
      >
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="order-state">
      <!--已取消-->
      <span class="status-box" v-show="orderDetail.orderStatus == 0">
        <img src="./img/icon-yqx@2x.png">
        <label class="status-txt">已取消</label>
        <!--<label class="hint-txt box-flex">退款中</label>-->
      </span>
      <!--待付款-->
      <span class="status-box" v-show="orderDetail.orderStatus == 10">
        <img src="./img/icon-dfk@2x.png">
        <label class="status-txt">待付款</label>
        <label class="hint-txt box-flex">剩余{{orderDetail.surplusTime}}分钟付款，超时系统将关闭订单</label>
        <!--<em>剩余{{orderDetail.surplusTime}}分钟付款，超时系统将关闭订单</em>-->
      </span>
      <!--待配送-->
      <span class="status-box" v-show="orderDetail.orderStatus == 20 && orderDetail.orderTransport !==3">
        <img src="./img/icon-dps@2x.png">
        <label class="status-txt">待配送</label>
      </span>
      <!--待收货-->
      <span class="status-box" v-show="orderDetail.orderStatus == 30 && orderDetail.orderTransport !==3">
        <img src="./img/icon-dsh@2x.png">
        <label class="status-txt">待收货</label>
      </span>
      <!--自提 待取货-->
      <span class="status-box" v-show="(orderDetail.orderStatus == 20||orderDetail.orderStatus == 30) && orderDetail.orderTransport ==3">
        <img src="./img/icon-dsh@2x.png">
        <label class="status-txt">待取货</label>
        <label class="hint-txt box-flex">剩余{{orderDetail.surplusTime}}小时取货，超时系统将关闭订单并自动退款。</label>
      </span>
      <!--已完成-->
      <span class="status-box" v-show="orderDetail.orderStatus == 40">
        <img src="./img/icon-ywc@2x.png">
        <label class="status-txt">已完成</label>
      </span>
      <!--已退款-->
      <span class="status-box" v-show="orderDetail.orderStatus == 50">
        <img src="./img/icon-yqx@2x.png">
        <label class="status-txt">已退款</label>
        <label class="hint-txt box-flex">订单已取消，金额已退回至付款账户</label>
      </span>
      <!--部分退款-->
      <span class="status-box" v-show="orderDetail.orderStatus == 60">
        <img src="./img/icon-yqx@2x.png">
        <label class="status-txt">部分退款</label>
        <img
          src="./img/icon-qhsm@2x.png"
          alt=""
          style="width: 12px;height: 12px;"
          v-show="orderDetail.orderTransport !==3"
          @click="endShow()"
        >
        <em
          style="margin-left: 7px;"
          v-show="orderDetail.orderTransport !==3"
          @click="endShow()"
        > 取货说明</em>
      </span>
      <!--退款中-->
      <span class="status-box" v-show="orderDetail.orderStatus == 70">
        <img src="./img/icon-yqx@2x.png">
        <label class="status-txt">退款中</label>
        <label class="hint-txt box-flex">订单已取消，金额将会退回至您的付款账户</label>
      </span>
      <!--待评价-->
      <span class="status-box" v-show="orderDetail.orderStatus == 80">
        <img src="./img/icon-dpj@2x.png">
        <label class="status-txt">待评价</label>
      </span>
    </div>

    <!--待付款-->
    <!-- <ul
      class="order-logistics"  v-show="orderDetail.orderStatus == 10"
    >
      <li>
        <p>剩余{{orderDetail.surplusTime}}分钟付款，超时系统将关闭订单 </p>
        <em>{{orderDetail.createDate}}</em>
      </li>
    </ul> -->
    <!--待发货-->
    <ul
      class="order-logistics"
      v-show="orderDetail.orderStatus == 20 && orderDetail.orderTransport !==3"
    >
      <li v-show="orderDetail.orderTransport == 2">
        <p>物流信息：支付成功，药房备货中...</p>
        <em>{{orderDetail.modifyDate}}</em>
      </li>
      <li v-show="orderDetail.orderTransport == 1">
        <p>支付成功，等待发货配送</p>
        <em>{{orderDetail.modifyDate}}</em>
      </li>
    </ul>
    <!--商城-待收货-->
    <ul
      class="order-logistics"
      v-show="orderDetail.orderStatus == 30 && orderDetail.orderTransport == 1"
    >
      <li>
        <p>物流信息：{{logisticsInfoData.context}} </p>
        <em>{{logisticsInfoData.time}}</em>
      </li>
      <li @click="seeLogistics(orderDetail.logisticsNumber, orderDetail.logisticsType, orderDetail.orderId, orderDetail.orderTransport)" class="order-lastli"></li>
    </ul>
    <!--快送-待收货-->
    <ul
      class="order-logistics"
      v-show="orderDetail.orderStatus == 30 && orderDetail.orderTransport == 2"
    >
      <li>
        <p>配送中{{mtlogisticsInfoData.mtText}}</p>
        <em v-show="mtlogisticsInfoData.mtTime">{{mtlogisticsInfoData.mtTime}}</em>
        <em  v-show="!mtlogisticsInfoData.mtTime">{{orderDetail.modifyDate}}</em>
      </li>
      <li @click="seeLogisticsFast()" class="order-lastli" v-show="mtlogisticsInfoData.mtShow"></li>
    </ul>
    <!--自提-待收货-->
    <!--<ul-->
      <!--class="order-logistics"-->
      <!--v-show="orderDetail.orderStatus == 30 && orderDetail.orderTransport == 3"-->
    <!--&gt;-->
      <!--<li>-->
        <!--<p>请前往药柜处提取商品</p>-->
        <!--<em>{{orderDetail.orderPaymentTime}}</em>-->
      <!--</li>-->
    <!--</ul>-->
    <!--待评价 已完成同待评价-->
    <ul
      class="order-logistics"
      v-show="(orderDetail.orderStatus == 80 || orderDetail.orderStatus ==40)&& orderDetail.orderTransport !==3"
    >
      <li v-show="orderDetail.orderTransport == 1">
        <p>物流信息：{{logisticsInfoData.context}}</p>
        <em>{{orderDetail.modifyDate}}</em>
      </li>
      <li v-show="orderDetail.orderTransport == 1"  @click="seeLogistics(orderDetail.logisticsNumber, orderDetail.logisticsType, orderDetail.orderId, orderDetail.orderTransport)" class="order-lastli"></li>
      <li v-show="orderDetail.orderTransport == 2">
        <p>订单已完成</p>
        <em>{{orderDetail.modifyDate}}</em>
      </li>
      <li v-show="orderDetail.orderTransport == 3">
        <p>已取到商品</p>
        <em>{{orderDetail.modifyDate}}</em>
      </li>
    </ul>
    <!--已取消-->
    <!-- <ul
      class="order-logistics"
      v-show="(orderDetail.orderStatus == 0)&& orderDetail.orderTransport !==3"
    >
      <li>
        <p>订单已取消</p>
        <em>{{orderDetail.modifyDate}}</em>
      </li>
    </ul> -->
    <!--已退款-->
    <!-- <ul
      class="order-logistics"
      v-show="orderDetail.orderStatus == 50"
    >
      <li>
        <p>订单已取消，金额已退回至付款账户</p>
        <em>{{orderDetail.modifyDate}}</em>
      </li>
    </ul> -->
    <!--部分退款-->
    <ul
      class="order-logistics"
      v-show="orderDetail.orderStatus == 60"
    >
      <li>
        <p>部分商品已退款，金额退回至您的付款账户</p>
        <em>{{orderDetail.modifyDate}}</em>
      </li>
    </ul>
    <!--退款中-->
    <!-- <ul
      class="order-logistics"
      v-show="orderDetail.orderStatus == 70"
    >
      <li>
        <p>订单已取消，金额将会退回至您的付款账户..</p>
        <em>{{orderDetail.modifyDate}}</em>
      </li>
    </ul> -->

    <div
      class="self-user"
      v-show="orderDetail.orderTransport ==3"
    >
      <div class="self-userLeft">
        <div>
          <i></i>
          <span>{{sellerUser.sellerName}}</span>
        </div>
        <div style="margin-top: 5px;">
          <p>
            地址：{{sellerUser.sellerAddress}}
          </p>
        </div>
      </div>
      <!--// 自提，待发货和待收货显示步行导航按钮-->
      <div class="self-userRight" v-if="(orderDetail.orderStatus == 20||orderDetail.orderStatus == 30||orderDetail.orderStatus == 10) && orderDetail.orderTransport ==3">
        <em>
          {{m}}{{mapoK}}
        </em>
        <div @click="openMaps()">
          <i></i>
          <span>
            步行导航
          </span>
        </div>
      </div>
    </div>
    <div
      class="order-user"
      v-show="orderDetail.orderTransport !==3"
    >
      <div>
        <span v-if="userAddress&&userAddress.addressName">收货人：{{userAddress.addressName}}</span>
        <span v-if="userAddress&&userAddress.addressPhone">{{userAddress.addressPhone}}</span>
      </div>
      <div style="margin-top: 5px;">
        <p>
          地址：
          <span v-if="userAddress&&userAddress.addressProvince ">
            {{userAddress.addressProvince }}
          </span>
          <span v-if="userAddress&&userAddress.addressCity ">
            {{userAddress.addressCity }}
          </span>
          <span v-if="userAddress&&userAddress.addressDistrict ">
            {{userAddress.addressDistrict }}
          </span>
          <span v-if="userAddress&&userAddress.addressDetail ">
            {{userAddress.addressDetail }}
          </span>
          <span v-if="userAddress&&userAddress.addressNum">
            {{userAddress.addressNum}}
          </span>
        </p>
      </div>
    </div>
    <div class="goods-row"></div>
    <div class="order-detail">
      <div
        class="order-title"
        v-show="orderDetail.orderTransport !==3"
      >
        <i></i>
        <span>{{sellerUser.sellerName}}</span>
        <em v-show="orderDetail.orderTransport ==1">3天送达</em>
        <em v-show="orderDetail.orderTransport ==2">30分钟送达</em>
        <!--<em v-show="orderDetail.orderTransport ==3">自提</em>-->
        <em v-show="orderDetail.orderTransport ==4">7天送达</em>
      </div>
      <ul>
        <li
          v-for="orderItem in orderDetailIn"
          :key="orderItem.productId"
        >
          <img
            :src="orderItem.productMainImage"
            alt=""
          >
          <div class="order-name">
            <div>
              <span>{{orderItem.productName}}</span>
              <em>￥{{fixedMoney(orderItem.price)}} </em>
            </div>
            <div>
              <i>规格：{{orderItem.productSpecification}}</i>
              <strong>x{{orderItem.quantity}}</strong>
            </div>
            <p v-if="(orderItem.quantity - orderItem.pickUpNum>0) && orderDetail.orderTransport ==3 && orderDetail.orderStatus !== 10 && orderDetail.orderStatus !== 20 && orderDetail.orderStatus !==0">
              <span>未取货{{orderItem.quantity - orderItem.pickUpNum}}件</span>
            </p>
          </div>
        </li>
      </ul>
      <dl>
        <!--闪电配送，药柜自提，跨境，不显示发票-->
        <dt v-show="orderDetail.orderTransport !==3 && orderDetail.orderTransport !==2 && orderDetail.orderTransport !==4">
          <span>发票信息</span>
          <span v-if="orderDetail.invoiceInfo == null">不开具发票 <i></i> </span>
          <span v-else>{{orderDetail.invoiceInfo.invoiceTitle}}<i></i> </span>
        </dt>
        <dd>
          <span>商品金额</span>
          <span>￥{{fixedMoney(orderDetail.orderPayment - orderDetail.orderPostage + orderDetail.couponPrice + orderDetail.maTotalPrice)}}</span>
        </dd>
        <dd>
          <span>运费</span>
          <span>￥{{ fixedMoney(orderDetail.orderPostage)}}</span>
        </dd>
        <dd v-show="orderDetail.maTotalPrice">
          <span>促销活动</span>
          <span>-￥{{ fixedMoney(orderDetail.maTotalPrice)}}</span>
        </dd>
        <dd v-show="orderDetail.couponPrice">
          <span>优惠券</span>
          <span style="color:#f94f4f;">-￥{{ fixedMoney(orderDetail.couponPrice)}}</span>
        </dd>
        <dd>
          <span>金额合计</span>
          <span style="color:#f94f4f;">￥{{fixedMoney(orderDetail.orderPayment)}}</span>
        </dd>
      </dl>
      <div class="goods-row"></div>
      <dl>
        <dd>
          <span>订单编号</span>
          <span>{{orderDetail.orderId}}</span>
        </dd>
        <dd>
          <span>创建时间</span>
          <span>{{orderDetail.createDate}}</span>
        </dd>
      </dl>
    </div>
    <div class="goods-kf">
      <span>联系客服：4000-333-888</span>
    </div>
    <div class="order-button">
      <!--待付款，待配送，非自提-->
      <mt-button
        size="small"
        plain
        type="danger"
        v-if="((orderDetail.orderStatus == 10 || orderDetail.orderStatus == 20 )&& (orderDetail.orderTransport !==3))||((orderDetail.orderStatus == 10)&& (orderDetail.orderTransport ==3))"
        @click="cancelOrder()"
        :disabled="isDisable"
      >取消订单</mt-button>
      <!--待付款-->
      <mt-button
        size="small"
        plain
        type="primary"
        v-show="orderDetail.orderStatus == 10"
        @click="goBuy()"
      >去付款</mt-button>
      <!--商城待收货-->
      <mt-button
        size="small"
        plain
        type="danger"
        v-show="orderDetail.orderStatus == 30 && orderDetail.orderTransport == 1"
        @click="seeLogistics(orderDetail.logisticsNumber, orderDetail.logisticsType, orderDetail.orderTransport)"
      >查看物流</mt-button>
      <!--快送待收货-->
      <mt-button
        size="small"
        plain
        type="danger"
        v-show="orderDetail.orderStatus == 30 && orderDetail.orderTransport ==2 && mtlogisticsInfoData.mtShow"
        @click="seeLogisticsFast()"
      >查看配送</mt-button>
      <mt-button
        size="small"
        plain
        type="primary"
        v-show="orderDetail.orderStatus == 30 && orderDetail.orderTransport !==3"
        @click="receiptOrder()"
        :disabled="isDisable"
      >确认收货</mt-button>
      <!--自提 待取货-->
      <mt-button
        size="small"
        plain
        type="danger"
        v-show="(orderDetail.orderStatus == 20||orderDetail.orderStatus == 30) && orderDetail.orderTransport ==3"
        @click="seeCode()"
      >查看取货码</mt-button>
      <!--待评价-->
      <mt-button
        size="small"
        plain
        type="primary"
        v-show="orderDetail.orderStatus == 80"
        @click="goEvaluate()"
      >去评价</mt-button>
      <!--已完成-->
      <mt-button
        size="small"
        plain
        type="primary"
        v-show="orderDetail.orderStatus == 40"
        @click="seeEvaluate()"
      >查看评价</mt-button>
    </div>
    <!--查看取货码-->
    <div
      class="allScreen"
      @click="StopSeeCode($event)"
      v-show="codeShow"
    >
      <dl class="seeCode">
        <dt class="seeCodeIn"></dt>
        <dd class="seeCodeIn">药品取货码</dd>
        <dd class="seeCodeIn">{{orderDetail.extractCode}}</dd>
        <dd class="seeCodeIn">在药柜上输入取货码，拿取药品</dd>
      </dl>
    </div>
  </div>
</template>
<script>
import { Button, Toast, MessageBox } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
import { formatDate } from '@/utils/date.js';
import { goPay } from '@/api/goPay.js';
import medicineRequest from '@/utils/WmedicineRequest';
// import { getLogis, getLogis1 } from '@/utils/LOG.js';
import { getCoordinate, distanceByLnglat, openMap, distanceTime } from '@/api/coordinate.js';
import { goEvaluateBtn, nseeEvaluateBtn, cancelOrderBtn, seeLogisticsBtn, receiptOrderBtn, seeLogisticsFastBtn, mtBtn } from '@/api/orderButton';
export default {
  data() {
    return {
      isShow: true,
      orderDetail: {},
      userAddress: {},
      sellerUser: {},
      orderDetailIn: {},
      orderId: 0,
      codeShow: false,
      logisticShow: false,
      logisticsInfoData: {
        context: '',
        time: ''
      },
      m: 0,
      mtime: 0,
      isDisable: false,
      mapoK: '',
      mtlogisticsInfoData: {
        mtText: '',
        mtTime: '',
        mtShow: false
      },
      logisticsInfo2: {}
    };
  },
  components: {
    Button,
    Toast,
    MessageBox
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    // 请求订单详情数据
    getOrderDetail() {
      let url = '/mall/order/queryUserOrderDetailByOrderId';
      this.orderId = this.$route.query.orderId || sessionStorage.getItem('order_orderId');
      let data = {
        orderId: this.orderId,
      };
      javaAjax.post(url, data).then((res) => {
        // orderStatus 订单状态 0-已取消 10-待付款 20待发货 30-待收货 40-交易成功 50-已退款 60 -部分退款 70-退款中 80-待评价
        // orderTransport 配送方式：1-普通物流， 2-28分钟达，3-自提
        if (res.data.resultCode === '0') {
          console.log(res.data.resultData, '订单详情');
          this.orderDetail = res.data.resultData;
          this.userAddress = res.data.resultData.userAddress;
          this.sellerUser = res.data.resultData.sellerUser;
          console.log(this.userAddress, 'user');
          this.orderDetailIn = res.data.resultData.orderDetail;
          this.orderDetail.orderTransport = parseInt(this.orderDetail.orderTransport, 10);
          this.orderDetail.orderStatus = parseInt(this.orderDetail.orderStatus, 10);
          let { logisticsNumber, logisticsType, orderId } = res.data.resultData;
          this.logisticsInfo2 = { logisticsNumber, logisticsType, orderId };
          console.log('1.用户详情信息获取成功，开始转换物流类型', this.logisticsInfo2);
          if (this.orderDetail.orderStatus === 10) {
            // 代付款，30分钟内付款
            // 毫秒 --> 分，去尾
            this.orderDetail.surplusTime = Math.floor(this.orderDetail.surplusTime / 1000 / 60);
          } else if ((this.orderDetail.orderStatus === 20 || this.orderDetail.orderStatus === 30) && parseInt(this.orderDetail.orderTransport, 10) === 3) {
            // 自提订单且待收货状态
            // 毫秒 --> 小时，去尾
            this.orderDetail.surplusTime = Math.floor(this.orderDetail.surplusTime / 1000 / 60 / 60);
          }
          // 更新时间
          this.orderDetail.modifyDate = formatDate(new Date(this.orderDetail.modifyDate), 'yyyy-MM-dd hh:mm:ss');
          // 待收货和待评价，商城，调物流接口
          if ((this.orderDetail.orderStatus === 30 || this.orderDetail.orderStatus === 80 || this.orderDetail.orderStatus === 40) && this.orderDetail.orderTransport === 1) {
            // this.getLogistics();
            this.queryKdnName(this.logisticsInfo2.logisticsType);
          }
          // 待收货，快送，查询美团物流
          if (this.orderDetail.orderStatus === 30 && this.orderDetail.orderTransport === 2) {
            this.getLogisticsFast();
          }
          this.orderDetail.createDate = formatDate(new Date(this.orderDetail.createDate), 'yyyy-MM-dd hh:mm:ss');
          // 当自提，显示导航与地图
          if (this.orderDetail.orderTransport === 3) {
            this.mathM();
          }
        }
      });
    },
    // 转换物流类型，兼容旧接口
    queryKdnName(type) {
      let url = '/mall_suport/back/order/queryKdnName';
      let param = {
        type: type
      };
      medicineRequest.post(url, param).then(res => {
        if (res.status === 200 && res.data.resultCode === '0' && res.data.resultData) {
          this.logisticsInfo2.logisticsType = res.data.resultData.kdnName;
          console.log('2.物流类型转换成功，开始获取西药物流信息', this.logisticsInfo2);
          this.getLogis2();
        }
      });
    },
    // 获取西药物流信息
    getLogis2() {
      // 西药接口
      let url = '/mall_suport/back/order/logisticsInfo';
      let params = this.logisticsInfo2;
      medicineRequest.post(url, params).then(res => {
        if (res) {
          let response = res.data;
          if (res.status === 200 && response && response.resultCode === '0' && response.resultData) {
            // this.logisticsInfo = response.resultData;
            console.log('3.西药物流信息获取成功', response);
            this.logisticsInfoData.context = response.resultData.Traces.length > 0 ? response.resultData.Traces.concat().shift().AcceptStation : '';
            this.logisticsInfoData.time = response.resultData.Traces.length > 0 ? response.resultData.Traces.concat().shift().AcceptTime : '';
            console.log(this.logisticsInfoData);
          } else {
            // eslint-disable-next-line no-unused-expressions
            this.logisticsInfoData.context = '暂无物流信息';
          }
        }
      });
    },
    // 请求物流信息
    // getLogistics() {
    //   this.logisticShow = true;
    //   let logisticsInfo = {
    //     logisticsNumber: this.orderDetail.logisticsNumber,
    //     logisticsType: this.orderDetail.logisticsType
    //   };
    //   javaAjax.post('/mall/back/order/logisticsInfo', logisticsInfo).then(res => {
    //     if (res.data.resultCode === '0') {
    //       let infoList = res.data.resultData.data;
    //       console.log(infoList, '订单');
    //       if (infoList && infoList.length > 0) {
    //         this.logisticsInfoData = infoList[0];
    //       } else {
    //         this.logisticsInfoData = {
    //           context: '您的订单正在配送中..'
    //         };
    //       }
    //     } else {
    //       this.logisticsInfoData = {
    //         context: '您的订单正在配送中...'
    //       };
    //     }
    //   });
    // },
    // 请求美团物流信息
    getLogisticsFast() {
      console.log('美团');
      this.logisticShow = true;
      let logisticsInfo = {
        logisticsNumber: this.orderDetail.logisticsNumber,
        logisticsType: '美团',
        orderId: this.orderId
      };
      mtBtn(logisticsInfo).then((res) => {
        if (res.data.resultCode === '0') {
          console.log(res.data.resultData, '骑手物流');
          console.log(res.data.resultData.status === 20, '=20');
          //  0：待调度  20：已接单   30：已取货   50：已送达  99：已取消
          // this.mtlogisticsInfoData.mtTime = formatDate(new Date(res.data.resultData.date), 'yyyy-MM-dd hh:mm:ss');
          if (res.data.resultData.status === 20 || res.data.resultData.status === 30) {
            this.mtlogisticsInfoData = {
              mtText: '(骑手已接单)',
              mtShow: true,
              mtTime: formatDate(new Date(res.data.resultData.date), 'yyyy-MM-dd hh:mm:ss')
            };
          } else if (res.data.resultData.status === 50) {
            this.mtlogisticsInfoData = {
              mtText: '(已送达)',
              mtShow: false
            };
          }
          else {
            this.mtlogisticsInfoData = {
              mtText: '',
              mtShow: false
            };
          }
          console.log(this.mtlogisticsInfoData);
        }
      });
    },
    // 已完点击显示
    endShow() {
      MessageBox('取货说明', '未成功取货的商品，在有效期内可以再次去药柜输入取货码提货。若超过48小时有效期仍未取货，则系统会退款至原支付方式。');
    },
    // 去评价按钮
    goEvaluate() {
      goEvaluateBtn(this.orderId);
    },
    // 查看评价按钮
    seeEvaluate() {
      nseeEvaluateBtn(this.orderId);
    },
    // 取消订单按钮
    cancelOrder() {
      this.isDisable = true;
      cancelOrderBtn(this.orderId).then((res) => {
        this.isDisable = false;
        if (res.data.resultCode === '0') {
          this.isDisable = true;
          Toast('取消订单成功');
          this.getOrderDetail();
        }
      });
    },
    // 查看物流按钮
    seeLogistics(logisticsNumber, logisticsType, orderId, orderTransport) {
      seeLogisticsBtn(logisticsNumber, logisticsType, orderId, orderTransport);
    },
    // 查看快送按钮
    seeLogisticsFast() {
      seeLogisticsFastBtn(this.orderId);
    },
    // 确认收货按钮
    receiptOrder() {
      this.isDisable = true;
      receiptOrderBtn(this.orderId).then((res) => {
        this.isDisable = false;
        if (res.data.resultCode === '0') {
          this.isDisable = true;
          Toast('确认收货成功');
          this.getOrderDetail();
        }
      });
    },
    // 查看取货码
    seeCode() {
      this.codeShow = true;
    },
    // 关闭取货码
    StopSeeCode(e) {
      if (e.target.className === 'seeCode' || e.target.className === 'seeCodeIn') {
        this.codeShow = true;
      } else {
        this.codeShow = false;
      }
    },
    // 去付款按钮
    goBuy() {
      // 这里要存一个orderId,支付取消返回拿不到orderId,页面为空---wlj
      sessionStorage.setItem('order_orderId', this.orderId);
      goPay({ orderList: this.orderId, orderAmount: this.orderDetail.orderPayment, payType: 'product' });
    },
    // 计算距离和米
    mathM() {
      // 获取当前定位
      getCoordinate(res => {
        if (res && this.orderDetail) {
          console.log(res, '获取');
          // 计算距离 lng1(当前经度), lat1(当前纬度), lng2(目的地经度), lat2(目的地纬度)
          // let m =  distanceByLnglat( res.longitude, res.latitude,  114.0353900000, 22.5247550000);
          let m = distanceByLnglat(res.longitude, res.latitude, this.orderDetail.sellerUser.longitude, this.orderDetail.sellerUser.latitude);
          let mdata = distanceTime(m);
          this.m = mdata.hintTxt;
          console.log(this.m, '距离');
        }
      });
    },
    // 打开地图
    openMaps() {
      //  目的地经纬度,名称,地址
      // this.mapoK = '|' +this.orderDetail.sellerUser.latitude + this.orderDetail.sellerUser.longitude + this.orderDetail.sellerUser.sellerName + this.orderDetail.sellerUser.sellerAddress;
      if (this.orderDetail && this.orderDetail.sellerUser) {
        let sellerUser = this.orderDetail.sellerUser;
        let latitude = sellerUser.latitude;
        let longitude = sellerUser.longitude;
        let sellerName = sellerUser.sellerName;
        let sellerAddress = sellerUser.sellerAddress;
        openMap(latitude, longitude, sellerName, sellerAddress);
      }
      // openMap(22.568089, 114.051769, '深圳康美总部仓库', '下梅林泰科路3号康美药业有限公司仓库');
    },
    fixedMoney(m) {
      let money = Number(m);
      if (!Number.isNaN(money)) {
        // return Math.round(money * 100) / 100;
        return money.toFixed(2);
      }
    },
    goBack() {
      let url = '';
      if (this.orderDetail.orderStatus === 10) {
        url = '/submitOrder/orderList?orderNum=1';
      } else if (this.orderDetail.orderStatus === 20) {
        url = '/submitOrder/orderList?orderNum=2';
      } else if (this.orderDetail.orderStatus === 30) {
        url = '/submitOrder/orderList?orderNum=3';
      } else if (this.orderDetail.orderStatus === 80) {
        url = '/submitOrder/orderList?orderNum=4';
      } else {
        url = '/submitOrder/orderList?orderNum=0';
      }
      this.$router.push(url);
    }
  },
  destroyed() {
    sessionStorage.removeItem('order_orderId');
  }
};

</script>
<style scoped lang="less">
  @import "../../styles/mixin.less";

  .borderBottom {
    border-bottom: 1px solid #e0e0e0;
  }

  .goods-row {
    width: 100%;
    height: 10px;
    background-color: #f5f5f5;
  }

  .orders {
    padding-top: 44px;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #ffffff;
  }

  .order-state {
    width: 100%;
    height: 79px;
    background: url("./img/bg@2x.png") repeat-x;
    background-size: 100% 79px;
    display: flex;
    align-items: center;
    .status-box {
      display: flex;
      height: 20px;
      margin: 0 35px;
      line-height: 20px;
      align-items: center;
      color: #ffffff;

      img {
        float: left;
        width: 20px;
        height: 20px;
      }

      .status-txt {
        display: block;
        margin: 0 15px 0 10px;
        font-size: 19px;
      }

      .hint-txt {
        display: block;
        flex: 1;
        -webkit-box-flex: 1;
        line-height: 18px;
        font-size: 12px;
      }

      em {
        float: left;
        margin-left: 15px;
        font-size: 12px;
      }

      strong {
        font-size: 13px;
        float: right;
        display: inline-block;
        width: 45%;
        height: 36px;
        background-color: rgba(255, 255, 255, 0.22);
        border-top-left-radius: 35px;
        border-bottom-left-radius: 35px;
        text-align: center;
      }

      i {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        color: #ffffff;
        line-height: 22px;
      }
    }
  }

  .order-logistics {
    background-color: #ffffff;
    padding: 10px;
    width: 100%;
    min-height: 58px;
    .borderBottom;
    display: flex;
    justify-content: space-between;
    align-items: center;

    li:first-child {
      width: 90%;

      p {
        color: #ff4c56;
        font-size: 15px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      em {
        font-size: 11px;
        color: #666;
      }
    }

    li.order-lastli{
      margin-right: 10px;
      .turn-icon(#666, 12px, 225deg);
    }
  }

  .order-user {
    background-color: #ffffff;
    padding: 10px;
    color: #333333;
    line-height: 23px;
    font-size: 14px;

    .presc-default {
      font-size: 15px;
      color: @green-color;
    }

    div {
      display: flex;
      justify-content: space-between;
    }
  }

  .order-detail {
    background-color: #ffffff;

    .order-title {
      padding: 10px;
      display: flex;
      align-items: center;
      color: #333333;

      i {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url("./img/icon-sj@2x.png") no-repeat;
        background-size: 100% 100%;
      }

      span {
        max-width: 75%;
        margin-left: 7px;
        font-size: 12px;
      }

      em {
        padding: 0 5px;
        margin-left: 10px;
        max-height: 40px;
        border-radius: 5px;
        border: solid 1px @green-color;
        font-size: 11px;
        color: @green-color;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 17px;
      }
    }

    ul li:not(:first-child) {
      margin-top: 6px;
    }

    ul li {
      width: 100%;
      background-color: #fafafa;
      padding: 6px 10px;
      display: flex;

      img {
        width: 69px;
        height: 69px;
        background: red;
      }

      .order-name {
        flex: 1;
        margin-left: 10px;

        div {
          display: flex;
          justify-content: space-between;
        }

        div:last-child {
          color: #666666;
          font-size: 12px;
          margin-top: 11px;
        }

        div:first-child {
          margin-top: 3px;
          font-size: 14px;
          color: #333333;

          span {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            display: -moz-box;
            -moz-line-clamp: 2 !important;
            -moz-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        p {
          margin-top: 5px;

          span {
            display: flex;
            flex-direction: row-reverse;
            font-size: 12px;
            color: rgb(249, 79, 79);
          }
        }
      }
    }

    dt,
    dd {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      font-size: 15px;
      color: #999999;
      .borderBottom;

      span:first-child {
        color: #333333;
      }
    }

    dt {
      i {
        .turn-icon(#666666, 8px, 225deg);
      }
    }

    dd:last-child {
      border: none;
    }
  }

  .order-button {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
      margin-right: 10px;
    }
  }

  .self-user {
    background-color: #ffffff;
    padding: 10px;
    color: #333333;
    line-height: 23px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;

    i {
      display: inline-block;
      width: 13px;
      height: 13px;
      background: url("./img/icon-sj@2x.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 2px;
    }

    .presc-default {
      font-size: 15px;
      color: @green-color;
    }

    .self-userLeft {
      flex: 1;
    }

    .self-userRight {
      width: 30%;
      margin-left: 20px;
      em {
        font-size: 11px;
        color: #333333;
        display: inline-block;
        width: 100%;
        word-wrap: break-word;
      }

      div {
        margin-top: 7px;
        width: 71px;
        height: 17px;
        border-radius: 2px;
        border: solid 1px #333333;
        font-size: 11px;
        color: #333333;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      i {
        display: flex;
        width: 10px;
        height: 10px;
        background: url("./img/icon-bxdh@2x.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .allScreen {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0px;
    top: 0px;
    display: block;
    z-index: 100000;

    .seeCode {
      border-radius: 5px;
      width: 60%;
      height: 180px;
      background-color: #fff;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 99;
      padding: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      dt,
      dd {
        display: block;
      }

      dt {
        width: 60px;
        height: 60px;
        position: absolute;
        top: -30px;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        background-color: @green-color;
        border-radius: 50%;
        background-image: url("./img/icon-qhm@2x.png");
        background-size: 100%;
      }

      dd:nth-child(2) {
        font-size: 17px;
        color: #333333;
        margin-top: 15px;
      }

      dd:nth-child(3) {
        margin-top: 13px;
        font-size: 24px;
        color: @green-color;
      }

      dd:nth-child(4) {
        font-size: 12px;
        color: #666666;
        margin-top: 15px;
        text-align: center;
        align-content: center;
      }
    }
  }

  .goods-kf {
    width: 100%;
    padding: 10px;
    background-color: #f5f5f5;
    color: #333;
    font-size: 12px;
    text-align: center;
  }
</style>

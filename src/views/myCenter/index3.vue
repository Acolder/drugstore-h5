<template>
  <div class="my-center">
    <div class="header">
      <!-- 设置 -->
      <router-link to="/aboutus" class="setUp">
        <i class="setUp-icon"></i>
      </router-link>
      <!-- 用户登录消息状态 -->
      <router-link to="/allNews" class="header-top" v-if="userInfo">
        <i class="msg-num" v-show="messagesNum>0">{{messagesNum}}</i>
      </router-link>
      <!-- 用户未登录消息状态 -->
      <router-link to="/fastLogin" class="header-top" v-else>
      </router-link>
      <!-- 用户登录头部信息状态 -->
      <div class="header-bottom" v-if="userInfo">
        <!-- 用户设置的头像 -->
        <div v-if="userInfo.photopath">
          <img :src="userInfo.photopath" class="portrait"/>
        </div>
        <!-- 用户性别的默认头像 -->
        <div v-else>
          <img src="./img/icon-male.png" class="portrait" v-if="userInfo.gender==1"/>
          <img src="./img/icon-female.png" class="portrait" v-if="userInfo.gender==0"/>
        </div>
        <div class="information-wrapper">
          <div class="information-left">
            <div class="phone">{{userInfo.mobile}}</div>
            <div class="information-name">
              <span class="name">{{userInfo.nickname}}</span>
              <i class="icon sex female" v-if="userInfo.gender==0"></i>
              <i class="icon sex man" v-else></i>
            </div>
          </div>
          <div class="account-perfusion">
            <router-link to="/accountManage?times=first" class="right mint-cell-allow-right account-msg">账号管理
            </router-link>
          </div>
        </div>
      </div>
      <!-- 用户未登录头部信息状态 -->
      <div class="header-bottom" v-else>
        <div class="img-div"></div>
        <div class="information-wrapper none-header">
          <div class="none-information-left">
            <router-link to="/fastLogin">登录</router-link>
            <router-link to="/registe">注册</router-link>
          </div>
          <div class="account-perfusion">
            <router-link to="/accountManage?times=first" class="right mint-cell-allow-right account-msg">账号管理
            </router-link>
          </div>
        </div>
      </div>
      <!-- 头部导航栏 -->
      <div class="header-nav">
        <div class="header-nav-left">
          <router-link to="/myCenter/MedicalRecords">
            <div>
              <img src="./img/wd-wyjl@2x.png" alt="">
              <span>问医记录</span>
            </div>
          </router-link>
          <a @click="AskDoctor">
            <div >
              <img src="./img/wd-zxwy@2x.png" alt="">
              <span>在线问医</span>
            </div>
          </a >
        </div>
        <i class="header-nav-line"></i>
        <div class="header-nav-right">
          <router-link to="/myCenter/PharmacistRecords">
            <div>
              <img src="./img/wd-ysjl@2x.png" alt="">
              <span>药师记录</span>
            </div>
          </router-link>
          <a href="javascript:void(0);" @click="goChatPage">
            <div>
              <img src="./img/wd-zxys@2x.png" alt="">
              <span>咨询药师</span>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- 我的订单栏 -->
    <div class="my-center-top">
        <div>
          <label class="tlt">我的订单</label>
          <router-link to="/submitOrder/orderList?orderNum=0" class="right mint-cell-allow-right all-order">查看全部订单</router-link>
        </div>
    </div>
    <div class="my-order">
      <span class="display-box">
            <router-link to="/submitOrder/orderList?orderNum=1" class="box-flex wait-receipt">
                <i class="icon"><span class="number" v-if="orderNumber.daifukuan>0">{{orderNumber.daifukuan}}</span></i>
                <label>待付款</label>
            </router-link>
            <router-link to="/submitOrder/orderList?orderNum=2" class="box-flex wait-shipments">
                <i class="icon"><span class="number" v-if="orderNumber.daifahuo>0">{{orderNumber.daifahuo}}</span></i>
                <label>待发货</label>
            </router-link>
            <router-link to="/submitOrder/orderList?orderNum=3" class="box-flex wait-delivery">
                <i class="icon"><span class="number" v-if="orderNumber.daishouhuo>0">{{orderNumber.daishouhuo}}</span></i>
                <label>待收货</label>
            </router-link>
            <router-link to="/submitOrder/orderList?orderNum=4" class="box-flex wait-evaluate">
                <i class="icon"><span class="number" v-if="orderNumber.daipingjia>0">{{orderNumber.daipingjia}}</span></i>
                <label>待评价</label>
            </router-link>
        </span>
    </div>
    <!-- 处方购药订单 -->
    <div class="my-center-top">
      <div>
        <label class="tlt">处方购药订单 </label>
        <router-link to="/submitOrder/orderList?orderNum=0" class="right mint-cell-allow-right all-order">查看全部订单</router-link>
      </div>
    </div>
    <div class="prescription-order">
      <span class="fun-box">
            <router-link to="/prescription/prescription-order?activeId=2" class="m-fun">
                <i class="icon to-be-confirmed"></i>
                <label>待确认</label>
            </router-link>
            <router-link to="/prescription/prescription-order?activeId=3" class="m-fun m-fun2">
                <i class="icon confirmed"></i>
                <label>已确认</label>
            </router-link>
            <router-link to="/prescription/prescription-order?activeId=5" class="m-fun">
                <i class="icon cancel"></i>
                <label>已取消</label>
            </router-link>
        </span>
    </div>
    <!-- 我的问诊订单 -->
    <div class="my-center-top marb10">
      <div>
        <label class="tlt">我的问诊订单</label>
        <router-link to="" class="right mint-cell-allow-right all-order">查看全部</router-link>
      </div>
    </div>
    <!-- 我的头条 -->
    <div class="my-center-top marb10">
      <div>
        <label class="tlt">我的头条</label>
        <router-link to="" class="right mint-cell-allow-right all-order">查看全部</router-link>
      </div>
    </div>
    <!-- 地图功能栏 -->
    <div class="else-fun">
        <span class="fun-box">
            <router-link to="/addressMgr" class="m-fun">
                <img src="./img/xh_wd_dzgl.png" alt="" class="icon-img">
                <label>地址管理</label>
            </router-link>
            <router-link to="/inquiry/manageinquiryPeople?type=edit" class="m-fun m-fun2">
                <img src="./img/xh_wd_jzrgl.png" alt="" class="icon-img">
                <label>就诊人管理</label>
            </router-link>
            <router-link to="/customerServer" class="m-fun">
                <img src="./img/xh_wd_bzkf.png" alt="" class="icon-img">
                <label>帮助&客服</label>
            </router-link>
        </span>
        <span class="fun-box">
            <router-link to="/customerServer/suggestion" class="m-fun">
                <img src="./img/xh_wd_yjfk.png" alt="" class="icon-img">
                <label>意见反馈</label>
            </router-link>
            <router-link to="/customerServer" class="m-fun m-fun2">
                <img src="./img/xh_wd_wxgzh.png" alt="" class="icon-img">
                <label>微信公众号</label>
            </router-link>
            <router-link to="/aboutus" class="m-fun about-us">
                <img src="./img/xh_wd_gywm.png" alt="" class="icon-img">
                <label>关于我们</label>
            </router-link>
        </span>
    </div>
    <div class="version-number">
      版本号v1.0
    </div>
  </div>
</template>
<script>
import inquiry from '../../components/inquiryEntrance/index.vue';
import { getMsgNum } from '@/api/getMsgNum';
import ajax from '@/utils/ajax';
import javaAjax from '@/utils/javaApiRequest';
import { intoInquiry } from '@/api/user';
export default {
  data() {
    return {
      userInfo: null,
      messagesNum: 1,
      orderNumber: {
        daifahuo: 1,
        daifukuan: 1,
        daipingjia: 1,
        daishouhuo: 1
      }
    };
  },
  components: {
    'v-inquiry': inquiry
  },
  methods: {
    goChatPage() {
      location.href = '/inquiry/consultPharmacist';
    },
    // 在线问医
    AskDoctor() {
      intoInquiry();
    },
    // 请求消息数量
    getMsg() {
      let _this = this;
      getMsgNum((res) => {
        if (res && res.unreadcount) {
          _this.messagesNum = res.unreadcount;
        }
      });
    },
    // 查询订单气泡
    getData() {
      javaAjax.post('/mall/order/queryOrderBub').then(res => {
        if (res.status === 200 && res.data.resultCode === '0') {
          this.orderNumber = res.data.resultData;
        }
      });
    }
  },
  created() {
    // 请求用户的信息
    ajax.get('/api/user/info').then(data => {
      if (data.status === 200 && data.data.code === 0) {
        this.userInfo = data.data.data;
      }
    });
    this.getData();
    this.getMsg();
  }
};
</script>
<style lang="less" scoped>
  @white-color: #FFF;
  @blue-color: #0ccdd4;
  @lbai-color: #61dce4;
  @color999: #999;
  @Elves-icon: url("./img/myCenter.png") no-repeat;
  @icon-size: 100px;
  .after() {
    right: 0;
    width: 8px;
    height: 8px;
    border-top-width: 1px;
    border-right-width: 1px;
  }
  .icon-style() {
    display: block;
    margin: 0 auto 5px;
    position: relative;
  }
  .my-center {
    position: absolute;
    top: 0;
    bottom: 48px;
    left: 0;
    right: 0;
    overflow: auto;
    background: #EFEEF4;
    // 精灵图
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: @Elves-icon;
      background-size: @icon-size;
    }
    // 头部
    .header {
      color: @white-color;
      padding: 24px 0 0 10px;
      height: 164px;
      background: @blue-color;
      position: relative;
      // 设置
      .setUp-icon{
        position: absolute;
        display: block;
        width: 17px;
        height: 17px;
        top: 10px;
        right: 55px;
        background: url("./img/xh_wd_set@2x.png");
        background-size: 100% 100%;
      }
      // 消息数量
      .header-top {
        display: block;
        width: 17px;
        height: 17px;
        background: red;
        height: 22px;
        position: absolute;
        top: 10px;
        right: 20px;
        background: @Elves-icon;
        background-size:  @icon-size;
        background-position: -83px -1px;
        .msg-num {
          position: absolute;
          top: -5px;
          right: -6px;
          width: 13px;
          height: 13px;
          line-height: 13px;
          font-size: 8px;
          background: #F00;
          border-radius: 50%;
          text-align: center;
          color: #FFF;
        }
      }
      // 头像信息处
      .header-bottom {
        width: 100%;
        height: 53px;
        display: flex;
        .portrait {
          width: 53px;
          height: 53px;
          margin-right: 6px;
          border-radius: 53px;
        }
        .information-wrapper {
          flex: 1;
          height: 53px;
          position: relative;
          display: flex;
          justify-content: space-between;
          .information-left {
            margin-top: 10px;
            .sex {
              width: 12px;
              height: 12px;
            }
            .female {
              background-position: -24px -45px;
            }
            .man {
              background-position: -43px -46px;
            }
          }
          // 未登录处账号名字
          .none-information-left {
            display: flex;
            align-items: center;
            justify-content: center;
            a {
              color: #FFF;
              padding: 0 12px;
              font-size: 17px;
              display: inline-block;
            }
            > a:first-child {
              border-right: 1px solid @lbai-color;
            }
          }
          // 账号管理
          .account-perfusion {
            width: 90px;
            height: 30px;
            border-radius: 15px 0 0 15px;
            margin-top: 16px;
            padding-left: 5px;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #3ed7dc;
            .account-msg {
              position: relative;
              padding-right: 10px;
              color: @white-color;
              &:after {
                .after;
                border-color: @white-color;
              }
            }
          }
        }
      }
      // 未登录头像
      .img-div {
        width: 53px;
        height: 53px;
        margin-right: 6px;
        background: #DCDCDC;
        border-radius: 50%;
      }
      // 头部导航
      .header-nav {
        height: 84px;
        padding: 20px 20px 20px 10px;
        display: flex;
        font-size: 12px;
        position: relative;
        .header-nav-left {
          padding-right: 35px;
          display: flex;
          justify-content: space-between;
        }
        .header-nav-right {
          padding-left: 35px;
          display: flex;
          justify-content: space-between;
        }
        .header-nav-line {
          position: absolute;
          left: 50%;
          top: 22px;
          display: block;
          height: 35px;
          width: 1px;
          background: @lbai-color;
        }
        img {
          width: 20px;
          height: 20px;
          display: block;
        }
        span {
          display: block;
          width: 50px;
           height: 12px;
        }
        > div {
          width: 50%;
          height: 100%;
          > a > div {
            color: @white-color;
            width: 50px;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      }
    }
    // 箭头栏
    .my-center-top {
      width: 100%;
      height: 44px;
      padding: 0 10px 0 10px;
      background: @white-color;
      >div{
        width: 100%;
        height: 44px;
        background: @white-color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tlt {
          padding-left: 7px;
          font-size: 15px;
          line-height: 15px;
          border-left: solid 4px @blue-color;
        }
        .all-order {
          position: relative;
          font-size: 14px;
          color: @color999;
          padding-right: 15px;
          border-color: @color999;
          &:after {
            .after;
            border-color: @color999;
          }
        }
      }
    }
    // 数量
    .number{
      min-width: 19px;
      height: 15px;
      line-height: 15px;
      border-radius: 10px;
      color: #F00;
      background: #FFF;
      border: 1px solid #F00;
      font-size: 10px;
      position: absolute;
      top: -5px;
      right: -6px;
      transform: scale(0.7);
    }
    // 我的订单
    .my-order {
      height: 61px;
      background: @white-color;
      margin-bottom: 10px;
      .box-flex {
        font-size: 13px;
        text-align: center;
      }
      .icon {
        .icon-style;
      }
      .wait-receipt {
        .icon {
          background-position: 1px 0;
        }
      }
      .wait-shipments {
        .icon {
          background-position: -19px 0;
        }
      }
      .wait-delivery {
        .icon {
          width: 22px;
          background-position: -40px 0;
        }
      }
      .wait-evaluate {
        .icon {
          background-position: -62px 0;
        }
      }
    }
    // 处方购药订单
    .prescription-order {
      height: 55px;
      background: @white-color;
      margin-bottom: 10px;
      width: 100%;
      .fun-box {
        width: 100%;
        height: 55px;
        font-size: 12px;
        .m-fun {
          float: left;
          width: 25%;
          text-align: center;
        }
        .m-fun2 {
          width: 50%;
        }
        .icon {
          .icon-style;
        }
        .to-be-confirmed {
          background: url("./img/icon-dqr@2x.png") no-repeat;
          background-size: 100% 100%;
        }
        .confirmed {
          background: url("./img/icon-yqr@2x.png") no-repeat;
          background-size: 100% 100%;
        }
        .cancel {
          background: url("./img/icon-dqx@2x.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .marb10{
      margin-bottom: 10px;
    }
    // 地图功能栏
    .else-fun {
      height: 135px;
      background: @white-color;
      .fun-box {
        width: 100%;
        height: 67.5px;
        font-size: 12px;
        display: flex;
        padding: 0 5px;
        .m-fun {
          width: 25%;
          text-align: center;
          padding-top: 10px;
        }
        .m-fun2 {
          width: 50%;
        }
        .icon-img {
          .icon-style;
          width: 20px;
          height: 20px;
          background-size: 100px;
        }
      }
    }
    // 版本号
    .version-number {
      width: 100%;
      height: 25px;
      color: #5D5C61;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      text-decoration: underline;
    }
  }
</style>

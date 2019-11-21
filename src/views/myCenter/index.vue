<template>
  <div class="my-center">
    <div class="header">
      <!-- 设置 -->
      <router-link to="/aboutus" class="setUp">
        <i class="setUp-icon"></i>
      </router-link>
      <!-- 用户登录消息状态 -->
      <a @click="clickMes" class="header-top" v-if="userInfo">
        <i class="msg-num" v-show="messagesNum>0">{{messagesNum}}</i>
      </a>
      <!-- 用户未登录消息状态 -->
      <router-link to="/fastLogin" class="header-top" v-else>
      </router-link>
      <!-- 用户登录头部信息状态 -->
      <div class="header-bottom" v-if="userInfo">
        <a href="javascript:void(0);" @click="accountInfo">
          <!-- 用户设置的头像 -->
          <img :src="userInfo.photopath" class="portrait" v-if="userInfo.photopath"/>
          <!-- 用户性别的默认头像 -->
          <span v-else>
            <img src="./img/icon-male.png" class="portrait" v-if="userInfo.gender==1"/>
            <img src="./img/icon-female.png" class="portrait" v-if="userInfo.gender==0"/>
          </span>
        </a>
        <div class="nickname">
          {{userInfo.nickname}}
        </div>
        <div class="phonenum">
          {{userInfo.mobile}}
        </div>
      </div>
      <!-- 用户未登录头部信息状态 -->
      <div class="header-bottom" v-else>
        <router-link to="/fastLogin"><img src="./img/xh_icon_unlogin@2x.png" class="portrait" @click.stop=""/></router-link>
        <div class="login_registe">
          <router-link to="/fastLogin">登录</router-link>
          <i></i>
          <router-link to="/registe">注册</router-link>
        </div>
      </div>
      <div class="header_nav">
        <div class="zxwy" @click="AskDoctor">在线问医</div>
        <i></i>
        <div class="zxys" @click="goChatPage">咨询药师</div>
      </div>
    </div>
    <!-- 我的订单栏 -->
    <div class="my-center-top">
      <div>
        <label class="tlt">我的订单</label>
        <router-link to="/submitOrder/orderList?orderNum=0" class="right mint-cell-allow-right all-order">查看全部订单
        </router-link>
      </div>
    </div>
    <div class="my-order">
      <span class="display-box">
        <router-link to="/submitOrder/orderList?orderNum=1" class="box-flex wait-receipt">
          <i class="icon">
            <span class="number" v-if="orderNumber.daifukuan>0">{{orderNumber.daifukuan}}</span>
      </i>
      <label>待付款</label>
      </router-link>
      <router-link to="/submitOrder/orderList?orderNum=2" class="box-flex wait-shipments">
        <i class="icon">
            <span class="number" v-if="orderNumber.daifahuo>0">{{orderNumber.daifahuo}}</span>
          </i>
        <label>待发货</label>
      </router-link>
      <router-link to="/submitOrder/orderList?orderNum=3" class="box-flex wait-delivery">
        <i class="icon">
            <span class="number" v-if="orderNumber.daishouhuo>0">{{orderNumber.daishouhuo}}</span>
          </i>
        <label>待收货</label>
      </router-link>
      <router-link to="/submitOrder/orderList?orderNum=4" class="box-flex wait-evaluate">
        <i class="icon">
            <span class="number" v-if="orderNumber.daipingjia>0">{{orderNumber.daipingjia}}</span>
          </i>
        <label>待评价</label>
      </router-link>
      </span>
    </div>
    <!-- 处方购药订单 -->
    <!-- <div class="my-center-top">
      <div>
        <label class="tlt">处方购药订单 </label>
        <router-link to="/prescription/prescription-order?activeId=1" class="right mint-cell-allow-right all-order">
          查看全部订单
        </router-link>
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
    </div> -->
    <div class="else_fun">
       <router-link to="/coupon" class="m_fun">
        <img src="./img/iconxh_wd_yhq.png" alt="">
        <label>优惠券</label>
      </router-link>
       <router-link to="/myCenter/headlines" class="m_fun">
        <img src="./img/iconxh_wd_tt.png" alt="">
        <label>我的头条</label>
      </router-link>
      <router-link to="/addressMgr" class="m_fun">
        <img src="./img/xh_wd_dzgl.png" alt="">
        <label>地址管理</label>
      </router-link>
      <router-link to="/inquiry/manageinquiryPeople?type=edit" class="m_fun">
        <img src="./img/iconxh_wd_jzrgl@2x.png" alt="">
        <label>就诊人管理</label>
      </router-link>
              <router-link to="/customerServer" class="m_fun">
        <img src="./img/xh_wd_bzkf.png" alt="">
        <label>帮助&客服</label>
      </router-link>
      <router-link to="/customerServer/suggestion" class="m_fun">
        <img src="./img/xh_wd_yjfk.png" alt="">
        <label>意见反馈</label>
      </router-link>
    </div>
    <div class="version">
      <div class="version-top">康美药业 版权所有</div>
      <div class="version-bottom">Copyright © 2018 康美药业股份有限公司. All rights reserved</div>
    </div>
  </div>
</template>
<script>
import inquiry from '../../components/inquiryEntrance/index.vue';
import ajax from '@/utils/ajax';
import javaAjax from '@/utils/javaApiRequest';
import { goInquiry } from '@/api/user';
import { ryInit, getTotalUnreadCount } from '@/api/rongyun';
export default {
  data() {
    return {
      userInfo: null,
      messagesNum: 0,
      orderNumber: {
        daifahuo: 0,
        daifukuan: 0,
        daipingjia: 0,
        daishouhuo: 0
      }
    };
  },
  components: {
    'v-inquiry': inquiry
  },
  methods: {
    clickMes() {
      window.location.href = '/inquiry/chatList';
    },
    goChatPage() {
      location.href = '/inquiry/consultPharmacist';
    },
    // 在线问医
    AskDoctor() {
      goInquiry();
    },
    // 获取会话列表
    getConversationList() {
      let _this = this;
      window.instance.getConversationList({
        onSuccess: function (conversations) {
          getTotalUnreadCount((count) => {
            _this.messagesNum = count;
            console.info('剩余数据条数,', count);
          });
        }
      }, null);
    },
    // 监听消息设置
    RYOnReceived(message) {
      let _this = this;
      getTotalUnreadCount((count) => {
        _this.messagesNum = count;
      });
      switch (message.messageType) {
        case window.RongIMClient.MessageType.TextMessage:
          // message.content.content => 消息内容
          break;
        case window.RongIMClient.MessageType.VoiceMessage:
          // 对声音进行预加载
          // message.content.content 格式为 AMR 格式的 base64 码
          break;
        case window.RongIMClient.MessageType.ImageMessage:
          // message.content.content => 图片缩略图 base64。
          // message.content.imageUri => 原图 URL。
          break;
        case window.RongIMClient.MessageType.DiscussionNotificationMessage:
          // message.content.extension => 讨论组中的人员。
          break;
        case window.RongIMClient.MessageType.LocationMessage:
          // message.content.latiude => 纬度。
          // message.content.longitude => 经度。
          // message.content.content => 位置图片 base64。
          break;
        case window.RongIMClient.MessageType.RichContentMessage:
          // message.content.content => 文本消息内容。
          // message.content.imageUri => 图片 base64。
          // message.content.url => 原图 URL。
          break;
        case window.RongIMClient.MessageType.InformationNotificationMessage:
          // do something...
          break;
        case window.RongIMClient.MessageType.ContactNotificationMessage:
          // do something...
          break;
        case window.RongIMClient.MessageType.ProfileNotificationMessage:
          // do something...
          break;
        case window.RongIMClient.MessageType.CommandNotificationMessage:
          // do something...
          break;
        case window.RongIMClient.MessageType.CommandMessage:
          // do something...
          break;
        case window.RongIMClient.MessageType.UnknownMessage:
          // do something...
          break;
        default:
        // do something...
      }
    },
    // 请求消息数量
    getMsg() {
      ryInit(this.RYOnReceived, this.getConversationList);
    },
    // 查询订单气泡
    getorderNumber() {
      javaAjax.post('/mall/order/queryOrderBub').then(res => {
        if (res.status === 200 && res.data.resultCode === '0') {
          this.orderNumber = res.data.resultData;
        }
      });
    },
    // 用户信息页面
    accountInfo() {
      let url = `${process.env.WEB_HOST}/accountManage`;
      location.href = url;
    }
  },
  created() {
    // 请求用户的信息
    ajax.get('/api/user/info').then(data => {
      if (data.status === 200 && data.data.code === 0) {
        this.userInfo = data.data.data;
      }
    });
    this.getorderNumber();
    this.getMsg();
  }
};
</script>
<style lang="less" scoped>
  @white-color: #FFF;
  @blue-color: #0CCDD4;
  @lbai-color: #61DCE4;
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
      height: 226px;
      position: relative;
      background-image: url(./img/xh_icon_topbg@2x.png);
      background-color: #FFF;
      background-repeat: no-repeat;
      background-size: 100%;
      margin-bottom: 10px;
      // 设置
      .setUp-icon {
        position: absolute;
        display: block;
        width: 23px;
        height: 23px;
        top: 10px;
        left: 20px;
        background: url("./img/xh_wd_set@2x.png");
        background-size: 100% 100%;
      }
      // 消息数量
      .header-top {
        display: block;
        width: 23px;
        height: 23px;
        background: red;
        position: absolute;
        top: 10px;
        right: 20px;
        background: @Elves-icon;
        background-size: 140px;
        background-position: -117px -2px;
        .msg-num {
          position: absolute;
          top: -8px;
          right: -11px;
          width: 18px;
          height: 18px;
          line-height: 17px;
          font-size: 8px;
          background: #F00;
          border-radius: 50%;
          text-align: center;
          color: #FFF;
          transform: scale(0.9);
          -webkit-transform: scale(0.9);
        }
      }
      // 头像信息处
      .header-bottom {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 70px;
        /deep/ .portrait {
          width: 53px;
          height: 53px;
          border-radius: 53px;
        }
        .nickname {
          color: #333;
          font-size: 17px;
        }
        .phonenum {
          height: 20px;
          position: relative;
          display: flex;
          align-items: center;
          font-size: 15px;
          color: #666;
          padding-left: 0.8em;
          &:before {
            content: '';
            display: inline-block;
            width: 9px;
            height: 12px;
            position: absolute;
            background-image: url(./img/xh_icon_phone@2x.png);
            background-repeat: no-repeat;
            background-size: cover;
            left: 0;
            top: 4px;
          }
        }
        .login_registe {
          color: #333;
          font-size: 17px;
          width: 100%;
          display: flex;
          justify-content: center;
          i {
            display: inline-block;
            height: 20px;
            width: 1px;
            background-color: #EEE;
            margin: 0 1em;
          }
        }
      }
      // 头部导航
      .header_nav {
        position: absolute;
        width: 100%;
        bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: #666;
        .zxwy,
        .zxys {
          position: relative;
          text-align: center;
          padding-left: 28px;
          &:before {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            position: absolute;
            left: 0;
            top: 0;
            background-image: url(./img/xh_icon_zxwy@2x.png);
            background-repeat: no-repeat;
            -webkit-background-size: cover;
            background-size: cover;
          }
        }
        .zxys {
          &:before {
            background-image: url(./img/xh_icon_zxys@2x.png);
          }
        }
        i {
          height: 20px;
          width: 1px;
          background-color: #EEE;
          margin: 0 50px;
        }
      }
    }
    // 箭头栏
    .my-center-top {
      width: 100%;
      height: 44px;
      padding: 0 10px 0 10px;
      background: @white-color;
      > div {
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
    .number {
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
    .marb10 {
      margin-bottom: 10px;
    }
    // 地图功能栏
    .else_fun {
      background: @white-color;
      /*padding: 15px;*/
      padding-bottom: 15px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width:100%;
      .m_fun {
        /*padding-left: 5px;*/
        padding-top: 15px;
        width:25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          .icon-style;
          width: 20px;
          height: 20px;
        }
      }
    }
    // 版本号
    .version {
      width: 100%;
      color: #5D5C61;
      margin-top: 8px;
      > div {
        width: 100%;
        height: 18px;
        line-height: 18px;
        font-size: 10px;
        text-align: center;
        // transform: scale(0.8);
        // display: flex;
        // justify-content: center;
        // align-items: center;
      }
    }
  }
</style>

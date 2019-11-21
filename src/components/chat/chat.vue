<template>
  <div class="chat-box ">
    <div class="sent-time" v-show="sentTime">{{ getSentTimes(sentTime) }}</div>
    <div class="chat-content " :class="[direction]">
      <!-- 头像-->
      <div class="head-portrait" v-if="type!=='app:endConsult'" @click="doctorDetail(actor)">
        <img :src="imgUrl" alt="">
        <div class="name" v-if="name"> {{name}}</div>
      </div>
      <!--内容-->
      <div class="speech" v-if="type!=='app:endConsult'">
        <div class="angel"></div>
        <div class="info" :class="{'info-padding': type === 'app:evaluate' || type === 'app:doctorPresc', 'default-width': type === 'app:PrescriptionProtocol'}">
          <div class="message" v-html="message"></div>
          <!--如果是图文文件-->
          <div v-if="type === 'image'" @click="clickImage(url)">
            <div class="mes-img"><img :src='url' alt=""></div>
          </div>
          <!--如果是音频文件-->
          <div v-if="duration" @click="playVoice(base64, duration)">
            <div class="voiceBox">
              <div class="icon-voiceMsg"></div>
              <div class="duration" :style="{width:20+3*duration+'px'}">{{duration}} S</div>
            </div>
          </div>
          <!--如果是处方详情文件-->
          <div v-if="type ==='app:dialecticalPresc'" @click="checkOrderDetail(orderId)">
            <div class="class-box-graphicMes">
              <div class="b-mes">{{description}}</div>
              <div class="b-icon">
                <div class="icon-confirmed" :class="{active:status===1, 'icon-confirm-failure':sendType==='prescription_failure'}"></div>
              </div>
            </div>
            <div class="small-tab chat-tab">
              <span class="mes">点击查看</span>
              <span class="cicle-turn-icon"></span>
            </div>
          </div>
          <!-- 如果是问诊评价 -->
          <div v-if="type === 'app:evaluate'" class="evaluate-box" @click="editEvaluate(evaluationid, bannerid)">
            <label class="txt1">问诊评价</label>
            <div>
              <img class="left icon evaluate" src="./imgs/xh-icon.png" />
              <div class="left txt-box">
                <label class="txt2">您的支持和评价是我前进的动力</label>
                <button class="go-evaluate">去评价</button>
              </div>
            </div>
          </div>
          <!-- 接收问诊单 -->
          <div v-if="type === 'app:doctorPresc'" class="doctor-inquiry" @click="editInquiryOrder(inquiryId, inquiryTitle)">
            <p class="title">{{ inquiryTitle }}</p>
            <div class="desc">
              <p class="text">为了更好更准确了解你的病情，请如实填写问诊单</p>
              <img class="icon" src="./imgs/pla_icon_wzd.png" alt="">
            </div>
          </div>
          <!-- 发送已填写的问诊单 -->
          <div v-if="type === 'app:doctorComfirmPresc'" class="read-inquiry" @click="editInquiryOrder(inquiryId, inquiryTitle)">
            <p>我已填完【{{ inquiryTitle }}】</p>
            <p class="desc">点击查看</p>
          </div>
          <!-- 问诊人信息 -->
          <div v-if="type === 'app:patientMessage'" class="patient-message">
            <img class="icon" src="./imgs/icon-info.png"/>
            <div class="detail">
              <p>{{ title }}</p>
              <p>{{ description }}</p>
            </div>
          </div>
          <!-- 处方审核失败消息 -->
          <div v-if="type === 'app:PrescriptionProtocol'" class="order-false" @click="readPrescriptionImg(url)">
            <div class="order-img">
              <img :src="url" />
            </div>
            <p>{{ title }}</p>
          </div>
          <slot></slot>
        </div>
      </div>
      <!--如果类别是结束问诊-->
      <div v-if="type ==='app:endConsult'" class="tip-endConsult">
        本次问诊结束,如有问题请再次咨询。
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/utils/auth';
import { formatChatTimes } from '@/utils/date';
export default {
  name: 'chat',
  props: {
    // 头像
    avatar: {
      type: String
    },
    // 姓名
    name: {
      type: String
    },
    // 文本消息内容
    message: {
      type: String
    },
    // 消息发送者（本人或对方）
    actor: {
      type: String
    },
    // 处方照片路劲、消息照片路劲
    url: {
      type: String
    },
    // 消息类型
    type: {
      type: String,
      default: 'text'
    },
    // 问诊人信息、处方详情
    description: {
      type: String,
    },
    // 处方状态：已填写、未填写
    status: {
      type: [Number, String],
    },
    // 处方单id
    orderId: {
      type: String,
    },
    base64: {
      type: String,
    },
    duration: {
      type: Number,
    },
    // 问诊单id
    inquiryId: {
      type: String,
    },
    // 问诊单标题
    inquiryTitle: {
      type: String
    },
    title: {
      type: String
    },
    // 处方消息类型
    sendType: {
      type: String
    },
    // 消息发送时间
    sentTime: {
      type: [String, Number]
    },
    // 问诊评价id
    evaluationid: {
      type: String
    },
    // 锦旗id
    bannerid: {
      type: String
    }
  },
  computed: {
    imgUrl: function () {
      // return './static/icon_doctor@2x.png'
      let userInfo = getUserInfo();
      if (this.avatar && this.avatar.length > 0) {
        return this.avatar;
      }
      else if (this.actor === 'user') {
        if (JSON.stringify(userInfo) !== '{}' && userInfo.photopath.length > 0) {
          return userInfo.photopath;
        } else if (JSON.stringify(userInfo) !== '{}' && userInfo.gender === 1) {
          return '/static/home/icon-male.png';
        } else {
          return '/static/home/icon-female.png';
        }
      }
      else {
        return '/static/home/icon_doctor@2x.png?12';
      }
    },
    direction: function () {
      let dire = this.actor === 'doctor' ? 'left-chat' : 'right-chat';
      if (this.type === 'app:endConsult') {
        dire = '';
      }
      return dire;
    }
  },
  methods: {
    // 点击图片
    clickImage(url) {
      this.$emit('on-chat', { type: 'clickImage', url: url });
    },
    checkOrderDetail(orderId) {
      let unionId = sessionStorage.getItem('wxUnionId');
      if (unionId) {
        // this.$router.push({
        //   path: '/prescriptionwx/detail', query: { orderId: orderId }
        // });
        window.location.href = `${process.env.WEB_HOST}/prescriptionwx/detail?orderId=${orderId}`;
        return false;
      }
      this.$emit('on-chat', { type: 'checkOrderDetail', orderId: orderId });
    },
    playVoice(base64, duration) {
      this.$emit('on-chat', { type: 'playVoice', base64: base64, duration: duration });
    },
    editInquiryOrder(inquiryId, inquiryTitle) {
      this.$emit('on-chat', { type: 'editInquiryOrder', inquiryId: inquiryId, inquiryTitle: inquiryTitle });
    },
    readPrescriptionImg(url) {
      this.$emit('on-chat', { type: 'readPrescriptionImg', img: url });
    },
    // 格式化时间
    getSentTimes(time) {
      return formatChatTimes(time);
    },
    // 医生详情
    doctorDetail(actor) {
      if (actor === 'doctor') {
        this.$emit('on-chat', { type: 'readDoctorDetail' });
      } else {
        return false;
      }
    },
    // 问诊单
    editEvaluate(evaluateid, bannerid) {
      this.$emit('on-chat', { type: 'editEvaluate', evaluateId: evaluateid, bannerId: bannerid });
    }
  }
};
</script>
<style lang="less" scoped>
  @import "../../views/inquiry/style/inquiry";
  @left-padding: 10px 20px 10px 10px;
  @right-padding: 10px 10px 10px 10px;
  @page-color: #EFEFF4;
  @chat-bg: #B7E6E7;
  .chat-box {
    font-size: 15px;
    margin-bottom: 10px;
    .head-portrait {
      text-align: center;
      width: 50px;
      flex-shrink: 0;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .name {
        display: block;
        line-height: 14px;
        color: @inquiryMainColor;
        font-size: 12px;
        word-break: break-all;
        transform: scale(0.9);
      }
    }
    .speech {
      margin: 5px 12px 0;
      position: relative;
      .info {
        max-width: 230px;
        position: relative;
        padding: @left-padding;
        background-color: #FFF;
        border-radius: 7px;
        &.info-padding {
          padding: 10px 0;
        }
        &.default-width {
          width: 230px;
        }
      }
      .angel {
        width: 20px;
        height: 20px;
        background-color: #FFF;
        border-radius: 20px;
        position: absolute;
        transform: rotate(7deg);
        &:before {
          display: table;
          content: " ";
          width: 15px;
          border-radius: 15px;
          height: 15px;
          background-color: #EFEFF4;
          position: absolute;
          left: -2px;
          top: -3px;
        }
      }
    }
    .chat-content {
      display: flex;
      &.left-chat {
        .speech {
          .info {
            margin-right: 35px;
          }
          .angel {
            left: -10px;
          }
        }
      }
      &.right-chat {
        justify-content: flex-end;
        .head-portrait {
          order: 2;
        }
        .speech {
          order: 1;
          margin-left: 10px;
          .info {
            background-color: @chat-bg;
            margin-left: 35px;
            padding: @right-padding;
          }
          .angel {
            right: -10px;
            transform: rotate(52deg);
            background-color: @chat-bg;
          }
        }
      }
    }
    .sent-time {
      text-align: center;
      color: #999;
      font-size: 12px;
      margin-top: 20px;
    }
  }
  .right-chat .angel {
    right: -9px
  }
  .hasImage .info {
    width: auto !important;
    padding: 0 0 !important;
    background-color: @page-color !important;
    img {
      border-radius: .1rem;
    }
  }
  // 白色聊天框
  .whiteChat-Box {
    .speech {
      .angel {
        background-color: #FFF !important;
      }
      .info {
        background-color: #FFF !important;
      }
    }
  }
</style>


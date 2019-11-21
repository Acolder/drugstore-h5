<template>
  <div id="doing">
    <div class="consult-header mint-header">
      <div class="mint-header-button is-left">
        <mt-button slot="left" icon="back" @click="goBack" v-if="hasBack"></mt-button>
      </div>
      <h1 class="mint-header-title">{{ title }}
        <span v-show="onlineStatus===0&&consults.remainingseconds<1">在线</span>
        <span class="offline" v-show="onlineStatus!==0">离线</span>
      </h1>
      <!-- <h1 class="mint-header-title">{{ title }}</h1> -->
      <div class="mint-header-button is-right"><span v-show="consults.remainingseconds>0 && onlineStatus===0" @click="endConsult">结束咨询</span></div>
    </div>
    <div class="status-bar" v-show="!fromChatList && onlineStatus===0" :class="{'end-inquiry': consults.remainingseconds<1 || onlineStatus!==0}">
      <span v-show="consults.remainingseconds >= 1 && onlineStatus===0">咨询中 {{ formateTimes(consults.remainingseconds) }}</span>
      <span v-show="consults.remainingseconds < 1 || onlineStatus!==0">咨询已结束</span>
    </div>
    <div class="inquiry-page chat-page" :class="{'offline': onlineStatus!==0 && !isLeaveMessage, 'has-status-bar': !fromChatList}" id="inquiry-page" :style="{ '-webkit-overflow-scrolling': scrollMode }" @click="checkFooterShow">
      <template v-if="chatMsg.length !== 0">
        <div class="read-more" :class="{'on':hasMore}" v-show="isPC"><img src="./imgs/more-message.png" /><span @click="getMoreHistoryMsg(true)">{{ readMoreText }}</span></div>
        <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" :topPullText="topText" ref="loadmore">
          <me-chat v-for="(object) in chatMsg" :key='object.id' v-bind="object" @on-chat="handleChatEvent">
          </me-chat>
        </mt-loadmore>
      </template>
    </div>
    <footer class="bottom-input box" id="foot" :class="{flex:isReceiveMsg,hide:this.imageShow,ios:this.isIOS}">
      <!-- <div class="recent-doctor-tips" v-show="isShowRecentDoctorTips">已为您匹配到{{ title }}医生</div> -->
      <div class="box-input">
        <input type="text" id="inputField" @keyup.enter.self="submit" @focus.prevent="minScreen" @blur="maxScreen" v-model="inputValue" placeholder="这里输入文字。"><!-- @focus.prevent="scrollIntoView" @blur="maxScreen" -->
        <div class="box-icon-down">
          <span class="icon-down" @click="clickDown"></span>
        </div>
        <div class="box-icon-send">
          <span class="icon-send" :class="{active: writing}" @click="submit"></span>
        </div>
      </div>
      <div class="box-btns" v-show="!isHidefootBottm">
        <div class="item-btn">
          <upload-img :fileName="'image'" @uploadSuccess="sendImageMessage"></upload-img>
          <div>照片</div>
        </div>
      </div>
      <div class="bottom-btn" v-show="(consults.remainingseconds<1 || onlineStatus!==0) && !isLeaveMessage">
        <!-- 在线 -->
        <button class="button" v-show="onlineStatus===0" @click="consultAgain"><img src="./imgs/lyg_zx.png" alt=""> 再次咨询</button>
        <!-- 离线 -->
        <div class="offline-tips" v-show="onlineStatus!==0">医生当前不在线</div>
        <button class="button" v-show="onlineStatus!==0" @click="leaveMessage"><img src="./imgs/lyg_ly.png" alt=""> 给医生留言</button>
      </div>
    </footer>
    <div :class="{show:this.imageShow}" class="bigImage" @click="hideImage">
      <img data-v-58d64c12="" data-v-a7bf04c8="" :src=imageURL alt="" style="">
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie';
import { mapGetters, mapActions } from 'vuex';
import { Header, MessageBox, Toast, Loadmore } from 'mint-ui';
import chat from '@/components/chat/chat.vue';
import { getUserInfo, removeToken } from '@/utils/auth';
import page from './modules/page';
import ajax from '@/utils/ajax';
import wxjs from '@/utils/wxjsInterface';
import { getQueryString, getRequestObj } from '@/utils/index';
const queryString = require('query-string');
// import inquiryEntrance from '@/components/inquiryEntrance/index.vue';
// import { getConsultType } from './inquiry';
import { setOrderSource } from '@/utils/auth';
import { onReceived } from '@/api/rongyun';
import uploadImg from '@/components/upload/chatUploadImg';
import * as imModule from '@/components/chat/js/im';
import { formatSeconds } from '@/api/dateDiff';
import { goLogin } from '@/api/user';
export default {
  name: 'doing',
  components: {
    'mt-header': Header,
    'me-chat': chat,
    // 'inquiryEntrance': inquiryEntrance,
    'upload-img': uploadImg,
    'mt-loadmore': Loadmore
  },
  data: function () {
    return {
      hasBack: true,
      consultInfo: {},
      inputValue: '',
      writing: false,
      value: 'helloword',
      btnClass: 'btn-right',
      hasImage: true,
      consults: {},
      // userId: '',
      openId: null,
      talkToken: null,
      title: '',
      isHidefootBottm: true,
      isReceiveMsg: true,  //false:候诊
      consultType: '', // 咨询类型
      // 微信js sdk 实例对象
      wx: null,
      // 请求返回的微信config对象
      wxResponseConfig: {},
      imgUrls: [],
      // 大图显示地址
      imageURL: '',
      imageShow: false,
      isIOS: false,
      isPC: false,
      timerId: '',
      onlineStatus: 0, // 医生是否在线   0：online 在线、1：offline 离线、2：logout 登出
      readMoreText: '查看更多消息',
      hasMore: true, // 是否还有历史消息
      isLoading: false, // 是否正在加载
      scrollTop: 0,
      isShowRecentDoctorTips: true, // 当前医生提示
      calcuInterval: null, // 倒计时定时器
      isLeaveMessage: false, // 是否留言中
      lastConsultStatus: 2, // 0：未咨询 1：咨询中 2：咨询结束
      lastConsultData: {}, // 上次咨询未结束的信息
      fromChatList: false, // 是否从聊天列表过来
      // 上拉下拉数据参数
      allLoaded: false, // 是否全部加载完
      scrollMode: 'auto', // 滑动方式
      showNomore: false,
      topText: '下拉加载更多'
    };
  },
  computed: {
    ...mapGetters([
      'chatMsg',
      'unReadMsg'
    ]),
    ...mapActions([
      'appendMsg'
    ])
  },
  props: {
    userId: {
      type: String,
    },
    hasConnect: {
      type: Boolean,
      default: false
    }
  },
  // beforeCreate() {
  //   Indicator.open();
  // },
  mounted: function () {
    let _this = this;
    this.getUserMsg();
    page.selfAdaptionScreen();
    // this.consultType = getConsultType();
    this.getconsult();
    this.getMessage(); // 获取消息
    // 1.输入自适应屏幕
    document.body.onresize = () => {
      page.selfAdaptionScreen();
      setTimeout(() => {
        _this.scrollToBottom();
      });
    };
    if (page.isIOS()) {
      this.isIOS = true;
    }
    if (page.isPC()) {
      this.isPC = true;
    }
    this.$nextTick(() => {
      setTimeout(() => {
        _this.isShowRecentDoctorTips = false;
      }, 3000);
    });
    // 监听浏览器自带返回事件
    // let _this = this;
    // let state = {
    //     title: "title",
    //     url: "#"
    // };
    // window.history.pushState(state, "title", "#");
    // window.addEventListener('popstate', function(e) {
    //   _this.endConsult();
    // }, false);
  },
  created: function () {
    document.body.onresize = () => {
      page.selfAdaptionScreen();
      setTimeout(() => {
        this.scrollToBottom();
      });
    };
    let hasBack = this.$route.query.hasback;
    if (hasBack === 'no-back') {
      this.hasBack = false;
    }
    // 刷新页面前保存当前问诊剩余时间
    // window.addEventListener('beforeunload', e => {
    //   let consultData = JSON.parse(sessionStorage.getItem('consultData'));
    //   consultData.remainingseconds = this.consults.remainingseconds;
    //   sessionStorage.setItem('consultData', JSON.stringify(consultData));
    // });
  },
  methods: {
    handleChatEvent: function (event) {
      if (event.type === 'clickImage') {
        this.clickImage(event.url)
      }
      if (event.type === 'checkOrderDetail') {
        this.saveOrderSource(event.orderId)
      }
      if (event.type === 'playVoice') {
        this.playVoice(event.base64, event.duration)
      }
      // 填写问诊单
      if (event.type === 'editInquiryOrder') {
        this.intoInquiryOrder(event.inquiryId, event.inquiryTitle);
      }
      // 审核失败问诊单
      if (event.type === 'readPrescriptionImg') {
        this.imageURL = event.img;
        this.imageShow = true;
      }
      // 查看医生详情
      if (event.type === 'readDoctorDetail') {
        this.readDoctorDetail();
      }
      // 评价问诊
      if (event.type === 'editEvaluate') {
        this.editEvaluate(event.evaluateId, event.bannerId);
      }
    },
    //移除默认事件
    preventDefault: function (event) {
      event.preventDefault();
    },
    // 适应屏幕
    // 收缩屏幕
    minScreen: function () {
      if (page.isIOS()) {
        let pageEle = document.getElementById('inquiry-page');
        let HeightResult = page.getIOSHeightHasKeyboard(112)+112;
        let footer = document.getElementsByTagName('footer')[0];
        setTimeout(() => {
          let innerHeight = window.innerHeight;
          HeightResult = HeightResult > (innerHeight - footer.clientHeight) ? (innerHeight - footer.clientHeight) : HeightResult;
          pageEle.style.height = HeightResult + 'px'; // 滚动区域变短
          this.scrollToBottom();
          document.body.scrollTop = 0;
          let doctorRecommendEle = document.getElementById('doing');
          doctorRecommendEle.addEventListener('touchmove', this.preventDefault, false);
        }, 300);
      }
    },
    // 放大屏幕
    maxScreen: function () {
      if (page.isIOS()) {
        setTimeout(() => {
          page.selfAdaptionScreen(-10);
          let doctorRecommendEle = document.getElementById('doing');
          doctorRecommendEle.removeEventListener('touchmove', this.preventDefault, false);
        }, 100);
      }
    },
    // 点击图片放大
    clickImage: function (url) {
      this.imageURL = url;
      if (this.imageShow === false) {
        this.imageShow = true;
      }
    },
    hideImage: function () {
      this.imageShow = false;
    },
    // 发送消息
    sendChat: function (data) {
      // 是否添加发送时间
      let sentTime = sessionStorage.getItem('inquiryMessageSentTime');
      let nowTimes = new Date().getTime();
      if (sentTime) {
        // 间隔等于或超过5分钟设置一次时间
        if (Math.abs(nowTimes - sentTime) >= 1000 * 60 * 5) {
          sessionStorage.setItem('inquiryMessageSentTime', nowTimes);
          data.sentTime = nowTimes;
        }
      } else {
        sessionStorage.setItem('inquiryMessageSentTime', nowTimes);
        data.sentTime = nowTimes;
      }
      this.$store.dispatch('appendMsg', data);
      this.scrollToBottom();
    },
    // 添加历史消息
    appendChat: function (data) {
      this.$store.dispatch('appendMsg', data);
      this.scrollToBottom();
    },
    // 处理更多历史消息
    getMoreChatMsg(messageArray) {
      let _this = this;
      let msgArray = [];
      // 遍历处理消息类型，消息时间等
      messageArray.forEach((res, i) => {
        let returnMsg = onReceived(res, _this, true);
        if (returnMsg) {
          msgArray.push(returnMsg);
        }
        // 如果遍历已经结束，把消息添加到列表中
        if (messageArray.length === i + 1) {
          msgArray = msgArray.reverse();
          msgArray.forEach((res, i) => {
            _this.insertChat(res);
          });
        }
      });
    },
    // 插入历史消息
    insertChat: function (data) {
      let pageHeight = document.getElementById('inquiry-page').scrollHeight;
      this.$store.dispatch('insertMsg', data);
      this.scrollToBottom(pageHeight);
    },
    // 获得用户信息
    getUserMsg: function () {
      this.user = getUserInfo();
    },
    // 查看订单详情（保存订单来源）
    saveOrderSource: function (orderId) {
      let orderSource = { source: 'onlineInquiryDoctor', orderId: orderId };
      localStorage.setItem('Order-Source', JSON.stringify(orderSource));
      this.orderId = orderId;
      // this.$router.push({
      //   path: '/prescription/index',
      //   query: { order_id: orderId }
      // });
      window.location.href = '/prescription/index?order_id=' + orderId;
    },
    // 返回
    goBack: function () {
      let backUrl = sessionStorage.getItem('inquiryFromUrl');
      if (backUrl) {
        window.location.href = JSON.parse(backUrl);
      } else {
        this.$router.go(-1);
      }
    },
    // 折叠工具栏
    clickDown: function () {
      if (this.isHidefootBottm) {
        this.isHidefootBottm = false;
      } else {
        this.isHidefootBottm = true;
      }
      setTimeout(() => {
        page.selfAdaptionScreen();
        setTimeout(() => {
          this.scrollToBottom();
        });
      }, 50);
    },
    // 滚动到底部
    scrollToBottom: function (height) {
      height = height || false;
      let page = document.getElementById('inquiry-page');
      if (height) {
        setTimeout(() => {
          page.scrollTop = page.scrollHeight - height;
        }, 100);
      } else {
        setTimeout(() => {
          page.scrollTop = page.scrollHeight - page.clientHeight;
        }, 100);
      }
    },
    // 输入文字
    submit: function () {
      // 0.判断是否为空白字符串
      document.getElementById('inputField').blur();
      if (!this.inputValue || /^\s*$/.test(this.inputValue)) {
        return;
      }
      // 1.把输入的值push到数组中。,向融云发送消息
      this.rongyunSentMsg(this.inputValue, this.consults.groupid);
      // 2.input中的值清空
      this.inputValue = '';
      // 3.关闭小键盘
      document.activeElement.blur();
      // 4.页面滚动到底部。
      this.scrollToBottom();
    },
    // 获得咨询信息
    getconsult: function () {
      let _this = this;
      this.consults = JSON.parse(sessionStorage.getItem('consultData'));
      console.log(this.consults);
      this.getDoctorOnlineStatus(); // 获取医生在线状态
      let chatTimes = getQueryString('chatTimes') === 'again';
      this.fromChatList = getQueryString('chatList') === 'true';
      if (chatTimes) {
        // 调用咨询信息
        this.getConsultInfobyDoctorId().then(res => {
          if (_this.consults.remainingseconds > 0) {
            _this.fromChatList = false;
            // _this.calcuInterval = setInterval(_this.calcuTimes, 1000); // 计算时间倒计时
          }
        });
      } else {
        this.calcuInterval = setInterval(this.calcuTimes, 1000); // 计算时间倒计时
      }
      //药葫芦咨询
      //判断是否有就诊人
      // let url = 'api/v2/user/isExistsMember';
      // ajax.get(url).then((res) => {
      //   if (res.data.code === 0 && res.status === 200) {
      //     // 1.没有咨询中，候诊中的订单，且没有就诊人,即(第一次进入)
      //     if (!res.data.data.isexistsmember) {
      //       // 第一次进入页面
      //       window.location.href = '/inquiry/guideDefault';
      //     } else {
      //       setTimeout(() => {
      //         //this.rongyunSentMsg({ content: '医生你好！' }, this.consults.groupid);
      //         // 是否从支付订单成功返回过来
      //         let parameter = queryString.parse(location.search);
      //         if (parameter && parameter.orderId) {
      //           // 检测是否已显示过订单确认。
      //           let object = chatMsg.pop();
      //           if (parameter.orderId === object.orderId && object.actor === 'user') {
      //             this.orderId = parameter.orderId;
      //             // this.sendOrderPayedSuccess();
      //           }
      //         }
      //       }, 1000);
      //       console.info('IsExistsMerber&&consultStatus:', res.data.data);
      //       // this.getConsultInfo(this.consults.consultid);
      //     }
      //   } else {
      //     this.$router.push('/login');
      //   }
      // });
    },
    // send MSG
    rongyunSentMsg: function (contents, targetId) {
      let _this = this;
      let msg = new RongIMLib.TextMessage({ content: contents });
      imModule.sendMessage(targetId, msg, (res) => {
        if (res) {
          console.log('Send successfully');
          let data = { message: contents, actor: 'user', avatar: _this.user.photopath };
          _this.sendChat(data);
        }
      });
    },
    // 初次获取消息
    getMessage() {
      // 先清空已展示消息
      this.$store.dispatch('clearMsg', []);
      if (!this.hasConnect) {
        setTimeout(() => {
          this.getMessage();
        }, 500);
        return false;
      }
      this.getHistoryMsg(false);
    },
    // 获取历史消息
    getHistoryMsg(isReadMore) {
      let _this = this;
      let targetId = this.consults.groupid;
      let timestrap = null; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
      if (!isReadMore) {
        timestrap = 0;
      }
      let count = 20;
      RongIMClient.getInstance().getHistoryMessages(3, targetId, timestrap, count, {
        onSuccess: function (list, hasMsg) {
          if (isReadMore) {
            _this.$refs.loadmore.onTopLoaded();
            _this.getMoreChatMsg(list);
            // let messageArray = list.reverse();
            // messageArray.forEach((res, i) => {
            //   onReceived(res, _this, true);
            // });
          } else {
            list.forEach((res, i) => {
              onReceived(res, _this);
            });
          }
          _this.isLoading = false;
          if (!hasMsg) {
            _this.hasMore = false;
            _this.readMoreText = '没有更多了';
            _this.topText = '已加载全部';
          }
          _this.$nextTick(function() {
            _this.scrollMode = 'touch';
          });
        },
        onError: function (error) {
          // APP未开启消息漫游或处理异常
          console.log(error);
        }
      });
    },
    // 消息监听
    messageListener(msg) {
      onReceived(msg, this);
    },
    initVoice: function () {
      // let RongIMVoice = RongIMLib.RongIMVoice;
      // RongIMVoice.init();
    },
    // 播放语音
    playVoice: function (voiceData, duration) {
      this.play(voiceData);
      console.info('开始播放啦!');
    },
    play: function (voice) {
      if (voice) {
        let RongIMVoice = RongIMLib.RongIMVoice;
        RongIMVoice.init();
        let duration = voice.length / 1024;    // 音频持续大概时间(秒)
        RongIMVoice.preLoaded(voice, function () {
          // MessageBox("提示", "暂不支持语音播放!");
          RongIMVoice.play(voice, duration);
        });
      } else {
        console.error('请传入 amr 格式的 base64 音频文件');
        MessageBox("提示", "不支持改格式语音播放!");
      }
    },
    //  3.上传图片 生成缩略图 生成base64
    sendImageMessage (baseData, file) {
      console.log(baseData.url);
      const _self = this;
      // TODO 发送图片到对话框 chatInterface.sendMsg(model.url, true, photourl, 2, true);
      new Promise((resolve, rejects) => {
        if (baseData.attachment && baseData.attachment !== '' && baseData.physicalPath && baseData.physicalPath !== '') {
          // 生成缩略图
          let purl = `/api/system/uploadthumbnail?name=${baseData.attachment}&path=${baseData.physicalPath}`;
          ajax.post(purl).then(res => {
            if (res.status === 200) {
              let data1 = res.data.data;
              if (!!data1 === false) {
                return;
              }
              let thumbnail_data = JSON.parse(data1);
              // thumbnail_data.url 压缩后的图片
              // get base64
              ajax.get(`/api/system/getBase64ByImgUrl`, {
                params: {
                  url: thumbnail_data.url
                }
              }).then(resp => {
                console.log(resp);
                if (resp.status === 200) {
                  let data2 = resp.data;
                  if (data2.code === 0) {
                    let base64Str = data2.data;
                    resolve(base64Str);
                  }
                }
              });
            }
          });
        } else {
          // 用canvas生成base64图片
          // // 设置图片跨域访问
          // img.setAttribute('crossOrigin', 'anonymous');
          let img = new Image();
          let reader = new FileReader();
          reader.onload = function(e) {
            img.src = e.target.result;
            img.onload = function () {
              // 不要超出最大宽度
              let w = Math.min(300, img.width);
              // 高度按比例计算
              let h = img.height * (w / img.width);
              let canvas = document.createElement('canvas');
              let ctx = canvas.getContext('2d');
              // 设置 canvas 的宽度和高度
              canvas.width = w;
              canvas.height = h;
              ctx.drawImage(img, 0, 0, w, h);
              let base64 = canvas.toDataURL('image/jpeg');
              base64 = base64.replace(/^data:image\/(png|jpeg);base64,/, '');
              resolve(base64);
            }
          };
          reader.readAsDataURL(file);
        }
      }).then(base64Str => {
        // console.log(base64Str);
        // data.data  大图base64
        // TODO 发送图片给对方 rongIM.sendImg(thumbnail_data.url, data.data);
        //传送到融云
        /*
          图片转为可以使用 HTML5 的 FileReader 或者 canvas 也可以上传到后台进行转换。
          注意事项：
          1、缩略图必须是 base64 码的 jpg 图。
          2、不带前缀。
          3、大小不得超过 100kb。
          */
        let imageUri = baseData.url; // 上传到自己服务器的 URL。
        let msg = new RongIMLib.ImageMessage({ content: base64Str, imageUri: imageUri });
        // let conversationtype = RongIMLib.ConversationType.GROUP; // 单聊,其他会话选择相应的消息类型即可。
        let targetId = _self.consults.groupid; // 目标 Id
        imModule.sendMessage(targetId, msg, (res) => {
          if (res) {
            console.log('Send successfully');
            let param = {
              actor: 'user',
              avatar: _self.user.photopath,
              type: 'image',
              class: 'hasImage',
              url: baseData.url
            };
            _self.sendChat(param);
            // if (this.isHidefootBottm) {
            //   this.isHidefootBottm = false;
            // } else {
            //   this.isHidefootBottm = true;
            // }
            _self.checkFooterShow();
            setTimeout(() => {
              _self.scrollToBottom();
            }, 1000);
          }
        });
      });
    },
    // 2.判断是否微信
    iswx: function () {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('micromessenger') > 0) { // 微信
        return true;
      }
      else {
        return false;
      }
    },
    // 1.初始化微信
    // initwx: function () {
    //   let _self = this;
    //   let code = getQueryString('code');
    //   wxjs.init(code).then((res) => {
    //     console.log('init wx');
    //     _self.wx = res.wx;
    //     _self.wxResponseConfig = res.wxconfig;
    //     // Toast('wx初始化成功！');
    //   });
    // },
    // 根据id获取医生在线状态
    getDoctorOnlineStatus() {
      let _this = this;
      let doctorId = this.consults.doctorid;
      let params = {
        doctorIds: [doctorId]
      };
      ajax.post('/api/user/getDoctorOnlineStatus', params).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          _this.onlineStatus = Number(res.data.data[0].online_status);
        }
      });
    },
    // 关闭检查底部工具栏
    checkFooterShow() {
      if (!this.isHidefootBottm) {
        this.isHidefootBottm = true;
        setTimeout(() => {
          page.selfAdaptionScreen();
        }, 50);
      }
    },
    // 问诊单
    intoInquiryOrder(id, title) {
      this.$router.push({
        path: '/inquiry/inquirySheet',
        query: { inquiryId: id, inquiryTitle: title }
      });
    },
    // 下拉刷新
    loadTop: function() {
      console.log('加载中');
      this.getMoreHistoryMsg(true);
    },
    // 获取更多历史消息
    getMoreHistoryMsg() {
      let _this = this;
      if (_this.isLoading) {
        return false;
      }
      if (_this.hasMore) {
        _this.isLoading = true;
        _this.getHistoryMsg(true);
      } else {
        _this.$refs.loadmore.onTopLoaded();
      }
    },
    scrollIntoView() {
      setTimeout(() => {
        document.activeElement.scrollIntoViewIfNeeded();
      }, 200);
    },
    // 格式化时间
    formateTimes(time) {
      return formatSeconds(time);
    },
    // 倒计时
    calcuTimes() {
      let _this = this;
      if (_this.consults.remainingseconds > 0) {
        _this.consults.remainingseconds--;
        let consultData = JSON.parse(sessionStorage.getItem('consultData'));
        consultData.remainingseconds = _this.consults.remainingseconds;
        sessionStorage.setItem('consultData', JSON.stringify(consultData));
      } else {
        clearInterval(this.calcuInterval);
        if (_this.isLeaveMessage) {
          _this.isLeaveMessage = false;
        }
        _this.sendEndMessage();
      }
    },
    // 结束咨询
    endConsult() {
      let _this = this;
      // 问诊时间结束
      if (this.consults.remainingseconds < 1 || this.onlineStatus !== 0) {
        return false;
      }
      MessageBox.confirm('', {
        title: '提示',
        message: '是否结束进行中的咨询？',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(action => {
        let consultid = _this.consults.consultid;
        ajax.get(`/api/user/closeconsult/${consultid}`).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            clearInterval(_this.calcuInterval);
            // 问诊时间清零
            let consultData = JSON.parse(sessionStorage.getItem('consultData'));
            consultData.remainingseconds = 0;
            sessionStorage.setItem('consultData', JSON.stringify(consultData));
            _this.consults.remainingseconds = 0;
            _this.isLeaveMessage = false;
            // 重新获取医生在线状态
            _this.getDoctorOnlineStatus();
            // 发送结束语
            _this.sendEndMessage();
          }
        });
      }).catch(err => {
        console.log(err);
      });
    },
    // 发送结束语
    sendEndMessage() {
      let _this = this;
      // 定义消息类型
      let messageName = 'UnknownMessage'; // 消息名称。
      let objectName = 'app:endConsult'; // 消息内置名称，请按照此格式命名。
      let mesasgeTag = new RongIMLib.MessageTag(true, true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
      let prototypes = ['content']; // 消息类中的属性名。
      RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);
      // 发送自定义消息
      // let conversationType = RongIMLib.ConversationType.GROUP; //单聊,其他会话选择相应的消息类型即可。
      let targetId = _this.consults.groupid; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
      let data = '';
      data = JSON.stringify(data);
      let msg = new RongIMClient.RegisterMessage.UnknownMessage({ content: data });
      imModule.sendMessage(targetId, msg, (res) => {
        if (res) {
          console.log('Send successfully');
          let message = {
            type: 'app:endConsult'
          };
          _this.sendChat(message);
        }
      });
    },
    // 给医生留言
    leaveMessage() {
      let _this = this;
      this.getConsultInfobyDoctorId().then(result => {
        console.log(_this.consults.doctorid, _this.lastConsultData.doctorid);
        // 有正在咨询中的医生，并且与当前医生不是同一个
        if (_this.lastConsultStatus === 1 && Number(_this.consults.doctorid) !== Number(_this.lastConsultData.doctorid)) {
          _this.clostLastConsult(res => {
            // 是否关闭上一次问诊
            if (res === 'Yes') {
              _this.isLeaveMessage = true;
            } else if (res === 'No') {
              // 跳转到上一次问诊
              sessionStorage.setItem('consultData', JSON.stringify(_this.lastConsultData));
              window.location.replace('/inquiry/doing');
            }
          });
        } else {
          _this.isLeaveMessage = true;
        }
      });
    },
    // 再次咨询
    consultAgain() {
      let _this = this;
      if (this.fromChatList) {
        this.fromChatList = false;
      }
      this.getConsultInfobyDoctorId().then(result => {
        // 有正在咨询中的医生，并且与当前医生不是同一个
        console.log(_this.consults.doctorid, _this.lastConsultData.doctorid);
        if (_this.lastConsultStatus === 1 && Number(_this.consults.doctorid) !== Number(_this.lastConsultData.doctorid)) {
          _this.clostLastConsult(res => {
            // 是否关闭上一次问诊
            if (res === 'Yes') {
              _this.consultAgainAction();
            } else if (res === 'No') {
              // 跳转到上一次问诊
              sessionStorage.setItem('consultData', JSON.stringify(_this.lastConsultData));
              window.location.replace('/inquiry/doing');
            }
          });
        } else if (_this.lastConsultStatus === 1 && Number(_this.consults.doctorid) === Number(_this.lastConsultData.doctorid)) {
          // 如果正在咨询中的医生为当前医生
          _this.isLeaveMessage = true;
        } else {
          _this.consultAgainAction();
        }
      });
    },
    // 再次咨询执行函数
    consultAgainAction() {
      let _this = this;
      let groupId = this.consults.groupid;
      ajax.post('/api/user/consultAgain', {
        groupid: groupId
      }).then(res => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          let returnData = res.data.data;
          // 更新session数据（问诊时间，问诊单id）
          let consultData = JSON.parse(sessionStorage.getItem('consultData'));
          consultData.consultid = returnData.consultid;
          consultData.remainingseconds = returnData.remainingseconds;
          sessionStorage.setItem('consultData', JSON.stringify(consultData));
          // 更新问诊时间和问诊单id
          _this.consults.consultid = returnData.consultid;
          _this.consults.remainingseconds = returnData.remainingseconds;
          _this.isLeaveMessage = true;
          _this.calcuInterval = setInterval(_this.calcuTimes, 1000); // 计算时间倒计时
        }
      });
    },
    // 根据医生id获取咨询信息
    getConsultInfobyDoctorId() {
      let _this = this;
      let doctorId = this.consults.doctorid;
      return new Promise((resolve, rejects) => {
        ajax.get(`/api/user/getConsultInfobyDoctorId/${doctorId}`).then(res => {
          console.log(res);
          if (res.status === 200 && res.data.code === 0) {
            let returnData = res.data.data;
            _this.lastConsultStatus = Number(returnData.consultstatus);
            // 正在咨询中
            if (Number(returnData.consultstatus) === 1) {
              // 如果未结束咨询与当前医生是同一个
              if (Number(_this.consults.doctorid) === Number(returnData.doctorid)) {
                // 更新session数据（问诊时间，问诊单id）
                let consultData = JSON.parse(sessionStorage.getItem('consultData'));
                consultData.consultid = returnData.consultid;
                consultData.remainingseconds = returnData.remainingseconds;
                sessionStorage.setItem('consultData', JSON.stringify(consultData));
                // 更新当前问诊时间、问诊单id
                _this.consults.consultid = returnData.consultid;
                _this.consults.remainingseconds = returnData.remainingseconds;
                _this.calcuInterval = setInterval(_this.calcuTimes, 1000); // 计算时间倒计时
              }
              // 保存上次咨询医生信息
              let lastConsultData = {
                doctorid: returnData.doctorid, // 医生id
                realname: returnData.doctorname, // 医生姓名
                doctorphotopath: returnData.doctoravatar, // 医生头像
                groupid: returnData.groupid, // 群主id
                conversationType: 3, // 聊天类型 3 群聊
                consultid: returnData.consultid, // 咨询单ID
                remainingseconds: returnData.remainingseconds // 咨询剩余时间（单位秒）
              };
              _this.lastConsultData = lastConsultData;
              sessionStorage.setItem('lastConsultData', JSON.stringify(lastConsultData));
            }
            resolve('success');
          }
        });
      });
    },
    // 提示是否关闭上一次问诊
    clostLastConsult(callback) {
      let _this = this;
      MessageBox.confirm('', {
        title: '提示',
        message: `${_this.lastConsultData.realname}医生还在与您会话中，是否继续咨询？`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '取消咨询',
        cancelButtonText: '继续咨询'
      }).then(action => {
        // 取消咨询
        let consultid = _this.lastConsultData.consultid;
        ajax.get(`/api/user/closeconsult/${consultid}`).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            callback && callback('Yes');
          }
        });
      }).catch(err => {
        // 继续咨询
        callback && callback('No');
      });
    },
    // 查看医生详情
    readDoctorDetail() {
      let doctorId = this.consults.doctorid;
      let userId = this.user.userid;
      let userName = this.user.nickname;
      let userAvatar = this.user.photopath;
      window.location.href = `/doctorDetail?doctorid=${doctorId}&user_id=${userId}&username=${userName}&avatar=${userAvatar}`;
    },
    // 问诊评价
    editEvaluate(evaluateId, bannerId) {
      let doctorId = this.consults.doctorid;
      let userId = this.user.userid;
      let userName = this.user.nickname;
      let userAvatar = this.user.photopath;
      window.location.href = `/serviceEvaluation?doctor_id=${doctorId}&user_id=${userId}&username=${userName}&avatar=${userAvatar}&evaluationid=${evaluateId}&bannerid=${bannerId}`;
    }
  },
  watch: {
    inputValue: function (value) {
      if (!value || /^\s*$/.test(value)) {
        this.writing = false;
      } else {
        this.writing = true;
      }
    },
    'consults.realname': function (value) {
      this.title = value;
    },
    unReadMsg: function(newVal, oldVal) {
      this.messageListener(newVal);
      // 问诊结束，问诊剩余时间设置为0
      if (newVal.messageType === 'UnknownMessage' &&
      newVal.content.message.objectName === 'app:endConsult') {
        this.consults.remainingseconds = 0;
        let consultData = JSON.parse(sessionStorage.getItem('consultData'));
        consultData.remainingseconds = 0;
        sessionStorage.setItem('consultData', JSON.stringify(consultData));
        clearInterval(this.calcuInterval);
        if (this.isLeaveMessage) {
          this.isLeaveMessage = false;
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    let pageEle = document.getElementById('inquiry-page');
    let scrollTop = pageEle.scrollTop;
    sessionStorage.setItem('chatScrollTop', scrollTop);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let scrollTop = sessionStorage.getItem('chatScrollTop');
      if (scrollTop) {
        scrollTop = JSON.parse(scrollTop);
        sessionStorage.removeItem('chatScrollTop');
      } else {
        scrollTop = 0;
      }
      document.getElementById('inquiry-page').scrollTop = scrollTop;
    });
  }
};
</script>
<style lang="less" scoped>
  @import "style/inquiry";
  @font-size: 16px;
  @font-size-biger: 18px;
  @bg-yellow: #F4DDAA;
  @font-yellow: #D4893A;
  @font-bulue-light: @green-color;
  .consult-header {
    .mint-header-title {
      span {
        font-size: 12px;
        background: @inquiryMainColor;
        color: #fff;
        padding: 3px 6px;
        border-radius: 3px;
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
        &.offline {
          background: #ff4c56;
        }
      }
    }
    .is-right {
      color: @inquiryMainColor;
    }
  }
  #doing {
    background-color: #EFEFF4;
    .isHide {
      display: none !important;
    }
    #foot {
      display: none;
    }
    #foot.flex {
      display: flex !important;
    }
    #foot.hide {
      display: none !important;
    }
  }
  // 倒计时外置
  // #doing #page {
  //   padding-top: 44px;
  // }
  #box-wrapper {
    padding-top: 60px;
  }
</style>


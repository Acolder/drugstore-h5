/* eslint-disable */
<myComment></myComment>
<template>
  <div id="doctorRecommend" style="">
    <mt-header fiexd :title='RecommendDoctorMsg.real_name' :class="{hide:this.imageShow}">
      <mt-button slot="left" icon="back" onclick="window.history.go(-1)"></mt-button>
    </mt-header>
    <!--head:recommend drugs,out ouf of page-->
    <!--note:out ouf of page,rewrited page.js-->
    <div id="top">
      <div class="container" v-if="this.drugInfo.prodId">
        <div class="top">
          <div class="box-left">
            <img :src='drugInfo.prodPhotoPath' alt="">
          </div>
          <div class="box-right">
            <div class="introduce ">{{drugInfo.prodName + drugInfo.description}}</div>
            <div class="price">¥{{drugInfo.price}}</div>
          </div>
        </div>
        <div class="bottom">
          <div class="pushBtn" @click="setDrugsCommend">发 送</div>
        </div>
      </div>
    </div>
    <div style="flex-shrink:1" class="inquiry-page chat-page" id="inquiry-page">
      <me-chat v-for="(object) in chatList" :name='object.name' :message='object.message' :class="[object.class]" :actor='object.actor' :key='object.id' :avatar='object.avatar'>
        <div v-if="object.html" v-html="object.html">
        </div>
        <!--如果是音频文件-->
        <div v-if="object.duration" @click="playVoice(object.base64, object.duration)">
          <div class="voiceBox">
            <div class="icon-voiceMsg"></div>
            <div class="duration" :style="{width:20+3*object.duration+'px'}">{{object.duration}} S</div>
          </div>
        </div>
        <!--如果是图文文件-->
        <div v-if="object.type==='image'">
          <div class="mes-img" @click="clickImage(object.url)"><img :src=object.url alt=""></div>
        </div>
      </me-chat>
    </div>
    <footer style="flex-shrink:0" class="bottom-input box" id="foot" :class="{hide:this.imageShow, ios:this.isIOS}">
      <div class="box-input">
        <input id="input" type="text" @keyup.enter="submit" @focus.prevent="minScreen" @blur="maxScreen" v-model="inputValue" placeholder="这里输入文字。">
        <div class="box-icon-down">
          <span class="icon-down" @click.self="clickDown"></span>
        </div>
        <!--发送文本-->
        <div class="box-icon-send">
          <div class="icon-send" :class="{active: writing}" @click.self="submit"></div>
        </div>
      </div>
      <div class="box-btns" :class="{isHide:isHidefootBottm}">
        <div class="item-btn">
          <div class="icon-photo" @click="uploadImg2"></div>
          <div>照片</div>
        </div>
      </div>
    </footer>
    <div :class="{show:this.imageShow}" class="bigImage" @click="hideImage">
      <img data-v-58d64c12="" data-v-a7bf04c8="" :src=this.imageURL alt="" style="">
    </div>
  </div>
</template>
<script>
import { Header, MessageBox, Toast } from 'mint-ui';
import chat from '@/components/chat/chat.vue';
import page from './modules/page';
import { getUserInfo } from '@/api/user';
// import { getUserInfo } from '@/utils/auth';
import ajax from '@/utils/ajax';
import doctorAjax from '@/utils/doctorAjax';
import yilin from '@/utils/yilinApiRequest';
import RECORD from '@/api/pharmacistRecords';
import wxjs from '@/utils/wxjsInterface';
const queryString = require('query-string');
import { getQueryString, getRequestObj } from '@/utils/index';
import { getConsultType, getRongyunParam } from './inquiry';
import { addPharmacistChats, getPharmacistChats } from './history';
import { goLogin } from '@/api/user';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'doctorRecommend',
  components: {
    'mt-header': Header,
    'me-chat': chat,
    'inputValue': ''
  },
  data: function () {
    return {
      btnClass: 'btn-right',
      inputValue: '',
      isHidefootBottm: true,
      chatList: [],
      writing: false,
      consults: {},
      pharmacistRecord: {},
      drugInfo: {},
      // 微信js sdk 实例对象
      wx: null,
      // 请求返回的微信config对象
      wxResponseConfig: {},
      imgUrls: [],
      // 推荐医生信息
      RecommendDoctorMsg: {},
      // 医生头像，在查询医生资料时保存
      avatar: '',
      doctorAvatar: '',
      targetId: '',
      user: {},
      coordinate: {},
      imageShow: false,
      imageURL: '',
      isIOS: false,
      timerId: ''
    };
  },
  computed: {
    ...mapGetters([
      'unReadMsg'
    ]),
    ...mapActions([
      'appendMsg'
    ])
  },
  created() {
    this.initwx();
  },
  mounted: function () {
    this.initPage();
    this.getUserMsg();
    // this.getconsult();
    this.rongyunConnect();
    this.initVoice();
    //1.输入自适应屏幕
    document.body.onresize = () => {
      page.selfAdaptionScreen();
      this.scrollToBottom();
    };
    if (page.isIOS()) {
      this.isIOS = true;
    }
  },
  methods: {
    //移除默认事件
    preventDefault: function (event) {
      event.preventDefault();
    },
    // 适应屏幕
    // 收缩屏幕
    minScreen: function () {
      if (page.isIOS()) {
        let pageEle = document.getElementById('inquiry-page');
        // let topEle = document.getElementById('top').clientHeight;
        // let HeightResult = page.getIOSHeightHasKeyboard(113);
        let HeightResult = page.getIOSHeightHasKeyboard(112)+112;
        let footer = document.getElementsByTagName('footer')[0];
        // if (topEle) {
        //   HeightResult = HeightResult - topEle + 44;
        // }
        setTimeout(() => {
          // pageEle.style.height = HeightResult + 'px'; // 滚动区域变短
          // this.scrollToBottom();
          // // this.sendChat({message:document.body.scrollHeight});
          // document.body.scrollTop = 0;
          // let doctorRecommendEle = document.getElementById('doctorRecommend');
          // doctorRecommendEle.addEventListener('touchmove', this.preventDefault, false);
          let innerHeight = window.innerHeight;
          HeightResult = HeightResult > (innerHeight - footer.clientHeight) ? (innerHeight - footer.clientHeight) : HeightResult;
          console.log(HeightResult);
          pageEle.style.height = HeightResult + 'px'; // 滚动区域变短
          this.scrollToBottom();
          document.body.scrollTop = 0;
          let doctorRecommendEle = document.getElementById('doctorRecommend');
          doctorRecommendEle.addEventListener('touchmove', this.preventDefault, false);
        }, 300);
      }
    },
    // 放大屏幕
    maxScreen: function () {
      if (page.isIOS()) {
        setTimeout(() => {
          page.selfAdaptionScreen();
          let doctorRecommendEle = document.getElementById('doctorRecommend');
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
      this.chatList.push(data);
      addPharmacistChats(this.targetId + this.user.userid, data);
      this.scrollToBottom();
    },
    // 获取经纬度
    sendPositionMsg: function () {
      var messageName = "CoordinateMsg"; // 消息名称。
      var objectName = "app:latlong"; // 消息内置名称，请按照此格式命名。
      var mesasgeTag = new RongIMLib.MessageTag(true, true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
      var prototypes = ["content"]; // 消息类中的属性名。
      RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);
      var conversationType = RongIMLib.ConversationType.PRIVATE; //单聊,其他会话选择相应的消息类型即可。
      var targetId = this.targetId; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
      let coordinate = sessionStorage.getItem('coordinate');
      let sendContet = coordinate;
      var msg = new RongIMClient.RegisterMessage.CoordinateMsg({ content: sendContet }
      );
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          console.info('推荐经纬度成功!!');
        },
        onError: function (errorCode) {
        }
      });
    },
    // 获得用户信息
    getUserMsg: function () {
      getUserInfo().then(res => {
        console.log(res, '获取用户信息');
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.user = res.data.data;
            this.getInit();
          }
          else if (!res.data.data) {
            console.log('获取不到用户信息')
            goLogin();
          }
          else {
            Toast(res.data.message);
          }
        }
      });
    },
    // getInit
    getInit() {
      //获取targetID,如果targetId不存在,获取推荐医生
      let parameter = queryString.parse(location.search);
      let recommendDoctorMsgs = JSON.parse(sessionStorage.getItem('recommendDoctorMsgs'));
      if (parameter && parameter.targetId) {
        this.targetId = parameter.targetId;
        console.log(this.targetId);
        this.RecommendDoctorMsg.real_name = parameter.doctorName;
        setTimeout(() => {
          // this.getHistoryMsg();
        }, 100)
      }
      else if (recommendDoctorMsgs) {
        this.RecommendDoctorMsg = recommendDoctorMsgs;
      }
      else {
        this.getRecommendDoctor();
      }
    },
    // 获取推荐药师(C端)
    // TODo 获取推荐药师的借口改变。
    getRecommendDoctor: function () {
      let userid = this.user.userid;
      let url = '/api/doctor/getRecommendDoctor/' + userid;
      doctorAjax.get(url, {
        params: {}
      }).then((res) => {
        let response = res.data;
        console.log(res, '获取推荐药师');
        if (res.status === 200 && String(response.code) === '0' && response.data) {
          this.RecommendDoctorMsg = response.data;
          sessionStorage.setItem('recommendDoctorMsgs', JSON.stringify(this.RecommendDoctorMsg));
        }
        else if (response.code === '1') {
          // Toast('没有在线药师');
          this.$router.push({ path: '/' });
        }
        else {
          // Toast('无在线药师');
        }
      });
    },
    // 发送药品
    setDrugsCommend: function () {
      this.sentDrugsMsg();
      let content = this.drugInfo;
      let html = `<div class="User-drugsCommend-container">
          <a href="/goods/goodsDetail?productId=` + content.prodId + `&getByself=` + content.getByself + `&getCommon=` +
        content.getCommon +
        `&getFast=` + content.getFast + `">
          <div class="top" style="flex-shrink: 0">
            <div class="box-left">
              <img src="` + this.drugInfo.prodPhotoPath + `" alt="图片" style="width: 100%;border: 1px solid #CCC;border-radius:3px"/>
            </div>
            <div class="box-right">
              <div class="introduce sigleTextOverflow">` + this.drugInfo.prodName + this.drugInfo.description + `</div>
              <div class="price">¥` + this.drugInfo.price + `</div>
            </div>
          </div>
          </a>
        </div>`;
      let data = { actor: 'user', html: html, class: 'whiteChat-Box', avatar: this.user.photopath };
      this.sendChat(data);
    },
    // 发送推荐药品
    sentDrugsMsg: function () {
      var messageName = "DrugsCommendMsg"; // 消息名称。
      var objectName = "app:recommendDrug"; // 消息内置名称，请按照此格式命名。
      var mesasgeTag = new RongIMLib.MessageTag(true, true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
      var prototypes = ["content"]; // 消息类中的属性名。
      RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);
      var conversationType = RongIMLib.ConversationType.PRIVATE; //单聊,其他会话选择相应的消息类型即可。
      var targetId = this.targetId; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
      let sendContet = this.drugInfo;
      var msg = new RongIMClient.RegisterMessage.DrugsCommendMsg({ content: sendContet }
      );
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          console.info('推荐药品发送成功');
        },
        onError: function (errorCode) {
        }
      });
    },
    submit: function (event) {
      // 0.判断是否为空白字符串
      if (!this.inputValue || /^\s*$/.test(this.inputValue)) {
        return;
      }
      // 1.把输入的值push到数组中。,向融云发送消息,
      this.rongyunSentMsg(this.inputValue, this.targetId);
      // let data = { message: this.inputValue, actor: 'user', avatar: this.user.photopath };
      // this.sendChat(data);
      // 2.input中的值清空
      this.inputValue = '';
      // 3.关闭小键盘
      //document.activeElement.blur();
      // let input = document.getElementById('input');
      event.preventDefault();
    },
    // 获取就诊信息
    getconsult: function () {
      let url = 'api/user/isExistsMember/0';
      ajax.get(url).then((res) => {
        if (res.data.code === 0 && res.status === 200) {
          console.info('获取就诊信息consults:', res.data.data);
          this.consults = res.data.data;
          this.consults.groupid = '5b11e4f084d01741b3925028';
        }
      });
    },
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
    scrollToBottom: function () {
      setTimeout(() => {
        let page = document.getElementById('inquiry-page');
        page.scrollTop = page.scrollHeight - page.clientHeight;
      }, 100);
    },
    // 链接融云
    rongyunConnect: function () {
      let _vue = this;
      let appKey = getRongyunParam().appKey;
      let token = getRongyunParam().token;
      if (!token) {
        // this.$router.push({ path: '/login' });
        console.log('token过期');
        goLogin();
      }
      let config = {
        protobuf: '//cdn.ronghub.com/protobuf-2.3.0.min.js'
      };
      RongIMLib.RongIMEmoji.init();
      RongIMLib.RongIMClient.init(appKey, null, config);
      // 连接状态监听器
      RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
          console.log('连接状态监听status:', status);
          switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
              break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              // MessageBox.alert('提示', '连接中断,请重新登陆')
              console.log('提示', '连接中断,请重新登陆');
              _vue.ryReconnect();
              break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              console.log('网络不可用');
              _vue.ryReconnect();
              break;
          }
        }
      });
      // 监听信息
      RongIMClient.setOnReceiveMessageListener({
        onReceived: (mes) => {
          let message = mes;
          // message  RECORD.setList(record);
          console.info('监听信息', message);
          this.onReceivedMessage(message);
          RongIMClient.getInstance().clearUnreadCount(message.conversationType, message.targetId, {
            onSuccess: function () {
              // 清除未读消息成功。
              console.info('清除未读消息成功。');
            },
            onError: function (error) {
              // error => 清除未读消息数错误码。
              console.info('清除未读消息数错误码。', error);
            }
          });
        },
        onReceivedOld: (message) => {
          console.log('新消息', message.content.content, message);
          let data = { message: message.content.content, actor: 'doctor' };
          this.$store.dispatch('appendMsg', data);
        }
      });
      RongIMClient.connect(token, {
        onSuccess: (userId) => {
          // 链接成功后 才可 发送消息
          console.info('rongLinkSuccess2.0，用户id：', userId);
          // this.sendPositionMsg();
          this.getHistoryMsg();
        },
        onTokenIncorrect: function () {
          console.log('token无效');
        },
        onError: function (errorCode) {
          console.log(errorCode);
        }
      });
    },
    // 重新链接
    ryReconnect: function () {
      var callback = {
        onSuccess: function (userId) {
          console.log('Reconnect successfully.' + userId);
        },
        onTokenIncorrect: function () {
          console.log('token无效');
        },
        onError: function (errorCode) {
          console.log(errorcode);
        }
      };
      var config = {
        // 默认 false, true 启用自动重连，启用则为必选参数
        auto: true,
        // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
        url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
        // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
        rate: [100, 1000, 3000, 6000, 10000]
      };
      RongIMClient.reconnect(callback, config);
    },
    // 消息监听
    messageListener(mes) {
      let message = mes;
      // message  RECORD.setList(record);
      console.info('监听信息', message);
      if (message.targetId !== this.targetId) {
        return false;
      }
      if (!Date.prototype.format) {
        Date.prototype.format = function (fmt) {
          var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
          };
          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
              fmt = fmt.replace(RegExp.$1,
                (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
          }
          return fmt;
        };
      }
      // 如果真实姓名不为undefine,保存聊天记录
      if (this.RecommendDoctorMsg.real_name) {
        this.saveChatRecord({
          targetid: message.targetId,
          time: new Date(message.sentTime).format("yyyy-MM-dd hh:mm"),
          doctorname: this.RecommendDoctorMsg.real_name
        });
      } else {
        console.info('真实姓名为空' + this.RecommendDoctorMsg.real_name);
      }
      if (_vue.isReceiveMsg === false) {
        this.isReceiveMsg = true;
        setTimeout(() => {
          page.selfAdaptionScreen();
        }, 50);
        Timer.countDown();
        this.refreshTime();
      }
      console.info('doctor news:', message.content.content, message);
      console.log(message, '查看message', message.messageType, 'messageType', message.objectName ? message.objectName: '', )
      // 1. 文本类型
      if (message.messageType === 'TextMessage') {
        console.info('TextMessage is it');
        let mes = RongIMLib.RongIMEmoji.emojiToSymbol(message.content.content);
        mes = RongIMLib.RongIMEmoji.symbolToHTML(mes);
        let avatar = message.content.user.portrait;
        let param = { message: mes, actor: 'doctor', avatar: avatar };
        this.sendChat(param);
      }// 2. 图片类型
      else if (message.messageType === 'ImageMessage') {
        let avatar = message.content.user.portrait;
        let param = {
          actor: 'doctor',
          avatar: avatar,
          type: 'image',
          class: 'hasImage',
          url: message.content.imageUri
        };
        this.sendChat(param);
        setTimeout(() => {
          this.scrollToBottom();
        }, 500);
      }// 3.声音类型
      else if (message.messageType === 'VoiceMessage') {
        let avatar = message.content.user.portrait;
        let param = {
          actor: 'doctor',
          avatar: avatar,
          class: 'voiceInfo',
          duration: message.content.duration,
          base64: message.content.content,
        };
        this.sendChat(param);
        setTimeout(() => { this.scrollToBottom() }, 200)
      }
      // 4.推荐药品,客户推荐药品,从推荐药品中点出的药品详情.
      else if (message.messageType === 'DrugsCommendMsg' &&
        message.objectName === 'app:recommendDrug') {
        let content = JSON.parse(message.content.content);
        console.info('recommend Drugs:', content);
        let html = `<div class="User-drugsCommend-container">
          <a href="/goods/goodsDetail?productId=` + content.prodId + `&getByself=` + content.getByself +
          `&getCommon=` + content.getCommon +
          `&getFast=` + content.getFast + `&recommendId=` + content.recommendId + `">
          <div class="top doctor">
            <div class="box-left">
              <img src="` + content.prodPhotoPath + `" alt="图片" style="width: 100%;border: 1px solid #CCC;border-radius:3px"/>
            </div>
            <div class="box-right">
              <div class="introduce sigleTextOverflow">` + content.prodName + content.description + `</div>
              <div class="price">¥` + content.price + `</div>
            </div>
          </div>
          </a>
        </div>`;
        let avatar = this.avatar;
        let param = { actor: 'doctor', html: html, avatar: avatar };
        this.sendChat(param);
      }
      // 5.推荐药品, 来源:药师咨询
      else if (message.messageType === 'UnknownMessage' &&
        message.content.message.objectName === 'app:recommendDrug') {
        let msgContent = message.content.message.content;
        let content = JSON.parse(msgContent.content);
        console.info('recommend Drugs:', content);
        let html = `<div class="User-drugsCommend-container">
          <a href="/goods/goodsDetail?productId=` + content.prodId + `&getByself=` + content.getByself +
          `&getCommon=` + content.getCommon +
          `&getFast=` + content.getFast + `&recommendId=` + content.recommendId + `">
          <div class="top doctor">
            <div class="box-left">
              <img src="` + content.prodPhotoPath + `" alt="图片" style="width: 100%;border: 1px solid #CCC;border-radius:3px"/>
            </div>
            <div class="box-right">
              <div class="introduce sigleTextOverflow">` + content.prodName + content.description + `</div>
              <div class="price">¥` + content.price + `</div>
            </div>
          </div>
          </a>
        </div>`;
        console.log(msgContent);
        let avatar = msgContent.user.portrait;
        let param = { actor: 'doctor', html: html, avatar: avatar };
        this.sendChat(param);
      }
    },
    // send MSG
    rongyunSentMsg: function (contents, targetId) {
      // let conversationtype = RongIMLib.ConversationType.PRIVATE;
      // let msg = new RongIMLib.TextMessage(content);
      // let instance = RongIMClient.getInstance();
      // instance.sendMessage(conversationtype, targetId, msg, {
      //   onSuccess: (message) => {
      //     console.log('clientSentSuccess:', message.content);
      //   },
      //   onError: function (errorCode, message) {
      //     console.log('发送文字消息失败', errorCode);
      //   }
      // });
      let _this = this;
      let converType = RongIMLib.ConversationType.PRIVATE;
      let msg = new RongIMLib.TextMessage({ content: contents });
      RongIMClient.getInstance().sendMessage(converType, targetId, msg, {
        onSuccess: function (message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
          console.log('Send successfully');
          let data = { message: contents, actor: 'user', avatar: _this.user.photopath };
          _this.sendChat(data);
        },
        onError: function (errorCode, message) {
          var info = '';
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时';
              break;
            case RongIMLib.ErrorCode.UNKNOWN:
              info = '未知错误';
              break;
            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
              info = '在黑名单中，无法向对方发送消息';
              break;
            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
              info = '不在讨论组中';
              break;
            case RongIMLib.ErrorCode.NOT_IN_GROUP:
              info = '不在群组中';
              break;
            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
              info = '不在聊天室中';
              break;
          }
          console.log('发送失败: ' + info + errorCode);
          Toast('发送失败:' + info);
        }
      });
    },
    savePharmacistRecord: function (time) {
      //1.time 以医生回复的时间为准.
      this.pharmacistRecord.time = time;
      //存储到localstorage
      let pharmacistRecord = JSON.parse(localStorage.getItem('pharmacistRecord'));
    },
    // 保存聊天记录
    saveChatRecord: function (record) {
      RECORD.setList(record);
    },
    //初始化页面
    initPage: function () {
      const parsed = queryString.parse(location.search);
      this.drugInfo = parsed;
      setTimeout(() => {
        page.selfAdaptionScreen();
      }, 50)
    },
    initVoice: function () {
      //      let RongIMVoice = RongIMLib.RongIMVoice;
      //      RongIMVoice.init();
    },
    // 播放语音
    playVoice: function (voiceData, duration) {
      this.play(voiceData);
      console.info('暂不支持语音播放!')
    }
    ,
    play: function (voice) {
      if (voice) {
        let RongIMVoice = RongIMLib.RongIMVoice;
        RongIMVoice.init();
        let duration = voice.length / 1024;    // 音频持续大概时间(秒)
        RongIMVoice.preLoaded(voice, function () {
          MessageBox("提示", "暂不支持语音播放!");
          RongIMVoice.play(voice, duration);
        });
      } else {
        console.error('请传入 amr 格式的 base64 音频文件');
      }
    },
    // 3.点击触发上传图片事件
    uploadImg2() {
      let _self = this;
      if (_self.iswx()) { // 微信
        _self.wx.ready(function () {
          _self.wx.chooseImage({
            success: function (res) {
              let localIds = res.localIds;
              _self.syncUpload2(localIds);
            }
          });
        });
      }
    },
    // 4.上传图片 生成缩略图 生成base64
    syncUpload2(localIds) {
      const _self = this;
      let imglink = localIds.pop();
      _self.wx.uploadImage({
        localId: imglink, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (r) {
          let serverId = r.serverId; // 返回图片的服务器端ID
          let token = _self.wxResponseConfig.access_token;
          ajax.get(`/api/system/UploadWebFile`, {
            params: {
              access_token: token,
              media_id: serverId
            }
          }).then((res) => {
            if (res.status === 200 && res.data.code === 0) {
              let model = JSON.parse(res.data.data);
              // model.url 为图片路径
              // TODO 发送图片到对话框 chatInterface.sendMsg(model.url, true, photourl, 2, true);
              let param = {
                actor: 'user',
                avatar: _self.user.photopath,
                type: 'image',
                class: 'hasImage',
                url: model.url
              };
              _self.sendChat(param);
              setTimeout(() => {
                _self.scrollToBottom();
              }, 800);
              // 生成缩略图
              let purl = `/api/system/uploadthumbnail?name=${model.attachment}&path=${model.physicalPath}`;
              ajax.post(purl).then((res) => {
                if (res.status === 200) {
                  let data = res.data.data;
                  if (!!data === false) {
                    return;
                  }
                  let thumbnail_data = JSON.parse(data);
                  // get base64
                  ajax.get(`/api/system/getBase64ByImgUrl`, {
                    params: {
                      url: thumbnail_data.url
                    }
                  }).then((res) => {
                    if (res.status === 200) {
                      let data = res.data;
                      if (data.code === 0) {
                        // thumbnail_data.url 压缩后的图片
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
                        var base64Str = data.data;
                        var imageUri = thumbnail_data.url; // 上传到自己服务器的 URL。
                        var msg = new RongIMLib.ImageMessage({ content: base64Str, imageUri: imageUri });
                        var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
                        var targetId = _self.targetId; // 目标 Id
                        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                          onSuccess: function (message) {
                            //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                            console.log("Send successfully");
                          },
                          onError: function (errorCode, message) {
                            var info = '';
                            switch (errorCode) {
                              case RongIMLib.ErrorCode.TIMEOUT:
                                info = '超时';
                                break;
                              case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                info = '未知错误';
                                break;
                              case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                                info = '在黑名单中，无法向对方发送消息';
                                break;
                              case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                                info = '不在讨论组中';
                                break;
                              case RongIMLib.ErrorCode.NOT_IN_GROUP:
                                info = '不在群组中';
                                break;
                              case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                                info = '不在聊天室中';
                                break;
                              default:
                                info = x;
                                break;
                            }
                            Toast('发送失败:' + info);
                          }
                        }
                        );
                      }
                    }
                  });
                }
              });
            }
            else {
              Toast(res.data.message);
              // alert(JSON.stringify(res.data.data));
              // alert(JSON.stringify(res.data.data).url);
            }
          });
          if (localIds.length > 0) {
            _self.syncUpload2(localIds);
          }
        }
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
    initwx: function () {
      let _self = this;
      let code = getQueryString('code');
      wxjs.init(code).then((res) => {
        console.log('init wx');
        _self.wx = res.wx;
        _self.wxResponseConfig = res.wxconfig;
      });
    },
    // 获取历史消息
    // getHistoryMsg: function () {
    //   console.log(this.targetId);
    //   let chats = getPharmacistChats(this.targetId + this.user.userid);
    //   console.log(chats, '获取历史消息');
    //   this.chatList = chats;
    //   this.scrollToBottom();
    // },
    // 获取历史消息
    getHistoryMsg(isReadMore) {
      let _this = this;
      let targetId = this.targetId;
      let conversationType = 1;
      let timestrap = null; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
      if (!isReadMore) {
        timestrap = 0;
      }
      let count = 20;
      RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
        onSuccess: function (list, hasMsg) {
          if (isReadMore) {
            _this.$refs.loadmore.onTopLoaded();
            // _this.getMoreChatMsg(list);
            // let messageArray = list.reverse();
            // messageArray.forEach((res, i) => {
            //   onReceived(res, _this, true);
            // });
          } else {
            list.forEach((res, i) => {
              _this.onReceivedMessage(res);
            });
            RongIMClient.getInstance().clearUnreadCount(conversationType, targetId, {
              onSuccess: function () {
                // 清除未读消息成功。
                console.info('清除未读消息成功。');
              },
              onError: function (error) {
                // error => 清除未读消息数错误码。
                console.info('清除未读消息数错误码。', error);
              }
            });
          }
          // _this.isLoading = false;
          // if (!hasMsg) {
          //   _this.hasMore = false;
          //   _this.readMoreText = '没有更多了';
          //   _this.topText = '已加载全部';
          // }
          // _this.$nextTick(function() {
          //   _this.scrollMode = 'touch';
          // });
        },
        onError: function (error) {
          // APP未开启消息漫游或处理异常
          console.log(error);
        }
      });
    },
    // 处理消息
    onReceivedMessage(message) {
      let _vue = this;
      if (message.targetId !== this.targetId) {
        return false;
      }
      let actor = '';
      let avatar = '';
      if (message.senderUserId === this.user.userid) {
        actor = 'user';
        avatar = this.user.photopath;
      } else {
        this.doctorAvatar = message.content.user ? message.content.user.portrait : this.doctorAvatar;
        actor = 'doctor';
        avatar = message.content.user ? message.content.user.portrait : this.doctorAvatar;
      }
      if (!Date.prototype.format) {
        Date.prototype.format = function (fmt) {
          var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
          };
          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
              fmt = fmt.replace(RegExp.$1,
                (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
          }
          return fmt;
        };
      }
      // 如果真实姓名不为undefine,保存聊天记录
      if (this.RecommendDoctorMsg.real_name) {
        this.saveChatRecord({
          targetid: message.targetId,
          time: new Date(message.sentTime).format("yyyy-MM-dd hh:mm"),
          doctorname: this.RecommendDoctorMsg.real_name
        });
      } else {
        console.info('真实姓名为空' + this.RecommendDoctorMsg.real_name);
      }
      if (_vue.isReceiveMsg === false) {
        this.isReceiveMsg = true;
        setTimeout(() => {
          page.selfAdaptionScreen();
        }, 50);
        Timer.countDown();
        this.refreshTime();
      }
      // console.info('doctor news:', message.content.content, message);
      // console.log(message, '查看message', message.messageType, 'messageType', message.objectName ? message.objectName: '', )
      // 1. 文本类型
      if (message.messageType === 'TextMessage') {
        console.info('TextMessage is it');
        console.log(message);
        let mes = RongIMLib.RongIMEmoji.emojiToSymbol(message.content.content);
        mes = RongIMLib.RongIMEmoji.symbolToHTML(mes);
        // let avatar = message.content.user.portrait;
        let param = { message: mes, actor: actor, avatar: avatar };
        this.sendChat(param);
      }// 2. 图片类型
      else if (message.messageType === 'ImageMessage') {
        // let avatar = message.content.user.portrait;
        let param = {
          actor: actor,
          avatar: avatar,
          type: 'image',
          class: 'hasImage',
          url: message.content.imageUri
        };
        this.sendChat(param);
        setTimeout(() => {
          this.scrollToBottom();
        }, 500);
      }// 3.声音类型
      else if (message.messageType === 'VoiceMessage') {
        // let avatar = message.content.user.portrait;
        let param = {
          actor: actor,
          avatar: avatar,
          class: 'voiceInfo',
          duration: message.content.duration,
          base64: message.content.content,
        };
        this.sendChat(param);
        setTimeout(() => { this.scrollToBottom() }, 200)
      }
      // 4.推荐药品,客户推荐药品,从推荐药品中点出的药品详情.
      else if (message.messageType === 'DrugsCommendMsg' &&
        message.objectName === 'app:recommendDrug') {
        let content = JSON.parse(message.content.content);
        console.info('recommend Drugs:', content);
        let html = `<div class="User-drugsCommend-container">
          <a href="/goods/goodsDetail?productId=` + content.prodId + `&getByself=` + content.getByself +
          `&getCommon=` + content.getCommon +
          `&getFast=` + content.getFast + `&recommendId=` + content.recommendId + `">
          <div class="top doctor">
            <div class="box-left">
              <img src="` + content.prodPhotoPath + `" alt="图片" style="width: 100%;border: 1px solid #CCC;border-radius:3px"/>
            </div>
            <div class="box-right">
              <div class="introduce sigleTextOverflow">` + content.prodName + content.description + `</div>
              <div class="price">¥` + content.price + `</div>
            </div>
          </div>
          </a>
        </div>`;
        // let avatar = this.avatar;
        let param = { actor: actor, html: html, avatar: avatar };
        this.sendChat(param);
      }
      // 5.推荐药品, 来源:药师咨询
      else if (message.messageType === 'UnknownMessage' &&
        message.content.message.objectName === 'app:recommendDrug') {
        let msgContent = message.content.message.content;
        let content = JSON.parse(msgContent.content);
        console.info('recommend Drugs:', content);
        let html = `<div class="User-drugsCommend-container">
          <a href="/goods/goodsDetail?productId=` + content.prodId + `&getByself=` + content.getByself +
          `&getCommon=` + content.getCommon +
          `&getFast=` + content.getFast + `&recommendId=` + content.recommendId + `">
          <div class="top doctor">
            <div class="box-left">
              <img src="` + content.prodPhotoPath + `" alt="图片" style="width: 100%;border: 1px solid #CCC;border-radius:3px"/>
            </div>
            <div class="box-right">
              <div class="introduce sigleTextOverflow">` + content.prodName + content.description + `</div>
              <div class="price">¥` + content.price + `</div>
            </div>
          </div>
          </a>
        </div>`;
        console.log(msgContent);
        // let avatar = msgContent.user.portrait;
        let param = { actor: actor, html: html, avatar: avatar };
        this.sendChat(param);
      }
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
    RecommendDoctorMsg: function (value) {
      console.log(value, 'RecommendDoctorMsg获取医生信息');
      this.targetId = "doc" + value.user_id;
      this.avatar = value.avatar;
      // this.getHistoryMsg();
    },
    unReadMsg: function(newVal, oldVal) {
      // this.messageListener(newVal);
    }
  }
};
</script>
<style lang="less" scoped>
  @import "style/inquiry";
  @font-size: 15px;
  @font-size-biger: 18px;
  @bd-grey: #CCC;
  @font-blue-light: @green-color;
  @html-color: #EFEFF4;
  // introduce:药品style,咨询药师中推荐的药品
  #top {
    padding-top: 44px;
    background-color: @html-color;
    // 可见盒子
    .container {
      background: #FFF;
      padding: 6px;
      font-size: @font-size;
      .top {
        display: flex;
        .box-left {
          width: 16%;
          .icon-39 {
            .icon-construction("./imgs/39.png", 70px);
            border: 1px solid darken(@html-color, 10%);
            border-radius: .1em;
          }
          margin-right: 10px;
        }
        .box-right {
          width: 78%;
          position: relative;
          .introduce {
            line-height: @font-size*1.4;
            .multi-text-overflow(2);
            min-height: 42px;
          }
          .title {
            margin-top: 4px;
            width: 90%;
          }
          .price {
            margin-top: 0;
            color: @font-blue-light;
            font-size: @font-size*1.1;
          }
        }
      }
      // 发送按钮
      .bottom {
        text-align: center;
        .pushBtn {
          .btn();
          font-size: 14px;
          padding: 2px 35px 1px 35px;
          border-radius: 2em;
          color: @font-blue-light;
          border: 1px solid @font-blue-light;
        }
      }
    }
  }
  // page
  #page {
    padding-top: 20px;
  }
  .isHide {
    display: none !important;
  }
  .box-left {
    img {
      width: 100%;
      border: 1px solid #CCC;
      border-radius: 2px;
    }
  }
  // 推荐用药,医生端发出.
  .top.doctor {
    .User-drugsCommend-container .top {
      flex-direction: row-reverse;
    }
  }
  #inquiryLayout .bottom-input.ios {
    position: relative;
  }
  #page {
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
  }
</style>

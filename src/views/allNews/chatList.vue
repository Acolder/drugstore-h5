<template>
  <div class="doctorMessage" id="chatList">
    <mt-header fixed title="消息">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <ul class="allNews-main" v-if="consultList.length > 0">
      <li v-for="item in resultList" :key="item.index" @click="intoInquiry(item)">
        <span class="unReadNum" v-show="item.unreadMessageCount">{{item.unreadMessageCount}}</span>
        <img src="./../inquiry/imgs/icon_doctor@2x.png" alt="" v-if="!item.avatar">
        <img :src="item.avatar" alt="" v-if="item.avatar">
        <div class="detail">
          <div class="name-and-time">
            <h2>{{item.realname}} <em v-show="item.online_status===0 && item.conversationType===3">在线</em></h2>
            <span>{{item.updatetime}}</span>
          </div>
          <p v-html="item.content"></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import ajax from '@/utils/ajax';
import doctorAjax from '@/utils/doctorAjax';
import { formatChatTimes } from '@/utils/date';
// import { ryInit, getTotalUnreadCount } from '@/api/rongyun';
// import { getRongyunParam } from '@/views/inquiry/inquiry';
// import { goLogin } from '@/api/user';
import { mapGetters } from 'vuex';
import * as imModule from '@/components/chat/js/im';
export default {
  data() {
    return {
      consultList: [],
      GroupIds: [],
      doctorIds: [],
      doctorList: [],
      resultList: []
    };
  },
  computed: {
    ...mapGetters([
      'unReadMsg'
    ])
  },
  watch: {
    unReadMsg: function(newVal, oldVal) {
      this.messageListener(newVal);
    }
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
  methods: {
    // 消息监听
    messageListener(message) {
      if (message) {
        let targetId = message.targetId;
        let resultList = this.resultList;
        let index = resultList.findIndex(v => v.targetId === targetId);
        let unreadMessageCount = resultList[index].unreadMessageCount + 1;
        let updateTime = formatChatTimes(message.sentTime, true);
        // this.$set(resultList[index], 'unreadMessageCount', unreadMessageCount);
        resultList[index].unreadMessageCount = unreadMessageCount;
        resultList[index].sentTime = message.sentTime;
        resultList[index].updatetime = updateTime;
        // 根据消息类型返回显示格式
        switch (message.messageType) {
          case 'TextMessage':
            if (message.content.content) {
              resultList[index].content = window.RongIMLib.RongIMEmoji.symbolToHTML(
                window.RongIMLib.RongIMEmoji.emojiToSymbol(message.content.content));
            }
            break;
          case 'ImageMessage':
            resultList[index].content = '[图片]';
            break;
          case 'VoiceMessage':
            resultList[index].content = '[语音]';
            break;
          case 'UnknownMessage':
            if (message.objectName === 'app:dialecticalPresc') {
              resultList[index].content = '[为你定制了个人调理处方，请查收]';
            } else if (message.objectName === 'app:endConsult') {
              resultList[index].content = '[医生结束问诊]';
            } else {
              resultList[index].content = '[其他]';
            }
            break;
        }
        this.resultListSort();
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    intoInquiry(param) {
      if (param.conversationType === 3) {
        let consultData = {
          doctorid: param.doctorid, // 医生id
          realname: param.realname, // 医生姓名
          groupid: param.targetId, // 群主id
          conversationType: 3, // 聊天类型 3 群聊
          doctorphotopath: param.avatar, // 医生头像
          consultid: 0, // 问诊单id
          remainingseconds: 0 // 咨询剩余时间（单位秒）
        };
        sessionStorage.setItem('consultData', JSON.stringify(consultData));
        sessionStorage.removeItem('inquiryFromUrl'); // 清除返回入口
        // window.location.href = '/inquiry/doing?chatTimes=again';
        this.$router.push({
          path: '/inquiry/doing',
          query: { chatTimes: 'again', chatList: true }
        });
      } else {
        window.location.href = `/inquiry/consultPharmacist?targetId=${param.targetId}&doctorName=${param.realname}`;
      }
    },
    // 处理会话列表
    transConversations(conversations) {
      let _this = this;
      _this.consultList = conversations.map(item => {
        let chat = {};
        // 如果大于48小时
        // if (new Date().getTime() - item.sentTime > 60 * 60 * 24 * 1000 * 2) {
        //   chat.updatetime = formatDate(new Date(item.sentTime), 'yyyy-MM-dd');
        // } else { // 如果小于48小时
        //   let nowTime = new Date();
        //   let conversationTime = new Date(item.sentTime);
        //   console.log(nowTime.getDate(), conversationTime.getDate());
        //   if (nowTime.getDate() - conversationTime.getDate() > 1) {
        //     chat.updatetime = formatDate(new Date(item.sentTime), 'yyyy-MM-dd');
        //   } else if (nowTime.getDate() - conversationTime.getDate() === 1) {
        //     chat.updatetime = '昨天 ' + formatDate(new Date(item.sentTime), 'hh:mm:ss');
        //   } else {
        //     chat.updatetime = formatDate(new Date(item.sentTime), 'hh:mm:ss');
        //   }
        // }
        chat.updatetime = formatChatTimes(item.sentTime, true);
        if (item.latestMessage.content.user) {
          chat.name = item.latestMessage.content.user.name;
          chat.portrait = item.latestMessage.content.user.portrait;
        } else {
          chat.name = '';
          chat.portrait = '';
        }
        // 根据类型判定内容
        switch (item.latestMessage.content.messageName) {
          case 'TextMessage':
            if (item.latestMessage.content.content) {
              chat.content = window.RongIMLib.RongIMEmoji.symbolToHTML(
                window.RongIMLib.RongIMEmoji.emojiToSymbol(item.latestMessage.content.content));
            }
            break;
          case 'ImageMessage':
            chat.content = '[图片]';
            break;
          case 'VoiceMessage':
            chat.content = '[语音]';
            break;
          case 'UnknownMessage':
            if (item.latestMessage.content.message.objectName === 'app:dialecticalPresc') {
              chat.content = '[为你定制了个人调理处方，请查收]';
            } else if (item.latestMessage.content.message.objectName === 'app:endConsult') {
              chat.content = '[医生结束问诊]';
            } else {
              chat.content = '[其他]';
            }
            break;
        }
        item.chat = chat;
        return item;
      });
      this.consultList.forEach(item => {
        let targetId = item.targetId;
        // 药师
        if (targetId.indexOf('doc') !== -1) {
          targetId = Number(targetId.substring(3));
          this.doctorIds.push(targetId);
        }
        else {
          // 医生
          this.GroupIds.push(targetId);
        }
      });
      // this.GroupIds = this.consultList.map((item) => {
      //   console.log(item);
      //   return item.targetId;
      // });
      // this.getDoctorInfoByGroupIds();
      this.getDoctorInfo();
    },
    // 获取会话列表
    getConversationList() {
      let _this = this;
      if (!this.hasConnect) {
        setTimeout(() => {
          this.getConversationList();
        }, 300);
      } else {
        imModule.getConversationList(conversations => {
          _this.transConversations(conversations);
        });
      }
    },
    // 根据群组Id获取医生姓名、头像
    getDoctorInfoByGroupIds() {
      // 测试,获得历史记录列表
      let request = {
        GroupIds: this.GroupIds
      };
      return new Promise((resolve, reject) => {
        ajax.post('api/user/getDoctorInfoByGroupIds', request).then(data => {
          if (data.status === 200 && data.data.code === 0) {
            resolve(data.data.data);
          }
        });
      });
    },
    // 根据医生Id获取医生姓名、头像
    getDoctorInfoByDoctorIds() {
      let request = {
        DoctorIds: this.doctorIds,
        Name: null,
        PageIndex: 1,
        PageSize: 20
      };
      return new Promise((resolve, reject) => {
        doctorAjax.post('api/doctor/getdoctorlist', request).then(data => {
          if (data.status === 200 && data.data.code === 0) {
            resolve(data.data.data);
          }
        });
      });
    },
    // 获取医生姓名、头像
    getDoctorInfo() {
      let byGroupIds = this.getDoctorInfoByGroupIds();
      let byDoctorId = this.getDoctorInfoByDoctorIds();
      Promise.all([byGroupIds, byDoctorId]).then(res => {
        // console.log(res, '医生列表内');
        let res0 = res[0] || [];
        let res1 = res[1] || [];
        this.doctorList = [...res0, ...res1];
        // this.translateResultList();
        this.getDoctorOnlineStatus();
      });
    },
    // 根据医生id获取医生在线状态  在线状态 0：online 在线、1：offline 离线、2：logout 登出
    getDoctorOnlineStatus() {
      let _this = this;
      let doctorList = this.doctorList;
      let doctorIdList = [];
      for (let i = 0; i < doctorList.length; i++) {
        let doctorId = Number(doctorList[i].doctor_id) ? Number(doctorList[i].doctor_id) : Number(doctorList[i].userid);
        doctorIdList.push(doctorId);
      }
      let params = {
        doctorIds: doctorIdList
      };
      ajax.post('/api/user/getDoctorOnlineStatus', params).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          let returnData = res.data.data;
          _this.doctorList.map(doc => {
            returnData.map(rd => {
              if ((Number(doc.doctor_id) === Number(rd.doctor_id)) || (Number(doc.userid) === Number(rd.doctor_id))) {
                doc.online_status = rd.online_status;
              }
              return rd;
            });
            return doc;
          });
          _this.translateResultList();
        }
      });
    },
    // 处理结果列表
    translateResultList() {
      this.doctorList.map(item => {
        this.consultList.map(item2 => {
          if ((item.group_id === item2.targetId) || (`doc${item.userid}` === item2.targetId)) {
            // 1、item.group_id === item2.targetId
            // 2、(item.group_id === item2.targetId) || (`doc${item.userid}` === item2.targetId)
            let result = {
              doctorid: item.doctor_id ? item.doctor_id : item.userid, // 医生id
              realname: item.doctor_name ? item.doctor_name : item.realname, // 医生姓名
              avatar: item.doctor_avatar ? item.doctor_avatar : item.avatar, // 医生头像
              targetId: item2.targetId, // 群主id
              content: item2.chat.content, // 显示文本
              updatetime: item2.chat.updatetime, // 更新时间
              sentTime: item2.sentTime, // 发送时间
              conversationType: item2.conversationType, // 聊天类型
              unreadMessageCount: item2.unreadMessageCount, // 消息未读数量
              online_status: item.online_status // 在线状态 0：online 在线、1：offline 离线、2：logout 登出
            };
            // result = Object.assign(item, result);
            // console.log(result, 'result');
            this.resultList.push(result);
          }
          return item2;
        });
        return item;
      });
      this.resultListSort();
    },
    // 按时间倒序
    resultListSort() {
      this.resultList.sort((a, b) => {
        return b.sentTime - a.sentTime;
      });
    },
  },
  created() {
    // this.RYinit();
  },
  mounted() {
    this.getConversationList();
  }
};
</script>
<style scoped lang="less">
  #chatList {
    margin-top: 44px;
  }
  .unReadNum {
    position: absolute;
    background-color: red;
    min-width: 18px;
    height: 18px;
    border-radius: 50%;
    top: 14px;
    left: 43px;
    text-align: center;
    color: #FFF;
    font-size: 9px;
    line-height: 18px;
    padding: 0 2px;
  }
  /*#chatList {
    background: #EDEDED;
    padding-top: 15px;
    position: absolute;
    top: 239px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }*/
  .allNews-main {
    height: 100%;
    overflow-y: auto;
    background: #FFF;
  }
  .allNews-main li {
    position: relative;
    background: #FFF;
    height: 90px;
    padding: 15px 12px;
    border-bottom: 1px solid #EEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
    display: flex;
    img {
      width: 54px !important;
      height: 53px !important;
      border-radius: 50%;
      flex-basis: 53px;
    }
    .detail {
      margin-left: 18px;
      flex-grow: 1;
      width: 60%;
      .name-and-time {
        display: flex;
        // justify-content: space-between;
        h2 {
          font-size: 15px;
          color: #000;
          flex: 1;
          em {
            color: #fff;
            background: #0ccdd4;
            font-size: 12px;
            padding: 1px 8px;
            border-radius: 3px;
            margin-left: 5px;
            display: inline-block;
          }
        }
        span {
          height: 16px;
          overflow: hidden;
          color: #BCBBBB;
          text-align: right;
          font-size: 12px;
        }
      }
      p {
        color: #8C8C8C;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>

<template>
  <div class="doctor-list">
    <mt-header class="header" title="选择医生">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="status-bar">
      导诊接待 &gt; <span>选择医生</span> &gt; 医生诊断 &gt; 送药上门
    </div>
    <p class="doctor-total">已为您推荐 {{ doctorList.length }} 位医生</p>
    <ul>
      <li class="doctor-item" v-for="(doctor, index) in doctorList" :key="index"  @click="doctorDetail(doctor.user_id)">
        <img class="avatar" :src="doctor.avatar ? doctor.avatar : defaultAvatar" alt="" >
        <div class="detail">
          <p class="info">
            <span class="name">{{ doctor.real_name}}</span>{{ doctor.title_name}}
            <span class="btn" @click.stop="toConsult(doctor)">去咨询</span>
          </p>
          <p class="comment-consult">
            <img class="icon" src="./imgs/icon_evaluate_xzys.png" alt="">评价<span>{{ doctor.commentsnum}}条</span>
            <img class="icon margin" src="./imgs/icon_fw_xzys.png" alt="">服务患者数<span>{{ doctor.consultnum}}</span>
          </p>
          <p class="expert">{{ doctor.expert }}</p>
        </div>
      </li>
    </ul>
    <footer class="footer">请选择医生咨询</footer>
  </div>
</template>
<script>
import ajax from '@/utils/ajax';
import { getQueryString } from '@/utils/index';
import { getUserInfo } from '@/utils/auth';
export default {
  data() {
    return {
      doctorList: [], // 医生列表
      user: {}, // 患者信息
      defaultAvatar: require('./imgs/icon_doctor@2x.png'),
      loginUser: {}, // 登录者信息
    };
  },
  mounted() {
    this.getDoctorList();
    this.getUserMessage();
    this.getLoginUserMsg();
  },
  methods: {
    // 获取推荐在线医生
    getDoctorList() {
      let url = '/api/user/getRecommendOnlineDoctors';
      ajax.get(url).then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          this.doctorList = res.data.data;
          console.log(this.doctorList);
        } else {
          console.error(res.data.message);
        }
      });
    },
    // 获取用户信息
    getUserMessage() {
      let memberid = getQueryString('memberId');
      let description = getQueryString('description');
      let name = getQueryString('name');
      let gender = getQueryString('gender');
      let age = getQueryString('age');
      let telephone = getQueryString('mobile');
      this.user = {
        memberid: memberid,
        description: description,
        name: name,
        gender: gender,
        age: age,
        telephone: telephone
      }
    },
    // 获取登录者信息
    getLoginUserMsg() {
      this.loginUser = getUserInfo();
    },
    // 咨询医生
    toConsult(doctor) {
      let _this = this;
      let url = '/api/user/consultDoctor';
      let consultSource = JSON.parse(sessionStorage.getItem('consultSource'));
      let storeId = sessionStorage.getItem('StoreId');
      let params = {
        doctorId: doctor.user_id, // 医生ID
        real_name: doctor.real_name, // 医生姓名
        avatar: doctor.avatar, // 医生头像
        memberID: _this.user.memberid, // 就诊人ID
        description: _this.user.descriptions, // 病情描述
        Name: _this.user.name, // 就诊人姓名
        Gender: _this.user.gender, // 就诊人性别
        Age: _this.user.age, // 就诊人年龄
        Mobile: _this.user.telephone, // 就诊人手机号
        ConsultSource: consultSource ? consultSource : 1, // ConsultSource状态码: 1药葫芦 2问诊室 3药柜 4药箱 5电商
      };
      if (storeId) {
        storeId = JSON.parse(storeId);
        params.storeid = storeId;
      }
      ajax.post(url, params).then(res => {
        _this.sending = false;
        if (res.status === 200 && res.data.code === 0) {
          // localStorage.removeItem('consultSource'); // 清除聊天来源
          let returnData = res.data.data;
          // 保存当前选择的医生信息
          let consultData = {
            doctorid: doctor.user_id, // 医生id
            realname: doctor.real_name, // 医生姓名
            groupid: returnData.groupid, // 群主id
            conversationType: 3, // 聊天类型 3 群聊
            doctorphotopath: doctor.avatar, // 医生头像
            consultid: returnData.consultid, // 咨询单ID
            remainingseconds: returnData.remainingseconds // 咨询剩余时间（单位秒）
          };
          sessionStorage.setItem('consultData', JSON.stringify(consultData));
          _this.intoInquiry(returnData.groupid);
        }
      });
    },
    // 去咨询
    intoInquiry: function (groupid) {
      // 发送自定义消息
      // 定义消息类型
      let messageName = 'UnknownMessage'; // 消息名称。
      let objectName = 'app:patientMessage'; // 消息内置名称，请按照此格式命名。
      let mesasgeTag = new RongIMLib.MessageTag(true, true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
      let prototypes = ['content']; // 消息类中的属性名。
      RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);
      // 发送自定义消息
      let conversationType = RongIMLib.ConversationType.GROUP; //单聊,其他会话选择相应的消息类型即可。
      let targetId = groupid; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
      let _gender = Number(this.user.gender) === 1 ? '男' : '女';
      let _title = this.user.name + '  ' + _gender + '  ' + this.user.age + '岁';
      let data = { title: _title, diease: this.user.description };
      data = JSON.stringify(data);
      let msg = new RongIMClient.RegisterMessage.UnknownMessage({ content: data });
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          console.info('发送成功!');
        },
        onError: function (errorCode) {
          console.info('发送失败!');
        }
      });
      window.location.replace('/inquiry/doing');
    },
    // 医生详情
    doctorDetail(id) {
      let doctorId = id;
      let userId = this.loginUser.userid;
      let userName = this.loginUser.nickname;
      let userAvatar = this.loginUser.photopath;
      let memberid = this.user.memberid; // 就诊人ID
      let description = this.user.description; // 病情描述
      let name = this.user.name; // 就诊人姓名
      let gender = this.user.gender; // 就诊人性别
      let age = this.user.age; // 就诊人年龄
      let mobile = this.user.telephone; // 就诊人手机号
      window.location.href = `/doctorDetail?doctorid=${doctorId}&user_id=${userId}&username=${userName}&avatar=${userAvatar}&memberid=${memberid}&description=${description}&name=${name}&gender=${gender}&age=${age}&mobile=${mobile}`;
    }
  }
};
</script>
<style lang="less" scoped>
  @import "style/inquiry";
  .doctor-list {
    min-height: 100%;
    background: #efeff4;
    padding: 74px 12px 40px;
    .header {
      top: 0;
    }
    .doctor-total {
      text-align: center;
      padding: 10px 0;
      font-size: 13px;
      color: #666;
    }
    .doctor-item {
      display: flex;
      background: #fff;
      margin-bottom: 10px;
      padding: 15px 12px;
      border-radius: 4px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .detail {
        flex: 1;
        p {
          margin: 5px 0;
        }
        .info {
          font-size: 15px;
          color: #333;
          overflow: hidden;
          .name {
            font-size: 18px;
            color: #000;
            margin-right: 15px;
          }
          .btn {
            color: @inquiryMainColor;
            border: solid 1px @inquiryMainColor;
            border-radius: 3px;
            float: right;
            font-size: 14px;
            width: 64px;
            height: 26px;
            line-height: 26px;
            text-align: center;
          }
        }
        .comment-consult {
          font-size: 13px;
          color: #999;
          span {
            color: @inquiryMainColor;
          }
          .icon {
            width: 13px;
            vertical-align: middle;
            margin-top: -3px;
            margin-right: 3px;
            &.margin {
              margin-left: 10px;
            }
          }
        }
        .expert {
          color: #666;
          font-size: 14px;
          text-align: justify;
          .multi-text-overflow(3);
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 14px;
      color: #999;
      line-height: 40px;
      background: #efeff4;
    }
  }
</style>


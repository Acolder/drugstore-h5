<template>
  <div class="container">
    <div class="bg"></div>
    <div class="main">
      <div class="article">
        <h2>
          自从使用了杏林圣手以后，我逐渐被患者所熟知了，随时随地都可以&nbsp;(在线)&nbsp;给病人开具处方，还可以随时接收处方反馈推荐你也试试.
        </h2>
        <div class="thumb clearfix">
          <img :src="docAtavar" :onerror="defaultAtavar" />
          <h2 class="thumb-intro">邀请人：<span>{{ docName }}</span></h2>
        </div>
        <!--<h2 class="intro"><img src="./img/ico.png"/>注册认证成功便可获得首单优惠100元奖励.</h2>-->
      </div>
      <div class="content">
        <div class="content-bg">
          <div class="content-title">
            填写您的手机号码，来杏林圣手！坐诊吧!
          </div>
          <div class="cell">
            <div class="cell-hd">
              <span>*</span>姓名
            </div>
            <div class="cell-bd">
              <input type="text" v-model="username" placeholder="请输入姓名" />
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <span>*</span>所属系统
            </div>
            <div class="cell-bd select-bd">
              <select class="cell-select" v-model="systemSelect" :class="{ selected: systemChange }" @change="systemChange = selectChange(systemChange)">
                <option value="" disabled="disabled" selected="selected">请选择所属系统</option>
                <option v-for="sys in system" :key="sys.id" :value="sys">{{ sys.hosName }}</option>
              </select>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <span>*</span>职称
            </div>
            <div class="cell-bd select-bd">
              <select class="cell-select" v-model="titleSelect" :class="{ selected: titleChange }" @change="titleChange = selectChange(titleChange)">
                <option value="" disabled="disabled" selected="selected">请选择职称</option>
                <option v-for="title in jobTitle" :key="title.titleId" :value="title.titleId">{{ title.titleName }}</option>
              </select>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <span>*</span>性别
            </div>
            <div class="cell-bd select-bd">
              <select class="cell-select" v-model="sex" :class="{ selected: sexChange }" @change="sexChange = selectChange(sexChange)">
                <option value="" disabled="disabled" selected="selected">请选择性别</option>
                <option value="1">男</option>
                <option value="0">女</option>
              </select>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <span>*</span>手机号
            </div>
            <div class="cell-bd">
              <input type="tel" maxlength="11" v-model="telephone" placeholder="请输入11位手机号码" />
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <span>*</span>密码
            </div>
            <div class="cell-bd">
              <input type="password" maxlength="20" v-model="password" placeholder="请输入密码（不少于6位）" />
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <span>*</span>验证码
            </div>
            <div class="cell-bd">
              <input class="vcode-input" type="tel" v-model="verCode" placeholder="请输入验证码" />
            </div>
            <div id="weui_code_margin">
              <mt-button type="primary" size="small" class="vcode" :class="{ vcodeBg: sendingCode }" @click="getCode">{{ codeBtnText }}</mt-button>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              药师资格证
            </div>
            <div class="cell-bd">
              <span class="cell-bd-tips">(图片需包含身份证和执业药师证号)</span>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label style="width: 65px;"></label>
            </div>
            <div class="cell-bd cell-primary">
              <upload-img @uploadSuccess="uploadImg" @removeImg="removeImg"></upload-img>
            </div>
          </div>
          <div class="cell">
            <mt-button type="primary" size="large" class="submitBtn" @click="submit">提交</mt-button>
          </div>
        </div>
      </div>
      <!--提示下载页面-->
      <div class="download-mask" v-show="downloadShow">
        <div class="mask-bg" @click="downloadHide"></div>
        <div class="mask-body">
          <!--<div class="close-mask">-->
            <!--<img src="./img/close.png"/>-->
          <!--</div>-->
          <div class="mask-text">
            您已注册完成杏林圣手账户<br />点击下方按钮马上下载
          </div>
          <div class="mask-tips">
            <img class="download-tips" src="./img/download.png"/>
          </div>
          <a :href="appUrl" class="mask-down">去下载</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Toast } from 'mint-ui';
import docAjax from '@/utils/doctorAjax';
import { getQueryString } from '@/utils/index';
import { validatPhone } from '@/utils/validate';
import { hex_md5 } from '@/utils/md5';
import uploadImg from './upload/uploadImg';
export default {
  name: 'druggistInvite',
  data() {
    return {
      docUserId: '', // 推荐药师Id
      docName: '', // 推荐药师姓名
      docAtavar: '', // 推荐药师头像
      defaultAtavar: 'this.src="' + require('./img/thumb.jpg') + '"', // 推荐药师默认头像
      username: '', // 姓名
      system: [], // 所属系统
      jobTitle: [], // 职称
      systemSelect: '', // 所属系统默认选项
      titleSelect: '', // 职称默认选项
      sex: '', // 性别
      systemChange: false, // 所属系统选项改变
      titleChange: false, // 职称选项改变
      sexChange: false, // 性别选项改变
      telephone: '', // 手机号
      password: '', // 密码
      verCode: '', // 验证码
      codeBtnText: '获取验证码', // 验证码按钮文本
      sendingCode: false, // 验证码发送中
      downloadShow: false, // 是否显示下载页
      countDownTimes: 60, // 倒计时
      appUrl: 'https://itunes.apple.com/cn/app/id1393924574?mt=8', // app下载地址 默认ios端
      imgUrl: '' // 上传图片(执业医师证)
    };
  },
  components: {
    'mt-button': Button,
    'upload-img': uploadImg
  },
  created() {
    document.title = '杏林圣手邀请函';
  },
  mounted() {
    // 获取推荐药师个人信息
    this.getDocInfo();
    // 获取机构
    this.getDocAffiInfoList();
    // 获取职称
    this.getDocTitleInfo();
    // 检测手机终端
    this.checkMobileAgent();
  },
  methods: {
    // 检测手机终端
    checkMobileAgent() {
      let _this = this;
      let isAndroid = _this.isAndroid();
      if (isAndroid) {
        _this.appUrl = 'http://app.hicloud.com/app/C100322009';
      }
    },
    // 是否安卓终端
    isAndroid() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
      if (isAndroid) {
        return true;
      }
      return false;
    },
    // 获取推荐药师个人信息
    getDocInfo() {
      let _this = this;
      let userId = getQueryString('userId');
      docAjax.get(`/api/doctor/getDoctorInfo/${userId}`).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          _this.docName = resp.data.data.real_name;
          _this.docAtavar = resp.data.data.avatar;
          _this.docUserId = resp.data.data.user_id;
        } else {
          Toast(resp.data.message);
        }
      });
    },
    // 获取机构
    getDocAffiInfoList() {
      let _this = this;
      let type = 1; // 0：医院  1：药师
      docAjax.get(`/api/doctor/geHospitalList/${type}`).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          let respData = resp.data.data;
          respData.forEach(value => {
            _this.system.push({
              id: value.id,
              hosName: value.hos_name
            });
          });
        } else {
          Toast(resp.data.message);
        }
      });
    },
    // 获取职称
    getDocTitleInfo() {
      let _this = this;
      let type = 1; // 职称类型 0-医师 ，1-药师
      docAjax.get(`/api/doctor/getTitleList/${type}`).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          let respData = resp.data.data;
          respData.forEach(value => {
            _this.jobTitle.push({
              titleId: value.title_id,
              titleName: value.title_name
            });
          });
        } else {
          Toast(resp.data.message);
        }
      });
    },
    // 获取验证码
    getCode() {
      let _this = this;
      if (_this.sendingCode) {
        console.log('发送中');
        return false;
      }
      let mobile = _this.trim(_this.telephone);
      let valid = 1; // 0-发送短信 1-注册 2-忘记密码 3-修改手机号
      if (mobile.length === 0) {
        Toast('手机号不能为空！');
        return false;
      }
      if (!validatPhone(mobile)) {
        Toast('请输入正确手机号码！');
        return false;
      }
      docAjax.get(`/api/system/SendVerifyCode/${mobile}/${valid}`).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          _this.sendingCode = true;
          _this.countDown(_this.countDownTimes);
        } else {
          Toast(resp.data.message);
        }
      });
    },
    // 倒计时
    countDown(value) {
      let _this = this;
      let seconds = value;
      _this.codeBtnText = `${seconds} s`;
      // console.log(seconds);
      let timeout = setTimeout(() => {
        if (seconds > 0) {
          seconds--;
          _this.countDown(seconds);
        } else {
          _this.sendingCode = false;
          _this.codeBtnText = `获取验证码`;
          clearTimeout(timeout);
        }
      }, 1000);
    },
    // 下拉框选项改变
    selectChange(flag) {
      let change = flag;
      if (!change) {
        change = !change;
      }
      return change;
    },
    // 关闭下载页
    downloadHide() {
      // this.downloadShow = false;
    },
    // 上传图片
    uploadImg(url) {
      this.imgUrl = url;
      console.log('upload success');
      console.log(this.imgUrl);
    },
    // 删除图片
    removeImg(url) {
      console.log('delete success');
      this.imgUrl = url;
    },
    // 去除字符串左右两边空格
    trim(value) {
      return value.replace(/(^\s*)|(\s*$)/g, '');
    },
    // 提交
    submit() {
      let _this = this;
      _this.username = _this.trim(_this.username);
      _this.telephone = _this.trim(_this.telephone);
      _this.password = _this.trim(_this.password);
      _this.verCode = _this.trim(_this.verCode);
      if (_this.username.length === 0) {
        Toast('请输入姓名');
        return false;
      }
      if (_this.systemSelect.length === 0) {
        Toast('请选择所属系统！');
        return false;
      }
      if (_this.titleSelect.length === 0) {
        Toast('请选择职称！');
        return false;
      }
      if (_this.sex.length === 0) {
        Toast('请选择性别！');
        return false;
      }
      if (_this.telephone.length === 0) {
        Toast('手机号不能为空！');
        return false;
      }
      if (!validatPhone(_this.telephone)) {
        Toast('请输入正确手机号码！');
        return false;
      }
      if (_this.password.length === 0) {
        Toast('密码不能为空！');
        return false;
      }
      if (_this.verCode.length === 0) {
        Toast('请输入验证码！');
        return false;
      }
      _this.toSubmit();
    },
    toSubmit() {
      let _this = this;
      let submitPassword = hex_md5(_this.password).toUpperCase();
      let data = {
        Mobile: _this.telephone, // 手机号
        Password: submitPassword, // 密码
        VerifyCode: _this.verCode, // 验证码
        DoctorType: 1, // 医生类型 0-医师 1-药师
        real_name: _this.username, // 姓名
        refer_hos_name: _this.systemSelect.hosName, // 所属医院名称（系统名称）
        hos_id: _this.systemSelect.id, // 所属医院id（系统id）
        depart_id: '', // 科室id
        title_id: _this.titleSelect, // 职称Id
        doctor_inviter_id: _this.docUserId, // 推荐药师id
        gender: _this.sex, // 性别
        practiceCertificate: _this.imgUrl // 执业证书 多张图片英文逗号(,)分开
      };
      docAjax.post('/api/doctor/inviteDoctorRegister', data).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          _this.downloadShow = true;
        } else {
          Toast(resp.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
  @import '../../../styles/mixin.less';
  .container {
    position: absolute;
    width: 100%;
    .bg {
      position: fixed;
      width: 100%;
      height: 100%;
      background: url("./img/bg.jpg") top center no-repeat;
      background-size: 100% 100%;
      z-index: 1;
    }
    .main {
      position: relative;
      width: 100%;
      background: transparent;
      z-index: 3;
    }
    .article {
      color: #000;
      text-align: justify;
      padding: 20px 10px 5px 10px;
      h2 {
        line-height: 26px;
        font-size: 15px;
      }
      .thumb {
        width: 100%;
        text-align: left;
        margin: 10px 0 20px 0;
        img {
          width: 18%;
          height: auto;
          border-radius: 50%;
          overflow: hidden;
          float: left;
        }
        .thumb-intro {
          text-align: left;
          float: left;
          margin-top: 20px;
          margin-left: 10px;
        }
      }
      .intro {
        color: #e34c32;
        text-align: center;
        img {
          width: 22px;
          vertical-align: middle;
          margin-top: -5px;
          margin-right: 3px;
        }
      }
    }
    .content {
      margin: 0 10px;
      height: auto;
      background: #ffffff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      overflow: hidden;
      font-size: 15px;
      padding-bottom: 15%;
      .content-bg {
        position: relative;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow: hidden;
        height: 100%;
        background-color: #fff;
        padding: 0 12px;
      }
      .content-title {
        text-align: center;
        padding-top: 30px;
        padding-bottom: 10px;
        font-size: 14px;
      }
      .cell {
        display: flex;
        margin: 8px 0;
        font-size: 16px;
        .cell-hd {
          width: 80px;
          height: 40px;
          line-height: 40px;
          text-align: right;
          margin-right: 10px;
          display: inline-block;
          span {
            color: #e34c32;
            font-size: 20px;
            vertical-align: middle;
          }
        }
        .cell-bd {
          flex: 1;
          display: inline-block;
          input {
            width: 100%;
            font-size: 15px;
            background: #ebedf0;
            border: 0;
            outline: 0;
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
          }
          select {
            width: 100%;
            font-size: 15px;
            background: #ebedf0;
            border: 0;
            outline: 0;
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            -webkit-appearance: none;
            color: #9e9e9e;
            &.selected {
              color: #000;
            }
            option {
              color: #000;
            }
          }
          &.select-bd {
            position: relative;
            &:after {
              content: ' ';
              position: absolute;
              right: 10px;
              top: 50%;
              margin-top: -4px;
              .turn-icon(#afafaf,8px,-135deg);
            }
          }
          .cell-bd-tips {
            font-size: 14px;
            color: #888e99;
            line-height: 40px;
          }
        }
        .vcode {
          min-width: 89px;
          height: 40px;
          color: #ffffff;
          background: url("./img/getMaskBg.png") center center no-repeat;
          background-size: 100% 100%;
          font-size: 13px;
          margin-left: 5px;
          &.vcodeBg {
            background: #999;
          }
        }
        .submitBtn {
          background: url("./img/getMaskBg.png") center center no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .download-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      .mask-bg {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
      }
      .mask-body {
        position: absolute;
        top: 50%;
        left: 10%;
        margin-top: -150px;
        width: 80%;
        height: 200px;
        background: #fff;
        border-radius: 10px;
        /*.close-mask {
          position: absolute;
          top: -15px;
          right: -10px;
          width: 30px;
          img {
            width: 100%;
            height: 100%;
          }
        }*/
        .mask-text {
          width: 100%;
          text-align: center;
          padding-top: 20px;
          font-size: 18px;
          line-height: 1.5;
        }
        .mask-tips {
          text-align: center;
          padding: 10px 0;
        }
        .download-tips {
          width: 30px;
        }
        .mask-down {
          width: 90%;
          height: 40px;
          line-height: 40px;
          margin: 0 5%;
          text-align: center;
          display: block;
          background: url("./img/btnBg.png") center center no-repeat;
          background-size: 100% 100%;
          border-radius: 5px;
          color: #fff;
          font-size: 18px;
        }
      }
    }
  }
</style>

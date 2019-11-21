<template>
  <div class="has-header info-page">
    <mt-header fixed title="患者信息登记">
      <!-- <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a> -->
    </mt-header>
    <!-- 填写信息页 start-->
    <div class="submit-info-page" v-if="submitInfoPage">
      <img src="./img/xh_home_bg.png" class="top-img" />
      <div class="submit-box">
        <label class="s-tlt">请填写以下患者信息</label>
        <div class="display-box box">
          <img src="./img/xh_home_user.png" class="icon" />
          <input class="box-flex input-field" placeholder="请输入姓名" v-model.trim="userName" />
        </div>
        <div class="display-box box">
          <img src="./img/xh_home_phone.png" class="icon" />
          <input class="box-flex  input-field" placeholder="请输入手机号" v-model.trim="userPhone" />
        </div>
        <div class="display-box box">
          <img src="./img/xh_home_code.png" class="icon" />
          <input class="box-flex  input-field" placeholder="请输入验证码" v-model.trim="phoneCode" />
          <div class="send-code-txt" @click="sendImgCode">{{sendCodeTxt}}</div>
        </div>
        <div class="display-box box">
          <img src="./img/xh_home_age.png" class="icon" />
          <input class="box-flex  input-field" placeholder="请输入年龄" v-model.trim="userAge" @input="inputAge" />
        </div>
        <div class="display-box box">
          <img src="./img/xh_home_sex.png" class="icon" />
          <label class="sex-btn" :class="{'on': userSex === 1}" @click="chooseSex(1)">男</label>
          <label class="sex-btn" :class="{'on': userSex === 0}" @click="chooseSex(0)">女</label>
        </div>
      </div>
      <div class="submit-btn" @click="submitInfo">提交</div>
    </div>
    <!-- 填写信息页 end-->
    <!-- 信息展示页 start -->
    <div class="info-show-page" v-if="infoShowPage">
      <img src="./img/xh_icon_success.png" class="success-icon" />
      <label class="info-tlt">信息登记成功, 并成功关注{{doctorName}}医生</label>
      <div @click="goConsult" class="consult-btn">进入医生咨询</div>
      <div class="hint-box">
        <label class="hint-tlt">使用说明</label>
        <p class="hint-txt">1.查看医生开的处方，点击公众号底部菜单“处方订单”，进入处方订单页面，查看医生处方、付款购买处方内药品。</p>
        <img src="./img/dc_use_picture.png" class="hint-img" />
        <p class="hint-txt">2.购买处方后，去指定药柜取药，点击订单详情的“步行导航”按钮，可查看药柜步行路线。</p>
        <img src="./img/kf_use_picture.png" class="hint-img" />
        <div class="info-box">
          <span class="display-box name-box">
            <label class="txt">姓名: </label>
            <label class="box-flex info">{{userName}}</label>
          </span>
          <span class="display-box">
            <label class="txt">手机号: </label>
            <label class="box-flex info">{{userPhone}}</label>
          </span>
        </div>
      </div>
    </div>
    <!-- 信息展示页 end -->
    <!-- 验证码弹窗 start -->
    <div class="mask" v-if="showMask">
      <div class="imgCode-form">
        <div class="imgCode-form-row">
          <label for="imgcode">图片验证码</label>
          <input type="text" class="input-imgCode" name="imgcode" v-model="imgCode">
          <img :src="imgCodeUrl" alt="" class="img-imgCode" @click.stop="refreshImgCode">
        </div>
        <div class="imgCode-form-row button-wrapper">
          <button class="cancel-send" @click.stop="cancel">取消</button>
          <button class="confirm-send" @click.stop="sendCode">发送</button>
        </div>
      </div>
    </div>
    <!-- 验证码弹窗 end -->
  </div>
</template>
<script>
// import { setToken } from '@/utils/auth';
import { Toast } from 'mint-ui';
import ajax from '@/utils/ajax';
// import wxjs from '@/utils/wxjsInterface';
// import { getQueryString } from '@/utils/index';
import { weixinLogin } from '@/api/user';
import { wxConsultDoctor } from '@/api/wxConsultDoctor';
export default {
  data() {
    return {
      submitInfoPage: false,
      infoShowPage: false,
      unionId: '',
      doctorId: '',
      userName: '',
      userPhone: '',
      phoneCode: '',
      userAge: '',
      userSex: 1,
      sendCodeTxt: '获取验证码',
      getCodeFlg: true,
      refreshFlg: true,
      sendCodeFlg: true,
      imgCode: '',
      imgCodeUrl: '',
      saveFlg: true,
      showMask: false,
      // 医生姓名
      doctorName: '',
    };
  },
  mounted() {
    this.getInit();
    // this.getInfo();
  },
  methods: {
    getInit() {
      let doctorInfo = JSON.parse(sessionStorage.getItem('wxDoctorInfo'));
      if (doctorInfo) {
        this.unionId = doctorInfo.unionId;
        this.doctorId = doctorInfo.doctorId;
        this.doctorName = doctorInfo.doctorName;
        this.avatar = doctorInfo.avatar;
        this.getInfo();
      }
    },
    getInfo() {
      // let wxDoctorInfo = {
      //   openId: 'odFwS1ouU2sW05NqNnNHSjQZ4YNY',
      //   doctorId: '11363',
      //   doctorName: '测试七七医生',
      //   avatar: 'https://uploads.kangmei.com.cn/Files/20181029/hfa4clly.hbt.png'
      // };
      // console.log(wxDoctorInfo);
      // sessionStorage.setItem('wxDoctorInfo', JSON.stringify(wxDoctorInfo));
      // let doctorInfo = JSON.parse(sessionStorage.getItem('wxDoctorInfo'));
      // if (doctorInfo) {
      //   this.unionId = doctorInfo.openId;
      //   this.doctorId = doctorInfo.doctorId;
      //   this.doctorName = doctorInfo.doctorName;
      //   this.avatar = doctorInfo.avatar;
      // }
      // weixinLogin(this.unionId).then(() => {
      //   Indicator.close();
      //   // this.getInfo();
      // });
      ajax.post('/api/user/isregister', {
        unionId: this.unionId,
        doctorId: this.doctorId
      }).then((res) => {
        if (res.status === 200) {
          let resCode = res.data.code;
          let resData = res.data.data;
          if (resCode === 0 && resData) {
            console.log(res);
            // Indicator.close();
            this.userName = resData.realname;
            this.userPhone = resData.mobile;
            this.infoShowPage = true;
          }
          else if (resCode === -2) {
            this.submitInfoPage = true;
          }
        }
      });
    },
    // 咨询医生
    goConsult() {
      wxConsultDoctor(this.unionId, this.doctorId, this.doctorName, this.avatar);
    },
    // 验证手机
    phoneReg() {
      let regPhone = new RegExp('^(1[3-9])\\d{9}$');
      if (this.userPhone === '') {
        Toast('请输入手机号');
        return false;
      }
      if (!regPhone.test(this.userPhone)) {
        Toast('请填写有效手机号码');
        return false;
      }
      return true;
    },
    // 获取图形验证码方法
    getImgCode() {
      return new Promise((resolve, reject) => {
        ajax.get(`/api/system/getImageVerify/86${this.userPhone}`).then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              resolve(res.data.data);
            }
          }
        });
      });
    },
    // 获取图形验证码
    sendImgCode() {
      if (!this.phoneReg()) {
        return false;
      }
      if (!this.getCodeFlg) {
        return false;
      }
      this.getCodeFlg = false;
      this.imgCode = '';
      this.getImgCode().then(res => {
        this.imgCodeUrl = `data:image/png;base64,${res}`;
        this.showMask = true;
      });
    },
    // 刷新图形验证码
    refreshImgCode() {
      if (!this.refreshFlg) {
        return false;
      }
      this.refreshFlg = false;
      this.getImgCode().then(res => {
        this.refreshFlg = true;
        this.imgCodeUrl = `data:image/png;base64,${res}`;
      });
    },
    cancel() {
      this.showMask = false;
      this.getCodeFlg = true;
    },
    // 发送验证码
    sendCode() {
      if (this.imgCode === '') {
        Toast('请输入图形验证码');
        return false;
      }
      if (!this.sendCodeFlg) {
        return false;
      }
      this.sendCodeFlg = false;
      ajax.post('/api/system/v2/sendVerifyCode', {
        Code: '86',
        Mobile: this.userPhone,
        Valid: '0',
        VerifyCode: this.imgCode
      }).then((res) => {
        this.sendCodeFlg = true;
        if (res.status === 200) {
          if (res.data.code === 0) {
            console.log(res);
            this.showMask = false;
            this.countDown();
          }
        }
      });
    },
    // 验证码倒计时
    countDown() {
      let timeTxt = 120;
      let tDown = setInterval(() => {
        if (timeTxt <= 1) {
          clearInterval(tDown);
          this.sendCodeTxt = '重新发送';
          this.getCodeFlg = true;
        }
        else {
          timeTxt--;
          this.sendCodeTxt = `${timeTxt}s`;
        }
      }, 1000);
    },
    // 输入年龄
    inputAge(e) {
      let val = e.target.value;
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.userAge = val;
        console.log(88);
      }
      else {
        this.userAge = this.userAge.replace(/[0]|\D/g, '');
      }
    },
    // 选择性别
    chooseSex(sex) {
      this.userSex = sex;
    },
    // 提交保存
    submitInfo() {
      if (this.userName === '') {
        Toast('请输入姓名');
        return false;
      }
      if (!this.phoneReg()) {
        return false;
      }
      if (this.phoneCode === '') {
        Toast('请输入验证码');
        return false;
      }
      if (this.userAge === '') {
        Toast('请输入年龄');
        return false;
      }
      if (!this.saveFlg) {
        return false;
      }
      this.saveFlg = false;
      ajax.post('/api/user/wxRegister', {
        NickName: this.userName,
        Mobile: this.userPhone,
        Age: Number(this.userAge),
        Gender: this.userSex,
        VerifyCode: this.phoneCode,
        DoctorId: this.doctorId,
        Weixin_UnionId: this.unionId,
      }).then((res) => {
        this.saveFlg = true;
        console.log(res);
        if (res.status === 200) {
          if (res.data.code === 0) {
            console.log(res);
            this.submitInfoPage = false;
            this.infoShowPage = true;
            // 登录药葫芦
            if (this.unionId) {
              weixinLogin(this.unionId).then(() => {});
            }
          }
        }
      });
    }
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';
@grass-green: #edfcfd;
@shadow: 0px 0px 25px -3px #abe8ea;
.info-page{
  min-height: 100%;
  background: @grass-green;
}
.submit-info-page{
  // background: url('./img/xh_home_bg.png') ;
  // background-size: 100% 100%;
  .top-img{
    width: 100%;
    // height: 190px;
    margin-top: -77px;
  }
  .submit-box{
    position: relative;
    width: calc(100% - 20px);
    padding: 40px 20px 0;
    margin: -56px auto 0;
    border-radius: 6px;
    background: @white-color;
    box-shadow: @shadow;
    .s-tlt{
      position: absolute;
      top: -21px;
      left: 50%;
      width: 220px;
      height: 42px;
      line-height: 42px;
      background: url('./img/xh_home_title.png');
      background-size: 100% 100%;
      font-size: 18px;
      color: @white-color;
      text-align: center;
      transform: translateX(-50%);
    }
    .box{
      width: 100%;
      height: 56px;
      padding: 0 11px;
      border-bottom: @border-line;
      font-size: 15px;
      align-items: center;
      .icon{
        display: inline-block;
        width: 15px;
        margin-right: 12px;
      }
      .input-field{
        width: 0;
        padding-right: 10px;
        border: none;
        font-size: 15px;
      }
      .send-code-txt{
        color: @green-color;
      }
      .sex-btn {
        .radius-btn(28px, 18px, 4px, 15px);
        margin-right: 28px;
        background: #ededed;
        color: #666;
      }
      .sex-btn.on {
        background: @green-color;
        color: #fff;
      }
    }
    .box:last-child {
      border-bottom: none;
    }
  }
  .submit-btn{
    width: calc(100% - 20px);
    margin: 60px auto 0;
    .background-radius-btn(40px ,0, @green-color, 4px, 18px);
    display: block;
  }
}
.info-show-page{
  padding: 0 12px 28px;
  .success-icon{
    display: block;
    width: 82px;
    height: 82px;
    margin: 25px auto 18px;
  }
  .info-tlt{
    display: block;
    padding: 0 12px;
    line-height: 28px;
    font-size: 17px;
    text-align: center;
  }
  .consult-btn{
    .border-radius-btn(36px, 0, @green-color, 5px, 15px);
    display: block;
    width: 116px;
    margin: 25px auto 0;
  }
  .hint-box{
    position: relative;
    width: 100%;
    padding: 45px 15px 0;
    margin-top: 88px;
    border-radius: 6px;
    background: @white-color;
    box-shadow: @shadow;
    .hint-tlt{
      display: inline-block;
      margin-bottom: 15px;
      font-size: 19px;
      font-weight: bold;
    }
    .hint-txt{
      line-height: 24px;
      font-size: 17px;
      word-break: break-all;
    }
    .hint-img{
      display: block;
      width: 90%;
      margin: 25px auto;
    }
  }
  .info-box{
    position: absolute;
    top: -60px;
    left: 50%;
    width: calc(100% - 60px);
    padding: 16px 10px;
    border-radius: 6px;
    background: @grass-green;
    font-size: 18px;
    box-shadow: @shadow;
    transform: translateX(-50%);
    .txt{
      width: 39%;
      margin-right: 10px;
      text-align: right;
    }
    .name-box{
      margin-bottom: 12px;
      label {
        height: 20px;
        line-height: 20px;
        .info {
          overflow: hidden;
        }
      }
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .imgCode-form {
    padding: 20px 0;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 280px;
    background-color: #f8f8f8;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    .imgCode-form-row {
      display: flex;
      padding: 0 15px;
      input {
        flex: 1;
        padding: 0 5px;
        height: 30px;
        width: 100px;
        outline: none;
        -webkit-appearance: none;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #e0e0e0;
        border-right: 0;
        border-radius: 0;
      }
      label {
        flex: 0 0 1;
        display: inline-block;
        vertical-align: middle;
        line-height: 30px;
        width: 80px;
        font-size: 12px;
      }
      img {
        flex: 0 0 1;
        display: inline-block;
        vertical-align: middle;
        width: 60px;
        height: 30px;
        border: 1px solid #e0e0e0;
        background: #fff;
        outline: none;
        border-left: 0;
      }
      &.button-wrapper {
        justify-content: flex-end;
        .confirm-send {
          margin: 15px 0 0 15px;
          display: inline-block;
          width: 80px;
          height: 24px;
          line-height: 24px;
          background-color: @green-color;
          color: #fff;
          border-radius: 3px;
        }
        .cancel-send {
          margin: 15px 0 0 0;
          display: inline-block;
          width: 80px;
          height: 24px;
          line-height: 24px;
          background-color: #e3e3e3;
          color: @green-color;
          border-radius: 3px;
        }
      }
    }
  }
}

</style>

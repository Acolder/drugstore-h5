<template>
<div class="equipmentLogin">
  <mt-header title="用户登录">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="equipmentLoginMain">
    <div class="logo">
      <img src="./imgs/login.png" />
    </div>
    <div class="form-item">
      <input type="text" placeholder="请输入手机号" v-model="mobile">
      <div class="obtain" @click="obtain">{{sendcode_msg}}</div>
    </div>
    <div class="form-item">
      <input type="text" placeholder="请输入验证码" v-model="VerifyCode">
    </div>
    <div class="equipment-btn" @click="login">登录</div>
  </div>
  <!-- 图片验证码 -->
  <div class="mask" v-show="showMask">
    <div class="imgCode-form">
      <div class="imgCode-form-row input--wrapper">
        <label for="imgcode">图片验证码</label>
        <input type="text" class="input-imgCode" name="imgcode" v-model="imgcode">
        <img :src="codeImgUrl" alt="" class="img-imgCode" @click.stop="refreshImg()">
      </div>
      <div class="imgCode-form-row button-wrapper">
        <button class="cancel-send" @click.stop="cancel()">取消</button>
        <button class="confirm-send" @click.stop="send()">发送</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { setToken } from '@/utils/auth';
import { Toast } from 'mint-ui';
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      sendcode_msg: '获取验证码',
      // 图片验证码
      codeImgUrl: '',
      // 图片验证码弹窗
      showMask: false,
      // 图片验证码值
      imgcode: '',
      // 手机号码
      mobile: '',
      // 短信验证码
      VerifyCode: '',
      // 登录后的信息
      userInfo: {}
    };
  },
  methods: {
    // 获取图片验证码
    obtain() {
      this.imgcode = '';
      if (this.sendcode_msg === '获取验证码' || this.sendcode_msg === '重新发送') {
        console.log('获取图片验证码');
        let phone = '^(1[3-9])\\d{9}$';
        let reg = new RegExp(phone);
        if (!this.mobile || !reg.test(this.mobile)) {
          Toast({
            message: '请填写有效手机号码！',
            position: 'middle',
            duration: 500
          });
          return false;
        }
        ajax.get('/api/system/getImageVerify/' + this.mobile).then((res) => {
          console.log(res);
          if (res.data && res.data.code === 0) {
            Toast({
              message: res.data.message,
              position: 'middle',
              duration: 500
            });
            this.codeImgUrl = 'data:image/png;base64,' + res.data.data;
            this.showMask = true;
          } else {
            Toast({
              message: res.data.message,
              position: 'middle',
              duration: 500
            });
          }
        });
      }
    },
    // 刷新图片
    refreshImg() {
      ajax.get('/api/system/getImageVerify/' + this.mobile).then((res) => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          Toast({
            message: '刷新图片成功！',
            position: 'middle',
            duration: 500
          });
          this.codeImgUrl = 'data:image/png;base64,' + res.data.data;
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 500
          });
        }
      });
    },
    // 取消
    cancel() {
      Toast({
        message: '已取消！',
        position: 'middle',
        duration: 500
      });
      this.showMask = false;
      this.imgcode = '';
    },
    // 发送手机验证码
    send() {
      if (!this.imgcode) {
        Toast({
          message: '请输入图片验证码！',
          position: 'middle',
          duration: 500
        });
        return false;
      }
      if (this.imgcode) {
        ajax.get('/api/system/SendVerifyCode/' + this.mobile + '\/0\/' + this.imgcode).then((res) => {
          console.log(res);
          if (!res.data) {
            Toast({
              message: '发送失败！',
              position: 'middle',
              duration: 500
            });
            return;
          }
          if (res.data.code === 0) {
            Toast({
              message: res.data.message,
              position: 'middle',
              duration: 500
            });
            this.showMask = false;
            let duration = 120;
            this.sendcode_msg = duration + 's';
            let timer = setInterval(() => {
              duration--;
              this.sendcode_msg = duration + 's';
              if (duration === 0) {
                this.sendcode_msg = '重新发送';
                clearInterval(timer);
              }
            }, 1000);
          } else {
            Toast({
              message: res.data.message,
              position: 'middle',
              duration: 500
            });
          }
        }).catch(() => {
          Toast({
            message: '发送失败！',
            position: 'middle',
            duration: 500
          });
        });
      }
    },
    // 登录
    login() {
      if (!this.VerifyCode) {
        Toast({
          message: '请输入手机验证码！',
          position: 'middle',
          duration: 500
        });
        return false;
      }
      let data = {
        Mobile: this.mobile,
        VerifyCode: this.VerifyCode,
      };
      ajax.post(`/api/user/smslogin`, data).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 500
          });
          this.userInfo = res.data.data;
          console.log(this.userInfo);
          // 保存Token
          setToken(res.data.data.usertoken);
          // 保存userid 用来记录操作人
          let userid = res.data.data.userid;
          if (userid) {
            console.log(userid);
            sessionStorage.setItem('MyEquipmentId', userid);
          }
          // 保存名字 用来记录操作人
          let nickname = res.data.data.nickname;
          if (nickname) {
            console.log(nickname);
            sessionStorage.setItem('MyEquipmentName', nickname);
          }
          // 保存手机号码 用来记录操作人
          let mobile = res.data.data.mobile;
          if (mobile) {
            console.log(mobile);
            sessionStorage.setItem('MyEquipmentMobile', mobile);
          }
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 1500
          });
          this.$router.go(-1);
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 1500
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
@left-space: 80px;
@color: #000;
.line10{
  height: 10px;
  background: #eeeef3;
}
.line45{
  height: 45px;
  background: #eeeef3;
}
.equipmentLogin{
  padding-top: 0.1px;
  height: 100%;
  .equipmentLoginMain{
    margin-top: 44px;
    padding-top: 0.1px;
  }
  .logo {
    text-align: center;
    margin: 80px 0 70px;
    img {
      width: 85px;
      height: 85px;
    }
  }
  .form-item{
    height: 44px;
    padding: 0 10px;
    color: #333333;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  input{
    flex: 1;
    height: 100%;
    line-height: 100%;
    border: none;
  }
  .obtain{
    width: 96px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    border: solid 1px #0ccdd3;
    color: #0ccdd3;
  }
  .form-item-right{
    input{
      text-align: right;
    }
  }
  .equipment-btn{
    margin: 0 15px;
    margin-top: 25px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background: #0ccdd3;
  }
  // 图片验证码
  .mask {
    position: fixed;
    z-index: 10;
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
      .input--wrapper{
        margin-bottom: 20px;
      }
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
          width: 70px;
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
            display: inline-block;
            width: 80px;
            height: 24px;
            background-color: @green-color;
            color: #fff;
            border-radius: 3px;
            margin-left: 20px;
          }
          .cancel-send {
            display: inline-block;
            width: 80px;
            height: 24px;
            background-color: #e3e3e3;
            color: @green-color;
            border-radius: 3px;
          }
        }
      }
    }
  }
}
</style>
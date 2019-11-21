<template>
  <div class="bindPhone">
    <mt-header
      fixed
      title="手机号绑定"
    >
      <a
        slot="left"  @click="$router.go(-1);"
      >
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="backSpan">
      为了您的账号安全，请绑定手机号
    </div>
    <div class="row-wrapper field">
      <div class="countrySelect" @click="selectCountry">
        <div>国家/地区</div>
        <div class="country" v-if="area">{{area.country}} <i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
    <div class="row-wrapper phone field">
      <div class="box">
        <div class="areaNum" v-if="area">+{{area.code}} <i class="quit"></i></div>
        <input type="text" name="" v-model="Mobile" placeholder="请输入手机号" style="height: 20px">
      </div>
    </div>
    <div class="field verifycode">
      <label for="">验证码</label>
      <input type="text" name="" v-model="Verifycode" placeholder="请输入验证码">
      <span class="sendcode" @click="getVerifyCode(Mobile)" id="TencentCaptcha"
      >{{sendcode_msg}}</span>
      <!-- <slipping-code v-if="area" :mobile="Mobile" :code="area.code" :valid="'2'"></slipping-code> -->
    </div>
    <div v-show="registerShow">
      <div class="backSpan" style="margin-top: 0px;">
        该手机号码尚未注册，请设置登录密码
      </div>
      <div class="field">
        <!--<label for="">新密码</label>-->
        <input type="password" name="" v-model="NewPassword" placeholder="请输入密码">
      </div>
      <div class="field">
        <!--<label for="">新密码</label>-->
        <input type="password" name="" v-model="againPassword" placeholder="确认密码">
      </div>
    </div>
    <div class="btn-wrapper">
      <mt-button type="primary" size="large" @click.stop="submit()">提交绑定</mt-button>
    </div>
    <div class="subSpan">
      提交绑定，则视为同意
      <i @click="accept">《用户协议》</i>
    </div>
    <div class="mask" v-show="showMask">
      <div class="imgCode-form">
        <div class="imgCode-form-row">
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
    <!--用户协议组件-->
    <div class="userpro-wrapper" v-show="user">
      <user-protocol @handle='accept'></user-protocol>
    </div>
  </div>
</template>
<script>
import axois from '@/utils/ajax';
import { Toast } from 'mint-ui';
import slippingCode from '../registe/slippingCode.vue';
// 组件用户协议
import UserProtocol from '../registe/UserProtocol.vue';
import { mapActions, mapGetters } from 'vuex';
import { returnPage } from '@/api/user';
export default {
  data() {
    return {
      showMask: false,
      codeImgUrl: '',
      sendcode_msg: '点击发送',
      imgcode: '',
      Mobile: '',
      Verifycode: '',
      NewPassword: '',
      againPassword: '',
      area: { country: '中国大陆', code: '86' },
      user: false,
      registerShow: false
    };
  },
  computed: {
    ...mapGetters([
      'phone',
    ])
  },
  components: {
    'slipping-code': slippingCode,
    // 组件用户协议
    'user-protocol': UserProtocol,
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    // 查看用户协议
    accept() {
      this.user = !this.user;
    },
    selectCountry() {
      this.$router.push('selectCounty');
    },
    refreshImg() {
      axois.get('/api/system/getImageVerify/' + this.area.code + this.Mobile).then((res) => {
        if (res.data && res.data.code === 0) {
          this.codeImgUrl = 'data:image/png;base64,' + res.data.data;
        }
      });
    },
    getVerifyCode() {
      if (this.sendcode_msg !== '点击发送' && this.sendcode_msg !== '重新发送') {
        return;
      }
      let phone = '^(1[3-9])\\d{9}$';
      let reg = new RegExp(phone);
      if (!this.Mobile || !reg.test(this.Mobile)) {
        Toast({
          message: '请填写有效手机号码！',
          position: 'middle',
          duration: 1500
        });
      } else {
        this.showMask = true;
        // 获取图片验证码
        this.refreshImg();
      }
    },
    send() {
      if (this.imgcode) {
        // 发送短信验证码
        axois.post('/api/system/v2/sendVerifyCode', {
          Code: this.area.code,
          Mobile: this.Mobile,
          Valid: 3,
          VerifyCode: this.imgcode
        }).then((res) => {
          if (!res.data) {
            Toast({
              message: '发送失败！',
              position: 'middle',
              duration: 1500
            });
            return;
          }
          if (res.data.code === 0) {
            console.log(res, '发短信验证码');
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
            // data=0 未注册；data=1;已注册
            if (res.data.data === 0) {
              this.registerShow = true;
            }
          } else {
            Toast({
              message: res.data.message,
              position: 'middle',
              duration: 1500
            });
            this.refreshImg();
          }
        }).catch(() => {
          Toast({
            message: '发送失败！',
            position: 'middle',
            duration: 1500
          });
        });
      }
    },
    cancel() {
      this.showMask = false;
      this.imgcode = '';
    },
    submit() {
      let phone = '^(1[3-9])\\d{9}$';
      let reg = new RegExp(phone);
      if (!this.Mobile || !reg.test(this.Mobile)) {
        Toast({
          message: '请填写有效手机号码！',
          position: 'middle',
          duration: 1500
        });
        return;
      }
      if (!this.Verifycode) {
        Toast({
          message: '请填写手机验证码！',
          position: 'middle',
          duration: 1500
        });
        return;
      }
      if (this.registerShow) {
        if (!this.NewPassword) {
          Toast({
            message: '请填写您的新密码！',
            position: 'middle',
            duration: 1500
          });
          return;
        }
        if (!this.againPassword) {
          Toast({
            message: '请填写您确认的密码！',
            position: 'middle',
            duration: 1500
          });
          return;
        }
        if (this.NewPassword !== this.againPassword) {
          Toast({
            message: '两次密码输入不一致！',
            position: 'middle',
            duration: 1500
          });
          return;
        }
      }
      let unionId = sessionStorage.getItem('unionId');
      let bindData = {
        LoginType: 'weixin',
        OpenId: unionId,
        Code: this.area.code,
        Mobile: this.Mobile,
        password: this.NewPassword,
        verifycode: this.Verifycode
      };
      console.log(bindData);
      axois.post('/api/user/externalLoginBind', bindData).then((res) => {
        console.log(res, '绑定手机号信息');
        if (res.data && res.data.code === 0) {
          console.log('绑定手机成功');
          // 绑定手机号成功，进行微信登录，返回以前页面
          let _self = this;
          console.log(unionId, 'unionId');
          _self.$store.dispatch('weixinLogin', unionId).then((res) => {
            if (res.data) {
              if (res.data.code === 0) {
                _self.getUserInfo().then(() => {
                  sessionStorage.setItem('MyEquipmentMobile', _self.phone);
                });
                returnPage();
              }
            }
          });
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 1500
          });
        }
      });
    }
  },
  mounted() {
    let area = localStorage.getItem('area');
    if (area) {
      this.area = JSON.parse(area);
    }
  }
};
</script>
<style lang="less" scoped>
  // @import '../findPassword/index.vue';
  @import '../../styles/mixin.less';
  .bindPhone{
    background:#eeeef3;
    width: 100%;
    height: 100%;
    padding-top: 40px;
    .backSpan{
      height: 50px;
      line-height:50px;
      font-size: 16px;
      color: #333333;
      margin-left: 10px;
    }
  }
  .subSpan{
    height: 50px;
    line-height:50px;
    font-size: 16px;
    color: #333333;
    margin-left: 20px;
    i{
      color: #0ccdd3;
    }
  }
  /*地区选择升级*/
  .btn-wrapper {
    margin-top: 25px;
    padding: 0 14px;
  }
  .field {
    display: flex;
    align-items: center;
    padding: 8px 14px;
    height: 44px;
    background: #ffffff;
    .border-1px(#e0e0e0);
    &.verifycode {
      position: relative;
      .sendcode {
        position: absolute;
        right: 8px;
        top: 7px;
        font-size: 10px;
        color: @green-color;
        height: 28px;
        line-height: 28px;
      }
    }
    label {
      flex: 0 0 1;
      width: 80px;
      font-size: 14px;
    }
    input {
      flex: 1;
      height: 28px;
      border: none;
      font-size: 14px;
      &::-webkit-input-placeholder {
        color: #888;
        font-size: 13px;
        line-height: 17px;
        font-family: '微软雅黑';
      }
      &::-moz-placeholder {
        font-size: 14px;
        font-family: '微软雅黑';
      }
      &:-ms-input-placeholder {
        color: #888;
        font-size: 14px;
        font-family: '微软雅黑';
      }
    }
  }
  .row-wrapper.phone{
    .box {
      display: flex;
      width: 100%;
      height: 50px;
      line-height: 52px;
      align-items: center;
    }
    .areaNum {
      font-size: 15px;
      line-height: 50px;
      height: 48px;
    }
    .quit{
      display: inline-block;
      position: relative;
      width: 1px;
      height: 10px;
      right: -2px;
      /* top: 50%; */
      background-color: #B9B9B9;
    }
    input {
      padding-left: 10px;
    }
  }
  .countrySelect{
    width: 100%;
    display: flex;
    font-size: 16px;
    justify-content: space-around;
    div {
      flex: 1;
    }
    .country{
      text-align: right;
      position: relative;
    }
  }
  /*验证码弹窗*/
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
          border-left: 0;
        }
        &.button-wrapper {
          justify-content: flex-end;
          .confirm-send {
            margin: 15px 0 0 15px;
            display: inline-block;
            width: 80px;
            height: 24px;
            background-color: @green-color;
            color: #fff;
            border-radius: 3px;
          }
          .cancel-send {
            margin: 15px 0 0 0;
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
</style>

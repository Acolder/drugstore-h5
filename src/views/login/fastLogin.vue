<template>
  <div class="page">
    <div class="login-form">
      <div class="cancel">
        <a @click="returnBack()">
          <img src="./imgs/clean.png" />
        </a>
      </div>
      <div class="logo">
        <img src="./imgs/icon_logo@3x.png" />
      </div>
      <div class="wxLogin" @click="wxLogin">
        <img src="./imgs/icon_wxx@3x.png" alt="">
        <span>微信快捷登录</span>
      </div>
      <div class="else">
        <div class="elseChoose">
          <i></i>
          <span>其他方式</span>
          <i></i>
        </div>
        <div class="elseBtn zh" @click="gozh">账号密码登录</div>
        <div class="elseBtn" @click="gozc">新用户注册</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import '../../styles/mixin.less';
  .page {
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
    position: relative;
  }

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    padding: 25px 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px;
    .cancel {
      height: 40px;
      width: 100%;
      a {
        padding-left: 16px;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
    .logo {
      text-align: center;
      margin: 20px 0 0;
      img {
        width: 85px;
        height: 85px;
      }
    }
    .wxLogin{
      margin-top:15%;
      margin-left: 3%;
      height:40px;
      width: 94%;
      background-color: #3db038;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      img{
        width:24px;
        height: 19px;
        margin-right: 12px;
      }
    }
    .else{
      width: 100%;
      margin-top: 35%;
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      text-align: center;
      .elseChoose{
        width:50%;
        color: #999999;
        display: flex;
        flex-direction:row;
        align-items: center;
        justify-content: space-between;
        i{
          width: 40px;
          height: 1px;
          background-color: #999999;
        }
      }
      .elseBtn{
        width:50%;
        height: 40px;
        border: 1px solid #0cd1d6;
        color: #0cd1d6;
        margin-top: 11px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
      }
      .elseBtn.zh{
        background: #0cd1d6;
        color: #ffffff;
        border: none;
        margin-top: 30px;
      }
    }
  }

</style>
<script>
// import { Toast } from 'mint-ui';
// import { Indicator } from 'mint-ui';
import wxjs from '@/utils/wxjsInterface';
export default {
  computed: {
  },
  methods: {
    returnBack() {
      this.$router.push('/home/index');
    },
    wxLogin: function () {
      // Indicator.open();
      let url = `${process.env.WEB_HOST}/wxLogin`;
      let link = wxjs.getOpenIdUrl(url);
      location.href = link;
    },
    gozh: function () {
      this.$router.push({ path: '/login' });
    },
    gozc: function () {
      this.$router.push({ path: '/registe' });
    }
  }
};
</script>

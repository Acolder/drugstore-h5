<template>
  <div id="about">
    <mt-header title="设置">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="content">
      <div class="logo">
        <img src="./img/icon_jktt_logo@2x.png" alt="">
        <span>版本号v1.4.0</span>
      </div>
      <router-link to="/aboutus/AccountManage"  v-if="userInfo">
        <div class="account">
          <img src="./img/icon-zhhl@3x.png" alt="">
          账号管理
        </div>
      </router-link>
      <router-link to="/aboutus/introduce">
        <div class="introduction">
          <img src="./img/icon_wywm@3x.png" alt="">
          关于我们
        </div>
      </router-link>
      <router-link to="/aboutus/userProtocol">
        <div class="agreement">
          <img src="./img/icon-yhxy@3x.png" alt="">
          用户协议
        </div>
      </router-link>
      <div class="login-out-box" v-if="userInfo">
        <label class="login-out" @click="logOut">退出登录</label>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Header, Button, Toast } from 'mint-ui';
import { getToken, removeToken } from '@/utils/auth';
export default {
  data() {
    return {
      userInfo: null
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button
  },
  created() {
    this.userInfo = getToken();
  },
  methods: {
    logOut() {
      removeToken();
      sessionStorage.clear();
      Toast('退出登录成功');
      this.$router.push({ path: '/myCenter/index' });
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.content{
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #efeef3;
}
.logo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 180px;
  img{
    border-radius: 13px;
    width: 77px;
    height: 77px;
  }
  span{
    line-height: 40px;
  }
}
.account{
  height: 50px;
  line-height: 50px;
  background: #fff;
  font-size: 18px;
  padding-left: 10px;
}
.introduction,.agreement{
  height: 50px;
  line-height: 50px;
  background: #fff;
  font-size: 18px;
  padding-left: 10px;
  margin-top: 10px;
}
.introduction,.agreement,.account{
  display: flex;
  align-items: center;
}
.account>img,.introduction>img,.agreement>img{
  width:19px;
  height: 19px;
  margin-right:10px;
}
.login-out-box{
  padding: 0 12px;
  margin-top: 40px;
  .login-out{
    width: 100%;
    .background-radius-btn(42px, 0, @green-color, 4px, 16px);
  }
}

</style>

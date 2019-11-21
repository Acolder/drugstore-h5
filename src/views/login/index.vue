<template>
  <div class="page">
    <div class="login-form">
      <div class="cancel">
        <a @click="returnBack()">
          <img src="./imgs/clean.png" />
        </a>
      </div>
      <div class="logo">
        <img src="./imgs/login.png" />
      </div>
      <div class="row-wrapper">
        <div class="countrySelect" @click="selectCountry">
          <div>国家/地区</div>
          <div class="country">{{area.country}} <i class="el-icon-arrow-right"></i></div>
        </div>
      </div>
      <div class="row-wrapper phone" >
        <div class="box">
          <div class="areaNum" >+{{area.code}} <i class="quit"></i></div>
          <input type="text" class="username" placeholder="手机号" name="username" v-model="username">
        </div>
      </div>
      <div class="row-wrapper">
        <!-- <label for="password">密码</label> -->
        <!-- <input type="password" class="password" placeholder="密码" v-model="password">
        <img src="./imgs/look.png" alt="" class="look"> -->
        <input type="text" class="password" v-model="password" placeholder="请输入密码" v-if="offOn">
        <input type="password" class="password" v-model="password" placeholder="请输入密码" v-else>
        <img src="./imgs/passwordOn.png" alt="" class="look" @click="on()" v-if="offOn">
        <img src="./imgs/passwordOff.png" alt="" class="look" @click="on()" v-else>
      </div>
      <div class="row-wrapper">
        <button type="button" class="submit" @click.stop="login()">登录</button>
      </div>
      <div class="registe-link">
        <router-link to="/registe" class="txt">注册账号</router-link>
        <i class="line">|</i>
        <router-link to="/findPassword" class="txt">忘记密码</router-link>
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
    margin: 35px 0 72px;
    img {
      width: 85px;
      height: 85px;
    }
  }
  .row-wrapper {
    padding: 0 5%;
    display: flex;
    height: 63px;
    line-height: 60px;
    position: relative;
    label {
      line-height: 30px;
      width: 60px;
      flex: 0 1 1;
    }
    input {
      height: 50px;
      color: #000;
      display: inline-block;
      flex: 1;
      background: #fff;
      border: none;
      border-radius: 2px;
      border-bottom: 1px solid #b9b9b9;
      font-size: 15px;
    }
     ::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: #c6c6cc;
    }
    .look {
      width: 23px;
      height: 14px;
      position: absolute;
      right: 24px;
      bottom: 30px;
    }
    button {
      display: block;
      width: 100%;
      height: 40px;
      text-align: center;
      background-color: @green-color;
      color: #fff;
      font-size: 18px;
      border-radius: 6px;
      margin-top: 20px;
    }
  }
  .registe-link {
    text-align: center;
    margin-top: 30px;
    .txt {
      color: @green-color;
    }
    .line {
      color: @green-color;
      margin: 0 14px;
    }
  }
}
/*地区选择升级*/
.row-wrapper.phone{
  .box {
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 52px;
    border-bottom: 1px solid #B9B9B9;
  }
  .areaNum {
    font-size: 15px;
    line-height: 50px;
    height: 50px;
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
  .username{
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
</style>
<script>
// import $ from '@/utils/ajax';
// import { setToken } from '@/utils/auth';
import { Toast } from 'mint-ui';
import { mapActions } from 'vuex';
import { returnPage } from '@/api/user';
export default {
  data() {
    return {
      username: '',
      password: '',
      offOn: false,
      area: { country: '中国大陆', code: '86' }
    };
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    selectCountry() {
      this.$router.push('selectCounty');
    },
    returnBack() {
      this.$router.push('/home/index');
    },
    login() {
      let _self = this;
      if (!_self.username) {
        Toast({
          message: '请填写手机号码！',
          position: 'middle',
          duration: 1500
        });
        return;
      }
      if (!_self.password) {
        Toast({
          message: '请填写密码！',
          position: 'middle',
          duration: 1500
        });
        return;
      }
      let params = {
        Mobile: _self.username,
        Password: _self.password
      };
      _self.$store.dispatch('UserLogin', { username: params.Mobile, password: params.Password }).then((res) => {
        // 保存登录人的手机号码 用来查询脉诊仪借还的列表数据
        let mobile = res.data.data.mobile;
        if (mobile) {
          sessionStorage.setItem('MyEquipmentMobile', mobile);
        }
        if (res.data && res.data.code === 0) {
          _self.getUserInfo();
          returnPage();
        }
      });
    },
    on() {
      if (this.offOn === true) {
        this.offOn = false;
      } else {
        this.offOn = true;
      }
    },
  },
  mounted() {
    let area = localStorage.getItem('area');
    if (area) {
      this.area = JSON.parse(area);
    }
  }
};

</script>

<template>
  <div class="popularize">
    <mt-header title="推广员注册"></mt-header>
    <div class="logo">
      <img src="./imgs/login.png" />
    </div>
    <div class="textInput">
      <!-- <label for="">姓名：</label> -->
      <input type="text" class="text" placeholder="请输入姓名" v-model="editData.spreadname">
    </div>
    <div class="textInput">
      <!-- <label for="">手机号：</label> -->
      <input type="text" class="text" placeholder="请输入手机号" v-model="editData.spreadphone">
    </div>
    <div class="buttonBox textInput">
        <button type="button" class="submit" @click="submit()">注 册</button>
      </div>
  </div>
</template>

<script>
import { Header, Button, Toast } from 'mint-ui';
import ajax from '@/utils/ajax.js';
export default {
  data() {
    return {
      editData: {
        spreadname: '',
        spreadphone: '',
        state: '1',
        openid: this.$route.query.openid
      },
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button,
  },
  methods: {
    submit() {
      // console.log(this.isvalidPhone(this.editData.spreadphone));
      if (this.isvalidPhone(this.editData.spreadphone) && this.editData.spreadname !== '') {
        ajax.post('/api/admin/SaveSpreadInfo', this.editData).then(res => {
          if (res.data.code === 0 && res.status === 200) {
            this.$router.push('/popularize/tips');
          } else {
            Toast({
              message: res.data.message,
              position: 'middle',
              duration: 1500
            });
          }
        });
      } else if (this.editData.spreadname === '') {
        Toast('请输入姓名');
      } else {
        Toast('请输入正确的手机号');
      }
    },
    // 手机号正则
    isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      return reg.test(str);
    },
  }
};
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
.popularize{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .logo{
    margin-top: 44px;
    text-align: center;
    img{
      width: 85px;
      height: 85px;
      margin: 35px 0 72px;
    }
  }
  .textInput{
    padding: 0 5%;
    display: flex;
    height: 63px;
    line-height: 60px;
    label{
      width: 80px;
    }
    .text{
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
  }
  .buttonBox{
    button{
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
}
</style>

<template>
  <div>
    <h1>userAgent:{{userAgent}}</h1>
    <button @click="redirect">跳转</button>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
export default {
  data() {
    return {
      userAgent: ''
    };
  },
  methods: {
    pageInit() {
      let ua = navigator.userAgent.toLowerCase();
      this.userAgent = ua;
    },
    redirect() {
      alert(1);
      wx.miniProgram.navigateTo({
        url: 'pages/userCenter/myCenter/index'
      });
    }
  },
  created() {
    this.pageInit();
    // if (ua.indexOf('micromessenger') > 0) { // 微信
    //   return true;
    // }
    // else {
    //   return false;
    // }
  }
};
</script>
<style lang="less" scoped>
</style>


<template>
  <div class="download-app" :class="{'download-video':isVideo}">
    <img class="logo" src="./img/icon_jktt_logo@2x.png"/>
    <div class="logo-detail">
      <span>药葫芦</span><br/>
      <em>药多多&nbsp;医多多&nbsp;健康多</em>
    </div>
    <a :href="appUrl"><img src="./img/icon_jktt_download@2x.png"/>立即下载</a>
  </div>
</template>
<script>
export default {
  name: 'shareHeader',
  data() {
    return {
      appUrl: 'https://itunes.apple.com/cn/app/id1395275648?mt=8', // app下载地址 默认ios
    };
  },
  props: {
    isVideo: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.checkMobileAgent();
  },
  methods: {
    // 检测手机终端
    checkMobileAgent() {
      let _this = this;
      let isAndroid = _this.isAndroid();
      if (isAndroid) {
        _this.appUrl = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.kmyy.intellpharmacy&fromcase=40003';
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
    }
  }
};
</script>

<style lang="less" scoped>
  .download-app {
    position: fixed;
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #666;
    padding: 0 12px;
    overflow: hidden;
    border-bottom: solid 1px #e0e0e0;
    background: #fff;
    z-index: 500;
    &.download-video {
      background: #3d3d3d;
      color: #eee;
    }
    .logo {
      max-width: 50px;
      max-height: 50px;
      width: 10%;
      vertical-align: middle;
    }
    .logo-detail {
      display: inline-block;
      line-height: 1.3;
      margin-left: 5px;
      vertical-align: middle;
      span {
        font-size: 16px;
        color: #0ccdd3;
      }
      em {}
    }
    a {
      width: 80px;
      height: 27px;
      float: right;
      font-size: 13px;
      color: #0ccdd3;
      border: solid 1px #0ccdd3;
      border-radius: 5px;
      line-height: 25px;
      text-align: center;
      margin-top: 17px;
      img {
        width: 13px;
        vertical-align: middle;
        margin-top: -2px;
      }
    }
  }
</style>

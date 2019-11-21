<!--app下载，微信中转页-->
<template>
  <div class="content-wrapper">
    <div id="weixin">
      <div class="click_opacity"></div>
      <div class="to_btn">
        <span class="span1"><img src="./img/click_btn.png"></span>
        <span class="span2">
          <em>1</em> 点击右上角<img src="./img/menu.png">打开菜单</span>
        <span class="span2" v-show="iosShow">
          <em>2</em>选择<img src="./img/safari.png">用Safari打开下载
        </span>
        <span class="span2" v-show="androidShow">
          <em>2</em>选择在浏览器打开下载
        </span>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      androidShow: false,
      iosShow: false
    };
  },
  created() {
    let ua = navigator.userAgent.toLowerCase();
    let returnUrl = this.$route.query.returnUrl;
    if ((ua.indexOf('android') !== -1) || (ua.indexOf('Adr') !== -1)) {
      this.androidShow = true;
    } else if ((ua.indexOf('iphone') !== -1) || (ua.indexOf('ipad') !== -1) || (ua.indexOf('ipod') !== -1)) {
      // 非安卓
      this.iosShow = true;
    } else {
      this.androidShow = true;
    }
    if (returnUrl) {
      if (ua.indexOf('micromessenger') < 0) {
        // 非微信
        location.href = returnUrl;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content-wrapper {
  height: 100%;
  width: 100%;
  background: url('/static/img/QRcode/img-newshare-bg.png') no-repeat;
  background-size: 100% 100%;
}
.click_opacity {
  width: 100%;
  height: 100%;
  background: #999;
  opacity: 0.6;
  position: fixed;
  z-index: 10000;
  top: 0px;
}
.to_btn {
  color: #fff;
}
.to_btn {
  position: fixed;
  top: 10px;
  right: 10px;
  text-align: right;
  z-index: 10001;
  font-family: "微软雅黑";
}

.to_btn span {
  display: block;
}

.to_btn img {
  width: 20%;
  height: auto;
  display: inline-block;
}

.to_btn .span1 {
  font-size: 1.6rem;
  color: #fff;
  margin-top: 5px;
}
.to_btn .span2 {
  display: inline-block;
  line-height: 36px;
  width: 80%;
  margin-bottom: 12px;
  text-align: left;
  font-size: 16px;
}

.to_btn .span2 em {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #009dd9;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 16px;
  border: 1px solid #fff;
  border-radius: 50%;
  margin-right: 3px;
}

.to_btn .span2 img {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0px 5px;
}

.to_btn span {
  display: block;
  float: right;
}

.to_btn .android_open img {
  display: inline-block;
  width: 150px;
  height: 34px;
}
</style>


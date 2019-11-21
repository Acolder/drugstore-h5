<myComment></myComment>
<template>
  <div id="QRCode">
    二维码生成地址
  </div>
</template>
<script>
import { Header }  from 'mint-ui';
export default {
  name: 'waiting',
  components: {
    'mt-header': Header,
  },
  data: function () {
    return {};
  },
  computed: {},
  mounted: function () {
  },
  methods: {},
  created() {
    let _self = this;
    let ua = navigator.userAgent.toLowerCase();
    let iosDownloadUrl = 'https://itunes.apple.com/cn/app/%E8%8D%AF%E8%91%AB%E8%8A%A6/id1395275648?mt=8';
    let androidDownLoadUrl = 'http://appdetailh5.vivo.com.cn/detail/2209921?source=1';
    if (ua.indexOf('iphone') >= 0) {
      if (ua.indexOf('micromessenger') >= 0)// 微信中打开
      {
        let r = Math.random();
        _self.$router.push({
          path: '/QRcode/wxtemp',
          query: {
            returnUrl: iosDownloadUrl,
            r: r
          }
        });
      } else {
        location.href = iosDownloadUrl;
      }
    } else if (ua.indexOf('android') >= 0) {
      location.href = androidDownLoadUrl;
    } else {
      console.log(ua);
    }
  }
};
</script>
<style lang="less" scoped>
</style>


<template>
  <div class="information-wrapper">
      <div class="tip-wrapper">
        IOS端APP正在上架中，敬请期待！
      </div>
  </div>
</template>
<style lang="less" scoped>
.information-wrapper {
  height: 100%;
  width: 100%;
  background: url("/static/img/QRcode/img-newshare-bg.png") no-repeat;
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
.tip-wrapper {
  padding: 30px 20px;
  font-size: 20px;
  font-weight: 300;
  z-index: 10001;
}
</style>
<script>
import { Alert } from 'mint-ui';
export default {
  data() {
    return {};
  },
  components: {
    'el-alert': Alert
  }
};
</script>

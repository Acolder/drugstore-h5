<template>
  <div id="Examples">
    <mt-header fixed title="处方示例">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="wrap">
      <div class="tips">
        <img src="./imgs/icon_tz.png" alt="" class="tipsImg">
        <p>请尽量保证上传的处方文字清晰可见，并保证红框内的信息完整不缺失</p>
      </div>
      <div class="cfsl">
        <img src="./imgs/cfsl_zy.png" alt="">
        <img src="./imgs/cfsl_xy.png" alt="">
        <img src="./imgs/cfsl_gf.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
#Examples{
  width: 100%;
  height: 100%;
.wrap{
  position: absolute;
  top: 44px;
  left: 0;
  }
.tips{
  width: 100%;
  height: 46px;
  background-color: @green-color;
  text-align: center;
  position: relative;
  img{
    width: 12px;
    height: 14px;
    position: absolute;
    top: 7.5px;
    left: 12vw;
    color: #fff;
  }
  p{
    width: 240px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    position: absolute;
    left: 18vw;
    top: 7px;
    line-height: 16px;
  }
}
.cfsl{
  img{
    width: 100%;
    height: 100%;
  }

}
}
</style>

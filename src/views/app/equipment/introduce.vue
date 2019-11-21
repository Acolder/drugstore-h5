<template>
<div class="equipmentInsideIntroduce">
  <div class="equipmentInsideIntroduceMain">
    <div class="start" @click="apply"></div>
    <div class="banner">
      <a href="#miao"></a>
    </div>
    <div class="mainImg" id="miao">
    </div>
    <!-- <div class="apply">
      <div class="applyBtn" @click="apply">开始脉诊检测</div>
    </div> -->
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    apply() {
      /* eslint-disable */
      HealthBAT.goToMaiZhen();
    }
  },
};
</script>

<style lang="less" scoped>
.equipmentInsideIntroduce{
  padding-top: 0.1px;
  .equipmentInsideIntroduceMain{
    position: relative;
    .start{
      width: 124px;
      height: 76.5px;
      background: url('./imgs/but_ksjc.png');
      background-size: 100% 100%;
      position: fixed;
      right: -2px;
      top: 430px;
    }
    .banner{
      padding-top: 0.1px;
      height: 610px;
      background: url('./imgs/banner.png');
      background-size: 100% 100%;
      a{
        width: 76px;
        height: 27px;
        border-radius: 13px;
        display: block;
        margin: 0 auto;
        margin-top: 210px;
      }
    }
    .mainImg{
      height: 2406.5px;
      background: url('./imgs/img-d.jpg');
      background-size: 100% 100%;
    }
  }
  .apply{
    width: 100%;
    height: 83px;
    background: #f7f6f6;
    display: flex;
    align-items: center;
    justify-content: center;
    .applyBtn{
      width: 227px;
      height: 45px;
      background: #0ccdd3;
      border-radius: 22.5px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

<template>
<div class="equipmentInsideIntroduce">
  <mt-header title="脉诊仪内部体验">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="equipmentInsideIntroduceMain">
    <div class="banner">
      <a href="#miao"></a>
    </div>
    <div class="mainImg" id="miao">
    </div>
  </div>
  <div class="apply">
    <div class="applyBtn" @click="apply">内部体验申请</div>
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
      this.$router.push('/equipment/equipmentInsideApply');
    }
  },
  mounted() {
    // document.title = '脉诊仪内部体验申请';
  },
};
</script>

<style lang="less" scoped>
.equipmentInsideIntroduce{
  padding-top: 0.1px;
  .equipmentInsideIntroduceMain{
    margin-top: 44px;
    margin-bottom: 83px;
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
    position: fixed;
    width: 100%;
    height: 83px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
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

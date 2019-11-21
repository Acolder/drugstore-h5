<template>
<div class="equipmentComplete">
  <mt-header title="提交成功">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    <!-- <mt-button icon="back" slot="left" @click="back"></mt-button> -->
  </mt-header>
  <div class="equipmentCompleteMain">
    <div class="logo-img">
      <img src="./imgs/icon_cg.png" alt="">
    </div>
    <p>确认收货成功！</p>
    <div class="tips">您的<span>脉诊仪</span>已激活，祝您体验愉快！</div>
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
    back() {
      this.$router.push('/equipment/equipmentMyList');
    }
  }
};
</script>

<style lang="less" scoped>
.equipmentComplete{
  padding-top: 0.1px;
  .equipmentCompleteMain{
    margin-top: 44px;
    padding-top: 0.1px;
    .logo-img{
      margin-top: 55px;
      display: flex;
      justify-content: center;
      img{
        width: 75px;
        height: 75px;
        margin: 0 auto;
      }
    }
    p{
      height: 60px;
      font-size: 20px;
      line-height: 60px;
      color: #333333;
      text-align: center;
    }
    .tips{
      height: 60px;
      font-size: 15px;
      line-height: 60px;
      text-align: center;
      color: #999999;
      span{
        color: #ea6969;
      }
    }
  }
}
</style>
<template>
<div class="equipmentEnterpriseSuccess">
  <mt-header title="提交成功">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="equipmentEnterpriseSuccess-main">
    <div class="logo-img">
      <img src="./imgs/icon_cg.png" alt="">
    </div>
    <p>申请提交成功！</p>
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
  },
  mounted() {
    // document.title = '提交成功';
  },
};
</script>

<style lang="less" scoped>
.equipmentEnterpriseSuccess{
  padding-top: 0.1px;
  .equipmentEnterpriseSuccess-main{
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
  }
}
</style>
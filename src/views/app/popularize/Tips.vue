<template>
  <div class="tips">
    <mt-header title="提示"></mt-header>
    <div class="logo">
      <img src="./imgs/sussec.png" />
    </div>
    <div class="text">
      <p class="title">注册推广员成功</p>
      <p class="subTitle">返回公众号回复“二维码”即可获得推广二维码</p>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.tips{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .logo{
    margin-top: 44px;
    text-align: center;
    img{
      width: 140px;
      height: 80px;
      margin: 35px 0 10px;
    }
  }
  .text{
    text-align: center;
    .title{
      font-size: 16px;
      font-weight: 900;
      margin-bottom: 15px;
    }
  }
}
</style>

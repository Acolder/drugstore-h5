<template>
  <div class="has-header">
    <!-- <mt-header fixed title="二维码下载">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <p class="txt">扫码下载药葫芦APP</p>
    <img class="pic" src="./qr-code.jpg" />
  </div>
</template>
<style lang="less" scoped>
  .txt {
    font-size: 16px;
    text-align: center;
    margin: 76px 0 30px;
  }
  .pic {
    display: block;
    max-width: 56%;
    margin: 0 auto;
  }
</style>


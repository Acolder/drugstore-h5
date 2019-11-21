<template>
  <div class="loadingOut" v-show="loadingShow">
    <div class="loadingBox">
    </div>
    <div class="loading">
      <img src="./img/loading.gif">
    </div>
  </div>
</template>
<script>
export default {
  props: ['loadingShow']
};
</script>
<style lang="less" scoped>
  .loadingOut{
    width:100%;
    height:100%;
  }
  .loadingBox{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.5;
    z-index: 400;
  }
  .loading{
    width: 153px;
    height:153px;
    background-color: #ffffff;
    margin: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    z-index: 450;
    text-align: center;
    img{
      width:80%;
      height:80%;
    }
  }
</style>

<template>
  <div class="page">
    <div class="header-wrapper">
      <mt-header title="消息">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="message-list">
      <div class="message-item">
        <div class="message-img">
          <img src="./img/icon_mingmignzhang@3x.png" alt="" style="width: 52.5px;height: 52.5px;">
        </div>
        <div class="message-text">
          <div class="title-date">
            <span class="title">李医生</span>
            <span class="date">2018-04-20</span>
          </div>
          <div class="article">医生已进入诊室、查看问诊消息，请点击下面链...</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../styles/mixin.less';
.header-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  height: 45px;
}

.message-list {
  margin-top: 45px;
}

.message-item {
  display: flex;
  height: 70px;
  margin-left: 5%;
  .border-1px(#e0e0e0);
  justify-content: center;
  align-items: center;
  .message-img {
    width: 55px;
    height: 55px;
    flex: 0 1 auto;
  }
  .message-text {
    flex: 1;
    padding-left: 5%;
    margin-bottom: 3px;
    .title-date {
      display: flex;
      justify-content: center;
      .title {
        flex: 1;
        color: #000;
        font-size: 16px;
        text-align: left;
      }
      .date {
        flex: 1;
        text-align: right;
        padding-right: 8%;
        color: #bbb;
        font-size: 10px;
      }
    }
    .article{
      margin-top: 3px;
      font-size: 13px;
      color: #666;
    }
  }
}

</style>

<template>
  <div class="wrap" v-if="state">
    <!--<div class="open" v-if="state">-->
      <!--<span class="icon-close" @click="close"></span>-->
      <!--<h6 class="title">请选择收货地址</h6>-->
      <!--<div class="list">-->
        <!--<div class="item" v-for="(item,index) in address" :key="index" @click="Action(item.id)" :class="{active:activeID==item.id}">-->
          <!--<div class="text">-->
            <!--<i class="icon-dot" id="dot"></i>-->
            <!--<span>{{item.text}}</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="close">
      <h6 class="title">无法获取定位</h6>
      <div class="subtitle">
        <p>无法获取定位时，我们仅提供商城配送服务，如需附近药柜自提、药店速达服务，请您确认已开启定位且网络正常。</p>
      </div>
      <div class="bottom">
        <div class="left">
          <p @click="checkAddr">设置收货地址</p>
        </div>
        <!--<div class="right">-->
          <!--<p @click="openLocation">去开启</p>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>
<script>
/*
    使用：必须传一个props:state,布尔值，判断地理定位开启还是未开启
*/
export default {
  data() {
    return {
      isShow: true
      // activeID: 0
    };
  },
  props: {
    state: Boolean
  },
  methods: {
    close() {
      this.isShow = false;
    },
    openLocation() {
      this.$emit('openLocation');
    },
    checkAddr() {
      let url = this.$route.name;
      this.$router.push({
        path: '/addressMgr/select',
        query: { from: url }
      });
      let addrInfo = JSON.parse(sessionStorage.getItem('selectedAddress'));
      this.$emit('checkAddr', addrInfo);
    }
  }
};
</script>
<style lang="less" scoped>
@color: #e6e6e6;
@import "../../styles/common.less";
@import "../../styles/mixin.less";
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.37);
  font-family: PingFang-SC-Bold;
}
.open {
  width: 225px;
  height: 210px;
  background-color: @white-color;
  border-radius: 8px;
  .align-center(absolute);
  .icon-close {
    width: 11px;
    height: 11px;
    position: absolute;
    left: 205px;
    top: 12px;
    background: url("./img/icon-close@2x.png") no-repeat;
    background-size: 100%;
  }
  .title {
    width: 100%;
    height: 17px;
    text-align: center;
    font-size: 17px;
    font-weight: 600;
    font-stretch: normal;
    letter-spacing: 0px;
    color: @black-color;
    margin-top: 29px;
  }
  .list {
    margin-top: 15px;
    .item {
      border-bottom: 1px solid @color;
      line-height: 35px;
      height: 35px;
      .text {
        margin-left: 24px;
        font-size: 14px;
        color: @color;
        .icon-dot {
          width: 10px;
          height: 10px;
          display: inline-block;
          background-color: #fafafa;
          border: solid 1px #a9a9a9;
          border-radius: 50%;
          margin-right: 9px;
        }
      }
    }
  }
}
.close {
  width: 280px;
  height: 164px;
  background-color: @white-color;
  border-radius: 8px;
  font-weight: 600;
  .align-center(absolute);
  .title {
    width: 100%;
    height: 17px;
    font-size: 16px;
    text-align: center;
    letter-spacing: 0px;
    color: @black-color;
    margin-top: 18px;
  }
  .subtitle {
    font-size: 12px;
    color: @black-color;
    padding: 0 22px;
    box-sizing: border-box;
    margin-top: 8px;
  }
  .bottom {
    margin-top: 15px;
    height: 46px;
    width: 100%;
    display: flex;
    .border-top-1px(@color);
    .left {
      flex: 1;
      height: 46px;
      line-height: 46px;
      text-align: center;
      color: @green-color;
      border-right: 1px solid @color;
    }
    /*.right {*/
      /*flex: 1;*/
      /*height: 46px;*/
      /*line-height: 46px;*/
      /*text-align: center;*/
      /*color: #089efd;*/
    /*}*/
  }
}
.active {
  span {
    color: @green-color;
  }
  #dot {
    background-color: #b2e1ff;
    border: 1px solid @green-color;
  }
}
</style>

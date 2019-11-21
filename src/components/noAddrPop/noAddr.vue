<template>
  <div>
    <div class="common-mask" v-show="hasShow"></div>
    <div class="delivery-way" v-show="hasShow">
      <label class="addr-hint">请先设置收货地址哦~</label>
      <span class="display-box btn-box">
        <label class="box-flex" @click="closePops">取消</label>
        <router-link to="/addressMgr/select" class="box-flex confirm">去设置</router-link>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    hasShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closePops() {
      this.hasShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
  @import '../../styles/mixin.less';
  .delivery-way{
    .align-center(fixed);
    width: 80%;
    padding: 20px 0 0;
    border-radius: 5px;
    background: #fff;
    .addr-hint{
      display: block;
      text-align: center;
    }
    .btn-box{
      height: 42px;
      line-height: 42px;
      font-size: 14px;
      text-align: center;
      margin-top: 25px;
      border-top: @border-line;
      .confirm{
        color: @green-color;
        border-left: @border-line;
      }
    }
  }
</style>

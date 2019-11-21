<template>
  <div v-if="isShow">
    <div class="pop-up">
      <img src="./img/xh_icon_qhm.png" class="img" />
      <label class="tlt">药品取货码</label>
      <label class="code-txt">{{pickupCode}}</label>
      <img :src="codeImg" class="qr-code" />
      <label class="hint-txt">在药柜上扫描取货码，拿取药品</label>
    </div>
    <div class="common-mask" @click="hidePop"></div>
  </div>
</template>
<script>
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      codeImg: ''
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    pickupCode: {
      type: String,
      default: ''
    }
  },
  watch: {
    pickupCode() {
      this.getQrCode();
    }
  },
  methods: {
    getQrCode() {
      ajax.get(`/api/system/getqrcode?url=${this.pickupCode}`).then((res) => {
        if (res.status === 200) {
          console.log(res);
          let resCode = res.data.code;
          let resData = res.data.data;
          if (resCode === 0 && resData) {
            this.codeImg = `data:image/png;base64,${resData}`;
          }
        }
      });
    },
    hidePop() {
      this.$emit('hidePop', false);
    }
  }
};
</script>
<style lang="less" scoped>
  @import "../../styles/mixin";
  .pop-up{
    .align-center(fixed);
    width: 76%;
    height: 250px;
    background: @white-color;
    border-radius: 5px;
    text-align: center;
    .img{
      display: block;
      width: 60px;
      height: 60px;
      margin: -30px auto 13px;
    }
    .tlt{
      display: block;
      font-size: 17px;
    }
    .code-txt{
      display: block;
      margin: 20px 0 4px;
      font-size: 22px;
      color: @green-color;
    }
    .qr-code{
      display: block;
      margin: 0 auto 2px;
      width: 108px;
      height: 108px;
    }
    .hint-txt{
      font-size: 11px;
      color: @color666;
    }
  }
</style>


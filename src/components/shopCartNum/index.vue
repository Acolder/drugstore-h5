<template>
  <label class="circle-num" v-show="shopCartNum && isLogin" :class="isOval?'oval':''">{{shopCartNum}}</label>
</template>
<script>
import { getShopCart, bus } from '@/api/shopCart';
export default {
  data() {
    return {
      shopCartNum: 0,
      isLogin: false,
      isOval: false
    };
  },
  mounted() {
    this.getShopCartNum();
    bus.$on('txt', (msg) => {
      if (msg === 'add' || msg === 'revise') {
        this.getShopCartNum();
      }
    });
  },
  methods: {
    // 获取购物车数量
    getShopCartNum() {
      getShopCart().then((res) => {
        console.log(res);
        if (res.data.resultCode === '0') {
          this.isLogin = true;
          this.$emit('getLogin', this.isLogin);
          let resultData = res.data.resultData;
          if (resultData <= 99) {
            this.shopCartNum = res.data.resultData;
            this.isOval = false;
          }
          else {
            this.isOval = true;
            this.shopCartNum = '99+';
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
  @import '../../styles/mixin.less';
  // .shop-cart-num{
  //   position: absolute;
  //   top: -3px;
  //   right: 9px;
  //   width: 18px;
  //  .background-radius-btn(18px,0,@red-color,50%,10px);
  //   line-height: 20px;
  //   // -webkit-transform: scale(0.9);
  //   // transform: scale(0.9);
  // }
  .oval{
    right: -7px;
    width: 29px;
    border-radius: 20px;
  }
</style>

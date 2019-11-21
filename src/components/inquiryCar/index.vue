<template>
  <div class="inpuqry-car">
    <img src="./img/icon-zxwzg.png" alt="">
    <span class="i-box">
      <div to="/" class="inline-inpuqry" @click="goInquiry"></div>
      <router-link to="/shopCart/index" class="shop-car">
        <v-cart-num></v-cart-num>
      </router-link>
    </span>
  </div>
</template>
<script>
import { intoInquiry } from '@/api/user';
import shopCartNum from '../../components/shopCartNum/index.vue';
export default {
  data() {
    return {
      shopCartNum: 0,
      // isLogin: false,
      isOval: false
    };
  },
  components: {
    'v-cart-num': shopCartNum
  },
  mounted() {
    // this.getLogin();
  },
  methods: {
    // getLogin(res) {
    //   this.isLogin = res;
    // },
    // 在线问诊
    goInquiry() {
      intoInquiry();
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';
.inpuqry-car{
    position: fixed;
    right: -5px;
    bottom: 10px;
    z-index: 3;
    width: 103px;
    img{
      width: 100%;
      height: 100%;
    }
    .i-box{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      .inline-inpuqry{
        float: left;
        width: 55%;
        height: 100%;
      }
      .shop-car{
        float: left;
        width: 45%;
        height: 40px;
        label{
          right: 7px;
        }
      }
    }
  }
</style>

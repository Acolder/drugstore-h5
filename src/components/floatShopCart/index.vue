<template>
  <router-link to="/shopCart/index" class="shopping-cart">
    <img src="./img/floating.png" />
    <!-- <v-cart-num @getLogin="getLogin"></v-cart-num> -->
    <v-cart-num></v-cart-num>
  </router-link>
</template>
<script>
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
  // mounted() {
  //   this.getLogin();
  // },
  methods: {
    // getLogin(res) {
    //   this.isLogin = res;
    // }
  }
};
</script>
<style lang="less" scoped>
  @import '../../styles/mixin.less';
  .shopping-cart{
    position: fixed;
    bottom: 40px;
    right: -5px;
    width: 68px;
    height: 58px;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>

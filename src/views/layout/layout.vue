<template>
  <div>
    <router-view></router-view>
    <mt-tabbar class="primary-nav" v-model="curTab">
      <mt-tab-item id="pharmacy" class="pharmacy" href="/home/index">
        <img slot="icon" width="25" height="21" src="./img/iconlh-zhyfl.png" alt="智慧药房" v-if="curTab==='pharmacy'">
        <img slot="icon" width="25" height="21" src="./img/iconlh-zhyfh.png" alt="智慧药房" v-else> 智慧药房
      </mt-tab-item>
      <mt-tab-item id="hospital" class="hospital" href="/chineseDrug/index">
        <img slot="icon" width="21" height="21" src="./img/iconlh-zygyl.png" alt="中药国医" v-if="curTab==='hospital'">
        <img slot="icon" width="21" height="21" src="./img/iconlh-zygyh.png" alt="中药国医" v-else> 中药国医
      </mt-tab-item>
      <mt-tab-item id="shopping-cart" class="shopping-cart" href="/shopCart/index">
        <v-cart-num></v-cart-num>
        <img slot="icon" width="21" height="21" src="./img/iconlh-gwcl.png" alt="购物车" v-if="curTab==='shopping-cart'">
        <img slot="icon" width="21" height="21" src="./img/iconlh-gwch.png" alt="购物车" v-else> 购物车
      </mt-tab-item>
      <mt-tab-item id="my-center" class="my-center" href="/myCenter/index">
        <img slot="icon" width="21" height="21" src="./img/iconlh-wdl.png" alt="我的" v-if="curTab==='my-center'">
        <img slot="icon" width="21" height="21" src="./img/iconlh-wdh.png" alt="我的" v-else> 我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import { Header, Button, Tabbar, TabItem } from 'mint-ui';
import shopCartNum from '../../components/shopCartNum/index.vue';
export default {
  data() {
    return {
      curTab: 'pharmacy',
      isLogin: false,
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-tabbar': Tabbar,
    'mt-tab-item': TabItem,
    'v-cart-num': shopCartNum
  },
  watch: {
    '$route'(to, from) {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let thisUrl = this.$route.path.toLowerCase();
      // let thisUrl = window.location.href.toLowerCase();
      if (thisUrl.indexOf('home/index') !== -1) {
        this.curTab = 'pharmacy';
      }
      if (thisUrl.indexOf('chinesedrug/index') !== -1) {
        this.curTab = 'hospital';
      }
      if (thisUrl.indexOf('shopcart/index') !== -1) {
        this.curTab = 'shopping-cart';
      }
      if (thisUrl.indexOf('mycenter/index') !== -1) {
        this.curTab = 'my-center';
      }
    }
  }
};
</script>
<style lang="less" scoped>
  @import '../../styles/mixin.less';
  .primary-nav{
    position: fixed;
    height: 48px;
    border-top: solid 1px #e6e6e6;
    background-color: #fff;
    .mint-tab-item{
      padding: 4px 0;
    }
    .mint-tab-item:hover,.mint-tab-item.is-selected {
      color: @green-color !important;
    }
    .mint-tab-item.is-selected{
      // background: #fff;
    }
    .shopping-cart{
      position: relative;
      .circle-num{
        right: 23%;
      }
    }
  }
  .mint-tabbar > .mint-tab-item.is-selected{
    background: none;
  }
</style>

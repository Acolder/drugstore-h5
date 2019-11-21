<template>
  <div class="headline-menus">
    <div class="headline-menus-container" :style="{ width: headlineMenuConWidth + 'px' }">
      <div class="menuitem" v-for="m in menus" :key="m.id" @click="menuclick(m)" :class="{active:m.id===activeId}">
        {{m.text}}
      </div>
    </div>
  </div>
</template>

<script>

// import ajax from '@/utils/ajax';
// import { Toast } from 'mint-ui';
import Cookies from 'js-cookie';
const ACTIVE_ID = 'headlineActiveId';

export default {
  data() {
    return {
      // menus: [{ 'id': 1, 'text': '最新' }]
      activeId: JSON.parse(Cookies.get(ACTIVE_ID) || 0), // 当前激活列表
    };
  },
  props: {
    menus: Array,
    headlineMenuConWidth: Number
  },
  methods: {
    menuclick(m) {
      this.activeId = m.id;
      this.$emit('menuClick', m);
    }
  },
  mounted() {
    // 待定
  }
};

</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
::-webkit-scrollbar {
  display:none;
}
.headline-menus {
  position: fixed;
  top: 44px;
  z-index: 5;
  left: 0;
  right: 0;
  overflow-x: auto;
  .headline-menus-container {
    display: flex;
    .border-1px(#e0e0e0);
    background: #fff;
  }
  .menuitem {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    height: 46px;
    line-height: 46px;
    color: #333;
    text-align: center;
    margin: 0 10px;
    &.active {
      color: #009ef1;
      position: relative;
      &:after {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        /*border-top: 2px solid #089efd;*/
        width: 100%;
        content: '';
      }
    }
  }
}

</style>

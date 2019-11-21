<template>
<div class="equipmentInsideIntroduce">
  <mt-header title="脉诊仪租赁">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="equipmentInsideIntroduceMain">
    <div class="banner">
      <a href="#miao"></a>
    </div>
    <div class="mainImg" id="miao">
      <div class="applyType">
        <div @click="enterprise">企业合作 <p></p><img src="./imgs/icon_jtt.png" alt=""></div>
        <div @click="inside">内部体验申请 <p></p><img src="./imgs/icon_jtt.png" alt=""></div>
      </div>
    </div>
  </div>
  <mt-tabbar v-model="curTab" class="primary-nav">
    <mt-tab-item id="lease" href="/equipment/equipmentLease">
      <img slot="icon" width="25" height="21" src="./imgs/icon_p_zl.png" alt="租赁" v-if="curTab==='lease'">
      <img slot="icon" width="25" height="21" src="./imgs/icon_n_zl.png" alt="租赁" v-else>
      租赁
    </mt-tab-item>
    <mt-tab-item id="still" href="/equipment/equipmentReturn">
      <img slot="icon" width="25" height="21" src="./imgs/icon_p_gh.png" alt="租赁" v-if="curTab==='still'">
      <img slot="icon" width="25" height="21" src="./imgs/icon_n_gh.png" alt="租赁" v-else>
      归还
    </mt-tab-item>
    <mt-tab-item id="my" href="/equipment/equipmentMyList">
      <img slot="icon" width="25" height="21" src="./imgs/icon_p_wd.png" alt="租赁" v-if="curTab==='my'">
      <img slot="icon" width="25" height="21" src="./imgs/icon_n_wd.png" alt="租赁" v-else>
      我的
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>

<script>
import { Header, Button, Tabbar, TabItem } from 'mint-ui';
export default {
  data() {
    return {
      curTab: '',
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-tabbar': Tabbar,
    'mt-tab-item': TabItem,
  },
  methods: {
    // 开始检测
    start() {
      console.log('开始检测');
    },
    // 企业合作
    enterprise() {
      this.$router.push('/equipment/equipmentEnterprise');
    },
    // 内部体验申请
    inside() {
      this.$router.push('/equipment/equipmentInsideApply');
    },
    // 租赁
    lease() {
      this.$router.push('/equipment/equipmentLease');
    },
    // 归还
    still() {
      this.$router.push('/equipment/equipmentReturn');
    },
    // 我的
    my() {
      this.$router.push('/equipment/equipmentMyList');
    },
  },
  mounted() {
    // document.title = '脉诊仪内部体验申请';
  },
};
</script>

<style lang="less" scoped>
 @import '../../styles/mixin.less';
.equipmentInsideIntroduce{
  padding-top: 0.1px;
  .equipmentInsideIntroduceMain{
    position: absolute;
    left: 0px;
    right: 0px;
    top: 44px;
    bottom: 44px;
    overflow: auto;
    .banner{
      padding-top: 0.1px;
      height: 610px;
      background: url('./imgs/banner.png');
      background-size: 100% 100%;
      a{
        width: 76px;
        height: 27px;
        border-radius: 13px;
        display: block;
        margin: 0 auto;
        margin-top: 210px;
      }
    }
    .mainImg{
      height: 2406.5px;
      background: url('./imgs/img-d.jpg');
      background-size: 100% 100%;
      position: relative;
      .applyType{
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 6.666667vw;
        // padding: 0px 18.666667vw;
        padding: 0px 14vw;
        display: flex;
        justify-content: space-between;
        div{
          height: 12px;
          display: flex;
          align-items: center;
        }
        >div:first-child{
          margin-right: 10.666667vw ;
        }
        p{
          width: 1px;
          height: 100%;
          background: #333333;
          margin: 0px 2.666667vw 0px 1.6vw;
        }
        img{
          width: 2.4vw;
          height: 2.1333vw;
        }
      }
    }
  }
  .primary-nav{
    position: fixed;
    height: 48px;
    border-top: solid 1px #e6e6e6;
    .mint-tab-item{
      padding: 4px 0;
    }
    .mint-tab-item:hover,.mint-tab-item.is-selected {
      color: @green-color !important;
    }
    .is-selected{
      background: #fff;
    }
  }
}
</style>

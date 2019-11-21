<template>
  <div class="has-header customer-server-body">
    <mt-header fixed title="客户服务">
      <router-link to="/myCenter/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="server-type">
      <router-link class="type-list" to="/customerServer/suggestion">
        <i><img src="./img/customer-server/icon-yjfk@2x.png" /></i>
        <p>意见反馈</p>
      </router-link>
      <a class="type-list" href="tel:4000-333-888">
        <i><img src="./img/customer-server/icon-zxkf@2x.png" /></i>
        <p>在线客服</p>
      </a>
    </div>
    <div class="server-list">
      <router-link class="list" to="/customerServer/question?type=produce">
        <img src="./img/customer-server/icon-splwt@2x.png"/>商品类问题<i></i>
      </router-link>
      <!--<router-link class="list" to="">-->
        <!--<img src="./img/customer-server/icon-ddlwt@2x.png"/>订单类问题<i></i>-->
      <!--</router-link>-->
      <router-link class="list" to="/customerServer/question?type=distribution">
        <img src="./img/customer-server/icon-pslwt@2x.png"/>配送类问题<i></i>
      </router-link>
      <!--<router-link class="list" to="">-->
        <!--<img src="./img/customer-server/icon-yhhdwt@2x.png"/>优惠活动问题<i></i>-->
      <!--</router-link>-->
      <!--<router-link class="list" to="">-->
        <!--<img src="./img/customer-server/icon-zhlwt@2x.png"/>账户类问题<i></i>-->
      <!--</router-link>-->
      <!--<router-link class="list" to="">-->
        <!--<img src="./img/customer-server/fplwt@2x.png"/>发票类问题<i></i>-->
      <!--</router-link>-->
      <!--<router-link class="list" to="">-->
        <!--<img src="./img/customer-server/icon-zfytkl@2x.png"/>支付与退款类问题<i></i>-->
      <!--</router-link>-->
      <router-link class="list" to="/customerServer/question?type=use">
        <img src="./img/customer-server/icon_sylwt@2x.png"/>使用类问题<i></i>
      </router-link>
      <router-link class="list" to="/customerServer/question?type=afterSales">
        <img src="./img/customer-server/icon-shlwt@2x.png"/>售后类问题<i></i>
      </router-link>
    </div>
  </div>
</template>

<script>

import { Header } from 'mint-ui';

export default {
  name: 'customerServer',
  data() {
    return {};
  },
  components: {
    'mt-header': Header
  }
};
</script>

<style lang="less" scoped>
  @import '../../styles/mixin.less';
  @color-ef3: #eeeef3;
  @color-33: #333;
  @color-e0: #e0e0e0;
  .customer-server-body {
    min-height: 100%;
    background: @color-ef3;
  }
  .server-type {
    background: #fff;
    display: flex;
    margin-bottom: 15px;
    .type-list {
      flex: 1;
      text-align: center;
      padding: 20px 0;
      font-size: 18px;
      color: @color-33;
      p {
        margin-top: 10px;
      }
      img {
        width: 60px;
      }
    }
  }
  .server-list {
    background: #fff;
    .list {
      position: relative;
      display: block;
      padding: 15px 12px;
      font-size: 17px;
      border-bottom: solid 1px @color-e0;
      color: @color-33;
      &:last-of-type {
        border-bottom: none;
      }
      i {
        position: absolute;
        right: 12px;
        top: 50%;
        margin-top: -6px;
        .turn-icon(#666,12px,-135deg);
      }
      img {
        width: 20px;
        vertical-align: middle;
        margin-top: -5px;
        margin-right: 20px;
      }
    }
  }
</style>

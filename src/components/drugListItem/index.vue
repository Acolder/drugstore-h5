<template>
  <li class="drug-item" @click.stop="toDetail(drug)">
    <div class="item-img">
      <img :src="drug.product_main_image" alt="">
      <i style="display: inline-block;height: 100%;vertical-align: middle;"></i>
    </div>
    <div class="item-drug-info">
      <div class="drug-name"><span class="name">{{drug.product_name}}</span><span class="price">{{drug.guiding_price?'￥'+Number(drug.guiding_price).toFixed(2):''}}</span></div>
      <p class="drug-effect" v-html="drug.product_description"></p>
      <div class="drug-sells">
        <span class="tags" v-show="!!drug.getByself">自提</span>
        <span class="tags" v-show="!!drug.getFast">快送</span>
        <span class="tags" v-show="!!drug.getCommon||!!drug.seller_user_id">商城</span>
        <span class="guige">
          {{drug.product_specification}}
        </span>
      </div>
    </div>
    <!-- <div class="shopcart" @click.stop="addDrug(drug)" v-if="showShopCart">
      <img src="./img/icon-gwcj.png" alt="">
    </div> -->
  </li>
</template>
<script>
// import { Toast } from 'mint-ui';
// import { addShop, bus } from '@/api/shopCart';
export default {
  props: {
    drug: {
      type: Object,
      default: function() {
        return { product_main_image: '' };
      }
    },
    // showShopCart: {
    //   type: Boolean,
    //   default: false
    // }
  },
  methods: {
    // addDrug(d) {
    //   addShop(d.product_id, d.getByself, d.getFast, d.getCommon || d.seller_user_id, '', '', 1).then((res) => {
    //     if (res.status === 200) {
    //       if (res.data.resultCode === '0') {
    //         bus.$emit('txt', 'add');
    //         let productId = sessionStorage.getItem('addProductId');
    //         let productIds = productId ? productId.split(',').map(Number) : [];
    //         productIds.push(d.product_id);
    //         sessionStorage.setItem('addProductId', productIds);
    //       } else if (res.data.resultCode === '-2') {
    //         Toast('请先登录');
    //       } else {
    //         Toast(res.data.msg);
    //       }
    //     }
    //   });
    // },
    toDetail(drug) {
      let query = {};
      console.log(drug);
      query.productId = drug.product_id || '';
      query.getFast = drug.getFast || '';
      query.getCommon = drug.getCommon || drug.seller_user_id;
      query.getByself = drug.getByself || '';
      this.$router.push({
        path: '/goods/goodsDetail',
        query: query
      });
    },
    // priceFixed(p) {
    //   console.log(p);
    //   if (Number.isNaN(Number(p))) {
    //     return '0';
    //   }
    //   return Math.round(p * 100) / 100;
    // }
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';

.drug-item {
  background-color: #fff;
  position: relative;
  width: 100%;
  .border-1px(#e0e0e0);
  padding: 10px;
  display: flex;

  .item-img {
    flex: none;
    width: 100px;
    height: 75px;
    overflow: hidden;
    border: 1px solid #E0E0E0;
    margin-right: 15px;
    text-align: center;

    img {
      display: inline-block;
      vertical-align: middle;
      max-width: 75px;
      max-height: 64px;
    }
  }

  .item-drug-info {
    flex: 1;
    max-height: 75px;

    .drug-name {
      color: #333;
      height: 20px;
      font-size: 14px;
      display: flex;

      .name {
        flex: 1;
        display: inline-block;
        .aline-text-overflow(20px);
      }

      .price {
        color: #F94F4F;
        display: inline-block;
        text-align: right;
        width: 65px;
        flex: none;
        .aline-text-overflow(20px);
      }
    }

    .drug-effect {
      font-size: 13px;
      color: #666;
      line-height: 15px;
      height: 30px;
      margin-bottom: 3px;
      display: -webkit-box;
      .multi-text-overflow(2);
    }

    .drug-sells {
      padding-right: 30px;
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 12px;
      color: #666;
      height: 20px;

      .tags {
        flex: none;
        border: 1px solid @green-color;
        font-size: 12px;
        color: @green-color;
        display: inline-block;
        line-height: 12px;
        border-radius: 3px;
        margin-right: 5px;
        padding: 1px;
      }

      .guige {
        flex: 1;
        font-size: 12px;
        display: inline-block;
        margin-left: 13px;
        .aline-text-overflow(20px);
      }
    }
  }

  .shopcart {
    position: absolute;
    width: 36px;
    height: 36px;
    bottom: 5px;
    right: 10px;

    img {
      position: absolute;
      display: inline-block;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 18px;
      height: 18px;
    }
  }
}

</style>

<template>
  <div id="swiper">
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(swiper,index) in swiperData " :key="index">
        <!-- <a :href="swiper.product ? '/goods/goodsDetail?productId=' + swiper.product.productid + '&getCommon=' + swiper.product.getcommon : swiper.picture_url.replace('?from=app','?t=')">
          <img :src="swiper.picture_path" alt="">
        </a> -->
        <div @click="goBanner(swiper)" class="img-box">
          <img :src="swiper.picture_path" alt="">
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  data() {
    return {};
  },
  props: { swiperData: Array },
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem
  },
  methods: {
    goBanner(res) {
      console.log(res);
      let url = '';
      if (res.product) {
        url = '/goods/goodsDetail?productId=' + res.product.productid + '&getCommon=' + res.product.getcommon;
      }
      else {
        url = res.picture_url.replace('?from=app', '?t=');
        url = url.replace(process.env.WEB_HOST_APP, process.env.WEB_HOST);
      }
      if (url) {
        location.href = url;
      }
    }
  }
};
</script>

<style lang="less" scoped>
  #swiper{
    width: 100%;
    height: 100%;
    .img-box{
      height: 100%;
      img{
        height: 100%;
        width: 100%;
      }
    }
    /deep/ .mint-swipe-indicators{
      bottom: 3px;
    }
    /deep/ .mint-swipe-indicator.is-active {
      background: #f00;
    }
    /deep/ .mint-swipe-indicator{
      opacity: 1;
      background: #fff;
      width: 6px;
      height: 6px;
    }
  }
</style>


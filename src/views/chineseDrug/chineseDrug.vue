<template>
  <div>
    <div class="chineseDrugWrapper">
      <mt-header fixed title="中药国医" class="headerColor">
      </mt-header>
      <div class="page">
        <!--banner-->
        <div class="banner">
          <a>
            <img src="./imgs/zhongyao_banner.png" alt="">
          </a>
        </div>
        <!--导航-->
        <div class="Navigation marginBottom">
          <div class="Navigation-top">
            <a href="/chineseDrug/BuyMedicine" class="drugs">
              <img src="./imgs/iconfont_pictures.png" alt="">
              <span>拍方抓药</span>
            </a>
            <a href="/headlines" class="drugs">
              <img src="./imgs/iconfont_headlines.png" alt="">
              <span>中医头条</span>
            </a>
            <a href="/classics" class="drugs">
              <img src="./imgs/iconfonot_classics.png" alt="">
              <span>中医典籍</span>
            </a>
            <a href="/physique" class="drugs">
              <img src="./imgs/iconfont_measurement.png" alt="">
              <span>中医体质检测</span>
            </a>
          </div>
          <div class="Navigation-bottom">
            <a href="##">
              <img src="./imgs/icon_qierr.png" alt="">
              <span>拍照传方</span>
            </a>
            <a href="##">
              <img src="./imgs/icon_qierr.png" alt="">
              <span>按方抓药</span>
            </a>
            <a href="##">
              <img src="./imgs/icon_qierr.png" alt="">
              <span>中药煎煮</span>
            </a>
            <a href="##">
              <img src="./imgs/icon_qierr.png" alt="">
              <span>送药上门</span>
            </a>
          </div>
        </div>
        <!--调理妙方-->
        <div class="Recuperation marginBottom">
          <p class="pCommon p">调理妙方</p>
          <div class="performancePic">
            <div class="PIC">
              <img src="./imgs/pic_cold.png" alt="" style="margin-left:5px;" @click="WonderfulDetail()">
              <img src="./imgs/pic_indigestion.png" alt="" @click="WonderfulDetail2()">
              <img src="./imgs/pic_glands.png" alt="" style="margin-right:5px;" @click="WonderfulDetail3()">
            </div>
          </div>
        </div>
        <!--中医在线咨询-->
        <div class="ConsultationOnline marginBottom">
          <p class="pCommon">中医在线咨询</p>
          <a @click="AskDoctor">
            <img src="./imgs/onlie_banner.png" alt="">
          </a>
          <div class="Symptom">
            <span>
              <img src="./imgs/iconfont_mouth.png" alt="">
            </span>
            <span>
              <img src="./imgs/iconfont_shine.png" alt="">
            </span>
            <span>
              <img src="./imgs/iconfont_disorder.png" alt="">
            </span>
            <span>
              <img src="./imgs/iconfont_weight.png" alt="">
            </span>
          </div>
        </div>
        <!--热销产品-->
        <div class="hotSale">
          <p class="pCommon">热销产品</p>

          <div class="product marginBottom display-box" v-for="(item, index) in hotGoods" :key="index" @click="goRoute(item)">
            <div class="productPic">
              <img :src="item.productMainImage" alt="">
            </div>
            <div class="productDetails box-flex">
              <h3>{{item.productName}}</h3>
              <p class="discribe">{{item.productSubtitle}}</p>
              <!-- <i class="discribe sigleTextOverflow">时间刚开始上的风格到</i> -->
              <span>{{item.productSpecification}}</span>
              <span>&nbsp;已售: {{item.productSalesVolume}}</span>
              <div class="price">
                <span>¥ {{Math.floor((item.productMarkprice)*100)/100}}</span>
              </div>
              <img src="./imgs/icon-gwcj@2x.png" alt="" @click.stop="shopCar(item)">
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import javaAjax from '@/utils/javaApiRequest';
import { intoInquiry, goLogin } from '@/api/user';
import { addShop, bus } from '@/api/shopCart';
import { Toast } from 'mint-ui';
import { prescCall } from '@/api/goodDetail';
export default {
  data() {
    return {
      moreLoading: false,
      hotGoods: [],
      isTransnational: false
    };
  },
  methods: {
    // 快速问中医
    AskDoctor: function () {
      intoInquiry(0);
    },
    // 妙方详情
    WonderfulDetail() {  // 感冒咳嗽
      this.$router.push({
        path: '/home/panacea',
        query: { keyword: '感冒咳嗽', panaceaId: '10' }
      });
    },
    WonderfulDetail2() {  // 消化不良
      this.$router.push({
        path: '/home/panacea',
        query: { keyword: '消化不良', panaceaId: '6' }
      });
    },
    WonderfulDetail3() {  // 乳腺增生
      this.$router.push({
        path: '/home/panacea',
        query: { keyword: '乳腺增生', panaceaId: '8' }
      });
    },
    // 加入购物车
    shopCar(goods) {
      let pId = goods.productId ? goods.productId : '';
      let getByself = goods.getByself ? goods.getByself : '';
      let getFast = goods.getFast ? goods.getFast : '';
      let getCommon = goods.getCommon ? goods.getCommon : '';
      let recommendId = goods.recommendId ? goods.recommendId : '';
      let isTransnational = goods.isTransnational ? goods.isTransnational : false;
      if (goods.pSource === 'drugStore') {
        goods.getFast = goods.userId;
      } else if (goods.pSource === 'mall') {
        goods.getCommon = goods.userId;
      } else if (goods.pSource === 'cabinet') {
        goods.getByself = goods.userId;
      }
      let isotc = goods.isOtc.toString();
      if (isotc === '2') {
        prescCall(goods.productName, goods.pId);
        return false;
      }
      addShop(pId, getByself, getFast, getCommon, recommendId, isTransnational).then(res => {
        if (res.data.resultCode === '0') {
          bus.$emit('txt', 'add');
          Toast(res.data.msg);
          let productId = sessionStorage.getItem('addProductId');
          let productIds = productId ? productId.split(',').map(Number) : [];
          productIds.push(pId);
          sessionStorage.setItem('addProductId', productIds);
        } else if (res.data.resultCode === '-2') {
          Toast('用户未登录，请先登录');
          goLogin();
        } else {
          Toast(res.data.msg);
        }
      });
    },
    // 跳转到商品详情
    goRoute(item) {
      let query = {
        productId: item.productId,
        getByself: item.getByself,
        getCommon: item.getCommon,
        getFast: item.getFast,
      };
      this.$router.push({
        path: '/goods/goodsDetail',
        query: query
      });
    },
    // 热搜
    hotSearch() {
      let param = {
        pageNum: '1',
        pageSize: '50',
      };
      javaAjax.post(`/mall/productRecommend/getProductRecommendList`, param).then((res) => {
        if (res.status === 200 && res.data.resultCode === '0') {
          if (res.data.resultData.length <= 50 ? res.data.resultData : res.data.resultData.splice(0, 50)) {
            console.log(res);
            this.hotGoods = res.data.resultData;
          }
        }
      }).catch((msg) => {
        console.log('msg');
      });
    }
  },
  created() {
    this.hotSearch();
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/mixin.less";
@color: #333;
@background: #fff;
.chineseDrugWrapper {
  background: #efeff4;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}
.mint-header {
  background: @green-color;
}
.page {
  position: absolute;
  top: 0px;
  left: 0;
  padding-bottom: 40px;
  width:100%;
  padding-top: 44px;
  .banner {
    width: 100%;
    height: 105px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .Navigation {
    width: 100%;
    height: 115px;
    background: @background;
    .Navigation-top {
      width: 100%;
      height: 88px;
      display: flex;
      border-bottom: 1px solid #eeeeee;
      .drugs {
        display: block;
        width: 25%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        img {
          width: 40px;
          height: 40px;
        }
        span {
          color: @color;
          font-size: 12px;
        }
      }
    }
    .Navigation-bottom {
      width: 100%;
      height: 27px;
      display: flex;
      a {
        width: 25%;
        display: block;
        height: 27px;
        line-height: 27px;
        text-align: center;
        position: relative;
        transform: scale(0.9);
        img {
          width: 11px;
          height: 11px;
          position: absolute;
          top: 9px;
          left: 18px;
        }
        span {
          color: #e73534;
          font-size: 10px;
          margin-left: 18px;
        }
      }
    }
  }
  .marginBottom {
    margin-bottom: 10px;
  }
  .pCommon {
    background: @background;
    width: 100%;
    height: 45px;
    line-height: 44px;
    padding-left: 13px;
    color: @color;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }
  .p{
    border: none;
  }
  .Recuperation {
    background: @background;
    width: 100%;
    height: 125px;
    overflow: hidden;
    .performancePic {
      .PIC {
        width: 100%;
        height: 80px;
        overflow-x: scroll;
        white-space: nowrap;
        // overflow: hidden;
        img {
          width: 145px;
          height: 70px;
          padding:0 8px;
          box-sizing: border-box;
        }
      }
    }
  }
  .ConsultationOnline {
    width: 100%;
    height: 199px;
    background: @background;
    a {
      display: block;
      height: 95px;
      img {
        width: 100%;
        height: 95px;
      }
    }
    .Symptom {
      display: flex;
      height: 60px;
      span {
        display: block;
        width: 25%;
        text-align: center;
        img {
          width: 79px;
          height: 27px;
          margin-top: 18px;
        }
      }
    }
  }
  .hotSale {
    background: #efeff4;
    width: 100%;
    .product {
      background: @background;
      height: 140px;
      display: flex;
      .productPic {
        width: 44%;
        height: 122px;
        margin: 8px 10px 0 13px;
        img{
          width: 100%;
          height: 100%;
          display: inline-block;
          border:1px solid #ccc;
        }
      }
      .productDetails {
        margin-right: 13px;
        position: relative;
        h3 {
          height: 34px;
          line-height: 16px;
          color: @color;
          font-size: 12px;
          margin: 16px 25px 0px 0;
        }
        .discribe {
          color: #9e9e9e;
          font-size: 11px;
        }
        p {
        .multi-text-overflow(2);
          margin: 0 15px 0 0;
          height: 38px;
        }
        i {
          display: block;
          width: 100px;
          height: 18px;
          line-height: 12px;
        }
        span {
          display: inline-block;
          color: #888;
          font-size: 11px;
          height: 20px;
          line-height: 18px;
        }
        .price {
          span {
            display: block;
            color: #f94f4f;
            font-size: 14px;
            margin-left: 3px;
          }
        }
        img {
          width: 20px;
          height: 20px;
          position: absolute;
          bottom: 17px;
          right: 5px;
        }
      }
    }
  }
}
</style>

<template>
<div class="travelEssential" :class="from!=='app' && from!=='appv2'?'pdt44':''">
  <mt-header fixed title="精选好药" v-if="from !== 'app' && from!=='appv2'">
    <router-link to="" slot="left">
      <mt-button icon="back" @click="goback"></mt-button>
    </router-link>
  </mt-header>
  <div class="travelEssential-mian">
    <!-- banner -->
    <img class="travelEssential-banner" src="./img/travelEssential/banner.jpg" alt="">
    <!-- 商品列表 -->
    <div v-for="item in listData" :key="item.index">
      <div class="list-til">
        <img v-if="item.title == '腹泻防治'" src="./img/travelEssential/diarrhea.png" alt="">
        <img v-if="item.title == '创伤应急'" src="./img/travelEssential/trauma.png" alt="">
        <img v-if="item.title == '对抗感冒'" src="./img/travelEssential/cold.png" alt="">
        <img v-if="item.title == '清热泻火'" src="./img/travelEssential/clearingHeat.png" alt="">
        <img v-if="item.title == '消化不良'" src="./img/travelEssential/indigestion.png" alt="">
        <img v-if="item.title == '应对过敏'" src="./img/travelEssential/allergy.png" alt="">
        <img v-if="item.title == '预防晕车'" src="./img/travelEssential/carsickness.png" alt="">
      </div>
      <ul class="listData">
        <li v-for="goods in item.product" :key="goods.index" @click="detail(goods)">
          <img class="hotsell" src="./img/travelEssential/hotsell.png" alt="">
          <div class="shopImg">
            <img :src="goods.productmainimage" alt="">
          </div>
          <div class="kongbai"></div>
          <div class="shopName">
            {{goods.productname}}
          </div>
          <div class="shopDescribe" style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
            {{goods.description}}
          </div>
          <div class="shopPrice">
            ¥{{Number(goods.productmarkprice).toFixed(2)}}
          </div>
          <div class="shopCart"></div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import request from '@/utils/ajax';
import { getQueryString } from '@/utils/index';
export default {
  data() {
    return {
      from: '',
      id: this.$route.query.id,
      // id: '5c458959f865d43210ceccaf',
      listData: [],
    };
  },
  methods: {
    getData() {
      // let _self = this;
      request.get('/api/home/goodDrugTemplate', {
        params: {
          id: this.id
        }
      }).then(res => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          this.listData = res.data.data.content;
        }
      });
    },
    detail(data) {
      console.log(data);
      let _self = this;
      if (data && _self.from === 'app') {
        // console.log(`药品名:${data.productName},ID:${data.productId}`);
        /* eslint-disable */
        HealthBAT.toGoodsDetail(data.productid);
      }
      else if (data && _self.from === 'appv2') {
        let data2 = {
          productId: data.productid,
          getByself: data.getbyself,
          getFast: data.getfast,
          getCommon: data.getcommon,
          transnationalId: ''
        };
        let strData = JSON.stringify(data2);
        HealthBAT.newToGoodsDetail(strData);
      }
      else {
        _self.$router.push({
          path: '/goods/goodsDetail',
          query: {
            productId: data.productid,
            getByself: data.getbyself,
            getFast: data.getfast,
            getCommon: data.getcommon
          }
        });
      }
    },
    goback() {
      location.href = '/';
    }
  },
  created() {
    let _self = this;
    let from = getQueryString('from');
    _self.from = from;
    this.getData();
  }
};
</script>

<style scoped lang="less">
.pdt44 {
  padding-top: 44px;
}
.travelEssential{
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .travelEssential-mian{
    width: 100%;
    background: url(./img/travelEssential/background.png);
    overflow: auto;
    padding-bottom: 10vw;
    .travelEssential-banner{
      width: 100%;
    }
  }
}
// 商品列表
.list-til{
  height: 17.333333vw;
  display: flex;
  align-items: center;
  justify-content: center;
  >img{
    width: 70.93333vw;
    height: 11.73333vw;
  }
}
.listData{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 2.66666vw;
  padding-top: 0.666667vw;
  li{
    width: 46.66667vw;
    height: 74.66667vw;
    background: #ffffff;
    border-radius: 1.06667vw;
    margin-bottom: 1.33333vw;
    position: relative;
    padding: 0 3.33333vw;
    padding-top: 5.6vw;
    .hotsell{
      position: absolute;
      width: 10.1333333vw;
      height: 8.4vw;
      left: 2.66666vw;
      top: -0.93333vw;
    }
    .kongbai{
      height: 3vw;
    }
    .shopImg{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30.4vw;
      >img{
        max-width: 100%;
        max-height: 30.4vw;
      }
    }
    .shopName{
      height: 5.866667vw;
      line-height: 5.866667vw;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowarp;
      font-size: 3.73333vw;
      color: #000;
      font-weight: bold;
    }
    .shopDescribe{
      height: 36px;
      line-height: 18px;
      font-size: 12px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .shopPrice{
      color: #dc1924;
      height: 7.33333vw;
      line-height: 7.33333vw;
      text-align: center;
      font-size: 4.2vw;
      font-weight: bold;
    }
    .shopCart{
      width: 42.266667vw;
      height: 10.133333vw;
      text-align: center;
      line-height: 8vw;
      color: #fff;
      background: url(./img/travelEssential/cart.png);
      background-size: 100% 100%;
    }
  }
}
</style>

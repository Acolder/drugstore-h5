<template>
  <div :class="from!=='app'?'has-header':''">
    <mt-header fixed title="跨境购药" v-if="from!=='app'">
      <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="banner-box">
      <img src="./img/crossBorder/banner.jpg" />
    </div>
    <div class="content-boxs">
      <div class="content-box hot-sell">
        <img class="title" src="./img/crossBorder/zt_pla_rexiao.png"/>
        <ul>
          <li v-for="hotDrugs in hotDrug" :key="hotDrugs.productId" @click="goDetail(hotDrugs.productId, hotDrugs.transnational)">
            <img :src="hotDrugs.productMainImage"/>
            <div class="drug-name">{{hotDrugs.productName}}</div>
            <div class="drug-price">￥{{Number(hotDrugs.productMarkprice).toFixed(2)}}</div>
          </li>
        </ul>
      </div>
      <div class="content-box global-drugs">
        <img class="title1" src="./img/crossBorder/zt_pla_quanqiuzhic.png"/>
        <ul class="display-box country-list">
          <li v-for="countryDatas in countryData" :key="countryDatas.transnationalId" @click="goCountry(countryDatas.transnationalId,countryDatas.transnationalDetail)">
            <img :src="countryDatas.transnationalImage" />
            <p>{{countryDatas.transnationalName}}</p>
          </li>
        </ul>
      </div>
      <div class="content-box hot-sell">
        <img class="title" src="./img/crossBorder/zt_pla_muying.png"/>
        <ul>
          <li v-for="momBabyDrugs in momBabyDrug" :key="momBabyDrugs.productId" @click="goDetail(momBabyDrugs.productId, momBabyDrugs.transnational)">
            <img :src="momBabyDrugs.productMainImage"/>
            <div class="drug-name">{{momBabyDrugs.productName}}</div>
            <div class="drug-price">￥{{Number(momBabyDrugs.productMarkprice).toFixed(2)}}</div>
          </li>
        </ul>
      </div>
      <!-- <div class="content-box hot-sell last-hot-sell">
        <img class="title" src="./img/crossBorder/zt_pla_xinyao.png"/>
        <ul>
          <li v-for="momBabyDrugs in momBabyDrug" :key="momBabyDrugs.productId" @click="goDetail(momBabyDrugs.productId, momBabyDrugs.transnational)">
            <img :src="momBabyDrugs.productMainImage"/>
            <div class="drug-name">{{momBabyDrugs.productName}}</div>
            <div class="drug-price">￥{{momBabyDrugs.productMarkprice}}</div>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<script>
import javaAjax from '@/utils/javaApiRequest';
import { getQueryString } from '@/utils/index';
export default {
  data() {
    return {
      from: '',
      hotDrug: [],
      momBabyDrug: [],
      newDrug: [],
      countryData: []
    };
  },
  created() {
    let from = getQueryString('from');
    this.from = from;
  },
  mounted() {
    this.getData();
    this.getCountry();
  },
  methods: {
    // 获取三大类商品详情
    getData() {
      let url = '/mall/special/getSpecialKJDS';
      javaAjax.get(url).then((res) => {
        if (res.status === 200) {
          let resData = res.data;
          if (resData.resultCode === '0') {
            this.hotDrug = resData.resultData['药品推荐'];
            this.momBabyDrug = resData.resultData['母婴用品'];
            this.newDrug = resData.resultData['新特效药'];
            // console.log(this.hotDrug);
            // console.log(this.momBabyDrug);
            // console.log(this.newDrug);
          }
        }
      });
    },
    // 到商品详情页
    goDetail(productId, transnationalId) {
      if (this.from === 'app') {
        let data = {
          productId: productId,
          transnationalId: transnationalId
        };
        let dataStr = JSON.stringify(data);
        /* eslint-disable */
        HealthBAT.toTransnationalGoodsDetail(dataStr);
      }
      else {
        this.$router.push({
          path: '/goods/goodsDetail',
          query: {
            productId: productId,
            getByself: '',
            getFast: '',
            getCommon: '',
            getTransnational: transnationalId
          }
        });
      }
    },
    // 获取国家
    getCountry() {
      let url = '/mall/transnational/queryCategory';
      javaAjax.get(url).then((res) => {
        if (res.status === 200) {
          let resData = res.data;
          if (resData.resultCode === '0') {
            this.countryData = resData.resultData;
            let deguoImg = 'https://uploads.kangmei.com.cn/Files/20180718/mooymsei.4dc.png';
            let meiguoImg = 'https://uploads.kangmei.com.cn/Files/20180718/gehw45mm.oko.png';
            let jianadaImg = 'https://uploads.kangmei.com.cn/Files/20180718/5at2dhvg.o3h.png';
            let yazhouImg = 'https://uploads.kangmei.com.cn/Files/20180718/0ygyrbo4.thc.png';
            let ouzhouImg = 'https://uploads.kangmei.com.cn/Files/20180718/jdjw5hjv.5q0.png';
            let aozhouImg = 'https://uploads.kangmei.com.cn/Files/20180718/ia0z541e.v2s.png';
            // let countryDataImg = ['https://uploads.kangmei.com.cn/Files/20180718/mooymsei.4dc.png',
            //                       'https://uploads.kangmei.com.cn/Files/20180718/gehw45mm.oko.png',
            //                       'https://uploads.kangmei.com.cn/Files/20180718/5at2dhvg.o3h.png',
            //                       'https://uploads.kangmei.com.cn/Files/20180718/0ygyrbo4.thc.png',
            //                       'https://uploads.kangmei.com.cn/Files/20180718/jdjw5hjv.5q0.png',
            //                       'https://uploads.kangmei.com.cn/Files/20180718/ia0z541e.v2s.png']
            for(let i =0;i < this.countryData.length;i++){
               if(this.countryData[i].transnationalName === '德国馆'){
                this.countryData[i].transnationalImage =  deguoImg
              } else if (this.countryData[i].transnationalName ===  '美国馆'){
                this.countryData[i].transnationalImage =  meiguoImg
              } else if(this.countryData[i].transnationalName ===  '加拿大馆'){
                this.countryData[i].transnationalImage =  jianadaImg
              } else if(this.countryData[i].transnationalName ===  '亚洲馆'){
                this.countryData[i].transnationalImage =  yazhouImg
              } else if(this.countryData[i].transnationalName ===  '欧洲馆'){
                this.countryData[i].transnationalImage =  ouzhouImg
              } else if(this.countryData[i].transnationalName === '澳洲馆'){
                this.countryData[i].transnationalImage =  aozhouImg
              }
            }
          }
        }
      });
    },
    // 跳国家详情页
    goCountry(tId, tDetail) {
      let query = {
        transnationalId: tId,
      }
      if(this.from) {
        query.from = this.from;
      }
      this.$router.push({
        path: '/special/global',
        query: query
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../styles/common.less';
@import '../../styles/mixin.less';
@purple-color: #6901d0;
.banner-box{
  width: 100%;
  height: 88.8vw;
  padding-bottom: 4vw;
  img{
    width: 100%;
    height: 88.8vw;
  }
}
.content-boxs{
  width: 100%;
  background: #92eaff;
  padding-bottom: 18.666667vw;
  .title{
    display: block;
    width: 42%;
    margin: 0 auto 3.2vw;
    position: relative;
    z-index: 5;
  }
  .title1{
    display: block;
    width: 64%;
    // height: 55px;
    margin: 0 auto 3.2vw;
    position: relative;
    z-index: 5;
  }
}
.hot-sell ul{
  background: #c4f4ff;
  height: 65.066667vw;
  margin-top: -9.33333vw;
  padding: 9.066667vw 0 4vw 2.666667vw;
  display: -webkit-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling:touch;
  margin-bottom: 5.33333vw;
  li{
    width: 29.333333vw;
    height: 195 52vw;
    background: #ffffff;
    margin-right: 2.666667vw;
    img{
      width: 29.333333vw;
      height: 32.8vw;
    }
    .drug-name{
      color: #000;
      padding:0 2.666667vw;
      height: 9.33333vw;
      overflow:hidden;
      text-overflow:ellipsis;
      line-height: 4.8vw;
      margin-bottom: 3.2vw;
    }
    .drug-price{
      font-size: 3.2vw;
      color: #ff6d74;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 3.2vw;
    }
  }
}
.global-drugs{
  margin-top: -2.666667vw;
}
.global-drugs ul{
  height: 81.33333vw;
  border: 0.5333333vw solid #fff;
  margin-left: 1.866667vw;
  margin-right: 1.866667vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #c4f4ff;
  margin-bottom: 5.33333vw;
  padding: 0 5.866667vw;
  li{
    width: 29.073%;
    height: 31.33333vw;
    margin-top: 4.53333vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    img{
      width: 24.266667vw;
      height: 24.266667vw;
      border-radius: 12vw;
      border: 0.5333333vw solid #fff;
      margin-bottom: 2.666667vw;
    }
  }
  li:nth-child(4),li:nth-child(5),li:nth-child(6),{
    margin-top: -3.733333vw;
  }
}
.last-hot-sell {
  ul{
    margin-bottom: 0px;
  }
}
</style>

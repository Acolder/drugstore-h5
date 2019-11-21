<template>
  <div :class="from!=='app' && from!=='appv2' ?'pdt40':''"  class="specialHome">
    <mt-header fixed title="康美精品" v-if="from!=='app' && from!=='appv2'">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="goback"></mt-button>
      </router-link>
    </mt-header>
    <!-- <img src="./img/specialHome.png" border="0" usemap="#map" />
    <map name="map">
        <area shape="rect" coords="86.5,155,286.5,239" href="javascript:void(0);" @click="detail('药食同源','枸杞')"/>
        <area shape="rect" coords="86.5,240,286.5,324" href="javascript:void(0);" @click="detail('药食同源','龙眼肉')"/>
        <area shape="rect" coords="108,411,273,489" href="javascript:void(0);" @click="detail('火爆热卖','三七粉')"/>
        <area shape="rect" coords="108,490,273,568" href="javascript:void(0);" @click="detail('火爆热卖','菊皇茶')"/>
        <area shape="rect" coords="82,646,293,741" href="javascript:void(0);" @click="detail('滋补养生','西洋参')"/>
        <area shape="rect" coords="82,745,293,839" href="javascript:void(0);" @click="detail('滋补养生','孢子粉')"/>
    </map> -->
    <div class="mian-wrapper">
      <div class="bannerWrap">
        <img src="./img/kmjp/img-banner.png" class="banner" alt="">
      </div>
      <img src="./img/kmjp/img-down.png" class="bgPic"/>

      <div class='ysty clearfix' v-for="(item, index) in listData" :key="index">
        <div class="h2Wrap">
          <img src="./img/kmjp/tit-bt.png" alt="" class="h2Pic">
          <span class="h2common">{{item.title}}</span>
        </div>
        <div class="kmgq" :class="sort%2!==0?'lyr clearfix':''" :style="sort===0?'margin-top:-12px;':''" v-for="(drug, sort) in item.product" :key="drug.productid">
          <div class="click" @click="detail(drug)" ></div>
          <img src="./img/kmjp/img_kw.png" alt="" class="commonCase">
          <div class="kmgq_box">
            <img :src="drug.productmainimage" alt="" class="kmgqPic">
            <div class="kmgq_right">
              <p class="pcommon">
                <i class="weight">
                <!-- <i v-if="drug.productspecification" class="weight"> -->
                  <span class="gg">{{drug.productspecification}}</span>
                </i>
              </p>
              <h3 class="commonH3">{{drug.productname}}</h3>
              <i class="yhj">优惠价</i>
              <span class="price">￥{{Number(drug.productmarkprice).toFixed(2)}}</span>
              <div class="ljqg">
                <img src="./img/kmjp/but-ljgm.png" alt="" class="ljqgPic">
                <span class="label">立即抢购</span>
              </div>
            </div>
          </div>
        </div>
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
      listData: [],
      id: this.$route.query.id
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
        if (res.status === 200 && res.data.code === 0) {
          console.log(res.data.data.content);
          this.listData = res.data.data.content;
          // let listData1Temp = res.data.data.content.filter((item) => item.title === '滋补养生');
          // this.listData1 = listData1Temp[0].product;
          // let listData2Temp = res.data.data.content.filter((item) => item.title === '火爆热卖');
          // this.listData2 = listData2Temp[0].product;
          // let listData3Temp = res.data.data.content.filter((item) => item.title === '药食同源');
          // this.listData3 = listData3Temp[0].product;
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
// @import "../../styles/reset.css";
.clearfix:after{
	content:' ';
	display:block;
	height:0;
	overflow:hidden;
	clear:both;
	}
.specialHome{
  width: 100%;
  height: 100%;
  // position: relative;
  margin: 0 auto;
  .mian-wrapper{
    // position: relative;
    overflow: auto;
    width: 100%;
    // height: 100%;
    .bgPic{
      width: 100%;
      height: 304.53vw;
      position: absolute;
      z-index: -1;
    }
    .bannerWrap{
      display: block;
      width: 100%;
      height: 62.8vw;
      .banner{
        width: 100%;
        height: 100%;
      }
    }
    .h2Wrap{
      width: 100%;
      height: 5.86vw;
      text-align: center;
      position: relative;
      .h2Pic{
        width: 51.87vw;
        height: 5.87vw;
      }
      .h2common{
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -5.55vw;
        color: #f1f5ef;
        font-size: 3.73vw;
        z-index: 99;
        font-weight: bold;
      }
    }
    .ysty{
      width: 100%;
      .hbrm{
        margin-top: -12.27vw;
      }
      .kmgq{
        text-align: center;
        position: relative;
        .click{
          position: absolute;
          left: 50%;
          top: 7.2vw;
          margin-left: -28.8vw;
          width: 58.4vw;
          height: 34.8vw;
          z-index: 1000;
        }
        .commonCase{
          width: 83.2vw;
          height: 59.6vw;
        }
        .kmgqPic{
          float: left;
          position: absolute;
          left: 23.2vw;
          top: 19.2vw;
          width: 23.73vw;
          height: 16.67vw;
        }
        .lyr_pic{
          width: 23.07vw;
          height: 23.73vw;
          top: 13.33vw;
          left: 23.73;
        }
        .jhc1{
          width: 19.33vw;
          height: 18.67vw;
          top: 18.4vw;
          left: 25.6vw;
        }
        .jhc2{
          width: 23.73vw;
          height: 19.47vw;
          top: 16vw;
          left: 23.73vw;
        }
        .jpyw{
          width: 17.6vw;
          height: 15.6vw;
          top: 19.2vw;
          left: 27.2vw;
        }
        .wssq{
          width: 22.27vw;
          height: 15.6vw;
          top: 16.8vw;
          left: 24.53vw;
        }
        .kmgq_right{
          width: 32.53vw;
          height: 32vw;
          float: right;
          position: absolute;
          top: 10.4vw;
          right: 20.67vw;
          font-size: 3.2vw;
          text-align: left;
          padding: 0 0 0 2.13vw;
          .pcommon{
            text-align: right;
            padding-right: 1.8vw;
            .weight{
              display: inline-block;
              // margin-right: -50px;
              // padding: 0 1.8vw;
              // width: 80.5px;
              height: 2.75vw;
              line-height: 2.75vw;
              text-align: center;
              color: #fff;
              background-color: #3993fd;
              border-radius: 1.7vw;
              // transform: scale(.6);
              // margin-right: -1.2vw;
              // font-size: .8vw;
            }
            .gg{
              display: inline-block;
              transform: scale(.65);
            }
          }
          .pjhc{
            margin-right: -1.87vw;
          }
         .commonH3{
           color: #525252;
           font-size: 4vw;
           line-height: 6.67vw;
           font-weight: normal;
           text-align: left;
         }
         .yhj{
           color: #df0000;
           transform: scale(.5);
           font-size: 2.67vw;
         }
         .price{
           font-weight: normal;
           color: #df0000;
           font-size: 4.27vw;
         }
         .ljqg{
           position: relative;
           margin-top: 0.8vw;
           width: 13.33vw;
           height: 3.73vw;
           .ljqgPic{
            width: 13.73vw;
            height: 3.73vw;
            line-height: 3.73vw;
          }
          .label{
            width: 100%;
            height: 100%;
            line-height: 3.2vw;
            text-align: center;
            display: inline-block;
            color: #fcebec;
            transform: scale(.6);
            position: absolute;
            top: 0.27vw;
            left: -0.67vw;
          }
         }
        }
      }
    }
    .lyr{
      margin-top: -23.2vw;
    }
    .hbrm{
      margin-top: -13.33vw;
    }
  }
}
</style>

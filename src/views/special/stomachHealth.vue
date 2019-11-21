<template>
  <div class="newYearGift" :class="from!=='app' && from!=='appv2'?'pdt44':''">
      <mt-header fixed title="精选好药" v-if="from !== 'app' && from!=='appv2'">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="goback"></mt-button>
        </router-link>
      </mt-header>
      <div class="cosmetology-mian">
      <div class="cosmetology-banner">
      <a href="" style="">
        <img src="./img/stomachHealth/banner.png" alt="">
      </a>
    </div>
    <div class="cosmetology-list">
      <ul>
        <section class="sec_bg" v-for="(item, index) in listData" :key="index+'c'" v-if="item.product.length>0">
        <li>
          <h2 :class="{xhbl: item.title === '消化不良',
                       wtwz: item.title === '胃痛胃胀',
                       fzfx: item.title === '腹胀腹泻',
                       cwbj: item.title === '肠胃保健'}"
                       ></h2>
        </li>
        <div class="shopBg">
            <li class="" v-for="(drug, index) in item.product" :key="index + 'b'">
              <div class="line" v-if="index !== 0"></div>
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                  <div class="inner">
                    <div class="li_inner">
                      <div class="img" v-if="index%2 === 0">
                              <img :src="drug.productmainimage" alt="">
                      </div>
                      <div class="box-txt">
                              <div class="txt_inner" :style="{'left': index%2 !== 0 ? '5vw': '0vw'}">
                                  <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.description}}</p>
                                    <div class="pri">
                                      <i class="price">￥</i>
                                      <span>{{drug.productmarkprice.toFixed(2)}}</span>
                                    </div>
                              </div>
                              <div class="shopCar" :style="{'right': index%2 !== 0 ? '3vw': '8.4vw'}">
                              </div>
                      </div>
                      <div class="img" v-if="index%2 !== 0">
                              <img :src="drug.productmainimage" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <div class="btn"></div>
        </div>
        </section>
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
          console.log(res);
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
<style lang="less" scoped>
@import './../../styles/common.less';
.pdt44 {
  padding-top: 44px;
}
.xhbl {
    background:url(./img/stomachHealth/xhbl.png);
}
.fzfx {
    background:url(./img/stomachHealth/fzfx.png);
}
.cwbj {
    background:url(./img/stomachHealth/cwbj.png);
}
.wtwz {
    background:url(./img/stomachHealth/wtwz.png);
}
.newYearGift{
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
 .cosmetology-mian{
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch; 
    background:url(./img/stomachHealth/bg.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .cosmetology-banner{
      width: 100%;
      img{
        width: 100%;
        height: auto;
        position: relative;
        vertical-align: middle;
      }
    }
    h2{
      width: 92.4vw;
	    height: 7.33333333vw;
      background-size: 100% 100%;
      margin: 4vw 0;
      line-height: 9.33333vw;
      position: relative;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .cosmetology-list{
      background-size: 100% 100%;
      ul {
        padding-bottom: 30px;
      }
      .sec_bg {
        width: 100vw;
        overflow: hidden;
        position: relative;
        .shopBg {
          position: relative;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90.5333333vw;
          height: auto;
          background-color: #ffffff;
          // box-shadow: 3px 8px 9px 0px rgba(228, 164, 180, 0.75);
          border: solid 2px #030000;
          border-top-left-radius: 115px 20px;
          border-top-right-radius: 115px 20px;
          border-bottom-left-radius: 115px 20px;
          border-bottom-right-radius: 115px 20px;
          .line {
            width: 79.7333333vw;
            height: 2.2vw;
            background:url(./img/stomachHealth/line.png) no-repeat;
            background-size: cover;
            position: relative;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .btn {
          width: 100%;
          height: 4vw;
        }
      }
      .list-box{
        width: 100%;
        overflow: hidden;
        height: 35vw;
        display: flex;
        justify-content: center;
        align-items: center;
        >div{
          width: 93.6vw;
          height: 38.8vw;
          overflow: hidden;
          .box-main{
            width: 100%;
            height: 100%;
            border: 1px solid #dae8e1;
            border-bottom: none;
            img{
              width: 32vw;
              height: 30.13333vw;
              margin: 6.666667vw 0 0 8vw;
            }
          }
        }
        .inner {
          display: flex;
          justify-content: center;
          .li_inner {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            justify-content: flex-start;

            .img {
                width: 35.6666667vw;
                height: 100%;
                position: relative;
                box-sizing: border-box;
                padding: 7.5vw 3.8vw;
              &>img {
                width: 29.3333333vw;
                height: 24vw;
              }
            }
            .box-txt {
              position: relative;
              flex: 1;
              .txt_inner {
                position: absolute;
                top: 7vw;
                right: 5vw;
                left: 0vw;
                bottom: 6vw;
              }
              .shopCar {
                width: 17.6vw;
                height: 6.66666667vw;
                position: absolute;
                background: url(./img/stomachHealth/buy.png);
                background-size: 100% 100%;
                right: 6.4vw;
                bottom: 6.73333333vw;
            }
              p {
                margin-top: -1.6vw;
                width: 45vw;
                font-size: 3vw;
                font-weight: normal;
                font-stretch: normal;
                line-height: 4vw;
                letter-spacing: 0px!important;
                color: #666666;
                overflow: hidden;
              }
              h3 {
                font-family: 'DIN-Bold';
                // font-stretch: normal;
                font-weight: 700;
                letter-spacing: 0vw;
                margin-bottom: 3vw;
                font-size: 4.8vw;
                // font-size: 20px;
                line-height: 6.33333333vw;
                color: #000000;
              }
              p {
                max-width: 47vw;
                font-family: 'PingFang-SC-Medium';
                font-size: 3.2vw;           
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0vw;
                color: #808080;
                line-height: 4.4vw;
              }
              .pri {
                position: absolute;
                left: -0.4vw;
                bottom: 0.8vw;
                height: 10vw;
                width: 28vw;
                .price {
                    width: 2.13333333vw;
                    height: 2.4vw;
                    font-family: 'DIN-Bold';
                    font-size: 3.2vw;
                    // font-weight: bold;
                    line-height: 16.8vw;
                    letter-spacing: -2px;
                    color: #010000;
                    margin-left: -0.533333333vw;
                }
                span {
                  width: 18.8vw;
                  height: 5.33333333vw;
                  font-size: 7vw;
                  font-family: 'Redular-Bold';
                  font-weight: normal;
                  font-stretch: normal;
                  // line-height: 16.8vw;
                  letter-spacing: -0.4vw;
                  color: #f83c39;
                  margin-left: -0.533333333vw;
                  // -webkit-text-fill-color: #f83c39;
                  -webkit-text-stroke: 1px black;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>


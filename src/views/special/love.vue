<template>
  <div class="mantain" :class="from!=='app' && from!=='appv2'?'pdt44':''">
      <mt-header fixed title="精选好药" v-if="from !== 'app' && from!=='appv2'">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="goback"></mt-button>
        </router-link>
      </mt-header>
      <div class="cosmetology-mian">
      <div class="cosmetology-banner">
      <a href="" style="">
        <!-- <img src="./img/mantain/banner.png" alt=""> -->
      </a>
    </div>
    <div class="bg">
    <div class="cosmetology-list">
      <ul>
        <!-- 月经失调 -->
         <section class="sec_bg" v-if="listData1.length>0">
        <li>
          <h2 :class="{menstruation: true}"></h2>
        </li>
        <div class="shopList rpg">
            <li class="" v-for="(drug, index) in listData1[0].product" :key="index + 'a'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                    <div class="li_inner">
                      <div class="img">
                              <img :src="drug.productmainimage" alt="">
                      </div>
                      <div class="box-txt">
                              <div class="txt_inner">
                                  <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                    <div class="pri">
                                      <i class="price">￥</i>
                                      <span>{{drug.productmarkprice.toFixed(2)}}</span>
                                    </div>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.description}}</p>
                              </div>
                              <div class="shopCar">
                              </div>
                      </div>
                    </div>
                </div>
              </a>
              </div>
              <div class="line" :class="{blue: true && index !== 0}"></div>
            </li>
        </div>
        </section>
         <!-- 气血不足 -->
         <section class="sec_bg" v-if="listData2.length>0">
        <li>
          <h2 :class="{insufficient: true}"></h2>
        </li>
        <div class="shopList rpg">
            <li class="" v-for="(drug, index) in listData2[0].product" :key="index + 'a'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                    <div class="li_inner">
                      <div class="img">
                              <img :src="drug.productmainimage" alt="">
                      </div>
                      <div class="box-txt">
                              <div class="txt_inner">
                                  <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                    <div class="pri">
                                      <i class="price">￥</i>
                                      <span>{{drug.productmarkprice.toFixed(2)}}</span>
                                    </div>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.description}}</p>
                              </div>
                              <div class="shopCar">
                              </div>
                      </div>
                    </div>
                </div>
              </a>
              </div>
              <div class="line" :class="{blue: true && index !== 0}"></div>
            </li>
        </div>
        </section>
        <!-- 痛经 -->
        <section class="sec_bg" v-if="listData3.length>0 || listData4.length>0">
        <li>
          <h2 :class="{ dysmenorrhea: true}"></h2>
        </li>
        <!-- 痛经-内服 -->
        <div class="shopList rpg" v-if="listData3.length>0">
            <div class="one" style=""></div>
            <li class="" v-for="(drug, index) in listData3[0].product" :key="index + 'b'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                    <div class="li_inner">
                      <div class="img">
                              <img :src="drug.productmainimage" alt="">
                      </div>
                      <div class="box-txt">
                              <div class="txt_inner">
                                  <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                    <div class="pri">
                                      <i class="price">￥</i>
                                      <span>{{drug.productmarkprice.toFixed(2)}}</span>
                                    </div>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.description}}</p>
                              </div>
                              <div class="shopCar">
                              </div>
                      </div>
                    </div>
                </div>
              </a>
              </div>
              <div class="line" :class="{blue: true && index !== 0}">
              </div>
            </li>
        </div>
        <!-- 痛经-外用 -->
        <div class="shopList rpg" v-if="listData4.length>0">
            <div class="two" style=""></div>
            <li class="" v-for="(drug, index) in listData4[0].product" :key="index + 'd'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                    <div class="li_inner">
                      <div class="img">
                              <img :src="drug.productmainimage" alt="">
                      </div>
                      <div class="box-txt">
                              <div class="txt_inner">
                                  <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                    <div class="pri">
                                      <i class="price">￥</i>
                                      <span>{{drug.productmarkprice.toFixed(2)}}</span>
                                    </div>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.description}}</p>
                              </div>
                              <div class="shopCar">
                              </div>
                      </div>
                    </div>
                </div>
              </a>
              </div>
              <div class="line" :class="{blue: true && index !== 0}">
              </div>
            </li>
        </div>
        </section>
        <!-- 妇科疾病 -->
        <section class="sec_bg" v-if="listData5.length>0 || listData6.length>0 || listData7.length>0">
        <li>
          <h2 :class="{ ill: true}"></h2>
        </li>
        <!-- 妇科疾病-内服 -->
        <div class="shopList rpg" v-if="listData5.length>0">
            <li class="" v-for="(drug, index) in listData5[0].product" :key="index + 'b'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                    <div class="li_inner">
                      <div class="img">
                              <img :src="drug.productmainimage" alt="">
                      </div>
                      <div class="box-txt">
                              <div class="txt_inner">
                                  <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                    <div class="pri">
                                      <i class="price">￥</i>
                                      <span>{{drug.productmarkprice.toFixed(2)}}</span>
                                    </div>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.description}}</p>
                              </div>
                              <div class="shopCar">
                              </div>
                      </div>
                    </div>
                </div>
              </a>
              </div>
              <div class="line" :class="{blue: true && index !== 0}">
              </div>
            </li>
        </div>
        </section>
        <!-- 更年期综合征 -->
        <section class="sec_bg" v-if="listData5.length>0">
        <li>
          <h2 :class="{ menopause: true}"></h2>
        </li>
        <div class="shopList rpg">
            <li class="" v-for="(drug, index) in listData8[0].product" :key="index + 'g'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                    <div class="li_inner">
                      <div class="img">
                              <img :src="drug.productmainimage" alt="">
                      </div>
                      <div class="box-txt">
                              <div class="txt_inner">
                                  <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                    <div class="pri">
                                      <i class="price">￥</i>
                                      <span>{{drug.productmarkprice.toFixed(2)}}</span>
                                    </div>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.description}}</p>
                              </div>
                              <div class="shopCar">
                              </div>
                      </div>
                    </div>
                </div>
              </a>
              </div>
              <div class="line" :class="{blue: true && index !== 0}">
              </div>
            </li>
        </div>
        </section>
      </ul>
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
      listData1: [],
      listData2: [],
      listData3: [],
      listData4: [],
      listData5: [],
      listData6: [],
      listData7: [],
      listData8: [],
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
          this.listData1 = res.data.data.content.filter((item) => {
            return item.title === '月经失调';
          });
          this.listData2 = res.data.data.content.filter((item) => {
            return item.title === '气血不足';
          });
          this.listData3 = res.data.data.content.filter((item) => {
            return item.title === '痛经-内服';
          });
          this.listData4 = res.data.data.content.filter((item) => {
            return item.title === '痛经-外用';
          });
          this.listData5 = res.data.data.content.filter((item) => {
            return item.title === '妇科疾病';
          });
          this.listData8 = res.data.data.content.filter((item) => {
            return item.title === '更年期综合征';
          });
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
    let title = '精选好药';
    // document.title = title;
    let _self = this;
    let from = getQueryString('from');
    _self.from = from;
    try {
    /* eslint-disable */
    if(from.indexOf('app') >= 0){
      HealthBAT.getTitle(title);
    }
    } catch(e) {
      console.error('设置标题失败');
    }
    this.getData();
  }
};
</script>
<style lang="less" scoped>
@import './../../styles/common.less';
.pdt44 {
  padding-top: 44px;
}
// 月经失调
.menstruation {
    width: 48.2666667vw;
    margin-left: 23.3333334vw;
    background:url(./img/womenDay/menstruation.png);
}
// 气血不足
.insufficient {
    width: 48.2666667vw;
    margin-left: 23.3333334vw;
    background:url(./img/womenDay/insufficient.png);
}
// 痛经
.dysmenorrhea {
    width: 42.5333333vw;
    margin-left: 26.2000001vw;
    background:url(./img/womenDay/dysmenorrhea.png);
}
// 妇科疾病
.ill {
    width: 48.2666667vw;
    margin-left: 23.3333334vw;
    background:url(./img/womenDay/ill.png);
}
// 痛经-外用
.wai {
    background:url(./img/womenDay/wai.png);
}
// 妇科疾病-外用栓剂
.out_1 {
  width: 100%;
  height: 5.33333333vw;
  background-size: cover;
  margin-top: 3vw;
  background-image:url(./img/womenDay/out_1.png);
}
// 妇科疾病-外用洗剂
.out_2 {
  width: 100%;
  height: 5.33333333vw;
  background-size: cover;
  margin-top: 3vw;
  background-image:url(./img/womenDay/out_2.png);
}
// 更年期综合征
.menopause {
    width: 53.3333333vw;
    margin-left: 20.8000001vw;
    background:url(./img/womenDay/menopause.png);
}
.one {
  width: 100%;
  height: 5.33333333vw;
  background-image: url(./img/womenDay/in.png);
  background-size: cover;
}
.two {
  width: 100%;
  height: 5.33333333vw;
  background-image: url(./img/womenDay/wai.png);
  background-size: cover;
  margin-top: 3vw;
}
.mantain{
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
 .cosmetology-mian{
    width: 100%;
    min-height: 100%;
    position: absolute;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background: url(./img/love/banner_love.png) 0 0 no-repeat,
                url(./img/womenDay/bg.png) 0px 0px;
                // url(./img/womenDay/bg.png) 0px 1.04933333vw,
                // url(./img/womenDay/bg.png) 0px 1.04933333vw;
    background-size: 100%;
    .cosmetology-banner{
      width: 100%;
      height: 92.8vw;
      // margin-top: 44px;
      img{
        width: 100%;
        height: auto;
        position: relative;
        vertical-align: middle;
      }
    }
    h2{
      // width: 48.2666667vw;
	    height: 10.2666667vw;
      background-size: 100% 100%;
      margin-bottom: 4vw;
    }
    .cosmetology-list{
      background-size: 100% 100%;
      ul {
        padding-bottom: 30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .shopList {
          background: #fff;
          box-shadow: 1px 1px 18px 0px rgba(0, 0, 0, 0.19);
	        border-radius: 10px;
          li {
            position: relative;
          }
          .line {
            width: 87.3333333vw;
            height: 0.3vw;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            background-size: contain;
            background-repeat: no-repeat;
             &.blue {background-image: url(./img/womenDay/line.png)};
          }
        }
        .rpg {
          border-radius: 1.33333333vw;
        }
      }
      .sec_bg {
        width: 93.3333333vw;
        // background:url(./img/mantain/bg.png) no-repeat;
        background-size: 100vw;
        overflow: hidden;
        margin-bottom: 5vw;
      }
      .list-box{
        width: 100%;
        overflow-x: hidden;
        height: 31.2vw;
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
          .li_inner {
            width: 93.6vw;
            height: 100%;
            display: flex;
            justify-content: flex-start;

            .img {
                width: 36vw;
                height: 100%;
                position: relative;
                box-sizing: border-box;
                padding: 3.8vw 5.8vw;
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
                top: 5vw;
                left: 2vw;
                bottom: 5vw;
              }
              .shopCar {
                  width: 21.3333333vw;
                  height: 6.93333333vw;
                  position: absolute;
                  background: url(./img/womenDay/buy.png);
                  background-size: 100% 100%;
                  right: 4.4vw;
                  bottom: 5.73333333vw;
            }
              h3 {
                font-family: 'DIN-Bold';
                font-stretch: normal;
                letter-spacing: 0vw;
                // margin-bottom: 2vw;
                max-width: 45vw;
                font-size: 4.3vw;
                // font-size: 20px;
                line-height: 6.33333333vw;
                color: #1a1a1a;
              }
              p {
                width: 29vw;
                font-family: 'PingFang-SC-Medium';
                font-size: 2.4vw;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #808080;
                margin-top: 1vw;
                line-height: 4.4vw;
              }
              .pri {
                line-height: 8vw;
                width: 28vw;
                .price {
                width: 2.13333333vw;
                height: 2.8vw;
                font-family: 'DIN-Bold';
                font-size: 4.8vw;
                letter-spacing: -1px;
                color: #eb526f;
                }
                span {
                  width: 18.8vw;
                  height: 5.33333333vw;
                  font-size: 5vw;
                  // font-family: 'DIN-Bold';
                  font-weight: 700;
                  font-stretch: normal;
                  // line-height: 16.8vw;
                  letter-spacing: -1px;
                  color: #eb526f;
                  margin-left: -2px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>


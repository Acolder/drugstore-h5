<template>
  <div class="mantain" :class="from!=='app' && from!=='appv2'?'pdt44':''">
      <mt-header fixed title="春季养生" v-if="from !== 'app' && from!=='appv2'">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="goback"></mt-button>
        </router-link>
      </mt-header>
      <div class="cosmetology-mian">
      <div class="cosmetology-banner">
      <a href="" style="">
        <img src="./img/mantain/banner.png" alt="">
      </a>
    </div>
    <div class="bg">
    <div class="cosmetology-list">
      <ul>
        <!-- 防治过敏 -->
         <section class="sec_bg" v-if="listData1.length>0">
        <li>
          <h2 :class="{allergy: true}"></h2>
        </li>
        <div class="shopList">
            <li class="" v-for="(drug, index) in listData1[0].product" :key="index + 'a'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                  <!-- <div class="inner"> -->
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
                  <!-- </div> -->
                </div>
              </a>
              </div>
              <div class="line" :class="{blue: true && index !== 0}">
                 <span class="hot"><img src="./img/mantain/people.png" alt=""></span>
                 <!-- <span class="hot" v-if="drug.title === '儿童'"><img src="./img/mantain/child.png" alt=""></span> -->
              </div>
            </li>
            <li class="" v-for="(drug, index) in listData2[0].product" :key="index + 'c'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                  <!-- <div class="inner"> -->
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
                  <!-- </div> -->
                </div>
              </a>
              </div>
              <div class="line" :class="{red: true}">
                 <!-- <span class="hot"><img src="./img/mantain/people.png" alt=""></span> -->
                 <span class="hot"><img src="./img/mantain/child.png" alt=""></span>
              </div>
            </li>
            <div class="kindly"></div>
        </div>
        </section>
        <!-- 鼻炎用药 -->
        <section class="sec_bg" v-if="listData3.length>0">
        <li>
          <h2 :class="{ health: true}"></h2>
        </li>
        <!-- 组合一 -->
        <div class="shopList rpg">
            <div class="one" style=""></div>
            <li class="" v-for="(drug, index) in listData3[0].product" :key="index + 'b'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                  <!-- <div class="inner"> -->
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
                  <!-- </div> -->
                </div>
              </a>
              </div>
              <div class="line" :class="{blue: true && index !== 0}">
              </div>
            </li>
        </div>
        <!-- 组合二 -->
        <div class="shopList rpg">
            <div class="two" style=""></div>
            <li class="" v-for="(drug, index) in listData4[0].product" :key="index + 'd'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                  <!-- <div class="inner"> -->
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
                  <!-- </div> -->
                </div>
              </a>
              </div>
              <div class="line" :class="{blue: true && index !== 0}">
              </div>
            </li>
        </div>
        </section>
        <!-- 儿童健康 -->
        <section class="sec_bg" v-if="listData5.length>0">
        <li>
          <h2 :class="{ little: true}"></h2>
        </li>
        <div class="shopList">
            <li class="" v-for="(drug, index) in listData5[0].product" :key="index + 'g'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                  <!-- <div class="inner"> -->
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
                  <!-- </div> -->
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
      listData: [],
      listData1: [],
      listData2: [],
      listData3: [],
      listData4: [],
      listData5: [],
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
            return item.title === '成人';
          });
          this.listData2 = res.data.data.content.filter((item) => {
            return item.title === '儿童';
          });
          this.listData3 = res.data.data.content.filter((item) => {
            return item.title === '组合一';
          });
          this.listData4 = res.data.data.content.filter((item) => {
            return item.title === '组合二';
          });
          this.listData5 = res.data.data.content.filter((item) => {
            return item.title === '儿童健康';
          });
          console.log(this.listData1);
          console.log(this.listData2);
          console.log(this.listData3);
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
.health {
    background:url(./img/mantain/health.png);
}
.allergy {
    background:url(./img/mantain/allergy.png);
}
.little {
    background:url(./img/mantain/little.png);
}
.one {
  width: 100%; 
  height: 5.33333333vw; 
  background-image: url(./img/mantain/combinationOne.png); 
  background-size: cover;
}
.two {
  width: 100%; 
  height: 5.33333333vw; 
  background-image: url(./img/mantain/combinationTwo.png); 
  background-size: cover;
  margin-top: 2.3333333vw;
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
    position: absolute;
    .cosmetology-banner{
      width: 100%;
      // margin-top: 44px;
      img{
        width: 100%;
        height: auto;
        position: relative;
        vertical-align: middle;
      }
    }
    h2{
      width: 48.2666667vw;
	    height: 10.2666667vw;
      background-size: 100% 100%;
      margin-bottom: 4vw;
      margin-left: 23.3333334vw;
    }
    .bg {
      width: 100vw;
      height: auto;
      background:url(./img/mantain/bg.png);
      background-size: 100% center;
      margin-top: -1px;
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
          border-radius: 0px 10px 10px 10px;
          .kindly {
            width: 100%;
            height: 12vw;
            background-size: cover;
            background-image: url(./img/mantain/kindly.png)
          }
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
             &.blue {background-image: url(./img/mantain/blue.png)};
             &.red {background-image: url(./img/mantain/red.png)};
          }
        }
        .rpg {
          border-radius: 10px 10px 10px 10px;
        }
      }
      .sec_bg {
        width: 93.3333333vw;
        // background:url(./img/mantain/bg.png) no-repeat;
        background-size: 100vw;
        overflow: hidden;
        margin-bottom: 4vw;
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
              width: 22.6666667vw;
              height: 7.46666667vw;
              position: absolute;
              background: url(./img/mantain/buy.png);
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
                max-width: 50%;
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
                  font-family: 'Redular-Bold';
                  font-weight: normal;
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
// }
// hot
.hot {
  width: 8.93333333vw;
  height: 4.53333333vw;
  position: absolute;
  top: 0vw;
  left: -3vw;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>


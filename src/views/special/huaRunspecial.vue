<template>
  <div class="mantain" :class="from!=='app' && from!=='appv2'?'pdt44':''">
      <mt-header fixed title="华润三九专场" v-if="from !== 'app' && from!=='appv2'">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="goback"></mt-button>
        </router-link>
      </mt-header>
      <div class="cosmetology-mian">
      <div class="cosmetology-banner">
      <a href="" style="">
        <img src="./img/huaRunspecial/banner.png" alt="">
      </a>
    </div>
    <div class="bg">
    <div class="cosmetology-list">
      <ul>
        <section class="sec_bg" v-for="(item, index) in listData" :key="index" v-if="item.product.length>0">
        <!-- <li>
          <h2 :class="{ little: true}"></h2>
        </li> -->
        <div class="shopList">
            <li class="" v-for="drug in item.product" :key="drug.productid">
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
                                    <div class="line"></div>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.description}}</p>
                                     <div class="pri">
                                          <i class="price">￥</i>
                                          <span>{{drug.productmarkprice.toFixed(2)}}</span>
                                          <span>{{'/'+ drug.productspecification}}</span>
                                     </div>
                              </div>
                              <div class="shopCar">立即购买</div>
                      </div>
                    </div>
                  <!-- </div> -->
                </div>
              </a>
              </div>
              <!-- <div class="line" :class="{blue: true && index !== 0}">
              </div> -->
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
      background-color: #f2f9ea;
      background-size: 100% center;
      margin-top: -1px;
    }
    .cosmetology-list{
      background-size: 100% 100%;
      ul {
        // padding-bottom: 30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .shopList {
          background-color: #f2f9ea;
          li {
            position: relative;
            margin-bottom: 8vw;
          }
        }
        .rpg {
          border-radius: 10px 10px 10px 10px;
        }
      }
      .sec_bg {
        width: 93.3333333vw;
        background-size: 100vw;
        overflow: hidden;
        margin-bottom: 4vw;
      }
      .list-box{
        width: 93.5vw;
        overflow-x: hidden;
        height: 38.6666667vw;
        box-shadow: 0px 20px 20px 0px rgba(204, 230, 171, 0.55);
        border-radius: 40px;
        background-color: rgba(255,246,243, .5);
        box-sizing: border-box;
        border: solid 1px #8eae66;
        // opacity: 0.5;
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
                width: 46vw;
                height: 100%;
                position: relative;
                box-sizing: border-box;
                padding: 3.8vw 5.8vw;
                display: flex;
                justify-content: center;
                align-items: center;
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
                .line {
                  width: 29.6vw;
                  height: 1px;
                  background: #424c17;
                  opacity: 0.5;
                  margin: 6px 0;
                }
              }
              .shopCar {
              width: 22.6666667vw;
              height: 6.66666667vw;
              line-height: 6.66666667vw;
              text-align: center;
              letter-spacing: 2px;
              color: #ffffff;
              font-size: 2.66666667vw;
              position: absolute;
              left: 2.4vw;
              bottom: 3.73333333vw;
	            background-image: linear-gradient(0deg, #df1605 0%,#d55126 100%);
	            border-radius: 25px;
            }
              h3 {
                font-family: 'DIN-Bold';
                font-stretch: normal;
                letter-spacing: 0vw;
                // margin-bottom: 2vw;
                max-width: 45vw;
                font-size: 4.8vw;
                // font-size: 20px;
                line-height: 6.33333333vw;
                color: #678c3e;;
              }
              p {
                max-width: 50%;
                font-family: 'PingFang-SC-Medium';
                font-size: 2.66666667vw;                
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #666;
                margin-top: 1vw;
                line-height: 4.4vw;
              }
              .pri {
                line-height: 4.93333333vw;
                min-width: 22.4vw;
                margin-top: 8px;
                margin-left: -0.533333333vw;
                .price {
                      width: 2.13333333vw;
                      height: 2.8vw;
                      font-family: 'DIN-Bold';
                      font-size: 5.33333333vw;
                      letter-spacing: -1px;
                      color: #dc260e;
                      }
                span:nth-of-type(1) {
                      width: 18.8vw;
                      height: 5.33333333vw;
                      font-family: 'Redular-Bold';
                      font-weight: normal;
                      font-stretch: normal;
                      font-size: 5.33333333vw;
                      letter-spacing: -1px;
                      color: #dc260e;
                      margin-left: -0.666666667vw;
                }
                span:nth-of-type(2) {
                      // width: 18.8vw;
                      // height: 5.33333333vw;
                      font-family: 'DIN-Bold';
                      font-weight: normal;
                      font-stretch: normal;
                      font-size: 2.66666667vw;
                      letter-spacing: 0px;
                      color: #666;
                      margin-left: -0.666666667vw;
                }
              }
            }
          }
        }
      }
    }
  }
</style>


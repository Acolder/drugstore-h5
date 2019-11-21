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
        <img src="./img/newYearGift/banner.jpg" alt="">
      </a>
    </div>
    <div class="bg">
    <div class="cosmetology-list">
      <ul>
        <section class="sec_bg" v-for="(item, index) in listData" :key="index+'c'" v-if="item.product.length>0">
        <li>
          <h2 :class="{love: item.title === '送爱人',
                       child: item.title === '送孩子',
                       old: item.title === '送长辈',
                       friend: item.title === '送朋友'}"></h2>
        </li>
        <!-- 第一种排版 返回数据为奇数个或者个数<=3 -->
        <div v-if="item.product.length%2 !== 0 || item.product.length <= 3">
            <li class="" v-for="(drug, index) in item.product" :key="index + 'b'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                  <div class="inner">
                    <div class="li_inner">
                      <div class="img">
                              <img :src="drug.productmainimage" alt="">
                              <span class="hot"><img src="./img/newYearGift/hot.png" alt=""></span>
                      </div>
                      <div class="box-txt">
                              <div class="txt_inner">
                                  <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{drug.description}}</p>
                                    <div class="pri">
                                      <i class="price">￥</i>
                                      <span>{{drug.productmarkprice.toFixed(2)}}</span>
                                    </div>
                              </div>
                              <div class="shopCar">
                              </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              </div>
            </li>
        </div>
        <!-- 第二种排版 返回数据为偶数个且数据个数>=4 -->
        <div v-if="item.product.length%2 === 0 && item.product.length >= 4">
              <div class="two">
                  <div class="list-box_">
                    <div class="inner_">
                        <li class="" :style="{float: index%2 === 0 ? 'left' : 'right'}" v-for="(drug, index) in item.product" :key="index + 'a'">
                           <a href="javascript:void(0);" @click="detail(drug)">
                           <div class="top">
                              <img :src="drug.productmainimage" alt="">
                              <span class="hot"><img src="./img/newYearGift/hot.png" alt=""></span>
                           </div>
                           <div class="bottom">
                                    <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.description}}</p>
                                    <div class="pri">
                                      <i class="price">￥</i>
                                      <span>{{drug.productmarkprice.toFixed(2)}}</span>
                                      <div class="buy_">
                                      </div>
                                    </div>
                           </div>
                           </a>
                        </li>
                    </div>
                  </div>
              </div>
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
.child {
    background:url(./img/newYearGift/child.png);
}
.old {
    background:url(./img/newYearGift/old.png);
}
.friend {
    background:url(./img/newYearGift/friend.png);
}
.love {
    background:url(./img/newYearGift/love.png);
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
      width: 68.1333333vw;
	    height: 9.73333333vw;
      background-size: 100% 100%;
      margin: 4vw 0;
      margin-left: 16vw;
      line-height: 9.33333vw;
      margin-top: 5.6vw;
    }
    .bg {
      width: 100vw;
      height: auto;
      background:url(./img/newYearGift/bgfalse.png);
      background-size: 100% center;
    }
    .cosmetology-list{
      background-size: 100% 100%;
      ul {
        padding-bottom: 30px;
      }
      .sec_bg {
        width: 100vw;
        background:url(./img/newYearGift/bg.png) no-repeat;
        background-size: 100vw;
        overflow: hidden;
      }
      .list-box{
        width: 100%;
        overflow-x: hidden;
        height: 40.666667vw;
        display: flex;
        justify-content: center;
        align-items: center;
        >div{
          width: 93.6vw;
          height: 38.8vw;
          background: url(./img/newYearGift/w.png);
          background-size: 100%;
          box-shadow: 0vw 0vw 1vw 0vw  rgba(0, 0, 0, 0.1);
          border-radius: 3vw;
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
                width: 46.6666667vw;
                height: 100%;
                position: relative;
                box-sizing: border-box;
                padding: 7.5vw 7.8vw;
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
                right: 2.5vw;
                bottom: 5vw;
              }
              .shopCar {
              width: 9.33333333vw;
              height: 9.33333333vw;
              position: absolute;
              background: url(./img/newYearGift/buy.png);
              background-size: 100% 100%;
              right: 6.4vw;
              bottom: 5.73333333vw;
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
                font-stretch: normal;
                letter-spacing: 0vw;
                margin-bottom: 3vw;
                font-size: 4.3vw;
                // font-size: 20px;
                line-height: 6.33333333vw;
                color: #1a1a1a;
              }
              p {
                max-width: 47vw;
                font-family: 'PingFang-SC-Medium';
                font-size: 2.66666667;                
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0vw;
                color: #666666;
                line-height: 4.4vw;
              }
              .pri {
                position: absolute;
                left: 0;
                bottom: 1.5vw;
                height: 10vw;
                width: 28vw;
                .price {
                width: 2.13333333vw;
                height: 2.8vw;
                font-family: 'DIN-Bold';
                font-size: 3.7333333vw;
                // font-weight: bold;
                line-height: 16.8vw;
                letter-spacing: -2px;
                color: #bb1e2d;
                }
                span {
                  width: 18.8vw;
                  height: 5.33333333vw;
                  font-size: 6.5vw;
                  font-family: 'DIN-Bold';
                  font-weight: normal;
                  font-stretch: normal;
                  // line-height: 16.8vw;
                  letter-spacing: -2px;
                  color: #bb1e2d;
                  margin-left: -2px;
                }
              }
            }
          }
        }
      }
    }
  }
}
// hot
.hot {
  width: 5.7333333vw;
  height: 5.3333333vw;
  position: absolute;
  top: 3.86666667vw;
  left: 4.4vw;
  img {
    width: 100%;
    height: 100%;
  }
}
// 第二种排版
.two {
  // height: 59.6vw;
  .list-box_ {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .inner_ {
          width: 93.6vw;
       li {
          background: url(./img/newYearGift/h.png);
          background-size: 100%;
          width: 45.3333333vw;
          height: 59.6vw;
          float: left;
          margin-bottom: 7px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          // div {
          //   flex: 1;
          // }
          .top {
            height: 34.4vw;
            box-sizing: border-box;
            padding: 6.5vw 7.8vw;
            position: relative;
            &>img {
                width: 29.3333333vw;
                height: 24vw;
            }
          }
          .bottom {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            h3 {
                text-align: center;
                font-size: 4.3vw;
                color: #1a1a1a;
                line-height: 6.33333333vw;
                max-width: 80%;
                margin-bottom: 0.8vw;
            }
             p {
                max-width: 77%;
                // height: 5.66666667vw;
                font-size: 3vw;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0vw;
                line-height: 4vw;
                color: #666666;
              }
              .pri {
                width: 100%;
                height: 12.6666667vw;
                box-sizing: border-box;
                padding-left: 6vw;
                padding-bottom: 4vw;
                position: relative;
                 .price {
                width: 2.13333333vw;
                height: 2.8vw;
                font-family: 'DIN-Bold';
                font-size: 3.7333333vw;
                line-height: 14.8vw;
                letter-spacing: -2px;
                color: #bb1e2d;
                }
                span {
                  width: 18.8vw;
                  height: 5.33333333vw;
                  font-size: 6.5vw;
                  font-family: 'DIN-Bold';
                  font-weight: normal;
                  font-stretch: normal;
                  // line-height: 16.8vw;
                  letter-spacing: -2px;
                  color: #bb1e2d;
                  margin-left: -2px;
                }
                .buy_ {
                  width: 9.33333333vw;
                  height: 9.33333333vw;
                  position: absolute;
                  background: url(./img/newYearGift/buy.png);
                  background-size: 100% 100%;
                  right: 6.4vw;
                  bottom: 2.5vw;
                }
              }
          }
      }
    }
  }
}
</style>


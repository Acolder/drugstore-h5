<template>
  <div class="newYearGift" :class="from!=='app' && from!=='appv2'?'pdt44':''">
      <mt-header fixed title="热卖推荐" v-if="from !== 'app' && from!=='appv2'">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="goback"></mt-button>
        </router-link>
      </mt-header>
      <div class="cosmetology-mian">
      <div class="cosmetology-banner">
      <a href="" style="">
        <img :class="from!=='app' && from!=='appv2'?'pdt45':''" src="./img/travel/banner_cycb.png" alt="">
      </a>
    </div>
    <div class="bg">
    <div class="cosmetology-list">
      <ul>
        <section class="sec_bg" v-for="(item, index) in listData" :key="index+'c'" v-if="item.product.length>0">
        <li>
          <div class="title">
            <div class="title_bg_l"></div>
            <div class="title_bg_r"></div>
            <div class="text"><i>{{item.title}}</i></div>
          </div>
        </li>
        <!--  -->
        <div class="">
            <li class="" v-for="(drug, index) in item.product" :key="index + 'b'">
              <div class="">
              <a href="javascript:void(0);" @click="detail(drug)">
                <div class="list-box">
                  <div class="inner">
                    <div class="li_inner">
                      <div class="img">
                          <img :src="drug.productmainimage" alt="">
                      </div>
                      <div class="box-txt">
                              <div class="txt_inner">
                                  <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                    <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{drug.description}}</p>
                                    <div class="pri">
                                      <div class="pri_left">
                                        <i>￥</i>
                                        <i>特惠价</i>
                                      </div>
                                      <div class="pri_center">
                                        <i>{{drug.productmarkprice}}<em>元</em></i>
                                      </div>
                                      <div class="pri_right">
                                        <em>立即<br/>抢购</em>
                                      </div>
                                    </div>
                              </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              </div>
            </li>
        </div>
        </section>
        <div class="foot"></div>
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
    let title = '热卖推荐'
    // document.title = title;
    let _self = this;
    let from = getQueryString('from');
    _self.from = from;
    try{
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
.pdt45 {
  margin-top: -44px;
}
.foot {
  width: 100%;
  height: 40vw;
  background-image: url(./img/travel/picture_bottom_bg.png);
  background-size: cover;
}
.title {
  position: relative;
  top: 0;
  left: 0;
  width: 68.1333333vw;
	height: 9.73333333vw;
  background-size: 100% 100%;
  margin: 2.66666667vw 0;
  margin-left: 16vw;
  line-height: 9.33333vw;
  margin-top: 5.6vw;
  .text {
    width: 100%;
    height: 100%;
    background-color: #ff2a57;
    box-shadow: 1px 2px 13px 0px rgba(59, 163, 143, 0.6);
    border-radius: 8px;
    text-align: center;
    font-size: 4.4vw;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    // z-index: 1;
  }
}
.title_bg_l {
  width: 24vw;
  height: 10vw;
  position: absolute;
  top: -5.86666667vw;
  left: 50%;
  transform: translateX(-153%);
  background-image: url(./img/travel/icon_yt_l.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.title_bg_r {
  width: 24vw;
  height: 10vw;
  position: absolute;
  top: -5.86666667vw;
  left: 50%;
  transform: translateX(53%);
  background-image: url(./img/travel/icon_yt_r.png);
  background-repeat: no-repeat;
  background-size: cover;
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
    .bg {
      width: 100vw;
      height: auto;
      margin-top: -22.6666667vw;
      background-color: #e1efca;
      background-size: 100% center;
    }
    .cosmetology-list{
      background-size: 100% 100%;
      .sec_bg {
        width: 100vw;
        background-size: 100vw;
        overflow: hidden;
        padding-top: 3.66666667vw
      }
      .list-box{
        width: 100%;
        overflow-x: hidden;
        height: 37.666667vw;
        display: flex;
        justify-content: center;
        align-items: center;
        >div{
          width: 93.6vw;
          height: 34.6666667vw;
          background-color: #FFF;
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
                width: 41.6666667vw;
                height: 100%;
                position: relative;
                box-sizing: border-box;
                padding: 4vw 7.8vw 4vw 5.33333333vw;
              &>img {
                width: 26.6666667vw;
                height: 26.6666667vw;
              }
            }
            .box-txt {
              position: relative;
              flex: 1;
              .txt_inner {
                position: absolute;
                top: 4.73333333vw;
                right: 5.5vw;
                bottom: 6.4vw;
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
                // font-family: 'DIN-Bold';
                font-stretch: normal;
                font-weight: 700;
                letter-spacing: 0vw;
                margin-bottom: 3vw;
                font-size: 4.8vw;
                // font-size: 20px;
                line-height: 6.33333333vw;
                color: #039076;
              }
              p {
                max-width: 47vw;
                font-family: 'PingFang-SC-Medium';
                font-size: 2.93333333vw;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0vw;
                color: #039076;
                line-height: 4.4vw;
              }
              .pri {
                position: absolute;
                left: 0;
                bottom: -1vw;
                height: 7.5vw;
                width: 26.9333333vw;
                background-image: url(./img/travel/button.png);
                background-size: cover;
                display: flex;
                justify-content: flex-start;
                .pri_left {
                   flex: 1;
                   position: relative;
                   i:nth-child(1) {
                     position: absolute;
                     top: 2px;
                     right: 0;
                     color: #fff;
                     letter-spacing: 0vw;
                     line-height: 3.7vw;
                     font-size: 3.2vw!important;
                      -webkit-transform-origin-x: 0;
                      -webkit-transform: scale(0.58);
                   }
                   i:nth-child(2) {
                     position: absolute;
                     width: 12.8vw;
                     bottom: 3px;
                     left: 1.933333333vw;
                     color: #fff;
                     letter-spacing: 0vw;
                     line-height: 3.7vw;
                     font-size: 3.2vw;
                      -webkit-transform-origin-x: 0;
                      -webkit-transform: scale(0.58);
                   }
                }
                .pri_center {
                   flex: 1;
                   display: flex;
                   flex-direction: column;
                   justify-content: flex-start;
                   i {
                     color: #fff;
                     font-size: 4.3vw;
                     width: 100%;
                     height: 100%;
                     line-height: 8.5vw;
                     position: relative;
                     text-align: center;
                     margin-left: -1vw;
                     font-family: 'MicrosoftYaHei';
                     em {
                       position: absolute;
                       top: 2px;
                       right: -3vw;
                       letter-spacing: 0vw;
                       font-size: 3.2vw!important;
                       -webkit-transform-origin-x: 0;
                       -webkit-transform: scale(0.58);
                     }
                   }
                }
                .pri_right {
                   flex: 1;
                   display: flex;
                   flex-direction: column;
                   justify-content: center;
                   align-items: center;
                   em {
                     width: 100%;
                     height: 100%;
                     text-align: right;
                     color: #666;
                     font-weight: 700;
                     letter-spacing: 0vw;
                     margin-left: 1vw;
                     line-height: 3.7vw;
                     font-size: 3.2vw!important;
                     -webkit-transform-origin-x: 0;
                     -webkit-transform: scale(0.75);
                   }
                }
                // background-image: linear-gradient(0deg, #0e694a 0%, #009980 100%);
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
</style>


<template>
  <div class="newYear" :class="from!=='app' && from!=='appv2'?'pdt44':''">
      <mt-header fixed title="冬季滋补" v-if="from !== 'app' && from!=='appv2'">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="goback"></mt-button>
        </router-link>
      </mt-header>
      <div class="cosmetology-mian">
      <div class="cosmetology-banner">
      <a href="">
        <img src="./img/newYear/banner.png" alt="">
      </a>
    </div>
    <div class="bg">
    <div class="cosmetology-list">
      <ul>
        <section v-for="(item, index) in listData" :key="index">
        <li v-if="item.product.length>0">
          <h2 :class="{t1: item.title === '补气养血',
                       t2: item.title === '补益安神',
                       t3: item.title === '养生花茶',
                       t4: item.title === '精选佳品'}"></h2>
        </li>
        <li class="" v-for="drug in item.product" :key="drug.productid">
          <div class="">
          <a href="javascript:void(0);" @click="detail(drug)">
            <div class="list-box">
              <div class="inner">
                <div class="li_inner">
                  <div class="img">
                          <img :src="drug.productmainimage" alt="">
                          <!-- <img src="./img/newYear/cs.png" alt=""> -->
                  </div>
                  <div class="box-txt">
                          <div class="txt_inner">
                               <h3 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{drug.productname}}</h3>
                                <p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">{{drug.description}}</p>
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
          console.log(res.data.data.content);
          this.listData = res.data.data.content;
          // let listData1Temp = res.data.data.content.filter((item) => item.title === '补气养血');
          // this.listData1 = listData1Temp[0].product;
          // let listData2Temp = res.data.data.content.filter((item) => item.title === '补益安神');
          // this.listData2 = listData2Temp[0].product;
          // let listData3Temp = res.data.data.content.filter((item) => item.title === '养生花茶');
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
<style lang="less" scoped>
@import './../../styles/common.less';
.pdt44 {
  padding-top: 44px;
}
.t1 {
    background:url(./img/newYear/title.png);
}
.t2 {
    background:url(./img/newYear/title_two.png);
}
.t3 {
    background:url(./img/newYear/title_three.png);
}
.t4 {
    background:url(./img/newYear/title_four.png);
}
.newYear{
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
      }
    }
    h2{
      width: 78vw;
	    height: 10vw;
      // background:url(./img/newYear/title.png);
      background-size: 100% 100%;
      margin: 4vw 0;
      margin-left: 12vw;
      font-size: 4.26667vw;
      color: #fff;
      line-height: 9.33333vw;
      text-align: center;
    }
    .bg {
      width: 100vw;
      height: auto;
      background:url(./img/newYear/bgPicture.png);
      background-size: cover;
    }
    .cosmetology-list{
      margin-top: -4vw;
      padding: 4vw 0.666667vw 20vw 0.666667vw;
      background-size: 100% 100%;
      .list-box{
        width: 100%;
        overflow-x: hidden;
        height: 42.666667vw;
        display: flex;
        justify-content: center;
        align-items: center;
        >div{
          width: 95vw;
          height: 39vw;
          background-color: #ffffff;
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
              padding: 6vw 5vw;
              // vertical-align: middle;
              // background: #0dd873;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .box-txt {
              position: relative;
              // width: 48vw;
              // height: 100%;
              flex: 1;
              // position: absolute;
              // top: 0;
              // right: 0;
              // position: relative;
              .txt_inner {
                position: absolute;
                top: 5vw;
                right: 2.5vw;
                bottom: 5vw;
                // background: pink;
              }
              .shopCar {
              width: 16vw;
              height: 6vw;
              position: absolute;
              background: url(./img/newYear/buy.png);
              background-size: 100% 100%;
              right: 3.5vw;
              bottom: 5.0vw;
            }
              p {
                margin-top: 1.4vw;
                width: 45vw;
                // height: 3vw;
                font-size: 3vw;
                font-weight: normal;
                font-stretch: normal;
                line-height: 4vw;
                letter-spacing: 1.8px!important;
                color: #666666;
                overflow: hidden;
                // line-height: 3vw!important;
                // &.p_two {
                //   width: 28vw;
                //   text-overflow: ellipsis;
                //   white-space: nowrap;
                // }
              }
              h3 {
                // width: 36vw;
                // height: 5vw;
                font-family: 'DIN-Bold';
                font-size: 5vw;
                font-stretch: normal;
                letter-spacing: 0vw;
                color: #000000;
                margin-bottom: 3vw;
              }
              p {
                max-width: 47vw;
                // height: 3.1vw;
                font-family: 'PingFang-SC-Medium';
                font-size: 3vw;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0vw;
                color: #666666;
              }
              .pri {
                position: absolute;
                left: 0;
                bottom: -0.5vw;
                height: 10vw;
                width: 28vw;
                .price {
                width: 2vw;
                height: 2vw;
                font-family: 'DIN-Bold';
                font-size: 3vw;
                font-weight: bold;
                // font-stretch: normal;
                line-height: 14vw;
                letter-spacing: 0vw;
                color: #ff8787;
                }
                span {
                  width: 17vw;
                  height: 4vw;
                  font-size: 5vw;
                  font-family: 'DIN-Bold';
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 14vw;
                  letter-spacing: 0vw;
                  color: #ff7474;
                  margin-left: -1vw;
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


<template>
  <div class="cosmetology" :class="from!=='app' && from!=='appv2'?'pdt44':''">
    <mt-header fixed title="热卖推荐" v-if="from !== 'app' && from!=='appv2'">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="goback"></mt-button>
      </router-link>
    </mt-header>
    <div class="cosmetology-mian">
      <div class="cosmetology-banner">
        <a href="">
          <img src="https://uploads.kangmei.com.cn/Files/20180831/yhygzf4e.oho.png" alt="">
        </a>
      </div>
      <div class="cosmetology-list">
        <ul>
          <li v-for="item in listData" :key="item.index" v-if="item.shopImg">
            <!-- <h2 style="background:url('https://uploads.kangmei.com.cn/Files/20180810/w1fss5ps.ws0.png');background-size: 100% 100%; ">{{item.title}}</h2> -->
            <!-- <h2>{{item.title}}</h2> -->
            <h2 v-bind:style="{backgroundImage:'url(' + item.titlebackgroundimg + ')'}">{{item.title}}</h2>
            <a href="javascript:void(0);" @click="detail(item.product[0])">
              <div class="list-box" v-bind:style="{backgroundImage:'url(' + item.bodybackgroundimg + ')'}">
                <!-- <div class="img"></div> -->
                <img class="img" :src="item.shopImg">
                <div class="box-txt">
                  <h3>重量约 {{item.weight}}</h3>
                  <h4 v-if="item.specifications">规格：{{item.specifications}}</h4>
                  <h5>抢购价：
                    <span>{{item.product[0].productmarkprice}}</span> <span v-if="item.title!=='畅销装'">元 / 盒</span><span v-else>元</span></h5>
                  <h6></h6>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// import ajax from '@/utils/javaApiRequest';
import request from '@/utils/ajax';
import { getQueryString } from '@/utils/index';
export default {
  data() {
    return {
      from: '',
      listData: []
    };
  },
  methods: {
    getData() {
      let _self = this;
      request.get('/api/home/goodDrugTemplate', {
        params: {
          id: '5b890dbbe110c338b8fc4431'
        }
      }).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          let data = res.data.data.content;
          data[0].weight = '50 g/ 根';
          data[0].specifications = '1  根/ 盒';
          data[0].shopImg = data[0].product[0].productmainimage;
          data[0].product[0].productmarkprice = 68;

          data[1].weight = '75 g/ 根';
          data[1].specifications = '1  根/ 盒';
          data[1].shopImg = data[1].product[0].productmainimage;
          data[1].product[0].productmarkprice = 98;

          data[2].weight = '50 g/ 根';
          data[2].specifications = '2  根/ 盒';
          data[2].shopImg = data[2].product[0].productmainimage;
          data[2].product[0].productmarkprice = 138;

          data[3].weight = '180 g/ 盒';
          data[3].specifications = '4~5  根/ 盒';
          data[3].shopImg = data[3].product[0].productmainimage;
          data[3].product[0].productmarkprice = 198;

          data[4].weight = '500 g';
          data[4].specifications = '';
          data[4].shopImg = data[4].product[0].productmainimage;
          data[4].product[0].productmarkprice = 200;

          // data[5].weight = '300 g/ 篮';
          // data[5].specifications = '3~4 根/ 篮';
          // data[5].shopImg = 'https://uploads.kangmei.com.cn/Files/20180831/zrxfzlax.2jr.png';
          _self.listData = data;
          console.log(data[0]);
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
@font-face {
  font-family: hwxw;
  src: url("../../styles/font/hwxw.ttf");
}
.pdt44 {
  padding-top: 44px;
}
.cosmetology {
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .cosmetology-mian {
    width: 100%;
    overflow: auto;
    .cosmetology-banner {
      width: 100%;
      height: 46.66667vw;
      img {
        width: 100%;
        height: 46.66667vw;
        position: relative;
      }
    }
    h2 {
      width: 31.73333vw;
      height: 14.4vw;
      background-size: 100% 100%;
      font-family: hwxw;
      font-size: 5.33333vw;
      line-height: 14.4vw;
      font-weight: normal;
      font-stretch: normal;
      color: #2c5905;
      margin: 0 auto;
      margin-top: 9.33333vw;
      margin-bottom: 3.6vw;
      padding-left: 2.666667vw;
    }
    .cosmetology-list {
      background: url(https://uploads.kangmei.com.cn/Files/20180831/fcdroqh4.0kd.jpg);
      background-size: 100% 100%;
      margin-top: -9.33333vw;
      padding-bottom: 9.33333vw;
      padding-top: 9.33333vw;
      .list-box {
        width: 100%;
        height: 42.666667vw;
        padding: 0 6.13333vw 0 10.13333vw;
        box-sizing: border-box;
        position: relative;
        background-size: 110% 110%;
        background-position: -5.33333vw -8vw;
        .img {
          width: 42%;
          height: 100%;
          // background: url("./img/xh_product_1.png");
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          right: 6.13333vw;
        }
        .box-txt {
          float: left;
          padding-top: 9.33333vw;
          font-family: hwxw;
          h3 {
            font-size: 2.666667vw;
            margin-left: 2.666667vw;
          }
          h4 {
            font-size: 2.666667vw;
            margin-left: 2.666667vw;
          }
          h5 {
            font-size: 3.733333vw;
            margin-top: 1.333333vw;
            margin-left: 2.666667vw;
            span {
              color: #b61d20;
              font-size: 4.8vw;
            }
          }
          h6 {
            width: 29.066667vw;
            height: 6.93333vw;
            margin-top: 4.8vw;
            background: url(https://uploads.kangmei.com.cn/Files/20180831/uzjhmuvb.bfo.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .cosmetology-list > ul > li:nth-child(even) {
      .list-box {
        .img {
          // background: url("./img/xh_product_2.png");
          background-size: 100% 100%;
          top: 0;
          left: 7.466667vw;
          width: 40%;
        }
        .box-txt {
          float: right;
          margin-right: 0px;
          height: 100%;
          position: relative;
          h3 {
            margin-left: 12vw;
          }
          h4 {
            margin-left: 12vw;
          }
          h5 {
            margin-top: 1.33333vw;
            margin-left: 12vw;
            span {
              color: #b61d20;
              font-size: 4.8vw;
            }
          }
          h6 {
            position: absolute;
            bottom: 4vw;
            right: 0;
          }
        }
      }
    }
  }
}
</style>

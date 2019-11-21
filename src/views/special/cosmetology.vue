<template>
<div class="cosmetology" :class="from!=='app' && from!=='appv2'?'pdt44':''">
  <mt-header fixed title="美容养颜" v-if="from !== 'app' && from!=='appv2'">
    <router-link to="" slot="left">
      <mt-button icon="back" @click="goback"></mt-button>
    </router-link>
  </mt-header>
  <div class="cosmetology-mian">
    <div class="cosmetology-banner">
      <a href="">
        <img src="./img/banner.png" alt="">
      </a>
    </div>
    <div class="cosmetology-list">
      <ul>
        <section v-for="(item, index) in listData" :key="index" v-if="item.product.length>0">
        <li>
          <h2>{{item.title}}</h2>
        </li>
        <li v-for="drug in item.product" :key="drug.productid">
          <a href="javascript:void(0);" @click="detail(drug)">
            <div class="list-box">
              <div>
                <div class="box-main">
                  <img :src="drug.productmainimage" alt="">
                  <div class="box-txt">
                    <h3>{{drug.productname}}</h3>
                    <p>{{drug.description}}</p>
                    <h4>
                      <i>价格</i>
                      <span>{{drug.productmarkprice}}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </li>
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
.pdt44 {
  padding-top: 44px;
}
.cosmetology{
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
      height: 80vw;
      img{
        width: 100%;
        height: 80vw;
        position: relative;
      }
    }
    h2{
      width: 48vw;
      height: 9.33333vw;
      background:url(./img/title.png);
      background-size: 100% 100%;
      margin: 4vw 0;
      margin-left: 25.33333vw;
      font-size: 4.26667vw;
      color: #fff;
      line-height: 9.33333vw;
      text-align: center;
    }
    .cosmetology-list{
      margin-top: -4vw;
      padding: 4vw 0.666667vw 40vw 0.666667vw;
      background:url(./img/bg.png);
      background-size: 100% 100%;
      .list-box{
        width: 100%;
        overflow-x: hidden;
        height: 42.666667vw;
        border-bottom: 0.5333333vw solid #498f88;
        margin-bottom: 2.666667vw;
        >div{
          width: 96%;
          margin: 0 auto;
          overflow-x: hidden;
          height: 42.13333vw;
          padding: 1.066667vw 1.066667vw 0 1.066667vw;
          background: #fffcf5;
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
      }
      .box-txt{
        width: 47vw;
        height: 29.333333vw;
        float: right;
        margin: 5.866667vw 4vw 0 0;
        h3{
          font-size: 3.733333vw;
          color: #0e6e5b;
          line-height: 8.8vw;
        }
        p{
          font-size: 2.666667vw;
          line-height: 3.466667vw;
          height: 10.4vw;
          color: #333333;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        h4{
          width: 26.66667vw;
          height: 6.666667vw;
          margin-top: 5.33333vw;
          font-size: 2.666667vw;
          background:url(./img/qianggou_chang.png);
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          color: #fff;
          i{
            transform: scale(0.7);
            margin-left: 0.8vw;
          }
        }
      }
    }
  }
}
</style>

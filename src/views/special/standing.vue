<template>
<div class="standing" :class="from!=='app' && from!=='appv2' ?'pdt44':''">
  <mt-header fixed title="当季常备" v-if="from!=='app' && from!=='appv2'">
    <router-link to="" slot="left">
      <mt-button icon="back" @click="goback"></mt-button>
    </router-link>
  </mt-header>
  <div class="standing-mian">
    <div class="standing-banner">
      <a href="">
        <img src="./img/banner_zty.png" alt="">
      </a>
    </div>
    <div class="standing-list">
      <section v-for="(item,index) in listData" :key="item.productId">
      <a v-if="index%2===0" href="javascript:void(0);" @click="detail(item)">
        <div class="item item1">
          <img src="./img/zty_dz.png" alt="">
          <div>
            <img :src="item.productmainimage" alt="" class="shop1">
            <div class="txt singleTxt">
              <h3>{{item.productname}}</h3>
              <p></p>
              <h4 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                {{item.description}}
              </h4>
              <div class="price">
                <span>优惠价</span>
                <span>{{Number(item.productmarkprice).toFixed(2)}}</span>
                <img src="./img/zty_an.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </a>
      <a v-else href="javascript:void(0);" @click="detail(item)">
        <div class="item item2">
          <img src="./img/zty_dz.png" alt="">
          <div>
            <div class="txt evenTxt">
              <h3>{{item.productname}}</h3>
              <p></p>
              <h4 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                {{item.description}}
              </h4>
              <div class="price">
                <span>优惠价</span>
                <span>{{Number(item.productmarkprice).toFixed(2)}}</span>
                <img src="./img/zty_an.png" alt="">
              </div>
            </div>
            <img :src="item.productmainimage" alt="" class="shop2">
          </div>
        </div>
      </a>
      </section>
      <!--
      <a href="">
        <div class="item item3">
          <img src="./img/zty_dzd.png" alt="">
          <div>
            <img src="./img/goods_ynby.png" alt="" class="shop3">
            <div class="txt singleTxt">
              <h3>云南白药 创可贴创口贴</h3>
              <p></p>
              <h4>
                百年守护,百姓共享
              </h4>
              <div class="price">
                <span>优惠价</span>
                <span>28</span>
                <img src="./img/zty_an.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </a>
      <a href="">
        <div class="item item4">
          <img src="./img/zty_dzd.png" alt="">
          <div>
            <div class="txt evenTxt">
              <h3>芬必得 布洛芬缓解胶囊</h3>
              <p></p>
              <h4>
                缓解疼痛
              </h4>
              <div class="price">
                <span>优惠价</span>
                <span>17.5</span>
                <img src="./img/zty_an.png" alt="">
              </div>
            </div>
            <img src="./img/goods_fbd.png" alt="" class="shop4">
          </div>
        </div>
      </a>
      <a href="">
        <div class="item item5">
          <img src="./img/zty_bk.png" alt="">
          <div>
            <img src="./img/goods_fbqfy.png" alt="" class="shop5">
            <div class="txt singleTxt">
              <h3>斧标驱风油</h3>
              <p></p>
              <h4>
                袪风止痛,芳香通透
              </h4>
              <div class="price">
                <span>优惠价</span>
                <span>12.5</span>
                <img src="./img/zty_an.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </a>
      <a href="">
        <div class="item item6">
          <img src="./img/zty_bk.png" alt="">
          <div>
            <div class="txt evenTxt">
              <h3>润洁 萘敏维滴眼液10ml</h3>
              <p></p>
              <h4>
                缓解疲劳眼痒结膜充血眼药水
              </h4>
              <div class="price">
                <span>优惠价</span>
                <span>14</span>
                <img src="./img/zty_an.png" alt="">
              </div>
            </div>
            <img src="./img/goods_rj.png" alt="" class="shop6">
          </div>
        </div>
      </a>
      -->
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
          // id: this.id
          id: this.id
        }
      }).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          console.log(res.data.data.content[0].product);
          this.listData = res.data.data.content[0].product;
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
.mint-header.is-fixed{
  z-index: 100;
}
.standing{
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .standing-mian{
    position: relative;
    width: 100%;
    overflow: auto;
  }
}
.standing-banner{
  width: 100%;
  height: 42.666667vw;
  img{
    width: 100%;
    height: 42.666667vw;
    position: relative;
  }
}
.standing-list{
  padding: 0.1px 8vw;
  font-size: 3.2vw;
  background:url(./img/bg_zty.png);
  background-size: 100% 100%;
  margin-top: -4vw;
  position: relative;
  z-index: 5;
}
.item{
  position: relative;
  >img{
    width: 100%;
    height: 4.53333vw;
    position: absolute;
  }
  >div{
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }
}
.txt{
  width: 32vw;
  margin-top: 12vw;
  h3{
    width: 64vw;
    color: #aab690;
    font-weight: bold;
    line-height: 4.8vw;
    transform: scale(0.5);
    font-size: 5.33333vw;
  }
  p{
    width: 20vw;
    height: 1px;
    background: #adb89a;
  }
  h4{
    width: 64vw;
    height: 6.4vw;
    transform: scale(0.5);
    font-size: 4.26667vw;
    margin-top: -1.33333vw;
    line-height: 6.4vw;
  }
  .price{
    width: 37.33333vw;
    height: 9.6vw;
    transform: scale(0.5);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    >span:nth-child(1){
      color: #fff;
      font-size: 4.26667vw;
    }
    >span:nth-child(2){
      color: #f9fe7d;
      font-size: 5.33333vw;
      // margin:0 2px;
    }
    img{
      height: 6.93333vw;
      width: 6.93333vw;
    }
  }
}
.singleTxt{
  h3{
    margin-left: -16vw;
  }
  h4{
    // margin-left: -16.53333vw;
    margin-left: -16vw;
  }
  .price{
    background:url(./img/zty_bqy.png) no-repeat;
    background-size: 100% 100%;
    margin-left: -9.33333vw;
    margin-top: -4vw;
    padding-right: 2.666667vw;
    >span:nth-child(1){
      // margin-left: 5px;
    }
  }
}
.evenTxt{
  position: relative;
  h3{
    margin-right: -16vw;
    float: right;
    text-align: right;
  }
  p{
    float: right;
  }
  h4{
    float: right;
    margin-right: -16vw;
    text-align: right;
  }
  .price{
    position: absolute;
    top: 6.666667vw;
    right: -9.33333vw;
    background:url(./img/zty_anz.png) no-repeat;
    background-size: 100% 100%;
    >span:nth-child(1){
      margin-left: 2.666667vw;
    }
    img{
      float: right;
    }
  }
}
.item1,.item2{
  margin-top: 8.8vw;
  height: 34.13333vw;
  >img{
    top: 29.6vw;
  }
}
// .item3,.item4{
//   height: 37.33333vw;
//   >img{
//     width: 40vw;
//     top: 32.266667vw;
//   }
//   .singleTxt,.evenTxt{
//     margin-top: 20vw;
//   }
// }
// .item4{
//   >img{
//     right: 0;
//   }
// }
// .item5,.item6{
//   height: 200px;
//   >img{
//     width: 145px;
//     height: 145px;
//     top:54px;
//   }
//   .singleTxt{
//      margin-top: 125px;
//   }
// }
// .item6{
//   >img{
//     top:32px;
//     right: 0;
//   }
//   .evenTxt{
//      margin-top: 110px;
//   }
// }
.shop1{
  width: 36vw;
  height: 28vw;
  margin: 5.33333vw 0 0 5.33333vw;
}
.shop2{
  width: 36vw;
  height: 24vw;
  margin: 8vw 8vw 0 0;
}
// .shop3{
//   width: 88px;
//   height: 88px;
//   margin: 45px 8vw 0 35px;
// }
// .shop4{
//   width: 110px;
//   height: 80px;
//   margin: 50px 4vw 0 0;
// }
// .shop5{
//   width: 80px;
//   height: 100px;
//   margin: 80px 0 0 35px;
// }
// .shop6{
//   width: 80px;
//   height: 100px;
//   margin: 16vw 8vw 0 0;
// }
</style>

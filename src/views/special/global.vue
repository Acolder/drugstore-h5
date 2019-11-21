<template>
  <div class="global" :class="{'headLess': from == 'app'}">
    <mt-header fixed title="全球直采" v-if="from!=='app'">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="global-mian">
      <div class="banner" v-if="bannerUrl">
        <img :src="bannerUrl" />
      </div>
      <!-- <ul class="global-list">
        <li v-for="item in 4" :key="item.index" @click="detail()">
          <img src="./img/pla_product.png"/>
          <div class="global-list-right">
            <h2>德国mucosolvan沐 舒坦儿童</h2>
            <h3>果味糖浆</h3>
            <div class="list-bottom">
              <span class="money">¥ 24.90</span>
              <div class="cart" @click.stop="cart()">
                <img  src="./img/iconpla_shop.png"/>
              </div>
            </div>
          </div>
        </li>
      </ul> -->
      <ul class="global-list" v-if="listData.length>0">
        <li v-for="item in listData" :key="item.index" @click="detail(item)">
          <img :src="item.productMainImage" />
          <div class="global-list-right">
            <h2>{{item.productName}}</h2>
            <!-- <h3 v-if="item.productDosageForm">{{item.productDosageForm}}</h3> -->
            <div class="description" style="display:-webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;text-overflow: ellipsis;">
              {{item.description}}
            </div>
            <div class="list-bottom">
              <span class="money">¥ {{Number(item.productMarkprice).toFixed(2)}}</span>
              <!-- <div class="cart">
                <img src="./img/iconpla_shop.png" />
              </div> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getQueryString } from '@/utils/index';
// import { addShop, bus } from '@/api/shopCart';
import ajax from '@/utils/javaApiRequest';
// import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      from: '',
      bannerUrl: '',
      listInfo: {
        pageNum: 1,
        pageSize: 10,
        transnationalId: this.$route.query.transnationalId ? this.$route.query.transnationalId : 2,
      },
      listData: []
    };
  },
  methods: {
    // 跳转至详情页
    detail(goods) {
      console.log(goods);
      let _self = this;
      if (_self.from === 'app') {
        let data = {
          productId: goods.productId,
          transnationalId: goods.transnational
        };
        let dataStr = JSON.stringify(data);
        /* eslint-disable */
        HealthBAT.toTransnationalGoodsDetail(dataStr);
      }
      else {
        console.log(goods.productId);
        _self.$router.push({
          path: '/goods/goodsDetail',
          query: {
            productId: goods.productId ? goods.productId : '',
            getByself: goods.getByself ? goods.getByself : '',
            getFast: goods.getFast ? goods.getFast : '',
            getCommon: goods.getCommon ? goods.getCommon : '',
            recommendId: goods.recommendId ? goods.recommendId : '',
            getTransnational: goods.transnational
          }
        });
      }
    },
    // // 加入购物车
    // cart(goods) {
    //   let _self = this;
    //   if (_self.from === 'app') {
    //     let data = {
    //       productId: goods.productId,
    //       transnationalId: goods.transnational
    //     };
    //     let dataStr = JSON.stringify(data);
    //     /* eslint-disable */
    //     HealthBAT.addTransnationalGoodsCart(dataStr);
    //   }
    //   else {
    //     let pId = goods.productId ? goods.productId : '';
    //     let getByself = goods.getByself ? goods.getByself : '';
    //     let getFast = goods.getFast ? goods.getFast : '';
    //     let getCommon = goods.getCommon ? goods.getCommon : '';
    //     let recommendId = goods.recommendId ? goods.recommendId : '';
    //     let isTransnational = goods.isTransnational ? goods.isTransnational : true;
    //     addShop(pId, getByself, getFast, getCommon, recommendId, isTransnational).then(res => {
    //       // console.log(res);
    //       if (res.data.resultCode === '0') {
    //         Toast(res.data.msg);
    //         bus.$emit('txt', 'add');
    //         let productId = sessionStorage.getItem('addProductId');
    //         let productIds = productId ? productId.split(',').map(Number) : [];
    //         productIds.push(pId);
    //         sessionStorage.setItem('addProductId', productIds);
    //       } else if (res.data.resultCode === '-2') {
    //         Toast('用户未登录，请先登录');
    //         goLogin();
    //       }
    //     })
    //   }
    // },
    getData() {
      let _self = this;
      ajax.post('/mall/transnational/queryProductByTransnationalId', _self.listInfo).then(res => {
        // console.log(res);
        if (res.status === 200 && res.data.resultCode === '0') {
          _self.listData = res.data.resultData.products;
          _self.bannerUrl = res.data.resultData.transnationalCategory.transnationalDetail;
        }
      });
    },
    goback() {
      location.href = '/';
    }
  },
  created() {
    let from = getQueryString('from');
    this.from = from;
    this.getData();
  }
};
</script>

<style scoped lang="less">
.global {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-top: 44px;
  background: #fff;
  .global-mian {
    .banner {
      width: 100%;
      height: 53.33333vw;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .global-list {
      > li {
        background: #fff;
        height: 37.33333vw;
        border-bottom: 1px solid #eeeeee;
        padding: 5.066667vw 3.466667vw 0 8vw;
        display: flex;
        > img {
          width: 23.2vw;
          height: 27.466667vw;
          margin-right: 13.6vw;
        }
      }
    }
    .global-list-right {
      flex: 1;
      padding-top: 1vw;
      h2,h3{
        width: 100%;
        height: 5.33333vw;
        line-height: 5.33333vw;
        color: #000;
        font-size: 3.733333vw;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .description {
        font-size: 3.466667vw;
        color: #666;
        height: 8vw;
        line-height: 4.2vw;
        overflow: hidden;
        margin: 4vw 0;
      }
      .list-bottom {
        width: 100%;
        margin-top: 1.33333vw;
        height: 5.33333vw;
        display: flex;
        justify-content: space-between;
        position: relative;
      }
      .money {
        color: #f94f4f;
        display: block;
        font-size: 3.2vw;
      }
      // .cart {
      //   width: 100%;
      //   // height: 10666667vw;
      //   right: -2.666667vw;
      //   top: -2.666667vw;
      //   position: absolute;
      //   z-index: 10;
      //   display: flex;
      //   justify-content: center;
      //   align-items: center;
      //   > img {
      //     width: 5.866667vw;
      //     height: 5.33333vw;
      //   }
      // }
    }
  }
}
.global.headLess {
  padding-top: 0.1px;
}
</style>

<template>
<div class="nutrition" :class="from!=='app' && from!=='appv2'?'pdt44':''">
  <mt-header fixed title="商品详情" v-if="from !== 'app' && from!=='appv2'">
    <router-link to="" slot="left">
      <mt-button icon="back" @click="goback"></mt-button>
    </router-link>
  </mt-header>
  <div class="nutrition-mian">
    <div class="nutrition-banner">
      <a href="">
        <img src="./img/nutrition/pla_yybb_banner.png" alt="">
      </a>
    </div>
    <!-- <markes></markes> -->
    <div class="nutrition-listWrap">
      <h2>
        <img src="./img/nationalDay/icon_stone.png" alt="">
        <span>营养保健</span>
        <img src="./img/nationalDay/icon_stone2.png" alt="">
      </h2>
      <div class="list">
        <h3>需要长期服用，没有确切的功效。如蛋白质、蜂王浆、维生素等。</h3>
        <ul>
          <li class="list-item" v-for="item in listData1" :key="item.index">
            <img :src="item.productmainimage" alt=""  @click="detail(item)">
            <div>
              <h3>{{item.productname}}</h3>
              <p></p>
              <h4>{{item.description}}</h4>
              <div class="buy" @click="detail(item)">立即购买</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="nutrition-listWrap">
      <h2>
        <img src="./img/nationalDay/icon_stone.png" alt="">
        <span>强化保健</span>
        <img src="./img/nationalDay/icon_stone2.png" alt="">
      </h2>
      <div class="list">
        <h3>身体缺什么补什么，但不能防止流失，过度服用对身体有害。如钙、铁、锌等微量元素。</h3>
        <ul>
          <li class="list-item" v-for="item in listData2" :key="item.index">
            <img :src="item.productmainimage" alt=""  @click="detail(item)">
            <div>
              <h3>{{item.productname}}</h3>
              <p></p>
              <h4>{{item.description}}</h4>
              <div class="buy" @click="detail(item)">立即购买</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="nutrition-listWrap">
      <h2>
        <img src="./img/nationalDay/icon_stone.png" alt="">
        <span>功能保健</span>
        <img src="./img/nationalDay/icon_stone2.png" alt="">
      </h2>
      <div class="list">
        <h3>对身体得某个器官有调理、治疗的作用。如深海鱼油、甲壳素、卵磷脂等。</h3>
        <ul>
          <li class="list-item" v-for="item in listData3" :key="item.index">
            <img :src="item.productmainimage" alt=""  @click="detail(item)">
            <div>
              <h3>{{item.productname}}</h3>
              <p></p>
              <h4>{{item.description}}</h4>
              <div class="buy" @click="detail(item)">立即购买</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="nutrition-listWrap">
      <h2>
        <img src="./img/nationalDay/icon_stone.png" alt="">
        <span>其他类</span>
        <img src="./img/nationalDay/icon_stone2.png" alt="">
      </h2>
      <div class="list">
        <h3>复合保健作用。</h3>
        <ul>
          <li class="list-item" v-for="item in listData4" :key="item.index">
            <img :src="item.productmainimage" alt=""  @click="detail(item)">
            <div>
              <h3>{{item.productname}}</h3>
              <p></p>
              <h4>{{item.description}}</h4>
              <div class="buy" @click="detail(item)">立即购买</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
// import ajax from '@/utils/javaApiRequest';
import request from '@/utils/ajax';
import { getQueryString } from '@/utils/index';
import markes from '@/components/markes/markes';
export default {
  data() {
    return {
      from: '',
      listData1: [],
      listData2: [],
      listData3: [],
      listData4: [],
      id: this.$route.query.id
    };
  },
  components: {
    'markes': markes
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
          let listData1Temp = res.data.data.content.filter((item) => item.title === '营养保健');
          this.listData1 = listData1Temp[0].product;
          let listData2Temp = res.data.data.content.filter((item) => item.title === '强化保健');
          this.listData2 = listData2Temp[0].product;
          let listData3Temp = res.data.data.content.filter((item) => item.title === '功能保健');
          this.listData3 = listData3Temp[0].product;
          let listData4Temp = res.data.data.content.filter((item) => item.title === '其他类');
          console.log(listData4Temp);
          this.listData4 = listData4Temp[0].product;
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
.nutrition{
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .nutrition-mian{
    width: 100%;
    background: #cbeef6;
    overflow: auto;
    padding-bottom: 21.33333vw;
    .nutrition-banner{
      width: 100%;
      height: 97.33333vw;
      margin-bottom: 1.6vw;
      img{
        width: 100%;
        height: 97.33333vw;
        position: relative;
      }
    }
    .nutrition-listWrap{
      h2{
        margin: 6.4vw 0;
        height: 4.53333vw;
        font-size: 4vw;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #353d38;
        span{
          margin: 0 4vw;
        }
        img{
          width: 7.73333vw;
          height: 2.666667vw;
        }
      }
      .list{
        margin: 0 auto;
        padding: 6.666667vw 4.666vw 1px 6.2666vw;
        width: 91.0666vw;
        background-color: #ffffff;
        box-shadow: 0px 0.5333333vw 1.33333vw 0px rgba(17, 125, 118, 0.27);
        border-radius: 5.33333vw;
        h3{
          font-family: PingFang-SC-Regular;
          font-size: 3.466667vw;
          font-weight: normal;
          font-stretch: normal;
          line-height: 5.066667vw;
          letter-spacing: 0px;
          color: #4d4d4d;
          margin-bottom: 5.33333vw;
        }
        // 商品列表样式
        ul{
          .list-item{
            height: 21.33333vw;
            margin-bottom: 13.33333vw;
            img{
              width: 30vw;
              max-height: 34.666667vw;
            }
            >div{
              width: 35vw;
              padding-top: 4vw;
              overflow: hidden;
              h3{
                width: 100%;
                height: 3.733333vw;
                line-height: 3.733333vw;
                margin-bottom: 0.5333333vw;
                font-family: MicrosoftYaHei-Bold;
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 3.2vw;
                color: #26b4b5;
              }
              p{
                width: 21vw;
                height: 1px;
                background-color: #abe6f9;
              }
              h4{
                height: 5.33333vw;
                line-height: 5.33333vw;
                width: 100%;
                font-family: MicrosoftYaHei;
                font-weight:normal;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-left: -3.3vw;
                font-size: 3.2vw;
                color: #26b4b5;
                transform: scale(0.8);
              }
              .buy{
                width: 19.8666vw;
                height: 4.8vw;
                background-color: #25b5b2;
                border-radius: 2.4vw;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3.2vw;
                color: #d4e187;
              }
            }
          }
          .list-item:nth-child(odd){
            img{
            float: left;
            }
            >div{
              float: right;
            }
          }
          .list-item:nth-child(even){
            img{
              float: right;
            }
            >div{
              float: left;
            }
          }
        }
      }
    }
  }  
}
</style>

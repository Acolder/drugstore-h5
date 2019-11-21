<template>
<div class="nationalDay" :class="from!=='app' && from!=='appv2'?'pdt44':''">
  <mt-header fixed title="必备药品清单" v-if="from !== 'app' && from!=='appv2'">
    <router-link to="" slot="left">
      <mt-button icon="back" @click="goback"></mt-button>
    </router-link>
  </mt-header>
  <div class="nationalDay-mian">
    <div class="nationalDay-banner">
      <a href="">
        <img src="./img/nationalDay/banner.png" alt="">
      </a>
    </div>
    <div class="title">
      "十一国庆长假即将到来，不少朋友会在假期选择外出旅游。可是，在出行时，是否贴心地为自己准备好了旅行小药箱呢？在旅途中，感冒发烧，水土不服可都可能遇到，小药箱也许会在不时之需的时候用上"
    </div>
    <h2>
      <img src="./img/nationalDay/icon_stone.png" alt="">
      <span>小药箱应该包含哪些药物？</span>
      <img src="./img/nationalDay/icon_stone2.png" alt="">
    </h2>
    <div class="contain">
      "首先，应该根据自己身体健康情况携带药品，尤其是特殊疾病人群，比如高血压患者、糖尿病患者、心脏病等，做到不论在家中，还是外出，按时按需给药，不能贸然断药减药。且在出行前，建议前往医院进行必要的身体检查，并咨询医生关于出行用药注意事项，根据医生的建议选择合适的出游地点。其次，应考虑旅途中常见的疾病，准备一些应需药品。诸如感冒药，抗过敏药，晕车晕船药，止泻药以及一些外伤处理药。"
      <div class="contaiBg">
      </div>
    </div>
    <h2>
      <img src="./img/nationalDay/icon_stone.png" alt="">
      <span>小药箱必备药品有哪些？</span>
      <img src="./img/nationalDay/icon_stone2.png" alt="">
    </h2>
    <!-- 感冒药 -->
    <div class="tielBanner1">
    </div>
    <div class="list list1">
      <div class="list-til">
        "注意事项：感冒呈自限性疾病，应注意休息，多饮水，忌饮食辛辣，忌过食油腻生冷之品。复方感冒药含多种化学成分，应尽量选择单一药品，尽量避免联合用药，减少重复用药。"
      </div>
      <ul>
        <li class="list-item" v-for="item in listData1" :key="item.index">
          <img :src="item.productmainimage" alt="" @click="detail(item)">
          <div>
            <h3>{{item.productname}}</h3>
            <p></p>
            <h4>{{item.description}}</h4>
            <div class="buy" @click="detail(item)">立即购买</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 晕车药 -->
    <div class="tielBanner2">
    </div>
    <div class="list list2">
      <div class="list-til">
        注意事项：在旅行中，晕车药需在乘车（船，机）前半小时服用，可有效避免发病或减轻症状。如果发病，应闭目仰卧，坐位时应头部应紧靠在固定椅背上或固定物体上，避免较大幅度的摇摆。
      </div>
      <ul>
        <li class="list-item" v-for="item in listData2" :key="item.index">
          <img :src="item.productmainimage" alt="" @click="detail(item)">
          <div>
            <h3>{{item.productname}}</h3>
            <p></p>
            <h4>{{item.description}}</h4>
            <div class="buy" @click="detail(item)">立即购买</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 止泻药 -->
    <div class="tielBanner3">
    </div>
    <div class="list list3">
      <div class="list-til">
        注意事项：腹泻期间，应少食多餐，以清淡、易消化、无刺激的食物为主，还应注意补充水分。益生菌类药品需注意储存方式，避免药品失效。
      </div>
      <ul>
        <li class="list-item" v-for="item in listData3" :key="item.index">
          <img :src="item.productmainimage" alt="" @click="detail(item)">
          <div>
            <h3>{{item.productname}}</h3>
            <p></p>
            <h4>{{item.description}}</h4>
            <div class="buy" @click="detail(item)">立即购买</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 抗过敏药 -->
    <div class="tielBanner4">
    </div>
    <div class="list list4">
      <div class="list-til">
        注意事项:抗过敏药有一定的副作用，如口干、嗜睡等。建议在晚上睡前服用，服用此类药物后,不要驾驶汽车。
      </div>
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
    <!-- 外伤处理药 -->
    <div class="tielBanner5">
    </div>
    <div class="list list5">
      <div class="list-til">
        注意事项：在旅途中，磕磕碰碰在所难免。身上擦伤，有了小伤口，应该及时消毒处理，避免发生感染。如果伤口很大很深，应该及时前往医院做进一步处理。
      </div>
      <ul>
        <li class="list-item" v-for="item in listData5" :key="item.index">
          <img :src="item.productmainimage" alt="" @click="detail(item)">
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
</template>
<script>
// import ajax from '@/utils/javaApiRequest';
import request from '@/utils/ajax';
import { getQueryString } from '@/utils/index';
export default {
  data() {
    return {
      from: '',
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
          // id: '5baee0a8e110c352b36e33b6'
          // id: '5badf4ba2cbe295ae589a6ae'
          id: this.id
        }
      }).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          console.log(res);
          let listData1Temp = res.data.data.content.filter((item) => item.title === '感冒药');
          this.listData1 = listData1Temp[0].product;
          let listData2Temp = res.data.data.content.filter((item) => item.title === '晕车药');
          this.listData2 = listData2Temp[0].product;
          let listData3Temp = res.data.data.content.filter((item) => item.title === '止泻药');
          this.listData3 = listData3Temp[0].product;
          let listData4Temp = res.data.data.content.filter((item) => item.title === '抗过敏药');
          this.listData4 = listData4Temp[0].product;
          let listData5Temp = res.data.data.content.filter((item) => item.title === '外伤处理药');
          this.listData5 = listData5Temp[0].product;
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
    document.title = '必备药品清单';
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
.nationalDay{
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .nationalDay-mian{
    width: 100%;
    background: #dfeee7;
    overflow: auto;
    .nationalDay-banner{
      width: 100%;
      height: 93.33333vw;
      img{
        width: 100%;
        height: 93.33333vw;
        position: relative;
      }
    }
    .title{
      margin: -6.666667vw 2.666667vw 0 2.666667vw;
      position: relative;
      z-index: 5;
      height: 33.33333vw;
	    background-color: #fdcd6c;
	    box-shadow: 0px 0.5333333vw 1.33333vw 0px rgba(195, 146, 46, 0.27);
      border-radius: 5.33333vw;
      padding: 5.33333vw 2.666667vw 0px 2.666667vw;
      font-size: 3.733333vw;
      line-height: 5.33333vw;
      color: #bb5139;
      margin-bottom: 14.666667vw;
    }
    h2{
      height: 4.53333vw;
      font-size: 4vw;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #353d38;
      span{
        margin: 0 1.33333vw;
      }
      img{
        width: 7.73333vw;
        height: 2.666667vw;
      }
    }
    .contain{
      margin: 0px 2.666667vw 5.33333vw 2.666667vw;
      padding: 6.666667vw 4vw;
      color: #0e6c66;
      line-height: 5.33333vw;
      position: relative;
      .contaiBg{
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        position: absolute;
        background: url(./img/nationalDay/icon_medicine.png) no-repeat center;
        filter:alpha(opacity=20);
        -moz-opacity:0.2;
        -khtml-opacity: 0.2;
        opacity: 0.2;
      }
    }
    .tielBanner1{
      margin: 6.666667vw 3.2vw 0 3.2vw;
      height: 66.666667vw;
      background: url(./img/nationalDay/banner_title_cold.png);
      background-position:0px 0px;
      background-size: 100% 100%;
    }
    .tielBanner2{
      margin: 6.666667vw 3.2vw 0 3.2vw;
      height: 85.33333vw;
      background: url(./img/nationalDay/banner_title_ycy.png);
      background-position:0px 0px;
      background-size: 100% 100%;
    }
    .tielBanner3{
      margin: 6.666667vw 3.2vw 0 3.2vw;
      height: 85.33333vw;
      background: url(./img/nationalDay/banner_title_zxy.png);
      background-position:0px 0px;
      background-size: 100% 100%;
    }
    .tielBanner4{
      margin: 6.666667vw 3.2vw 0 3.2vw;
      height: 85.33333vw;
      background: url(./img/nationalDay/banner_title_kgm.png);
      background-position:0px 0px;
      background-size: 100% 100%;
    }
    .tielBanner5{
      margin: 6.666667vw 3.2vw 0 3.2vw;
      height: 85.33333vw;
      background: url(./img/nationalDay/banner_title_wsxy.png);
      background-position:0px 0px;
      background-size: 100% 100%;
    }
    .list{
      margin: 0px 4.66667vw;
      margin-left: 4.9vw;
      background: #fff;
      box-shadow: 0px 1.866667vw 2.933333vw 0px rgba(17, 125, 118, 0.27);
      border-radius:0 0 5.33333vw 5.33333vw;
      padding-bottom: 5.33333vw;
      padding-top: 2.666667vw;
      margin-bottom: 16vw;
      .list-til{
        font-size: 3.466667vw;
        line-height: 5.33333vw;
        color: #4d4d4d;
        margin:0px 6.666667vw 6.666667vw 4vw;
      }
      // 商品列表样式
      ul{
        .list-item{
          height: 21.33333vw;
          margin-bottom: 13.33333vw;
          padding:0 8vw 0 8vw;
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
            // margin-right: 2.666667vw;
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
    .list1{
      margin-top: -24vw;
    }
    .list2{
      margin-top: -40vw;
    }
    .list3{
      margin-top: -42.666667vw;
    }
    .list4{
      margin-top: -41.33333vw;
    }
    .list5{
      margin-top: -45.33333vw;
    }
  }
}
</style>

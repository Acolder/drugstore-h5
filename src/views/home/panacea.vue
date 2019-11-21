<template>
  <div class="panacea">
    <mt-header :title="keyword">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="content">
      <div class="describe ">
        <div class="text" :class="{'continue-read':isCollapse,'textOverflow-tip':isCollapse}" @click="expand()"
             v-html="panacea.introduce">
        </div>
      </div>
      <div class="box-item" :class="{'collapse':collapseList[0].isCollapse}">
        <div class="top" @click="expendItem(0)">
          <i class="icon-xcyy icon"></i>
          <h6 class="title">形成原因？</h6>
          <em class="icon-down"></em>
        </div>
        <div class="bottom">
          <div v-html="panacea.reason"></div>
        </div>
      </div>
      <div class="box-item" :class="{'collapse':collapseList[1].isCollapse}">
        <div class="top" @click="expendItem(1)">
          <i class="icon-hsjy icon"></i>
          <h6 class="title">何时就医？</h6>
          <em class="icon-down"></em>
        </div>
        <div class="bottom">
          <p> {{panacea.time}}</p>
        </div>
      </div>
      <div class="box-item" :class="{'collapse':collapseList[2].isCollapse}">
        <div class="top" @click="expendItem(2)">
          <i class="icon-shjy icon"></i>
          <h6 class="title">生活建议？</h6>
          <em class="icon-down"></em>
        </div>
        <div class="bottom">
          <p>
            {{panacea.advize}}
          </p>
        </div>
      </div>
      <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <div class="item" v-for="(drug,index) in this.drugList" :key="index">
          <drugItem :drug="drug" :key="drug.product_id" :showShopCart="true"></drugItem>
        </div>
      </div>
      <!--暂无商品推荐-->
      <div class="noRecommond" v-if="this.drugList.length===0">
        <div class="img_norecord"></div>
        <!-- <img class="img_norecord" src="./imgs/icon-zwsptj.png" alt=""> -->
        <span>暂无商品推荐~</span>
      </div>
    </div>
    <inquiry-car></inquiry-car>
  </div>
</template>
<script>
import { Header, Button, InfiniteScroll, Toast } from 'mint-ui';
import ajax from '@/utils/ajax.js';
import ajaxJava from '@/utils/javaApiRequest.js';
import { getToken } from '@/utils/auth';
import inquiryCar  from '@/components/inquiryCar/index.vue';
import { addShop, bus } from '@/api/shopCart';
import { prescCall } from '@/api/goodDetail';
import drugItem from '@/components/drugListItem/index.vue';
const queryString = require('query-string');
export default {
  data() {
    return {
      panacea: {
        introduce: '',
        reason: '',
        time: '',
        advize: '',
        list: [],
        drygList: []
      },
      isCollapse: true,
      collapseList: [
        { isCollapse: true },
        { isCollapse: true },
        { isCollapse: true },
      ],
      drugList: [],
      keyword: '感冒咳嗽',
      panaceaId: '3',
      page: 0
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'inquiry-car': inquiryCar,
    'InfiniteScroll': InfiniteScroll,
    'drugItem': drugItem
  },
  compute: {
    listDatass: function () {
      return this.panacea.feeds[0].list;
    }
  },
  methods: {
    // 获得关键字以及id
    getKeyword: function () {
      let parameter = queryString.parse(location.search);
      if (parameter && parameter.keyword && parameter.panaceaId) {
        this.keyword = parameter.keyword;
        this.panaceaId = parameter.panaceaId;
      }
    },
    loadMore: function () {
      this.getDrugList();
    },
    getPanacea: function () {
      let url = `api/medicine/getpanacea?id=` + this.panaceaId;
      ajax.get(url).then((res) => {
        console.info('getPanacea:', res);
        this.panacea.introduce = this.turnHtml(res.data.data.content.baseinfo.info);
        this.panacea.reason = res.data.data.content.summary[0].content;
        this.panacea.time = res.data.data.content.summary[1].content;
        this.panacea.advize = res.data.data.content.summary[2].content;
        if (res.data.data.content.feeds) {
          this.panacea.list = res.data.data.content.feeds[0].list;
        }
        console.info(res.data.data.content);
      });
    },
    addShopCart(pId, productSource, userId, productName, isOtc) {
      let getByself;
      let getFast;
      let getCommon;
      if (isOtc === '2') {
        prescCall(productName, pId);
        return false;
      }
      if (productSource === 'cabinet') {
        getByself = userId;
      } else if (productSource === 'drugStore') {
        getFast = userId;
      } else if (productSource === 'mall') {
        getCommon = userId;
      }
      addShop(pId, getByself, getFast, getCommon).then((res) => {
        if (res.status === 200) {
          if (res.data.resultCode === '0') {
            bus.$emit('txt', 'add');
            let productId = sessionStorage.getItem('addProductId');
            let productIds = productId ? productId.split(',').map(Number) : [];
            productIds.push(pId);
            sessionStorage.setItem('addProductId', productIds);
          } else if (res.data.resultCode === '-2') {
            Toast('请先登录');
          } else {
            Toast(res.data.msg);
          }
        }
      });
    },
    turnHtml: function (str) {
      let regular = /\/n/g;
      let result = str.replace(regular, '</br>');
      return result;
    },
    expand: function () {
      if (this.isCollapse === true) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
    },
    expendItem: function (index) {
      let flag = this.collapseList[index].isCollapse;
      if (flag === true) {
        this.collapseList[index].isCollapse = false;
      } else {
        this.collapseList[index].isCollapse = true;
      }
    },
    getDrugList: function () {
      // notes;关键字锁定为康美
      let lat = JSON.parse(sessionStorage.getItem('coordinate')).latitude;
      let lon = JSON.parse(sessionStorage.getItem('coordinate')).longitude;
      let parameter = {
        'keyword': this.keyword,
        'devicetype': 'H5',
        'lat': lat,
        'lon': lon,
        'accountId': getToken(),
        'page': this.page,
        'sortField': 'product_sales_volume',
        'sort': 'desc'
      };
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/batsearch/getProductMall`;
      ajaxJava.post(url, parameter).then((res) => {
        let drugsList = res && res.data.resultData.content;
        this.drugList = [...this.drugList, ...drugsList];
        this.page++;
        console.info('drygList:', drugsList);
      });
    }
  },
  mounted: function () {
    this.getKeyword();
    this.getPanacea();
  }
};
</script>
<style lang='less' scoped>
  @import "../../styles/mixin.less";
  @page-back-color: #EFEFF4;
  @title-size: 17px;
  @light-blue-color: #8CD2FE;
  @borderColor: #EEE;
  @backgroundColor: #FFF;
  .content {
    position: absolute;
    top: 44px;
    left: 0;
    bottom: 0;
    right: 0;
    background: #EEEEF3;
    z-index: 1;
    .icon-down {
      display: inline-block;
      width: 16px;
      height: 10px;
      background: url(./imgs/iconfont-arrow-down@2x.png) no-repeat;
      background-size: 100%;
      position: relative;
      margin-right: 20px;
      bottom: 5px;
      transform: rotate(180deg);
    }
  }
  // 通用css
  .textOverflow-tip {
    .multipleTextOverflow(68px, 0 80px 4px 5px, #FFF);
  }
  .describe {
    padding: 10px 26px 10px 13px;
    border-bottom: 1px solid @borderColor;
    background: @backgroundColor;
    .text {
      font-size: 16px;
      color: #333;
      line-height: 22px;
      position: relative;
      &.continue-read:after {
        color: #000;
        content: "继续阅读";
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 1;
        padding: 0 15px 1px 15px;
        text-decoration: underline;
      }
    }
  }
  .box-item {
    background: @backgroundColor;
    padding-left: 10px;
    color: #333;
    border-bottom: 1px solid @borderColor;
    .top {
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        background-size: 100%;
      }
      .title {
        flex: 1;
        margin-left: 10px;
        font-size: 17px;
      }
    }
    .bottom {
      padding: 10px 5px;
      white-space: pre-line;
      p {
        font-size: 16px;
        color: #333;
        line-height: 22px;
      }
    }
  }
  .list {
    margin-top: 10px;
    background: @backgroundColor;
    padding-left: 13px;
    position: relative;
    width: 100%;
    .item {
      padding: 10px 0;
      display: flex;
      .img {
        margin-right: 2%;
        width: 100px;
        height: 70px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .item-right {
        position: relative;
        flex: 1;
        padding-left: 10px;
        .detail {
          // width: 250px;
          font-size: 16px;
        }
        .price {
          margin-top: 25px;
        }
        .icon-shopCar {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url('./imgs/icon-gwcj@2x.png') no-repeat;
          background-size: 100%;
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
      }
    }
  }
  .icon-xcyy {
    background: url('./imgs/icon-xcyy@2x.png') no-repeat;
  }
  .icon-hsjy {
    background: url('./imgs/icon-hsjy@2x.png') no-repeat;
  }
  .icon-shjy {
    background: url('./imgs/icon-shjy@2x.png') no-repeat;
  }
  .box-item {
    &.collapse {
      .top .icon-down {
        transform: rotate(0deg);
      }
      .bottom {
        display: none;
      }
    }
  }
  // 暂无记录
  .noRecommond {
    position: absolute;
    text-align: center;
    font-size: 16px;
    color: #666;
    padding-top: 22px;
    padding-bottom: 140px;
    background-color: #FFF;
    width: 100%;
    div {
      width: 100%;
      background: url('./imgs/icon-zwsptj.png') no-repeat;
      height: 197px;
      padding-top: 10px;
      margin-bottom: 10px;
      background-size: 100%;
    }
  }
</style>

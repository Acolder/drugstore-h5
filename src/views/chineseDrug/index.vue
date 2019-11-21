<template>
  <div class="medicine" @scroll="scrollEvent">
    <!-- banner -->
    <div class="banner">
      <a href="javascript:void(0);">
        <img v-if="banner.picture_path" :src="banner.picture_path" alt="">
        <img v-else src="./img/pla_top_banner@2x.png" alt="">
      </a>
    </div>
    <!-- 导航栏 -->
    <div class="nav">
      <div class="navTop">
        <!-- 国医在线 -->
        <a href="/chineseMedicine/dctList" class="bor-r">
          <img src="./img/pla_icon_gyzx@2x.png" alt="">
        </a>
        <!-- 拍方抓药 -->
        <a href="javascript:void(0);" @click="emedicine">
          <img src="./img/pla_icon_kmezy.png" alt="">
        </a>
      </div>
      <div class="navBottom">
        <!-- 中医药材 -->
        <a href="/medicinalMaterials" class="bor-r">
          <img src="./img/pla_icon_zyyc@2x.png" alt="">
        </a>
        <!-- 经典名方 -->
        <a href="/classics" class="bor-r">
          <img src="./img/pla_icon_jdmf@2x.png" alt="">
        </a>
        <!-- 体质测评 -->
        <a href="/physique?from=h5">
          <img src="./img/pla_icon_tzcp@2x.png" alt="">
        </a>
      </div>
    </div>
    <!-- 轮播处 -->
    <div class="broadcast">
      <div id="broadcastImg">
        <mt-swipe :auto="0">
          <mt-swipe-item v-for="(item, index) in listBanner" :key="index">
            <img :src="item.picture_path" alt="" @click="item.category === 'online_consult' && AskDoctor()">
          </mt-swipe-item>
          <!-- <mt-swipe-item>
            <a href="">
              <img src="./img/pla_zhineng_banner@2x.png" alt="">
            </a>
          </mt-swipe-item>
          <mt-swipe-item>
            <a href="">
              <img src="./img/pla_onlie_banner@2x.png" alt="">
            </a>
          </mt-swipe-item> -->
        </mt-swipe>
      </div>
      <div class="broadcastNav">
        <img @click="AskDoctor" src="./img/iconfont_mouth.png" alt="">
        <img @click="AskDoctor" src="./img/iconfont_shine.png" alt="">
        <img @click="AskDoctor" src="./img/iconfont_disorder.png" alt="">
        <img @click="AskDoctor" src="./img/iconfont_weight.png" alt="">
      </div>
    </div>
    <!-- 调理妙方 -->
    <div class="panacea">
      <h2>
        调理妙方
      </h2>
      <div class="panaceaNav">
        <div v-for="(item, index) in listPanacea" :key="index" @click="panacea(item)">
          <img :src="item.pictureurl" alt="">
        </div>
        <!-- <a href="javascript:void(0);" @click="panacea('小儿腹泻',1)">
          <img src="./img/pla_picture_xefx@2x.png" alt="">
        </a>
        <a href="javascript:void(0);" @click="panacea('皮炎湿疹',1)">
          <img src="./img/pla_picture_pysz@2x.png" alt="">
        </a>
        <a href="javascript:void(0);" @click="panacea('睡眠障碍',1)">
          <img src="./img/pla_picture_smza@2x.png" alt="">
        </a>
        <a href="javascript:void(0);" @click="panacea('祛风除湿',1)">
          <img src="./img/pla_picture_qfcs@2x.png" alt="">
        </a>
        <a href="javascript:void(0);" @click="panacea('感冒咳嗽',10)">
          <img src="./img/pla_picture_cold@2x.png" alt="">
        </a>
        <a href="javascript:void(0);" @click="panacea('消化不良',6)">
          <img src="./img/pla_picture_xhbl@2x.png" alt="">
        </a>
        <a href="javascript:void(0);" @click="panacea('口腔溃疡',26)">
          <img src="./img/pla_picture_kqky@2x.png" alt="">
        </a>
        <a href="javascript:void(0);" @click="panacea('妇科炎症',1)">
          <img src="./img/pla_picture_fkyz@2x.png" alt="">
        </a> -->
      </div>
    </div>
    <!-- 商品列表栏 -->
    <div id='drugList' class="list">
      <div class="listNav">
        <div v-for="(item, index) in listNav" :key="index" @click="classificationAction(item.categoryName)" :class="listType===item.categoryName?'selected':''">
          {{item.categoryName}}
        </div>
      </div>
      <div class="listShop load-more-container" :style="{ '-webkit-overflow-scrolling': scrollMode , height:480+'px'}" v-if="listData">
        <mt-loadmore :bottom-method='loadBottom' :bottom-all-loaded='allLoaded' :autoFill='false' :bottomPullText='bottomText' ref="loadmore">
        <div class="list-item" v-for="(item, index) in listData" :key="index" @click="goRoute(item)">
          <img :src="item.productMainImage" alt="" class="shopImg">
          <div class="shopTxt">
            <h3>
              {{item.productName}}
            </h3>
            <div class="describe">
              {{item.description}}
            </div>
            <div class="specifications">
              {{item.productSpecification}}
            </div>
            <div class="item-bottom">
              <span class="price">¥{{item.productMarkprice}}</span>
              <span class="pin">已售： {{item.productSalesVolume}}</span>
              <img src="./img/icon_pla_shopcart@2x.png" alt="" class="cart" @click.stop="shopCar(item)">
            </div>
          </div>
        </div>
        </mt-loadmore>
        <div class="no-more" v-show="showNomore">没有更多了</div>
      </div>
      <!-- <div class="none-listShop" v-else>
        <div class="none-listShopImg"></div>
        <div class="none-listShopTil">找不到相关药品，请重新搜索~</div>
      </div> -->
    </div>
  </div>
</template>

<script>
// import { Swipe, SwipeItem } from 'mint-ui';
import { Toast, Swipe, SwipeItem, Loadmore } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
import ajax from '@/utils/ajax.js';
import { intoInquiry, goLogin, goEMedicine } from '@/api/user';
import { addShop, bus } from '@/api/shopCart';
import { prescCall } from '@/api/goodDetail';
import jQuery from 'jquery';
export default {
  data() {
    return {
      banner: {
      },
      listBanner: [],
      listPanacea: [],
      listNav: [],
      listData: [],
      listType: '',
      // 滑动方式
      scrollMode: 'auto',
      // 是否已全部加载
      allLoaded: false,
      pageIndex: 1,
      bottomText: '上拉加载更多...',
      showNomore: false,
      screenHeight: document.documentElement.clientHeight
    };
  },
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem,
    'mt-loadmore': Loadmore,
  },
  methods: {
    // 快速问中医
    AskDoctor: function () {
      intoInquiry(0);
    },
    // 获取中药国医首页banner
    getBanner() {
      // ajax.get(`/api/medicine/getOnlineDoctorBanner?version=v2.0`)
      ajax.get(`/api/medicine/getMedicineBanner?version=v2.0`)
        .then((data) => {
          if (data.status === 200 && data.data.code === 0) {
            this.banner = data.data.data[0];
          }
        })
        .catch((msg) => {
          console.error(msg);
        });
    },
    // 获取中医在线咨询banner
    getConsultationBanner() {
      ajax.get(`/api/medicine/getOnlineDoctorBanner?version=v2.0`)
        // ajax.get(`/api/medicine/getMedicineBanner?version=v2.0`)
        .then((data) => {
          if (data.status === 200 && data.data.code === 0) {
            this.listBanner = data.data.data;
          }
        })
        .catch((msg) => {
          console.error(msg);
        });
    },
    // 调理妙方
    getPanacea() {
      ajax.get(`/api/medicine/gethomepanacealist?version=v2.0`)
        .then((data) => {
          if (data.status === 200 && data.data.code === 0) {
            this.listPanacea = data.data.data;
          }
        })
        .catch((msg) => {
          console.error(msg);
        });
    },
    // 调理妙方详情跳转
    panacea(res) {
      this.$router.push({
        path: '/home/panacea',
        query: { keyword: res.name, panaceaId: res.id }
      });
    },
    // 商品分类
    classificationAction(res) {
      this.pageIndex = 1;
      this.listType = res;
      this.getListData();
    },
    // 商品分类
    getListNav() {
      javaAjax.post(`/mall/productRecommend/getCategoryRecommendByCodeList`, { categoryCode: '' })
        .then((res) => {
          if (res.status === 200 && res.data.resultCode === '0') {
            this.listType = res.data.resultData[0].categoryName;
            this.listNav = res.data.resultData;
            this.getListData();
          }
        })
        .catch((msg) => {
          console.error(msg);
        });
    },
    // 商品列表
    getListData() {
      let type = sessionStorage.getItem('chinesDrug-index-type');
      if (type) {
        this.listType = type;
      }
      let param = {
        categoryName: this.listType,
        pageNum: this.pageIndex,
        pageSize: 3,
      };
      return javaAjax.post(`/mall/productRecommend/queryDsProductRecommend`, param)
        .then((res) => {
          sessionStorage.removeItem('chinesDrug-index-type');
          if (res.status === 200 && res.data.resultCode === '0') {
            let data = res.data.resultData.data;
            if (this.pageIndex === 1) {
              this.listData = data;
            } else {
              this.listData = this.listData.concat(data);
              // Toast('内容已更新');
            }
            let total = res.data.resultData.total;
            let hasMore =  total > this.listData.length && total > 0;
            console.log(total, this.listData.length, 'hasMorNum');
            this.isHaveMore(hasMore);
            this.$nextTick(function() {
              this.scrollMode = 'touch';
            });
          }
        })
        .catch((msg) => {
          console.error(msg);
        });
    },
    // 加入购物车
    shopCar(goods) {
      let pId = goods.productId ? goods.productId : '';
      let getByself = goods.getByself ? goods.getByself : '';
      let getFast = goods.getFast ? goods.getFast : '';
      let getCommon = goods.getCommon ? goods.getCommon : '';
      let recommendId = goods.recommendId ? goods.recommendId : '';
      let isTransnational = goods.isTransnational ? goods.isTransnational : false;
      if (goods.pSource === 'drugStore') {
        goods.getFast = goods.userId;
      } else if (goods.pSource === 'mall') {
        goods.getCommon = goods.userId;
      } else if (goods.pSource === 'cabinet') {
        goods.getByself = goods.userId;
      }
      let isotc = goods.isOtc.toString();
      if (isotc === '2') {
        prescCall(goods.productName, goods.pId);
        return false;
      }
      addShop(pId, getByself, getFast, getCommon, recommendId, isTransnational).then(res => {
        if (res.data.resultCode === '0') {
          bus.$emit('txt', 'add');
          Toast(res.data.msg);
          let productId = sessionStorage.getItem('addProductId');
          let productIds = productId ? productId.split(',').map(Number) : [];
          productIds.push(pId);
          sessionStorage.setItem('addProductId', productIds);
        } else if (res.data.resultCode === '-2') {
          Toast('用户未登录，请先登录');
          goLogin();
        } else {
          Toast(res.data.msg);
        }
      });
    },
    // 跳转到商品详情
    goRoute(item) {
      let query = {
        productId: item.productId,
        getByself: item.getByself,
        getCommon: item.getCommon,
        getFast: item.getFast,
      };
      // 记录页面来源
      sessionStorage.setItem('page_from', 'chineseDrug-index');
      // 记录当前选中的商品分类
      sessionStorage.setItem('chinesDrug-index-type', this.listType);
      this.$router.push({
        path: '/goods/goodsDetail',
        query: query
      });
    },
    // 页面锚点跳转
    gotoDrugList() {
      let page_src = sessionStorage.getItem('page_from');
      if (page_src && page_src === 'chineseDrug-index') {
        sessionStorage.removeItem('page_from');
        let dom = jQuery('#drugList');
        let position = dom.offset();
        if (position && position.top) {
          setTimeout(() => {
            jQuery('div.medicine').animate({
              scrollTop: jQuery('div.medicine div.listNav').offset().top + 360
            }, 1000);
            // jQuery('div.medicine').scrollTop(position.top);
            let navPosition = jQuery('div.medicine div.listNav div.selected').offset();
            console.log(position.top, '滚动中', navPosition);
            if (navPosition && navPosition.left) {
              jQuery('div.medicine div.listNav').scrollLeft(navPosition.left);
            }
          }, 1000);
        }
      }
    },
    // 下拉刷新
    loadTop: function() {
      this.listData = [];
      this.pageIndex = 1;
      this.getListData().then(() => {
        this.$refs.loadmore.onTopLoaded();
      });
    },
    // 上拉加载
    loadBottom: function() {
      // alert(jQuery('.load-more-container').height());
      // console.log(this.$el.getBoundingClientRect().bottom, this.scrollEventTarget.getBoundingClientRect().bottom + 1);
      this.pageIndex = this.pageIndex + 1;
      this.getListData().then(() => {
        this.$refs.loadmore.onBottomLoaded();
      });
    },
    isHaveMore(isHaveMore) {
      this.allLoaded = true;
      this.showNomore = true;
      if (isHaveMore) {
        this.allLoaded = false;
        this.showNomore = false;
      }
      console.log(this.allLoaded, '加载是否完成', this.showNomore);
    },
    emedicine() {
      goEMedicine();
    },
    scrollEvent(e) {
      console.log(e.srcElement.scrollTop, 'e');
    }
  },
  created() {
    this.getBanner();
    this.getConsultationBanner();
    this.getPanacea();
    this.getListNav();
  },
  mounted() {
    this.gotoDrugList();
    window.addEventListener('scroll', this.handleScroll, true);
  }
};
</script>

<style lang="less" scoped>
.load-more-container {
  // overflow-x: hidden;
  width: 100%;
  height: 100%;
  // overflow: scroll;
  // -webkit-overflow-scrolling: touch;
  .list {
    padding-top: 52px;
  }
}
.no-more {
  height: 30px;
  line-height: 30px;
  background-color: #f8f8f8;
  text-align: center;
}
.medicine{
  background: #efeff4;
  position: absolute;
  top: 0;
  bottom: 48px;
  left: 0;
  right: 0;
  overflow: auto;
  // overflow-x: hidden;
  z-index: 10;
  // banner
  .banner{
    width: 100%;
    height: 195px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  // 导航栏
  .nav{
    width: 100%;
    height: 171px;
    background: #fff;
    .bor-r{
      border-right: 1px solid #dedfdf;
    }
    .navTop{
      width: 100%;
      height: 85px;
      display: flex;
      border-bottom: 1px solid #dedfdf;
      >a{
        width: 50%;
        height: 100%;
        display: block;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .navBottom{
      width: 100%;
      height: 85px;
      display: flex;
      >a{
        width: 33.33%;
        height: 100%;
        display: block;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  // 轮播处
  .broadcast{
    margin:10px 0;
    width: 100%;
    height: 155px;
    background: #fff;
    #broadcastImg{
      width: 100%;
      height: 110px;
      img{
        height: 95px;
        width: 100%;
      }
      /deep/ .mint-swipe-indicators{
        bottom: 0px;
      }
      /deep/ .mint-swipe-indicator.is-active {
        background: #ab7648;
        opacity: 1;
      }
      /deep/ .mint-swipe-indicator{
        background: #f0e6de;
        width: 10px;
        height: 3px;
        border-radius: 0;
        opacity: 1;
        margin-right: 4px;
      }
    }
    .broadcastNav{
      padding: 4px 13px 15px 13px;
      display: flex;
      justify-content: space-between;
      img{
        width: 23.333%;
        height: 100%;
      }
    }
  }
  // 调理妙方
  .panacea{
    width: 100%;
    height: 140px;
    margin-bottom: 10px;
    background: #fff;
    padding-left: 13px;
    padding-right: 10px;
    h2{
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      color: #333;
    }
    .panaceaNav{
      height: 95px;
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      div{
        width: 33%;
        height: 95px;
        display: inline-block;
        margin-right: 1%;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  // 物品列表栏
  .list{
    // 列表分类
    .listNav{
      width: 100%;
      height: 41px;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      background: #fff;
      border-bottom: 1px solid #d8d8d8;
      >div{
        width: 25%;
        height: 40px;
        display: inline-block;
        line-height: 40px;
        text-align: center;
        color: #333333;
      }
      .selected{
        color: #0ccdd3;
        border-bottom: 2px solid #0ccdd3;
      }
    }
    // 列表商品
    // .none-listShop{
    //   width: 100%;
    //   height: 300px;
    //   padding-top: 60px;
    //   background: #fff;
    //   .none-listShopImg{
    //     width: 100%;
    //     height: 175px;
    //     background: url(./img/xh_icon_zbdyp@2x.png);
    //     background-size: 100% 100%;
    //   }
    //   .none-listShopTil{
    //     margin-top: 15px;
    //     text-align: center;
    //     font-size: 13px;
    //     line-height: 20px;
    //   }
    // }
    .listShop{
      width: 100%;
      .list-item{
        width: 100%;
        height: 160px;
        margin-bottom: 5px;
        background: url('./img/pla_goods_bg@2x.png') no-repeat;
        background-color: #fff;
        background-size: 100% 100%;
        display: flex;
        padding: 18px 0 0 14px;
        .shopImg{
          width: 130px;
          height: 130px;
          background-color: #faebbb;
          border-radius: 2.5px;
          border: solid 1px #e2e2e2;
        }
        .shopTxt{
          flex: 1;
          padding-left: 10px;
          padding-right: 20px;
          padding-top: 5px;
          h3{
            height: 32px;
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            line-height: 16px;
            color: #333333;
            letter-spacing: 0px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .describe{
            margin-top: 5px;
            height: 28px;
            font-size: 10px;
            line-height: 14px;
            font-family: PingFang-SC-Regular;
            letter-spacing: 0px;
            color: #7e7e7e;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .specifications{
            font-family: PingFang-SC-Regular;
            font-size: 12px;
            line-height: 15px;
            margin: 10px 0;
            overflow: hidden;
            font-weight: normal;
            font-stretch: normal;
            color: #919191;
          }
          .item-bottom{
            height: 16px;
            .price{
              font-family: PingFang-SC-Medium;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 0px;
              letter-spacing: 0px;
              color: #ff4c56;
              display: inline-block;
              margin-right: 10px;
            }
            .pin{
              font-family: PingFang-SC-Regular;
              font-size: 10px;
              font-weight: normal;
              font-stretch: normal;
              color: #919191;
            }
            .cart{
              margin-top: -4px;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              float: right;
            }
          }
        }
      }
    }
  }
}
</style>

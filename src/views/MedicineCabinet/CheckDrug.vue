<template>
  <div class="checkDrug-header">
    <mt-header fixed title="查看药柜药品">
      <a slot="left" @click="$router.go(-1);">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="drug">
      <div class="drug-headerBox">
        <div class="drug-header">
          <div class="drug-headerLeft">
            <h5>{{seller_name}}</h5>
            <h6>地址：{{seller_address}}</h6>
          </div>
          <div class="drug-headerRight" v-show="mdata !== '>30'">
            <span>{{m}}|{{mdata}}分钟</span>
            <button @click="OpenMapm()"></button>
          </div>
          <div class="drug-headerRight" v-show="mdata == '>30'">
            <span>>3km</span>
            <div>超出步行范围</div>
          </div>
        </div>
        <div class="drug-search">
          <div class="box-flex">
            <i class="mintui mintui-search"></i>
            <input  placeholder="搜索药品" class="input-txt"  @click="goSearch"/>
          </div>
        </div>
      </div>
      <!--<div class="drug-list">-->
        <!--<div class="drug-listLeft menu-wrapper" ref="menu-wrapper">-->
          <!--<ul>-->
            <!--<li :class="{'drug-active': index === currentIndex}" v-for="(title,index) in drugs" :key="index" ref="menuList" @click="clickList(index,$event)">-->
              <!--{{title.categoryName}}-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
        <!--<div class="drug-listRight shop-wrapper">-->
          <!--<ul  ref="itemList" class="itemList">-->
            <!--<li class="shops-li" v-for="(drug,index) in drugs" :key="index" ref="shopsli">-->
              <!--<div class="shops-liTitle">-->
                <!--{{drug.categoryName}}-->
              <!--</div>-->
              <!--<ul class="itemListLi" v-for="(detail,index) in drug.productList" :key="index">-->
                <!--<li  @click="goShop(detail.product_id)">-->
                  <!--<div class="drug-GoodLeft">-->
                    <!--<img :src="detail.product_main_image">-->
                    <!--&lt;!&ndash;<img :src="detail.product_main_image"  :onerror="errorUserPhoto">&ndash;&gt;-->
                  <!--</div>-->
                  <!--<div class="drug-GoodRight">-->
                    <!--<div class="drug-GoodRightTop">-->
                      <!--<span>{{detail.product_name}}</span>-->
                      <!--<i>￥{{detail.product_markprice| numFilter}}</i>-->
                    <!--</div>-->
                    <!--<p>{{detail.product_description}}</p>-->
                    <!--<div class="drug-GoodRightBot">-->
                      <!--<span>{{detail.product_specification}}</span>-->
                      <!--<img src="./img/iconlh_gwc@2x.png" alt="" @click.stop="addCart(detail.product_id)">-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->
      <div class="drug-list">
        <cube-scroll-nav
          ref="scrollnav"
          :side="true"
          :data="drugs"
          :current="current"
          :options="scrollOptions"
          @change="changeHandler"
          @sticky-change="stickyChangeHandler"
        >
          <!--<ul class="prepend-header drug-listLeft menu-wrapper" slot="prepend">-->
          <!--<li>11</li>-->
          <!--<li>22</li>-->
          <!--<li>333</li>-->
          <!--</ul>-->
          <cube-scroll-nav-panel
            v-for="item in drugs"
            :key="item.categoryName"
            :label="item.categoryName"
            :title="item.categoryName"
            class="drug-listRight shop-wrapper">
            <ul class="itemList" ref="itemList">
              <li v-for="detail in item.productList" class="shops-li"  v-bind:key="detail.product_name" @click="goShop(detail.product_id)">
                <div class="drug-GoodLeft">
                  <img :src="detail.product_main_image">
                </div>
                <div class="drug-GoodRight">
                  <div class="drug-GoodRightTop">
                    <span>{{detail.product_name}}</span>
                    <i>￥{{detail.product_markprice| numFilter}}</i>
                  </div>
                  <p>{{detail.product_description}}</p>
                  <div class="drug-GoodRightBot">
                    <span>{{detail.product_specification}}</span>
                    <img src="./img/iconlh_gwc@2x.png" alt="" @click.stop="addCart(detail.product_id)">
                  </div>
                </div>
              </li>
            </ul>
          </cube-scroll-nav-panel>
        </cube-scroll-nav>
      </div>
    </div>
    <loading :loadingShow="loadingShow"></loading>
    <inquiry-cart></inquiry-cart>
  </div>
</template>
<script>
import javaAjax from '@/utils/javaApiRequest';
import loading from '@/components/loading/index';
import { Toast } from 'mint-ui';
import { addShop, bus } from '@/api/shopCart';
import { goLogin } from '@/api/user';
import inquiryCart from '@/components/inquiryCar/index.vue';
import { openMap } from '@/api/coordinate.js';
// import Cube from 'cube-ui';
// import Vue from 'vue';
// Vue.use(Cube);
export default {
  data() {
    return {
      goods: [
        1, 2, 3, 4, 5
      ],
      titles: [
        2, 2, 3, 4, 5
      ],
      scrollY: 0,
      // 右侧列表滑动的y轴坐标
      rightLiTops: [],
      // 所有分类头部位置
      add: '',
      loadingShow: true,
      machineId: 0,
      seller_name: '',
      m: 0,
      mdata: '',
      seller_address: '',
      current: 0,
      drugs: [],
      scrollOptions: {
        click: true,
        directionLockThreshold: 0
      }
    };
  },
  components: {
    loading,
    'inquiry-cart': inquiryCart,
    // Cube
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后三位
      let transformVal = parseFloat(value).toFixed(3);
      let realVal = transformVal.substring(0, transformVal.length - 1);
      return realVal;
    }
  },
  methods: {
    /**
    // F-1：左右滚动
    _initBScroll() {
      this.leftBscroll = new BScroll('.menu-wrapper', {
        click: true,
        taps: true,
      });
      this.rightBscroll = new BScroll('.shop-wrapper', {
        click: true,
        taps: true,
        probeType: 3,
        // 在滚动中触发scroll 事件
      });
      // 监听右边滚动事件
      this.rightBscroll.on('scroll', (pos) => {
        console.log(pos, 'pos');
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
        console.log(this.scrollY, 'yyy');
      });
    },
    // F-2：求出右边列表的高度
    _initRightHeight() {
      let itemArray = [];
      // 定义一个伪数组
      let top = 0;
      itemArray.push(top);
      // 获取右边所有li的礼
      let allList = this.$refs.itemList.getElementsByClassName('shops-li');
      // allList伪数组转化成真数组
      Array.prototype.slice.call(allList).forEach(li => {
        top += li.clientHeight;
        // 获取所有li的每一个高度
        itemArray.push(top);
      });
      this.rightLiTops = itemArray;
      console.log(this.rightLiTops, '计算高度');
      this.rightBscroll.refresh();
      this.loadingShow = false;
    },
    // F-3：点击左边标题
    clickList(index, event) {
      if (!event._constructed) {
        return;
      }
      console.log(index, '点击左边标题');
      this.scrollY = this.rightLiTops[index];
      // this.currentIndex = index;
      let el = this.$refs.shopsli;
      console.log(el[index], '点击左边标题!!!!');
      this.rightBscroll.scrollToElement(el[index], 200);
    },
    // F-4：左右联调
    _initLeftScroll(index) {
      let menu = this.$refs.menuList;
      let el = menu[index];
      this.leftBscroll.scrollToElement(el, 300);
      // this.leftBscroll.scrollToElement(el, 300, 0, -300);
      console.log(index, '左右联调');
    },
     **/
    // F-5:获取所有药柜数据
    getDrug() {
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/batsearch/getCabinetProductList`;
      this.machineId = this.$route.query.machineId;
      this.seller_name = this.$route.query.seller_name;
      this.m = this.$route.query.m;
      this.mdata = this.$route.query.mdata;
      this.seller_address = this.$route.query.seller_address;
      let data = {
        machineId: this.machineId
      };
      // return javaAjax.post(url, data);
      javaAjax.post(url, data).then(res => {
        console.log(res);
        if (res.status === 200 && res.data.resultCode === '0') {
          let drugs = res.data.resultData.content;
          console.log(drugs, 'drugs');
          if (!drugs || drugs.length === 0) {
            Toast('药柜暂无药品');
            this.loadingShow = false;
          } else {
            drugs.forEach(function (value) {
              if (value.productList && value.productList.length > 0) {
                value.productList.forEach(function (drug) {
                  if (drug.product_main_image && drug.product_main_image.indexOf(';') !== -1) {
                    let num = drug.product_main_image.indexOf(';');
                    drug.product_main_image = drug.product_main_image.substr(0, num);
                    // drug.product_description = '解表散热，疏肝和胃。用于外感病，邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干。解表散热，疏肝和胃。用于外感病，邪犯少阳证，症见寒热往来、胸胁苦满、食欲不振、心烦喜呕、口苦咽干。';
                  }
                });
              }
            });
            this.drugs = drugs;
            this.current = drugs[0].categoryName;
            setTimeout(() => {
              this.$refs.scrollnav.refresh();
              this.loadingShow = false;
            });
          }
        }
      });
    },
    changeHandler(label) {
      console.log('changed to:', label);
    },
    stickyChangeHandler(current) {
      console.log('sticky-change', current);
    },
    // F-6:判断图片有无加载完成
    updated() {
      let that = this;
      // 解决better-scroll因为图片没有下载完导致的滚动条高度不够，无法浏览全部内容的问题。
      // 原因是better-scroll初始化是在dom加载后执行，此时图片没有下载完成，导致滚动条高度计算不准确。
      // 利用图片的complete属性进行判断，当所有图片下载完成后再对scroll重新计算。
      return new Promise(function(resolve, reject) {
        let img = that.$refs.itemList.getElementsByTagName('img');
        console.log(img, 'img1');
        let count = 0;
        let length = img.length;
        if (length) {
          let timer = setInterval(() => {
            if (count === length) {
              clearInterval(timer);
              // that._initRightHeight();
              resolve(true);
            } else if (img[count].complete) {
              count++;
            }
          }, 100);
        }
      });
    },
    // F-7：加入购物车
    addCart(productId) {
      let that = this;
      this.longIs().then(res => {
        if (res) {
          addShop(productId, that.machineId).then((res) => {
            if (res.data.resultCode === '0') {
              Toast(res.data.msg);
              bus.$emit('txt', 'add');
              let productId = sessionStorage.getItem('addProductId');
              let productIds = productId ? productId.split(',').map(Number) : [];
              productIds.push(productId);
              sessionStorage.setItem('addProductId', productIds);
            } else if (res.data.resultCode === '-2') {
              Toast('用户未登录，请先登录');
              goLogin();
            }
          });
        }
      });
    },
    // F-8：搜索药品
    goSearch() {
      let that = this;
      this.$router.push({
        path: `/MedicineCabinet/searchDrug`,
        query: {
          machineId: that.machineId,
          mdata: that.mdata
        }
      });
    },
    // F-9：步行导航,打开地图
    OpenMapm() {
      console.log(this.$route.query.lat, this.$route.query.lon, this.seller_name, this.seller_address);
      openMap(this.$route.query.lat, this.$route.query.lon, this.seller_name, this.seller_address);
    },
    // F-10:跳转商品详情
    goShop(productId) {
      let that = this;
      this.longIs().then(res => {
        if (res) {
          console.log(res);
          this.$router.push({
            path: `/goods/goodsDetail`,
            query: {
              productId: productId,
              getByself: that.machineId,
              getCommon: '',
              getFast: ''
            }
          });
        }
      });
    },
    // F-11:判断是否超过距离
    longIs() {
      let that = this;
      return new Promise(function (resolve, reject) {
        if (that.mdata !== '>30') {
          resolve(true);
        } else {
          Toast('药柜距离超过步行自提范围，暂时无法购买药品');
          resolve(false);
        }
      });
    }
  },
  created: function() {
    this.getDrug();
  },
  watch: {
    /**
    drugs() {
      // 监听数据，确保图片加载完成后进行滚动
      this.$nextTick(() => {
        this.updated().then(res => {
          if (res) {
            this.$refs.scrollnav.refresh();
            this.loadingShow = false;
          }
        });
      });
    }
     **/
  },
};

</script>
<style lang="less" scoped>
  .checkDrug-header{
    position: relative;
    width:100%;
    height: 100%;
  }
  .drug{
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
  }
  .drug-headerBox{
     width:100%;
     height:100px;
    margin-top: 44px;
    background: url("./img/xh_ckyg_bg.png");
    position: absolute;
    left:0;
    top:0;
   }
  .drug-header{
    min-height:100px;
    margin-bottom: 0px;
    display: flex;
    align-items:flex-end;
    padding:0 10px 10px;
    color:#ffffff;
  }
  .drug-headerLeft{
    flex: 1;
  }
  .drug-headerLeft>h5{
    font-size: 18px;
    line-height:20px;
    font-weight: normal;
  }
  .drug-headerLeft>h6{
    font-size: 14px;
    margin-top:10px;
    font-weight: normal;
  }
  .drug-headerRight{
    width:100px;
    margin-left:10px;
    span{
      font-size: 11px;
    }
    button{
      background:url("./img/icon_bxdh@2x.png") no-repeat;
      background-size:cover;
      width:71px;
      height:17px;
      margin-top:10px;
    }
  }
  .drug-search{
    width: 100%;
    padding: 11px 10px;
    border-bottom: 1px solid #dfdfdf;
    .box-flex {
      position: relative;
      .mintui-search {
        position: absolute;
        left: 12px;
        top: 8px;
        font-size: 12px;
        color: #999;
      }
      .input-txt {
        width: 100%;
        height: 28px;
        padding: 0 0 0 30px;
        font-size: 12px;
        color: #999;
        background: #eeeef3;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 0;
        box-sizing: border-box;
        outline: 0;
        border-radius: 20px;
      }
    }
  }
  .drug-list{
    position: absolute;
    top:195px;
    bottom: 0;
    width: 100%;
    display: flex;
    background: #f6f6f6;
    .drug-listLeft{
      width:100px;
      text-align: center;
      font-size: 16px;
      color: #333333;
      overflow: scroll;
      height: 100%;
      li{
        width: 100%;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 23px;
      }
      li.drug-active{
        border-left:2px solid #0ccdd3;
        background: #ffffff;
      }
    }
    .drug-listRight{
      flex:1;
      background: #ffffff;
      overflow:hidden;
      height: 100%;
      .itemListLi>li{
        display: flex;
        /*border-bottom:1px solid #dfdfdf;*/
        width:90%;
        margin-left: 15px;
        padding:10px 10px 7px 0;
      }
    }
  }
  .drug-GoodLeft{
    width:58px;
    img{
      margin:8px 11px 0 0;
      width:47px;
      height:47px;
      border: solid 1px #e0e0e0;
    }
  }
  img[lazy=loading] {
    margin:8px 11px 0 0;
    width:47px;
    height:47px;
    border: solid 1px #e0e0e0;
    background: url("./img/lazy.jpg") no-repeat fixed center;
  }
  .drug-GoodRight{
    flex:1;
    .drug-GoodRightTop{
      display: flex;
      font-size: 13px;
      align-items: center;
      justify-content: space-between;
      span{
        color: #333333;
      }
      i{
        font-size: 13px;
        color: #ff4c56;
      }
    }
    p{
      font-size: 11px;
      line-height:22px;
      color: #666666;
      margin-top:7px;
      /*多行文本溢出*/
      display: -webkit-box;
      -webkit-line-clamp: 2;
      display: -moz-box;
      -moz-line-clamp:2 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      -moz-box-orient: vertical;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
    }
    .drug-GoodRightBot{
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        font-size:10px;
        color: #666666;
        text-align: end;
        margin-top: 6px;
      }
      img{
        width:21px;
        height: 20px;
      }
    }
  }
  .shops-liTitle{
    padding:0px 0px 0px 15px;
    line-height: 30px;
    font-size: 15px;
    font-weight: bold;
  }
  /deep/ .cube-scroll-nav{
    width: 100%;
  }
  /deep/ .cube-scroll-nav.cube-scroll-nav_side .cube-sticky-content>h2.cube-scroll-nav-panel-title{
    height:20px;
    padding-left: 5px;
    font-size:12px;
    line-height: 24px;
    background-color: rgba(255,255,255,0.8);
    font-weight: 800;
  }
  /deep/ .cube-scroll-nav-bar-items>.cube-scroll-nav-bar-item{
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 23px;
    font-size: 16px;
  }
  /deep/ .cube-scroll-nav-bar-item.cube-scroll-nav-bar-item_active{
    border-left:2px solid #0ccdd3;
    background: #ffffff;
    color:#333;
  }
  /deep/ .cube-scroll-nav-bar{
    background: #f6f6f6;
  }
  /deep/ .cube-scroll-nav-bar-item{
    padding: 5px 5px;
  }
  .shops-li{
    display: flex;
    /*border-bottom:1px solid #dfdfdf;*/
    width:90%;
    margin-left: 15px;
    padding:10px 10px 7px 0;
  }
</style>

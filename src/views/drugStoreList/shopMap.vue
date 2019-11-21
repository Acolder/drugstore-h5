<template>
  <div id="map" v-cloak>
    <div class="addr">
      <!-- 标题 -->
      <!-- <div class="title"><span>店铺歇业中，无法下单</span></div> -->
      <!-- 地图容器 -->
      <baidu-map
        class="map"
        :center="{ lng: newsPoint.lng, lat: newsPoint.lat}"
        :zoom="zoom"
        @ready="handler"
        ak="B7dm6TMatflSYBPc5ZS51LnIXBmifqoH"
      >
        <!-- 坐标点 -->
        <bm-marker
          v-for=" (marker, key) of showShopName"
          :key="key+'a'"
          :position="{ lng: marker.lng, lat: marker.lat}"
          @click="infoWindowOpen(marker,key)"
        ></bm-marker>
        <!-- 信息窗体 -->
        <bm-info-window
          class="win"
          :position="newsPoint"
          :closeOnClick="false"
          :offset="{width: -4, height: -13}"
          :width="infoWH.wid"
          :height="infoWH.hei"
          :title="title"
          :show="infoWindow.show"
          @close="infoWindowClose"
        >
          <p class="info_window" v-text="ADDR"></p>
          <span class="info_btn" @click="allRoute(ADDR)">到这里去</span>
          <!-- 覆盖 -->
          <!-- <div class="bug">

          </div> -->
        </bm-info-window>
        <!-- !!!!!!!!! -->
        <!-- !!!!!!!!! -->
        <!-- 比例尺 -->
        <bm-scale
          style="z-index: 9999"
          anchor="BMAP_ANCHOR_BOTTOM_LEFT"
          :offset="{width: '0', height: '25'}"
        ></bm-scale>
        <!-- 缩放 -->
        <bm-navigation
          anchor="BMAP_ANCHOR_TOP_BOTTOM"
          type="BMAP_NAVIGATION_CONTROL_ZOOM"
          :offset="{width: '10', height: '20'}"
        ></bm-navigation>
        <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: '20', height: '20'}">
          <button class="addZoom" @click.once="addZoom(10)">查看全部</button>
        </bm-control>
      </baidu-map>
      <!--  店铺详情 -->
      <div class="shopDetail">
        <span class="shopDetail_img">
          <img :src="imgAddr" alt>
        </span>
        <div class="shopDetail_center">
          <p class="p_one">{{infoWindow.contents}}</p>
          <p class="p_two">
            营业时间：周一至周日 {{timeAndTel.business}}
            <br>
            电话：{{timeAndTel.tel}}
          </p>
        </div>
        <span class="shopDetail_right" @click="callPhone(timeAndTel.tel)"></span>
      </div>
      <!-- 底部导航 -->
      <!-- <div class="foot"> -->
      <!-- <div class="foot_links">
                     <a href="https://h5.youzan.com/v2/home?kdt_id=19366160">店铺主页</a>
                     <a href="https://h5.youzan.com/v2/home?kdt_id=19366160">会员中心</a>
                     <a href="javascript:;">关注我们</a>
                     <a href="https://h5.youzan.com/v2/physicalstore/19366160">线下门店</a>
                     <a href="https://h5.youzan.com/v2/showcase/cert">店铺信息</a>
      </div>-->
      <!-- <div class="foot_copyright"></div> -->
      <!-- </div> -->
      <div class="motify" v-if="flag">
        <div class="motify_inner">门店: 康美大药房（{{showShopName[0].region}}） 地理位置未指定</div>
      </div>
    </div>
    <!-- 电话预约弹窗 -->
    <!-- <div class="phone_window" v-if="tel">
      <div class="phone_windowTop">{{tel}}</div>
      <div class="phone_windowBottom">
        <button @click="callPhone(timeAndTel.tel)">预约</button>
        <button @click="clearOrderAction" class="right_btn">取消</button>
      </div>
    </div> -->
    <!-- 遮罩层 -->
    <!-- <div class="layer" v-if="isShow"></div> -->
    <router-view></router-view>
  </div>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/Map/map.vue';
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue';
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue';
import BmScale from 'vue-baidu-map/components/controls/Scale.vue';
import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue';
import BmControl from 'vue-baidu-map/components/controls/Control.vue';
import BmPointCollection from 'vue-baidu-map/components/overlays/PointCollection.vue';
import { shopData } from './js/shopData.js';
export default {
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow,
    BmScale,
    BmNavigation,
    BmControl,
    BmPointCollection
  },
  data() {
    return {
      // center: { lng: 116.404, lat: 39.915 },
      // center: { lng: 113.84844, lat: 23.287126 },
      zoom: 17,
      infoWH: { wid: 292, hei: 100 },
      infoWindow: {
        show: false,
        contents: ''
      },
      imgAddr: '',
      showShopName: [],
      title: '康美大药房',
      flag: false,
      fl: true,
      newsPoint: { lng: 113.270279, lat: 23.1358684 },
      num: 0,
      timeAndTel: {},
      tel: '',
      isShow: false,
      region: '',
      ADDR: ''
    };
  },
  methods: {
    // 电话预约
    callPhone(phoneNum) {
      location.href = `tel:${phoneNum.replace(/\D/g, '')}`;
      console.log(phoneNum.replace(/\D/g, ''));
    },
    // 路线
    allRoute(addr) {
      // 导航
      // location.href = `https://map.baidu.com/mobile/webapp/index/index/foo=bar/tab=place#search/search/qt=s&wd=${addr}&c=340&searchFlag=bigBox&version=5&exptype=dep&src_from=webapp_all_bigbox&sug_forward=5f3c2186ff3f1b6eede4a5fb&src=2/vt=`;
      location.href = `https://map.baidu.com/mobile/webapp/search/search/qt=s&wd=${addr}&c=340&searchFlag=bigBox&version=5&exptype=dep&src_from=webapp_all_bigbox&sug_forward=5f3c2186ff3f1b6eede4a5fb&src=2/vt=/?fromhash=1`;
    },
    // // 点击电话预约
    // phoneAction(phone) {
    //   this.tel = phone;
    //   this.isShow = true;
    // },
    // 取消预约
    // clearOrderAction() {
    //   this.isShow = false;
    //   this.tel = '';
    // },
    handler({ BMap, map }) {
      this.zoom = 2;
    },
    addZoom(level) {
      // 深圳坐标
      if (this.fl) {
        this.zoom = level;
        this.flag = false;
        this.fl = false;
      }
      this.newsPoint.lng = 113.515768;
      this.newsPoint.lat = 23.190624;
      //
      for (let val of shopData().data) {
        if (val.lng && val.lat) {
          this.showShopName.push(val);
        }
        console.log(this.showShopName);
        this.$forceUpdate();
      }
    },
    infoWindowClose(e) {
      this.infoWindow.show = false;
    },
    infoWindowOpen(marker, key) {
      console.log(!this.flag);
      if (!this.flag) {
        new Promise((resolve, reject) => {
          this.infoWindow.show = false;
          resolve();
        }).then(() => {
          this.newsPoint.lng = marker.lng;
          this.newsPoint.lat = marker.lat;
          this.infoWindow.contents = marker.addr;
          this.title = '康美大药房(' + marker.shopName + ')';
          this.timeAndTel = { business: marker.business, tel: marker.tel };
          this.imgAddr = marker.shopImage;
          this.infoWindow.show = true;
          this.ADDR = marker.addr;
          // console.log(this.infoWindow.show);
          // console.log(marker);
        });
      }
      console.log(this.infoWindow.show);
    },
    // clear() {
    //   this.infoWindow.contents = '';
    // },
    getStoreInfo() {
      let id = this.$route.query.id;
      if (id) {
        let shoplist = shopData().data;
        let value = shoplist.find(x => { return x.id.toString() === id });
        if (value) {
          this.showShopName.push(value);
          if (value.lng && value.lat) {
            // eslint-disable-next-line no-unused-vars
            // let Dbug = new Promise((resolve, reject) => {
            this.newsPoint.lng = value.lng;
            this.newsPoint.lat = value.lat;
            this.imgAddr = value.shopImage;
            this.title = this.title + '(' + value.shopName + ')';
            this.infoWindow.contents = value.addr;
            this.region = value.region;
            // resolve();
            // }).then(() => {
            this.infoWindow.show = true;
            this.ADDR = value.addr;
            // });

          } else {
            this.infoWindow.show = false;
            this.newsPoint.lng = 114.065127;
            this.newsPoint.lat = 22.559137;
            this.title = this.title + '(' + value.shopName + ')';
            this.imgAddr = value.shopImage;
            this.infoWindow.contents = value.addr;
            this.zoom = 11;
            this.flag = true;
          }
          this.timeAndTel.business = value.business;
          this.timeAndTel.tel = value.tel;
        }
      }
    }
  },
  created() {
    document.title = '线下门店地图';
    this.getStoreInfo();
    // localStorage.id = location.href.split('=')[1] || localStorage.id;
    // console.log(localStorage.id);
    // for (let value of shopData().data) {
    //   if (Number(localStorage.id) === value.id) {
    //     this.showShopName.push(value);
    //     if (value.lng && value.lat) {
    //       this.infoWindow.contents = value.addr;
    //       this.imgAddr = value.shopImage;
    //       this.title = this.title + '(' + value.shopName + ')';
    //       this.newsPoint.lng = value.lng;
    //       this.newsPoint.lat = value.lat;
    //       this.region = value.region;

    //       new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //           this.infoWindow.show = true;
    //           resolve();
    //         }, 100);
    //       }).then(() => {
    //         setTimeout(() => {
    //           this.ADDR = value.addr;
    //         }, 10);
    //       });
    //     } else {
    //       this.infoWindow.show = false;
    //       this.newsPoint.lng = 114.065127;
    //       this.newsPoint.lat = 22.559137;
    //       this.title = this.title + '(' + value.shopName + ')';
    //       this.imgAddr = value.shopImage;
    //       this.infoWindow.contents = value.addr;
    //       this.zoom = 11;
    //       this.flag = true;
    //     }
    //     this.timeAndTel.business = value.business;
    //     this.timeAndTel.tel = value.tel;
    //   }
    //   // if (value.lng && value.lat) { this.allAddr.push({ lng: value.lng, lat: value.lat }) }
    //   // console.log(this.showShopName);
    // }
    // this.$forceUpdate();
  }
};
</script>
<style>
/* 内容绑定父元素 */
.BMap_bubble_content>.win {
  display: block!important;
}
/* .BMap_pop>div:nth-child(8) {
  background: #000;
} */
</style>
<style lang="less" scoped>
[v-cloak] {
  display: none;
}
.km {
  font-size: 15px;
  line-height: 18px;
  background: #000;
}
#map {
  width: 100%;
  min-height: 100%;
  .addr {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 36;
    left: 0;
    width: 100%;
    min-height: 100%;
    .motify {
      position: fixed;
      top: 35%;
      left: 50%;
      width: 220px;
      padding: 0;
      margin: 0 0 0 -110px;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      line-height: 1.5em;
      border-radius: 6px;
      .motify_inner {
        padding: 10px;
        text-align: center;
        word-wrap: break-word;
      }
    }
    .foot {
      width: 100%;
      height: 60px;
      padding: 0;
      min-height: 1px;
      text-align: center;
      line-height: 16px;
      background-color: #f8f8f8;
      margin: 0 auto;
      .foot_links {
        height: 60px;
        color: #999;
        padding: 30px 15px 10px;
        a {
          padding: 0 6px;
          color: #666;
          font-size: 12px;
          border-right: 1px solid #e5e5e5;
        }
      }
    }
    .shopDetail {
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      box-sizing: border-box;
      padding: 10px;
      // background: red;
      .shopDetail_img {
        width: 60px;
        height: 60px;
        // background: #f60;
        display: flex;
        align-items: center;
        img {
          width: 60px;
          height: 45px;
        }
      }
      .shopDetail_right {
        width: 58px;
        height: 58px;
        background: #f60;
        border-left: 1px solid #e5e5e5;
        background: url(./img/mobile@2x.png);
        background-size: cover;
      }
      .shopDetail_center {
        flex: 1;
        height: auto;
        padding: 0 5px 0 8px;
        // background: #f60;
        p {
          height: 32px;
          &.p_one {
            word-wrap: break-word;
            word-break: break-all;
            margin-top: 1px;
            color: #333;
            font-size: 12px;
            line-height: 16px;
            width: 100%;
          }
          &.p_two {
            position: relative;
            font-size: 12px;
            line-height: 16px;
            white-space: nowrap;
            margin: 0 0 2px;
            margin-top: 1px;
            color: #999 !important;
          }
        }
      }
    }
    .map {
      height: 86vh;
      // flex: 1;
      width: 100%;
      .addZoom {
        // position: absolute;
        // top: 20px;
        // right: 20px;
        padding: 10px;
        border-radius: 10px;
        color: #ccc;
        background-color: #000;
        opacity: 0.5;
        font: inherit;
        font-size: 115%;
        vertical-align: baseline;
      }
      .win {
        position: relative;
        display: none;
        .info_window {
          padding: 10px;
          overflow: hidden;
          max-height: 52px;
          font-size: 12px;
          line-height: 1.5;
        }
        // .bug {
        //   width: 34px;
        //   height: 50px;
        //   position: absolute;
        //   top: 20px;
        //   right: 40px;
        //   z-index: 10;
        //   background: #000;
        // }
        .info_btn {
          position: absolute;
          top: 75%;
          right: 0;
          z-index: 10;
            display: inline-block;
            background-color: transparent;
            border: 1px solid #e5e5e5;
            border-radius: 3px;
            text-align: center;
            margin: 0;
            color: #999;
            font-size: 12px;
            line-height: 12px;
            padding: 4px;
        }
      }
    }
    .title {
      width: 100%;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      text-align: center;
      line-height: 16px;
      font-size: 12px;
      background: #fff7cc;
      color: #f60 !important;
      z-index: 1;
    }
  }
}

// 电话预约弹窗
.phone_window{
  width: 250px;
  height: 90px;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  background: #fff;
  z-index: 9;
  text-align: center;
  border-radius: 10px;
  .phone_windowTop{
    font-size: 14px;
    font-weight: 700;
    line-height: 55px;
    border-bottom: 1px solid #ccc;
  }
  .phone_windowBottom{
    width: 100%;
    display: flex;
    button{
      height: 100;
      width: 50%;
      margin-top: 4px;
      font-size: 16px;
      color: #409eff;
      border-right: 1px solid #ccc;
    }
    .right_btn{
      border-right: none;
    }
  }
}

// 遮罩层
.layer{
  width: 100% ;
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #000;
  opacity: 0.1;
  // z-index: -1;
}
</style>

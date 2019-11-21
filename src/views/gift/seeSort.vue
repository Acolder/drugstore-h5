<template>
  <div class="sort">
    <div class="map" id="map"></div>
    <div class="sort-lsit" :class="listShow ? 'sort-auto' : 'sort-hidden'">
      <div class="header" @click="seeList">
        <p>
          <span>全部（共{{sellerList.length}}家）</span>
          <i :class="listShow ? 'top' : 'bom'"></i>
        </p>
      </div>
      <div class="item-wrap">
        <div class="itme" v-for="(item,i) in sellerList" :key="i" @click="pointSeller(item)">
          <div class="name">
            <span>{{item.sellerName}}</span>
            <span>{{item.m}}</span>
          </div>
          <div class="addres">
            <span class="detailAddres">{{item.sellerAddress}}</span>
            <span>
              <a :href="'tel:' + item.mobile.split(',')[0]" class="call" v-if="item.mobile"></a>
              <i class="navigation" @click="navigation(item)" v-if="isWX"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="dialong" v-if="explainShow">
      <div class="explain">
        <div class="img">
          <img src="./image/pic_thxz.png" alt="">
        </div>
        <div class="explain-box">
          <p class="title">1.礼品有效期</p>
          <span>礼品支付成功后6个月内有效，请及时到门店提取，过期将无法提取。</span>
        </div>
        <div class="explain-box">
          <p class="title">2.预约凭证</p>
          <span>提货时必须提供登记的手机号码和系统发送的提货码，请妥善保存。</span>
        </div>
        <div class="explain-box">
          <p class="title">3.预约提货</p>
          <span>提货需要预约，请提前1天咨询门店。</span>
        </div>
      </div>
      <div class="btn">
        <button @click="seeSort">知道了</button>
      </div>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap';
import javaAjax from '@/utils/javaApiRequest';
import { distanceByLnglat, distanceTime, openMap } from '@/api/coordinate.js';
export default {
  data() {
    return {
      map: null,
      listShow: '',
      sellerList: [],
      explainShow: false,
      Point: '',
      isWX: ''
    };
  },
  methods: {
    seeSort() {
      this.explainShow = false;
    },
    seeList() {
      if (this.listShow) {
        this.listShow = false;
      } else {
        this.listShow = true;
      }
    },
    pointSeller(item) {
      this.map.panTo(new BMap.Point(item.longitude, item.latitude));
      this.listShow = false;
    },
    getSort() {
      let param = {
        sellerId: this.$route.query.id
      };
      let _this = this;
      javaAjax.post('/mall/presentOrder/queryStoreList', param).then(res => {
        console.log(res);
        if (res.status === 200 && res.data.resultCode === '0') {
          _this.sellerList = res.data.resultData;
          // getCoordinate(res => {
          // console.log(res);
          for (let i = 0; i < this.sellerList.length; i++) {
            // 获取当前定位
            // let geolocation = new BMap.Geolocation();
            // geolocation.getCurrentPosition(function(r) {
            // let res = r.point;
            // if (res) {
            // 计算距离 lng1(当前经度), lat1(当前纬度), lng2(目的地经度), lat2(目的地纬度)
            // let m =  distanceByLnglat( res.longitude, res.latitude,  114.0353900000, 22.5247550000);
            // console.log(res.longitude, res.latitude, _this.sellerList[i].longitude, _this.sellerList[i].latitude);
            let m = distanceTime(distanceByLnglat(_this.Point.lng, _this.Point.lat, _this.sellerList[i].longitude, _this.sellerList[i].latitude)).distanceTxt;
            this.$set(_this.sellerList[i], 'm', m);
            // let mdata = distanceTime(m);
            // this.sellerList[i].m = mdata.distanceTxt;
            // this.mtime = mdata.time;
            let p = { lat: _this.sellerList[i].latitude, lng: _this.sellerList[i].longitude };
            let point = new BMap.Marker(p); // 创建坐标点
            _this.map.addOverlay(point);      // 将标注添加到地图中
            // }
          }
          this.sellerList.sort((a, b) => {
            return a.m.split('m')[0].split('k')[0] - b.m.split('m')[0].split('k')[0];
          });
          // let pionts = {
          //   maxLng: _this.sellerList[0].longitude,
          //   maxLat: _this.sellerList[0].latitude,
          //   minLng: res.longitude,
          //   minLat: res.latitude
          // };
          console.log(_this.Point);
          let points = [
            new BMap.Point(_this.Point.lng, _this.Point.lat),
            new BMap.Point(_this.sellerList[0].longitude, _this.sellerList[0].latitude),
          ];
          // console.log(points);
          // this.setZoom(pionts);
          // let margins = [100, 100, 100, 100];
          let option = {
            enableAnimation: true,
            margins: [30, 30, 30, 30],
            zoomFactor: -1,
            delay: 200
          };
          _this.map.setViewport(points, option);
          // let center = _this.map.getViewport(points).center;
          // let zoom = _this.map.getViewport(points).zoom;
          // _this.map.setCenter(center);
          // _this.map.setZoom(zoom);
          // console.log(_this.map.getViewport(points));
          // });
          this.explainShow = true;
        }
      });
    },
    navigation(item) {
      console.log(1);
      openMap(item.latitude, item.longitude, item.sellerName, item.sellerAddress);
    },
    restMap() {
      let _this = this;
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        console.log(this.getStatus());
        if (this.getStatus() === 0) {
          console.log(r.point);
          _this.Point = r.point;
          console.log(_this.Point);
          _this.map.centerAndZoom(r.point, 15);
          // let pt = new BMap.Point(r.point.longitude, r.point.latitude);
          let myIcon = new BMap.Icon('https://uploads.kangmei.com.cn/Files/20181123/5mavd4c2.5qu.png', new BMap.Size(50, 50));
          let marker2 = new BMap.Marker(r.point, { icon: myIcon });  // 创建标注
          _this.map.addOverlay(marker2);
          _this.getSort();
        } else {
          console.log('failed' + this.getStatus());
        }
      }, { enableHighAccuracy: true });
    }
  },
  mounted() {
    this.map = new BMap.Map('map', { minZoom: 4, maxZoom: 16 });
    this.map.enableScrollWheelZoom(true);
  },
  created() {
    this.restMap();
    this.$nextTick(function () {
      (function(doc, win) {
        let docEl = doc.documentElement;
        let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        let recalc = function() {
          let clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = (clientWidth >= 750 ? 100 : clientWidth / 750 * 100) + 'px';
        };
        recalc();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);
    });

    let ua = navigator.userAgent.toLowerCase();
    console.log(ua.match(/MicroMessenger/i));
    if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
      this.isWX = true;
    } else {
      this.isWX = false;
    }

  }
};
</script>

<style lang="less" scoped>
.sort{
  width: 100%;
  height: 100%;
  .map{
    width: 100%;
    height: 100%;
  }
  .sort-hidden{
    overflow: hidden;
    height: 1rem;
    transition: height 0.5s;
  }
  .sort-lsit.sort-auto{
    overflow: auto;
    height: 9.6rem;
    transition: height 0.5s;
  }
  .sort-lsit{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    overflow: hidden;
    height: 1rem;
    .header{
      height: 1rem;
      width: 100%;
      line-height: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom: .01rem solid #e0e0e0;
      i{
        display: inline-block;
        width: .25rem;
        height: .14rem;
        background: url('./image/icon_xl@2x.png') no-repeat;
        background-size: 100% 100%;
        transform: rotate(180deg);
        margin-left: .15rem;
      }
      .top{
        transform: rotate(360deg);
        transition: transform 0.5s;
      }
      .bom{
        transform: rotate(180deg);
        transition: transform 0.5s;
      }
    }
    .item-wrap{
      height: 8.6rem;
      overflow-y: scroll;
    }
    .itme{
      padding: .3rem .2rem;
      border-bottom: .01rem solid #e0e0e0;
      .name{
        display: flex;
        justify-content: space-between;
        font-size: .3rem;
        margin-bottom: .15rem;
      }
      .addres{
        display: flex;
        justify-content: space-between;
        font-size: .25rem;
        .detailAddres{
          display: flex;
          align-items: center;
          width: 5rem;
        }
        .call{
          width: .48rem;
          height: .48rem;
          background: url('./image/icon_iphone@2x.png') no-repeat;
          background-size: 100% 100%;
          display: inline-block;
        }
        .navigation{
          width: .48rem;
          height: .48rem;
          background: url('./image/icon_dh@2x.png') no-repeat;
          background-size: 100% 100%;
          display: inline-block;
          margin-left: .3rem;
        }
      }
    }
  }
}
.dialong{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15,15,15,0.3);
  .explain{
    width: 5.84rem;
    background: #fff;
    border-radius: .12rem;
    margin: 1.8rem auto 0;
    padding-bottom: .5rem;
    .img{
      text-align: center;
      img{
        width: 5.11rem;
        height: 1.33rem;
        margin-top: -.69rem;
      }
    }
    .explain-box{
      padding: 0 .37rem;
      margin-top: .47rem;
      .title{
        color: #0ccdd3;
        font-size: .32rem;
        font-weight: 700;
        margin-bottom: .23rem;
      }
      span{
        line-height: .55rem;
      }
    }
  }
  .btn{
    text-align: center;
    margin-top: .65rem;
    button{
      width: 1.6rem;
      height: .68rem;
      background-color: #ffffff;
      border-radius: .12rem;
      color: #0ccdd3;
    }
  }
}
</style>

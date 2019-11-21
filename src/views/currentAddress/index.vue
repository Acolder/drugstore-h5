<template>
  <div>
    <div @click="getLoc">获取当前位置</div>
    <div @click="openMap">2222222</div>
    <div>{{kk}}</div>
    <span class="desc" style="color: red" @click="getAddr">地理位置接口-使用微信内置地图查看位置接口</span>
    <div id="allmap" style="width: 100%;height: 500px;"></div>
  </div>
</template>
<script>
import wxjs from '@/utils/wxjsInterface';
import { ajaxp } from '@/utils/jsonp';
import { getCoordinate, openMap, distanceByLnglat, mapabcEncryptToBdmap } from '@/api/coordinate';
export default {
  data() {
    return {
      wx: null,
      location: {},
      kk: ''
    };
  },
  mounted() {
    this.dist();
    this.baidu2();
  },
  created() {
    let _self = this;
    // let code = getQueryString('code');
    wxjs.init().then((res) => {
      console.log(res);
      _self.wx = res.wx;
      _self.wxResponseConfig = res.wxconfig;
    }).then(() => {
      _self.getAddr();
    });
  },
  methods: {
    getAddr() {
      let _self = this;
      _self.wx.ready(function () {
        _self.wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            let speed = res.speed; // 速度，以米/每秒计
            let accuracy = res.accuracy; // 位置精度
            console.log(latitude);
            console.log(longitude);
            console.log(speed);
            console.log(accuracy);
            alert(accuracy);
            alert(JSON.stringify(res));
            _self.distanceByLnglat(longitude, latitude, 115, 25);
          },
          cancel: function (res) {
            alert('用户拒绝授权获取地理位置');
          }
        });
        _self.wx.openLocation({
          latitude: 23.099994,
          longitude: 113.324520,
          name: 'TIT 创意园',
          address: '广州市海珠区新港中路 397 号',
          scale: 14,
          infoUrl: 'http://weixin.qq.com'
        });
      });

    },
    distanceByLnglat(lng1, lat1, lng2, lat2) {
      let radLat1 = this.Rad(lat1);
      let radLat2 = this.Rad(lat2);
      let a = radLat1 - radLat2;
      let b = this.Rad(lng1) - this.Rad(lng2);
      let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6371;
      s = Math.round(s * 1000);
      console.log(s);
      if (s >= 1000) {
        s = (s / 1000);
        s = s.toFixed(2) + '千米';
      } else {
        s = s + '米';
      }
      return s;
    },
    Rad(d) {
      return d * Math.PI / 180.0;
    },
    getLoc() {
      let _self = this;
      console.log(getCoordinate());
      getCoordinate().then((res) => {
        console.log(res);
        _self.location = res;
      });
    },
    openMap() {
      openMap(22.5285781131808, 114.06108654127866, 'kkk', 'ttttttt');
    },
    dist() {
      let _self = this;
      let hh = distanceByLnglat(_self.longitude, _self.latitude, 114.0, 22.5229);
      this.kk = hh;
    },
    baidu2() {
      let kk = mapabcEncryptToBdmap(22.562069, 114.034355);
      let latlon = kk.lat + ',' + kk.lng;
      let url = 'https://api.map.baidu.com/geocoder/v2/?ak=B7dm6TMatflSYBPc5ZS51LnIXBmifqoH&callback=renderReverse&location=' + latlon + '&output=json&pois=0';
      console.log(url);
      ajaxp({
        url: url,
        jsonp: 'renderReverse',
        data: {},   // 传输数据
        success(res) {
          console.log(res);
          if (res.status === 0 && res.result) {
            console.log(res.result.poiRegions[0].name);
          }
        }
      });
    }
  }
};
</script>

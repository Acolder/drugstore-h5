<template>
  <div class='distribution_wrapper'>
    <mt-header fixed title='配送详情'>
      <a slot='left' href='javascript:;' @click='goback'>
        <mt-button icon='back'></mt-button>
      </a>
    </mt-header>
    <div id='map_container' v-show="ing">
    </div>
    <div class='knight_info' v-show="ing">
      <div class='knight_avator'>
        <div class='knight_name'>
          {{order.courier_name}}
        </div>
      </div>
      <div class='time'>预计<span>{{order.estimatedTime}}</span>送达</div>
      <a class='call_knight' :href="'tel:'+order.courier_phone">联系骑手</a>
    </div>
    <div class="nomap" v-show="!ing">
      {{noMapDesc}}
    </div>
  </div>
</template>
<style lang='less' scoped>
.distribution_wrapper {
  height: 100%;
  padding-top: 44px;
  width: 100%;
  overflow: hidden;
  position: relative;

  .nomap {
    position: absolute;
    top: 44px;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }

  #map_container {
    height: 100%;
    width: 100%;
  }

  .knight_info {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    width: 94%;
    margin: 0 auto;
    background-color: #fff;
    height: 130px;
    border-radius: 3px;
    bottom: 20px;

    .knight_avator {
      position: absolute;
      width: 56px;
      height: 56px;
      border-radius: 28px;
      left: 0;
      right: 0;
      margin: 0 auto;
      background-image: url(./img/xh_icon_headmr@2x.png);
      background-repeat: no-repeat;
      background-size: cover;
      top: -28px;

      .knight_name {
        position: absolute;
        bottom: -20px;
        text-align: center;
        width: 100%;
      }
    }

    .time {
      font-size: 18px;
      color: #333;
      position: absolute;
      top: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 1.5em;

      span {
        color: #0ccdd3;
      }
    }

    .call_knight {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 80px;
      height: 28px;
      padding: 2px 0 0 0;
      border-radius: 5px;
      border: 1px solid #666;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 13px;
    }
  }
}

</style>
<script>
import javaApi from '@/utils/javaApiRequest';
import { TMap } from '@/utils/TMap';
import { QQOverlay } from '@/utils/QQMapOverlay';
import { bdmapEncryptToMapabc } from '@/api/coordinate';
export default {
  data() {
    return {
      map: null,
      order: {
        'courier_phone': '',
        'merchantLat': 22.548156,
        'merchantLng': 114.062935,
        'userLat': 22.5626,
        'userLng': 114.06276,
        'riderLat': 22.567411,
        'riderLng': 114.0628411,
        'courier_name': '',
        'estimatedTime': '00:00',
        'merchantDistance': '',
        'userDistance': '',
        'min': '0',
        'status': '20'
      }
    };
  },
  computed: {
    statusTxt() {
      let v = this.order;
      if (String(v.status) === '20') {
        return '骑手正赶往药房';
      } else if (String(v.status) === '30') {
        return '骑手正赶往客户';
      }
      return '';
    },
    distanceDesc() {
      let v = this.order;
      if (String(v.status) === '20') {
        return '距药房';
      } else if (String(v.status) === '30') {
        return '距您';
      }
    },
    distanceTxt() {
      let v = this.order;
      if (String(v.status) === '20') {
        return this.formatDistance(v.merchantDistance) + '  ' + v.min + '分钟';
      } else if (String(v.status) === '30') {
        return this.formatDistance(v.userDistance) + '  ' + v.min + '分钟';
      }
    },
    ing() {
      return String(this.order.status) === '20' || String(this.order.status) === '30';
    },
    noMapDesc() {
      let st = this.order.status;
      if (String(st) === '0') {
        return '骑手接单中，请稍后~';
      } else if (String(st) === '50') {
        return '订单已送达';
      } else if (String(st) === '99') {
        return '订单已取消';
      }
      return '';
    }
  },
  mounted() {
    this.setBubbleStyle();
    let orderId = this.$route.query.orderId;
    if (orderId) {
      this.getOrderInfo(orderId);
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    formatDistance(ds) {
      if (ds < 1000) {
        return Math.floor(ds) + 'm';
      } else {
        return Math.floor(ds * 100) / 100000 + 'km';
      }

    },
    async getOrderInfo(orderId) {
      let url = '/mall/back/order/logisticsInfo';
      let req = {
        orderId: orderId,
        logisticsType: '美团'
      };
      let orderRes = await javaApi.post(url, req);
      if (orderRes && orderRes.status === 200 && orderRes.data && orderRes.data.resultCode === '0') {
        this.order = orderRes.data.resultData;
      }

      let mps = bdmapEncryptToMapabc(this.order.merchantLat, this.order.merchantLng);
      let ups = bdmapEncryptToMapabc(this.order.userLat, this.order.userLng);
      let rps = bdmapEncryptToMapabc(this.order.riderLat, this.order.riderLng);

      this.order.merchantLat = mps.lat;
      this.order.merchantLng = mps.lng;
      this.order.userLat = ups.lat;
      this.order.userLng = ups.lng;
      this.order.riderLat = rps.lat;
      this.order.riderLng = rps.lng;

      this.initTMap();
    },
    setMerchantPosition(QQMap) {
      let point = new QQMap.maps.LatLng(this.order.merchantLat, this.order.merchantLng);
      let overlay = QQOverlay(point, require('./img/xh_icon_pharmacy@2x.png'), QQMap);
      overlay.setMap(this.map);
    },
    setUserPosition(QQMap) {
      let point = new QQMap.maps.LatLng(this.order.userLat, this.order.userLng);
      let overlay = QQOverlay(point, require('./img/xh_icon_userzb@2x.png'), QQMap);
      overlay.setMap(this.map);
    },
    setRiderPosition(QQMap) {
      let options = {
        statusTxt: this.statusTxt,
        distanceDesc: this.distanceDesc,
        distanceTxt: this.distanceTxt
      };
      let point = new QQMap.maps.LatLng(this.order.riderLat, this.order.riderLng);
      let overlay = QQOverlay(point, require('./img/xh_icon_motorcycle@2x.png'), QQMap, options);
      overlay.setMap(this.map);
    },
    setBubbleStyle() {
      let head = document.getElementsByTagName('head')[0];
      if (!head) {
        return;
      }
      let style = document.createElement('style');
      style.type = 'text/css';
      let htmls = '';
      htmls += '.distribution_info {background-color: #fff;position: fixed;width: 150px;height: 48px;border-radius: 24px;border: 1px solid #eee;z-index: 1;display: flex;flex-direction: column;justify-content: center;}';
      htmls += '.status {width: 100%;text-align: center;font-size: 16px;color: #333;}';
      htmls += '.distance {font-size: 11px;color: #666;display: flex;justify-content: center;}';
      htmls += '.normal {flex: none;}.colorful {color: #0ccdd3;flex: none;}';
      htmls += '.trianle {position: absolute;top: 100%;left: 71px;width: 0;height: 0;border-width: 8px;border-style: solid;border-color: #fff transparent transparent transparent;}';
      style.innerHTML = htmls;
      head.appendChild(style);
    },
    initTMap() {
      let container = document.getElementById('map_container');
      TMap('LHDBZ-OEHWQ-YNC5P-GXCQM-EUXFS-HVBL4').then((QQMap) => {
        this.map = new QQMap.maps.Map(container, {
          center: new QQMap.maps.LatLng(this.order.riderLat, this.order.riderLng),
          zoom: 15,
          disableDefaultUI: true
        });
        this.setMerchantPosition(QQMap);
        this.setUserPosition(QQMap);
        this.setRiderPosition(QQMap);
      });
    }
  }
};

</script>

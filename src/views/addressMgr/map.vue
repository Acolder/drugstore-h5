<template>
  <div class="map_wrapper" :style="'padding-top:'+container_pd">
    <mt-header fixed :title="pageTitle" v-show="!search_input_Focusd">
      <a slot="left" href="javascript:;" @click="goback">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="search_bar" :style="'padding-right:'+search_rpd" :class="{search_bar_fixed:search_input_Focusd}">
      <span class="city_selector" @click="selectCity">{{currentCity}}</span><input type="search" placeholder="小区/写字楼/学校等" @search="search" @input="search" v-model="keyword" @focus="search_focus">
      <i v-show="search_input_Focusd" @click.stop="cancel">取消</i>
    </div>
    <div class="map_container_wrapper" v-show="!search_input_Focusd">
      <div class="map_container" id="map_container">
      </div>
      <div class="locationBtn" @click.stop="locate"></div>
      <div class="center_point"></div>
    </div>
    <ul class="building_list" :class="{'onsearch':search_input_Focusd}">
      <li v-for="(p,i) in points" :key="i" @click.stop="finalSelect(p)">
        <div class="building_name">{{p.title}}</div>
        <div class="detail_address">{{p.address}}</div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
@import '../../styles/mixin.less';

.map_wrapper {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .search_bar {
    flex: none;
    padding: 0 8px 0 8px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.search_bar_fixed{
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
    }
    .city_selector {
      flex: none;
    }

    span,
    input {
      display: inline-flex;
      align-items: center;
      height: 30px;
      background-color: #f5f5f5;
      border: none;
    }

    i {
      flex: none;
      display: inline-flex;
      align-items: center;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 8px;
      height: 30px;
      margin: auto 0;
      width: 30px;
      color: #0ccdd4;
    }

    span {
      position: relative;
      padding-left: 14px;

      &:after {
        content: "";
        display: inline-block;
        width: 6.364px;
        height: 6.364px;
        position: absolute;
        top: 9px;
        right: -16px;
        .turn-icon(#b7b7b7, 6.364px, -45deg);
      }
    }

    input {
      flex: 1;
      padding-left: 48px;
    }
  }

  .map_container_wrapper {
    position: relative;
    width: 100%;
    flex: 1;

    .map_container {
      z-index: 0;
      width: 100%;
      height: 100%;
    }

    .locationBtn {
      z-index: 1;
      position: absolute;
      bottom: 20px;
      right: 20px;
      background-image: url(./img/con_xh_dw@2x.png);
      width: 30px;
      height: 30px;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .center_point {
      z-index: 1;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      background-image: url(./img/con_xh_zb@3x.png);
      width: 33px;
      height: 45px;
      background-size: 30px 40px;
      background-repeat: no-repeat;
      transform: scale(0.8);
    }
  }

  .building_list {
    flex: none;
    padding-left: 15px;
    height: 240px;
    padding-bottom: 50px;
    overflow-y: auto;

    &.onsearch {
      flex: 1;
    }

    li {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      padding: 12px 0 12px 40px;
      border-bottom: 1px solid #e0e0e0;

      &:before {
        content: " ";
        display: inline-block;
        width: 11px;
        height: 15px;
        background-image: url(./img/iconpla_sos@2x.png);
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }

      &:first-child {
        &:before {
          background-image: url(./img/con_xh_zb@2x.png);
        }
      }

      .building_name {
        font-size: 16px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .detail_address {
        padding-right: 13px;
        font-size: 13px;
        color: #333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
}

</style>
<script>
import BMap from 'BMap';
import { searchPoints } from '@/api/addressMgr';
export default {
  data() {
    return {
      map: null,
      points: [],
      keyword: '',
      pageTitle: '新增收货地址',
      currentCity: '深圳',
      search_input_Focusd: false,
      container_pd: '44px',
      search_rpd: '8px',
      from: ''
    };
  },
  mounted() {
    let _this = this;
    if (this.$route.query.isEdit === 1) {
      this.pageTitle = '修改收货地址';
    }
    this.setBodyNoScroll();
    this.map = new BMap.Map('map_container', { minZoom: 4, maxZoom: 18 });
    this.map.addEventListener('dragend', function() {
      _this.getPoints(_this.map.getCenter());
    });
    this.map.addEventListener('click', function(ev) {
      _this.map.centerAndZoom(ev.point, 15);
      _this.getPoints(ev.point);
    });
    this.currentCity = sessionStorage.getItem('selectedCity');
    sessionStorage.removeItem('selectedCity');
    if (this.currentCity) {
      this.map.centerAndZoom(this.currentCity, 15);
      setTimeout(() => {
        let c = this.map.getCenter();
        this.getPoints(c);
      }, 300);
    } else {
      this.locate();
    }
  },
  beforeDestroy() {
    window.document.body.style.overflowY = 'auto';
  },
  methods: {
    getPoints(p) {
      let geo = new BMap.Geocoder();
      geo.getLocation(p, (r) => {
        this.points = r.surroundingPois || [];
      });
    },
    locate() {
      let _this = this;
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === 0) {
          _this.currentCity = r.address.city;
          _this.map.centerAndZoom(r.point, 15);
          _this.getPoints(r.point);
        } else {
          console.log('failed' + this.getStatus());
        }
      }, { enableHighAccuracy: true });
    },
    search() {
      let _this = this;
      searchPoints(this.map, this.keyword, function(rs) {
        _this.points = rs;
      });
    },
    search_focus() {
      this.search_input_Focusd = true;
      this.container_pd = '50px';
      this.search_rpd = '48px';
    },
    cancel() {
      this.search_input_Focusd = false;
      this.container_pd = '44px';
      this.search_rpd = '8px';
    },
    selectCity() {
      let q = this.$route.query;
      q.path = this.$route.path;
      this.$router.push({
        path: '/addressMgr/citys',
        query: q
      });
    },
    finalSelect(p) {
      sessionStorage.setItem('map_address', JSON.stringify(p));
      this.goback();
    },
    setBodyNoScroll() {
      window.document.body.style.overflowY = 'hidden';
    },
    goback() {
      let query = this.$route.query;
      query.map = 1;
      this.$router.replace({
        path: '/addressMgr/edit',
        query: query
      });
    }
  }
};

</script>

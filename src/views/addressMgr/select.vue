<template>
  <div class="page" :style="'padding-top:'+ pd_top + 'px;'">
    <mt-header fixed title="选择收货地址">
      <a slot="left" href="javascript:;" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div id="map_container" v-show="false"></div>
    <div class="button-manage" @click.stop="manage()">地址管理</div>
    <div class="search_bar" :style="'padding-right:'+search_rpd" v-show="complexUI">
      <span class="city_selector" @click="selectCity">{{currentCity}}</span><input type="search" placeholder="小区/写字楼/学校等" @search="search" @input="search" v-model="keyword" @focus="search_focus">
      <i v-show="search_input_Focusd" @click.stop="cancel">取消</i>
    </div>
    <div class="currentcity" v-show="!search_input_Focusd&&complexUI">
      <div class="title">当前位置</div>
      <div class="location_city">
        <span class="cityname" @click.stop="selectLocate">{{locatePosition}}</span>
        <button class="location" @click.stop="reLocate">重新定位</button>
      </div>
    </div>
    <div class="address-list" v-show="!search_input_Focusd" :class="{empty: isEmpty}">
      <p class="address-list_title" v-show="complexUI">
        收货地址
      </p>
      <div class="empty_content" v-show="isEmpty">
        <img src="./img/icon_pla_queshengadd@2x.png" alt="">
        <h2 class="empty_desc">暂无收货地址~</h2>
        <button @click.stop="addOne" class="add_new_addr" v-show="isEmpty">
          新增地址
        </button>
      </div>
      <div class="display-box address-item" v-for="a in addresses" :key="a.addressId" :class="String(a.isAvailable) === '0' ? 'failure-bg' : ''" @click="select(a)">
        <span class="failure-txt" v-if="String(a.isAvailable) === '0' && from!=='index' && from!=='prescriptionBuy'">失效</span>
        <div class="box-flex">
          <div class="name-phone">
            <span class="name">{{a.addressName}}</span>
            <span class="phone">{{a.addressPhone}}</span>
          </div>
          <div class="address">
            收货地址：{{a.addressProvince+a.addressCity+a.addressDistrict+a.addressDetail+a.addressNum}}
          </div>
        </div>
      </div>
    </div>
    <ul class="building_list" v-show="search_input_Focusd&&complexUI">
      <li v-for="(p,i) in points" :key="i" @click.stop="finalSelect(p)">
        <div class="building_name">{{p.title}}</div>
        <div class="detail_address">{{p.address}}</div>
      </li>
    </ul>
    <div class="address-addOne" @click="addOne" v-show="!search_input_Focusd&&!isEmpty">
      添加新地址
    </div>
  </div>
</template>
<script>
import java from '@/utils/javaApiRequest';
import { getToken } from '@/utils/auth';
import { searchPoints, locate, getAddress } from '@/api/addressMgr';
import { Toast } from 'mint-ui';
import BMap from 'BMap';
export default {
  data() {
    return {
      addresses: [],
      defaultId: '1',
      map: null,
      points: [],
      keyword: '',
      currentCity: '深圳',
      currentPosition: {
        addressProvince: '',
        addressCity: '',
        addressDistrict: '',
        addressDetail: ''
      },
      search_input_Focusd: false,
      search_rpd: '8px',
      from: '',
      isEmpty: false,
      fromPath: ''
    };
  },
  computed: {
    locatePosition() {
      return this.currentPosition.addressProvince + this.currentPosition.addressCity + this.currentPosition.addressDistrict + this.currentPosition.addressDetail || '正在定位...';
    },
    complexUI() {
      return this.$route.query.from === 'index';
    },
    pd_top() {
      let f = this.$route.query.from === 'index';
      let r = 0;
      if (f) {
        r = 94;
      } else {
        r = 44;
      }
      return r;
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(from, 'from');
    // this.fromPath = from.fullPath;
    next(vm => {
      vm.fromPath = from.fullPath;
    });
  },
  methods: {
    getAddressList() {
      let data = {
        userToken: getToken()
      };
      let addressArg = JSON.parse(sessionStorage.getItem('addressArg'));
      if (addressArg) {
        data.getFast = addressArg.getFast ? addressArg.getFast : '';
        data.lon = addressArg.lon ? addressArg.lon : '';
        data.lat = addressArg.lat ? addressArg.lat : '';
      }
      java.post('/mall/address/queryAddress', data).then((res) => {
        if (res.data && String(res.data.resultCode) === '0') {
          this.addresses = res.data.resultData;
          if (!this.addresses || this.addresses.length === 0) {
            this.isEmpty = true;
          }
        }
      });
    },
    addOne(evt) {
      this.$router.push({
        path: '/addressMgr/edit',
        query: { isEdit: false, from: this.from }
      });
    },
    manage() {
      this.$router.push({
        path: '/addressMgr',
        query: { from: this.from }
      });
    },
    select(a) {
      if (String(a.isAvailable) === '0' && this.from !== 'index' && this.from !== 'prescriptionBuy') {
        Toast('收货地址超出配送范围');
        return false;
      }
      if (a) {
        console.log(this.from);
        sessionStorage.setItem('selectedAddress', JSON.stringify(a));
        if (this.from !== 'multWayDelivery') {
          let coordinate = {};
          coordinate.latitude = a.latitude;
          coordinate.longitude = a.longitude;
          sessionStorage.setItem('coordinate', JSON.stringify(coordinate));
        }
        if (this.from === 'BuyMedicine') {
          sessionStorage.setItem('selectedAddressBm', JSON.stringify(a));
        }
        if (this.complexUI) {
          sessionStorage.removeItem('coordinateIndex');
          sessionStorage.setItem('selectedAddrIndex', JSON.stringify(a));
        }
      }
      if (this.from === 'prescriptionBuy') {
        this.$router.replace({
          name: this.from,
          query: { from: 'addressSelect', order_id: this.$route.query.order_id }
        });
      } else {
        // 返回的路由如果为登录页，跳转回首页
        if (this.fromPath.indexOf('login') === -1 && this.fromPath.indexOf('fastLogin') === -1) {
          this.$router.go(-1);
        } else {
          this.$router.replace({
            path: '/'
          });
        }
      }
    },
    cancel() {
      this.search_input_Focusd = false;
      this.search_rpd = '8px';
    },
    selectCity() {
      this.$router.push({
        path: '/addressMgr/citys',
        query: { path: '/addressMgr/select?from=' + this.from }
      });
    },
    search() {
      let _this = this;
      searchPoints(this.map, this.keyword, function(rs) {
        _this.points = rs;
      });
    },
    search_focus() {
      this.search_input_Focusd = true;
      this.search_rpd = '48px';
    },
    finalSelect(p) {
      let rs = {};
      rs.latitude = p.point.lat;
      rs.longitude = p.point.lng;
      sessionStorage.setItem('coordinate', JSON.stringify(rs));
      sessionStorage.setItem('architecture', p.title);
      sessionStorage.removeItem('selectedAddrIndex');
      this.$router.push({ name: this.from });
    },
    reLocate() {
      this.currentPosition = {};
      let temp = {};
      locate().then((res) => {
        let point = new BMap.Point(res.lng, res.lat);
        this.getPoints(point);
        getAddress(res).then((a) => {
          temp.latitude = res.lat;
          temp.longitude = res.lng;
          temp.addressProvince = a.province;
          temp.addressCity = a.city;
          temp.addressDistrict = a.district;
          temp.addressDetail = a.street;
          temp.isAvailable = '1';
          temp.addressChecked = '0';
          this.currentPosition = temp;
        });
      });
    },
    getPoints(p) {
      let geo = new BMap.Geocoder();
      geo.getLocation(p, (r) => {
        this.points = r.surroundingPois || [];
      });
    },
    selectLocate() {
      let rs = {};
      rs.latitude = this.currentPosition.latitude;
      rs.longitude = this.currentPosition.longitude;
      sessionStorage.setItem('coordinate', JSON.stringify(rs));
      sessionStorage.setItem('architecture', this.currentPosition.addressDetail);
      sessionStorage.removeItem('selectedAddrIndex');
      sessionStorage.removeItem('selectedAddress');
      this.$router.push({ name: this.from });
    }
  },
  mounted() {
    window.document.body.style.overflowY = 'hidden';
    this.from = this.$route.query.from || '';
    this.map = new BMap.Map('map_container', { minZoom: 4, maxZoom: 18 });
    this.getAddressList();
    this.reLocate();
    this.currentCity = sessionStorage.getItem('selectedCity') || this.currentCity;
    sessionStorage.removeItem('selectedCity');
    if (this.currentCity) {
      this.map.centerAndZoom(this.currentCity, 15);
    }
  },
  beforeDestroy() {
    window.document.body.style.overflowY = 'auto';
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';

.page {
  position: relative;
  background-color: #e0e0e0;
  min-height: 100%;
  padding-top: 44px;
  padding-bottom: 66px;

  .button-manage {
    position: fixed;
    right: 13px;
    top: 14px;
    color: @green-color;
    font-size: 16px;
    line-height: 1em;
    z-index: 2;
  }

  .currentcity {
    .border-1px(#e0e0e0);
    background-color: #fff;
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px 0;
    margin-bottom: 10px;

    .title {
      color: #888;
      font-size: 12px;
      padding-left: 14px;
    }

    .location_city {
      display: flex;

      span {
        flex: 1;
        display: flex;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        justify-content: flex-start;
        align-items: center;
        padding-left: 14px;
      }

      button {
        flex: none;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 14px;
        color: #ff4c56;
        font-size: 13px;

        &:before {
          content: " ";
          display: inline-block;
          width: 24px;
          height: 24px;
          background-image: url(./img/con_xh_dwhy@2x.png);
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    }
  }

  .search_bar {
    flex: none;
    padding: 0 8px 0 8px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 10;

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

  .building_list {
    flex: none;
    padding-left: 15px;
    overflow-y: auto;
    background-color: #fff;
    position: absolute;
    top: 90px;
    left: 0;
    bottom: 0;
    width: 100%;

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
        top: 25px;
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

  .address-list {
    .address-list_title {
      padding-left: 8px;
      font-size: 15px;
      color: #888;
      padding-top: 8px;
      background-color: #fff;
    }

    &.empty {
      background-color: #fff;
      width: 100%;
      position: absolute;
      top: 169px;
      bottom: 0;

      .empty_content {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        img {
          width: 125px;
          height: 125px;
        }

        .empty_desc {
          font-size: 13px;
          color: #8e8e8e;
          margin-bottom: 25px;
        }

        .add_new_addr {
          color: #0ccdd3;
          border: 1px solid #0ccdd3;
          width: 140px;
          height: 36px;
          border-radius: 18px;
        }
      }
    }

    .address-item {
      align-items: center;
      margin-bottom: 10px;
      background-color: #fff;

      .failure-txt {
        .background-radius-btn(17px, 6px, #b7b6b6, 20px, 11px);
        margin-left: 10px;
      }

      .name-phone {
        padding: 10px 10px 0 10px;
        display: flex;
        font-size: 15px;

        .name {
          flex: 1;
          text-align: left;
        }

        .phone {
          flex: 1;
          text-align: right;
        }
      }

      .address {
        padding: 0 10px 10px 10px;
        .border-1px(#e0e0e0);
      }
    }

    .address-item.failure-bg {
      background: @gray-bg;
    }
  }

  .address-addOne {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 44px;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f75858;
  }
}

</style>

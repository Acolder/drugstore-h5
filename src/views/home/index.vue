<template>
  <div id="home">
    <div class="top" :style="`background: rgba(35,205,211, ${opacity})`">
      <div class="header">
        <div class="header-left" @click="goCheckAddr">
          <i class="icon-dz"></i>
          <span class="left dz">{{locationAddr}}</span>
          <i class="icon-jt"></i>
        </div>
        <div class="box-flex search">
          <div class="from">
            <i class="icon-fdj"></i>
            <input class="box" type="text" placeholder="搜索药品、症状" @click="search">
          </div>
        </div>
        <div class="header-right">
          <a class="icon-xx" @click="clickMes"></a>
          <label class="circle-num" v-show="unReadNum > 0">{{unReadNum}}</label>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="banner">
        <swiper :swiperData="bannerSwiper"></swiper>
      </div>
      <div class="ify-list">
        <div class="list-box">
          <div class="ify-top">
            <div class="ify one-line" @click="goConsult">
              <img src="./imgs/pla_home_zxys.png" alt="">
              <span>咨询药师</span>
            </div>
            <div class="ify one-line" @click="goAskDoctor">
              <img src="./imgs/index/xh_home_zxwy.png" alt="">
              <span>在线问医</span>
            </div>
            <a href="javascript:void(0);" @click="emedicine" class="ify one-line">
              <img src="./imgs/index/xh_scgy_pfzy.png" alt="">
              <span>拍方抓药</span>
            </a>
            <router-link to="/MedicineCabinet/near" class="ify other-line">
              <img src="./imgs/index/pla_home_fjyg.png" alt="">
              <span>附近药柜</span>
            </router-link>
            <router-link to="/headlines" class="ify other-line">
              <img src="./imgs/index/icon-jktt@2x.png" alt="">
              <span>健康头条</span>
            </router-link>
            <!-- <router-link to="/chineseDrug/RareDrugs" class="ify">
            <img src="./imgs/index/icon-qxqy@2x.png" alt="">
            <span>寻稀缺药</span>
          </router-link> -->
            <router-link to="/special/crossBorder" class="ify other-line">
              <img src="./imgs/index/kjgy.png" alt="">
              <span>跨境购</span>
            </router-link>
          </div>
          <div class="letter-list">
            <div class="letter">
              <i class="icon-dg"></i>
              <span class="text">药多多医多多健康多 </span>
            </div>
            <div class="letter">
              <i class="icon-dg"></i>
              <span class="text">20万家药房全覆盖 </span>
            </div>
            <div class="letter">
              <i class="icon-dg"></i>
              <span class="text">医生药师在线咨询 </span>
            </div>
          </div>
        </div>
      </div>
      <!--药品专题-->
      <div class="selected selection-drug" v-show="goodDrugBannerList.length>0">
        <div class="hot-img-list">
          <div class="img" v-for="(item,index) in goodDrugBannerList" :key="index"
               :class="index % 3 === 0 ? 'img-first' : ''">
            <a href="javascript:void(0);" @click="drugBannerClick(item)">
              <img :src="item.picture_path" alt="">
            </a>
          </div>
        </div>
      </div>
      <div class="selected-list" :class="isMore ? '' : 'pack-up'" v-if="selectedList">
        <div class="item" v-for="selected in selectedList" :key="selected.id"
             @click="searchByList(selected.category_name)">
          <img class="icon" :src="selected.category_img">
          <span class="text">{{selected.category_name}}</span>
        </div>
        <div class="item more" @click="packUpMore">
          <i class="icon"></i>
          <span class="text" v-html="isMore ? '收起' : '展开'"></span>
        </div>
      </div>
      <div class="selected health-top" v-show="healthBannerList.length > 0">
        <div class="title">
          <h2 class="left title-text">健康头条</h2>
          <router-link to="/headlines" class="right mint-cell-allow-right">更多</router-link>
        </div>
        <div class="img-list health-headline">
          <div class="img" v-for="(item,index) in healthBannerList" :key="index">
            <a :href="newsDetailLink + item.newsid">
              <img :src="item.picture_path" alt="">
              <label class="txt">{{item.title}}</label>
            </a>
          </div>
        </div>
      </div>
      <goods-list :goodsData="goodsList"></goods-list>
    </div>
    <location-pop :state="showSetAddrPop" @openLocation="openLocation"></location-pop>
    <div class="common-mask" v-show="noSupportServe"></div>
    <div class="pop-boxs" v-show="noSupportServe">
      <label class="tlt">请先设置收货地址哦~</label>
      <label class="txt">12333</label>
      <span class="clearfix btn-box">
        <label class="right">知道了</label>
        <label class="right">修改地址</label>
      </span>
    </div>
  </div>
</template>
<script>
import javaAjax from '@/utils/javaApiRequest';
import ajax from '@/utils/ajax';
import { getQueryString } from '@/utils/index';
import { login, goInquiry, goEMedicine } from '@/api/user';
import { Swipe, SwipeItem, Toast } from 'mint-ui';
import swiper from './component/swiper';
import goodsList from './component/goodsList';
import locationPop from '../../components/setLocationPopup/setLocationPopup.vue';
import { getCoordinate, locationName } from '@/api/coordinate';
// import { getMsgNum } from '@/api/getMsgNum';
import { ryInit, getTotalUnreadCount } from '@/api/rongyun';
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      scrollFunction: null,
      opacity: 0,
      bannerSwiper: null,
      goodsList: null,
      goodDrugBannerList: [],
      healthBannerList: [],
      newsDetailLink: `${process.env.WEB_HOST}/headlines/detail?id=`,
      selectedAddr: null,
      locationCoor: {
        'latitude': 0,
        'longitude': 0
      },
      locationAddr: '正在定位',
      showSetAddrPop: false,
      setAddrInfo: {},
      unReadNum: 0,
      noSupportServe: false,
      headHeath: false,
      isMore: false,
      selectedList: null
    };
  },
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem,
    'swiper': swiper,
    'goods-list': goodsList,
    'location-pop': locationPop
  },
  computed: {
    ...mapGetters([
      'searchConditions',
    ]),
  },
  methods: {
    ...mapActions([
      'SetSearchConditions',
    ]),
    clickMes(message) {
      window.location.href = '/inquiry/chatList';
    },
    monitorScroll() {
      let _this = this;
      this.scrollFunction = function () {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop <= 5) {
          _this.opacity = 0;
        }
        else if (scrollTop > 5 && scrollTop <= 110) {
          _this.opacity = scrollTop / 110;
        }
        else {
          _this.opacity = 1;
        }
      };
      window.addEventListener('scroll', this.scrollFunction);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    login() {
      // .net 接口登录测试
      login().then((res) => {
        console.log(res);
      });
    },
    // 在线问医
    goAskDoctor() {
      // intoInquiry();
      goInquiry();
    },
    // 咨询药师
    goConsult() {
      location.href = '/inquiry/consultPharmacist';
    },
    // 搜索过度页
    search() {
      this.$router.push('/search/index-transition');
    },
    // 分类跳转
    searchByList(text) {
      this.$router.push({
        name: 'druglist',
        params: { categoryName: text }
      });
    },
    drugBannerClick(data) {
      if (data) {
        if (data.picture_url) {
          let link = data.picture_url.replace('from=app', 't=');
          link = link.replace(process.env.WEB_HOST_APP, process.env.WEB_HOST);
          location.href = link;
        }
      }
    },
    getSelectAddr() {
      this.selectedAddr = JSON.parse(sessionStorage.getItem('selectedAddrIndex'));
    },
    // 获取定位
    getLocation() {
      let addrInfo = this.selectedAddr;
      let _this = this;
      let architecture = sessionStorage.getItem('architecture');
      if (addrInfo) {
        this.getAddrInfo();
      }
      else if (architecture) {
        this.locationAddr = architecture;
      }
      else {
        sessionStorage.setItem('hasGetLocation', 0);
        getCoordinate((res) => {
          if (res.latitude) {
            _this.locationAddr = '正在定位';
            _this.locationCoor = res;
            _this.getAddrName();
            _this.saveLocation();
          } else if (res === 'cancel') {
            this.showSetAddrPop = true;
          }
        });
        setTimeout(() => {
          let hasGetLocation = sessionStorage.getItem('hasGetLocation');
          if (hasGetLocation === '0') {
            this.locationAddr = '定位失败';
            this.showSetAddrPop = true;
          }
        }, 6000);
      }
    },
    // 根据经纬度获取地名
    getAddrName() {
      console.log(this.locationCoor);
      let _this = this;
      let locationCoor = this.locationCoor;
      locationName(locationCoor.latitude, locationCoor.longitude, (res) => {
        console.log(res);
        let result = res.result;
        let addressComponent = result.addressComponent;
        if (addressComponent && addressComponent.street) {
          _this.locationAddr = addressComponent.street;
        }
      });
    },
    openLocation() {
      this.getLocation();
    },
    goCheckAddr() {
      let name = this.$route.name;
      this.$router.push({
        path: '/addressMgr/select',
        query: { from: name }
      });
    },
    // 获取选择地址的经纬度
    getAddrInfo() {
      let addrInfo = this.selectedAddr;
      this.setAddrInfo = addrInfo;
      console.log(this.setAddrInfo);
      if (addrInfo) {
        this.locationCoor.latitude = Number(addrInfo.latitude);
        this.locationCoor.longitude = Number(addrInfo.longitude);
        this.locationAddr = addrInfo.addressDetail;
        this.saveLocation();
      }
    },
    saveLocation() {
      sessionStorage.setItem('coordinate', JSON.stringify(this.locationCoor));
      let searchCondition = this.searchConditions;
      searchCondition.latitude = this.locationCoor.latitude;
      searchCondition.longitude = this.locationCoor.longitude;
      this.SetSearchConditions(searchCondition);
    },
    // 获取会话列表
    getConversationList() {
      let _this = this;
      window.instance.getConversationList({
        onSuccess: function (conversations) {
          getTotalUnreadCount((count) => {
            _this.unReadNum = count;
            console.info('剩余数据条数,', count);
          });
        }
      }, null);
    },
    // 监听消息设置
    RYOnReceived(message) {
      console.log(message);
      let _this = this;
      getTotalUnreadCount((count) => {
        _this.unReadNum = count;
      });
      switch (message.messageType) {
        case window.RongIMClient.MessageType.TextMessage:
          // message.content.content => 消息内容
          break;
        case window.RongIMClient.MessageType.VoiceMessage:
          // 对声音进行预加载
          // message.content.content 格式为 AMR 格式的 base64 码
          break;
        case window.RongIMClient.MessageType.ImageMessage:
          // message.content.content => 图片缩略图 base64。
          // message.content.imageUri => 原图 URL。
          break;
        case window.RongIMClient.MessageType.DiscussionNotificationMessage:
          // message.content.extension => 讨论组中的人员。
          break;
        case window.RongIMClient.MessageType.LocationMessage:
          // message.content.latiude => 纬度。
          // message.content.longitude => 经度。
          // message.content.content => 位置图片 base64。
          break;
        case window.RongIMClient.MessageType.RichContentMessage:
          // message.content.content => 文本消息内容。
          // message.content.imageUri => 图片 base64。
          // message.content.url => 原图 URL。
          break;
        case window.RongIMClient.MessageType.InformationNotificationMessage:
          // do something...
          break;
        case window.RongIMClient.MessageType.ContactNotificationMessage:
          // do something...
          break;
        case window.RongIMClient.MessageType.ProfileNotificationMessage:
          // do something...
          break;
        case window.RongIMClient.MessageType.CommandNotificationMessage:
          // do something...
          break;
        case window.RongIMClient.MessageType.CommandMessage:
          // do something...
          break;
        case window.RongIMClient.MessageType.UnknownMessage:
          // do something...
          break;
        default:
        // do something...
      }
    },
    // 请求消息数量
    getMsg() {
      ryInit(this.RYOnReceived, this.getConversationList);
    },
    // 获取是否支持配送服务
    // getSupportServe() {
    //   let url = '/mall/seller/getSellerLonAndLat';
    //   let data = {
    //     longitude: this.locationCoor.longitude,
    //     latitude: this.locationCoor.latitude
    //   };
    //   console.log(data);
    //   javaAjax.post(url, data).then((res) => {
    //     console.log(res);
    //   });
    // },
    // 获取商品分类
    getProuductClass() {
      javaAjax.post(`${process.env.ES_BASE_HOST}/elasticsearch/Category/getProductCTopNew`).then(res => {
        console.log(res.data);
        if (res.status === 200) {
          if (res.data.resultCode === '0') {
            this.selectedList = res.data.resultData;
          }
          else {
            Toast(res.data.msg);
          }
        }
      });
    },
    // 展开收起
    packUpMore() {
      console.log(this.isMore);
      this.isMore = this.isMore ? !this.isMore : true;
      console.log(this.isMore);
    },
    // 跳转检查 如果是支付宝扫码打开药葫芦药柜购药二维码则跳转提示页，后期开发支付宝二维码后不再调用此方法
    redirectCheck() {
      let ua = navigator.userAgent.toLowerCase();
      this.userAgent = ua;
      if (ua.indexOf('alipayclient') >= 0) { // 支付宝
        let code = getQueryString('code');
        if (code) {
          this.$router.push('/error/weChatOpenTip');
        }
      }
    },
    // 数据初始化
    initData() {
      // 请求轮播图
      ajax({
        url: '/api/home/banner?version=v2.0',
        method: 'get'
      }).then(data => {
        if (data.status === 200 && data.data.code === 0) {
          this.bannerSwiper = data.data.data;
        }
      });
      // 请求电商商品
      ajax({
        url: '/api/home/goodsBanner?version=v2.0',
        method: 'get'
      }).then(data => {
        if (data.status === 200 && data.data.code === 0) {
          this.goodsList = data.data.data;
        }
      });
      // 请求药品专题
      ajax({
        url: '/api/home/goodDrugBanner?version=v3.0&publishTarget=2',
        method: 'get'
      }).then(data => {
        if (data.status === 200 && data.data.code === 0) {
          this.goodDrugBannerList = data.data.data;
        }
      });
      // 请求健康头条
      ajax({
        url: '/api/home/newsBanner',
        method: 'get'
      }).then(data => {
        if (data.status === 200 && data.data.code === 0) {
          this.healthBannerList = data.data.data;
        }
      });
    },
    emedicine() {
      goEMedicine();
    }
  },
  created() {
    this.initData();
    this.redirectCheck();
  },
  mounted() {
    // this.login();
    // this.getLoc();
    this.getSelectAddr();
    this.monitorScroll();
    this.getAddrName();
    // this.saveLocation();
    this.getLocation();
    this.getProuductClass();
    this.getMsg();
    sessionStorage.setItem('consultSource', JSON.stringify(1)); // 聊天来源: 1药葫芦 2问诊室 3药柜 4药箱 5电商
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollFunction);
  }
};
</script>
<style lang="less" scoped>
  @import "../../styles/mixin.less";
  #home {
    height: 100%;
    widows: 100%;
  }
  .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: @green-color;
    z-index: 99;
  }
  .header {
    height: 44px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      padding: 2px 10px;
      color: #FFF;
      font-size: 12px;
      border-radius: 20px;
      background: rgba(0, 0, 0, 0.32);
      .icon-dz {
        float: left;
        width: 10px;
        height: 13px;
        background: url(./imgs/index/icon-dz@2x.png) no-repeat;
        background-size: 100%;
        margin: 4px 5px 0 0;
      }
      .dz {
        max-width: 76px;
        .aline-text-overflow(16px);
        line-height: 20px;
      }
      .icon-jt {
        display: inline-block;
        width: 6px;
        height: 8px;
        background: url(./imgs/index/icon-jt@2x.png) no-repeat;
        background-size: 100%;
        margin-left: 5px;
      }
    }
    .header-right {
      position: relative;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.32);
      .icon-xx {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url(./imgs/index/icon-xx@2x.png) no-repeat;
        background-size: 100%;
        margin: 5px;
      }
      .circle-num {
        // position: absolute;
        top: -6px;
        right: -7px;
        // width: 18px;
        // .background-radius-btn(17px, 0, @red-color, 50%, 9px);
        // line-height: 16px;
      }
    }
  }
  .search {
    height: 45px;
    display: flex;
    align-items: center;
    .from {
      height: 26px;
      width: 100%;
      padding: 0 32px 0 20px;
      position: relative;
      .box {
        height: 26px;
        width: 100%;
        border-radius: 14px;
        border: 0;
        background: #FFF;
        padding-left: 35px;
        line-height: 26px;
        color: #999;
      }
      .icon-fdj {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(./imgs/index/tab-search@2x.png) no-repeat;
        background-size: 100%;
        margin-right: 5px;
        position: absolute;
        left: 24px;
        top: 7px;
      }
      .icon-sm {
        display: inline-block;
        width: 13px;
        height: 13px;
        background: url(./imgs/index/icon-sys@2x.png) no-repeat;
        background-size: 100%;
        margin-left: 5px;
        position: absolute;
        right: 28px;
        top: 8px;
      }
    }
  }
  .main {
    background: #EEEEF4;
    margin: 0 0 48px;
  }
  .banner {
    width: 100%;
    height: 172px;
  }
  .ify-list {
    position: relative;
    height: 214px;
    width: 100%;
    background: @white-color;
    padding: 0 10px;
    .list-box {
      position: absolute;
      top: -14px;
      width: calc(100% - 20px);
      background: @white-color;
      box-shadow: 0px 1px 5px 1px #CCC;
      border-radius: 3px;
      .ify-top {
        display: flex;
        // height: 85px;
        // justify-content: space-around;
        // align-items: center;
        padding: 6px 20px;
        flex-wrap: wrap;
        .ify {
          position: relative;
          display: flex;
          width: calc(100% / 3);
          padding: 11px 0 10px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          img {
            width: 40px;
            height: 40px;
            margin-bottom: 5px;
          }
        }
        .ify:nth-child(3n-1), .ify:nth-child(3n) {
          &:after{
            content: '';
            position: absolute;
            left: 0;
            width: 1px;
            height: 76%;
            background: @color-fa;
            // border-left: solid 1px @color-fa;
          }
        }
        .ify.one-line{
          border-bottom: solid 1px @color-fa;
          &:after{
            bottom: 0;
          }
        }
        .ify.other-line{
          &:after{
            top: 0;
          }
        }
        .ify.no-line{
          &:after{
            border: none;
          }
        }
      }
    }
  }
  .letter-list {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: @border-line;
    .letter {
      font-size: 10px;
      color: #E73534;
      display: flex;
      align-items: center;
      // transform: scale(0.96);
      height: 20px;
      line-height: 20px;
      .icon-dg {
        // float: left;
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url(./imgs/index/icon-dg@2x.png) no-repeat;
        background-size: 100%;
        margin: -1px 4px 0 0;
      }
      .text {
        font-size: 10px;
      }
    }
  }
  .selected {
    width: 100%;
    // height: 120px;
    padding-bottom: 10px;
    margin-top: 10px;
    background: @white-color;
    .title {
      height: 40px;
      line-height: 40px;
      margin-left: 10px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .selection-drug {
    margin: 0;
  }
  .health-top {
    .title {
      padding: 11px 0;
      line-height: 18px;
      font-weight: normal;
      .title-text {
        height: 18px;
        padding-left: 10px;
        border-left: solid 3px @green-color;
      }
      .right {
        color: @color666;
        padding-right: 22px;
      }
    }
  }
  .recommend {
    margin-top: 10px;
    background: @white-color;
    .title {
      line-height: 26px;
      margin-left: 10px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .hot-img-list {
    display: -webkit-box;
    display: flex;
    padding: 0 12px;
    justify-content: space-around;
    overflow-x: scroll;
    .img {
      display: flex;
      width: 26%;
      height: 116px;
      margin-left: 8px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img-first {
      width: calc(48% - 16px);
      margin: 0;
    }
  }
  .img-list {
    // height: 88px;
    overflow-x: scroll;
    display: -webkit-box;
    margin-right: 10px;
    justify-content: space-around;
    .img {
      height: 116px;
      // width: 150px;
      margin-left: 12px;
      img {
        height: 100%;
        // height: 100%;
      }
    }
  }
  .health-headline {
    .img {
      width: 173px;
      height: auto;
      img {
        width: 100%;
        height: 90px;
      }
      .txt {
        display: block;
        max-height: 40px;
        text-align: justify;
        word-break: break-all;
        overflow: hidden;
      }
    }
  }
  .selected-list {
    position: relative;
    background: #FFF;
    margin-top: 10px;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    // height: 283px;
    padding: 5px 0;
    .item {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin: 8px 0 5px 0;
    }
    .icon {
      width: 32px;
      height: 32px;
      margin-bottom: 8px;
    }
    .more {
      position: absolute;
      bottom: 5px;
      right: 0;
      background: @white-color;
      .icon {
        width: 25px;
        height: 32px;
        background: url("./imgs/index/icon-home-packup.png") no-repeat 0 6px;
        background-size: 100%;
      }
    }
  }
  .selected-list.pack-up {
    height: 232px;
    overflow: hidden;
    .more {
      bottom: 8px;
      .icon {
        background: url("./imgs/index/icon-home-more.png") no-repeat 0 6px;
        background-size: 100%;
      }
    }
  }
  .goods {
    background: @white-color;
    padding-top: 15px;
  }
  .pop-boxs {
    .align-center(fixed);
    width: 80%;
    padding: 20px 22px 0;
    border-radius: 5px;
    background: @white-color;
    .tlt {
      display: block;
      font-size: 16px;
    }
    .txt {
      display: block;
      font-size: 13px;
      margin: 8px 0;
    }
    .btn-box {
      height: 42px;
      line-height: 42px;
      label {
        font-size: 12px;
        padding-left: 15px;
        color: @green-color;
      }
    }
  }
</style>

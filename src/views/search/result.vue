<template>
  <div class="result-box gray-background">
    <v-search @onSearch="goSearch" :msg="searchConditions.keywords" :keywords="searchConditions.keywords"></v-search>
    <mt-navbar fixed v-model="selectNav">
      <mt-tab-item id="synthesis">
        <div class="mint-label" @click="selectTab('synthesis')">综合</div>
      </mt-tab-item>
      <mt-tab-item id="disease">
        <div class="mint-label" @click="selectTab('disease')">症状</div>
      </mt-tab-item>
      <mt-tab-item id="drug">
        <div class="mint-label" @click="selectTab('drug')">药品</div>
      </mt-tab-item>
      <mt-tab-item id="information">
        <div class="mint-label mint-label-last" @click="selectTab('information')">资讯</div>
      </mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selectNav">
      <mt-tab-container-item id="synthesis">
        <div class="mgb10 module-box ask-doctor" @click="AskDoctor">
          <img src="./img/result/quick.png" />
          <label class="fs-16">快速问医生</label>
        </div>
        <div class="mgb10 module-box disease-box">
          <label class="mint-cell-allow-right box-tlt" @click="goDisease">症状（{{diseaseDataNum}}）</label>
          <v-disease class="no-arrows" :disease-data="diseaseData"></v-disease>
        </div>
        <div class="line"></div>
        <div class="mgb10 module-box drug-box">
          <label class="mint-cell-allow-right box-tlt" @click="goDrug">药品（{{drugDataNum}}）</label>
          <v-drug v-show="drugData&&drugData.length>0" v-for="drug in drugData" :drug="drug" :key="drug.product_id"></v-drug>
        </div>
        <div class="module-box information-box">
          <label class="mint-cell-allow-right box-tlt" @click="goInfo">资讯（{{infoDataNum}}）</label>
          <v-information :info-data="infoData"></v-information>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="disease" class="info-container">
        <mt-loadmore :top-method="loadDisTop" :bottom-method="loadDisBottom" :bottom-all-loaded="allDisLoaded" :auto-fill="false" ref="loadMoreDis">
          <v-disease :disease-data="diseasePageData"></v-disease>
        </mt-loadmore>
        <v-no-data v-show="noDiseaseData"></v-no-data>
        <div class="no-more" v-show="showNoDisMore">没有更多了</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="drug">
        <v-drug-page ref='drug-page' :fixedTop="89" sytle="height:100%;overflow-y:auto;"></v-drug-page>
      </mt-tab-container-item>
      <mt-tab-container-item id="information" class="info-container" :style="{'-webkit-overflow-scrolling': scrollModeInfo}">
        <mt-loadmore :top-method="loadInfoTop" :bottom-method="loadInfoBottom" :bottom-all-loaded="allInfoLoaded" :auto-fill="false" ref="loadMoreInfo">
          <v-information :info-data="infoPageData"></v-information>
        </mt-loadmore>
        <v-no-data v-show="noInfoData"></v-no-data>
        <div class="no-more" v-show="showNoInfoMore">没有更多了</div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div v-show="selectNav === 'synthesis'">
      <v-shop-cart></v-shop-cart>
    </div>
    <div v-show="selectNav === 'drug'">
      <inquiry-cart></inquiry-cart>
    </div>
  </div>
</template>
<script>
import { Header, Loadmore } from 'mint-ui';
import { intoInquiry } from '@/api/user';
import javaAjax from '@/utils/javaApiRequest';
import drugListHeader from '../../components/drugListHeader/index.vue';
import drugList from '../../components/drugListItem/index.vue';
import drugPageList from '../../components/drugsResult/index.vue';
import searchInput from './../../components/search/searchInput.vue';
import floatShopCart from './../../components/floatShopCart/index.vue';
import inquiryCart from './../../components/inquiryCar/index.vue';
import disease from './searchCommon/disease.vue';
import information from './searchCommon/information.vue';
import { facilityModel, getQueryString } from '../../utils/index';
import noData from '../../components/nothingDataPage/search.vue';
import { getToken } from '@/utils/auth';
import { mapGetters, mapActions } from 'vuex';
const STORAGE_KEY = 'indexSearchKey';
export default {
  data() {
    return {
      facilityModel: facilityModel(),
      keyword: '',
      selectNav: 'synthesis',
      diseaseData: [],
      diseaseDataNum: 0,
      infoData: [],
      infoDataNum: 0,
      drugData: [],
      drugDataNum: 0,
      diseasePageData: [],
      infoPageData: [],
      drugPageData: [],
      infoPage: 0, // 资讯请求当前页
      allInfoLoaded: true,
      showNoInfoMore: true,
      scrollModeInfo: 'auto',
      disPage: 0, // 病症请求当前页
      allDisLoaded: false,
      showNoDisMore: false,
      scrollModeDis: 'auto',
      hasSearch: false,
      coordinate: {},
      noDiseaseData: true,
      noInfoData: false,
      searchHistory: this.fetchSearchValue(), // 搜索历史
    };
  },
  components: {
    'mt-header': Header,
    'v-list-header': drugListHeader,
    'v-drug': drugList,
    'v-drug-page': drugPageList,
    'v-search': searchInput,
    'v-disease': disease,
    'v-information': information,
    'v-shop-cart': floatShopCart,
    'inquiry-cart': inquiryCart,
    'mt-loadmore': Loadmore,
    'v-no-data': noData
  },
  mounted() {
    this.keyword = getQueryString('keyword') ? getQueryString('keyword') : '';
    let conditions = this.searchConditions;
    conditions.keywords = this.keywords;
    this.SetSearchConditions(conditions);
    this.allData();
    this.requesDiseaseData(0);
    this.requesInfoData(0);
    this.loadDrugData();
    // this.getKeyword();
  },
  computed: {
    ...mapGetters([
      'searchConditions'
    ])
  },
  methods: {
    ...mapActions([
      'SetSearchConditions'
    ]),
    // 快速问医
    AskDoctor: function() {
      intoInquiry();
    },
    goSearch(msg) {
      // this.keywords = '';
      this.keyword = msg;
      let searchText = this.keyword;
      searchText = searchText.replace(/(^\s*)|(\s*$)/g, ''); // 去除字符串两边的空格
      if (searchText.length === 0) {
        return false;
      }
      let urlVal = window.location.href;
      window.location.href = this.putUrlParam(urlVal, 'keyword', searchText);
      this.saveSearchValue(searchText);
      // this.hasSearch = true;
      // sessionStorage.setItem('keys', msg);
      this.allData();
      this.requesDiseaseData(0);
      this.requesInfoData(0);
      this.loadDrugData();
    },
    putUrlParam(url, ref, value) {
      // 如果没有参数
      if (url.indexOf('?') === -1) { return url + '?' + ref + '=' + value }
      // 如果不包括此参数
      if (url.indexOf(ref) === -1) { return url + '&' + ref + '=' + value }
      let arr_url = url.split('?');
      let base = arr_url[0];
      let arr_param = arr_url[1].split('&');
      for (let i = 0; i < arr_param.length; i++) {
        let paired = arr_param[i].split('=');

        if (paired[0] === ref) {
          paired[1] = value;
          arr_param[i] = paired.join('=');
          break;
        }
      }
      return base + '?' + arr_param.join('&');
    },
    // 保存搜索历史到localStorage
    saveSearchValue(keyword) {
      if (this.searchHistory.includes(keyword)) {
        let delIndex = this.searchHistory.indexOf(keyword);
        this.searchHistory.splice(delIndex, 1);
      }
      if (this.searchHistory.length === 10) {
        this.searchHistory.splice(0, 1);
      }
      this.searchHistory.push(keyword);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.searchHistory));
    },
    // 从localStorage中取出搜索历史
    fetchSearchValue() {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    },
    // 综合页
    allData() {
      this.selectNav = sessionStorage.getItem('searchSelectNav');
      this.selectNav = this.selectNav ? this.selectNav : 'synthesis';
      this.diseaseData = [];
      this.drugData = [];
      this.infoData = [];
      let userToken = getToken();
      // this.keyword = this.keyword ? this.keyword : '';
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/searchapp/homeSearch`;
      let coordinate = JSON.parse(sessionStorage.getItem('coordinate'));
      if (coordinate) {
        this.coordinate = coordinate;
      } else {
        this.coordinate = {
          latitude: 0,
          longitude: 0
        };
      }
      let data = {
        keyword: this.keyword,
        devicetype: facilityModel,
        lat: this.coordinate.latitude,
        lon: this.coordinate.longitude,
        accountId: userToken
      };
      javaAjax.post(url, data).then((res) => {
        if (res.status === 200 && res.data.resultCode === '0' && res.data.resultData) {
          console.log(res.data.resultData, 'jieguo');
          res.data.resultData.forEach(value => {
            let vContent = value.content;
            // 症状
            if (value.type === 'symptom_info') {
              vContent.forEach((v, i) => {
                if (i <= 1) {
                  this.diseaseData.push(v);
                }
              });
              this.diseaseDataNum = value.totalElements;
            }
            // 药品
            if (value.type === 'product') {
              vContent.forEach((v, i) => {
                if (i <= 1) {
                  this.drugData.push(v);
                }
              });
              this.drugDataNum = value.totalElements;
            }
            // 资讯
            if (value.type === 'news_info') {
              vContent.forEach((v, i) => {
                if (i <= 2) {
                  this.infoData.push(v);
                }
              });
              this.infoDataNum = value.totalElements;
            }
          });
        }
      });
    },
    // 病症页
    requesDiseaseData(page) {
      this.disPage = page;
      // this.diseasePageData = [];
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/commonsearch/advancedquerywithtypes`;
      let data = {
        keyword: this.keyword,
        devicetype: facilityModel,
        lat: this.coordinate.latitude,
        lon: this.coordinate.longitude,
        accountId: getToken(),
        types: 'symptom_info',
        page: page
      };
      javaAjax.post(url, data).then((res) => {
        if (res.status === 200 && res.data.resultCode === '0' && res.data.resultData) {
          let resultData = res.data.resultData;
          let resultContent = resultData.content;
          if (resultData.totalPages === 0) {
            this.showNoDisMore = false;
            this.diseasePageData = [];
            this.noDiseaseData = true;
          }
          if (resultContent.length > 0) {
            if (this.disPage === 0) {
              this.diseasePageData = res.data.resultData.content;
            } else {
              this.diseasePageData = this.diseasePageData.concat(resultContent);
            }
            if (this.disPage + 1 >= resultData.totalPages) {
              this.showNoDisMore = true;
              this.allDisLoaded = true;
            } else {
              this.showNoDisMore = false;
              this.allDisLoaded = false;
            }
            if (resultData.totalPages === 1 && resultContent.length < 13) {
              this.showNoDisMore = false;
            }
            this.$nextTick(() => {
              this.scrollModeDis = 'touch';
            });
            this.noDiseaseData = false;
          }
        }
      });
    },
    // 资讯页
    requesInfoData(page) {
      this.infoPage = page;
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/commonsearch/advancedquerywithtypes`;
      let data = {
        keyword: this.keyword,
        devicetype: facilityModel,
        lat: this.coordinate.latitude,
        lon: this.coordinate.longitude,
        accountId: getToken(),
        types: 'news_info',
        page: page
      };
      javaAjax.post(url, data).then((res) => {
        if (res.status === 200 && res.data.resultCode === '0' && res.data.resultData) {
          let resultData = res.data.resultData;
          let resultContent = resultData.content;
          if (resultData.totalPages === 0) {
            this.showNoInfoMore = false;
            this.infoPageData = [];
            this.noInfoData = true;
          }
          if (resultContent.length > 0) {
            if (this.infoPage === 0) {
              this.infoPageData = resultContent;
            } else {
              this.infoPageData = this.infoPageData.concat(resultContent);
            }
            if (this.infoPage + 1 >= resultData.totalPages) {
              this.showNoInfoMore = true;
              this.allInfoLoaded = true;
            } else {
              this.showNoInfoMore = false;
              this.allInfoLoaded = false;
            }
            if (resultData.totalPages === 1 && resultContent.length < 7) {
              this.showNoInfoMore = false;
            }
            this.$nextTick(() => {
              this.scrollModeInfo = 'touch';
            });
            this.noInfoData = false;
          }
        }
      });
    },
    // 加载药品数据 7月23日王里军添加
    loadDrugData() {
      let conditions = this.searchConditions;
      conditions.keywords = this.keyword;
      conditions.categoryName = '';
      conditions.page = 0;
      conditions.sortField = '';
      conditions.sort = 'ASC';
      sessionStorage.getItem('');
      let coordinate = JSON.parse(sessionStorage.getItem('coordinate'));
      if (coordinate) {
        if (!conditions.latitude && coordinate.latitude) {
          conditions.latitude = coordinate.latitude;
        }
        if (!conditions.longitude && coordinate.longitude) {
          conditions.longitude = coordinate.longitude;
        }
      }
      this.SetSearchConditions(conditions);
      this.$refs['drug-page'].clearCategory();
      this.$refs['drug-page'].searchDrugs(true);
    },
    // 下拉刷新病症
    loadDisTop() {
      this.disPage = 0;
      this.diseasePageData = [];
      this.showNoDisMore = false;
      this.requesDiseaseData(this.disPage);
      this.$refs.loadMoreDis.onTopLoaded();
    },
    // 上拉加载更多病症
    loadDisBottom() {
      this.disPage += 1;
      this.requesDiseaseData(this.disPage);
      this.$refs.loadMoreDis.onBottomLoaded();
    },
    // 下拉刷新资讯
    loadInfoTop() {
      this.infoPage = 0;
      this.infoPageData = [];
      this.showNoInfoMore = false;
      this.requesInfoData(this.infoPage);
      this.$refs.loadMoreInfo.onTopLoaded();
    },
    // 上拉加载更多资讯
    loadInfoBottom() {
      this.infoPage += 1;
      this.requesInfoData(this.infoPage);
      this.$refs.loadMoreInfo.onBottomLoaded();
    },
    // tab切换
    selectTab(name) {
      sessionStorage.setItem('searchSelectNav', name);
    },
    // 跳到症状页
    goDisease() {
      this.selectNav = 'disease';
      sessionStorage.setItem('searchSelectNav', 'disease');
    },
    // 跳到药品页
    goDrug() {
      this.selectNav = 'drug';
      sessionStorage.setItem('searchSelectNav', 'drug');
    },
    // 跳到资讯页
    goInfo() {
      this.selectNav = 'information';
      sessionStorage.setItem('searchSelectNav', 'information');
    }
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';

.no-more {
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.result-box {
  height: 100%;
}

.box-tlt {
  display: block;
  height: 44px;
  line-height: 44px;
  clear: both;
  font-size: 16px;
  padding: 0 12px;
  border-bottom: @border-line;
}

.ask-doctor {
  height: 60px;
  line-height: 56px;
  color: @black-color;
  text-align: center;

  img {
    width: 30px;
    height: 30px;
    margin-right: 3px;
    vertical-align: middle;
  }
}

.result-box {
  padding-top: 88px;

  .module-box {
    background: @white-color;
  }
}

.mint-navbar {
  top: 44px;
  height: 45px;
  border-bottom: @border-line;

  .mint-tab-item {
    height: 44px;
    padding: 6px 0;

    .mint-label {
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      border-right: @border-line;
    }

    .mint-label-last {
      border: none;
    }
  }
}
/deep/.mint-navbar.is-fixed {
  top:43px!important;
}
.mint-tab-container {
  height: 100%;
  overflow-y: scroll;
}

</style>

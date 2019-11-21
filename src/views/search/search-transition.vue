<template>
  <div class="has-header search-body">
    <search-input @onSearch="searchByKeyword" @keywordChange="keywordChange" @inputsBlur="searchBlur"></search-input>
    <ul class="search-complete" v-show="searchComplete.length > 0">
      <li v-for="complete in searchComplete" :key="complete" @click="searchByList(complete)">{{ complete }}</li>
    </ul>
    <div class="transition-box">
      <label class="title clearfix">
        历史搜索
        <span class="right" @click="clearLocalStorage">
          <img src="./img/transition/delete-sc@2x.png" height="15" width="15" slot="icon">
        </span>
      </label>
      <ul class="list clearfix">
        <li v-for="item in searchHistoryShow" :key="item" @click="searchByList(item)">{{ item }}</li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="transition-box">
      <label class="title">
        热门
      </label>
      <ul class="list clearfix">
        <li v-for="hlist in hotList" :key="hlist" @click="searchByList(hlist)">{{ hlist }}</li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="transition-box">
      <label class="title no-border">
        常见分类
      </label>
      <ul class="common-list clearfix">
        <li v-for="clist in commonList" :key="clist.text" @click="searchByList(clist.text)">
          <img :src="clist.url"/><br />
          {{ clist.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import  { MessageBox } from 'mint-ui';
import searchInput from './../../components/search/searchInput';
import javaAjax from '@/utils/javaApiRequest';
const STORAGE_KEY = 'medSearchKey';

export default {
  name: 'search-transition',
  data() {
    return {
      searchComplete: [], // 搜索补全数据
      searchHistory: this.fetchSearchValue(), // 搜索历史
      searchHistoryShow: this.historyShow(), // 显示搜索历史
      hotList: '', // 热门
      commonList: [
        { url: require('./img/transition/icon-gmfs@2x.png'), text: '感冒发烧' },
        { url: require('./img/transition/icon-qrjd@2x.png'), text: '清热解毒' },
        { url: require('./img/transition/icon-etyy@2x.png'), text: '儿童用药' },
        { url: require('./img/transition/icon-cwyy@2x.png'), text: '肠胃用药' },
        { url: require('./img/transition/icon-ksyy@2x.png'), text: '咳嗽用药' },
        { url: require('./img/transition/icon_nxjk@2x.png'), text: '女性健康' },
        { url: require('./img/transition/icon_nxjkn@2x.png'), text: '男性健康' },
        { url: require('./img/transition/icon_xfsh@2x.png'), text: '性福生活' },
        { url: require('./img/transition/icon_yekb@2x.png'), text: '眼耳口鼻' },
        { url: require('./img/transition/icon_pfyy@2x.png'), text: '皮肤用药' },
        { url: require('./img/transition/icon_fsgs@2x.png'), text: '风湿骨伤' },
        { url: require('./img/transition/icon_ysty@2x.png'), text: '药食同源' },
        { url: require('./img/transition/icon_bjsp@2x.png'), text: '保健食品' },
        { url: require('./img/transition/icon_zbys@2x.png'), text: '滋补养生' },
        { url: require('./img/transition/icon_ylqx@2x.png'), text: '医疗器械' },
        { url: require('./img/transition/icon_yzgh@2x.png'), text: '药妆个护' }] // 常见分类
    };
  },
  components: {
    'search-input': searchInput
  },
  methods: {
    // 搜索输入框改变执行此方法
    keywordChange(keywords) {
      let _this = this;
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/commonsearch/querykeyword`;
      javaAjax.post(url, { keyword: keywords }).then(resp => {
        if (resp.status === 200 && String(resp.data.resultCode) === '0') {
          _this.searchComplete = resp.data.resultData;
        }
      });
    },
    // 搜索框失焦
    searchBlur() {
      this.searchComplete = [];
    },
    // 搜索
    searchByKeyword(keyword) {
      let searchText = keyword;
      searchText = searchText.replace(/(^\s*)|(\s*$)/g, ''); // 去除字符串两边的空格
      if (searchText.length === 0) {
        return false;
      }
      this.saveSearchValue(searchText);
      this.$router.push({
        path: '/search/result', query: { keyword: searchText }
      });
    },
    // 点击搜索历史/热门/常见分类进行搜索
    searchByList(text) {
      this.saveSearchValue(text);
      this.$router.push({
        path: '/search/result', query: { keyword: text }
      });
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
    // 清空localStorage中搜索历史
    clearLocalStorage() {
      if (this.searchHistory.length > 0) {
        MessageBox.confirm('确定清空搜索历史吗？').then(() => {
          window.localStorage.removeItem(STORAGE_KEY);
          this.searchHistory.splice(0, this.searchHistory.length);
          this.searchHistoryShow.splice(0, this.searchHistoryShow.length);
        }).catch(() => {
          console.log('取消');
        });
      }
    },
    // 显示搜索历史 (倒序)
    historyShow() {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]').reverse();
    },
    getHotList() {
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/hot/getHotKeywordList`;
      javaAjax.post(url).then(resp => {
        let resultData = resp.data;
        if (resp.status === 200 && String(resultData.resultCode) === '0') {
          this.hotList = resultData.resultData.length <= 10 ? resultData.resultData : resultData.resultData.splice(0, 10);
        }
      });
    }
    // getCommonList() {
    //   let url = `${process.env.ES_BASE_HOST}/elasticsearch/Category/getProductCTop`;
    //   javaAjax.post(url).then(resp => {
    //     console.log(resp);
    //     let resultData = resp.data;
    //     if (resp.status === 200 && String(resultData.resultCode) === '0') {
    //       this.commonList = resultData.resultData;
    //     } else if (String(resultData.resultCode) === '-2') {
    //       Toast('请先登录！');
    //       this.$router.push({ path: '/login' });
    //     }
    //   });
    // }
  },
  mounted() {
    // 获取热门
    this.getHotList();
    // 获取常见分类
    // this.getCommonList();
  }
};
</script>

<style lang="less" scoped>
  @black-color: #333;
  @color99: #999;
  @color66: #666;
  @colore0: #e0e0e0;
  @border-bottom: solid 1px #e6e6e6;
  @border: solid 1px #e6e6e6;
  .search-body {
    position: relative;
    min-height: 100%;
    background: #eeeef3;
  }
  .line{
    border-bottom: solid 10px #eeeef3;
  }
  .search-complete {
    position: absolute;
    top: 38px;
    left: 0;
    width: calc(100% - 89px);
    margin: 0 52px 0 37px;
    background: #eeeef3;
    border: solid 1px @colore0;
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
    z-index: 10;
    li {
      color: @color99;
      padding: 3px 12px;
      &:first-child {
        padding-top: 5px;
      }
      &:last-child {
        padding-bottom: 5px;
      }
    }
  }
  .transition-box {
    background: #fff;
    padding: 0 12px;
    .title {
      position: relative;
      display: block;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      padding: 0 12px;
      color: @color66;
      border-bottom: @border-bottom;
      &.no-border {
        border-bottom: none;
      }
    }
    .list {
      padding: 5px 0;
      li {
        margin: 5px 8px 5px 0;
        padding: 5px 10px;
        border: @border;
        color: @color66;
        display: inline-block;
        border-radius: 15px;
        font-size: 15px;
        &.on {
          border-color: #34affd;
          color: #34affd;
        }
      }
    }
    .common-list {
      padding: 5px 0;
      li {
        margin: 10px 0;
        color: @color66;
        display: inline-block;
        border-radius: 15px;
        font-size: 14px;
        text-align: center;
        width: 25%;
        &.on {
          border-color: #34affd;
          color: #34affd;
        }
        img {
          width: 40px;
        }
      }
    }
  }
</style>

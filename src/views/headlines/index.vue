<template>
  <div class="page">
    <mt-header fixed title="健康头条">
      <a href="javascript:void(0);" @click="goBack" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="load-more-container" :style="{ '-webkit-overflow-scrolling': scrollMode }">
      <headline-menu :menus="menus" :headlineMenuConWidth="headlineMenuConWidth" @menuClick="menuclick"></headline-menu>
      <div class="list">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
          <headline-list :lists="lists" :categoryId="categoryId" :activeId="activeId"></headline-list>
        </mt-loadmore>
      </div>
      <div class="no-more" v-show="showNomore">没有更多了</div>
    </div>
  </div>
</template>

<script>

import ajax from '@/utils/ajax';
import { Header, Loadmore } from 'mint-ui';
import headlineMenu from './headlineMenu/headlineMenu';
import headlineList from './headlineList/headlineList';
import Cookies from 'js-cookie';
const CATEGORY_ID = 'headlineCategoryId';
const ACTIVE_ID = 'headlineActiveId';

export default {
  data() {
    return {
      // menus: [{ 'id': 1, 'text': '最新' }]
      menus: [], // 标题
      categoryId: Cookies.get(CATEGORY_ID) || '', // 类别ID
      activeId: JSON.parse(Cookies.get(ACTIVE_ID) || 0), // 激活ID
      lists: [], // 列表数据
      headlineMenuConWidth: 0, // 标题容器宽度
      // 上拉下拉数据参数
      allLoaded: false, // 是否全部加载完
      scrollMode: 'auto', // 滑动方式
      pageNum: 0, // 页码
      bottomText: '上拉加载更多...',
      showNomore: false
    };
  },
  components: {
    'mt-header': Header,
    'headline-menu': headlineMenu,
    'headline-list': headlineList,
    'mt-loadmore': Loadmore
  },
  methods: {
    menuclick(m) {
      this.categoryId = m.categoryid;
      this.activeId = m.id;
      // 第一个菜单时，加载全部数据
      if (m.id === 0) {
        this.categoryId = '';
      }
      this.lists = [];
      this.pageNum = 0;
      this.getList();
    },
    getTitle() {
      ajax.get('/api/news/GetNewsCategoryList').then(resp => {
        let resultData = resp.data;
        if (resp.status === 200 && String(resultData.code) === '0') {
          let _data = resultData.data;
          let categoryNameMaxLength = 0; // 存放单个最长类别名称长度
          let dataLength = 0; // 存放data长度
          _data.forEach((value, index) => {
            this.menus.push({
              'id': index, // 索引
              'categoryid': value.categoryid, // 类别ID
              'text': value.categoryname // 类别名称
            });
            categoryNameMaxLength = value.categoryname.length > categoryNameMaxLength ? value.categoryname.length : categoryNameMaxLength;
            dataLength++;
          });
          let titleWidth = (categoryNameMaxLength * 15 + 20) * dataLength; // 循环结束标题总长度 (15:字体大小 20:左右边距和)
          this.headlineMenuConWidth = titleWidth > window.innerWidth ? titleWidth : window.innerWidth;
          // this.categoryId = this.menus[0].categoryid;
        }
      });
    },
    getList() {
      return ajax.get('/api/news/GetNewsList', {
        params: {
          keyword: '',
          pageIndex: this.pageNum,
          pageSize: '10',
          categoryId: this.categoryId
        }
      }).then(resp => {
        let resultData = resp.data;
        if (resp.status === 200 && String(resultData.code) === '0') {
          let totalCount = resultData.recordscount; // 数据总条数
          let hasMore = totalCount !== this.lists.length && totalCount > 0;
          if (hasMore) {
            let _data = resultData.data;
            _data.forEach((value) => {
              this.lists.push({
                'id': value.id, // 资讯ID
                'categoryID': value.category_id, // 资讯类别ID
                'title': value.title, // 资讯标题
                'img': value.main_image, // 资讯图片
                'reading_quantity': value.reading_quantity, // 阅读量
                'author': value.author, // 作者
                'release_time': value.release_time, // 时间
                'source_name': value.source_name, // 来源
                'is_copy_right': value.is_copy_right // 是否原创
              });
            });
          }
          this.isHaveMore(hasMore);
          this.$nextTick(function() {
            this.scrollMode = 'touch';
          });
        }
      });
    },
    // 下拉刷新
    loadTop: function() {
      this.lists = [];
      this.pageNum = 0;
      this.getList().then(() => {
        this.$refs.loadmore.onTopLoaded();
      });
    },
    // 上拉加载
    loadBottom: function() {
      this.pageNum = this.pageNum + 1;
      this.getList();
      this.$refs.loadmore.onBottomLoaded();
    },
    isHaveMore(isHaveMore) {
      this.allLoaded = true;
      this.showNomore = true;
      if (isHaveMore) {
        this.allLoaded = false;
        this.showNomore = false;
      }
    },
    goBack() {
      Cookies.remove(CATEGORY_ID);
      Cookies.remove(ACTIVE_ID);
      this.$router.go(-1);
    }
  },
  mounted() {
    // 获取资讯标题
    this.getTitle();
    // 获取资讯列表
    this.getList();
  }
};

</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.page{
  height: 100%;
  padding-top: 44px;
}

.load-more-container {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  .list {
    padding-top: 52px;
  }
}

.no-more {
  height: 30px;
  line-height: 30px;
  background-color: #f8f8f8;
  text-align: center;
}
</style>

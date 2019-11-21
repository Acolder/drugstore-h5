<template>
<div class="classics">
  <mt-header fixed title="经典名方">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="search-wrapper">
    <searchInput :hasBack='false' @onSearch="searchAction"></searchInput>
  </div>
  <div class="classics-nav">
    <div @click="classificationAction('中成药')" :class="listType==='中成药'?'selected':''"><router-link to="">中成药</router-link></div>
    <div @click="classificationAction('方剂')" :class="listType==='方剂'?'selected':''"><router-link to="" >方剂</router-link></div>
    <div @click="classificationAction('药膳')" :class="listType==='药膳'?'selected':''"><router-link to="">药膳</router-link></div>
  </div>
  <div class="page-loadmore-wrapper" v-if="listData.length>0">
    <mt-loadmore ref="loadmore" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText">
      <ul class="classics-list">
        <li v-for="item in listData" :key="item.index" class="classics-item" @click="details(item)">
          <span>{{item.name}}</span><img src="./img/icon-x@2x.png" alt="" class="left-sanjiao">
        </li>
      </ul>
    </mt-loadmore>
  </div>
  <div class="none-data" v-else>
    <div class="none-dataImg"></div>
    <div>找不到相关数据，请重新搜索</div>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import { Loadmore } from 'mint-ui';
import searchInput from '../../components/search/searchInput.vue';
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      limit: 12,
      listData: [],
      listType: '中成药',
      listName: '',
      allLoaded: false,
      bottomText: '上拉加载更多',
    };
  },
  computed: {
    offset() {
      return this.listData.length / 12 + 1;
      /* let o = this.listData.length / 12;
      o = o > 0 ? o : 1;
      return o; */
    }
  },
  components: {
    'searchInput': searchInput,
    'mt-loadmore': Loadmore
  },
  methods: {
    // 请求商品列表数据的请求
    getData() {
      this.listData = [];
      let data = {
        'keyWord': this.listName,
        'typeName': this.listType,
        'pageIndex': this.offset,
        'pageSize': this.limit
      };
      ajax.get('/api/medicine/getmedicinelist', {
        params: data
      }).then(data => {
        if (data.status === 200 && data.data.code === 0) {
          this.listData = data.data.data;
          if (data.data.data.length < 12) {
            this.allLoaded = true;
          }
        }
      });
    },
    // 请求推更多的商品数据
    appendData() {
      ajax.get('/api/medicine/getmedicinelist', {
        params: {
          'keyWord': this.listName,
          'typeName': this.listType,
          'pageIndex': this.offset,
          'pageSize': this.limit
        }
      }).then(data => {
        if (data.status === 200 && data.data.code === 0) {
          this.listData = [...this.listData, ...data.data.data];
          if (data.data.data.length < 12) {
            this.allLoaded = true;
          }
        }
      });
    },
    // 跳转详情
    details(item) {
      this.$router.push('/classics/details?id=' + item.id);
    },
    // 下拉刷新
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
      this.getData();
    },
    // 上拉加载更多数据
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded();
      this.appendData();
    },
    // 商品分类
    classificationAction(res) {
      this.listType = res;
      this.getData();
    },
    // 搜索
    searchAction(value) {
      console.log(value);
      this.$router.push('/classics/classicsSearch?val=' + value);
      // this.listName = value;
      // this.getData();
    }
  },
  created() {
    // 获取商品列表数据
    this.getData();
  }
};
</script>

<style scoped lang="less">
.classics{
  height: 100%;
  padding-top: 44px;
  position: relative;
  background: #fff;
}
.none-data{
  position: absolute;
  top: 140px;
  bottom: 0;
  left: 0;
  width: 100%;
  .none-dataImg{
    width: 100%;
    height: 226px;
    margin-top: 80px;
    background: url(./img/xh_qs_wdw@2x.png);
    background-size: 100% 100%;
  }
  div{
    text-align: center;
    margin-top: 10px;
    font-size: 15px;
    color: #5b5b5b;
  }
}
.classics-nav{
  display: flex;
  height: 46px;
  border-bottom: 1px solid #e0e0e0;
  >div{
    width: 33.333%;
    height: 100%;
    padding: 6px 0;
    >a{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #e0e0e0;
    }
  }
  >div.selected{
    border-bottom: 2px solid #0ccdd3;
  }
  >div.selected a{
    color: #0fcbd6;
  }
  >div:nth-child(1){
      a{
        border: none;
      }
    }
}
.search-wrapper{
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding:0 10px;
  .search-input{
    position: relative;
    padding: 0;
    border-bottom:none;
  }
}
.page-loadmore-wrapper{
  width: 100%;
  position: absolute;
  left: 0;
  top: 140px;
  bottom: 0;
  overflow: scroll;
  background: #ccc;
  .classics-list{
    background: #fff;
  }
}
.classics-item{
  padding: 0 10px;
  height: 47px;
  border-bottom: 1px solid #e0e0e0;
  line-height: 47px;
  >span{
    margin-right: 10px;
  }
  .left-sanjiao{
    width: 8px;
    height: 12px;
    float: right;
    margin-top: 20px;
  }
}
</style>


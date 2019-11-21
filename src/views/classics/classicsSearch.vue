<template>
<div class="classicsSearch">
  <div class="search-wrapper">
    <searchInput :hasBack='true' :keywords='val' @onSearch="searchAction"></searchInput>
  </div>
  <div class="classicsSearch-main" v-if="listData1.length>0 || listData2.length>0 || listData3.length>0 ">
    <div>
      <div class="til"><span>中成药</span><span @click="classificationAction('中成药')" class="more">更多</span></div>
      <ul>
        <li v-for="item in listData1" :key="item.index" @click="details(item)">
          <img src="./img/iconxh_zcy@2x.png" alt="">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div>
      <div class="til"><span>方剂</span><span @click="classificationAction('方剂')" class="more">更多</span></div>
      <ul>
        <li v-for="item in listData2" :key="item.index" @click="details(item)">
          <img src="./img/iconxh_book@2x.png" alt="">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div>
      <div class="til"><span>药膳</span><span @click="classificationAction('药膳')" class="more">更多</span></div>
      <ul>
        <li v-for="item in listData3" :key="item.index" @click="details(item)">
          <img src="./img/iconxh_ys@2x.png" alt="">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
  <div class="none-data" v-else>
    <div class="none-dataImg"></div>
    <div>找不到相关数据，请重新搜索</div>
  </div>
</div>
</template>

<script>
import searchInput from '../../components/search/searchInput.vue';
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      val: this.$route.query.val,
      listData1: [],
      listData2: [],
      listData3: [],
    };
  },
  computed: {
  },
  components: {
    'searchInput': searchInput,
  },
  methods: {
    // 搜索
    searchAction(value) {
      this.val = value;
      this.getData();
      // this.$router.push('/classics/classicsSearch?val=' + value);
    },
    // 请求列表数据的请求
    getData() {
      let data = {
        'keyWord': this.val,
        // 'typeName': '',
        // 'pageIndex': 1,
        // 'pageSize': 12
      };
      ajax.get('/api/medicine/getmedicinelist', {
        params: data
      }).then(data => {
        if (data.status === 200 && data.data.code === 0) {
          this.listData1 = data.data.data.filter((item) => item.typename === '中成药');
          this.listData2 = data.data.data.filter((item) => item.typename === '方剂');
          this.listData3 = data.data.data.filter((item) => item.typename === '药膳');
        }
      });
    },
    // 跳转详情
    details(item) {
      this.$router.push('/classics/details?id=' + item.id);
    },
    // 商品分类
    classificationAction(res) {
      console.log(res);
      this.$router.push('/classics/classicsResult?val=' + this.val + '&typ=' + res);
    },
  },
  created() {
    // 获取商品列表数据
    this.getData();
  }
};
</script>

<style scoped lang="less">
@white-color: #fff;
.classicsSearch{
  background: @white-color;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  /deep/.mint-header-title {
    overflow: initial;
    text-overflow: initial;
    font-weight: inherit;
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
.classicsSearch-main{
  .til{
    height: 36px;
    padding: 0 10px;
    background: #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    >span:first-child{
      color: #000;
    }
    >span:last-child{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      color: #999999;
    }
  }
  ul{
    li{
      height: 45px;
      padding: 0 10px;
      border-bottom: 1px solid #e0e0e0;
      background: #fff;
      display: flex;
      align-items: center;
      img{
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
    }
  }
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
</style>
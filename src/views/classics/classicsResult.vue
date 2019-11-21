<template>
<div class="classicsResult">
  <div class="search-wrapper">
    <searchInput :hasBack='true' :keywords='val' @onSearch="searchAction"></searchInput>
  </div>
  <div class="til">{{typ}}</div>
  <ul v-if="listData.length>0">
    <li v-for="item in listData" :key="item.index" @click="details(item)">
      <img v-if="typ == '中成药'" src="./img/iconxh_zcy@2x.png" alt="">
      <img v-if="typ == '方剂'" src="./img/iconxh_book@2x.png" alt="">
      <img v-if="typ == '药膳'" src="./img/iconxh_ys@2x.png" alt="">
      {{item.name}}
    </li>
  </ul>
  <div class="none-data" v-else>
    <div class="none-dataImg"></div>
    <div>找不到相关数据，请重新搜索</div>
  </div>
</div>
</template>

<script>
import ajax from '@/utils/ajax';
import searchInput from '../../components/search/searchInput.vue';
export default {
  data() {
    return {
      val: this.$route.query.val,
      typ: this.$route.query.typ,
      listData: [],
    };
  },
  computed: {
  },
  components: {
    'searchInput': searchInput,
  },
  methods: {
    // 请求商品列表数据的请求
    getData() {
      this.listData = [];
      let data = {
        'keyWord': this.val,
        'typeName': this.typ,
        'pageIndex': 1,
        'pageSize': 50
      };
      ajax.get('/api/medicine/getmedicinelist', {
        params: data
      }).then(data => {
        if (data.status === 200 && data.data.code === 0) {
          this.listData = data.data.data;
        }
      });
    },
    // 搜索
    searchAction(value) {
      this.val = value;
      this.getData();
      // this.$router.push('/classics/classicsResult?val=' + value);
    },
    // 跳转详情
    details(item) {
      this.$router.push('/classics/details?id=' + item.id);
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
.classicsResult{
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
.til{
  height: 36px;
  padding: 0 10px;
  background: #efefef;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
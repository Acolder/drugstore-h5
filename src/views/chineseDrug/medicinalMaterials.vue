<template>
<div class="medicinalMaterials">
  <mt-header fixed title="药材">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="page-loadmore-wrapper" v-if="listData.length>0">
    <mt-loadmore ref="loadmore" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText">
      <ul class="classics-list">
        <li v-for="item in listData" :key="item.index" class="classics-item" @click="details(item)">
          <img :src="item.icon" alt="">
          <div class="txtDrug">
            <div>{{item.name}}</div>
            <!-- <div>[jué míng zǐ]</div> -->
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
  <div class="none-data" v-else>
    <div class="none-dataImg"></div>
    <div class="none-dataTil">找不到相关药材，请重新搜索</div>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import javaAjax from '@/utils/javaApiRequest';
import { Loadmore } from 'mint-ui';
export default {
  data() {
    return {
      limit: 10,
      listData: [],
      listType: 'medicinal_materials',
      listName: '',
      allLoaded: false,
      bottomText: '上拉加载更多',
    };
  },
  computed: {
    offset() {
      return this.listData.length / 10;
    }
  },
  components: {
    'mt-loadmore': Loadmore
  },
  methods: {
    // 请求商品列表数据的请求
    getData() {
      this.listData = [];
      let data = {
        'keyword': this.listName,
        'types': this.listType,
        'page': this.offset,
        'categoryName': '',
        'pageSize': this.limit
      };
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/commonsearch/advancedquerywithtypes`;
      javaAjax.post(url, data)
        .then((res) => {
          if (res.status === 200 && res.data.resultCode === '0') {
            this.listData = res.data.resultData.content;
            if (res.data.resultData.content.length < 10) {
              this.allLoaded = true;
            }
          }
        })
        .catch((msg) => {
          this.allLoaded = true;
          console.log('msg');
        });
    },
    // 请求推更多的商品数据
    appendData() {
      let data = {
        'keyword': this.listName,
        'types': this.listType,
        'page': this.offset,
        'categoryName': '',
        'pageSize': this.limit
      };
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/commonsearch/advancedquerywithtypes`;
      javaAjax.post(url, data)
        .then((res) => {
          if (res.status === 200 && res.data.resultCode === '0') {
            this.listData = [...this.listData, ...res.data.resultData.content];
            if (res.data.resultData.content.length < 10) {
              this.allLoaded = true;
            }
          }
        })
        .catch((msg) => {
          this.allLoaded = true;
          console.log('msg');
        });
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
    // 跳转到药材详情
    details(item) {
      this.$router.push('/medicinalMaterials/details?id=' + item.m_id);
    },
  },
  created() {
    // 获取商品列表数据
    this.getData();
  }
};
</script>

<style scoped lang="less">
.medicinalMaterials{
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  overflow-x: hidden;
  padding-top: 44px;
  .page-loadmore-wrapper{
    width: 100%;
    position: absolute;
    left: 0;
    top: 44px;
    bottom: 0;
    overflow: scroll;
    background: #ccc;
    .classics-list{
      background: #fff;
    }
  }
  .classics-item{
    width: 100%;
    height: 90px;
    border-bottom: solid 1px #e0e0e0;
    padding: 10px 15px;
    display: flex;
    img{
      width: 70px;
      height: 100%;
      background-color: #ffffff;
      border: solid 1px #e0e0e0;
    }
    .txtDrug{
      flex: 1;
      padding-left: 12px;
      padding-top: 13px;
      >div{
        font-family: PingFang-SC-Regular;
        font-size: 15px;
        line-height: 15px;
        color: #000;
        margin-top: 15px;
        // margin-bottom: 15px;
      }
      // >div:last-child{
      //   font-family: PingFang-SC-Regular;
      //   font-size: 15px;
      //   line-height: 15px;
      //   color: #888888;
      // }
    }
  }
  .listDrug{
    width: 100%;
    height: 90px;
    border-bottom: solid 1px #e0e0e0;
    padding: 10px 15px;
    display: flex;
    img{
      width: 70px;
      height: 100%;
      background-color: #ffffff;
      border: solid 1px #e0e0e0;
    }
    .txtDrug{
      flex: 1;
      padding-left: 12px;
      padding-top: 13px;
      >div{
        font-family: PingFang-SC-Regular;
        font-size: 15px;
        line-height: 15px;
        color: #333333;
        margin-bottom: 15px;
      }
      >div:last-child{
        font-family: PingFang-SC-Regular;
        font-size: 15px;
        line-height: 15px;
        color: #888888;
      }
    }
  }
  .none-data{
    width: 100%;
    height: 400px;
    padding-top: 160px;
    background: #fff;
    .none-dataImg{
      width: 100%;
      height: 175px;
      background: url(./img/xh_icon_zbdyp@2x.png);
      background-size: 100% 100%;
    }
    .none-dataTil{
      margin-top: 15px;
      text-align: center;
      font-size: 13px;
      line-height: 20px;
    }
  }
}
</style>
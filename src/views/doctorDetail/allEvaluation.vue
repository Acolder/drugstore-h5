<template>
  <div class="goods-eval">
    <mt-header fixed :title="titleName">
      <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <ul class="goods-eMore" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="item in evaluationList" :key="item.commentId">
        <div class="goods-evalTop">
          <img :src="item.avatar" alt="" v-show="item.avatar">
          <img src="../goods/img/niming.png" alt="" v-show="!item.avatar">
          <span>{{item.username?item.username : '匿名用户'}}</span>
          <div class="x-icon">
            <em class="xx-icon" v-for="i in item.commentLevel" :key="i"></em>
          </div>
          <div class="x-icon">
            <em class="xxno-icon" v-for="j in item.commentLevelNo" :key="j"></em>
          </div>
          <i>{{item.create_time}}</i>
        </div>
        <div class="goods-evalBottom">
          <ul class="tag">
            <li v-for="i in item.label_item" :key="i">
              {{i}}
            </li>
          </ul>
          <span>
            {{item.content}}
          </span>
        </div>
      </li>
      <li class="page-infinite-loading" v-show="waitShow"  ref="loadingGif">
        <mt-spinner type="fading-circle" class="loadingGif" :size="10"></mt-spinner>
        <span>加载中...</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { InfiniteScroll, Toast, Spinner } from 'mint-ui';
// import javaAjax from '@/utils/javaApiRequest';
// import { formatDate } from '@/utils/date.js';
import doctorAjax from '@/utils/doctorAjax';
export default {
  props: ['productId', 'getByself', 'getFast', 'getCommon', 'from'],
  data() {
    return {
      activeIndex: 1,
      evaluationList: [],
      pageSize: 10,
      pageNum: 0,
      totalPage: 1,
      classIndex: 3,
      goodsDetail: {},
      swipeIndex: 0,
      titleName: '',
      waitShow: false
    };
  },
  components: {
    InfiniteScroll,
    Toast,
    Spinner
  },
  mounted() {
    this.titleName = `${this.$route.query.realname}的评价`;
  },
  methods: {
    // 接收评论数据
    getEvaluation(pageNum) {
      this.doctorId = this.$route.query.doctorid;
      let getData = {
        doctor_id: this.doctorId,
        pageIndex: pageNum,
        pageSize: this.pageSize
      };
      doctorAjax.get(`/api/doctor/GetServiceEvaluationList`, { params: getData }).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            console.log(res);
            let ddata = res.data.data;
            if (ddata.length > 0) {
              ddata.forEach(function (value, index) {
                value.create_time = value.create_time.substring(0, 10);
                value.commentLevel = parseInt(value.star_num, 10);
                value.commentLevelNo = 5 - parseInt(value.star_num, 10);
                value.label_item = value.label_item.split(',');
              });
              this.waitShow = false;
              if (pageNum === 1) {
                this.evaluationList = ddata;
                this.totalPage = res.data.pagescount;
              } else if (pageNum > 1) {
                this.evaluationList = this.evaluationList.concat(ddata);
              }
              // this.loading = false;
              console.log(this.evaluationList, '评论');
            } else {
              Toast('暂无评论');
            }
          }
        }
      });
    },
    // 自动加载
    loadMore() {
      this.loading = true;
      let newPage = this.pageNum + 1;
      if (newPage <= this.totalPage) {
        this.getEvaluation(newPage);
        this.pageNum = newPage;
        this.waitShow = true;
        this.$refs.loadingGif.style.display = 'flex';
      } else {
        this.waitShow = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
  @import '../../styles/mixin.less';
  #app>div{
    width:100%;
    height: 100%;
    background-color: #ffffff;
  }
  .goods-eval{
    width:100%;
    overflow-y:auto;
    ul.goods-eButton{
      padding-top: 50px;
      margin-bottom: 15px;
      display:flex;
      flex-wrap:wrap;
      li{
        margin-top:10px;
        height: 25px;
        margin-left:10px;
        border-radius: 24px;
        padding:3px 13px;
        font-size: 12px;
        border: solid 1px #a1a1a1;
        color:#333;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      li.ge-active{
        border:none;
        color: #ffffff;
        background-image: linear-gradient(-67deg,@green-color 0%, #768ffc 100%),
        linear-gradient(@green-color,@green-color);
      }
    }
  }
  .goods-eMore{
    padding:44px 10px 20px;
    height: 100%;
    overflow-y:auto;
    li{
      padding-bottom: 10px;
    }
    li:not(:first-child){
      border-top: 1px solid #dfdfdf;
      padding-top: 10px;
    }
  }
  .goods-evalTop{
    margin-top: 10px;
    display: flex;
    align-items: center;
    position: relative;
    img{
      background-color:#dddddd;
      border-radius: 50%;
      width: 25px;
      height: 25px;
    }
    span{
      margin-left:10px;
      font-size:13px;
      color: #333;
      margin-right: 5px;
    }
    i{
      font-size:11px;
      color: #888888;
      position: absolute;
      right:10px;
      top:1px;
    }
    .x-icon{
      height: 10px;
      display: flex;
      em{
        display: block;
        width: 12px;
        height: 12px;
        margin-left:3px;
      }
      em.xx-icon{
        background: url("../evaluate/img/icon-xx@2x.png") no-repeat;
        background-size: 100%;
      }
      em.xxno-icon{
        background: url("./img/xh_icon_star1.png") no-repeat;
        background-size: 100%;
      }
    }
  }
  .goods-evalBottom{
    margin-top:10px;
    font-size: 12px;
    color: #333333;
    .tag{
      width:100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 5px;
      li{
        border: 1px solid #a3a3a3;
        line-height: 18px;
        font-size: 10px;
        color: #a3a3a3;
        border-radius: 15px;
        padding: 0 7px;
        margin: 2px 6px 2px 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
    }
    span{
      display: block;
    }
  }
  .goods-eMore li.page-infinite-loading{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    color: #333333;
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;
    span:nth-child(2){
      margin-left: 5px;
    }
  }
</style>

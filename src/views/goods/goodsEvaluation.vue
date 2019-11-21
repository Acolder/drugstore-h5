<template>
  <div class="goods-eval">
    <!--<ul class="goods-eButton">-->
      <!--<li  @click="evaluations(1)" :class="{'ge-active':activeIndex===1}">全部（1234）</li>-->
      <!--<li :class="{'ge-active':activeIndex===2}" @click="evaluations(2)">好评(1234)</li>-->
      <!--<li :class="{'ge-active':activeIndex===3}" @click="evaluations(3)">中评(123)</li>-->
      <!--<li :class="{'ge-active':activeIndex===4}" @click="evaluations(4)">差评(0)</li>-->
    <!--</ul>-->
    <!--<div class="goods-row"></div>-->
    <ul class="goods-eMore" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="item in evaluationList" :key="item.commentId">
        <div class="goods-evalTop">
          <img :src="item.userIcon" alt="" v-show="item.userIcon">
          <img src="./img/niming.png" alt="" v-show="!item.userIcon">
          <span>{{item.nickname?item.nickname : '匿名用户'}}</span>
          <div class="x-icon">
            <em class="xx-icon" v-for="i in item.commentLevel" :key="i"></em>
          </div>
          <div class="x-icon">
            <em class="xxno-icon" v-for="j in item.commentLevelNo" :key="j"></em>
          </div>

          <i>{{item.modifyDate}}</i>
        </div>
        <div class="goods-evalBottom">
          <span>
            {{item.content}}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { InfiniteScroll, Toast } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
import { formatDate } from '@/utils/date.js';
export default {
  props: ['productId', 'getByself', 'getFast', 'getCommon', 'from'],
  data() {
    return {
      activeIndex: 1,
      evaluationList: [],
      pageSize: 20,
      pageNum: 0,
      totalPage: 1,
      classIndex: 3,
      goodsDetail: {},
      swipeIndex: 0
    };
  },
  components: {
    InfiniteScroll,
    Toast
  },
  methods: {
    // 星星评论
    xxAction(i) {
      this.socre = i + 1;
    },
    // 点击评价标签
    /**
    evaluations(activeIndex) {
      this.activeIndex = activeIndex;
    },
     **/
    // 接收评论数据
    getEvaluation(pageNum) {
      let url = '/mall/comment/commentListById';
      let data = {
        productId: this.productId,
        pageNum: pageNum,
        pageSize: this.pageSize,
        version: '3.1.0'
      };
      javaAjax.post(url, data).then((res) => {
        if (res.data.resultCode === '0') {
          if (res.data.resultData.data.length === 0) {
            Toast('暂无评论');
          } else {
            res.data.resultData.data.forEach(function (value, index) {
              value.modifyDate = formatDate(new Date(value.modifyDate), 'yyyy-MM-dd');
              value.commentLevel = parseInt(value.commentLevel, 10);
              value.commentLevelNo = 5 - parseInt(value.commentLevel, 10);
            });
            if (pageNum === 1) {
              this.evaluationList = res.data.resultData.data;
              this.totalPage = res.data.resultData.totalPage;
            } else if (pageNum > 1) {
              this.evaluationList = this.evaluationList.concat(res.data.resultData.data);
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
  .goods-row{
    width:100%;
    height: 10px;
    background-color: #f5f5f5;
  }
  .goods-eval{
    width:100%;
    overflow-x: auto;
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
    padding:0px 10px 45px;
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
        background: url("../evaluate/img/icon-xxno@2x.png") no-repeat;
        background-size: 100%;
      }
    }
  }
  .goods-evalBottom{
    margin-top:10px;
    font-size: 12px;
    color: #333333;
    span{
      display: block;
    }
  }


</style>

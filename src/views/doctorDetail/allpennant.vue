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
          <span class="topspan">{{item.username?item.username : '匿名用户'}}</span>
          <div class="pennants-boxright">
            <div v-for="i in item.banner_item" v-bind:key="i">
              <i :class='{jqActive: !item.changeState}'></i>
              <span :class='{jqActive: !item.changeState}'>
                {{i}}
              </span>
              <b :class='{jqActive: !item.changeState}'></b>
            </div>
          </div>
        </div>
        <div class="goods-evalBottom">
          <span>
            {{item.content}}
          </span>
          <div class="i">
            {{item.create_time}}
          </div>
        </div>
      </li>
      <li class="page-infinite-loading" v-show="waitShow"  ref="loadingGif">
        <mt-spinner type="fading-circle" class="loadingGif" :size="10"></mt-spinner>
        <span>加载中...</span>
      </li>
    </ul>
    <div class='submit'>
      <button @click="sendPennant">赠送锦旗</button>
    </div>
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
      doctorId: '',
      waitShow: false
    };
  },
  components: {
    InfiniteScroll,
    Toast,
    Spinner
  },
  mounted() {
    this.titleName = `${this.$route.query.realname}的锦旗`;
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
      doctorAjax.get(`/api/doctor/GetPresentedBannerList`, { params: getData }).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            console.log(res, '锦旗开始');
            let ddata = res.data.data;
            this.waitShow = false;
            if (ddata.length > 0) {
              ddata.forEach(function (value, index) {
                value.create_time = value.create_time.substring(0, 10);
                value.banner_item = value.banner_item.split(',');
              });
              console.log(this.evaluationList, '锦旗', pageNum);
              if (pageNum === 1) {
                this.evaluationList = ddata;
                this.totalPage = res.data.pagescount;
              } else if (pageNum > 1) {
                this.evaluationList = this.evaluationList.concat(ddata);
              }
            } else {
              Toast('暂无锦旗评论');
            }
          }
        }
      });
    },
    // 自动加载
    loadMore() {
      console.log('loadmore');
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
    },
    // 赠送锦旗
    sendPennant() {
      this.$router.push({
        path: '/serviceEvaluation',
        query: {
          doctor_id: this.doctorId,
          user_id: this.$route.query.user_id,
          username: this.$route.query.username,
          avatar: this.$route.query.avatar,
          titleTwo: true
        }
      });
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
    display: flex;
    flex-direction: column;
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
    margin:44px 10px 60px;
    flex: 1;
    overflow-y: auto;
    li{
      padding-bottom: 10px;
      border-bottom: 1px solid #dfdfdf;
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
    .topspan{
      margin-left:10px;
      font-size:13px;
      color: #333;
      margin-right: 5px;
    }
  }
  .goods-evalBottom{
    margin-top:10px;
    font-size: 12px;
    color: #333333;
    .i{
      font-size:11px;
      color: #888888;
      margin-top: 12px;
    }
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
  .pennants-boxright{
    flex: 1;
    width:100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 7px;
    >div{
      width:auto;
      height:28px;
      margin-right: 12px;
      margin-bottom: 5px;
      /*margin: 5px 12px;*/
    }
    span,i,b{
      height: 28px;
      float: left;
    }
    span{
      padding: 0px 5px;
      line-height:28px;
      color: #fb5557;
      white-space: nowrap;
      background: url("./img/xh_btn_normz@2x.png") repeat-x;
      background-size: 1px 28px;
      background-positon: 100% 100%;
    }
    i{
      width: 3px;
      background: url('./img/xh_btn_normy@2x.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    b{
      width:8px;
      background: url('./img/xh_btn_norm@2x(2).png')  no-repeat center center;
      background-size: 100%;
    }
  }
  .submit{
    /*position: fixed;*/
    /*z-index: 200;*/
    margin:0  10px 20px;
    display: flex;
    justify-content: center;
    button{
      width:100%;
      height: 40px;
      background-color: #0ccdd4;
      border-radius: 3px;
      font-size: 18px;
      color: #ffffff;
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


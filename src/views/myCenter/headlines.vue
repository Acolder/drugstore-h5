<template>
  <div class="container">
    <mt-header title="我的头条">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
      <mt-button slot="right" @click="edit" style="font-size: 14px;color: #0ccdd3;" v-if="!editShow">编辑</mt-button>
      <mt-button slot="right" @click="edit" style="font-size: 14px;color: #0ccdd3;" v-else>完成</mt-button>
    </mt-header>
    <ul class="coupon-title">
      <li @click="goRoute(1)" :class="{'couponActive': classIndex == 1 }">我的收藏</li>
      <li class="grayBorder"></li>
      <li @click="goRoute(2)" :class="{'couponActive': classIndex == 2 }">我的评论</li>
    </ul>
    <!--我的收藏-->
    <div class="load-more-container" :style="{ '-webkit-overflow-scrolling': scrollMode }"  v-show="collectionShow">
      <div class="list">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
          <headline-list :lists="lists" :delShowOne="editShow" @listenDelhead="delhead"></headline-list>
        </mt-loadmore>
      </div>
      <div class="no-more" v-show="showNomore" >已经全部加载完毕</div>
    </div>
    <!--我的评论-->
    <div v-show="!collectionShow" :style="{ '-webkit-overflow-scrolling': scrollMode }">
      <div class="list">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmoreComment">
          <comments-list :lists="commentLists" :delShowOne="editShow" @listenDelComment="delComment"></comments-list>
        </mt-loadmore>
      </div>
      <div class="no-more" v-show="showNomore" >已经全部加载完毕</div>
    </div>
    <!--全选删除-->
    <div class="allDel" v-show="editShow">
      <div @click="allDelBtn">
        <img src="./img/iconxh_gy_nomal.png" alt="" v-if="!allChooseType">
        <img src="./img/iconxh_gy_elect.png" alt="" v-else>全选
      </div>
      <div @click="sureDel">删除</div>
    </div>
  </div>
</template>
<script>
import ajax from '@/utils/ajax';
import { Toast, Header, Loadmore, Indicator } from 'mint-ui';
import headlineList from './headineList/index';
import commentsList from './headineList/comments';
import Cookies from 'js-cookie';
const CATEGORY_ID = 'headlineCategoryId';
const ACTIVE_ID = 'headlineActiveId';
export default {
  data() {
    return {
      collectionShow: true,
      editShow: false,
      allChooseType: false,
      classIndex: 1,
      lists: [], // 收藏列表数据
      commentLists: [], // 评论列表数据
      // 上拉下拉数据参数
      allLoaded: false, // 是否全部加载完
      scrollMode: 'auto', // 滑动方式
      pageNum: 1, // 收藏页码
      commentPageNum: 1, // 评论页码
      bottomText: '上拉加载更多...',
      showNomore: false
    };
  },
  components: {
    'mt-header': Header,
    'headline-list': headlineList,
    'comments-list': commentsList,
    'mt-loadmore': Loadmore
  },
  methods: {
    // 标题内容切换
    goRoute(classIndex) {
      if (classIndex === this.classIndex) {
        return;
      }
      this.classIndex = classIndex;
      this.editShow = false;
      if (classIndex === 1) {
        // 全选按钮状态重置为未全选
        this.allChooseType = false;
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle',
        });
        this.lists = [];
        this.pageNum = 1;
        this.collectionShow = true;
        this.getList().then(() => {
          Indicator.close();
        });
      } else if (classIndex === 2) {
        // 全选按钮状态重置为未全选
        this.allChooseType = false;
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle',
        });
        this.collectionShow = false;
        this.commentLists = [];
        this.commentPageNum = 1;
        this.getCommentList().then(() => {
          Indicator.close();
        });
      }
    },
    // 编辑点击
    edit() {
      this.editShow = !this.editShow;
      // 待定 全选按钮是否为空
      // this.allChooseType = false;
      /**
      if (this.classIndex === 1) {
        this.delShowOne = !this.delShowOne;
        this.delShowTwo = false;
      } else if (this.classIndex === 2) {
        this.delShowTwo = !this.delShowTwo;
        this.delShowOne = false;
      }
       **/
      console.log(this.delShowOne, '是否改变');
    },
    // 编辑全选按钮
    allDelBtn() {
      this.allChooseType = !this.allChooseType;
      if (this.allChooseType) {
        // 选择全选
        console.log(this.classIndex);
        if (this.classIndex === 1) {
          this.lists.forEach((value) => {
            this.$set(value, 'delNo', false);
          });
        } else if (this.classIndex === 2) {
          this.commentLists.forEach((value) => {
            this.$set(value, 'delNo', false);
          });
        }
      } else {
        // 取消全选
        if (this.classIndex === 1) {
          this.lists.forEach((value) => {
            this.$set(value, 'delNo', true);
          });
        } else if (this.classIndex === 2) {
          this.commentLists.forEach((value) => {
            this.$set(value, 'delNo', true);
          });
        }
      }
    },
    // 收藏-每行删除按钮
    delhead(reply_ids, states) {
      console.log(reply_ids, states);
      let cIndex = this.lists.findIndex(v => v.id === reply_ids);
      console.log(cIndex);
      this.$set(this.lists[cIndex], 'delNo', !states);
      console.log(this.lists);
      // 查看是不是所有数据都选了删除-同时更新全选按钮
      let chooseLength = 0;
      this.lists.forEach(v => {
        if (v.delNo === false) {
          chooseLength += 1;
        }
      });
      if (chooseLength && chooseLength === this.lists.length) {
        this.allChooseType = true;
      }
    },
    // 评论-每行删除按钮
    delComment(reply_ids, states) {
      console.log(reply_ids, states);
      let cIndex = this.commentLists.findIndex(v => v.reply_id === reply_ids);
      this.$set(this.commentLists[cIndex], 'delNo', !states);
    },
    // 底部确认删除
    sureDel() {
      if (this.classIndex === 1) {
        console.log(this.lists, '对应数组');
        let arr = [];
        this.lists.forEach(v => {
          if (v.delNo === false) {
            console.log(v, 'vv');
            arr.push(v.id);
          }
        });
        arr = arr.join(',');
        this.getHeadDel(arr);
        // console.log(cIndex, '删除内容');
      } else if (this.classIndex === 2) {
        console.log(this.commentLists, '评论对应数组');
        let crr = [];
        this.commentLists.forEach(v => {
          if (v.delNo === false) {
            console.log(v, 'vv');
            crr.push(v.reply_id);
          }
        });
        crr = crr.join(',');
        console.log(crr);
        this.getCommentDel(crr);
      }
    },
    // 收藏删除接口
    getHeadDel(reply_ids) {
      ajax.post('/api/news/deleteCollect', {
        type: 3,
        reply_ids: reply_ids
      }).then(resp => {
        console.log(resp, '删除');
        let resultData = resp.data;
        if (resp.status === 200 && String(resultData.code) === '0') {
          Toast('删除成功');
          this.lists = [];
          this.pageNum = 1;
          this.getList();
        }
      });
    },
    // 评论删除接口
    getCommentDel(reply_ids) {
      ajax.post('/api/news/deleteReply', {
        type: 2,
        reply_ids: reply_ids
      }).then(resp => {
        console.log(resp, '删除');
        let resultData = resp.data;
        if (resp.status === 200 && String(resultData.code) === '0') {
          Toast('删除成功');
          this.commentLists = [];
          this.commentPageNum = 1;
          this.getCommentList();
        }
      });
    },
    // 获取收藏列表数据
    getList() {
      return ajax.post('/api/news/getMyNewsCollect', {
        pageIndex: this.pageNum,
        pageSize: '10'
        // categoryId: this.categoryId
      }).then(resp => {
        console.log(resp, '收藏结果');
        let resultData = resp.data;
        if (resp.status === 200 && String(resultData.code) === '0') {
          let totalCount = resultData.recordscount; // 数据总条数
          console.log(totalCount, this.lists.length);
          let hasMore = totalCount > this.lists.length && totalCount > 0;
          // totalCount === this.lists.length
          if (hasMore) {
            let _data = resultData.data;
            console.log(_data, '数据信息');
            _data.forEach((value) => {
              this.lists.push({
                'id': value.id, // 资讯ID
                'title': value.title, // 资讯标题
                'img': value.main_image, // 资讯图片
                'reading_quantity': value.reading_quantity, // 阅读量
                'author': value.author, // 作者
                'release_time': value.release_time, // 时间
                'source_name': value.source_name, // 来源
                'is_copy_right': value.is_copy_right, // 是否原创
                'delNo': this.allChooseType ? false : true // 检查按钮是否全选，全选删除按钮状态为false已选择，否则默认隐藏true
              });
            });
          }
          console.log(this.lists, '增加的信息');
          console.log(hasMore, '有更多');
          this.isHaveMore(hasMore);
          this.$nextTick(function() {
            this.scrollMode = 'touch';
          });
        }
      });
    },
    // 获取评论列表数据
    getCommentList() {
      return ajax.post('/api/news/getMyNewsReply', {
        pageIndex: this.commentPageNum,
        pageSize: '10'
        // categoryId: this.categoryId
      }).then(resp => {
        console.log(resp, '评论结果');
        let resultData = resp.data;
        if (resp.status === 200 && String(resultData.code) === '0') {
          let totalCount = resultData.recordscount; // 数据总条数
          let hasMore = totalCount > this.commentLists.length && totalCount > 0;
          if (hasMore) {
            let _data = resultData.data;
            console.log(_data, '数据信息');
            _data.forEach((value) => {
              this.commentLists.push({
                'reply_type': value.reply_type,  // 评论类型（3回复资讯 、2回复评论）<number>
                'news_id': value.news_id,  // 资讯id<number>
                'news_title': value.news_title,  // 资讯标题<string>
                'news_main_image': value.news_main_image,  // 资讯主图<string>
                'reply_id': value.reply_id,  // 评论id<string>
                'user_id': value.user_id,  // 评论用户id<string>
                'photo_path': value.photo_path,  // 评论用户头像<string>
                'user_nickname': value.user_nickname,  // 评论用户昵称<string>
                'body': value.body,  // 回复内容<string>
                'target_user_id': value.target_user_id,  // 被评论用户id （当reply_type = 2 的时候有值）<string>
                'target_user_nickname': value.target_user_nickname,  // 被评论用户昵称 （当reply_type = 2 的时候有值）<string>
                'target_user_reply_body': value.target_user_reply_body,  // 被评论用户回复内容 （当reply_type = 2 的时候有值）<string>
                'create_time': value.create_time,  // 回复时间<string>
                'delNo': this.allChooseType ? false : true // 检查按钮是否全选，全选删除按钮状态为false已选择，否则默认隐藏true
              });
            });
          }
          console.log(this.commentLists, '增加的信息');
          console.log(hasMore, '有更多');
          this.isHaveMore(hasMore);
          this.$nextTick(function() {
            this.scrollMode = 'touch';
          });
        }
      });
    },
    // 下拉刷新
    loadTop: function() {
      console.log('下拉刷新');
      if (this.classIndex === 1) {
        // 收藏
        this.lists = [];
        this.pageNum = 1;
        this.getList().then(() => {
          this.$refs.loadmore.onTopLoaded();
        });
      } else if (this.classIndex === 2) {
        // 评论
        this.commentLists = [];
        this.commentPageNum = 1;
        this.getCommentList().then(() => {
          this.$refs.loadmoreComment.onTopLoaded();
        });
      }
    },
    // 上拉加载
    loadBottom: function() {
      if (this.classIndex === 1) {
        // 收藏
        this.pageNum = this.pageNum + 1;
        this.getList();
        this.$refs.loadmore.onBottomLoaded();
      } else if (this.classIndex === 2) {
        // 评论
        this.commentPageNum = this.commentPageNum + 1;
        this.getCommentList();
        this.$refs.loadmoreComment.onBottomLoaded();
      }
    },
    // 是否还需加载
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
    // 获取资讯列表
    this.getList();
  }
};
</script>
<style lang="less" scoped>
  @import '../../styles/mixin.less';
  .container{
    position:absolute;width:100%;height:100%;top:0;left:0;overflow-y:auto;
    background-color:#efeff4;
    color: #333;
  }
  .fff{
    background: #ffffff;
  }
  .borderBottom{
    border-bottom:1px solid #e0e0e0;
  }
  .coupon-title{
    .borderBottom;
    .fff;
    width:100%;
    height: 47px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    left: 0;
    top: 44px;
    z-index: 1100;
    li{
      width:70px;
      height: 100%;
      line-height: 45px;
      font-size: 16px;
      display: flex;
      justify-content: center;
    }
    .grayBorder{
      width:1px;
      height: 80%;
      background:  #e5e5e5;
    }
    .couponActive{
      color:#0ccdd4;
      border-bottom: 1px solid #0ccdd4;
    }
  }
  .page{
    height: 100%;
    padding-top: 44px;
  }
  .load-more-container {
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }
  .list{
    margin-top: 91px;
  }
  .no-more {
    height: 30px;
    line-height: 30px;
    /*background-color: #f8f8f8;*/
    text-align: center;
    margin-bottom: 40px;
  }
  .allDel{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 40px;
    width:100%;
    background-color: #ffffff;
    border-top: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    >div:first-child{
      font-size: 14px;
      color: #333333;
      display: flex;
      align-items: center;
      img{
        margin-left: 15px;
        margin-right: 10px;
        width:18px;
        height: 18px;
      }
    }
    >div:last-child{
      width:107px;
      height: 39px;
      background-color: #0ccdd3;
      color: #ffffff;
      font-size: 17px;
      line-height: 39px;
      text-align: center;
    }
  }
</style>

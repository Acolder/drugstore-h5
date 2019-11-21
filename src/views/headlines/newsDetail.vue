<template>
  <div class="page" :class="{ noPadding: isFromApp, 'page-video':isVideo }">
    <mt-header fixed title="健康头条" v-show="!isFromApp">
      <a href="javascript:void(0);" @click="$router.go(-1);" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <share-header :isVideo="isVideo" v-if="isShare"></share-header>
    <div class="load-more-container" :class="{'container-padding':isShare}" :style="{ '-webkit-overflow-scrolling': scrollMode }">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <div class="news-title" :class="{'title-video':isVideo}">
          {{ detailData.title }}
        </div>
        <div class="news-subtitle" :class="{'subtitle-video':isVideo}" v-if="detailData">
          <span class="reads"><img src="./img/xh_zx_eyes@2x.png" /> {{ detailData.readcount }}</span>
          <span class="star"><img src="./img/icon_dz@2x.png" /> {{ detailData.star_count }}</span>
          <span class="collect"><img src="./img/iconlh_scn@2x.png" /> {{ detailData.collect_count }}</span>
          <span class="share"><img src="./img/iconlh_fxn@2x.png" /> {{ detailData.share_count }}</span>
          <span class="time"><img src="./img/xh_zxxq_time@2x.png" /> {{ detailData.releasetime }}</span>
        </div>
        <div class="author-wrapper" v-if="detailData.authorinfo">
          <img class="avatar" :src="detailData.authorinfo.photo_path"/>
          <div class="detail">
            <p class="name">{{ detailData.authorinfo.nickname }}</p>
            <p class="content">{{ detailData.authorinfo.remark }}</p>
          </div>
        </div>
        <!--详情-->
        <div class="news-article" :class="{ 'padding-min':isFromApp, 'article-video':isVideo }" v-html="bodyDetail"></div>
        <!--推荐商品-->
        <div class='product' v-for="(product, index) in productList" :key="index" @click="productDetail(product.product_id,product.self_id,product.fast_id,product.common_id,product.transnational_id)">
          <div class="product-img"><img :src="product.product_main_image"/></div>
          <div class="product-detail">
            <div class="product-name">{{ product.product_name }}<span>&yen;&nbsp;{{ product.product_markprice }}</span></div>
            <div class="product-description" style="-webkit-box-orient: vertical;">{{ product.product_describe }}</div>
            <div class="product-footer">
              <span>{{ product.self_id?'自提':product.fast_id?'快送':product.common_id?'商城':product.transnational_id?'跨境购':''}}</span>规格 {{ product.goods_norms }}
              <div class="to-buy">立即购买</div>
            </div>
          </div>
        </div>
        <!--相关阅读-->
        <div class="related-read" v-if="!isVideo">
          <div class="title" v-show="relatedRead.length>0"><img src="./img/xh_icon_read@2x.png" /> 相关阅读推荐</div>
          <ul class="related-read-content">
            <li v-for="(related, index) in relatedRead" :key="index" @click="toAnotherNews(related.id)">
              <div class="related-detail">
                <div class="related-title" style="-webkit-box-orient: vertical;">{{ related.resultTitle }}</div>
                <div class="related-sub">
                  <!--<span class="isCopyRight" v-show="related.isCopyRight===1">原创</span>-->
                  <span class="author" v-show="related.author_name"><img src="./img/xh_icon_author@2x.png" /> {{ related.author_name }}</span>
                  <!--<span class="source" v-else-if="related.sourceName">{{ related.sourceName.length>4?(related.sourceName.substr(0,4) + '...'):related.sourceName }}</span>-->
                  <span class="reads"><img src="./img/xh_zx_eyes@2x.png" /> {{ related.readingQuantity }}</span>
                  <span class="time" v-if="related.release_time">{{ dateDiff(related.release_time) }}</span>
                </div>
              </div>
              <div class="related-img" ref="relatedImg" v-if="related.pic_url" :style="{height: relatedImgHeight}"><img :src="related.pic_url.split(',')[0]" :onerror="defaultImg" /></div>
              <!--<div class="related-img" ref="relatedImg" v-else :style="{height: relatedImgHeight}"><img src="./img/default-img.jpg" /></div>-->
            </li>
          </ul>
        </div>
        <!--评论展示-->
        <div id="commentContent" class="comment-content" :class="{'comment-margin':!showNomore}">
          <div class="comment-title" v-show="getComment.length>0"><img src="./img/xh_icon_comment@2x.png" /> 评论</div>
          <div class="comment-one" v-for="(com, index) in getComment" :key="index">
            <div class="avatar"><img :src="com.photo_path"/></div>
              <div class="comment-detail">
                <div class="name" :class="{'name-video':isVideo}">{{ com.nickname }} <span @click="commentLike(com.reply_id, com.is_star)"><em :class="{active:com.is_star}"></em>{{ com.star_count }}</span></div>
                <div class="content" :class="{'content-video':isVideo}">{{ com.body }}</div>
                <div class="time-reply" :class="{'time-reply-video':isVideo}">{{ dateSmallDiff(com.create_time) }}</div>
                <!--&nbsp;·&nbsp; <span @click="showReview(com.commentId)">{{ com.childNewsComment.total}}回复</span>-->
                <!--回复内容-->
                <!--<ul class="reply">-->
                <!--<li v-for="(childCom, index) in com.childNewsComment.data" :key="index">-->
                <!--<span>{{ childCom.user.userName }}：</span>{{ childCom.content }}-->
                <!--</li>-->
                <!--</ul>-->
              </div>
            </div>
          </div>
          <div class="no-more" :class="{ 'more-margin':!isShare, 'no-more-video':isVideo}" v-show="showNomore && getComment.length>0">没有更多了...</div>
      </mt-loadmore>
    </div>
    <div class="news-footer" :class="{'footer-video':isVideo}" v-if="!isShare">
      <input type="text" class="input-comment" :style="{width:inputCommentWidth}" v-model="comment" id="inputComment" @blur="inputCommentBlur" @focus="inputCommentFocus" placeholder="我来说两句...">
      <img src="./img/xh_icon_xpl@2x.png" alt="" class="pencil">
      <mt-button class="comment-btn" :class="{'comment-btn-video':isVideo}" type="primary" @click="toComment" v-show="writing">发布</mt-button>
      <div class="look-comment" @click="custormAnchor('commentContent')" v-show="!writing">
        <span><i v-show="commentNum>0">{{ commentNum }}</i></span>
      </div>
      <div class="is-like" @click="updateNewsLike(isStar)" v-show="!writing"><span :class="{'has-star': isStar}"></span></div>
      <div class="collection" @click="collection(isCollect)" v-show="!writing"><span :class="{ 'has-collect': isCollect}"></span></div>
      <div class="share" v-if="isFromApp" @click="share" v-show="!writing"><span></span></div>
    </div>
    <img src="./img/loading.gif" alt="" class="loading" v-show="isShowLoading">
    <div class="no-data-tips" v-if="noNewsData">
      <img src="./img/404.jpg"/>
    </div>
    <div class="show-large-img" v-show="showLargeVisible" @click="showLargeVisible=false">
      <img :src="largeImg" alt="大图" />
    </div>
    </div>
</template>

<script>

import ajax from '@/utils/ajax';
import { Button, Toast, Loadmore } from 'mint-ui';
import { getQueryString, delHtmlTag } from '@/utils/index';
import { getDateDiff, getDateSmallDiff } from '@/api/dateDiff';
import { formatDate } from '@/utils/date';
import { setToken, removeToken, getToken } from '@/utils/auth';
import { goLogin } from '@/api/user';
import shareHeader from '@/components/share/shareHeader';

export default {
  data() {
    return {
      detailData: '', // 资讯内容
      bodyDetail: '', // 资讯body内容
      comment: '', // 当前输入评论内容
      isFromApp: false, // 是否app访问
      isShare: false, // 是否分享打开
      fromWhere: 'else', // 是否app端打开
      appToken: '', // 获取app端token
      appShare: 0, // 是否分享打开 0 否 1 是
      appWifi: false, // app端是否wifi打开
      isShowLoading: true,
      categoryTitle: '', // 标题
      relatedRead: [], // 相关阅读
      getComment: [], // 读取评论内容
      commentNum: 0, // 评论数量
      parentId: 0, // 列表评论id (0 为资讯评论，指定评论id为回复评论)
      isCollect: 0, // 是否收藏 (0：否，大于0：是)
      collectId: 0, // 收藏id
      productList: [], // 商品列表
      isVideo: false, // 资讯详情为视频
      infoId: '', // 咨询id
      inputCommentWidth: 'calc(100% - 160px)', // 评论输入框宽度
      isStar: 0, // 是否点赞(0：否，大于0：是)
      fromLoadMore: true, // 是否上拉加载数据
      currentPageNum: -1, // 当前页码
      currentComment: [], // 存放当前显示的评论
      noNewsData: false, // 没有咨询数据
      sending: false, // 是否提交请求中
      posterImg: '', // 视频提示图片
      writing: false, // 是否显示提交按钮
      appUrl: 'https://itunes.apple.com/cn/app/id1395275648?mt=8', // app下载地址 默认ios
      largeImg: '', // 大图地址
      showLargeVisible: false, // 是否展示大图
      relatedImgHeight: 'auto', // 相关阅读图片高度
      defaultImg: 'this.src="' + require('./img/default-img.jpg') + '"',
      // 上拉下拉数据参数
      allLoaded: false, // 是否全部加载完 (需要加载改为false)
      scrollMode: 'auto', // 滑动方式
      pageNum: 0, // 页码
      bottomText: '上拉加载更多...',
      showNomore: false,
      collectionFlag: false, // 用来判断是否正在收藏/取消收藏
    };
  },
  components: {
    'mt-button': Button,
    'mt-loadmore': Loadmore,
    'share-header': shareHeader
  },
  methods: {
    // 检测手机终端
    checkMobileAgent() {
      let _this = this;
      let isAndroid = _this.isAndroid();
      if (isAndroid) {
        _this.appUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kmyy.intellpharmacy&fromcase=40003';
      }
    },
    // 是否安卓终端
    isAndroid() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
      if (isAndroid) {
        return true;
      }
      return false;
    },
    // 获取url参数
    getUrlParmas() {
      let _this = this;
      _this.isFromApp = getQueryString('from2') === 'app';
      _this.isShare = getQueryString('share') === '1';
      _this.isVideo = getQueryString('newsType') === '2';
      let token = getQueryString('token');
      let isFromPhysique = getQueryString('fromPhysique') === '1';
      console.log('isFromTest:' + isFromPhysique);
      // console.log('token:' + token);
      if (_this.isFromApp) {
        _this.fromWhere = 'app';
        _this.inputCommentWidth = 'calc(100% - 200px)';
        console.log('app');
      }
      if (_this.isFromApp && !isFromPhysique) {
        console.log('app not fromPhysique');
        if (token) {
          console.log('token不为空');
          _this.appToken = token;
          setToken(token);
        } else if (!token) {
          console.log('token为空');
          _this.appToken = '';
          let hasToken = getToken();
          if (hasToken) {
            removeToken();
          }
        }
      }

      // if (_this.isFromApp && token && token !== '') {
      //   _this.appToken = token;
      //   setToken(token);
      // } else if (_this.isFromApp && token && token === '') {
      //   _this.appToken = '';
      //   let hasToken = getToken();
      //   if (hasToken) {
      //     removeToken();
      //   }
      // }

      if (_this.isShare) {
        // document.title = '健康头条';
        _this.appShare = 1;
      }
      // 获取资讯详情
      _this.getListDetil();
    },
    // 获取资讯详情
    /* eslint-disable */
    getListDetil() {
      let _this = this;
      let getId = getQueryString('id'); // 资讯ID
      _this.infoId = getId;
      // getId = getId.toString();
      ajax.get(`/api/news/getArticlesDetail/${getId}`).then(resp => {
        console.log(resp);
        _this.isShowLoading = false;
        if (resp.status === 200 && resp.data.code === 0) {
          let _data = resp.data.data;
          if (_data) {
            // document.title = _data.title;
            _this.detailData = _data; // 资讯信息
            _this.categoryTitle = _data.title; // 资讯标题
            _this.isCollect = _data.is_collect;
            _this.isStar = _data.is_star;
            let _relatedRead = _data.recommendlist; // 相关阅读
            console.log(_relatedRead);
            _this.setNewsContentStyle(); // 设置资讯文章样式
            if (_relatedRead.length > 0) {
              for (let i = 0; i < _relatedRead.length; i++) {
                _this.relatedRead.push({
                  resultTitle: _relatedRead[i].title,
                  pic_url: _relatedRead[i].main_image,
                  isCopyRight: _relatedRead[i].is_copy_right,
                  sourceName: _relatedRead[i].source_name,
                  author_name:  _relatedRead[i].author_name,
                  readingQuantity: _relatedRead[i].reading_quantity,
                  release_time: _relatedRead[i].release_time,
                  id: _relatedRead[i].id
                });
              }
              _this.setRelatedImgStyle();
            } else {
              // _this.getNewsRelated();
            }
            if (_data.newsType === 2) {
              // 视频
              _this.isVideo = true;
              _this.bodyDetail = _data.body; // body内容
              _this.posterImg = _data.mainimage; // 视频提示图片
              _this.setVideo();
            } else {
              let bodyText = _data.body; // body内容
              _this.productList = _data.productlist; // 相关商品
              _this.bodyDetail = _data.body; // body内容;
              _this.setImgMonitor();
            }
          } else {
            // _this.$router.push({ path: '/error/pageNoFound' });
            _this.noNewsData = true;
          }
        }
        else {
          // _this.$router.push({ path: '/error/pageNoFound' });
          _this.noNewsData = true;
        }
      });
    },

    // 设置视频
    setVideo() {
      let _this = this;
      let isWifi = getQueryString('isWifi') === 'true';
      if (isWifi) {
        _this.appWifi = true;
      }
      let video = document.getElementsByTagName('video')[0];
      console.log(video);
      if (video) {
        video.setAttribute('poster', _this.posterImg);
      } else {
        setTimeout(() => {
          _this.setVideo();
        }, 1000);
      }
    },
    // 查看商品详情
    productDetail(productId, selfId, fastId, commonId, transnationalId) {
      let _this = this;
      let data = {
        productId: productId,
        getByself: selfId,
        getFast: fastId,
        getCommon: commonId,
        transnationalId: transnationalId
      };
      let strData = JSON.stringify(data);
      if (_this.isShare) {
        _this.productDetailFromShare();
      } else if (_this.isFromApp) {
        _this.toProductDetail(strData);
      } else {
        _this.toH5Detail(strData);
      }
    },
    // app端
    toProductDetail(data)  {
      /* eslint-disable */
      HealthBAT.newToGoodsDetail(data);
    },
    // h5端
    toH5Detail(str) {
      let data = JSON.parse(str);
      this.$router.push({
        path: '/goods/goodsDetail',
        query: {
          productId: data.productId,
          getByself: data.getByself,
          getFast: data.getFast,
          getCommon: data.getCommon
        }
      });
    },
    // 分享页面查看商品
    productDetailFromShare() {
      let ua = navigator.userAgent.toLowerCase();
      let isAndroid = this.isAndroid();
      if (ua.indexOf('micromessenger') < 0) {
        // 非微信 打开
        let hasApp = true;
        let t = 1000;
        setTimeout(function () {
          if (!hasApp) {
            if (isAndroid) {
              window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kmyy.intellpharmacy&fromcase=40003';
            } else {
              window.location.href = 'https://itunes.apple.com/cn/app/id1395275648?mt=8';
            }
          }
        }, 2000);
        let t1 = Date.now();
        window.location.href = 'kmyhl://';
        setTimeout(function () {
          let t2 = Date.now();
          hasApp = !(!t1 || t2 - t1 < 2000);
        }, t);
      } else {
        // 微信 跳转引导页
        let url = window.location.href;
        this.$router.push({
          path: '/QRcode/wxtemp',
          query: { returnUrl: url }
        });
      }
    },

    // 更新阅读量
    updateReadingQuantity() {
      let getId = getQueryString('id'); // 资讯ID
      getId = getId.toString();
      ajax.get(`/api/news/UpdateReadingQuantity?id=${getId}`);
    },
    // 相关阅读
    // getNewsRelated() {
    //   let _this = this;
    //   let getId = getQueryString('id'); // 资讯ID
    //   javaAjax.post(`${process.env.ES_BASE_HOST}/elasticsearch/Category/getNewsRelated`, {
    //     categoryName: _this.categoryTitle,
    //     page: 0,
    //     id: getId
    //   }).then(resp => {
    //     console.log(resp);
    //     if (resp.status === 200 && String(resp.data.resultCode) === '0') {
    //       _this.relatedRead = resp.data.resultData.content;
    //       _this.setRelatedImgStyle();
    //     }
    //   });
    // },
    // 查询评论
    queryNewsCommont() {
      let _this = this;
      let getId = getQueryString('id');
      return ajax.post(`/api/post/getPostReplyList`, {
        reply_type: 3, // 1帖子,3资讯
        post_id: getId, // 帖子id或资讯id
        PageIndex: _this.pageNum,
        PageSize: 10
      }).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          let moreThanCurrentPageNum = _this.pageNum > _this.currentPageNum; // 请求的页码是否大于保存的页码
          let totalCount = resp.data.recordscount; // 数据总条数
          let hasMore = totalCount !== this.getComment.length && totalCount > 0;
          if (hasMore && moreThanCurrentPageNum) {
            // 不是从点赞或评论过来的请求
            _this.getComment = _this.getComment.concat(resp.data.data);
            _this.commentNum = resp.data.recordscount;
          } else if (_this.pageNum <= _this.currentPageNum) {
            // 从点赞或评论过来的请求
            _this.currentComment = _this.currentComment.concat(resp.data.data);
            _this.commentNum = resp.data.recordscount;
            console.log(_this.currentComment);
          }
          console.log(_this.getComment);
          this.isHaveMore(hasMore);
          this.$nextTick(function () {
            this.scrollMode = 'touch';
          });
          if (_this.pageNum < _this.currentPageNum) {
            // _this.fromLoadMore = true;
            _this.pageNum = _this.pageNum + 1;
            _this.queryNewsCommont();
          } else {
            if (!_this.fromLoadMore) {
              // 不是上拉加载数据
              _this.getComment = [];
              _this.getComment = _this.currentComment;
              _this.currentComment = [];
              _this.sending = false;
              console.log(_this.getComment);
            }
            _this.currentPageNum = -1;
          }
        } else {
          _this.sending = false;
          _this.allLoaded = true;
        }
      });
    },
    // 评论
    toComment() {
      let _this = this;
      if (_this.sending) {
        return false;
      }
      let getId = getQueryString('id');
      let commentText = this.comment;
      commentText = commentText.replace(/(^\s*)|(\s*$)/g, ''); // 去除字符串两边的空格
      // 禁止输入表情
      let regRule = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;;
      if (commentText.match(regRule)) {
        commentText = commentText.replace(regRule, '');
        // this.comment = commentText;
        Toast('不支持表情评论！');
        return false;
      }
      if (commentText.length === 0) {
        Toast('评论内容不能为空！');
        return false;
      }
      _this.sending = true;
      ajax.post('/api/post/AddReply', {
        post_id: getId,
        body: commentText,
        reply_type: 3 // 1帖子 3资讯
      }).then(resp => {
        console.log(getId, commentText);
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          _this.comment = '';
          _this.currentPageNum = _this.pageNum; // 保存当前页码
          console.log(_this.currentPageNum);
          _this.pageNum = 0;
          _this.fromLoadMore = false;
          _this.queryNewsCommont();
          document.getElementById('inputComment').blur();
          Toast('评论成功！');
        } else {
          Toast('用户未登录，请先登录');
          if (_this.isFromApp) {
            /* eslint-disable */
            HealthBAT.toLogin();
          } else {
            goLogin();
          }
        }
      });
    },
    // 回复评论
    showReview(id) {
      let _this = this;
      _this.parentId = id;
      document.getElementById('inputComment').focus();
      console.log(this.parentId);
    },
    // 让评论输入框失焦
    inputCommentBlur() {
      // document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px';
      let _this = this;
      _this.writing = false;
      if (_this.isFromApp) {
        _this.inputCommentWidth = 'calc(100% - 200px)';
      } else {
        _this.inputCommentWidth = 'calc(100% - 160px)';
      }
    },
    // 评论焦点
    inputCommentFocus() {
      let hasToken = getToken();
      if (!hasToken) {
        Toast('用户未登录，请先登录');
        goLogin();
      }
      // setTimeout(function(){
      //     // 设置body的高度为可视高度+302
      //     // 302为原生键盘的高度
      //     document.getElementsByTagName('body')[0].style.height = (window.innerHeight + 302) + 'px';
      //     document.body.scrollTop = 302;
      // }, 300)
      setTimeout(function(){
        console.log(document.body.scrollHeight);
        document.body.scrollTop = document.body.scrollHeight;
      },300);
      let _this = this;
      _this.writing = true;
      _this.inputCommentWidth = 'calc(100% - 70px)';
    },
    // 对评论进行点赞
    commentLike(id, like) {
      let _this = this;
      if (_this.sending) {
        return false;
      }
      if (_this.isShare) {
        return false;
      }
      let isLikeFlag = like;
      if (isLikeFlag) {
        isLikeFlag = 0;
      } else {
        isLikeFlag = 1;
      }
      _this.sending = true;
      ajax.post('/api/post/follow', {
        type: 7, // 关注类型(1:关注用户,2:关注议堂,3:点赞帖子,4:点赞帖子评论,5:收藏帖子,6:点赞文章,7:点赞文章评论,8:收藏文章)
        operate: isLikeFlag, // 1：关注、0：取消关注、 1：点赞、0：取消点赞、1：收藏、0：取消收藏
        target_id: id // 用户id或议堂id帖子或评论id，或文章id,根据方法来区分
      }).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          Toast(resp.data.message);
          _this.currentPageNum = _this.pageNum; // 保存当前页码
          console.log(_this.currentPageNum);
          _this.pageNum = 0;
          _this.fromLoadMore = false;
          _this.queryNewsCommont();
        } else {
          // Toast(resp.data.msg);
          Toast('用户未登录，请先登录');
          if (_this.isFromApp) {
            /* eslint-disable */
            HealthBAT.toLogin();
          } else {
            goLogin();
          }
        }
      });
    },
    // 喜欢/不喜欢
    updateNewsLike(type) {
      let _this = this;
      let getId = getQueryString('id');
      if (type === 0) {
        type = 1;
      } else {
        type = 0;
      }
      ajax.post('/api/post/follow', {
        type: 6, // 关注类型(1:关注用户,2:关注议堂,3:点赞帖子,4:点赞帖子评论,5:收藏帖子,6:点赞文章,7:点赞文章评论,8:收藏文章)
        operate: type, // 1：关注、0：取消关注、 1：点赞、0：取消点赞、1：收藏、0：取消收藏
        target_id: getId // 用户id或议堂id帖子或评论id，或文章id,根据方法来区分
      }).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          Toast(resp.data.message);
          _this.getListDetil();
        } else {
          Toast('用户未登录，请先登录');
          if (_this.isFromApp) {
            /* eslint-disable */
            HealthBAT.toLogin();
          } else {
            goLogin();
          }
        }
      });
    },
    // 收藏/取消收藏
    collection(isCollect) {
      let _this = this;
      let getId = getQueryString('id');
      let flag = true;
      console.log(isCollect);
      if (isCollect === 0) {
        isCollect = 1;
      } else {
        isCollect = 0;
      }
      if (_this.collectionFlag) {
        flag = false;
        return false;
      }
      _this.collectionFlag = true;
      if (flag) {
        setTimeout(() => {
          _this.collectionFlag = false;
        }, 2000);
      }
      // let deleteCollectionId = _this.collectId;
      ajax.post('/api/post/follow', {
        type: 8, // 关注类型(1:关注用户,2:关注议堂,3:点赞帖子,4:点赞帖子评论,5:收藏帖子,6:点赞文章,7:点赞文章评论,8:收藏文章)
        operate: isCollect, // 1：关注、0：取消关注、 1：点赞、0：取消点赞、1：收藏、0：取消收藏
        target_id: getId // 用户id或议堂id帖子或评论id，或文章id,根据方法来区分
      }).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          _this.getListDetil();
          Toast(resp.data.message);
        } else {
          Toast('用户未登录，请先登录');
          if (_this.isFromApp) {
            /* eslint-disable */
            HealthBAT.toLogin();
          } else {
            goLogin();
          }
        }
      });
    },
    // 分享
    share() {
      let _this = this;
      let _summary = _this.detailData.body;
      _summary = delHtmlTag(_summary);
      let index = _summary.indexOf('。') > -1 ? _summary.indexOf('。') : _summary.length;
      _summary = _summary.substring(0, index);
      _summary = _summary.replace(/&nbsp;/g, ''); // 去除字符串空格
      console.log(index, _summary);
      let data = {
        newsId: _this.infoId,
        title: _this.detailData.title,
        summary: _summary,
        image: _this.detailData.picUrl
      };
      let strData = JSON.stringify(data);
      // alert(strData);
      /* eslint-disable */
      HealthBAT.newsShare(strData);
    },
    // 获取分享内容
    getShareText() {
      let _this = this;
      let _summary = _this.detailData.body;
      _summary = delHtmlTag(_summary);
      let index = _summary.indexOf('。') > -1 ? _summary.indexOf('。') : _summary.length;
      _summary = _summary.substring(0, index);
      _summary = _summary.replace(/&nbsp;/g, ''); // 去除字符串空格
      console.log(index, _summary);
      // let data = {
      //   newsId: _this.infoId,
      //   title: _this.detailData.title,
      //   summary: _summary,
      //   image: _this.detailData.picUrl
      // };
      // let strData = JSON.stringify(data);
      return _summary;
    },
    // 查看相关资讯
    toAnotherNews(detailId) {
      let _this = this;
      let thisToken = getToken();
      _this.$router.push({
        path: '/headlines/newsDetail', query: { id: detailId, from2: _this.fromWhere, token: thisToken, share: _this.appShare, isWifi: _this.appWifi }
      });
    },
    // 下拉刷新
    loadTop: function () {
      this.getComment = [];
      this.commentNum = 0;
      this.pageNum = 0;
      this.queryNewsCommont().then(() => {
        this.$refs.loadmore.onTopLoaded();
      });
    },
    // 上拉加载
    loadBottom: function () {
      this.fromLoadMore = true;
      this.pageNum = this.pageNum + 1;
      this.queryNewsCommont();
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
    dateDiff(timeTemp) {
      return getDateDiff(timeTemp);
    },
    dateSmallDiff(timeTemp) {
      return getDateSmallDiff(timeTemp);
    },
    formateDates(timeTemp) {
      return formatDate(new Date(timeTemp), 'yyyy-MM-dd');
    },
    // 跳转到指定id
    custormAnchor(anchorName) {
      let _this = this;
      if (_this.getComment.length > 0) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) {
          // anchorElement.scrollIntoView();
          let scrollHeight = anchorElement.offsetTop - 74;
          document.getElementsByClassName('load-more-container')[0].scrollTop = scrollHeight;
          document.documentElement.scrollTop = scrollHeight;
          document.body.scrollTop = scrollHeight;
        }
      } else {
        let height = document.getElementsByClassName('mint-loadmore')[0].scrollHeight;
        let clientHeight = document.body.clientHeight;
        let scrollHeight = height > clientHeight ? (height - clientHeight) : height;
        document.getElementsByClassName('load-more-container')[0].scrollTop = scrollHeight;
        document.documentElement.scrollTop = scrollHeight;
        document.body.scrollTop = scrollHeight;
      }
    },
    // 监听页面滚动
    pageScroll() {
      let _this = this;
      let container = document.getElementsByClassName('load-more-container')[0];
      container.onscroll = function() {
        let scrollTop = document.getElementsByClassName('load-more-container')[0].scrollTop;
        // console.log(scrollTop);
        if (_this.isFromApp) {
          /* eslint-disable */
          HealthBAT.newsContentOffset(scrollTop);
        }
      }
    },
    // 图片添加点击事件
    setImgMonitor() {
      let _this = this;
      this.$nextTick(function () {
        let imgs = document.getElementsByClassName("news-article")[0].getElementsByTagName('img');
        console.log(imgs);
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].addEventListener('click', function () {
            console.log(imgs[i].currentSrc);
            _this.largeImg = imgs[i].currentSrc;
            _this.showLargeVisible = true;
          });
        }
      });
    },
    // 设置相关阅读图片大小
    setRelatedImgStyle() {
      let _this = this;
      _this.$nextTick(() => {
        let relatedImgWidth = _this.$refs.relatedImg[0].clientWidth;
        _this.relatedImgHeight = relatedImgWidth * 6 / 9 + 'px';
      });
    },
    // 设置文章样式
    /*
    * let data = {
        fontSize: 15
      };
      */
    setNewsStyle(data) {
      let fontSize = data.fontSize;
      let needSet = document.getElementsByClassName("news-article")[0].getElementsByTagName('*');
      for (let i = 0; i < needSet.length; i++) {
        needSet[i].style.fontSize = fontSize + 'px';
      }
    },
    // 设置文章内容样式
    setNewsContentStyle() {
      // 设置文章内容样式
      this.$nextTick(() => {
        let needSet = document.getElementsByClassName("news-article")[0].getElementsByTagName('*');
        for (let i = 0; i < needSet.length; i++) {
          needSet[i].style.maxWidth = '100%';
        }
      });
    },
    // 返回顶部
    /**
    scrollToTop() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      console.log(scrollTop);
    }
     **/
  },
  mounted() {
    // 更新阅读量
    this.updateReadingQuantity();
    // 获取url参数
    this.getUrlParmas();
    // 查询评论
    this.queryNewsCommont();
    // 检测手机终端
    this.checkMobileAgent();
    // 监听滚动
    this.pageScroll();
    window.toProductDetail = this.toProductDetail;
    window.toH5Detail = this.toH5Detail;
    window.productDetailFromShare = this.productDetailFromShare;
    window.setNewsStyle = this.setNewsStyle;
    window.getShareText = this.getShareText;
    //返回顶部
    // window.addEventListener('scroll', this.scrollToTop);
    //window.goTop = this.goTop;
  },
  watch: {
    '$route'() {
      this.$router.go(0);
    }
  },
};

</script>

<style lang="less" scoped>
@import "../../styles/mixin.less";
.loading {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
.page {
  position: relative;
  padding-top: 44px;
  height: 100%;
  font-size: 18px;
  background: #fff;
  &.noPadding {
    padding-top: 0;
  }
  &.page-video {
    background: #000;
  }
}
.load-more-container {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  &.container-padding {
    padding-top: 61px;
  }
}
.news-title {
  font-size: 21px;
  color: #000;
  text-align: left;
  padding: 15px 24px 15px 10px;
  line-height: 1.2;
  background: #fff;
  &.title-video {
    background: #000;
    color: #fff;
  }
}

.news-subtitle {
  font-size: 12px;
  color: #666;
  // .border-1px(#e0e0e0);
  padding-left: 10px;
  padding-bottom: 13px;
  background: #fff;
  &.subtitle-video {
    background: #000;
    color: #fff;
  }
  .isCopyRight {
    color: #0ccdd3;
    border: solid 1px #0ccdd3;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 10px;
    margin-right: 5px;
  }
  .source {
    margin-right: 10px;
  }
  .reads {
    padding-right: 10px;
    img {
      width: 18px;
      vertical-align: middle;
      margin-top: -3px;
    }
  }
  .star {
    padding-right: 10px;
    img {
      width: 15px;
      vertical-align: middle;
      margin-top: -5px;
    }
  }
  .collect {
    padding-right: 10px;
    img {
      width: 18px;
      vertical-align: middle;
      margin-top: -5px;
    }
  }
  .share {
    padding-right: 10px;
    img {
      width: 16px;
      vertical-align: middle;
      margin-top: -3px;
    }
  }
  .time {
    padding: 0;
    img {
      width: 16px;
      vertical-align: middle;
      margin-top: -3px;
    }
  }
}

.author-wrapper {
  padding: 0 10px;
  margin: 10px 0 20px;
  display: flex;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  .detail {
    flex: 1;
    .name {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .content {
      font-size: 14px;
      color: #999;
    }
  }
}

.news-article {
  font-family: PingFang-SC-Regular;
  font-size: 15px;
  color: #333;
  /*padding: 15px 15px 60px 15px;*/
  padding: 15px;
  line-height: 1.8em;
  background: #fff;
  /deep/p {
    text-align: justify;
  }
  /deep/img {
    max-width: 100% !important;
  }
  /deep/video {
    width: 100%;
  }
  &.padding-min {
    padding: 15px;
  }
  &.article-video {
    background: #000;
    color: #fff;
  }
}

/deep/.product {
  position: relative;
  margin: 15px 10px;
  display: flex;
  background: #f7f7f7;
  line-height: 1.3;
  .product-img {
    width: 25%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .product-detail {
    flex: 1;
    padding: 10px;
    .product-name {
      font-size: 16px;
      color: #333;
      overflow: hidden;
      font-weight: bold;
      span {
        float: right;
        color: #f94f4f;
        font-weight: lighter;
      }
    }
    .product-description {
      font-size: 13px;
      color: #999;
      margin: 5px 0;
      .multi-text-overflow(2);
    }
    .product-footer {
      font-size: 12px;
      color: #999;
      overflow: hidden;
      padding-top: 5px;
      span {
        color: #0ccdd3;
        border: solid 1px #0ccdd3;
        border-radius: 3px;
        padding: 1px 3px;
        margin-right: 5px;
        font-size: 12px;
      }
      .to-buy {
        position: relative;
        display: inline-block;
        float: right;
        color: #f94f4f;
        padding-right: 15px;
        font-size: 16px;
        font-weight: bold;
        &:after {
          position: absolute;
          top: 5px;
          right: 5px;
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          border-top: solid 2px #f94f4f;
          border-right: solid 2px #f94f4f;
          transform: rotate(45deg);
        }
      }
    }
  }
}

.main-label {
  margin: 20px 0;
  padding: 0 12px;
  li {
    padding: 5px 15px;
    color: #0ccdd3;
    background: #e5feff;
    font-size: 16px;
    border-radius: 15px;
    margin-right: 10px;
    display: inline-block;
  }
}

.like-dislike {
  margin: 20px 0;
  text-align: center;
  span {
    width: 120px;
    height: 50px;
    display: inline-block;
    margin: 0 10px;
    &.like {
      background: url("./img/iconlh_xh@2x.png") center center no-repeat;
      background-size: 100% auto;
      &.active {
        background: url("./img/iconlh_xhp@2x.png") center center no-repeat;
        background-size: 100% auto;
      }
    }
    &.dislike {
      background: url("./img/iconlh_bxh@2x.png") center center no-repeat;
      background-size: 100% auto;
      &.active {
        background: url("./img/iconlh_bxhp@2x.png") center center no-repeat;
        background-size: 100% auto;
      }
    }
  }
}

.related-read {
  padding: 10px 12px;
  border-top: solid 1px #e0e0e0;
  .title {
    font-size: 18px;
    margin: 10px 0;
    img {
      width: 15px;
      vertical-align: middle;
      margin-top: -5px;
    }
  }
  .related-read-content {
    font-size: 12px;
    li {
      display: flex;
      padding: 10px 0;
      border-bottom: solid 1px #e0e0e0;
      .related-detail {
        flex: 1;
        padding-right: 10px;
        .related-title {
          font-size: 16px;
          color: #333;
          line-height: 1.5;
          min-height: 35px;
          padding-top: 5px;
          .multi-text-overflow(2);
        }
        .related-sub {
          color: #999;
          margin-top: 5px;
          font-size: 12px;
          span {
            margin-right: 5px;
            &:last-child {
              margin-right: 0;
            }
          }
          .isCopyRight {
            color: #0ccdd3;
            border: solid 1px #0ccdd3;
            padding: 1px 3px;
            border-radius: 3px;
            font-size: 10px;
            margin-right: 5px;
          }
          .source {
            margin-right: 5px;
          }
          .author {
            margin-right: 5px;
            img {
              width: 15px;
              vertical-align: middle;
              margin-top: -3px;
            }
          }
          .reads {
            img {
              width: 15px;
              vertical-align: middle;
              margin-top: -3px;
            }
          }
        }
      }
      .related-img {
        width: 30%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.comment-content {
  padding: 0 12px 20px 12px;
  margin-top: 30px;
  &.comment-margin {
    margin-bottom: 30px;
  }
  .comment-title {
    font-size: 18px;
    margin-top: -20px;
    margin-bottom: 30px;
    img {
      width: 18px;
      vertical-align: middle;
      margin-top: -5px;
    }
  }
  .comment-one {
    display: flex;
    margin-bottom: 20px;
    .avatar {
      margin-right: 10px;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .comment-detail {
      flex: 1;
      .name {
        color: #0ccdd3;
        font-size: 14px;
        overflow: hidden;
        &.name-video {
          color: #d3d3d3;
          span {
            color: #d3d3d3;
          }
        }
        span {
          color: #999;
          float: right;
          em {
            width: 15px;
            height: 15px;
            background: url("./img/icon_dz@2x.png") center center no-repeat;
            background-size: 100% auto;
            margin-right: 10px;
            display: inline-block;
            &.active {
              background: url("./img/iconlh_dzd@2x.png") center center no-repeat;
              background-size: 100% auto;
            }
          }
        }
      }
      .content {
        color: #333333;
        font-size: 18px;
        margin: 10px 0;
        word-break: break-all;
        &.content-video {
          color: #fff;
        }
      }
      .time-reply {
        color: #333;
        font-size: 14px;
        &.time-reply-video {
          color: #d3d3d3;
        }
        span {
          padding: 5px 15px;
          background: #f5f5f5;
          border-radius: 10px;
        }
      }
      .reply {
        margin: 10px 0;
        li {
          padding: 10px;
          color: #333;
          font-size: 16px;
          background: #f5f5f5;
          span {
            color: #0ccdd3;
          }
        }
      }
    }
  }
}

.news-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  /*display: flex;*/
  justify-content: left;
  align-items: center;
  padding: 0 12px;
  border-top: solid 1px #eee;
  &.footer-video {
    background-color: #000;
    border-top: solid 1px #000;
  }
  .input-comment {
    // width: 60%;
    height: 30px;
    border-radius: 15px;
    font-size: 13px;
    padding: 0 10px 0 30px;
    color: #333;
    outline: none;
    -webkit-appearance: none;
    line-height: 1.3;
    background: #f0f0f0;
    border: none;
  }
  .pencil {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 20px;
    top: 50%;
    margin-top: -7px;
  }
  .comment-btn {
    font-size: 14px;
    width: 50px;
    height: 30px;
    padding: 0 8px;
    margin-left: 5px;
    background-color: transparent;
    border: solid 1px #999;
    color: #333;
    &.comment-btn-video {
      font-size: 16px;
      border: none;
      color: #fff;
    }
  }
  /*span {
    display: inline-block;
    margin-left: 2px;
    vertical-align: middle;
  }*/
  .look-comment {
    width: 50px;
    text-align: center;
    display: inline-block;
    span {
      display: inline-block;
      position: relative;
      width: 20px;
      height: 20px;
      background: url("./img/iconlh_pln@2x.png") center center no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      &:active {
        background: url("./img/iconlh_plp@2x.png") center center no-repeat;
        background-size: 100% 100%;
      }
      i {
        position: absolute;
        top: -10px;
        right: 0;
        transform: translateX(30%);
        background: #eb4e53;
        color: #fff;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        padding: 0 6px;
        border-radius: 10px;
      }
    }
  }
  .is-like {
    width: 40px;
    text-align: center;
    display: inline-block;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("./img/icon_dz@2x.png") center center no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      &.has-star {
        background: url("./img/iconlh_dzd@2x.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .collection {
    width: 50px;
    text-align: center;
    display: inline-block;
    span {
      display: inline-block;
      width: 20px;
      height: 21px;
      background: url("./img/iconlh_scn@2x.png") center center no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      &.has-collect {
        background: url("./img/iconlh_scp@2x.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .share {
    width: 30px;
    text-align: right;
    display: inline-block;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("./img/iconlh_fxn@2x.png") center center no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      &:active {
        background: url("./img/iconlh_fxp@2x.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

.no-more {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  &.more-margin {
    margin-bottom: 50px;
  }
  &.no-more-video {
    color: #fff;
  }
}
.no-data-tips {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  img {
    width: 100%;
    height: 100%;
  }
}
.show-large-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(0,0,0,0.8);
  overflow-y: auto;
  z-index: 999;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 100%;
    transform: translate(-50%, -50%);
  }
}
/*/deep/.mint-loadmore-bottom {
    margin-bottom: 0;
  }*/
</style>

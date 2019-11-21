<template>
<div class="container">
  <!--阳虚质-->
  <!--<yang-deficiency @share="share" v-show="yangFlag"></yang-deficiency>-->
  <!--阴虚质-->
  <!--<yin-deficiency @share="share" v-show="yinFlag"></yin-deficiency>-->
  <!--气虚质-->
  <!--<qi-deficiency @share="share" v-show="qiFlag"></qi-deficiency>-->
  <!--痰湿质-->
  <!--<yan-deficiency @share="share" v-show="yanFlag"></yan-deficiency>-->
  <!--湿热质-->
  <!--<shire-deficiency @share="share" v-show="shireFlag"></shire-deficiency>-->
  <!--血瘀质-->
  <!--<xueyu-deficiency @share="share" v-show="xueyuFlag"></xueyu-deficiency>-->
  <!--特禀质-->
  <!--<tebing-deficiency @share="share" v-show="tebingFlag"></tebing-deficiency>-->
  <!--气郁质-->
  <!--<qiyu-deficiency @share="share" v-show="qiyuFlag"></qiyu-deficiency>-->
  <!--平和质-->
  <!--<pinghe-deficiency @share="share" v-show="pingheFlag"></pinghe-deficiency>-->
  <div class="load-more-container" :style="{ '-webkit-overflow-scrolling': scrollMode }">
    <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
      <div class="suggest-bg">
        <img src="./img/suggest/bg1.jpg" />
        <img src="./img/suggest/bg2.jpg" />
        <img src="./img/suggest/bg3.jpg" />
        <img src="./img/suggest/bg4.jpg" />
        <img src="./img/suggest/bg5.jpg" />
        <img src="./img/suggest/bg6.jpg" />
      </div>
      <div class="wrapper">
        <div class="item item-flex">
          <div class="item-img"><img :src="protectImg" /></div>
          <div class="content">
            <div class="name">{{ localResult.name }}</div>
            <div class="title">{{ localResult.desc }}</div>
            <div class="detail common" v-html="localResult.commonPerformance"></div>
            <div class="more"><span @click="popupVisible=true">查看</span></div>
          </div>
        </div>
        <!--养生建议-->
        <div class="item-title"><img src="./img/suggest/text01.png" /></div>
        <div class="item">
          <div class="title">{{ localResult.suggest.title }}</div>
          <div class="detail"><p v-for="(suggestDesc, index) in localResult.suggest.desc" :key="index">{{ suggestDesc }}</p></div>
        </div>
        <!--养生推荐-->
        <div class="item-title" v-show="result.healthrecommandlist && result.healthrecommandlist.length>0"><img src="./img/suggest/text03.png"/></div>
        <!--producttype 商品类型 1：固定膏方，2:药材-->
        <template v-for="(commandList, index) in result.healthrecommandlist">
          <div class="item item-flex goods" v-if="commandList.producttype === 1" :key="index" @click="goPrescribeDetail(commandList.productid)">
            <div class="item-img"><img :src="commandList.recommandimg" /></div>
            <div class="content">
              <div class="title">{{ commandList.productname }}</div>
              <div class="detail">{{ commandList.productbrief }}</div>
            </div>
          </div>
          <div class="item goods" v-if="commandList.producttype === 2" :key="index">
            <div class="goods-title">{{ commandList.recommandname }}</div>
            <div class="desc">{{ commandList.productbrief }}</div>
            <div class="goods-flex">
              <div class="item-img"><img :src="commandList.recommandimg" /></div>
              <div class="content">
                <div class="goods-title">{{ commandList.productname }}</div>
                <div class="label"><span v-for="(tagList, tagIndex) in commandList.producttaglist" :key="tagIndex">{{ tagList }}</span></div>
                <div class="price"><em>&yen;{{ commandList.price}}</em><span class="to-buy" @click="toBuy(commandList.productid, commandList.selfid, commandList.fastid, commandList.commonid, commandList.transnationalid)">购买</span></div>
              </div>
            </div>
          </div>
        </template>
        <!--诊疗建议-->
        <div class="item-title" v-show="result.diagnosisproposallist && result.diagnosisproposallist.length>0"><img src="./img/suggest/text04.png"/></div>
        <div class="medicine" v-show="zhongYaoMed.length>0">
          <div class="name">【中药方】</div>
          <div class="content" v-for="(propose, index) in zhongYaoMed" :key="index">
            <div class="title">{{ propose.prescriptname }}：</div>
            <div class="medicine-detail">{{ propose.prescriptcontent }}</div>
          </div>
        </div>
        <div class="medicine" v-show="zhongChengMed.length>0">
          <div class="name">【中成药】</div>
          <div class="content" v-for="(propose, index) in zhongChengMed" :key="index">
            <div class="medicine-detail">{{ propose.prescriptcontent }}</div>
          </div>
        </div>
        <!--相关药品-->
        <div class="medicine banner-medicine" v-if="result.relateddrugslist && result.relateddrugslist.length>0">
          <div class="name">相关药品</div>
          <div class="banner-cover">
            <div class="banner-wrapper" :style="{width: (result.relateddrugslist.length * 11.5) + 'rem'}">
              <template v-for="(relatedMed, index) in result.relateddrugslist">
                <div class="banner" :key="index" @click="toBuy(relatedMed.commoditycode, relatedMed.commoditybyself, relatedMed.commodityfast, relatedMed.commoditycommon, relatedMed.commoditytransnational)">
                  <div class="hd">{{ relatedMed.commodityname }}</div>
                  <img :src="relatedMed.commodityimage" />
                  <div class="bd" :class="{'bd-background': relatedMed.commoditydescription.length===0}">{{ relatedMed.commoditydescription }}</div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!--调理方案-->
        <div class="item-title"><img src="./img/suggest/text02.png"/></div>
        <div class="item item-flex">
          <div class="content">
            <div class="hd"><img src="./img/suggest/text.png" /></div>
            <div class="doc-title">全科医生7*24h全天在线</div>
            <div class="button" @click="goAskDoctor">免费定制<span></span></div>
            <div class="detail">咨询医生 &gt; 定制方案 &gt; 配送到家</div>
          </div>
          <div class="doctor-avatar"><img src="./img/suggest/doctor.png"/></div>
        </div>
        <!--延展阅读-->
        <div class="item-title" v-show="result.relatednewslist && result.relatednewslist.length>0"><img src="./img/suggest/text05.png"/></div>
        <template v-for="relatedNews in result.relatednewslist">
          <!--showtype:展示方式（0：无图仅标题，1：一张小图，2：一张大图，3：三张小图）-->
          <!--无图片-->
          <div class="related-read" v-if="relatedNews.newstype === 1 && relatedNews.showtype === 0" :key="relatedNews.id" @click="toNewsDetail(relatedNews.id, relatedNews.newstype)">
            <div class="title hasHeight">{{ relatedNews.title }}</div>
            <!--<div class="detail" :style="{'min-height':3+'rem'}">{{ relatedNews.abstract }}</div>-->
            <!--<div class="time">{{ formatDates(relatedNews.createtime) }}</div>-->
            <div class="related-footer">{{ relatedNews.sourcename }}&nbsp;&nbsp;{{ relatedNews.readingquantity }}阅读量&nbsp;&nbsp;{{ relatedNews.commentcount }}评论&nbsp;&nbsp;{{ dateDiff(relatedNews.createtime) }}</div>
          </div>
          <!--一张小图-->
          <div class="related-read related-flex" v-if="relatedNews.newstype === 1 && relatedNews.showtype === 1" :key="relatedNews.id" @click="toNewsDetail(relatedNews.id, relatedNews.newstype)">
            <div class="related-img"><img :src="relatedNews.picurl" /></div>
            <div class="content">
            <div class="title hasHeight">{{ relatedNews.title }}</div>
            <!--<div class="detail" :style="{'min-height':3+'rem'}">{{ relatedNews.abstract }}</div>-->
            <div class="related-footer">{{ relatedNews.sourcename }}&nbsp;&nbsp;{{ relatedNews.readingquantity }}阅读量&nbsp;&nbsp;{{ relatedNews.commentcount }}评论&nbsp;&nbsp;{{ dateDiff(relatedNews.createtime) }}</div>
            </div>
          </div>
          <!--一张大图-->
          <div class="related-read" v-if="relatedNews.newstype === 1 && relatedNews.showtype === 2" :key="relatedNews.id" @click="toNewsDetail(relatedNews.id, relatedNews.newstype)">
            <div class="title">{{ relatedNews.title }}</div>
            <div class="related-large-img"><img class="large-img" :src="relatedNews.picurl" /></div>
            <div class="related-footer">{{ relatedNews.sourcename }}&nbsp;&nbsp;{{ relatedNews.readingquantity }}阅读量&nbsp;&nbsp;{{ relatedNews.commentcount }}评论&nbsp;&nbsp;{{ dateDiff(relatedNews.createtime) }}</div>
          </div>
          <!--三张小图-->
          <div class="related-read" v-if="relatedNews.newstype === 1 && relatedNews.showtype === 3" :key="relatedNews.id" @click="toNewsDetail(relatedNews.id, relatedNews.newstype)">
            <div class="title">{{ relatedNews.title }}</div>
            <div class="three-img">
              <div class="related-img" v-for="(img, imgIndex) in relatedNews.picurl.split(',')" :key="imgIndex" :class="{'related-img-margin':imgIndex===1}"><img :src="img" /></div>
            </div>
            <!--<div class="related-img"><img :src="relatedNews.picurl.substring(0,relatedNews.picurl.indexOf(','))" /></div>-->
            <div class="related-footer">{{ relatedNews.sourcename }}&nbsp;&nbsp;{{ relatedNews.readingquantity }}阅读量&nbsp;&nbsp;{{ relatedNews.commentcount }}评论&nbsp;&nbsp;{{ dateDiff(relatedNews.createtime) }}</div>
          </div>
          <!--视频-->
          <div class="related-read" v-if="relatedNews.newstype === 2" :key="relatedNews.id" @click="toNewsDetail(relatedNews.id, relatedNews.newstype)">
            <div class="title">{{ relatedNews.title }}</div>
            <div class="related-large-img">
              <img class="large-img" :src="relatedNews.picurl" />
              <img class="video-btn" src="./img/suggest/xh_icon_play@2x.png" />
            </div>
            <div class="related-footer">{{ relatedNews.sourcename }}&nbsp;&nbsp;{{ relatedNews.readingquantity }}播放量&nbsp;&nbsp;{{ relatedNews.commentcount }}评论&nbsp;&nbsp;{{ dateDiff(relatedNews.createtime) }}</div>
          </div>
        </template>
      </div>
      <div class="no-more" v-show="showNoMore">没有更多了...</div>
    </mt-loadmore>
  </div>
  <mt-prop v-model="popupVisible" position="bottom" class="popup">
    <div class="physique-detail">
      <div class="name">{{ localResult.name }}</div>
      <div class="desc">{{ localResult.desc }}</div>
      <div class="common" v-html="localResult.commonPerformance"></div>
      <div class="detail">
        <p v-for="(detail, index) in localResult.detail" :key="index" v-html="detail"></p>
      </div>
      <div class="close-detail" @click="popupVisible=false"><img src="./img/suggest/close.png" /></div>
    </div>
  </mt-prop>
</div>
</template>

<script>
import ajax from '@/utils/ajax';
import { result } from './common/data';
import { Popup, Loadmore } from 'mint-ui';
import { getQueryString } from '@/utils/index';
import { formatDate } from '@/utils/date';
import { intoInquiry } from '@/api/user';
import { getDateDiff } from '@/api/dateDiff';
import Cookies from 'js-cookie';
const PHYSIQUE_SCROLLTOP = 'physiqueScrollTop';
export default {
  name: 'suggest',
  data() {
    return {
      physiqueName: '', // 体质名称
      protectImg: require('./img/suggest/0.png'),
      localResult: [], // 体质测试本地结果
      result: [], // 测试查询结果
      zhongYaoMed: [], // 中药方
      zhongChengMed: [], // 中成药
      popupVisible: false,
      isFromApp: false, // 是否app端访问
      fromWhere: 'else', // 是否app端打开
      appShare: 0, // 是否分享打开 0 否 1 是
      appWifi: false, // app端是否wifi打开
      recordId: '', // 查看记录id
      // 上拉下拉数据参数
      allLoaded: false, // 是否全部加载完 (需要加载改为false)
      scrollMode: 'auto', // 滑动方式
      pageNum: 1, // 页码
      bottomText: '上拉加载更多...',
      showNoMore: false
    };
  },
  components: {
    'mt-prop': Popup,
    'mt-loadmore': Loadmore
  },
  created() {
    document.title = '中医体质测试';
    (function(doc, win) {
      let docEl = doc.documentElement;
      let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      let recalc = function() {
        let clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = (clientWidth >= 750 ? 30 : clientWidth / 750 * 31.5) + 'px';
      };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  },
  mounted() {
    // let _this = this;
    // let resultNum = _this.$route.query.resultNum;
    // 获取参数
    this.getUrlParams();
    // 获取测试结果
    this.protectSuggestion();
    // 监听页面滚动
    window.addEventListener('scroll', this.handleScroll);
    // 监听页面返回
    window.addEventListener('popstate', this.handleBack);
    // 获取存储页面滚动高度
    this.getScrollTop();
  },
  methods: {
    // 获取参数
    getUrlParams() {
      let _this = this;
      _this.isFromApp = getQueryString('from') === 'app';
      if (_this.isFromApp) {
        _this.fromWhere = 'app';
      }
      let record_id = getQueryString('recordId');
      if (record_id) {
        _this.recordId = record_id;
      }
    },
    // 获取测试结果
    protectSuggestion() {
      let _this = this;
      let physique_name = getQueryString('physiqueName'); // 体质名称 _this.$route.query.physiqueName
      _this.physiqueName = physique_name;
      let getPhysiqueName = ''; // 通过该体质名称获取本地结果
      let num = 0;
      switch (physique_name) {
        case '阳虚质':
          num = 0;
          getPhysiqueName = 'yangxuzhi';
          break;
        case '阴虚质':
          num = 1;
          getPhysiqueName = 'yinxuzhi';
          break;
        case '气虚质':
          num = 2;
          getPhysiqueName = 'qiyuzhi';
          break;
        case '痰湿质':
          num = 3;
          getPhysiqueName = 'yanshizhi';
          break;
        case '湿热质':
          num = 4;
          getPhysiqueName = 'shirezhi';
          break;
        case '血瘀质':
          num = 5;
          getPhysiqueName = 'xueyuzhi';
          break;
        case '特禀质':
          num = 6;
          getPhysiqueName = 'tebingzhi';
          break;
        case '气郁质':
          num = 7;
          getPhysiqueName = 'qiyuzhi';
          break;
        case '平和质':
          num = 8;
          getPhysiqueName = 'pinghezhi';
          break;
      }
      _this.localResult = result()[getPhysiqueName];
      _this.protectImg = require(`./img/suggest/${num}.png`);
      // 调理方案-结果
      _this.getHealthSolution();
    },
    // 调理方案-结果
    getHealthSolution() {
      let _this = this;
      return ajax.get('/api/user/getHealthSolution', {
        params: {
          physiqueName: _this.physiqueName
        }
      }).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          _this.result = resp.data.data;
          let _data = resp.data.data;
          _this.zhongYaoMed = [];
          _this.zhongChengMed = [];
          if (_data.diagnosisproposallist.length > 0) {
            for (let i = 0; i < _data.diagnosisproposallist.length; i++) {
              if (_data.diagnosisproposallist[i].prescripttypename === '中药方') {
                _this.zhongYaoMed.push(_data.diagnosisproposallist[i]);
              } else if (_data.diagnosisproposallist[i].prescripttypename === '中成药') {
                _this.zhongChengMed.push(_data.diagnosisproposallist[i]);
              }
            }
          }
        }
      });
    },
    // 膏方详情
    goPrescribeDetail(detailId) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('popstate', this.handleBack);
      let _this = this;
      _this.$router.push({
        path: '/physique/prescribeDetail', query: { id: detailId, from: _this.fromWhere }
      });
    },
    // 购买商品
    toBuy(productId, selfId, fastId, commonId, transnationalId) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('popstate', this.handleBack);
      let _this = this;
      let data = {
        productId: productId,
        getByself: selfId,
        getFast: fastId,
        getCommon: commonId,
        transnationalId: transnationalId
      };
      let strData = JSON.stringify(data);
      console.log(productId, selfId, fastId, commonId, transnationalId);
      console.log(strData);
      if (_this.isFromApp) {
        /* eslint-disable */
        HealthBAT.newToGoodsDetail(strData);
      } else {
        _this.$router.push({
          path: `/goods/goodsDetail?productId=${productId}&getFast=${fastId}&getByself=${selfId}&getCommon=${commonId}&isTransnational=${transnationalId}`
        });
      }
    },
    // 跳转资讯详情
    toNewsDetail(detailId, news_type) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('popstate', this.handleBack);
      let _this = this;
      _this.$router.push({
        path: '/headlines/newsDetail', query: {id: detailId, from2: _this.fromWhere, newsType: news_type, fromPhysique: '1'}
      });
    },
    // 在线问医
    goAskDoctor() {
      let _this = this;
      if (_this.isFromApp) {
        let data = {
          result: _this.physiqueName,
          resultUrl: `${process.env.WEB_HOST}/physique/result?physiqueName=${_this.physiqueName}&id=${_this.recordId}&check=1`,
          iconUrl: _this.protectImg
        };
        let strData = JSON.stringify(data);
        /* eslint-disable */
        HealthBAT.toChineseConsult(strData);
      } else {
        intoInquiry();
      }
    },
    // 格式化时间
    formatDates(timeTemp) {
      return formatDate(new Date(timeTemp), 'yyyy-MM-dd');
    },
    // 监听页面滚动
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollTop);
      if (scrollTop > 10) {
        Cookies.set(PHYSIQUE_SCROLLTOP, scrollTop);
      }
    },
    // 获取存储页面滚动高度
    getScrollTop() {
      let scroll_top = Cookies.get(PHYSIQUE_SCROLLTOP);
      setTimeout(() => {
        window.scrollBy(0,scroll_top);
      }, 300);
    },
    // 监听页面返回
    handleBack() {
      Cookies.remove(PHYSIQUE_SCROLLTOP);
      window.removeEventListener('popstate', this.handleBack);
    },
    // 下拉刷新
    loadTop: function() {
      this.result = [];
      this.pageNum = 0;
      this.getHealthSolution().then(() => {
        this.$refs.loadmore.onTopLoaded();
      });
    },
    // 上拉加载
    loadBottom: function() {
      this.fromLoadMore = true;
      this.pageNum = this.pageNum + 1;
      this.getHealthSolution();
      this.$refs.loadmore.onBottomLoaded();
    },
    isHaveMore(isHaveMore) {
      this.allLoaded = true;
      this.showNoMore = true;
      if (isHaveMore) {
        this.allLoaded = false;
        this.showNoMore = false;
      }
    },
    dateDiff(timeTemp) {
      return getDateDiff(timeTemp);
    }
  }
};
</script>

<style lang="less" scoped>
  @import './../../../styles/mixin.less';
  @black: #000;
  @gray: #5a6163;
  @color-cf: #cfcfcf;
  .container {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 100%;
    /*.load-more-container {
      overflow-x: hidden;
      width: 100%;
      height: 100%;
    }*/
    .suggest-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #f8f8f8;
      z-index: -1;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    .wrapper {
      padding: 0.8rem 1rem;
      .item {
        padding: 1rem 0.5rem 0.5rem 0.5rem;
        background: url("./img/suggest/text-square.png");
        background-size: 100% 100%;
        &.item-flex {
          display: flex;
        }
        .item-img {
          width: 5.5rem;
          height: 5.5rem;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .content {
          flex: 1;
          margin-left: 0.4rem;
          .more {
            text-align: right;
            span {
              padding: 0.1rem 0.4rem;
              border: solid 1px @color999;
              border-radius: 6px;
              color: @gray;
            }
          }
        }
        .name {
          font-size: 1rem;
          color: @black;
        }
        .title {
          font-size: 0.9rem;
          color: @black;
        }
        .detail {
          font-size: 0.8rem;
          color: @gray;
          margin: 0.3rem 0;
          &.common {
            .multi-text-overflow(2);
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
          }
          p {
            margin: 0.3rem 0;
          }
        }
        .doctor-avatar {
          position: relative;
          width: 6rem;
          height: 6rem;
          img {
            position: absolute;
            top: -10%;
            right: 0;
            width: 105%;
            max-height: 115%;
          }
        }
        .hd {
          width: 15rem;
          img {
            width: 100%;
            height: auto;
          }
        }
        .doc-title {
          font-size: 0.85rem;
          color: #2c1f16;;
        }
        .button {
          padding: 0.3rem 0.5rem;
          margin: 0.3rem 0;
          font-size: 0.9rem;
          color: @white-color;
          background: #f18155;
          border-radius: 10px;
          display: inline-block;
          span {
            width: 0.8rem;
            height: 0.6rem;
            background: url("./img/suggest/arrow.png") center center no-repeat;
            background-size: 100% auto;
            display: inline-block;
            margin-left: 0.2rem;
          }
        }
        &.goods {
          padding: 1rem 0.8rem 0.5rem;
          margin-bottom: 0.5rem;
          .item-img {
            width: 5rem;
            height: 5rem;
          }
          .goods-flex {
            display: flex;
            margin: 0.5rem 0;
          }
          .content {
            margin-left: 0.8rem;
          }
          .detail {
            color: rgba(44, 31, 22, 0.93);
            .multi-text-overflow(3);
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            max-height: 3.5rem;
            overflow: hidden;
          }
          .goods-title {
            font-size: 0.9rem;
            color: #2c1f16;
          }
          .desc {
            font-size: 0.8rem;
            color: #030303;
            .multi-text-overflow(2);
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
          }
          .label {
            margin: 0.5rem 0;
            span {
              padding: 0.1rem 0.3rem;
              border: solid 1px #f18155;
              border-radius: 8px;
              font-size: 0.7rem;
              color: #f18155;
              margin-right: 0.5rem;
              display: inline-block;
            }
          }
          .price {
            position: relative;
            color: #ff1200;
            font-size: 0.7rem;
            overflow: hidden;
            text-align: right;
            em {
              position: absolute;
              bottom: 0;
              left: 0;
            }
            .to-buy {
              font-size: 0.8rem;
              padding: 0.2rem 0.6rem;
              color: @white-color;
              background: #f18155;
              border-radius: 8px;
              display: inline-block;
            }
          }
        }
      }
      .item-title {
        margin: 1rem 0;
        text-align: center;
        img {
          width: 10rem;
        }
      }
      .medicine {
        .name {
          font-size: 1rem;
          color: @black;
          margin: 0.5rem 0;
        }
        .content {
          position: relative;
          padding: 1rem 0.8rem;
          background: url("./img/suggest/text-bg.png") center center no-repeat;
          background-size: 100% 100%;
          margin-bottom: 0.5rem;
          &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1rem;
            background: url("./img/suggest/text-bg-top.png") center center no-repeat;
            background-size: 100% 100%;
          }
          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1rem;
            background: url("./img/suggest/text-bg-bottom.png") center center no-repeat;
            background-size: 100% 100%;
          }
          .title {
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: @black-color;
          }
          .medicine-detail {
            /*margin-top: 0.5rem;*/
            font-size: 0.8rem;
            color: #6c6b6b;
          }
        }
        ::-webkit-scrollbar {
          display:none;
        }
        &.banner-medicine {
          position: relative;
          width: 100%;
          height: 11rem;
          margin-top: 1rem;
        }
        .banner-cover {
          position: absolute;
          left: -1rem;
          width: calc(100% + 2rem);
          height: 9rem;
          overflow-x: auto;
        }
        .banner-wrapper {
          &:after {
            content: '';
            display: table;
            height: 0;
            clear: both;
            visibility: hidden;
          }
          .banner {
            position: relative;
            padding: 0.5rem;
            width: 11rem;
            height: 9rem;
            background: #d4cbb9;
            font-size: 0.8rem;
            margin-right: 0.5rem;
            float: left;
            .hd {
              color: #2c1f16;
            }
            img {
              width: 100%;
              height: 5rem;
              margin-top: 0.1rem;
            }
            .bd {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2rem;
              line-height: 1.3;
              font-size: 0.7rem;
              padding: 0.2rem 0.5rem;
              color: @white-color;
              background: rgba(151,132,123,0.4);
              .multi-text-overflow(2);
              /*! autoprefixer: off */
              -webkit-box-orient: vertical;
              /* autoprefixer: on */
              &.bd-background {
                background: none;
              }
            }
          }
        }
      }
      .related-read {
        margin-bottom: 1rem;
        &.related-flex {
          display: flex;
        }
        .related-img {
          width: 5.5rem;
          height: 4.5rem;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .related-large-img {
          position: relative;
          width: 100%;
          height: 14rem;
          margin: 0.3rem 0;
          .large-img {
            width: 100%;
            height: 100%;
            display: block;
          }
          .video-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 2rem;
            height: 2rem;
            margin-top: -1rem;
            margin-left: -1rem;
          }
        }
        .content {
          flex: 1;
          margin-left: 0.8rem;
        }
        .title {
          font-size: 0.9rem;
          color: @black;
          &.hasHeight {
            min-height: 3rem;
            padding: 0.3rem 0 0.5rem;
          }
        }
        .detail {
          font-size: 0.8rem;
          color: @gray;
          margin-top: 0.3rem;
          .multi-text-overflow(3);
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
        }
        .time {
          text-align: right;
          font-size: 0.7rem;
          color: @gray;
        }
        .three-img {
          display: flex;
          width: 100%;
          .related-img {
            width: 30%;
            flex: 1;
            img {
              width: 100%;
            }
            &.related-img-margin {
              margin: 0 0.5rem;
            }
          }
        }
        .related-footer {
          font-size: 0.7rem;
          color: @gray;
        }
      }
    }
    .popup {
      width: 100%;
      bottom: -50px;
      padding-bottom: 50px;
    }
    .physique-detail {
      position: relative;
      padding: 2rem 1rem 1.5rem;
      font-size: 0.8rem;
      color: @gray;
      .name {
        font-size: 1rem;
        color: @black;
      }
      .desc, common, .detail p {
        margin: 0.3rem 0;
      }
      .common, .detail {
        /deep/span {
          color: @black;
        }
      }
      .close-detail {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        width: 2rem;
        height: 1.5rem;
        text-align: right;
        img {
          width: 1.1rem;
          height: auto;
        }
      }
    }
  }
  /*.share-tips {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    z-index: 10;
    .share-img {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 15rem;
    }
  }*/
</style>

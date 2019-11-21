<template>
  <div class="headline-list">
    <!--加载全部-->
    <!--<div v-if="index===0">-->
      <!--<div v-for="list in lists" :key="list.id" class="news-item" @click.stop="showDetail(list.id)">-->
        <!--<div class="clearfix">-->
          <!--<div class="news-text-wrapper">-->
            <!--<div class="news-text">-->
              <!--<p class="news-title">{{ list.title }}-->
              <!--</p>-->
              <!--<div class="news-subtitle">-->
                <!--&lt;!&ndash;<span class="source">搜狐新闻</span>&ndash;&gt;-->
                <!--<span class="reads">阅读量 {{ list.reading_quantity }}</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="news-img">-->
            <!--<img v-lazy="list.img" alt="" style="width: 100px;height: 75px;">-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--根据资讯ID加载相应内容-->
    <div v-for="list in lists" :key="list.id" class="news-item" @click.stop="showDetail(list.id)">
      <div class="clearfix">
        <div class="news-text-wrapper">
          <div :class="list.img ? 'news-text' : ''">
            <p class="news-title">{{ list.title }}
            </p>
            <div class="news-subtitle">
              <span class="isCopyRight" v-show="list.is_copy_right===1">原创</span>
              <span class="author" v-if="list.author"><img src="./../img/xh_icon_author@2x.png" /> {{ list.author }}</span>
              <span class="source" v-else-if="list.source_name">{{ list.sourceName.length>4?(list.sourceName.substr(0,4) + '...'):list.sourceName }}</span>
              <span class="reads"><img src="./../img/xh_zx_eyes@2x.png" /> {{ list.reading_quantity }}</span>
              <span class="time" v-if="list.release_time">{{ dateDiff(list.release_time) }}</span>
            </div>
          </div>
        </div>
        <div class="news-img" v-if="list.img">
          <img :src="list.img" alt="" style="width: 100px;height: 75px;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import ajax from '@/utils/ajax';
// import { Toast } from 'mint-ui';
import { getDateDiff } from '@/api/dateDiff';
import Cookies from 'js-cookie';
const CATEGORY_ID = 'headlineCategoryId';
const ACTIVE_ID = 'headlineActiveId';

export default {
  data() {
    return {};
  },
  props: {
    lists: Array,
    categoryId: String,
    activeId: Number,
  },
  methods: {
    showDetail(detailId) {
      Cookies.set(CATEGORY_ID, this.categoryId);
      Cookies.set(ACTIVE_ID, this.activeId);
      this.$router.push({
        path: '/headlines/newsDetail', query: { id: detailId, from: 'else' }
      });
    },
    dateDiff(timeTemp) {
      return getDateDiff(timeTemp);
    }
  },
  mounted() {
    console.log(this.lists);
  }
};

</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
.headline-list {
  height: 100%;
  background: #fff;
  .news-item {
    padding: 10px;
    background: #fff;
    .border-1px(#e0e0e0);
    .news-text-wrapper {
      width: 100%;
      float: left;
      .news-text {
        margin-right: 100px;
      }
      .news-title {
        font-size: 14px;
        color: #333;
        padding-right: 5px;
      }
      .news-subtitle {
        margin-top: 12px;
        font-size: 13px;
        color: #999;
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
            margin-top: -5px;
          }
        }
        .reads {
          margin-right: 5px;
          img {
            width: 16px;
            vertical-align: middle;
            margin-top: -3px;
          }
        }
      }
    }
    .news-img {
      float: left;
      width: 100px;
      height: 75px;
      margin-left: -100px;
    }
  }
}

</style>

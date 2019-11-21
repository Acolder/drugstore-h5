<template>
  <div class="headline-list">
    <!--我的收藏-->
    <div v-for="list in lists" :key="list.id" class="news-item">
      <div class="delbtn" v-show="delShowOne">
        <img src="../img/iconxh_gy_nomal.png" alt="" v-if="list.delNo" @click="delhead(list.id, list.delNo)">
        <img src="../img/iconxh_gy_elect.png" alt="" v-else @click="delhead(list.id, list.delNo)">
      </div>
      <div class="clearfix"  @click.stop="showDetail(list.id)">
        <div class="news-text-wrapper">
          <div :class="list.img ? 'news-text' : ''">
            <p class="news-title">{{ list.title }}
            </p>
            <div class="news-subtitle">
              <!--<span class="isCopyRight" v-show="list.is_copy_right===1">原创{{list.source_name}}</span>-->
              <span class="author" v-if="list.author"><img src="../../headlines//img/xh_icon_author@2x.png" /> {{ list.author }}</span>
              <span class="source" v-else-if="list.source_name">{{list.source_name| spanLength}}</span>
              <span class="reads"><img src="../../headlines/img/xh_zx_eyes@2x.png" /> {{ list.reading_quantity }}</span>
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
export default {
  data() {
    return {};
  },
  props: {
    lists: Array,
    delShowOne: Boolean
  },
  filters: {
    spanLength: function (value) {
      let newSpan = '';
      if (value && value.length > 0) {
        if (value.length > 4) {
          newSpan = value.substr(0, 4) + '...';
        } else {
          newSpan = value;
        }
      }
      return newSpan;
    }
  },
  methods: {
    delhead(reply_ids, states) {
      this.$emit('listenDelhead', reply_ids, states);
    },
    showDetail(detailId) {
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
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
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
  .headline-list .news-item:after{
    border-top: none;
  }
  .headline-list{
    .news-item{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0;
    }
    .headline-list .news-item .clearfix{
      display: flex;
    }
    .clearfix{
      border-bottom: 1px solid #e0e0e0;
      padding: 15px;
      flex:1;
    }
    .delbtn{
      width:40px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width:18px;
        height: 18px;
      }
    }
  }
</style>

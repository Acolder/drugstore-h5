<template>
  <div class="headline-list">
    <!--我的收藏-->
    <div v-for="list in lists" :key="list.id" class="news-item">
      <div class="delbtn" v-show="delShowOne">
        <img src="../img/iconxh_gy_nomal.png" alt="" v-if="list.delNo"  @click="delhead(list.reply_id, list.delNo)">
        <img src="../img/iconxh_gy_elect.png" alt="" v-else  @click="delhead(list.reply_id, list.delNo)">
      </div>
      <div class="clearfix">
        <div class="comRight">
          <img :src="list.photo_path" alt="">
        </div>
        <div class="comLeft">
          <div class="left-top">
            <div>{{list.user_nickname}}</div>
            <div>
              <!--<img src="../img/iconlh_dzd.png" alt="">-->
              <!--<i>916</i>-->
            </div>
          </div>
          <div class="left-center">
            <!--评论类型（3回复资讯 、2回复评论）-->
            <p v-if="list.reply_type == 3">{{list.body}}</p>
            <p v-if="list.reply_type == 2">回复@{{list.target_user_nickname}}：{{list.body}}</p>
          </div>
          <div class="left-bottom"  @click.stop="showDetail(list.news_id)">
            <div class="articleBox">
              <p class="newstitle">{{list.news_title}}</p>
              <img :src="list.news_main_image" alt="">
            </div>
            <div class="commentTime">{{ dateDiff(list.create_time) }}</div>
          </div>
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
    btnShow: false,
    lists: Array,
    delShowOne: Boolean
  },
  methods: {
    delhead(reply_ids, states) {
      this.$emit('listenDelComment', reply_ids, states);
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
  .moreTwo{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .headline-list {
    height: 100%;
    background: #fff;
    .news-item {
      padding: 10px;
      background: #fff;
      .border-1px(#e0e0e0);
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
    .clearfix{
      margin: 15px 15px 0;
      display: flex;
      flex:1;
      .comRight{
        width:35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 12px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .comLeft{
        flex: 1;
        border-bottom: 1px solid #e0e0e0;
        .left-top{
          width: 100%;
          height:30px;
          display: flex;
          justify-content: space-between;
          img{
            width:15px;
            height: 15px;
          }
          i{
            font-size: 13px;
            color: #0ccdd3;
          }
        }
        .left-center{
          font-size: 14px;
          color: #333333;
          p{
            word-break: break-all;
            .moreTwo;
          }
        }
        .left-bottom{
          margin-top: 13px;
          width:100%;
          margin-bottom: 15px;
          .articleBox{
            width:100%;
            height: 63px;
            background-color: #f5f5f5;
            display: flex;
            padding: 5px;
            justify-content: space-between;
            p{
              font-size: 15px;
              color: #333333;
              margin-right: 15px;
              line-height: 25px;
            }
            img{
              width:95px;
              height: 53px;
              border-radius: 3px;
              border: solid 1px #ebebeb;
            }
          }
          .commentTime{
            font-size: 11px;
            color: #999999;
          }
        }
      }
    }

  }
  .newstitle{
   .moreTwo;
  }
</style>

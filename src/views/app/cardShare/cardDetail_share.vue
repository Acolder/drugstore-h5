<template>
  <div id="share_cardDetail">
    <share></share>
    <div class="content">
      <div class="title">{{detail.subject}}</div>
      <div class="info">
        <div class="infoitem">
            <i class="icon dianzan"></i>
            <span class="num">{{detail.star_count}}</span>
        </div>
        <div class="infoitem">
            <i class="icon shoucang"></i>
            <span class="num">{{detail.collect_count}}</span>
        </div>
        <div class="infoitem">
            <i class="icon zhuanfa"></i>
            <span class="num">{{detail.share_count}}</span>
        </div>
      </div>
      <div class="author">
        <img :src="detail.photo_path" alt="">
        <div class="name_time">
          <span>{{detail.nickname}}</span>
          <span>{{detail.create_time}}</span>
        </div>
      </div>
      <div class="swiper" v-if="detail.images">
        <!-- <mt-swipe :auto="3000">
          <mt-swipe-item v-for="(swiper,index) in detail.images" :key="index">
            <a :href="swiper.product ? '/goods/goodsDetail?productId=' + swiper.product.productid + '&getCommon=' + swiper.product.getcommon : swiper.picture_url.replace('?from=app','?t=')">
              <img :src="swiper.picture_path" alt="">
            </a>
            <div class="img-box">
              <img :src="swiper" alt="">
            </div>
          </mt-swipe-item> -->
          <img v-for="(swiper,index) in detail.images" :key="index" :src="swiper" alt="">
        <!-- </mt-swipe> -->
      </div>
      <div class="body" v-html="detail.body">
        <!-- {{detail.body}} -->
      </div>
      <div class="topic" v-if="detail.topiclist">
        <div class="topic_item" v-for="(item,index) in detail.topiclist" :key="index">
          #{{item.topic_name}}#
        </div>
      </div>
      <div class="opinion_wrap">
        <div class="opinion">
          <div class="title">
            <div class="title_left">
              <i class="icon"></i>
              <span>大夫意见</span>
            </div>
            <div class="title_right">点击各项点评，查看点评统计</div>
          </div>
          <div class="decrtion" v-if="detail.doctorcommentlist">
            <div class="decttion_item" v-if="detail.doctorcommentlist[0]" @click="down">
              <img class="photo" src="./img/pla_icon_zdcak@2x.png" alt="">
              <span class="text">值得参考 {{detail.doctorcommentlist[0].comment_count}}</span>
            </div>
            <div class="decttion_item" v-if="detail.doctorcommentlist[1]"  @click="down">
              <img class="photo" src="./img/pla_icon_dyj@2x.png" alt="">
              <span class="text">待研究 {{detail.doctorcommentlist[1].comment_count}}</span>
            </div>
            <div class="decttion_item" v-if="detail.doctorcommentlist[2]"  @click="down">
              <img class="photo" src="./img/pla_icon_bkxs@2x.png" alt="">
              <span class="text">不可行 {{detail.doctorcommentlist[2].comment_count}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lien"></div>
    <div class="comment">
      <div class="title">
        <i></i>
        <span>评论</span>
      </div>
      <div class="comment_item" v-for="(item,index) in commentData" :key="index" v-if="index < 3">
        <div class="photo">
          <img :src="item.photo_path" alt="">
        </div>
        <div class="comment_content">
          <div class="top">
            <span>{{item.nickname}}</span>
            <div class="top_right"  @click="down">
              <i class="icon"></i>
              <span>{{item.star_count}}</span>
            </div>
          </div>
          <div class="center">
            {{item.body}}
          </div>
          <div class="bottom">
            <span>{{item.timediff === '1分钟前' ? '刚刚' : item.timediff}}</span><span class="dot" v-if="item.reply_count > 0"></span><span class="reply" v-if="item.reply_count > 0" @click="down">{{item.reply_count}}回复</span>
          </div>
        </div>
      </div>
      <div class="btn" v-if="commentData.length > 3">
        <button @click="down">查看更多</button>
      </div>
      <div class="nocomment" v-if="commentData.length === 0">暂无评论~</div>
    </div>
  </div>
</template>

<script>
import share from '@/components/share/shareHeader.vue';
import ajax from '@/utils/ajax';
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  data() {
    return {
      id: this.$route.query.id,
      detail: {},
      commentData: [],
      appUrl: 'https://itunes.apple.com/cn/app/id1395275648?mt=8', // app下载地址 默认ios
    };
  },
  components: {
    'share': share,
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem
  },
  methods: {
    // 获取帖子详情
    getData() {
      ajax.get(`/api/post/detail/${this.id}`).then(res => {
        // console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          console.log(res);
          this.detail = res.data.data;
          this.detail.images = this.detail.images.split(',');
          this.detail.create_time = this.detail.create_time.slice(0, -3);
          this.detail.body = this.detail.body.replace(/\n|\r/g, '</br>');
          console.log(this.detail.body);
          // 计算时间差
          // this.detail.create_time = new Date(this.detail.create_time.replace(/-/g, '/'));
          // let date = new Date();
          // let datediff = date.getTime() - this.detail.create_time.getTime();
          // let days = Math.floor(datediff / (24 * 3600 * 1000));
          // let leave1 = datediff % (24 * 3600 * 1000);    // 计算天数后剩余的毫秒数
          // let hours = Math.floor(leave1 / (3600 * 1000));
          // let leave2 = leave1 % (3600 * 1000);        // 计算小时数后剩余的毫秒数
          // let minutes = Math.floor(leave2 / (60 * 1000));
          // if (days) {
          //   this.detail.create_time = days + '天前';
          // } else if (hours) {
          //   this.detail.create_time = hours + '小时前';
          // } else if (minutes) {
          //   this.detail.create_time = minutes + '分钟前';
          // } else {
          //   this.detail.create_time = '0分钟前';
          // }
        }
      });
    },
    // 获取评论
    getComment() {
      let param = {
        post_id: this.id,
        PageIndex: '1',
        PageSize: '10'
      };
      ajax.post('/api/post/getPostReplyList', param).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          console.log(res);
          this.commentData = res.data.data;
          // for (let i = 0; i < this.commentData.length; i++) {
          //   this.commentData[i].create_time = this.commentData[i].create_time.slice(0, -3);
          // }
          for (let i = 0; i < this.commentData.length; i++) {
            this.commentData[i].create_time = new Date(this.commentData[i].create_time.replace(/-/g, '/'));
            let date = new Date();
            let datediff = date.getTime() - this.commentData[i].create_time.getTime();
            let days = Math.floor(datediff / (24 * 3600 * 1000));
            let leave1 = datediff % (24 * 3600 * 1000);    // 计算天数后剩余的毫秒数
            let hours = Math.floor(leave1 / (3600 * 1000));
            let leave2 = leave1 % (3600 * 1000);        // 计算小时数后剩余的毫秒数
            let minutes = Math.floor(leave2 / (60 * 1000));
            if (days) {
              this.commentData[i].timediff = days + '天前';
            } else if (hours) {
              this.commentData[i].timediff = hours + '小时前';
            } else if (minutes) {
              this.commentData[i].timediff = minutes + '分钟前';
            } else {
              this.commentData[i].timediff = '0分钟前';
            }
          }
        }
      });
    },
    // 检测手机终端
    checkMobileAgent() {
      let _this = this;
      let isAndroid = _this.isAndroid();
      if (isAndroid) {
        _this.appUrl = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.kmyy.intellpharmacy&fromcase=40003';
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
    down() {
      console.log(1);
      window.location.href = this.appUrl;
    }
  },
  created() {
    this.getData();
    this.getComment();
  },
  mounted() {
    this.checkMobileAgent();
  }
};
</script>

<style lang="less" scoped>
#share_cardDetail{
  overflow: hidden;
}
.content{
  margin-top: 60px;
  padding-bottom: 25px;
  .title{
    padding: 10px 20px 8px 15px;
    font-size: 24px;
    line-height: 28px;
  }
  .info{
    display: flex;
    height: 30px;
    align-items: center;
    padding-left: 15px;
    font-size: 12px;
    color: #666;
    .infoitem{
      padding: 0 5px;
      .icon{
        display: inline-block;
        width: 13px;
        height: 13px;
      }
      .dianzan{
        background: url('./img/xh_doctor_dz@2x.png') no-repeat;
        background-size: 100% 100%;
      }
      .shoucang{
        background: url('./img/xh_zxxq_sc@2x.png') no-repeat;
        background-size: 100% 100%;
      }
      .zhuanfa{
        background: url('./img/xh_zxxq_fx@2x.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .author{
    display: flex;
    padding-left: 15px;
    align-items: center;
    // padding-top: 7px;
    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .name_time{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 10px;
      span{
        font-size: 13px;
        color: #333;
        &:nth-child(2) {
          font-size: 11px;
          color: #999;
        }
      }
    }
  }
  .swiper{
    // height: 375px;
    width: 100%;
    // .img-box{
      // height: 100%;
      img{
        // height: 100%;
        display: block;
        width: 100%;
      }
    // }
  }
  .body{
    padding: 25px 25px 25px 15px;
    font-size: 16px;
    line-height: 22px;
    text-align: justify;
  }
  .topic{
    padding: 0 15px;
    font-size: 14px;
    color: #0ccdd3;
    overflow: hidden;
    // display: flex;
    .topic_item{
      float: left;
      margin-right: 15px;
    }
  }
  .opinion_wrap{
    padding: 10px;
    .opinion{
      width: 100%;
      height: 115px;
      box-shadow: 1px 1px 13px 0px rgba(51, 51, 51, 0.27);
      border-radius: 5px;
      .title{
        display: flex;
        justify-content: space-between;
        padding: 5px;
        height: 40px;
        align-items: center;
        .title_left{
          font-size: 16px;
          position: relative;
          width: 100px;
          display: flex;
          height: 100%;
          align-items: center;
          .icon{
            display: block;
            width: 42px;
            height: 15px;
            background: url('./img/pla_icon_daifja@2x.png') no-repeat;
            background-size: 100% 100%;
          }
          span{
            position: absolute;
            left: 20px;
            bottom: 6px;
          }
        }
        .title_right{
          font-size: 12px;
          color: #888;
        }
      }
      .decrtion{
        display: flex;
        justify-content: space-around;
        height: 70px;
        padding-top: 5px;
        .decttion_item{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          color: #31ab20;
          img{
            width: 24px;
            height: 30px;
          }
          &:nth-child(2) {
            color: #5386fa;
          }
          &:nth-child(3) {
            color: #f64638;
          }
        }
      }
    }
  }
}
.lien{
  width: 100%;
  height: 10px;
  background: #f5f5f5;
}
.comment{
  padding: 30px 14px 13px;
  .title{
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 24px;
    i{
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url('./img/pla_icon_pinla@2x.png') no-repeat;
      background-size: 100% 100%;
      margin-right: 6px;
    }
  }
  .comment_item{
    display: flex;
    margin-bottom: 10px;
    .photo{
      width: 38px;
      height: 38px;
      margin-right: 13px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .comment_content{
      flex: 1;
      .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #0ccdd3;
        margin-bottom: 6px;
        font-size: 13px;
        .top_right{
          color: #999;
          display: flex;
          align-items: center;
          i{
            display: inline-block;
            width: 15px;
            height: 15px;
            margin-right: 6px;
            background: url('./img/xh_doctor_dz@2x.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .center{
        font-size: 14px;
        text-align: justify;
        isplay: -webkit-box; //必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。//必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
        text-overflow: ellipsis; //可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 6px;
      }
      .bottom{
        display: flex;
        align-items: center;
        .reply{
          width: 46px;
          height: 20px;
          background-color: #f5f5f5;
          border-radius: 10px;
          font-size: 10px;
          text-align: center;
          line-height: 20px;
          margin-left: 10px;
        }
        .dot{
          margin-left: 10px;
          width: 3px;
          height: 3px;
          background-color: #333333;
          display: block;
          border-radius: 50%;
        }
      }
    }
  }
}
.btn{
  text-align: center;
  button{
    padding: 5px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
  }
}
.nocomment{
  text-align: center;
  padding-bottom: 15px;
}
</style>

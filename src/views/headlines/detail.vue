<template>
  <div class="page" :class="{ noPadding: isFromApp }">
      <mt-header fixed title="健康头条" v-show="!isFromApp">
        <a href="javascript:void(0);" @click="$router.go(-1);" slot="left">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    <div class="news-title">
      {{ detailData.title }}
    </div>
    <div class="news-subtitle" v-if="detailData">
      <span class="source">{{ detailData.source_name }}</span>
      <span class="reads">阅读量 {{ detailData.reading_quantity }}</span>
      <span class="time">{{ detailData.release_time }}</span>
    </div>
    <div class="news-article headline-news-article" :class="{ 'padding-min': isFromApp }" v-html="detailData.body"></div>
    <!--<div class="news-footer" v-show="!isFromApp">-->
      <!--<input type="text" class="input-comment" v-model="comment" placeholder="评论...">-->
      <!--<img src="./img/ic-xpl@2x.png" alt="" class="pencil">-->
      <!--<mt-button class="comment-btn" type="primary" @click="toComment">提交</mt-button>-->
    <!--</div>-->
    <img src="./img/pla_loading.gif" alt="" class="loading" v-show="isShowLoading">
  </div>
</template>

<script>

import ajax from '@/utils/ajax';
import { Button, Toast } from 'mint-ui';
import { getQueryString } from '@/utils/index';
import { goLogin } from '@/api/user';
export default {
  data() {
    return {
      detailData: '', // 资讯内容
      comment: '', // 评论内容
      infoId: '', // 当前资讯ID
      isFromApp: false, // 是否app访问
      isShowLoading: true
    };
  },
  components: {
    'mt-button': Button
  },
  methods: {
    // 获取url参数
    getUrlParmas() {
      this.isFromApp = getQueryString('from') === 'app';
    },
    // 获取资讯详情
    getListDetil() {
      let getId = getQueryString('id'); // 资讯ID
      this.infoId = getId;
      getId = getId.toString();
      // Indicator.open({
      //   text: 'Loading...',
      //   spinnerType: 'fading-circle'
      // });
      ajax.get('/api/news/GetNewsDetail', {
        params: {
          id: getId
        }
      }).then(resp => {
        // Indicator.close();
        this.isShowLoading = false;
        let resultData = resp.data;
        if (resp.status === 200 && String(resultData.code) === '0') {
          let _data = resultData.data;
          if (_data) {
            this.detailData = _data;
          } else {
            this.$router.push({ path: '/error/pageNoFound' });
          }
        }
        else {
          this.$router.push({ path: '/error/pageNoFound' });
        }
      });
    },
    // 更新阅读量
    updateReadingQuantity() {
      let getId = getQueryString('id'); // 资讯ID
      getId = getId.toString();
      ajax.get('/api/news/UpdateReadingQuantity', {
        params: {
          id: getId
        }
      });
    },
    // 评论
    toComment() {
      let commentText = this.comment;
      commentText = commentText.replace(/(^\s*)|(\s*$)/g, ''); // 去除字符串两边的空格
      if (commentText.length === 0) {
        Toast('评论内容不能为空！');
        return false;
      }
      ajax.post('/api/news/CommentNews', {
        related_id: this.infoId,
        comment: commentText,
        pic_url: ''
      }).then(resp => {
        let resultData = resp.data;
        if (resp.status === 200 && String(resultData.code) === '0') {
          this.comment = '';
          Toast('评论成功！');
        } else if (String(resultData.code) === '-2') {
          // 用户验证失败
          Toast('请先登录！');
          goLogin();
        } else {
          Toast(resp.data.message);
        }
      }).catch(() => {
        Toast('评论失败，请重新评论！');
      });
    }
  },
  mounted() {
    // 获取资讯详情
    this.getListDetil();
    // 更新阅读量
    this.updateReadingQuantity();
    // 获取url参数
    this.getUrlParmas();
  }
};

</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
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
  padding-top: 44px;
  &.noPadding {
    padding-top: 0;
  }
}
.news-title {
  font-size: 21px;
  color: #333;
  text-align: left;
  padding: 15px 24px 15px 10px;
  line-height: 1.2;
  background: #fff;
}

.news-subtitle {
  font-size: 13px;
  color: #666;
  .border-1px(#e0e0e0);
  padding-left: 10px;
  padding-bottom: 13px;
  background: #fff;
  .reads {
    padding: 0 10px 0 10px;
  }
  .time {
    padding: 0;
  }
}

.news-article {
  font-family: PingFang-SC-Regular;
  font-size: 18px;
  color: #333;
  /*padding: 15px 15px 60px 15px;*/
  padding: 15px;
  line-height: 1.8em;
  background: #fff;
  &.padding-min {
    padding: 15px;
  }
  /deep/ video {
    width: 100%;
  }
}

.news-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 15px;
  border-top: solid 1px #eee;
  .input-comment {
    border: 1px solid #e0e0e0;
    height: 30px;
    border-radius: 15px;
    width: 81%;
    font-size: 13px;
    padding: 0 15px 0 35px;
    color: #333;
    outline: none;
    -webkit-appearance: none;
  }
  .pencil {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 30px;
    top: 50%;
    margin-top: -7px;
  }
  .comment-btn {
    position: absolute;
    right: 15px;
    top: 50%;
    margin-top: -15px;
    font-size: 14px;
    height: 30px;
  }
}

</style>

<style lang="less">
  .headline-news-article {
    p {
      text-align: justify;
    }
    img {
      max-width: 100%!important;
    }
  }
</style>

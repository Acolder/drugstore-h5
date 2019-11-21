<template>
<div class="container">
  <div class="tab">
    <span :class="{active:activeId===0}" @click="tabChange(0)">膏方概述</span>
    <span :class="{active:activeId===1}" @click="tabChange(1)">加工工艺</span>
  </div>
  <!--膏方概述-->
  <div v-html="resultData.symptom" class="intro" v-show="activeId===0"></div>
  <!--加工工艺-->
  <div v-html="resultData.introduction" class="intro" v-show="activeId===1"></div>
  <!--暂无数据-->
  <div class="no-data" v-show="!resultData.symptom && activeId===0">暂无数据</div>
  <div class="no-data" v-show="!resultData.introduction && activeId===1">暂无数据</div>
  <div class="ask-cover">
    <p class="ask-button" @click="goAskDoctor">咨询医生</p>
  </div>
</div>
</template>

<script>
import docAjax from '@/utils/doctorAjax';
import { getQueryString } from '@/utils/index';
import { intoInquiry } from '@/api/user';
export default {
  name: 'prescribeDetail',
  data() {
    return {
      resultData: [], // 获取结果
      activeId: 0, // 当前显示id
    };
  },
  mounted() {
    // 获取参数
    this.getUrlParams();
    // 获取详情
    this.getDetail();
  },
  methods: {
    // 获取参数
    getUrlParams() {
      let _this = this;
      _this.isFromApp = getQueryString('from') === 'app';
    },
    // 获取详情
    getDetail() {
      let _this = this;
      let detailId = _this.$route.query.id; // 膏方id
      docAjax.get('/api/order/GetPasteFixedInfo', {
        params: {
          id: detailId
        }
      }).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          _this.resultData = resp.data.data;
          document.title = resp.data.data.name;
        }
      });
    },
    // 切换tab
    tabChange(id) {
      this.activeId = id;
    },
    // 在线问医
    goAskDoctor() {
      let _this = this;
      if (_this.isFromApp) {
        /* eslint-disable */
        HealthBAT.toChineseConsult();
      } else {
        intoInquiry();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 3rem 0 3.5rem;
  .tab {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    display: flex;
    background: #fff;
    z-index: 9;
    span {
      flex: 1;
      font-size: 1rem;
      text-align: center;
      &.active {
        color: #d35638;
        border-bottom: solid 1px #d35638;
      }
    }
  }
  /deep/.intro {
    padding: 0 0.8rem;
    img {
      max-width: 100%!important;
    }
    p {
      margin: 0.3rem 0;
    }
  }
  .no-data {
    margin-top: 20%;
    color: #666;
    font-size: 0.9rem;
    text-align: center;
  }
  .ask-cover {
    position: fixed;
    bottom: -50px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    color: #fff;
    background: #fff;
    padding-bottom: 50px;
    z-index: 2000;
    .ask-button {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      background: #7c6b4f;
    }
  }
}
</style>

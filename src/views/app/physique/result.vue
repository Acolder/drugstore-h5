<template>
  <!--测试结果-->
  <div class="test-result" :class="{'PC-result':isPC}">
    <div class="result-title" @click="readRecord">
      <p v-html="testResultTitle"></p>
      <em v-if="hasId && !isCheck"></em>
    </div>
    <div class="result-img">
      <img :src="testResultImg" />
    </div>
    <div class="info protectBtn" @click="protectSuggestion" v-show="!isCheck">仙子守护方案</div>
    <div class="info protectBtn" v-show="isCheck" @click="readRecord">测评记录</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { setToken, getToken } from '@/utils/auth';
import { goLogin } from '@/api/user';
import { getQueryString } from '@/utils/index';
export default {
  name: 'result',
  data() {
    return {
      physiqueName: null, // 测试结果体质名称
      recordId: null, // 查看记录id
      hasId: false, // 是否有查看历史记录id
      testResultTitle: '',
      testResultImg: '',
      isFromApp: false, // 是否app端打开
      fromWhere: 'else', // 是否app端打开
      isCheck: false, // 是否医生端查看
      isPC: false, // 是否PC端查看
      /* 测试结果 */
      result: [
        '通过测试您的体质倾向于<span style="color: #f16e36;">阳虚质</span>',
        '通过测试您的体质倾向于<span style="color: #f16e36;">阴虚质</span>',
        '通过测试您的体质倾向于<span style="color: #f16e36;">气虚质</span>',
        '通过测试您的体质倾向于<span style="color: #f16e36;">痰湿质</span>',
        '通过测试您的体质倾向于<span style="color: #f16e36;">湿热质</span>',
        '通过测试您的体质倾向于<span style="color: #f16e36;">血瘀质</span>',
        '通过测试您的体质倾向于<span style="color: #f16e36;">特禀质</span>',
        '通过测试您的体质倾向于<span style="color: #f16e36;">气郁质</span>',
        '通过测试您的体质倾向于<span style="color: #f16e36;">平和质</span>'
      ],
    };
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
    // 获取参数
    this.getUrlParmas();
  },
  methods: {
    // 获取参数
    /* eslint-disable */
    getUrlParmas() {
      let _this = this;
      let physique_name = getQueryString('physiqueName');
      _this.physiqueName = physique_name;
      /* 阳虚质--阴虚质--气虚质--痰湿质--湿热质--血瘀质--特禀质--气郁质--平和质 */
      if (physique_name) {
        let num = null;
        switch (physique_name) {
          case '阳虚质':
            num = 0;
            break;
          case '阴虚质':
            num = 1;
            break;
          case '气虚质':
            num = 2;
            break;
          case '痰湿质':
            num = 3;
            break;
          case '湿热质':
            num = 4;
            break;
          case '血瘀质':
            num = 5;
            break;
          case '特禀质':
            num = 6;
            break;
          case '气郁质':
            num = 7;
            break;
          case '平和质':
            num = 8;
            break;
        }
        _this.resultNum = num;
        _this.testResultTitle = _this.result[num];
        _this.testResultImg = require(`./img/test-result/${num}.png`);
      }

      _this.isFromApp = getQueryString('from') === 'app';
      let appToken = getQueryString('token');
      let record_id = getQueryString('id');
      let isFromPhysique = getQueryString('fromPhysique') === '1';
      _this.isCheck = getQueryString('check') === '1';
      _this.isPC = getQueryString('isPC') === '1';
      // console.log('isFromTest:' + isFromPhysique);
      if (record_id) {
        _this.recordId = record_id;
        _this.hasId = true;
      }
      if (_this.isFromApp) {
        _this.fromWhere = 'app';
      }
      if (_this.isFromApp && !isFromPhysique) {
        if (appToken && appToken !== '') {
          setToken(appToken);
        } else if (!appToken) {
          Toast('用户未登录，请先登录');
          /* eslint-disable */
          HealthBAT.toLogin();
        }
      } else if (!_this.isFromApp && !isFromPhysique && !_this.isCheck) {
        let token = getToken();
        if (!token) {
          Toast('用户未登录，请先登录');
          goLogin();
        }
      }
    },
    // 查看记录
    readRecord() {
      let _this = this;
      if (!_this.hasId) {
        return false;
      }
      let record_id = _this.recordId; // 5b9a03b72cbe2943d6387ccd
      _this.$router.push({
        path: '/physique/record', query: { recordId: record_id, isPC: _this.isPC ? 1 : 0 }
      });
    },
    // 守护方案
    protectSuggestion() {
      let _this = this;
      let physique_name = _this.physiqueName;
      let record_id = _this.recordId;
      _this.$router.push({
        path: '/physique/suggest', query: { physiqueName: physique_name, from: _this.fromWhere, recordId: record_id }
      });
    }
  }
};
</script>

<style lang="less" scoped>
  @import './../../../styles/mixin.less';
  .test-result {
    width: 100%;
    min-height: 100%;
    background: url("./img/bg2.jpg") bottom center repeat;
    background-size: cover;
    background-attachment: fixed;
    padding-top: 2rem;
    &.PC-result {
      width: 800px;
      margin: 0 auto;
    }
    .result-title {
      position: relative;
      margin: 0 1rem;
      p {
        padding: 0.5rem 1rem;
        background: #7c6b4f;
        border-bottom: solid 0.2rem #392e18;
        font-size: 1rem;
        color: #fff;
      }
      span {
        color: #f16e36;
      }
      em {
        position: absolute;
        top: 0.8rem;
        right: 0.8rem;
        .turn-icon(#fff,0.6rem,-135deg);
      }
    }
    .result-img {
      margin: 2rem 0;
      text-align: center;
      img {
        width: 15.5rem;
      }
    }
    .protectBtn {
      margin: 1rem auto;
      width: 9.7rem;
      height: 3.5rem;
      background: url("./img/btnBg.png") center center no-repeat;
      background-size: 100% 100%;
      color: #fff;
      text-align: center;
      line-height: 3.5rem;
      font-size: 1.2rem;
    }
  }
</style>

<template>
  <div class="container">
    <div class="defaultBg" :style="{height: backgroundHeight}" :class="{'PC-default': isPC}"></div>
    <!--题目--><!-- :class="{on: quesSubmit}"-->
    <div id="question" class="question" :class="{'PC-question': isPC}">
      <div class="question-cover">
        <ul id="questionList" class="question-list record">
          <li v-for="(ques, index) in result" :key="index" :id="'liForInputParent' + index" class="on">
            <div class="title" :id="'question'+index">
              {{ index+1 }}.<i v-html="ques.question"></i>
            </div>
            <p>
              <input type="radio" :name="'ans' + index" :id="'radio' + index + '1'" :checked="ques.answer === '没有'" disabled="disabled" />
              <label :for="'radio' + index + '1'">没有</label>
            </p>
            <p>
              <input type="radio" :name="'ans' + index" :id="'radio' + index + '2'" :checked="ques.answer === '很少'" disabled="disabled" />
              <label :for="'radio' + index + '2'">很少</label>
            </p>
            <p>
              <input type="radio" :name="'ans' + index" :id="'radio' + index + '3'" :checked="ques.answer === '有时'" disabled="disabled" />
              <label :for="'radio' + index + '3'">有时</label>
            </p>
            <p>
              <input type="radio" :name="'ans' + index" :id="'radio' + index + '4'" :checked="ques.answer === '经常'" disabled="disabled" />
              <label :for="'radio' + index + '4'">经常</label>
            </p>
            <p>
              <input type="radio" :name="'ans' + index" :id="'radio' + index + '5'" :checked="ques.answer === '总是'" disabled="disabled" />
              <label :for="'radio' + index + '5'">总是</label>
            </p>
          </li>
          <div id="quesMargin" class="ques-margin on" :style="'height: 50px'"></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax';
import { Toast } from 'mint-ui';
export default {
  name: 'record',
  data() {
    return {
      result: [], // 存放结果
      backgroundHeight: '100%', // 背景图片高度
      isPC: false // 是否PC端查看
    };
  },
  created() {
    document.title = '中医体质测试';
  },
  mounted() {
    // 获取测试结果
    this.getResult();
    // 检测手机型号
    this.checkMobileAgent();
  },
  methods: {
    // 是否iPhone X
    isIPhoneX() {
      return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375);
    },
    // 检查手机型号
    checkMobileAgent() {
      let _this = this;
      let iPhoneX = _this.isIPhoneX();
      if (iPhoneX) {
        _this.backgroundHeight = 'calc(100% + 50px)';
      }
    },
    // 获取测试结果
    getResult() {
      let _this = this;
      let record_id = _this.$route.query.recordId;
      _this.isPC = Number(_this.$route.query.isPC) === 1;
      ajax.get(`/api/user/getPhysiqueResult/${record_id}`).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.code === 0) {
          _this.result = resp.data.data.results;
        } else {
          Toast(resp.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .container {
    font-family: "SimHei";
    input[type="radio"],
    input[type="checkbox"] {
      display: none;
    }
    input[type="radio"] + label::before,
    input[type="checkbox"] + label::before {
      content: "\a0"; /*不换行空格*/
      display: inline-block;
      vertical-align: middle;
      width: 1em;
      height: 1em;
      margin-right: .4em;
      border-radius: 50%;
      border: solid 1px #9a9c9b;
      background: -webkit-linear-gradient(left top, #ffffff , #aeaeae);
      background: -o-linear-gradient(left top, #ffffff , #aeaeae);
      background: -moz-linear-gradient(left top, #ffffff , #aeaeae);
      background: linear-gradient(left top, #ffffff , #aeaeae);
      font-size: 1rem;
      line-height: 1;
    }
    input[type="radio"]:checked + label::before,
    input[type="checkbox"]:checked + label::before {
      background: #7d7d7d;
      background-clip: content-box;
      width: .6em;
      height: .6em;
      padding: .2em;
    }

    .defaultBg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      /*height: 100%;*/
      background: url("./img/bg2.jpg") bottom center no-repeat;
      background-size: 100% 100%;
      z-index: 1;
      &.PC-default {
        width: 800px;
        left: 50%;
        margin-left: -400px;
      }
    }
    .question {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      &.PC-question {
        width: 800px;
        left: 50%;
        margin-left: -400px;
      }
      .question-cover {
        width: 100%;
        height: 100%;
      }
      .question-list {
        padding: 2rem 1rem 1rem;
        position: relative;
        overflow: auto;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-box-flex: 1;
        box-flex: 1;
        -webkit-overflow-scrolling: touch;
        &.on {
          padding-bottom: 5rem;
        }
        li {
          margin: 1rem 0;
          &.on {
            .title {
              background: url("./img/subject-on.png") center center no-repeat;
              background-size: 100% 100%;
              padding-bottom: 0.8rem;
            }
            p {
              display: block;
            }
          }
        }
        .title {
          background: url("./img/subject.png") center center no-repeat;
          background-size: 100% 100%;
          color: #fff;
          font-size: 1rem;
          padding: 0.6rem 1rem;
          line-height: 1.5;
          span {
            /*color: #f54711;*/
          }
        }
        p {
          margin: 1rem 0;
          font-size: 1rem;
          display: none;
        }
        label {
          vertical-align: middle;
        }
        &.record {
          label {
            color: #999;
          }
          input:checked + label {
            color: #000;
          }
        }
      }
      .ques-margin {
        display: none;
        &.on {
          display: block;
        }
      }
      .ques-submit {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        margin-left: -4.5rem;
        width: 9rem;
        height: 3rem;
        background: url("./img/submitBtn.png") center center no-repeat;
        background-size: 100% 100%;
        z-index: 9;
        display: none;
        &.on {
          display: block;
        }
      }
    }
  }
</style>

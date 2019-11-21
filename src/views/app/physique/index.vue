<template>
  <div class="container">
    <div class="defaultBg" :style="{height: backgroundHeight}" v-show="defaultBgFlag"></div>
    <div class="index" v-show="index">
      <div class="info text1-1"><img src="./img/index/1.png"/></div>
      <div class="info text1-2"><img src="./img/index/2.png"/></div>
      <div class="info text1-3"><img src="./img/index/3.png"/></div>
      <div class="info text1-4"><img src="./img/index/4.png"/></div>
      <div class="info gotoBtn" @click="goTest"></div>
    </div>
    <!--选择性别-->
    <div class="choose-sex" v-show="chooseSexFlag">
      <div class="info text2-1" @click="chooseSex(1)"></div>
      <div class="info text2-2"><img src="./img/sex-tips.png"/></div>
      <div class="info text2-3" @click="chooseSex(0)"></div>
    </div>
    <!--年龄-->
    <div class="choose-age" v-show="chooseAgeFlag">
      <p class="age-tips">请选择您的年龄阶段</p>
      <ul id="age-list" class="age-list">
        <li @click="chooseAge">0-25</li>
        <li @click="chooseAge">26-40</li>
        <li @click="chooseAge">41-55</li>
        <li @click="chooseAge">56-70</li>
        <li @click="chooseAge">70以上</li>
      </ul>
    </div>
    <!--选择版本-->
    <div class="choose-version" v-show="chooseVersionFlag">
      <div class="info text3-1" @click="comVersionFun"></div>
      <div class="info text3-2"><img src="./img/version-tips.png"/></div>
      <div class="info text3-3" @click="simVersionFun"></div>
    </div>
    <!--如何判断答案-->
    <div class="judge-tips" v-show="judgeTipsFlag">
      <div class="judge-text">
        <div class="info judge-title"><img src="./img/tips-text.png"/></div>
        <p><span>没有：</span>最近三个月似乎从来没有出现过</p>
        <p><span>很少：</span>好像有，不过很久没有发生过了，或好像是偶然的事情，没有怎么放在心上</p>
        <p><span>有时：</span>不定时出现，好像也没有什么规律，但觉得有点担心</p>
        <p><span>经常：</span>是的，有这方面问题，而且好像已经形成一定规律了</p>
        <p><span>总是：</span>是的，这是最近三个月一直困扰我的问题</p>
      </div>
      <div class="info beginBtn" @click="beginTest"></div>
    </div>
    <!--简单版-->
    <div class="sim-version" v-show="simVersionFlag">
      <ul class="simversion-list">
        <li>
          <div class="title">下列哪些体征最符合您现在的状态？（请选择1-3项）</div>
          <p v-for="sim in simVersion" :key="sim.id" @click="checkedFun(sim.id)">
            <input type="checkbox" name="sim1" :id="getSimVersionId(sim.id)" :value="sim.id" v-model="simVersionCheck" :disabled="simCheckUpperLimit && !simVersionCheck.includes(sim.id)">
            <label :for="getSimVersionId(sim.id)">{{ sim.text }}</label>
          </p>
        </li>
      </ul>
      <div class="next-version">
        <div class="info nextBtn" @click="nextPage"></div>
      </div>
    </div>
    <!--题目--><!-- :class="{on: quesSubmit}"-->
    <div id="question" class="question" v-show="questionFlag">
      <div class="question-cover">
        <ul id="questionList" class="question-list">
          <li v-for="(ques, index) in lastShowQuestion" :key="index" :id="'liForInputParent' + index" :class="{on: index === 0}">
            <div class="title" :id="'question'+index">
              {{ index+1 }}/{{ questionTotal }}.<i v-html="ques.question[1]"></i>
            </div>
            <p>
              <input type="radio" :name="'ans' + index" :id="'radio' + index + '1'" @click="answerFun(index, ques.outerId, ques.innerId, Math.abs(ques.question[0]-4), ques.question[1], '没有')" />
              <label :for="'radio' + index + '1'">没有</label>
            </p>
            <p>
              <input type="radio" :name="'ans' + index" :id="'radio' + index + '2'" @click="answerFun(index, ques.outerId, ques.innerId, Math.abs(ques.question[0]-3), ques.question[1], '很少')" />
              <label :for="'radio' + index + '2'">很少</label>
            </p>
            <p>
              <input type="radio" :name="'ans' + index" :id="'radio' + index + '3'" @click="answerFun(index, ques.outerId, ques.innerId, Math.abs(ques.question[0]-2), ques.question[1], '有时')" />
              <label :for="'radio' + index + '3'">有时</label>
            </p>
            <p>
              <input type="radio" :name="'ans' + index" :id="'radio' + index + '4'" @click="answerFun(index, ques.outerId, ques.innerId, Math.abs(ques.question[0]-1), ques.question[1], '经常')" />
              <label :for="'radio' + index + '4'">经常</label>
            </p>
            <p>
              <input type="radio" :name="'ans' + index" :id="'radio' + index + '5'" @click="answerFun(index, ques.outerId, ques.innerId, Math.abs(ques.question[0]-0), ques.question[1], '总是')" />
              <label :for="'radio' + index + '5'">总是</label>
            </p>
          </li>
          <div id="quesMargin" class="ques-margin" :style="{height: quesMargin + 'px'}"></div>
          <div id="quesSubmit" class="ques-submit" @click="questionSubmit"></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax';
import { Toast, Indicator } from 'mint-ui';
import { calculateScore } from './common/score';
import { question } from './common/data';
import { setToken, getToken, removeToken } from '@/utils/auth';
import { goLogin } from '@/api/user';
import { getQueryString } from '@/utils/index';
export default {
  name: 'physique',
  data() {
    return {
      index: true,
      chooseSexFlag: false,
      chooseAgeFlag: false,
      chooseVersionFlag: false,
      judgeTipsFlag: false,
      simVersionFlag: false,
      questionFlag: false,
      testResultFlag: false,
      shareTipsFlag: false,
      defaultBgFlag: false,
      documentFontSize: 14,
      quesMargin: 0,
      testResultTitle: '',
      testResultImg: '',
      testResultNum: 0, // 测试结果索引
      versionType: 0, // 0 简单版，1 复杂版
      simVersionCheck: [], // 简单版状态选择
      simCheckUpperLimit: false, // 简单版超过最大选择数量
      genderType: 0, // 选择的性别
      questionTotal: 0, // 题目总数量
      quesSubmit: false, // 题目提交按钮
      // scorellToHeight: 0, // 页面滚动距离
      versionQuestion: [], // 选择要展示的题目
      lastShowQuestion: [], // 最终展示的题目
      comScore: [], // 保存答案
      simVersion: [
        { id: 8, text: '精力充沛、健康乐观' },
        { id: 0, text: '手脚冰凉、身体怕冷' },
        { id: 1, text: '手心发热、急躁火旺' },
        { id: 3, text: '身体肥胖、大腹便便' },
        { id: 4, text: '面色油腻、长痘长疮' },
        { id: 7, text: '多愁善感、闷闷不乐' },
        { id: 2, text: '气短少力、容易疲乏' },
        { id: 5, text: '面色晦暗、脸上长斑' },
        { id: 6, text: '容易过敏、喷嚏流泪' }
      ],
      // 守护方案
      protect: [
        { physiqueName: '阳虚质', protectName: '天山雪莲' },
        { physiqueName: '阴虚质', protectName: '石斛' },
        { physiqueName: '气虚质', protectName: '人参' },
        { physiqueName: '痰湿质', protectName: '茯苓' },
        { physiqueName: '湿热质', protectName: '苁蓉' },
        { physiqueName: '血瘀质', protectName: '首乌' },
        { physiqueName: '特禀质', protectName: '冬虫夏草' },
        { physiqueName: '气郁质', protectName: '海底珍珠' },
        { physiqueName: '平和质', protectName: '野灵芝' }
      ],
      // 测试结果
      result: [], // 格式 [{ question: 'xxxxxxx', answer: 'xx'}]
      isFromApp: false, // 是否app端打开
      isFromH5: false, // 是否h5端打开
      fromWhere: 'else', // 是否app端打开
      committing: false, // 是否提交中
      backgroundHeight: '100%' // 背景图片高度
    };
  },
  created() {
    let _this = this;
    document.title = '中医体质测试';
    // this.setFontSize();
    (function(doc, win) {
      let docEl = doc.documentElement;
      let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      let recalc = function() {
        let clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = (clientWidth >= 750 ? 30 : clientWidth / 750 * 31.5) + 'px';
        _this.documentFontSize = clientWidth >= 750 ? 30 : clientWidth / 750 * 31.5;
        _this.quesMargin = _this.documentFontSize * 5;
      };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  },
  mounted() {
    // 获取参数
    this.getUrlParmas();
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
    // 获取参数
    getUrlParmas() {
      let _this = this;
      _this.isFromApp = getQueryString('from') === 'app';
      _this.isFromH5 = getQueryString('from') === 'h5';
      let appToken = getQueryString('token');
      if (_this.isFromApp) {
        _this.fromWhere = 'app';
        if (appToken && appToken !== '') {
          setToken(appToken);
        } else if (!appToken) {
          removeToken();
          Toast('用户未登录，请先登录');
          /* eslint-disable */
          HealthBAT.toLogin();
        }
      } else if (_this.isFromH5) {
        let token = getToken();
        if (!token) {
          Toast('用户未登录，请先登录');
          // goLogin();
        }
      } else {
        // app旧版本
        _this.fromWhere = 'app';
        removeToken();
      }
    },
    // 进入测试页
    goTest() {
      this.index = false;
      this.chooseSexFlag = true;
    },
    // 选择性别
    chooseSex(type) {
      let _this = this;
      console.log(type);
      _this.genderType = type;
      // if (type === 1) {
      //   questions[4][5][1] = '您的阴囊部位潮湿吗？（限男性回答）';
      // }
      this.chooseSexFlag = false;
      this.chooseAgeFlag = true;
    },
    // 选择年龄
    chooseAge() {
      this.chooseAgeFlag = false;
      this.chooseVersionFlag = true;
    },
    // 选择复杂版
    comVersionFun() {
      let _this = this;
      _this.versionType = 1;
      _this.chooseVersionFlag = false;
      _this.judgeTipsFlag = true;
    },
    // 选择简单版
    simVersionFun() {
      let _this = this;
      _this.versionType = 0;
      _this.chooseVersionFlag = false;
      _this.judgeTipsFlag = true;
    },
    // 复杂版题目录入
    comVersion() {
      let _this = this;
      // let comQuestion = _this.question;
      let questions = question();
      let lastQues = [['-1', '您精力充沛吗？'],
        ['-1', ''], // 与16题重复
        ['-1', ''], // 与22题重复
        ['-1', ''], // 与53题重复
        ['-1', ''], // 与4题重复
        ['-1', '您能适应外界自然和社会环境的变化吗？'],
        ['-1', '您容易失眠吗？'],
        ['-1', ''] // 与44题重复
      ];
      questions[questions.length - 1] = lastQues;

      if (_this.genderType === 1) {
        questions[4][5][1] = '您的阴囊部位潮湿吗？（限男性回答）';
      }
      // for (let i = 0; i < questions.length; i++) {
      //   for (let j = 0; j < questions[i].length; j++) {
      //     _this.questionTotal += 1;
      //   }
      // }
      _this.versionQuestion = questions;
      // console.log(questions);
      // 转化题目的排版
      for (let k = 0; k < _this.versionQuestion.length; k++) {
        for (let m = 0; m < _this.versionQuestion[k].length; m++) {
          if (_this.versionQuestion[k][m][1] !== '') {
            _this.lastShowQuestion.push({
              outerId: k,
              innerId: m,
              question: _this.versionQuestion[k][m]
            });
            _this.questionTotal += 1;
          }
        }
      }
      _this.questionFlag = true;
      _this.defaultBgFlag = true;
      // console.log(_this.versionQuestion);
      // console.log(_this.lastShowQuestion);
    },
    // 开始测试
    beginTest() {
      let _this = this;
      _this.judgeTipsFlag = false;
      if (_this.versionType === 1) {
        _this.comVersion();
      } else {
        _this.simVersionFlag = true;
      }
    },
    // 返回自定义id
    getSimVersionId(index) {
      return 'sim0' + index;
    },
    // 检查CheckBox选中个数
    checkedFun(index) {
      let _this = this;
      if (_this.simCheckUpperLimit && _this.simVersionCheck.indexOf(index) < 0) {
        Toast('此题最多只能选择3项');
      }
    },
    // 进入答题页
    nextPage() {
      let _this = this;
      let simChecked = _this.simVersionCheck;
      if (simChecked.length === 0) {
        Toast('至少选择1项');
        return false;
      }
      let questions = question();
      if (_this.genderType === 1) {
        questions[4][5][1] = '您的阴囊部位潮湿吗？（限男性回答）';
      }
      // 标注
      // 对选项进行从小到大排序
      let arrayFlag = 1;
      for (let i = 0; i < simChecked.length && arrayFlag; i++) {
        arrayFlag = 0;
        for (let j = simChecked.length - 1; j > i; j--) {
          if(simChecked[j] < simChecked[j - 1]) {
            let temp = null;
            temp = simChecked[j];
            simChecked[j] = simChecked[j-1];
            simChecked[j-1] = temp;
            arrayFlag = 1;
          }
        }
      }

      for (let i = 0; i < simChecked.length; i++) {
        let tempIndex = simChecked[i];
        _this.versionQuestion.push(questions[tempIndex]);
        for (let j = 0; j < questions[tempIndex].length; j++) {
          _this.questionTotal += 1;
        }
      }
      _this.simVersionFlag = false;
      // 转化题目的排版
      for (let k = 0; k < _this.versionQuestion.length; k++) {
        for (let m = 0; m < _this.versionQuestion[k].length; m++) {
          _this.lastShowQuestion.push({
            outerId: simChecked[k],
            innerId: m,
            question: _this.versionQuestion[k][m]
          });
        }
      }
      _this.questionFlag = true;
      _this.defaultBgFlag = true;
      // console.log(_this.versionQuestion);
      // console.log(_this.lastShowQuestion);
    },
    // 保存答案
    /*
     * presentIndex:当前题目索引
     * nextQues:下一题
     * type:体质类型
     * index:当前体质类型当前选项索引
     * score:得分
     * title:题目
     * answer:答案
     */
    /* eslint-disable */
    answerFun(presentIndex, type, index, score, title, answers) {
      // console.log(presentIndex, type, index, score, title, answers);
      let _this = this;
      _this.result[presentIndex] = { question: title, answer: answers }; // 保存答案
      // console.log(_this.comScore);
      if (_this.comScore[type] == null) {
        _this.comScore[type] = [];
      }
      let nextFlag = _this.comScore[type][index]; // 是否点击已选过的题目
      _this.comScore[type][index] = score;
      let nextQues = null; // 下一题索引
      let nextNode = null; // 获取下一题
      let presentNum = presentIndex;
      let scorellHeight = 0;
      let scorellTotalHeight = 0; // 滚动总距离
      let scaleSize = _this.documentFontSize;
      let scorellBody = document.getElementById('questionList');
      let scorellContainer = document.getElementById('question');
      let presentNode = document.getElementById('liForInputParent' + presentNum);
      let offsetY = document.documentElement.scrollTop || document.body.scrollTop;
      let bodyClientHeight = scorellContainer.clientHeight || scorellContainer.offsetHeight;
      // 是否点击最后一题
      let isLastQues = _this.questionTotal === (presentIndex + 1);
      // console.log('isLastQues: ' + isLastQues);

      if (presentIndex < _this.questionTotal && !nextFlag) {
        // 还有下一题的情况下
        nextQues = presentIndex + 1;
        nextNode = document.getElementById('liForInputParent' + nextQues);
      } else if (presentIndex < _this.questionTotal && nextFlag) {
        // 还有下一题，但点击已选过的题目
        nextQues = presentNum;
        nextNode = document.getElementById('liForInputParent' + nextQues);
      } else if (presentIndex === _this.questionTotal) {
        // 最后一题
      }

      if (nextNode) {
        // 还有下一题的情况下
        nextNode.className = 'on';
        if (presentNode.clientHeight) {
          scorellHeight = presentNode.clientHeight + scaleSize;
        } else if (presentNode.offsetHeight) {
          scorellHeight = presentNode.offsetHeight + scaleSize;
        } else {
          scorellHeight = presentNode.scrollHeight + scaleSize;
        }
        // scorellTotalHeight = scorellBody.scrollTop + scorellHeight;
        scorellTotalHeight = offsetY + scorellHeight;
      } else {
        // 最后一题
        if (_this.quesSubmit) {
          if (isLastQues) {
            let scrollBodyHeight = scorellBody.scrollHeight || scorellBody.clientHeight || scorellBody.offsetHeight;
            if ((offsetY + bodyClientHeight) < scrollBodyHeight) {
              scorellHeight = scrollBodyHeight - offsetY - bodyClientHeight;
            } else {
              scorellHeight = 0;
            }
          } else {
            if (presentNode.clientHeight) {
              scorellHeight = presentNode.clientHeight + scaleSize;
            } else if (presentNode.offsetHeight) {
              scorellHeight = presentNode.offsetHeight + scaleSize;
            } else {
              scorellHeight = presentNode.scrollHeight + scaleSize;
            }
          }
        } else {
          if (isLastQues) {
            _this.quesSubmit = true;
            scorellHeight = scaleSize * 5;
            document.getElementById('quesMargin').className += ' on';
            document.getElementById('quesSubmit').className += ' on';
          } else {
            if (presentNode.clientHeight) {
              scorellHeight = presentNode.clientHeight + scaleSize;
            } else if (presentNode.offsetHeight) {
              scorellHeight = presentNode.offsetHeight + scaleSize;
            } else {
              scorellHeight = presentNode.scrollHeight + scaleSize;
            }
          }
        }
        // scorellTotalHeight = scorellBody.scrollTop + scorellHeight;
        scorellTotalHeight = offsetY + scorellHeight;
      }
      let scorellBodyHeight = scorellBody.scrollHeight || scorellBody.clientHeight || scorellBody.offsetHeight;
      if (_this.quesSubmit) {
        // scorellBodyHeight = scorellBodyHeight + Math.floor(scaleSize) * 3;
        // scorellTotalHeight = offsetY + (scaleSize * 5);
      }

      setTimeout(() => {
        let scrollStep = scorellHeight / 30;
        let scrollInterval = setInterval(() => {
          let presentScrollY = document.documentElement.scrollTop || document.body.scrollTop;
          // console.log('初始scrollY: ' + presentScrollY);
          if (presentScrollY < scorellTotalHeight && presentScrollY + bodyClientHeight < scorellBodyHeight) {
            let culHeight = scorellTotalHeight - presentScrollY;
            scrollStep = scrollStep > culHeight ? (culHeight + 1) : scrollStep;
            // window.scrollBy(0, scrollStep);
            document.body.scrollTop += scrollStep;
            document.documentElement.scrollTop += scrollStep;
            // console.log('presentScrollY:' + document.documentElement.scrollTop);
          } else {
            clearInterval(scrollInterval);
          }
        }, 8);
      }, 200);
    },
    // 提交测试
    questionSubmit() {
      let _this = this;
      let last = question().length;
      if (_this.versionType === 1) {
        // 计算重复题目分数(两个相同内容题目，根据前者题目答案计算出后者题目答案)
        _this.comScore[last - 1][1] = Math.abs(-1 - (_this.comScore[2][0] - 1));
        _this.comScore[last - 1][2] = Math.abs(-1 - (_this.comScore[2][6] - 1));
        _this.comScore[last - 1][3] = Math.abs(-1 - (_this.comScore[7][0] - 1));
        _this.comScore[last - 1][4] = Math.abs(-1 - (_this.comScore[0][3] - 1));
        _this.comScore[last - 1][7] = Math.abs(-1 - (_this.comScore[5][5] - 1));
      }
      let scoreResult = calculateScore(_this.comScore, _this.versionType);
      console.log(scoreResult);
      if (scoreResult !== 'undefined') {
        console.log('测试结果为：' + scoreResult);
        // _this.testResultNum = scoreResult;
        let data = {
          PhysiqueName: _this.protect[scoreResult].physiqueName,
          Protectname: _this.protect[scoreResult].protectName,
          results: _this.result
        };
        let token = getToken();
        if (token) {
          Indicator.open();
          if (_this.committing) {
            return false;
          }
          _this.committing = true;
          // 保存体质测试结果
          ajax.post('/api/user/savePhysiqueResult', data).then(resp => {
            Indicator.close();
            _this.committing = false;
            console.log(resp);
            if (resp.status === 200 && resp.data.code === 0) {
              _this.questionFlag = false;
              _this.defaultBgFlag = false;
              _this.$router.push({
                path: '/physique/result', query: { physiqueName: _this.protect[scoreResult].physiqueName, from: _this.fromWhere, fromPhysique: '1', id: resp.data.data }
              });
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
        } else {
          _this.$router.push({
            path: '/physique/result', query: { physiqueName: _this.protect[scoreResult].physiqueName, from: _this.fromWhere, fromPhysique: '1' }
          });
        }
      }
    },
    // 保护方案
    protectSuggestion() {
      let _this = this;
      let resultNum = _this.testResultNum;
      _this.testResultFlag = false;
      switch (resultNum) {
        case 0:
          _this.yangFlag = true;
          break;
        case 1:
          _this.yinFlag = true;
          break;
        case 2:
          _this.qiFlag = true;
          break;
        case 3:
          _this.yanFlag = true;
          break;
        case 4:
          _this.shireFlag = true;
          break;
        case 5:
          _this.xueyuFlag = true;
          break;
        case 6:
          _this.tebingFlag = true;
          break;
        case 7:
          _this.qiyuFlag = true;
          break;
        case 8:
          _this.pingheFlag = true;
          break;
      }
    }
  },
  watch: {
    // 检查CheckBox选中个数
    simVersionCheck: function(newValue) {
      let _this = this;
      console.log(newValue.length);
      if (newValue.length === 3) {
        _this.simCheckUpperLimit = true;
      } else {
        _this.simCheckUpperLimit = false;
      }

      // let data = {
      //   physiqueName: '阳虚质', // 体质名称
      //   protectName: '天山雪莲' // 守护仙子
      //   // 答案
      //   result: [
      //     { question: '您手脚发凉吗？', answer: '没有' },
      //     { question: '您胃脘部、背部或腰膝部怕冷吗？', answer: '很少' },
      //     { question: '您感到怕冷、衣服比别人穿得多吗？', answer: '有时' },
      //   ]
      // }
    }
  },

};
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
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
    .info {
      img {
        width: 100%;
        height: auto;
      }
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
    }
    .index {
      width: 100%;
      height: 100%;
      background: url("./img/bg1.jpg") bottom center no-repeat;
      background-size: cover;
      .text1-1 {
        width: 23.5rem;
        margin: 0 auto;
        img {
          margin: 0.5rem 0 0 0.3rem;
        }
      }
      .text1-2 {
        width: 17.5rem;
        margin: 2rem auto 0;
      }
      .text1-3 {
        width: 14rem;
        margin: 1.5rem auto;
      }
      .text1-4 {
        width: 14.3rem;
        margin: 0 auto;
      }
      .gotoBtn {
        position: absolute;
        width: 9.5rem;
        height: 3.3rem;
        bottom: 3.5rem;
        left: 50%;
        margin-left: -4.8rem;
        background: url("./img/gotoBtn.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .choose-sex {
      width: 100%;
      height: 100%;
      background: url("./img/bg2.jpg") bottom center no-repeat;
      background-size: cover;
      .text2-1 {
        position: absolute;
        bottom: 50%;
        left: 50%;
        margin-left: -4.8rem;
        margin-bottom: 4rem;
        width: 9.5rem;
        height: 9.5rem;
        background: url("./img/male.png") center center no-repeat;
        background-size: 100% 100%;
      }
      .text2-2 {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -8.5rem;
        margin-top: -0.6rem;
        width: 17rem;
      }
      .text2-3 {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -4.8rem;
        margin-top: 4rem;
        width: 9.5rem;
        height: 9.5rem;
        background: url("./img/female.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .choose-age {
      width: 100%;
      height: 100%;
      background: url("./img/bg2.jpg") bottom center no-repeat;
      background-size: cover;
      .age-tips {
        position: absolute;
        bottom: 50%;
        margin-bottom: 12rem;
        width: 100%;
        text-align: center;
        font-size: 1.5rem;
      }
      .age-list {
        position: absolute;
        top: 50%;
        margin-top: -11.5rem;
        width: 100%;
        text-align: center;
        li {
          margin: 1.6rem auto;
          width: 10rem;
          height: 3.1rem;
          line-height: 3.1rem;
          background: url("./img/age-bg.png") center center no-repeat;
          background-size: 100% 100%;
          font-size: 1.3rem;
        }
      }
    }
    .choose-version {
      width: 100%;
      height: 100%;
      background: url("./img/bg2.jpg") bottom center no-repeat;
      background-size: cover;
      .text3-1 {
        position: absolute;
        bottom: 50%;
        left: 50%;
        margin-left: -4.8rem;
        margin-bottom: 4rem;
        width: 9.5rem;
        height: 9.5rem;
        background: url("./img/com-version.png") center center no-repeat;
        background-size: 100% 100%;
      }
      .text3-2 {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -8.5rem;
        margin-top: -0.6rem;
        width: 17rem;
      }
      .text3-3 {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -4.8rem;
        margin-top: 3.8rem;
        width: 9.5rem;
        height: 9.5rem;
        background: url("./img/sim-version.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .judge-tips {
      width: 100%;
      height: 100%;
      background: url("./img/bg2.jpg") bottom center no-repeat;
      background-size: cover;
      .judge-text {
        position: absolute;
        bottom: 50%;
        left: 50%;
        margin-bottom: -9rem;
        margin-left: -9.2rem;
        width: 19.5rem;
        height: 24rem;
        background: url("./img/tips-bg.png") center center no-repeat;
        background-size: 100% 100%;
      }
      .judge-title {
        width: 17rem;
        margin: 2rem auto 2rem;
      }
      .judge-text {
        p {
          padding: 0 1rem;
          text-align: justify;
          font-size: 0.96rem;
          line-height: 1.8;
          color: #503031;
          span {
            color: #000;
            font-weight: bold;
          }
        }
      }
      .beginBtn {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        margin-left: -4.8rem;
        width: 9.5rem;
        height: 3.5rem;
        background: url("./img/beginBtn.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .sim-version {
      width: 100%;
      min-height: 100%;
      background: url("./img/bg2.jpg") bottom center repeat;
      background-size: cover;
      background-attachment: fixed;
      .simversion-list {
        padding: 2rem 1rem 1rem;
        li {
          margin: 1rem 0;
        }
        .title {
          background: url("./img/subject-on.png") center center no-repeat;
          background-size: 100% 100%;
          color: #fff;
          font-size: 1rem;
          padding: 0.6rem 1rem 0.8rem 1rem;
          line-height: 1.5;
          span {
            color: #f54711;
          }
        }
        p {
          margin: 1rem 0;
          font-size: 1rem;
        }
      }
      .next-version {
        padding: 2rem 0;
      }
      .nextBtn {
        margin: 0 auto;
        width: 9rem;
        height: 3rem;
        background: url("./img/nextBtn.png") center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .question {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
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

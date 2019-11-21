<template>
<div class="suggestPage">
  <div class="suggest-detail">
    <div class="title">【气郁质】体型偏瘦，敏感多疑，抑郁寡欢。</div>
    <div v-show="showDetail1">
      <p>
        <span>常见表现：</span>体型瘦者为多，面貌神情忧郁，情感脆弱，烦闷不乐，胸胁胀满或走窜疼痛，唉声叹气，睡眠较差，食欲减退，惊悸，健忘，大便偏干，小便正常。
      </p>
      <p>
        <span>心理特征：</span>性格内向不稳定，忧郁脆弱，敏感多疑。
      </p>
      <p>
        <span>发病倾向：</span>易患抑郁症、失眠、焦虑症、精神分裂症、胃肠神经官能症等，对精神刺激适应能力较差，不适应阴雨天气。
      </p>
    </div>
    <div class="more" @click="showDetailFun(1)"><span>{{ tips1 }}</span> <img :class="{on: showDetail1}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">养生建议：饮食宜宽胸理气，起居宜动不宜静，多参加社会活动、人际交往。</div>
    <div v-show="showDetail2">
      <p>
        <span>饮食：</span>以理气解郁为主，多吃黄花菜、海带、山楂、玫瑰花等具有行气、解郁、消食、醒神作用的食物。
      </p>
      <p>
        <span>起居：</span>居住环境不要过于嘈杂，也不要总待在家里，建议多点社会活动、人际交往。
      </p>
      <p>
        <span>运动：</span>增加户外活动，如跑步、登山、游泳、武术等，让身心放轻松。
      </p>
    </div>
    <div class="more" @click="showDetailFun(2)"><span>{{ tips2 }}</span> <img :class="{on: showDetail2}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="btn">
    <div class="replayBtn" @click="reload"></div>
    <!--<div class="shareBtn" @click="share"></div>-->
  </div>
</div>
</template>

<script>
export default {
  name: 'qiyuDeficiency',
  data() {
    return {
      showDetail1: false, // 显示详情
      showDetail2: false, // 显示详情
      tips1: '查看详情',
      tips2: '查看详情',
    };
  },
  methods: {
    showDetailFun(num) {
      let _this = this;
      if (num === 1) {
        let showFlag = _this.showDetail1;
        if (showFlag) {
          _this.tips1 = '查看详情';
        } else {
          _this.tips1 = '收起';
        }
        _this.showDetail1 = !_this.showDetail1;
      } else if (num === 2) {
        let showFlag = _this.showDetail2;
        if (showFlag) {
          _this.tips2 = '查看详情';
        } else {
          _this.tips2 = '收起';
        }
        _this.showDetail2 = !_this.showDetail2;
      }
    },
    reload() {
      window.location.reload();
    },
    share() {
      this.$emit('share');
    }
  }
};
</script>

<style lang="less" scoped>
  @import './../style/suggest';
</style>

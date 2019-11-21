<template>
<div class="suggestPage">
  <div class="suggest-detail">
    <div class="title">【特禀质】遗传疾病，先天缺陷，容易过敏。</div>
    <div v-show="showDetail1">
      <p>
        <span>常见表现：</span>特殊人群，多有遗传疾病、胎传性疾病、过敏反应。常见哮喘、风团、咽痒、鼻塞、打喷嚏等，生理机能和自我调适力低下。先天禀赋异常者或有畸形，或有生理缺陷。
      </p>
      <p>
        <span>心理特征：</span>随禀质不同而情况各异。
      </p>
      <p>
        <span>发病倾向：</span>易患过敏性疾病，如过敏性鼻炎、过敏性紫癜、荨麻疹、哮喘等，遗传性疾病如血友病、先天愚型等，胎传性疾病如胎惊等，对环境适应能力差。
      </p>
    </div>
    <div class="more" @click="showDetailFun(1)"><span>{{ tips1 }}</span> <img :class="{on: showDetail1}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">养生建议：饮食宜益气固表，居室通风清洁，睡眠充足，加强锻炼，注意保暖。</div>
    <div v-show="showDetail2">
      <p>
        <span>饮食：</span>饮食宜清淡、均衡，粗细搭配适当，荤素配伍合理。多吃益气固表的食物，如黄芪、山药、糯米等，少吃荞麦（含致敏物质荞麦荧光素）、蚕豆、白扁豆、牛肉、羊肉、鹅肉、鲤鱼、虾、蟹、茄子、浓茶、咖啡及酒、辣椒等辛辣、腥膻发物及含致敏物质的食物。必要时应根据个人实际过敏反应制定不同的保健食谱。
      </p>
      <p>
        <span>起居：</span>居室应通风良好，避免过敏原，保持室内清洁，被褥、床单要经常洗晒，可防止对尘螨过敏。室内装修后不宜立即入住，让甲醛等挥发干净后再搬进新居。起居应有规律，保持充足的睡眠。
      </p>
      <p>
        <span>运动：</span>积极参加各种体育锻炼，天气寒冷时锻炼要注意防寒保暖，防止感冒。
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
  name: 'tebingDeficiency',
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

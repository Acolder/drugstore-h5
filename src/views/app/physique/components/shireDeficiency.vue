<template>
<div class="suggestPage">
  <div class="suggest-detail">
    <div class="title">【湿热质】面垢油光，易长痘痘，口苦口臭。</div>
    <div v-show="showDetail1">
      <p>
        <span>常见表现：</span>体型中等或偏瘦，面垢油光，易生痤疮粉刺，口苦口干口臭，身重困倦，心烦懈怠，眼睛红赤，大便燥结或黏滞，小便短赤，男性易阴囊潮湿，女性易带下增多。
      </p>
      <p>
        <span>心理特征：</span>心烦，急躁易怒。
      </p>
      <p>
        <span>发病倾向：</span>易患痤疮、疮疔、痔疮、脂溢性脱发、带下过多、肝炎、膀胱炎等，对湿热、气温偏高环境较难适应。
      </p>
    </div>
    <div class="more" @click="showDetailFun(1)"><span>{{ tips1 }}</span> <img :class="{on: showDetail1}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">养生建议：清淡饮食，戒烟戒酒，不熬夜，居家宜干爽，加强运动锻炼。</div>
    <div v-show="showDetail2">
      <p>
        <span>饮食：</span>戒烟戒酒，多吃清热利湿的食物，如绿豆、黄瓜、莲藕、冬瓜、赤小豆等，尤其是夏天。少吃羊肉、韭菜、辣椒、火锅、烧烤等辛温助热的食物，以免积蓄体内的湿热，诱发湿疹、痘痘等。
      </p>
      <p>
        <span>起居：</span>居家宜清爽干燥，不要熬夜，多喝水。
      </p>
      <p>
        <span>运动：</span>宜进行大强度、大运动量的运动项目，如长跑、马拉松、登山等。
      </p>
    </div>
    <div class="more" @click="showDetailFun(2)"><span>{{ tips2 }}</span> <img :class="{on: showDetail2}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">推荐养生方：豆苓祛湿汤。</div>
    <div v-show="showDetail3">
      <p>
        <span>豆苓祛湿汤：</span>甄选5味道地中药材，精心调配而成的养生膳食汉方。可以补益脾胃、消暑泄浊、利水祛湿，适用于湿热内蕴、水肿型肥胖、湿疹、白带异常等症。
      </p>
      <!--<p class="my-doctor">（如有需要，请点击公众号菜单【我的服务】&#45;&#45;【我的医生】咨询开方！）</p>-->
    </div>
    <div class="more" @click="showDetailFun(3)"><span>{{ tips3 }}</span> <img :class="{on: showDetail3}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="btn">
    <div class="replayBtn" @click="reload"></div>
    <!--<div class="shareBtn" @click="share"></div>-->
  </div>
</div>
</template>

<script>
export default {
  name: 'shireDeficiency',
  data() {
    return {
      showDetail1: false, // 显示详情
      showDetail2: false, // 显示详情
      showDetail3: false, // 显示详情
      tips1: '查看详情',
      tips2: '查看详情',
      tips3: '查看详情',
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
      } else if (num === 3) {
        let showFlag = _this.showDetail3;
        if (showFlag) {
          _this.tips3 = '查看详情';
        } else {
          _this.tips3 = '收起';
        }
        _this.showDetail3 = !_this.showDetail3;
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

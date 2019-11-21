<template>
<div class="suggestPage">
  <div class="suggest-detail">
    <div class="title">【痰湿质】体型肥胖，腹部肥软，油光满面。</div>
    <div v-show="showDetail1">
      <p>
        <span>常见表现：</span>体形肥胖，腹部肥满松软，面色淡黄而暗，眼泡微浮，面部皮肤油脂较多，多汗且粘，胸闷，痰多，身体困重易疲乏，口舌黏腻，大便正常或不实，小便不多或微混。
      </p>
      <p>
        <span>心理特征：</span>性格温和、稳重，多善于忍耐。
      </p>
      <p>
        <span>发病倾向：</span>易患糖尿病、中风、冠心病、脂肪肝、前列腺炎、肥胖症等，不耐受湿邪，对梅雨季节及湿重环境适应能力差。
      </p>
    </div>
    <div class="more" @click="showDetailFun(1)"><span>{{ tips1 }}</span> <img :class="{on: showDetail1}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">养生建议：清淡饮食，居住环境宜干爽，多参加户外运动。</div>
    <div v-show="showDetail2">
      <p>
        <span>饮食：</span>饮食以清淡、健脾利湿为主，一定要控制甜食和油腻食物。可多吃海带、冬瓜、薏米、赤小豆、芡实等。冬瓜有利尿、祛痰的功效，夏季常食还可以清热解毒。
      </p>
      <p>
        <span>起居：</span>居住环境宜干燥清爽，不要在潮湿环境久留。
      </p>
      <p>
        <span>运动：</span>多进行户外运动，适合中小强度、长时间的运动，如散步、慢跑、打乒乓球、游泳等。
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
  name: 'yanDeficiency',
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

<template>
<div class="suggestPage">
  <div class="suggest-detail">
    <div class="title">【气虚质】气短懒言，容易疲劳，免疫力低下。</div>
    <div v-show="showDetail1">
      <p>
        <span>常见表现：</span>肌肉松软，面色偏黄或白，说话语音低弱，气短懒言，容易疲乏，精神不振，易出汗，双目无神，唇无血色，毛发无光泽，头晕健忘，大便一般正常，小便正常或偏多。
      </p>
      <p>
        <span>心理特征：</span>性格内向，情绪不稳定，胆小怕事，不喜欢冒险。
      </p>
      <p>
        <span>发病倾向：</span>易患感冒、内脏下垂、鼻炎等，病后康复缓慢，不耐受风、寒、暑邪。
      </p>
    </div>
    <div class="more" @click="showDetailFun(1)"><span>{{ tips1 }}</span> <img :class="{on: showDetail1}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">养生建议：饮食以益气健脾为主，保持充足睡眠，运动强度不宜过大。</div>
    <div v-show="showDetail2">
      <p>
        <span>饮食：</span>多吃益气健脾、易于消化的食物，如山药、黄豆、白扁豆、鸡肉、香菇、大枣、蜂蜜等。少吃耗气的食物，如空心菜、生萝卜等。不可贪吃生冷食物。
      </p>
      <p>
        <span>起居：</span>起居宜有规律，注意保暖，午间应适当休息，保持充足睡眠。
      </p>
      <p>
        <span>运动：</span>适合进行低强度的运动，如打太极拳、散步、骑自行车等，注意避免劳动或运动时出汗受风。
      </p>
    </div>
    <div class="more" @click="showDetailFun(2)"><span>{{ tips2 }}</span> <img :class="{on: showDetail2}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">推荐养生方：温经膏、补脾健胃膏、补中益气汤、十全大补汤。</div>
    <div v-show="showDetail3">
      <p>
        <span>温经膏：</span>甄选17味道地中药材，精心熬制而成的养生膏方。具有温通气血、补血调经的作用，适合阳虚体质、气虚体质等亚健康人群。
      </p>
      <p>
        <span>补脾健胃膏：</span>甄选25味道地中药材，精心熬制而成的养生膏方。具有健脾养胃、行气消食的作用，适用于气虚体质人群，尤其是脾胃虚弱者。
      </p>
      <p>
        <span>补中益气汤：</span>甄选8味道地中药材，精心调配而成的养生膳食汉方。可以补中益气、升阳举陷，适用于脾虚气陷导致的食欲不振、体倦肢软、少气懒言、面色萎黄、大便溏稀等症。
      </p>
      <p>
        <span>十全大补汤：</span>甄选11味道地中药材，精心调配而成的养生膳食汉方。气血双补、温阳强身，适用于体虚多病、易疲劳、抵抗力差等人群。
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
  name: 'qiDeficiency',
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

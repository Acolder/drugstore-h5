<template>
<div class="suggestPage">
  <div class="suggest-detail">
    <div class="title">【血瘀质】体瘦居多，面暗多斑，失眠健忘。</div>
    <div v-show="showDetail1">
      <p>
        <span>常见表现：</span>体型多瘦弱，面色晦暗，皮肤偏暗偏干，易长瘀斑，嘴唇、指甲颜色淡白或便紫，眼圈暗黑，易脱发，手足发麻，心悸头晕，失眠健忘，便秘，女性多见痛经、闭经。
      </p>
      <p>
        <span>心理特征：</span>性情急躁，心情易烦。
      </p>
      <p>
        <span>发病倾向：</span>易患心脑血管疾病、肿瘤、中风、失眠、血管神经性头痛、慢性疼痛疾病、黄褐斑、女性闭经等，不难受风、寒邪。
      </p>
    </div>
    <div class="more" @click="showDetailFun(1)"><span>{{ tips1 }}</span> <img :class="{on: showDetail1}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">养生建议：饮食以活血化瘀为主，作息有规律，加强体育锻炼。</div>
    <div v-show="showDetail2">
      <p>
        <span>饮食：</span>多吃山楂、海带、玫瑰花、醋、金桔等具有活血、散结、行气、疏肝解郁作用的食物，少吃肥肉等滋腻食品。
      </p>
      <p>
        <span>起居：</span>作息时间有规律，保持充足睡眠，日常生活不宜过于安逸，注意劳逸结合，有助于调畅气血。
      </p>
      <p>
        <span>运动：</span>加强体育锻炼，多做有助于气血运行的运动，如舞蹈、步行、徒手操等。
      </p>
    </div>
    <div class="more" @click="showDetailFun(2)"><span>{{ tips2 }}</span> <img :class="{on: showDetail2}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">推荐养生方：温经膏、四物汤、八珍汤、灵芝养颜汤。</div>
    <div v-show="showDetail3">
      <p>
        <span>温经膏：</span>甄选17味道地中药材，精心熬制而成的养生膏方。具有温通气血、补血调经的作用，适合阳虚体质、气虚体质等亚健康人群。
      </p>
      <p>
        <span>四物汤：</span>甄选4味道地中药材，精心调配而成的养生膳食汉方。可以补血调经，适用于女性月经不调、痛经、脱发等血瘀症状。
      </p>
      <p>
        <span>八珍汤：</span>甄选8味道地中药材，精心调配而成的养生膳食汉方。可以益气健脾、补气活血，适用于气血不足、长斑、疲劳乏力、脱发、术后体虚等人群。
      </p>
      <p>
        <span>灵芝养颜汤：</span>甄选4味道地中药材，精心调配而成的养生膳食汉方。可以补气养血、健脾胃、益肝肾、滋补养颜，适用于气虚乏力、血虚萎黄、失眠心悸、月经不调、痛经等症。
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
  name: 'xueyuDeficiency',
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

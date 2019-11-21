<template>
<div class="suggestPage">
  <div class="suggest-detail">
    <div class="title">【阴虚质】脾气急躁，手足心热，口燥咽干。</div>
    <div v-show="showDetail1">
      <p>
        <span>常见表现：</span>体型偏瘦，面色潮红、有烘热感，手足心热，口燥咽干，双眼干涩，唇红微干，皮肤偏干，易生皱纹，口渴喜冷饮，眩晕耳鸣，睡眠差，大便干燥，小便短涩。
      </p>
      <p>
        <span>心理特征：</span>性格急躁，外向好动。
      </p>
      <p>
        <span>发病倾向：</span>易患失眠、便秘、阴虚咳嗽、复发性口疮等，耐冬不耐夏，易受暑、热、燥邪。
      </p>
    </div>
    <div class="more" @click="showDetailFun(1)"><span>{{ tips1 }}</span> <img :class="{on: showDetail1}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">养生建议：饮食以滋阴为主，不要熬夜，适当进行有氧运动。</div>
    <div v-show="showDetail2">
      <p>
        <span>饮食：</span>饮食以滋阴降火为原则，多吃瘦猪肉、鸭肉、龟、鳖、绿豆、冬瓜、赤小豆、海蜇、荸荠、芝麻、百合等甘淡清润之品。少吃羊肉、狗肉、韭菜、辣椒、葱、蒜等性温燥烈之品。
      </p>
      <p>
        <span>起居：</span>宜居安静环境，不可熬夜，不宜蒸桑拿。
      </p>
      <p>
        <span>运动：</span>避免剧烈运动，适合强度较低的有氧运动，如散步、做体操、慢跑等，注意及时补充水分。
      </p>
    </div>
    <div class="more" @click="showDetailFun(2)"><span>{{ tips2 }}</span> <img :class="{on: showDetail2}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">推荐养生方：秋梨膏、益胃汤。</div>
    <div v-show="showDetail3">
      <p>
        <span>秋梨膏：</span>甄选7味道地中药材，精心熬制而成的养生膏方。具有滋阴润肺、祛痰止咳的作用，适用于阴虚肺热燥咳。
      </p>
      <p>
        <span>益胃汤：</span>甄选5味道地中药材，精心调配而成的养生膳食汉方。可以滋阴养胃，适用于食欲不振、口干舌燥、舌红少苔等阴虚症状。
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
  name: 'yinDeficiency',
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

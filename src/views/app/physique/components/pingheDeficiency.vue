<template>
<div class="suggestPage">
  <div class="suggest-detail">
    <div class="title">【平和质】体态适中，面色红润，精力充沛。</div>
    <div v-show="showDetail1">
      <p>
        <span>常见表现：</span>体型匀称健壮，面色、肤色润泽，头发稠密有光泽，目光有神，鼻色明润，嗅觉通利，唇色红润，不易疲劳，耐受寒热，睡眠良好，胃口好，二便正常。
      </p>
      <p>
        <span>心理特征：</span>性格随和开朗。
      </p>
      <p>
        <span>发病倾向：</span>较少患病，适应能力较强。
      </p>
    </div>
    <div class="more" @click="showDetailFun(1)"><span>{{ tips1 }}</span> <img :class="{on: showDetail1}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">养生建议：饮食清淡为主，劳逸结合，适当运动。</div>
    <div v-show="showDetail2">
      <p>
        <span>饮食：</span>注重膳食平衡，多吃五谷杂粮、蔬菜瓜果，远离烟酒。
      </p>
      <p>
        <span>起居：</span>保持良好的生活习惯，作息有规律，劳逸结合。
      </p>
      <p>
        <span>运动：</span>坚持适当的锻炼，如慢跑、游泳、打羽毛球、打太极拳等。
      </p>
    </div>
    <div class="more" @click="showDetailFun(2)"><span>{{ tips2 }}</span> <img :class="{on: showDetail2}" src="./../img/arrow-down.png"/></div>
  </div>
  <div class="suggest-detail">
    <div class="title">推荐养生方：莲子山药汤。</div>
    <div v-show="showDetail3">
      <p>
        <span>莲子山药汤：</span>甄选4味道地中药材，精心调配而成的养生膳食汉方。可以补脾养胃、养心安神、补血养颜、滋补肝肾，是一道营养均衡的膳食汤方，适用于日常滋补调理。
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
  name: 'pingheDeficiency',
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

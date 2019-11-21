<template>
 <div class="suggestPage">
   <div class="suggest-detail">
     <div class="title">【阳虚质】肌肉松软，畏寒怕冷，手脚冰凉。</div>
     <div v-show="showDetail1">
       <p>
         <span>常见表现：</span>形体多白胖，肌肉不壮，平素畏冷，手脚冰凉，喜热饮食，精神不振，睡眠偏多，口唇色淡，易出汗，大便稀薄，小便清长。
       </p>
       <p>
         <span>心理特征：</span>内向沉静。
       </p>
       <p>
         <span>发病倾向：</span>易患风寒感冒、鼻炎、痛经、阳痿、风湿关节炎、宫寒不孕、泄泻、水肿等，耐夏不耐冬，易感风、寒、湿邪。
       </p>
     </div>
     <div class="more" @click="showDetailFun(1)"><span>{{ tips1 }}</span> <img :class="{on: showDetail1}" src="./../img/arrow-down.png"/></div>
   </div>
   <div class="suggest-detail">
     <div class="title">养生建议：饮食以温补为主，劳逸结合，适当运动。</div>
     <div v-show="showDetail2">
       <p>
         <span>饮食：</span>多吃温阳益气的食物，如牛肉、羊肉、韭菜、生姜、辣椒、葱、蒜、芥末、花椒等，少吃梨、西瓜、荸荠、黄瓜、柿子、冷饮、雪糕等生冷寒凉的食物。
       </p>
       <p>
         <span>起居：</span>避开阴冷潮湿环境，注意保暖，尤其是足下、背部及下腹丹田部位的防寒保暖。
       </p>
       <p>
         <span>运动：</span>宜选择上午、春夏季节运动，不宜游泳，避免在极端天气下运动，防止出汗过多。
       </p>
     </div>
     <div class="more" @click="showDetailFun(2)"><span>{{ tips2 }}</span> <img :class="{on: showDetail2}" src="./../img/arrow-down.png"/></div>
   </div>
   <div class="suggest-detail">
     <div class="title">推荐养生方：温经膏、固肾壮阳膏、壮肾固精汤。</div>
     <div v-show="showDetail3">
       <p>
         <span>温经膏：</span>甄选17味道地中药材，精心熬制而成的养生膏方。具有温通气血、补血调经的作用，适合阳虚体质、气虚体质等亚健康人群。
       </p>
       <p>
         <span>固肾壮阳膏：</span>甄选21味道地中药材，精心熬制而成的养生膏方。具有温补肾阳、填精益血的作用，适用于畏寒怕冷、贫血、阳痿早泄、腰膝酸软等肾阳虚人群。
       </p>
       <p>
         <span>壮肾固精汤：</span>甄选6味道地中药材，精心调配而成的养生膳食汉方。可以补肾壮阳、填髓固精，适用于腰膝酸软、肢冷畏寒、面白疲乏、慢性前列腺炎等症，男女均可服用。
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
  name: 'yangDeficiency',
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

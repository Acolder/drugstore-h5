<template>
  <div class="container" :class="{noneHeader:from==='doctor'}">
    <!--下载页面-->
    <share-header v-show="from!=='doctor'"></share-header>
    <!--经络解读-->
    <!--经络介绍-->
    <section class="box2" id="jingLuoJieShao">
      <div class="tap">
        <ul>
          <li :class="{active:type==='心包经'}" @click="tap('心包经')">心包经</li>
          <li :class="{active:type==='肝经'}" @click="tap('肝经')">肝经</li>
          <li :class="{active:type==='肾经'}" @click="tap('肾经')">肾经</li>
          <li :class="{active:type==='脾经'}" @click="tap('脾经')">脾经</li>
          <li :class="{active:type==='肺经'}" @click="tap('肺经')">肺经</li>
          <li :class="{active:type==='胃经'}" @click="tap('胃经')">胃经</li>
          <li :class="{active:type==='胆经'}" @click="tap('胆经')">胆经</li>
          <li :class="{active:type==='膀胱经'}" @click="tap('膀胱经')">膀胱经</li>
        </ul>
      </div>
      <h1>经络简介</h1>
      <!--经络详情-->
      <div class="tap-box" v-if="type === '心包经'">
        <div class="left" :style="{height:JLHeigh+'px'}">
          ——救命的经络<br/>
          中医讲心包经，简称心包，亦称“腹中”，是心脏外部的一层薄膜，和心脏之间有部份体液，具有保护心脏的作用。<br/>
          心包在中医里是一个独立的经络，许多病症都和这个经络有关。如果要防止外邪逆传心包，而出现昏迷、胡言乱语等病入膏育症状，就请合理应用我们的心包经吧，它为心包所属，是一条救命的经络。
        </div>
        <div class="right" ref="imgwidth">
          <img src="./img/c0.gif" alt="">
        </div>
      </div>
      <div class="tap-box" v-if="type === '肝经'">
        <div class="left" :style="{height:JLHeigh+'px'}">
          ——身怀绝技的治病高手<br/>
          肝经是我们体内身怀绝技的治病高手。我们可以通过调节肝经保持全身气血畅达，避免因气机阻滞而出现胸肋、小腹的胀痛不适；可以保证脾胃的正常，减少因牌胃升降失调而出现的呃逆、呕吐；可以保持情绪的正常，摆脱因肝气不舒而出现的郁都寡欢、暴怒、发火；还可以使男子排精畅通、女子月经规律，从而保障生殖功能的健全。
        </div>
        <div class="right">
          <img src="./img/c1.gif" alt="">
        </div>
      </div>
      <div class="tap-box" v-if="type === '肾经'">
        <div class="left" :style="{height:JLHeigh+'px'}">
          ——决定生老病死的关键<br/>
          中医认为肾脏是人体最重要的脏器之一，有“先天之本”之称。<br/>
          肾的主要生理功能是藏精，这是推动人体活动的基本物质。肾经就是肾脏所主之经，它的气血运行畅通与否直接关系肾藏精的功能，间接影响脏腑的阴阳，因此是决定人生老病死的关键。<br/>
          如果我们想要提高生活质量、健康长寿，就必须经常按摩肾经，使经脉气血畅通。<br/>
        </div>
        <div class="right">
          <img src="./img/c2.gif" alt="">
        </div>
      </div>
      <div class="tap-box" v-if="type === '脾经'">
        <div class="left" :style="{height:JLHeigh+'px'}">
          ——气血生化之源<br/>
          中医认为，脾为后天之本，气血生化之源。脾的一个重要的功能就是主运化，运化功能旺盛，则机体的消化吸收功能才能健全，才能为化生精、气、血、津液提供足够原料，才能使脏腑、经络、四肢百骸，以及筋肉、皮、毛等组织得到充分的营养。<br/>
          脾经一发生异常，身体各种症状就会呈现出来。如心窝或胃附近会有重压感，出现疼痛、恶心、打嗝等现象。容易下痢或便秘，身体消瘦下去。尿量少，有时甚至完全无法排尿。脚部容易冰冷、浮肿、身体有倦念感。因为经常失眠，故身体感觉不适，不活跃。<br/>
          若出现以上所述的症状时，只要刺激经上的穴道，就能改善不适的症状。<br/>
        </div>
        <div class="right">
          <img src="./img/c3.gif" alt="">
        </div>
      </div>
      <div class="tap-box" v-if="type === '肺经'">
        <div class="left" :style="{height:JLHeigh+'px'}">
          ——肺脏健康的晴雨表<br/>
          肺经乃以肺为中心，连接胸、手、手掌、拇指的经脉。肺部的功能主要是将空气吸入体内，并将其连送分配至五脏（内脏），以维持生存。<br/>
          若此机能发生异常时，会有上火、口干渴、胸痛、咳嗽、心悸、喘息等症状出现。此外，尚会产生脖根部痛、肘至手脱痛及麻痹等。随着身体机能降低，皮肤呈现干燥、没有光泽的现象、脸色苍白、声音微弱、元气丧失，并连带地失去耐性。精神上也常会心情暗淡。<br/>
          当身体呈现以上所述的症状时，请刺激肺经上的穴位，使气血流通顺畅，身体便能迅速恢复健康。<br/>
        </div>
        <div class="right">
          <img src="./img/c4.gif" alt="">
        </div>
      </div>
      <div class="tap-box" v-if="type === '胃经'">
        <div class="left" :style="{height:JLHeigh+'px'}">
          ——人的后天之本<br/>
          中医里说脾胃是人的“后天之本”，就是说它们是人生下来活下去的根本保证，为什么这么说呢？因为脾胃具备了我们现在所说的整个消化吸收功能，是人体的能量源头。<br/>
          脾胃管着能量的吸收和分配，脾胃不好，人体“电能”就不够用，“电压” 亏虚，使很多器官运作代谢减慢，工作效率降低，或干脆临时停工。如果五脏六腑都不能好好工作，短期还可以用“蓄电池”的能源，长期下去就不够用了，疾病也就出来了。由此看来，养好后天的脾胃发电厂有多么重要!<br/>
        </div>
        <div class="right">
          <img src="./img/c5.gif" alt="">
        </div>
      </div>
      <div class="tap-box" v-if="type === '胆经'">
        <div class="left" :style="{height:JLHeigh+'px'}">
          ——勇往直前的催化剂<br/>
          中医认为胆主决断，帮人决断谋虑，使心情舒畅。胆经是人体重要的经络。跟人的情志关系密切。<br/>
          现代人经常会谋虑的东西太多，心里的压力太大。但是胆可以把你所谋虑的事情及时去决断。如果你胆的功能强大，你所谋略的事情就能够及时被决断，你的心情也就会舒畅。如果你所谋虑的东西不能被及时地决断，你会产生抑郁。胆经就可以解决这些问题。<br/>
        </div>
        <div class="right">
          <img src="./img/c6.gif" alt="">
        </div>
      </div>
      <div class="tap-box" v-if="type === '膀胱经'">
        <div class="left" :style="{height:JLHeigh+'px'}">
          ——人体排毒通道的掌控者<br/>
          肺经乃以肺为中心，连接胸、手、手掌、拇指的经脉。肺部的功能主要是将空气吸入体内，并将其连送分配至五脏（内脏），以维持生存。若此机能发生异常时，会有上火、口干渴、胸痛、咳嗽、心悸、喘息等症状出现。<br/>
          足太阳膀胱经是十四经络中最长的一条经脉，也是穴位最多的经脉，它的畅通与否直接掌控着我们身体内毒素的排泄，绝不能忽略它。<br/>
          如果膀胱经发生异常，会影响全身毒素的排泄，从而出现头痛、头重、流鼻血、全身肌肉酸痛、脸部皮肤失去光泽、耳鸣、听力不佳、容易疲劳，精神欠佳等症状。我们可从刺激膀胱经上的穴位，消除和缓和各种不舒服感。
        </div>
        <div class="right">
          <img src="./img/c7.gif" alt="">
        </div>
      </div>
      <h2>{{type}}失衡原因:</h2>
      <div class="tap-box2" v-if="type === '心包经'">
        肥腻甜食、情志因素、生活习惯、大便不通、脾胃虚弱、肾虚、肺虚
      </div>
      <div class="tap-box2" v-if="type === '肝经'">
        1.情志因素：长期生活在比较压抑的环境下，或者长期精神抑郁、大怒等，都会伤肝。<br/>
        2.不良的生活习惯：两个重要因素就是熬夜和喝酒，运动量过大，用眼过度。<br/>
        3.心血虚弱：心脑需要大量的气血心脑使用过度，心血不足肝就虚弱。
      </div>
      <div class="tap-box2" v-if="type === '肾经'">
        1.先天不足：因为先天之精不足，所以易导致肾虚；<br/>
        2.多因房事过度，或少年频繁手淫；<br/>
        3.思虑忧郁，损伤心脾，则病及阳明冲肾；<br/>
        4.恐惧伤肾，恐则伤肾；<br/>
        5.肝主筋，阴器为宗筋之汇，若情志不遂，忧思郁怒，肝失疏泄条达，则肾精所聚无能；<br/>
        6.湿热下注，肾宗筋弛纵；<br/>
        7.饮食不当，没规律，营养单一。经常食用油腻食物或辛辣食物、吸烟饮酒过度等。<br/>
      </div>
      <div class="tap-box2" v-if="type === '脾经'">
        1.饮食原因：现代生活条件好了，吃生冷食物太多，肉食太多了，脾累坏了，生痰湿，痰 湿困脾引起脾虚。<br/>
        2.思虑过多： 脾在志为思，然而久思伤脾。<br/>
        3.肝的原因： 五行中，肝属木，脾胃属土。木克土，也就是肝气犯胃，肝郁气滞可以影响脾胃。<br/>
        4.肾阳虚：如果肾阳虚损，将无法温煦脾土，可使脾运化水谷和津液的功能失常。
      </div>
      <div class="tap-box2" v-if="type === '肺经'">
        1.天气的变化：外界天气的变化，风，寒，暑，湿，燥，火等均可伤肺，大家都知道感冒伤风，受寒人就会出现咳嗽的症状。<br/>
        2.情志原因：人在情绪上的变化也会伤肺，如长期忧愁，悲伤，都会影响或伤害肺。<br/>
        3.天气污染：环境因素，如空气的污染会导致我们呼吸进去的空气污浊不堪而伤害肺。
      </div>
      <div class="tap-box2" v-if="type === '胃经'">
        1.天气的变化：外界天气的变化，风，寒，暑，湿，燥，火等均可伤肺，大家都知道感冒伤风，受寒人就会出现咳嗽的症状。<br/>
        2.情志原因：人在情绪上的变化也会伤肺，如长期忧愁，悲伤，都会影响或伤害肺。<br/>
        3.天气污染：环境因素，如空气的污染会导致我们呼吸进去的空气污浊不堪而伤害肺。
      </div>
      <div class="tap-box2" v-if="type === '胆经'">
        1.长期高脂饮食，如动物脑、肝、肾及蛋黄等，可导致血液和胆汁中的胆固醇升高，极易产生胆石。此外，长期高脂饮食易使人肥胖，加之不好运动，导致胆囊肌肉张力下降，胆囊排空延缓，胆汁淤积，容易形成结石。<br/>
        2.喜爱甜食或过量摄取含糖量高的食物。精制的大米、面粉等会加速胆固醇的累积，造成胆汁内胆固醇、胆汁酸、卵磷脂之间比列失调。<br/>
        3.长期饮酒。长期饮酒可导致肝纤维化、肝硬化、脂肪肝等病变，使得胆汁排空受阻淤积，这也是诱因之一。<br/>
        4.饮食习惯不合理，如经常不吃早餐。<br/>
        5.饮水少会导致血黏、胆汁稠，长此以往会增加患胆结石的风险。<br/>
        6.由于遗传原因，这种情况多见于一个家族中多人患有胆病的家庭成员。
      </div>
      <div class="tap-box2" v-if="type === '膀胱经'">
        主要是寒湿，血瘀体质造成 ；肾气主上升，膀胱之气主通降。
        肾气之升，激发尿液的生成并控制其排泄；膀胱之气通降，推动膀胱收缩而排尿。
        若肾气和膀胱之气的激发和固摄作用失常，膀胱开合失权，既可出现小便不利或癃闭，又可出现尿频、尿急、遗尿、小便不禁等。
      </div>
      <h2>{{type}}失衡症状:</h2>
      <div class="tap-box2" v-if="type === '心包经'">
        <h3>激发</h3>
        <div>心包发炎、胸闷、心痛、口舌糜烂肿痛、口唇及指甲青紫，上脘异常、喜欢睡、心血管病变、易头昏、头痛等。</div>
        <h3>亏虚</h3>
        <div>大多表现为润滑液分泌不足、心跳异常、气喘、失眠多梦、心悸亢奋、语言障碍、手掌发热等、畏寒肢冷、失眠健忘、神经衰弱、心律不齐；严重者症见胸痹，冠脉堵塞、心绞痛等病。</div>
      </div>
      <div class="tap-box2" v-if="type === '肝经'">
        <h3>激发</h3>
        <div>肝火旺、头晕腰痛、月经失调、失眠、肋间神经痛、目赤、易怒、头痛、耳鸣、眼干、视物模糊、口苦、吐血、咯血、脉弦数等</div>
        <h3>亏虚</h3>
        <div>易疲劳、性功能减退、头晕眼花或夜盲、两目干涩、面部烘热颧红、口干咽燥、五心烦热、胁肋隐隐作痛、手足颤动、面白无华、指甲无光泽、皮肤枯黄、肢体麻木、关节曲伸不利、妇女月经量少、色淡、甚则闭经。</div>
      </div>
      <div class="tap-box2" v-if="type === '肾经'">
        <h3>激发</h3>
        <div>感冒、生理期、耳鸣、月经不调、口干舌燥、血压异常、小便量少、色深、浑浊，性欲减退、神经衰弱、足发热发汗、生殖器病变等。</div>
        <h3>亏虚</h3>
        <div>
          耳鸣、健忘、尿频、性欲减退、便秘、元气不足、易疲劳、骨质疏松，畏寒、手脚冰冷、脚气、记忆力下降、注意力不集中、关节疼痛、腰膝酸软、不耐疲劳、脱发白发、眼袋、黑眼圈、肤色晦暗无光泽、肤质粗糙、干燥、出现皱纹、色斑。
        </div>
      </div>
      <div class="tap-box2" v-if="type === '脾经'">
        <h3>激发</h3>
        <div>脾胃不和消化吸收不好、易腹胀气打嗝、头疼、疲倦乏力、膝关节异常、排便异常等。脾气充足，中国人较少见。强烈过敏反应也会提示偏高。</div>
        <h3>亏虚</h3>
        <div>胃弱、膝异常、易失眠、疲劳、食欲不振、大便异常、腹胀等，消化不良，神疲肢冷、下肢水肿，月经失调，痰湿过重造成的肥胖。
          四肢发凉不温，大便不成形稀汤样，腹痛喜欢揉按。小便短少，舌苔发白。四肢乏力，食欲不振，饭后饱胀，舌头肥大有齿印。
          内分泌失调或分泌不足、中国人绝大多数脾虚，和我们的饮食有很大的关系，平均 -20%；长期脾 -40% 以上和糖尿病有密切关系，可以提醒糖尿病风险。
        </div>
      </div>
      <div class="tap-box2" v-if="type === '肺经'">
        <h3>激发</h3>
        <div>呼吸不畅、咽喉异常、胸闷、气喘、扁桃炎、咳嗽、肩背酸痛易患痔疮，也可以由于高原反应、练气功，女性生理周期，怀孕等原因增高。</div>
        <h3>亏虚</h3>
        <div>免疫力下降，天寒手足冰冷、麻痹、咽喉干、慢性咳嗽。</div>
      </div>
      <div class="tap-box2" v-if="type === '胃经'">
        <h3>激发</h3>
        <div>容易饿、胃弱、关节异常、食欲异常、口干、易便秘 、胃酸过多、感染溃疡、咽喉炎、长痘等。</div>
        <h3>亏虚</h3>
        <div>消化不良、易胃胀气和食欲不振、颜面浮肿、易打嗝、饭后容易胃痛、腹泻或呕吐。
        </div>
      </div>
      <div class="tap-box2" v-if="type === '胆经'">
        <h3>激发</h3>
        <div>头痛，头胀，焦虑，口苦等。</div>
        <h3>亏虚</h3>
        <div>大脑供血不足，颈椎病、头昏、耳鸣或者因胆汁排毒代谢不良更容易生成结晶、结石等。</div>
      </div>
      <div class="tap-box2" v-if="type === '膀胱经'">
        <h3>激发</h3>
        <div>膀胱经有火。通常感冒会激发。脑袋强烈思考；喝茶、咖啡或提神饮料也会引起激发。女性生理期也会激发。</div>
        <h3>亏虚</h3>
        <div>头昏，大脑供血不足，小便异常等，脸色暗沉，长斑，毒素内积。</div>
      </div>
    </section>
  </div>
</template>
<script>
import shareHeader from '@/components/share/shareHeader';
import { getQueryString } from '@/utils/index';
export default {
  name: 'record',
  components: {
    'share-header': shareHeader
  },
  data() {
    return {
      appUrl: 'https://itunes.apple.com/cn/app/id1395275648?mt=8', // app下载地址 默认ios
      isShare: false,
      bodyType: '',
      result: {
        // 测试结果
        measurement_result: { heart_rate: 0 },
        // 脏腑辩证
        syndrome_differentiation_explains: [{ label: '无' }],
        //
        // 体质倾向
        constitution_differentiation_explains: [{ label: '平和质' }]
      }, // 存放结果
      testData: '',
      type: '心包经',
      goodsList: [],
      showMaiboView: false,
      // 经络检测指数,显示图谱
      lineWidth: 262,
      JLHeigh: '',
      siner: 0,
      linePic: [],
      from: ''
    };
  },
  created() {
    document.title = '经络介绍';
  },
  mounted() {
    // 获取报告详情
    this.checkMobileAgent();
    this.isShare = getQueryString('share') === '1';
    let from = this.$route.query.from;
    if (from && from === 'doctor') {
      this.from = 'doctor';
    }
  },
  methods: {
    download() {
      window.location.href = this.appUrl;
    },
    // 检测手机终端
    checkMobileAgent() {
      let _this = this;
      let isAndroid = _this.isAndroid();
      if (isAndroid) {
        _this.appUrl = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.kmyy.intellpharmacy&fromcase=40003';
      }
    },
    // 是否安卓终端
    isAndroid() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
      if (isAndroid) {
        return true;
      }
      return false;
    },
    tap(type) {
      this.type = type;
    },
  }
};
</script>
<style lang="less" scoped>
  html {
    height: 200%;
  }
  h1 {
    color: #665120;
    font-weight: 100;
    font-size: 20px;
    margin-top: 10px;
    padding: 18px 10px 0 10px;
    background-color: #FFF;
  }
  h2 {
    color: #665120;
    font-weight: 100;
    font-size: 20px;
    padding: 18px 10px 5px 10px;
    background-color: #FFF;
  }
  h3 {
    color: #665120;
    font-weight: 100;
    font-size: 16px;
    padding: 5px 0;
    background-color: #FFF;
  }
  .container {
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    margin: 0 auto;
    font-family: "SimHei";
    padding: 20px 0;
    /deep/ .download-app {
      top: 0
    }
    padding-top: 60px;
    &.noneHeader {
      padding-top: 0px;
    }
  }
  .box2 {
    /*经络介绍*/
    background-color: #EFF0E8;
    .tap {
      margin-top: 10px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background-color: #FFF;
      ul {
        width: 544px;
        display: flex;
        flex-shrink: 1;
        background-color: #FFF;
        li {
          font-size: 17px;
          color: #333;
          padding: 6px 12px 10px 12px;
          position: relative;
          &:not(:last-child) {
            margin-right: 5px;
          }
          &.active:after {
            position: absolute;
            left: 50%;
            margin-left: -5px;
            bottom: 0;
            display: inline-block;
            content: ' ';
            width: 8.5px;
            height: 5px;
            background: url("img/lh-xz.png");
            background-size: 100% 100%;
            vertical-align: text-bottom;
          }
        }
      }
    }
    .tap-box {
      padding: 10px;
      display: flex;
      padding: 5px 10px;
      font-size: 15px;
      background-color: #FFF;
      .left {
        padding: 10px 0px;
        font-size: 15px;
        line-height: 20px;
        color: #333;
        width: 55%;
        margin-right: 5%;
        height: 270px;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
      }
      .right {
        width: 40%;
        padding-top: 3%;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
    .tap-box2 {
      padding: 10px;
      font-size: 15px;
      padding: 5px 10px;
      background-color: #FFF;
    }
  }
  /*下载页*/
  .downBox {
    display: flex;
    position: fixed;
    background: #FFF;
    width: 100%;
    top: 0;
    padding: 10px 10px 5px 10px;
    justify-content: flex-start;
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .title {
      margin-top: 5px;
      color: #0CCDD3;
      font-size: 18px;
    }
    .info {
      font-size: 16px;
      color: rgb(102, 102, 102);
      line-height: 28px;
    }
    .right {
      color: #0CCDD3;
      .download {
        position: absolute;
        right: 10px;
        border: 1px solid #0CCDD3;
        padding: 5px 10px;
        border-radius: 5px;
        margin-top: 5px;
        font-size: 14px;
        .donwload-icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: url('img/icon_jktt_download@2x.png');
          background-size: 100% 100%;
          margin-right: 5px;
        }
      }
    }
  }
</style>

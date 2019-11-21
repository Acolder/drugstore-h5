<template>
  <div class="container">
    <!--下载页面-->
    <share-header></share-header>
    <section class="box1" id="first">
      <h1>经检测您的体质倾向于:</h1>
      <h2>{{result.constitution_differentiation_explains[0].label}}</h2>
    </section>
    <section class="box1">
      <h1>脏腑辩证倾向于:</h1>
      <h2>{{bodyType}}</h2>
      <h3>测量时间 {{testData}}</h3>
    </section>
    <section class="box2 heart">
      <h1>心率</h1>
      <div class="content">
        <div class="heartNum"><span class="num">{{result.measurement_result.heart_rate}}</span>BMP</div>
      </div>
    </section>
    <section class="box2 maibo">
      <h1 @click="viewMaiboInfo">脉搏波</h1>
      <div class="body" id="main">
      </div>
    </section>
    <section class="box2" id="zhishu">
      <h1>经络检测指数</h1>
      <div class="body" id="zhishuLine" ref="zhishuLine">
        <div class="type star">亏虚</div>
        <div class="type mid">平和</div>
        <div class="type end">强盛</div>
        <div class="point" v-for="(item,index) in linePic" :style="{marginLeft:item.site*siner-6+'px'}" :key="index">
          <div class="cicle"></div>
          <div class="angela" :class="{top:item.foward==='up'}"></div>
          <div class="name" :class="{top:item.foward==='up'}"
               :style="{marginTop: (item.site>0&&item.foward==='up'||item.site<0&&item.foward==='up'?-1:1)*index*16+'px',left:-12+(item.namesite-item.site)+'px'}"
               v-for="(ele ,index) in item.name" v-bind:key="index">{{ele}}
          </div>
        </div>
      </div>
    </section>
    <!--经络解读-->
    <section class="box2" id="jingLuoJieDu">
      <h1>经络解读</h1>
      <div class="detail">
        <div class="body">
          <div class="pa" v-for="item in result.channels_and_collaterals_explain_notices" v-bind:key="item.key">
            {{item.content}}
          </div>
          <div class="pa" v-for="item in result.channels_and_collaterals_explains" v-bind:key="item.key">
            {{item.content}}
          </div>
        </div>
      </div>
    </section>
    <!--经络介绍-->
    <section class="box2" id="jingLuoJieShao">
      <h1>经络介绍</h1>
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
          脾胃管着能量的吸收和分配，脾胃不好，人体“电能”就不够用，“电压” 偏低，使很多器官运作代谢减慢，工作效率降低，或干脆临时停工。如果五脏六腑都不能好好工作，短期还可以用“蓄电池”的能源，长期下去就不够用了，疾病也就出来了。由此看来，养好后天的脾胃发电厂有多么重要!<br/>
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
    </section>
    <!--健康推荐-->
    <section class="box2" v-if="goodsList.length>0">
      <h1>健康推荐</h1>
      <div class="listbox">
        <div class="list">
          <div class="item" v-for=" item in goodsList" :key=" item.id" @click="download">
            <img :src="item.product_main_image" alt="">
            <div class="title">{{item.product_name}}</div>
          </div>
        </div>
      </div>
    </section>
    <!--脉搏说明-->
    <div class="viewMaibo" v-if="showMaiboView">
      <div class="head">
        <div class="close" @click="closeViewMaibo"></div>
      </div>
      <div class="title">说明</div>
      <div class="body">脉搏波由心脏的搏动(振动)沿动脉血管和血流向外周传播而形成。血液从左心室的周期性喷出，供给一个周期性外力,使得所有的动脉壁保持一个稳定的,分布性的径向方向的周期性振动。</div>
    </div>
  </div>
</template>
<script>
import ajax from '@/utils/ajax';
import yhl from '@/utils/javaApiRequest';
import { Toast } from 'mint-ui';
import echarts from 'echarts';
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
      linePic: []
    };
  },
  created() {
    document.title = '脉诊检测报告';
  },
  mounted() {
    // 获取报告详情
    this.checkMobileAgent();
    this.getReportResult();
    this.JLHeigh = this.$refs.imgwidth.offsetWidth * 1.66 + 10;
    this.lineWidth = this.$refs.zhishuLine.offsetWidth;
    this.siner = (this.lineWidth - 12) / 200;
    this.isShare = getQueryString('share') === '1';
    this.writeLineGraph();
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
    // 查看脉搏说明
    viewMaiboInfo() {
      this.showMaiboView = true;
    },
    closeViewMaibo() {
      this.showMaiboView = false;
    },
    increaseName(measurement_result_after) {
      // 1.叠加名称
      for (let m = 0; m < measurement_result_after.length; m++) {
        if (m + 1 < measurement_result_after.length &&
          measurement_result_after[m].site === measurement_result_after[m + 1].site) {
          measurement_result_after[m].name = [
            ...measurement_result_after[m].name,
            ...measurement_result_after[m + 1].name];
          measurement_result_after.splice(m + 1, 1);
          m--;
        }
      }
      // 2.上下交叠
      measurement_result_after.map((item, index) => {
        if (index % 2 === 0) {
          item.foward = 'down';
        } else {
          item.foward = 'up';
        }
        return item;
      });
      // 3.分散dd
      return measurement_result_after;
    },
    fensan(measurement_result_after) {
      for (let i = 0; i < measurement_result_after.length; i++) {
        // 两字段和两字段间隔大于23
        // 两字段和三字段间隔大于30
        // 三字段和三字段间隔大于36
        // 设置退出循环机制.
        if (i < measurement_result_after.length - 2) {
          // 差值存在
          let chazhi = measurement_result_after[i + 2].namesite - measurement_result_after[i].namesite;
          // 求阻断类型,分三种,2,23,33
          let type = '2';
          for (let j = 0; j < measurement_result_after[i].name.length; j++) {
            if (measurement_result_after[i].name[j].length === 3) {
              type = '3';
              break;
            }
          }
          for (let k = 0; k < measurement_result_after[i + 2].name.length; k++) {
            if (measurement_result_after[i + 2].name[k].length === 3) {
              type += '3';
              break;
            }
          }
          if (type === '2' && chazhi < 23) {
            measurement_result_after[i + 2].namesite += (23 - chazhi) / 2;
            measurement_result_after[i].namesite -= (23 - chazhi) / 2;
            if (i >= measurement_result_after.length - 3) {
              break;
            } else {
              this.fensan(measurement_result_after);
              break;
            }
          }
          if (type === '3' || type === '23' && chazhi < 30) {
            measurement_result_after[i + 2].namesite += (30 - chazhi) / 2;
            measurement_result_after[i].namesite -= (30 - chazhi) / 2;
            if (i >= measurement_result_after.length - 3) {
              break;
            } else {
              this.fensan(measurement_result_after);
              break;
            }
          }
          if (type === '33' && chazhi < 36) {
            measurement_result_after[i + 2].namesite += (36 - chazhi) / 2;
            measurement_result_after[i].namesite -= (36 - chazhi) / 2;
            if (i >= measurement_result_after.length - 3) {
              break;
            } else {
              this.fensan(measurement_result_after);
              break;
            }
          }
        }
      }
      return measurement_result_after;
    },
    // 获取报告信息
    getReportResult() {
      let _this = this;
      let record_id = _this.$route.query.record_id;
      ajax.get(`/api/jinmu/getUserInnerReportByTempCache/` + record_id).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          _this.result = resp.data.data.content;
          // bodyType
          this.result.syndrome_differentiation_explains.forEach(item => {
            this.bodyType += item.label + ',';
          });
          this.bodyType = this.bodyType.slice(0, this.bodyType.length - 1);
          setTimeout(() => {
            _this.getGoodslist();
          }, 300);
          _this.writeLineGraph();
          _this.testData = resp.data.data.test_date;
          console.log('获取报告信息', resp.data.data.content);
          // measurement_result 设置经络指数
          let measurement = {
            c0: -10,
            c1: 0,
            c2: 30,
            c3: -20,
            c4: 0,
            c5: -10,
            c6: -30,
            c7: 10,
          };
          // measurement = resp.data.data.content.measurement_result;
          // 重构
          let measurement_result = [
            {
              site: measurement.c0,
              namesite: measurement.c0,
              name: ['心包经']
            },
            {
              site: measurement.c1,
              namesite: measurement.c1,
              name: ['肝经']
            },
            {
              site: measurement.c2,
              namesite: measurement.c2,
              name: ['肾经']
            },
            {
              site: measurement.c3,
              namesite: measurement.c3,
              name: ['脾经']
            },
            {
              site: measurement.c4,
              namesite: measurement.c4,
              name: ['肺经']
            },
            {
              site: measurement.c5,
              namesite: measurement.c5,
              name: ['胃经']
            },
            {
              site: measurement.c6,
              namesite: measurement.c6,
              name: ['胆经']
            },
            {
              site: measurement.c7,
              namesite: measurement.c7,
              name: ['膀胱经']
            },
          ];
          console.info(measurement_result);
          // 1.排序
          measurement_result = measurement_result.sort(function (obj1, obj2) {
            let val1 = obj1.site;
            let val2 = obj2.site;
            if (val1 < val2) {
              return -1;
            } else if (val1 > val2) {
              return 1;
            } else {
              return 0;
            }
          });
          // 2.分组,site>0与site<0
          let measurement_result_before = measurement_result.filter(item => {
            if (item.site < 0) {
              return item;
            } else {
              return false;
            }
          });
          let measurement_result_after = measurement_result.filter(item => {
            if (item.site > 0) {
              return item;
            } else {
              return false;
            }
          });
          // 3.叠加重复site
          measurement_result_after = this.increaseName(measurement_result_after);
          measurement_result_before = this.increaseName(measurement_result_before);
          // 叠加名称函数
          // 4.分散nameSite
          // measurement_result_before = this.fensan(measurement_result_before);
          // measurement_result_after = this.fensan(measurement_result_after);
          let result = [...measurement_result_before, ...measurement_result_after];
          // 5.result 组合
          this.linePic = this.fensan(result);
        }
        else {
          Toast(resp.data.message);
        }
      });
    },
    // 获取商品列表
    getGoodslist() {
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/recommendProduct/getGoldMu`;
      let bodyName = this.result.constitution_differentiation_explains[0].label;
      let bodyType = this.bodyType;
      let lat = this.$route.query.lat;
      let lon = this.$route.query.lon;
      // bodyName = '痰湿质(脉细)';
      // bodyType = '肾阴虚';
      // lat = 21;
      // lat = 23;
      let param = {
        bodyName: bodyName,
        lat: lat,
        lon: lon,
        bodyType: bodyType,
        page: 0,
        pageSize: 10
      };
      yhl.post(url, param).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.resultCode === '0') {
          console.info('经络推荐商品列表:', resp.data.resultData.content);
          resp.data.resultData.content.map((item) => {
            item.product_markprice = Number(item.product_markprice).toFixed(2);
            return item;
          });
          this.goodsList = resp.data.resultData.content;
        } else {
          Toast(resp.data.message);
        }
      });
    },
    // 写入脉搏波
    writeLineGraph() {
      let partial_pulse_wave = this.result.measurement_result.partial_pulse_wave;
      let option = {
        xAxis: {
          type: 'category',
          show: false
        },
        yAxis: {
          type: 'value',
          scale: true,
          show: false
        },
        series: [
          {
            data: partial_pulse_wave,
            type: 'line',
            lineStyle: {
              width: 1
            }
          }]
      };
      let myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
  html {
    height: 200%;
  }
  .container {
    width: 100%;
    margin: 0 auto;
    /* background:  url('img/pla_icon_background@2x.png') 0 600px no-repeat,
                  url('img/pla_icon_backgroundtwo@2x.png') 0 60px no-repeat ,
                  url('img/pla_icon_backgroundtwo@2x.png') 0 600px no-repeat;
     background-size: 100% 800px, 100% 800px , 100% 800px; */
    background: url('img/pla_icon_backgroundtwo@2x.png') 0 60px no-repeat;
    background-size: 100% 100%;
    font-family: "SimHei";
    padding: 20px 0;
    /deep/ .download-app {
      top: 0
    }
    #first {
      margin-top: 60px;
    }
    .box1 {
      padding: 10px 14px 10px 14px;
      color: #7C8A55;
      h1 {
        font-size: 14px;
        font-weight: 100;
      }
      h2 {
        font-size: 20px;
        text-align: center;
        color: #665120;
        margin-top: 20px;
        font-weight: 100;
      }
      h3 {
        font-size: 12px;
        color: #333;
        font-weight: 100;
        text-align: center;
        margin-top: 10px;
      }
    }
    .box2 {
      /*经络指数解读*/
      &#zhishu {
        padding-top: 10px;
        margin: 10px 10px 25px 10px;
        h1 {
          padding-bottom: 20px;
        }
        .body {
          margin: 45px 35px 15px 35px;
          position: relative;
          background: url('img/pla_icon_zhishu@2x.png');
          background-size: 100% 100%;
          padding-top: 3.465%; // 0.043782
          .type {
            position: absolute;
            font-size: 14px;
            &.star {
              left: -33px;
              top: -3px;
              color: #3AAADB;
            }
            &.mid {
              left: 50%;
              top: -19px;
              margin-left: -14px;
              color: #7C8A55;
            }
            &.end {
              right: -33px;
              top: -3px;
              color: #D4544A;
            }
          }
          /*点*/
          .point {
            position: absolute;
            top: 50%;
            height: 12px;
            line-height: 12px;
            margin-top: -6px;
            left: 50%;
            margin-left: -6px;
            .cicle {
              top: 0;
              display: inline-block;
              width: 12px;
              height: 12px;
              background: url('img/pla_icon_yuandd@2x.png');
              background-size: 100% 100%;
            }
            .angela {
              position: absolute;
              display: inline-block;
              width: 8px;
              height: 8px;
              background: url('img/pla_icon_zhiz@2x.png');
              background-size: 100% 100%;
              left: 2px;
              &.top {
                top: -10px;
                transform: rotate(180deg);
              }
            }
            .name {
              position: absolute;
              display: inline-block;
              top: 28px;
              left: -12px;
              width: 36px;
              font-size: 12px;
              color: #7F8075;
              text-align: center;
              &.top {
                top: -28px;
              }
            }
          }
        }
      }
      /*脉搏波*/
      &.maibo {
        margin-top: 0;
        margin-bottom: -50px;
        padding-top: 0px;
        padding-top: 0px;
        .body {
          position: relative;
          height: 200px;
        }
      }
      &.heart {
        .content {
          position: relative;
          padding: 0;
          margin: 20px;
          padding-top: 54.9%;
          background: url("img/pla_icon_xlfwz.png");
          background-size: 100% 100%;
          color: #FFF;
          .num {
            font-size: 28px;
            color: #FFF;
            width: 38px;
            display: inline-block;
          }
          .heartNum {
            font-size: 20px;
            position: absolute;
            bottom: 30.5%;
            left: 50%;
            margin-left: -36px;
            margin-bottom: -12px;
            color: #FFF;
          }
        }
      }
      padding: 10px 5px;
      h1 {
        color: #7C8A55;
        font-weight: 100;
        font-size: 20px;
      }
      h1:before {
        content: ' ';
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('img/pla_icon_siloj@2x.png');
        background-size: 16px 16px;
        margin-right: 5px;
      }
      &.maibo h1:after {
        content: ' ';
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url('img/pla_icon_help@3x.png');
        background-size: 18px 18px;
        margin-left: 5px;
        vertical-align: text-top;
      }
      margin: 10px 10px;
      .content {
        padding: 10px 10px;
        text-align: center;
        color: #AD281E;
      }
      /*经络介绍*/
      .tap {
        margin-top: 10px;
        overflow-y: scroll;
        ul {
          width: 544px;
          display: flex;
          flex-shrink: 1;
          border-bottom: 1px solid #665120;
          li {
            font-size: 17px;
            color: #665120;
            padding: 5px 12px 4px 12px;
            &:not(:last-child) {
              margin-right: 5px;
            }
            &.active {
              background: #665120;
              color: #FFF;
              border-radius: 3px;
            }
          }
        }
      }
      .tap-box {
        display: flex;
        padding: 5px 5px;
        .left {
          padding: 10px 0px;
          font-size: 12px;
          line-height: 16px;
          color: #665120;
          width: 40%;
          margin-right: 12%;
          height: 270px;
          overflow: scroll;
        }
        .right {
          width: 45%;
          padding-top: 3%;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
      /*经络解读*/
      .detail {
        margin-top: 8px;
        background-color: rgba(207, 222, 192, .54);
        padding: 10px 5px;
        .pa {
          padding: 10px 0;
        }
        h2 {
          font-weight: 100;
          font-size: 18px;
          line-height: 24px;
          color: #665120;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .body {
          color: #665120;
          font-size: 15px;
          line-height: 20px;
          margin-bottom: 15px;
        }
      }
    }
  }
  // 健康推荐
  .listbox {
    overflow: scroll;
    .list {
      display: flex;
      flex-shrink: 1;
      padding: 10px;
      .item {
        margin-right: 18px;
        font-size: 14px;
        color: #333;
        width: 100px;
        img {
          width: 100px;
          height: 100px;
          box-shadow: 1px 1px 2px 2px rgba(16, 30, 8, 0.15);
        }
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price {
          color: #333;
          text-align: center;
        }
      }
    }
  }
  /*脉搏说明*/
  .viewMaibo {
    position: fixed;
    top: 20%;
    width: 80%;
    left: 10%;
    padding: 20px;
    box-shadow: 1px 1px 2px 2px rgba(16, 30, 8, 0.15);
    border-radius: 10px;
    background: #FFF;
    text-align: center;
    .head {
      height: 20px;
      text-align: right;
      .close {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('img/pla_icon_close@2x.png');
        background-size: 100% 100%;
      }
    }
    .title {
      font-size: 22px;
      color: rgb(102, 81, 32);
      margin-bottom: 15px;
    }
    .body {
      text-align: left;
      font-size: 16px;
      line-height: 26px;
      color: #665120;
      font-weight: 100;
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

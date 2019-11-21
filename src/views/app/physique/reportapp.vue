<template>
  <div class="reportnew-box">
    <div id="page" @touchmove.stop.prevent="touchMovePage">
      <!--下载页面-->
      <share-header></share-header>
      <ul class="nav-jiedu top" :class="{across:across}">
        <li class="jljd" :class="{active:nav==='jlzs'}" @click.self="tabnav('jlzs')">经络解读</li>
        <li class="tzjd">体质解读</li>
        <li class="jktl">健康调理</li>
      </ul>
      <div class="container" id="body" @touchmove.stop="touchmove"
           @touchend="touchend"
      >
        <section>
          <h3 class="testTime">测量时间: {{testData}}</h3>
        </section>
        <!--概述-->
        <section class="box1">
          <!--<h1>经检测您的体质倾向于:</h1>-->
          <!--<h2>{{result.constitution_differentiation_explains[0].label}}</h2>-->
          <img src="./img/pic_zfbzqx@3x.png" alt="">
          <!--<br>-->
          <!--<h1>脏腑辩证倾向于:</h1>-->
          <div class="type-box">
            <div class="type" v-for="(itemOut,index) in viscera" v-bind:key="index" v-if="!viOk">
              <li class="item" v-for="(item, n) in itemOut" v-bind:key="n">
                <img :src='"./img/18/"+item.key+"@2x.png"' alt="图片" class="body-ok" @click.prevent="">
                <!--<span class="image" :style="{backgroundImage:'url('+'./img/18/'+item.key+'@2x.png'+')'}"></span>-->
                <span v-show="!viOk" @click="jumpZFBZ">{{item.label}}</span>
              </li>
            </div>
            <div v-if="viOk" class="myviOK">
              <img :src='"./img/18/"+viscera2[0].key+"@2x.png"' alt="" class="body-ok">
              <span class="oktext">恭喜您脏腑功能良好</span>
            </div>
          </div>
        </section>
        <!--导航页-->
        <ul class="nav-jiedu" :class="{across:across}">
          <li class="jljd" :class="{active:nav==='jlzs'}" @click.self="tabnav('jlzs')">经络解读</li>
          <li class="tzjd">体质解读</li>
          <li class="jktl">健康调理</li>
        </ul>
        <!--经络指数-->
        <section class="box2" id="jlzs">
          <h1>经络检测指数</h1>
          <div class="tip">数值越接近0越健康</div>
          <ul class="graph" v-if="!jlOK">
            <div class="top">
              <span class="jifa">激发</span>
              <span class="numJia">+100%</span>
            </div>
            <div class="bottom">
              <span class="numJian">-100%</span>
              <span>亏虚</span>
            </div>
            <li class="biaochi">
              <span class="line"></span>
              <span class="num">0</span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name san">
            心包经
             <span class="value" :class="{bellow:result.measurement_result.c0<0}"
                   :style="{
                  height:result.measurement_result.c0>0?(result.measurement_result.c0+'px'):(result.measurement_result.c0*-1+'px'),
                  top:result.measurement_result.c0>0?(-result.measurement_result.c0+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c0>0?(-result.measurement_result.c0-20+'px'):
                  -result.measurement_result.c0+20+'px'
                }">
              {{result.measurement_result.c0 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            肝经
            <span class="value" :class="{bellow:result.measurement_result.c1<0}"
                  :style="{
                  height:result.measurement_result.c1>0?(result.measurement_result.c1*1+'px'):(result.measurement_result.c1*-1+'px'),
                  top:result.measurement_result.c1>0?(-result.measurement_result.c1*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c1>0?(-result.measurement_result.c1*1-20+'px'):
                  -result.measurement_result.c1*1+20+'px'
                }">{{result.measurement_result.c1 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            肾经
             <span class="value" :class="{bellow:result.measurement_result.c2<0}"
                   :style="{
                  height:result.measurement_result.c2>0?(result.measurement_result.c2+'px'):(result.measurement_result.c2*-1+'px'),
                  top:result.measurement_result.c2>0?(-result.measurement_result.c2+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c2>0?(-result.measurement_result.c2-20+'px'):
                  -result.measurement_result.c2+20+'px'
                }">{{result.measurement_result.c2 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            脾经
             <span class="value" :class="{bellow:result.measurement_result.c3<0}"
                   :style="{
                  height:result.measurement_result.c3>0?(result.measurement_result.c3*1+'px'):(result.measurement_result.c3*-1+'px'),
                  top:result.measurement_result.c3>0?(-result.measurement_result.c3*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c3>0?(-result.measurement_result.c3*1-20+'px'):
                  -result.measurement_result.c3*1+20+'px'
                }">{{result.measurement_result.c3 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            肺经
              <span class="value" :class="{bellow:result.measurement_result.c4<0}"
                    :style="{
                  height:result.measurement_result.c4>0?(result.measurement_result.c4*1+'px'):(result.measurement_result.c4*-1+'px'),
                  top:result.measurement_result.c4>0?(-result.measurement_result.c4*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c4>0?(-result.measurement_result.c4*1-20+'px'):
                  -result.measurement_result.c4*1+20+'px'
                }">{{result.measurement_result.c4 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            胃经
             <span class="value" :class="{bellow:result.measurement_result.c5<0}"
                   :style="{
                  height:result.measurement_result.c5>0?(result.measurement_result.c5*1+'px'):(result.measurement_result.c5*-1+'px'),
                  top:result.measurement_result.c5>0?(-result.measurement_result.c5*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c5>0?(-result.measurement_result.c5*1-20+'px'):
                  -result.measurement_result.c5*1+20+'px'
                }">{{result.measurement_result.c5 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            胆经
            <span class="value" :class="{bellow:result.measurement_result.c6<0}"
                  :style="{
                  height:result.measurement_result.c6>0?(result.measurement_result.c6*1+'px'):(result.measurement_result.c6*-1+'px'),
                  top:result.measurement_result.c6>0?(-result.measurement_result.c6*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c6>0?(-result.measurement_result.c6*1-20+'px'):
                  -result.measurement_result.c6*1+20+'px'
                }">{{result.measurement_result.c6 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name san">
            膀胱经
             <span class="value" :class="{bellow:result.measurement_result.c7<0}"
                   :style="{
                  height:result.measurement_result.c7>0?(result.measurement_result.c7*1+'px'):(result.measurement_result.c7*-1+'px'),
                  top:result.measurement_result.c7>0?(-result.measurement_result.c7*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c7>0?(-result.measurement_result.c7*1-20+'px'):
                  -result.measurement_result.c7*1+20+'px'
                }">
             {{result.measurement_result.c7 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
          </ul>
          <div class="jlOK" v-if="jlOK">
            <div class="up">
              <img src="./img/lh_iconjl_0_s.png" alt="">
              <div class="textBox">
                <h5>您的经络柔和有力
                </h5>
                <h5>强弱程度偏向平和
                </h5>
              </div>
              <img src="./img/lh_iconjl_0_x.png" alt="">
            </div>
            <ul class="bottom">
              <li class="biaochi">
                <span class="line"></span>
                <span class="num">0</span>
              </li>
              <li class="jl" style="width: 40px">心包经</li>
              <li class="jl">肝经</li>
              <li class="jl">肾经</li>
              <li class="jl">脾经</li>
              <li class="jl">肺经</li>
              <li class="jl">胃经</li>
              <li class="jl">胆经</li>
              <li class="jl" style="width: 40px">膀胱经</li>
            </ul>
          </div>
        </section>
        <!--1.3经络解读-->
        <section class="box2" id="jljd">
          <h1 @click.self="viewJLInfo">经络解读:</h1>
          <h1 class="introduce" @click.self="introduceChanal" style="color: #DD6D47;">经络介绍</h1>
          <div class="body">
            <div class="pa" v-if="result.channels_and_collaterals_explains"
                 v-for="(item,index) in result.channels_and_collaterals_explains" v-bind:key="item.key">
              <div v-if="result.channels_and_collaterals_strength.length>0" class="label">
                {{result.channels_and_collaterals_strength[index].labels[0].label | myfilter}}
                <div class="jia"
                     v-if="  result.channels_and_collaterals_strength[index].labels[0].label.search(/\+/)>-1"></div>
                <div class="jian"
                     v-if="result.channels_and_collaterals_strength[index].labels[0].label.search(/\-/)>-1"></div>
                <div class="jia"
                     v-if="  result.channels_and_collaterals_strength[index].labels[0].label.search(/\+\+/)>-1"></div>
                <div class="jian"
                     v-if="result.channels_and_collaterals_strength[index].labels[0].label.search(/\-\-/)>-1"></div>
                <div class="jia"
                     v-if="  result.channels_and_collaterals_strength[index].labels[0].label.search(/\+\+\+/)>-1"></div>
                <div class="jian"
                     v-if="result.channels_and_collaterals_strength[index].labels[0].label.search(/\-\-\-/)>-1"></div>
              </div>
              <article>
                {{item.content}}
              </article>
            </div>
            <div class="pa" v-for="item in result.channels_and_collaterals_explain_notices" v-bind:key="item.key">
              <!--<div class="label">提示</div>-->
              <!--<article>-->
              <!--{{item.content}}-->
              <!--</article>-->
              <div style="font-size:13px;color:#868686;margin-top: 20px;">脉象正负20%以内大致正常，请不要过度解读</div>
            </div>
          </div>
        </section>
        <!--心率-->
        <section class="box2" id="heartrate">
          <h1>心率(BMP):</h1>
          <div class="content heart">
            <div class="heartNum">
              <span class="num">{{result.measurement_result.app_heart_rate}}</span>
              <span class="text">平均心率</span>
            </div>
            <!--心跳速度-->
            <div id="rate1" class="rate">0</div>
            <div id="rate2" class="rate">过缓</div>
            <div id="rate3" class="rate">50</div>
            <div id="rate4" class="rate">正常</div>
            <div id="rate5" class="rate">110</div>
            <div id="rate6" class="rate">过速</div>
            <div id="rate7" class="rate">200</div>
            <div class="rateValue-box"
                 :style="{transform:'rotate('+(result.measurement_result.app_heart_rate-100)*1.4+'deg)'}">
              <div class="rateValue"></div>
            </div>
          </div>
          <div class="heartNum2">
            <div class="item">
              <div class="num">{{result.measurement_result.app_lowest_heart_rate}}</div>
              <div class="text">最低心率</div>
            </div>
            <div class="item">
              <div class="num">{{result.measurement_result.app_highest_heart_rate}}</div>
              <div class="text">最高心率</div>
            </div>
          </div>
        </section>
        <!--结束页蒙层-->
        <img src="./img/pla_icon_bgwithe@3x.png" alt="" class="endImg">
        <img src="./img/pla_icon_moreth@3x.png" alt="" class="endMore" @click="focusOn" id="tzjd">
        <h5 class="endH" @click="focusOn">更多</h5>
        <!--脉搏说明-->
        <div class="viewMaibo" v-if="showMaiboView">
          <div class="body"><span class="introduce">说明:</span>脉搏波由心脏的搏动(振动)沿动脉血管和血流向外周传播而形成。血液从左心室的周期性喷出，供给一个周期性外力,使得所有的动脉壁保持一个稳定的,分布性的径向方向的周期性振动。
          </div>
          <div class="bottom">
            <div class="btn-close" @click.self="closeViewMaibo">知道了</div>
          </div>
        </div>
        <div class="viewMaibo" v-if="showJLView">
          <div class="body">
            <span class="introduce">说明:</span>1.经络解读仅对异常的经络指数进行解读,可接受的正常指数不做解读;2.脉象正负20%以内大致正常,请不要过度解读;3.人体的气血时刻在变化,多次测量略有波动属于人体正常现象。
          </div>
          <div class="bottom">
            <div class="btn-close" @click.self="closeviewJLInfo">知道了</div>
          </div>
        </div>
      </div>
    </div>
    <div class="reportnew-phone" v-show="phoneShow">
      <div class="reportnew-phonebox">
        <div class="reportnew-phonetop">
          <div>为方便后续查看本次脉诊检测结果，请录入您的手机号。</div>
          <input type="number" placeholder="请输入您的手机号" v-model="phoneDetail">
          <div class="box-select">
            <div class="babel">
              是否本人:
            </div>
            <select>
              <option value="1">是</option>
              <option value="0">否</option>
            </select>
          </div>
        </div>
        <div class="reportnew-phonebot">
          <div @click="phoneSave">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from '@/utils/ajax';
import yhl from '@/utils/javaApiRequest';
import { Toast, Field } from 'mint-ui';
import shareHeader from '@/components/share/shareHeader';
import { getQueryString } from '@/utils/index';
export default {
  name: 'record',
  components: {
    'share-header': shareHeader,
    Field
  },
  data() {
    return {
      moving: false,
      jlOK: false,
      across: false,
      nav: 'jlzs',
      appUrl: 'https://itunes.apple.com/cn/app/id1395275648?mt=8', // app下载地址 默认ios
      isShare: false,
      bodyType: '',
      result: {
        // 脏腑辩证
        syndrome_differentiation_explains: [{ label: '无' }],
        //
        // 体质倾向
        constitution_differentiation_explains: [{ label: '平和质' }],
        measurement_result: {
          c0: 8,
          c1: -6,
          c2: -4,
          c3: 5,
          c4: 2,
          c5: 1,
          c6: 3,
          c7: 2,
        },
        physical_therapy_explain: {
          f0: 70,
          f1: 80,
          f2: 2,
          f3: 3
        }
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
      pan1: true,
      pan2: true,
      pan3: true,
      physical: {},
      viscera: [],
      viscera2: [],
      gender: 0,
      test_date: 0,
      vi: [],
      viOk: false,
      resultId: 0,
      readCons: [],
      phoneShow: true,
      phoneDetail: null,
      showJLView: false
    };
  },
  created() {
    document.title = '您有一份脉诊报告';
  },
  mounted() {
    // 获取报告详情
    this.checkMobileAgent();
    this.getReportResult();
    this.JLHeigh = 200;
    this.lineWidth = 375;
    this.siner = (this.lineWidth - 12) / 200;
    this.isShare = getQueryString('share') === '1';
    // this.writeLineGraph();
    let _this = this;
    let body = document.getElementById('body');
    body.addEventListener('scroll', function () {
      let scrollTop = body.scrollTop;
      if (scrollTop > 285) {
        _this.across = true;
      } else {
        _this.across = false;
      }
      let xlOffsetTop = document.getElementById('tzjd').offsetTop + 300;
      console.log(xlOffsetTop, '豪赌');
      if (scrollTop >= xlOffsetTop) {
        _this.nav = 'tzjd';
      } else {
        _this.nav = 'jlzs';
      }
    });
    this.moving = 'start';
  },
  filters: {
    myfilter: function (value) {
      return value.replace(/[\+|\-]/g, '');
    },
    myfilter2: function (value) {
      if (value > 0) {
        return '+' + value + '%';
      } else if (value < 0) {
        return value + '%';
      } else {
        return '';
      }
    }
  },
  methods: {
    // 滚动到页面底部
    tabend() {
      setTimeout(function () {
        document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;
      }, 150);
    },
    // 跳转关注公众号
    focusOn() {
      let record_id = this.$route.query.record_id;
      this.$router.push({ path: `/physique/reportnew?record_id=` + record_id });
    },
    jumpZFBZ() {
      let ele = document.getElementById('viscera');
      let offsetTop = ele.offsetTop;
      let body = document.getElementById('body');
      body.scrollTop = offsetTop - 115;
    },
    touchMovePage() {
      console.info('pagemove');
    },
    touchmove(event) {
      this.moving = true;
      console.info(this.moving);
      console.info('move...', event);
    },
    touchend(event) {
      this.moving = false;
      console.info(this.moving);
      console.info('end...', event);
    },
    introduceChanal() {
      this.$router.push({ path: '/physique/channels' });
    },
    tabnav(type) {
      let body = document.getElementById('body');
      this.nav = type;
      let ele = document.getElementById(type);
      console.log(ele, '健康调理');
      let scrollTop = ele.offsetTop;
      console.log(scrollTop);
      body.scrollTop = scrollTop - 115;
    },
    download() {
      if (!this.moving) {
        window.location.href = this.appUrl;
      }
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
    viewJLInfo() {
      this.showJLView = true;
    },
    closeviewJLInfo() {
      this.showJLView = false;
    },
    // 获取报告信息
    getReportResult() {
      let _this = this;
      let record_id = _this.$route.query.record_id;
      let lat = this.$route.query.lat;
      let lon = this.$route.query.lon;
      ajax.post(`/api/jinmu/getUserInnerReportByTempCache/` + record_id, {
        lat: lat,
        lon: lon
      }).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          _this.result = resp.data.data.content;
          // bodyType
          _this.result.syndrome_differentiation_explains.forEach(item => {
            this.bodyType += item.label + ',';
          });
          this.bodyType = this.bodyType.slice(0, this.bodyType.length - 1);
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
          measurement = resp.data.data.content.measurement_result;
          // 重构
          let str = String(measurement.c0) + String(measurement.c1) + measurement.c2 + measurement.c3 +
            measurement.c4 + measurement.c5 + measurement.c6 + measurement.c7;
          if (Number(str) === 0) {
            this.jlOK = true;
          }
          // 体质判断
          let result = resp.data.data.content;
          _this.resultId = resp.data.data._id;
          console.log(resp);
          // 测量时间
          _this.test_date = resp.data.data.test_date;
          // 性别
          if (result.user_profile) {
            _this.gender = result.user_profile.gender;
          }
          // 体质
          if (result.constitution_differentiation_explains[0]) {
            console.log(result.constitution_differentiation_explains);
            _this.physical = result.constitution_differentiation_explains[0];
          }
          // 脏腑
          if (result.syndrome_differentiation_explains) {
            console.log(result.syndrome_differentiation_explains);
            _this.viscera2 = result.syndrome_differentiation_explains.slice();
            let resultArr = result.syndrome_differentiation_explains;
            let arr2 = [];
            while (resultArr.length > 0) {
              if (resultArr.length > 6) {
                arr2.push(resultArr.slice(0, 4));
                resultArr.splice(0, 4);
              } else if (resultArr.length === 6) {
                arr2.push(resultArr.slice(0, 3));
                resultArr.splice(0, 3);
              } else if (resultArr.length === 5) {
                arr2.push(resultArr.slice(0, 3));
                resultArr.splice(0, 3);
              } else if (resultArr.length < 5) {
                arr2.push(resultArr.slice());
                resultArr.length = 0;
              }
            }
            _this.viscera = arr2;
            for (let m = 0; m < _this.viscera2.length; m++) {
              _this.vi.push({
                value: true
              });
            }
            // 脏腑良好
            if (_this.viscera2[0].key === 'Z0018.0') {
              _this.viOk = true;
            }
          }
          this.getRead();
        }
        else {
          Toast(resp.data.message);
        }
      });
    },
    // 获取商品列表 不用来,走李天亮
    getGoodslist() {
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/recommendProduct/getGoldMu`;
      let bodyName = this.result.constitution_differentiation_explains[0].label;
      let bodyType = this.bodyType;
      let lat = this.$route.query.lat;
      let lon = this.$route.query.lon;
      let requestData = {
        bodyName: bodyName,
        bodyType: bodyType,
        page: 0,
        pageSize: 10
      };
      if (lat && lon) {
        requestData = Object.assign(requestData,
          {
            lat: lat,
            lon: lon
          });
      }
      yhl.post(url, requestData).then(resp => {
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
    drawTaiji(canvas) {
      let taijiFont = document.getElementById('maibobo');
      let width = taijiFont.clientHeight;
      canvas.width = width - 8;
      canvas.height = width - 8;
      canvas.style.marginLeft = -width / 2 + 'px';
      let radius = canvas.clientWidth / 2;
      let xPosition = canvas.clientWidth / 2;
      let yPosition = canvas.clientHeight / 2;
      let contextScreen = canvas.getContext('2d');
      contextScreen.fillStyle = '#fa9a6e';
      contextScreen.beginPath();
      contextScreen.arc(xPosition, yPosition, radius, 0 * Math.PI, (0.5) * Math.PI);
      contextScreen.arc(canvas.width / 2, canvas.width * 0.75, radius / 2, 0.5 * Math.PI, 1.5 * Math.PI);
      contextScreen.fill();
      /* 阴指数 */
      contextScreen.beginPath();
      contextScreen.fillStyle = '#8dcdf0';
      contextScreen.arc(xPosition, yPosition, radius, 0.5 * Math.PI, (0.5 + 0.72) * Math.PI);
      contextScreen.arc(xPosition, canvas.width * 0.25, radius / 2, 0 * Math.PI, 0.3 * Math.PI);
      contextScreen.arc(canvas.width / 2, canvas.width * 0.75, radius / 2, 1.3 * Math.PI, 0.5 * Math.PI, true);
      contextScreen.fill();
      contextScreen.stroke();
    },
    viMore(num) {
      let value = !this.vi[num].value;
      this.$set(this.vi, num, { value: value });
    },
    // 养生阅读
    getRead() {
      let _this = this;
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/commonsearch/advancedquerywithtypes`;
      let requestData = {
        keyword: _this.physical.label,
        devicetype: 'h5',
        accountId: _this.resultId,
        page: 0,
        pageSize: 2,
        types: 'news_info'
      };
      if (_this.$route.query.lat && _this.$route.query.lon) {
        requestData = Object.assign(requestData,
          {
            lat: _this.$route.query.lat,
            lon: _this.$route.query.lon
          });
      }
      yhl.post(url, requestData).then(res => {
        if (res.status === 200 && res.data.resultCode === '0') {
          console.log(res, 'res');
          _this.readCons = res.data.resultData.content;
          console.log(_this.readCons, 'eeee');
        }
        else {
          // Toast(res.data.msg);
        }
      });
    },
    // F-2:保存
    phoneSave() {
      let that = this;
      console.log(this.phoneDetail, '手机号');
      if (!this.phoneDetail) {
        Toast('请输入手机号');
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(this.phoneDetail));
        if (reg.test(this.phoneDetail)) {
          let record_id = this.$route.query.record_id;
          ajax.get(`/api/jinmu/UseReoprtSetPhone/` + record_id + `/` + this.phoneDetail).then(resp => {
            console.log(resp, '手机号返回');
            if (resp.status === 200) {
              // Toast('录入手机号成功');
              that.phoneShow = false;
            }
            else {
              Toast('录入手机号失败，请稍后重试');
              that.phoneShow = false;
            }
          });
        } else {
          Toast('请输入正确的手机号');
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
  html {
    height: auto;
    overflow: auto;
  }
  .reportnew-box {
    width: 100%;
    height: 100%;
  }
  #page {
    height: 100%;
    &:before {
      height: 100%;
      width: 100%;
      content: ' ';
      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;
      background: #FFF;
    }
  }
  /*录入手机弹窗*/
  .reportnew-phone {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .reportnew-phonebox {
    width: 270px;
    height: 240px;
    background-color: #FFF;
    border-radius: 7px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 101;
  }
  .reportnew-phonetop {
    padding: 25px 20px;
    font-size: 16px;
    color: #333;
    line-height: 21px;
  }
  .reportnew-phonetop > input {
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: solid 1px #BFBFBF;
    margin-top: 15px;
    font-size: 15px;
    color: #9A9999;
    padding-left: 10px;
  }
  /* 是否本人 */
  .box-select {
    margin-top: 5px;
    display: flex;
    .babel {
      line-height: 40px;
    }
    select {
      flex: 1;
      margin-left: 20px;
      height: 40px;
      border-radius: 2px;
      border: solid 1px #BFBFBF;
      font-size: 15px;
      color: #9A9999;
      padding-left: 10px;
    }
  }
  .reportnew-phonebot {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .reportnew-phonebot > div {
    width: 95px;
    height: 30px;
    background-color: #0CCDD3;
    color: #FFF;
    font-size: 17px;
    border-radius: 6px;
    text-align: center;
    line-height: 30px;
  }
  /*总布局*/
  .container {
    position: relative;
    width: 100%;
    /*height: 100%;*/
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #EFF0E8;
    font-family: "SimHei";
    padding: 20px 0 0;
    /deep/ .download-app {
      top: 0
    }
    /*1.概述*/
    .testTime {
      margin-top: 40px;
      padding: 10px 10px;
      background-color: #EFF0E8;
      text-align: right;
      color: #666;
      font-size: 12px;
      font-weight: 400;
    }
    #first {
      margin-top: 0px;
    }
    .box1 {
      padding: 18px 14px 10px 14px;
      margin-bottom: 15px;
      color: #333;
      background-color: #FFF;
      text-align: center;
      /*h1 {*/
      /*font-size: 15px;*/
      /*font-weight: 100;*/
      /*}*/
      /*h2 {*/
      /*font-size: 20px;*/
      /*text-align: center;*/
      /*color: #665120;*/
      /*margin-top: 20px;*/
      /*font-weight: 100;*/
      /*}*/
      h3 {
        font-size: 12px;
        color: #333;
        font-weight: 100;
        text-align: center;
        margin-top: 10px;
      }
      /*肝肺腑辩证倾向于*/
      .type-box {
        user-select: none;
        cursor: pointer;
      }
      .type {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0 0;
        justify-content: center;
        .item {
          width: 25%;
          margin-bottom: 10px;
          text-align: center;
          cursor: pointer;
          position: relative;
          .image {
            width: 36%;
            padding-top: 36%;
            background-size: 100% 100%;
          }
          img {
            position: absolute;
            left: 50%;
            margin-left: -18%;
            display: inline-block;
            width: 36%;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            z-index: 0;
          }
          span {
            position: relative;
            display: inline-block;
            width: 80%;
            padding-top: 40%;
            font-size: 13px;
            color: #665120;
            text-align: center;
            z-index: 2;
          }
        }
      }
    }
    .box1 > img {
      width: 161px;
      height: 40px;
      display: inline-block;
    }
    .box2 {
      background-color: #FFF;
      margin: 15px 10px;
      border-radius: 10px;
      padding: 12px 10px;
      position: relative;
      h1 {
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
  /*导航*/
  .nav-jiedu {
    background-color: #FFF;
    display: flex;
    padding: 0px 15px;
    &.top {
      display: none;
      position: fixed;
      width: 100%;
      margin-top: 60px;
      border-bottom: 1px solid #14665120;
      box-shadow: 1px 1px 2px 2px #14665120;
      z-index: 1000;
    }
    &.top.across {
      display: flex;
    }
    li {
      flex: 1;
      font-size: 15px;
      color: #333;
      padding: 10px 10px;
      position: relative;
      text-align: center;
      &.active {
        color: #665120;
      }
      &.active:after {
        position: absolute;
        left: 50%;
        bottom: 0;
        display: inline-block;
        content: ' ';
        width: 8.5px;
        height: 5px;
        background: url("img/lh-xz.png");
        background-size: 100% 100%;
        vertical-align: text-bottom;
      }
      &.jljd:before {
        display: inline-block;
        content: ' ';
        width: 18px;
        height: 15px;
        background: url("img/lh-jljd-wxz.png");
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 8px;
      }
      &.tzjd:before {
        display: inline-block;
        content: ' ';
        width: 18px;
        height: 15px;
        background: url("img/lh-tzjd-wxz.png");
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 8px;
      }
      &.jktl:before {
        display: inline-block;
        content: ' ';
        width: 18px;
        height: 15px;
        background: url("img/lh-jktl-wzx.png");
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 8px;
      }
    }
  }
  /*1.1心速*/
  #heartrate {
    position: relative;
    padding-bottom: 0;
    margin-bottom: 0;
    .tip {
      position: absolute;
      top: 15px;
      right: 10px;
      color: #77716A;
    }
    /*0.心速标尺*/
    .rate {
      position: absolute;
      color: #333;
      &#rate1 {
        left: 0;
        bottom: -5px;
      }
      &#rate2 {
        left: -23%;
        bottom: 21%;
      }
      &#rate3 {
        left: -12%;
        top: 29%;
      }
      &#rate4 {
        left: 19%;
        margin-left: -14px;
        top: -12%;
      }
      &#rate5 {
        right: 23%;
        top: -14%;
      }
      &#rate6 {
        right: -27%;
        bottom: 48%;
      }
      &#rate7 {
        right: -15px;
        bottom: -5px;
      }
    }
    /*1.平均心率*/
    .heart.content {
      position: relative;
      margin: 40px 29% 24px;
      padding-top: 37%;
      background: url("img/lh_xl.png");
      background-size: 100% 100%;
      color: #FFF;
      .heartNum {
        font-size: 30px;
        position: absolute;
        left: 50%;
        top: 80%;
        margin-left: 0px;
        color: #666;
        margin-left: -24px;
        text-align: center;
        font-size: 30px;
        .text {
          display: block;
          font-size: 12px;
          color: #333;
        }
        .num {
          font-size: 30px;
          color: #666;
          display: inline-block;
        }
      }
      .rateValue-box {
        position: absolute;
        width: 100%;
        padding-top: 100%;
        left: 0;
        top: 0;
        transform: rotate(0deg);
        .rateValue {
          position: absolute;
          width: 14px;
          height: 12px;
          background: url('./img/lh-zz.png');
          transform: rotate(180deg);
          left: 50%;
          margin-left: -7px;
          top: 10px;
        }
      }
    }
    /*2.波动心率*/
    .heartNum2 {
      display: flex;
      margin-top: 30px;
      margin-bottom: 36px;
      position: relative;
      .item {
        flex: 1;
        text-align: center;
        position: relative;
        &:first-child:after {
          display: inline-block;
          position: absolute;
          content: ' ';
          width: 1px;
          height: 20px;
          background-color: #FA913C;
          right: 0;
          top: 5px;
        }
        .text {
          display: block;
          font-size: 12px;
          color: #333;
        }
        .num {
          font-size: 25px;
          color: #FA913C;
          display: inline-block;
        }
      }
    }
  }
  /*1.2脉搏波*/
  #maibobo {
    margin-top: 15px;
    width: 100%;
    position: relative;
    h1 {
      position: absolute;
      z-index: 5;
      top: 29px;
    }
    h1:after {
      content: ' ';
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url('img/lh-ts.png');
      background-size: 14px 14px;
      margin-left: 5px;
      vertical-align: text-top;
    }
    #main {
      margin-top: -50px;
      height: 220px;
      margin-bottom: -60px;
    }
  }
  /*1.3经络解读*/
  #jljd {
    position: relative;
    h1 {
      margin-bottom: 20px;
    }
    h1:after {
      content: ' ';
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url('img/lh-ts.png');
      background-size: 14px 14px;
      margin-left: 5px;
      vertical-align: text-top;
    }
    .introduce {
      position: absolute;
      right: 0;
      top: 20px;
      right: 10px;
      color: #665120;
      &:after {
        display: inline-block;
        content: ' ';
        background: url('./img/icon_jljs.png');
        background-size: 100% 100%;
        width: 15px;
        height: 15px;
        vertical-align: text-bottom;
        margin-left: 5px;
      }
    }
    .label {
      font-size: 18px;
      color: #665120;
      margin: 20px 0;
      .jia {
        display: inline-block;
        background: url('./img/lh-zj.png');
        width: 15px;
        height: 15px;
        background-size: 100% 100%;
      }
      .jian {
        display: inline-block;
        background: url('./img/lh-fj.png');
        background-size: 100% 100%;
        width: 14px;
        height: 6px;
        vertical-align: middle;
      }
    }
    article {
      font-size: 15px;
      color: #333;
    }
  }
  /*1.5 经络指数*/
  /*体质结果*/
  .heartrate-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 80px;
      height: 74px;
      text-align: center;
    }
    .heartrate-headerName {
      font-size: 18px;
      color: #665120;
      margin-top: 20px;
    }
    .heartrate-headerTime {
      margin-top: 10px;
      img {
        width: 9px;
        height: 9px;
      }
      span {
        font-size: 11px;
        color: #77716A;
        margin-right: 6px;
      }
    }
  }
  .heartrate-box {
    position: relative;
    border: solid 2px #EBEDDB;
    margin-top: 35px;
    .box-nameout {
      position: absolute;
      top: -11px;
      left: 20px;
      display: flex;
      .boxname-left {
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/title_left.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .boxname {
        white-space: nowrap;
        height: 20px;
        padding-left: 3px;
        padding-right: 3px;
        font-size: 15px;
        color: #333;
        background: url("./img/title_mid.png");
        background-position: 50% 100%;
        background-size: 100% 50%;
        background-repeat: no-repeat;
      }
      .boxname-right {
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/title_right.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .more-box {
      position: absolute;
      top: -11px;
      right: 13px;
      display: flex;
      height: 40px;
      width: 50px;
      background-color: #FFF;
      .more-bottom {
        position: absolute;
        width: 100%;
        height: 10px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/xh_more_bg.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .boxname {
        position: absolute;
        right: 13px;
      }
      .more-right {
        position: absolute;
        top: -3px;
        right: 5px;
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/xh_arrow_right.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .heartrate-imgSize {
      width: 49px;
      height: 22px;
      position: absolute;
      right: 15px;
    }
    .heartrate-boxAn {
      top: -11px;
    }
    .heartrate-boxUp {
      bottom: -11px;
    }
    .more {
      position: absolute;
      right: 15px;
      top: -13px;
      width: 58px;
      text-align: center;
      white-space: nowrap;
      height: 20px;
      padding-left: 3px;
      padding-right: 3px;
      font-size: 15px;
      color: #333;
      background: url("./img/title_mid.png");
      background-position: 50% 100%;
      background-size: 100% 50%;
      background-repeat: no-repeat;
    }
    .heartrate-content {
      line-height: 25px;
      margin: 18px 12px 20px;
      h6 {
        color: #665120;
        font-size: 17px;
      }
      p {
        color: #333;
        font-size: 15px;
        line-height: 25px;
      }
    }
    .pan {
      position: relative;
      /* &:after{
         font-size: 13px;
         content: ' ... ';
         display: inline-block;
         position: absolute;
         right: 7px;
         bottom: 0;
         color: #000;
         background: #fff;
         padding: 2px 4px;
       }*/
    }
  }
  .viscera-header {
    margin: 15px 10px;
    font-size: 15px;
    color: #333;
    ul {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      margin-top: 15px;
      &:after {
        display: block;
        content: ' ';
        clear: both;
      }
      li {
        text-align: center;
        width: 50%;
        img {
          width: 100px;
          height: 78.64px;
        }
        span {
          display: inline-block;
          text-align: center;
          font-size: 16px;
          color: #665120;
          margin-top: 10px;
          margin-bottom: 10px;
          width: 88px;
        }
      }
    }
  }
  .viscera-good {
    padding: 18px 15px 15px;
    li {
      line-height: 25px;
      h6 {
        font-size: 17px;
        color: #665120;
      }
      p {
        font-size: 14px;
        color: #333;
      }
      .viscera-goodImg {
        display: flex;
        margin: 10px 0 0;
        img {
          width: 111px;
          height: 111px;
          background: #333;
        }
        div {
          flex: 1;
          padding-left: 15px;
          span {
            font-size: 17px;
            color: #333;
          }
          p {
            font-size: 15px;
            color: #77716A;
            line-height: 18px;
            margin-top: 5px;
          }
        }
      }
    }
  }
  #jlzs {
    .tip {
      position: absolute;
      font-size: 11px;
      color: #77716A;
      right: 17px;
      top: 14px;
    }
    .graph {
      display: flex;
      position: relative;
      padding: 45px 8px;
      .top, .bottom {
        position: absolute;
        font-size: 12px;
      }
      .top {
        top: 8px;
        left: -4px;
        text-align: center;
        span {
          display: block;
          line-height: 16px;
        }
      }
      .bottom {
        bottom: 8px;
        left: -4px;
        text-align: center;
        span {
          display: block;
          line-height: 16px;
        }
      }
      .item {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        margin-left: 5px;
        .name {
          padding: 2px;
          position: relative;
          width: 28px;
          color: #665120;
          &.san {
            width: 40px;
          }
          .value {
            position: absolute;
            width: 12px;
            background: linear-gradient(#D4544A, #FDCE30);
            height: 20px;
            border-radius: 5px;
            left: 50%;
            margin-left: -6px;
            &.bellow {
              background: linear-gradient(#48DFE7, #3AAADB);
            }
          }
          .valueNum {
            position: absolute;
            left: 50%;
            margin-left: -9px;
            top: -40px;
          }
        }
        .line {
          display: inline-block;
          width: 3px;
          height: 100px;
        }
        &:not(:last-child) .name:after {
          content: " ";
          position: absolute;
          right: -5px;
          width: 2px;
          height: 6px;
          background-color: #CCC;
          top: 9px;
        }
      }
      .biaochi {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        .line {
          display: inline-block;
          width: 3px;
          height: 100px;
          background-color: #E5E7DC;
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
    z-index: 1005;
    .title {
      font-size: 22px;
      color: rgb(102, 81, 32);
      margin-bottom: 15px;
    }
    .introduce {
      font-weight: 700;
    }
    .body {
      text-align: left;
      font-size: 16px;
      line-height: 26px;
      color: #333;
      font-weight: 100;
    }
    .bottom {
      .btn-close {
        display: inline-block;
        padding: 5px 10px;
        border: 1px solid #835F0C;
        border-radius: 5px;
      }
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
  .myviOK {
    text-align: center;
    position: relative;
    margin: 10px 0 1px;
    img {
      width: 69%;
    }
    .oktext {
      position: absolute;
      width: 130px;
      left: 50%;
      top: 50%;
      color: #FFF;
      margin-top: -13px;
      margin-left: -65px;
    }
  }
  .jlOK {
    text-align: center;
    margin-top: 52px;
    .up {
      .textBox {
        padding: 2px 0px;
        h5 {
          color: #665120;
          font-size: 18px;
          font-weight: 400;
          line-height: 23px;
        }
      }
      img {
        width: 60px;
      }
    }
    .bottom {
      display: flex;
      position: relative;
      padding: 45px 8px;
      .biaochi {
        position: relative;
        width: 10px;
        .line {
          position: absolute;
          display: inline-block;
          width: 3px;
          height: 25px;
          background-color: #E5E7DC;
          top: -27px;
          left: 50%;
          margin-left: -1.5px;
          border-radius: 1px;
        }
      }
      .jl {
        flex-grow: 1;
        align-items: center;
        font-size: 10px;
        margin-left: 5px;
        position: relative;
        width: 28px;
        color: #665120;
        &:not(:last-child):after {
          content: " ";
          position: absolute;
          right: 50%;
          margin-right: -18px;
          width: 2px;
          height: 6px;
          background-color: #CCC;
          top: 50%;
          margin-top: -3px;
        }
        &:nth-child(2)::after {
          content: " ";
          position: absolute;
          right: 50%;
          margin-right: -25px;
          width: 2px;
          height: 6px;
          background-color: #CCC;
          top: 50%;
          margin-top: -3px;
        }
      }
    }
  }
  /*结尾蒙层*/
  .endImg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 400px;
    z-index: 10;
  }
  .endMore {
    width: 40px;
    height: 62px;
    position: absolute;
    bottom: 36px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    z-index: 11;
  }
  .endH {
    display: inline-block;
    font-size: 13px;
    color: #0CCDD3;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    z-index: 11;
    text-align: center;
    font-weight: normal;
  }
</style>

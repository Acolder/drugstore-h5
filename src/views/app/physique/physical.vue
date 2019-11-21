<template>
  <div class="container">
    <!--下载页面-->
    <!--<share-header></share-header>-->
    <!--切换页-->
    <ul class="nav-jiedu">
      <li class="jljd active">经络解读</li>
      <li class="tzjd">体质解读</li>
      <li class="llzs">理疗指数</li>
    </ul>
    <!--体质-->
    <section class="box2" id="heartrate">
      <div class="heartrate-header">
        <img src="./img/xh_icon_man.png" alt="" v-show="gender == 0">
        <img src="./img/xh_icon_woman.png" alt="" v-show="gender == 1">
        <div class="heartrate-headerName">{{physical.label}}</div>
        <div class="heartrate-headerTime">
          <img src="./img/xh_icon_time.png" alt="">
          <span>{{test_date}}</span>
        </div>
      </div>
      <!--体质表现-->
      <div class="heartrate-box">
        <div style="background: #ffffff" class="box-nameout">
          <div class="boxname-left"></div>
          <div class="boxname">体质表现</div>
          <div class="boxname-right"></div>
        </div>
        <img src="" alt="">
        <img src="./img/xh_icon_zk.png" alt="" class="heartrate-boxAn heartrate-imgSize" @click="anMore('pan1')" v-show="pan1">
        <img src="./img/xh_icon_sq.png" alt="" class="heartrate-boxUp heartrate-imgSize"  @click="anMore('pan1')" v-show="!pan1">
        <div class="heartrate-content pan" v-show="pan1">
          <!--<h6>气虚质（脉弱）</h6>-->
          <p class="heartrate-pan pan" v-html="physical.content">
          </p>
        </div>
        <div class="heartrate-content" v-show="!pan1">
          <!--<h6>气虚质（脉弱）</h6>-->
          <p class="heartrate-pan pan" v-html="physical.content">
          </p>
        </div>
      </div>
      <!--调理建议-->
      <div class="heartrate-box">
        <div style="background: #ffffff" class="box-nameout">
          <div class="boxname-left"></div>
          <div class="boxname">调理建议</div>
          <div class="boxname-right"></div>
        </div>
        <img src="" alt="">
        <img src="./img/xh_icon_zk.png" alt="" class="heartrate-boxAn heartrate-imgSize" @click="anMore('pan2')" v-show="pan2">
        <img src="./img/xh_icon_sq.png" alt="" class="heartrate-boxUp heartrate-imgSize"  @click="anMore('pan2')" v-show="!pan2">
        <div class="heartrate-content pan" v-show="pan2">
          <!--<h6> 饮食：</h6>-->
          <p class="heartrate-pan" v-html="physical.content2">
            多食具壮阳效用的食品，诸如羊肉、狗肉、鹿肉、鸡肉。天气冷，为增加热量，改善手脚冰凉要有意进补。北方冬季寒冷，可补温热食品，如牛、羊肉或狗肉；而南方气候较温和，应清补甘温
            可补温热食品。
            生活：
            容易怕冷，手脚不温，喜欢吃温热的饮食，对冷的饮食比较抗拒，精神不振
          </p>
        </div>
        <div class="heartrate-content" v-show="!pan2">
          <!--<h6> 饮食：</h6>-->
          <p class="heartrate-pan"  v-html="physical.content2">
            多食具壮阳效用的食品，诸如羊肉、狗肉、鹿肉、鸡肉。天气冷，为增加热量，改善手脚冰凉要有意进补。北方冬季寒冷，可补温热食品，如牛、羊肉或狗肉；而南方气候较温和，应清补甘温
            可补温热食品。
            生活：
            容易怕冷，手脚不温，喜欢吃温热的饮食，对冷的饮食比较抗拒，精神不振
          </p>
        </div>
      </div>
      <!--养生药食-->
      <ul class="heartrate-box viscera-good" v-show="viOk">
        <div style="background: #ffffff" class="box-nameout">
          <div class="boxname-left"></div>
          <div class="boxname">养生药食</div>
          <div class="boxname-right"></div>
        </div>
        <li v-for="goodOk in physical.product" v-bind:key="goodOk.id">
          <!--<h6>{{good.product_name}}：</h6>-->
          <p v-html="goodOk.product_introduce">
          </p>
          <div class="viscera-goodImg">
            <img :src="goodOk.product_pic" alt="">
            <div>
              <span>{{goodOk.product_name}}</span>
              <p>{{goodOk.description}}</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <!--脏腑解读-->
    <section class="box2" id="viscera">
      <div class="viscera-header">
        <h5>脏腑解读：</h5>
        <ul>
          <li v-for="item in viscera" v-bind:key="item.index">
            <img :src='"./img/18/"+item.key+".@2x.png"' alt="" class="body-ok">
            <span v-show="!viOk">{{item.label}}</span>
          </li>
        </ul>
      </div>
      <div v-for="(item, index) in viscera" v-bind:key="item.key">
        <!--症状表现-->
        <div class="heartrate-box">
          <div style="background: #ffffff" class="box-nameout">
            <div class="boxname-left"></div>
            <div class="boxname">{{item.label}}症状表现</div>
            <div class="boxname-right"></div>
          </div>
          <img src="" alt="">
          <img src="./img/xh_icon_zk.png" alt="" class="heartrate-boxAn heartrate-imgSize" @click="viMore(index)" v-show="vi[index].value">
          <img src="./img/xh_icon_sq.png" alt="" class="heartrate-boxUp heartrate-imgSize"  @click="viMore(index)" v-show="vi[index].value == false">
          <div class="heartrate-content pan" v-show="vi[index]">
            <!--<h6>气虚质（脉弱）</h6>-->
            <p class="heartrate-pan" v-html="item.content" :class="{pan:vi[index].value}">
            </p>
          </div>
          <div class="heartrate-content" v-show="!vi[index]">
            <!--<h6>气虚质（脉弱）</h6>-->
            <p class="heartrate-pan"  v-html="item.content">
            </p>
          </div>
        </div>
        <!--养生药食-->
        <ul class="heartrate-box viscera-good" v-show="(item.product) && !viOk">
          <div style="background: #ffffff" class="box-nameout">
            <div class="boxname-left"></div>
            <div class="boxname">养生药食</div>
            <div class="boxname-right"></div>
          </div>
          <li v-for="good in item.product" v-bind:key="good.id">
            <!--<h6>{{good.product_name}}：</h6>-->
            <p v-html="good.product_introduce">
            </p>
            <div class="viscera-goodImg">
              <img :src="good.product_pic" alt="">
              <div>
                <span>{{good.product_name}}</span>
                <p>{{good.description}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!--养生阅读-->
    <dl class="box2" id="read">
      <dt>
        养生阅读：
      </dt>
      <dd v-for="news in readCons" v-bind:key="news.id">
        <div>
          <h5>{{news.title}}</h5>
          <div class="span">
            <span>{{news.sourceName}} {{news.readingQuantity}}阅读量</span>
            <span style="min-width: 65px;">{{news.lastModifiedTime_parse}}</span>
          </div>
        </div>
        <div class="imgIn" v-show="news.news_type == 1">
          <img :src="news.mainImage" alt="">
        </div>
      </dd>
    </dl>
  </div>
</template>
<script>
import ajax from '@/utils/ajax';
import yhl from '@/utils/javaApiRequest';
import { Toast } from 'mint-ui';
import shareHeader from '@/components/share/shareHeader';
export default {
  name: 'record',
  components: {
    'share-header': shareHeader
  },
  data() {
    return {
      pan1: true,
      pan2: true,
      pan3: true,
      physical: {},
      viscera: [],
      gender: 0,
      test_date: 0,
      vi: [],
      viOk: false,
      resultId: 0,
      readCons: []
    };
  },
  created() {
    document.title = '分析报告';
  },
  mounted() {
    this.getReportResult();
  },
  methods: {
    // 展开 收起
    anMore(panName) {
      this[panName] = !this[panName];
    },
    viMore(num) {
      this.vi[num].value = !this.vi[num].value;
    },
    // 获取报告信息
    getReportResult() {
      let _this = this;
      let record_id = _this.$route.query.record_id;
      ajax.post(`/api/jinmu/getUserInnerReportByTempCache/` + record_id, {
        record_id: record_id,
        lat: _this.$route.query.lat,
        lon: _this.$route.query.lon
      }).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
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
            _this.viscera = result.syndrome_differentiation_explains;
            for (let m = 0; m < _this.viscera.length; m++) {
              _this.vi.push({
                value: true
              });
            }
            // 脏腑良好
            if (_this.viscera[0].key === 'Z0018.0') {
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
    // 养生阅读
    getRead() {
      let _this = this;
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/commonsearch/advancedquerywithtypes`;
      yhl.post(url, {
        keyword: _this.physical.label,
        devicetype: 'h5',
        lat: _this.$route.query.lat,
        lon: _this.$route.query.lon,
        accountId: _this.resultId,
        page: 0,
        pageSize: 2,
        types: 'news_info'
      }).then(res => {
        if (res.status === 200 && res.data.resultCode === '0') {
          console.log(res, 'res');
          _this.readCons = res.data.resultData.content;
          console.log(_this.readCons, 'eeee');
        }
        else {
          Toast(res.data.msg);
        }
      });
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
    background-color: #EFF0E8;
    font-family: "SimHei";
    padding: 20px 0;
    /deep/ .download-app {
      top: 0
    }
    /*1.测试时间*/
    .testTime {
      margin-top: 40px;
      padding: 10px 10px;
      background-color: #EFF0E8;
      text-align: right;
      color: #666;
      font-size: 12px;
      font-weight: 400;
    }
    .box2 {
      background-color: #FFF;
      margin: 20px 10px;
      border-radius: 10px;
      padding: 15px 10px;
      position: relative;
    }
  }
  /*解读导航*/
  .nav-jiedu {
    background-color: #FFF;
    display: flex;
    padding: 0px 15px;
    li {
      flex: 1;
      font-size: 15px;
      color: #333;
      padding: 10px 10px;
      position: relative;
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
      &.llzs:before {
        display: inline-block;
        content: ' ';
        width: 18px;
        height: 15px;
        background: url("img/lh-llzs-wxz.png");
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 8px;
      }
    }
  }
  /*体质结果*/
  .heartrate-header{
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content:center;
    img{
      width: 44px;
      height: 44px;
      text-align: center;
    }
    .heartrate-headerName{
      font-size: 18px;
      color: #665120;
      margin-top: 20px;
    }
    .heartrate-headerTime{
      margin-top:10px;
      img{
        width: 9px;
        height: 9px;
      }
      span{
        font-size: 11px;
        color: #77716a;
        margin-right:6px;
      }
    }
  }
  .heartrate-box{
    position: relative;
    border: solid 2px #ebeddb;
    margin-top:20px;
    .box-nameout{
      position: absolute;
      top:-11px;
      left:20px;
      display: flex;
      .boxname-left{
        width:6px;
        height: 15px;
        background: #ffffff;
        margin-top: 10px;
        background: url("./img/title_left.png");
        background-size:100%;
        background-repeat: no-repeat;
      }
      .boxname{
        white-space:nowrap;
        height: 20px;
        padding-left: 3px;
        padding-right: 3px;
        font-size: 15px;
        color: #333333;
        font-weight: bold;
        background: url("./img/title_mid.png");
        background-position: 50% 100%;
        background-size:100% 50%;
        background-repeat: no-repeat;
      }
      .boxname-right{
        width:6px;
        height: 15px;
        background: #ffffff;
        margin-top: 10px;
        background: url("./img/title_right.png");
        background-size:100%;
        background-repeat: no-repeat;
      }
    }
    .heartrate-imgSize{
      width:49px;
      height: 22px;
      position: absolute;
      right:15px;
    }
    .heartrate-boxAn{
      top:-11px;
    }
    .heartrate-boxUp{
      bottom: -11px;
    }
    .heartrate-content{
      line-height:25px;
      margin:2px 12px 20px;
      h6{
        color: #665120;
        font-size: 17px;
      }
      p{
        color: #333333;
        font-size: 15px;
      }
    }
    .pan{
      position: relative;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      display: -moz-box;
      -moz-line-clamp:3 !important;
      -moz-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      /*p::after {*/
        /*background: linear-gradient(to right, rgba(255, 255, 255, 0), #FFFFFF 50%) repeat scroll 0 0 rgba(0, 0, 0, 0);*/
        /*bottom: 0;*/
        /*content: "...";*/
        /*padding: 0 5px 1px 30px;*/
        /*right: 0;*/
      /*}*/
    }
  }
  .viscera-header{
    magrin:15px 10px;
    font-size: 15px;
    color: #333333;
    ul{
      display: flex;
      flex-direction: row;
      justify-content:space-around;
      margin-top: 15px;
      li{
        display: flex;
        flex-direction: column;
        img{
          width:105px;
          height: 73px;
        }
        span{
          text-align: center;
          font-size: 16px;
          color: #665120;
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .viscera-good{
    padding:30px 15px 15px;
    li{
      line-height: 25px;
      h6{
        font-size: 17px;
        color: #665120;
      }
      p{
        font-size: 14px;
        color: #333333;
      }
      .viscera-goodImg{
        display: flex;
        margin:10px 0;
        img {
          width:111px;
          height: 111px;
          background: #333333;
        }
        div{
          flex: 1;
          padding-left: 15px;
          span{
            font-size: 17px;
            color: #333333;
          }
          p{
            font-size: 15px;
            color: #77716a;
            line-height: 18px;
            margin-top: 5px;
          }
        }
      }
    }
  }
  #read{
    padding: 15px 0px 15px 10px;
    dt{
      font-size: 15px;
      color: #333333;
      padding-bottom:15px ;
      font-weight: bold;
    }
    dd{
      line-height: 25px;
      padding-top: 15px;
      padding-bottom: 15px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      flex-direction:row;
      justify-content:space-between;
      div:first-child{
        flex:1;
        width:100%;
        margin-right:15px;
        .span{
          width: 100%;
          display: flex;
          justify-content:space-between;
          span{
            display: inline-block;
            font-size: 13px;
            color: #666666;
          }
        }
      }
      .imgIn{
        width: 100px;
        height: 75px;
        margin-right: 5px;
        img{
          width: 100px;
          height: 75px;
          border: 1px solid #e0e0e0;
          background:red;
        }
      }
      h5{
        font-weight: normal;
        font-size: 16px;
        color: #333333;
      }
    }
  }
</style>

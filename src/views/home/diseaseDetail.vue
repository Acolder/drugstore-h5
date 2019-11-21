<template>
  <div id="diseaseDetail">
    <mt-header title="病症详情">
      <mt-button class="cd" slot="left"></mt-button>
    </mt-header>
    <div class="content-wrap">
      <div class="content">
        <div class="disease">
          <div class="title">
            <i class="icon-jb"></i>
            <div class="title-right">
              <h6>呼吸性细支气管相关的间质性肺疾病</h6>
              <i class="icon-down" @click="diseaseShow" :class="{'icon-up':diseaseUp}"></i>
            </div>
          </div>
          <div class="subtitle" v-show="diseaseUp">
            <p>呼吸性细支气管相关的间质性肺疾病(respiratory bronchiolitis-associated interstitial lung disease ,RBILD)在20世纪80年代初被认识......</p>
          </div>
        </div>
        <div class="visit">
          <div class="title">
            <i class="icon-jzks"></i>
            <div class="title-right">
              <h6>就诊科室：呼吸内科</h6>
              <i class="icon-down" @click="visitShow" :class="{'icon-up':visitUp}"></i>
            </div>
          </div>
          <div class="option" v-show="visitUp">
            <div class="option-index">
              <i class="dot"></i>
              <span class="text">相关症状</span>
              <i class="icon-up"></i>
            </div>
            <div class="option-index">
              <i class="dot"></i>
              <span class="text">并发症</span>
              <i class="icon-down"></i>
            </div>
            <div class="option-detail">
              <span v-for="(item,index) in detailData" :key="index">{{item}}</span>
            </div>
            <div class="option-index">
              <i class="dot"></i>
              <span class="text">易感人群</span>
              <i class="icon-down"></i>
            </div>
            <div class="option-index">
              <i class="dot"></i>
              <span class="text">治愈率</span>
              <i class="icon-down"></i>
            </div>
          </div>
        </div>
        <div class="drugs">
          <div class="title">
            <i class="icon-cyyp"></i>
            <div class="title-right">
              <h6>常用药品</h6>
              <i class="icon-down" @click="oftenShow" :class="{'icon-up':oftenUp}"></i>
            </div>
          </div>
          <div class="drugs-index" v-show="oftenUp">
            <p>醋酸泼尼松片</p>
            <p>清热消炎宁片</p>
          </div>
        </div>
        <div class="therapy">
          <div class="title">
            <i class="icon-xglf"></i>
            <div class="title-right">
              <h6>相关疗法</h6>
              <i class="icon-down" @click="therapyShow" :class="{'icon-up':therapyUp}"></i>
            </div>
          </div>
          <div class="drugs-index" v-show="therapyUp">
            <div class="option-index" v-for="(item,index) in describeData" :key="index">
              <div class="top">
                <i class="dot"></i>
                <span class="text">{{item.title}}</span>
                <i class="icon-down"></i>
              </div>
              <div class="describe">
                <span v-for="(list,j) in item.list" :key="j">{{list}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="about">
          <div class="title">
            <i class="icon-xgjb"></i>
            <div class="title-right">
              <h6>相关疾病</h6>
              <i class="icon-down" @click="aboutShow" :class="{'icon-up': aboutUp}"></i>
            </div>
          </div>
          <div class="option" v-show="aboutUp">
            <span class="aption-index" v-for="(item,index) in aboutData" :key="index">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Header, Button } from 'mint-ui';
export default {
  data() {
    return {
      diseaseUp: true,
      visitUp: true,
      oftenUp: true,
      therapyUp: true,
      aboutUp: true,
      describeData: [
        {
          title: '检查方式',
          list: ['肺容积', '胸部平片', '胸部', '胸部CT检查', '肺功能检查']
        },
        { title: '治疗方式', list: ['药物治疗', '支持性治疗'] },
        {
          title: '预防护理',
          list: [
            '1.注意适当休息，勿过劳，掌握动静结合，休息好，有利于疲劳的恢复；运动可以增强体力，增强抗病能力，两者相结合......'
          ]
        }
      ],
      aboutData: [
        '肺气肿',
        '特发性肺纤维化',
        '脱屑性间质性肺',
        '非特异性间质肺',
        '急性间质性肺炎',
        '慢性阻塞性肺疾',
        '肺心病'
      ],
      detailData: [
        '肺气肿',
        '特发性肺纤维化',
        '非特异性间质肺',
        '急性间质性肺炎',
        '慢性阻塞性肺疾',
        '肺心病'
      ]
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button
  },
  methods: {
    // 点击收起展开
    diseaseShow() {
      this.diseaseUp = !this.diseaseUp;
    },
    visitShow() {
      this.visitUp = !this.visitUp;
    },
    oftenShow() {
      this.oftenUp = !this.oftenUp;
    },
    therapyShow() {
      this.therapyUp = !this.therapyUp;
    },
    aboutShow() {
      this.aboutUp = !this.aboutUp;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.cd {
  background: url("./imgs/icon-cd@2x.png") no-repeat;
  width: 23px;
  height: 17px;
  background-size: 100%;
}
.content-wrap{
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  padding-left: 18px;
  background: #fff;
  z-index: 1;
}
.content {
  border-left: 2px solid #eeeeee;
  .title {
    height: 40px;
    display: flex;
    line-height: 40px;
    .icon-jb {
      background: url("./imgs/icon-jb@2x.png") no-repeat;
      background-size: 100%;
    }
    .icon-jzks {
      background: url("./imgs/icon-jzks@2x.png") no-repeat;
      background-size: 100%;
    }
    .icon-cyyp {
      background: url("./imgs/icon-cyyp@2x.png") no-repeat;
      background-size: 100%;
    }
    .icon-xglf {
      background: url("./imgs/icon-xglf@2x.png") no-repeat;
      background-size: 100%;
    }
    .icon-xgjb {
      background: url("./imgs/icon-xgjb@2x.png") no-repeat;
      background-size: 100%;
    }
    .title-right {
      display: flex;
      flex: 1;
      border-bottom: 1px solid #e6e6e6;
      .icon-down {
        width: 12px;
        height: 8px;
        background: url("./imgs/iconfont-arrow-down@2x.png") no-repeat;
        background-size: 100%;
        margin-right: 14px;
        margin-top: 16px;
      }
      .icon-up {
        width: 12px;
        height: 8px;
        background: url("./imgs/iconfont-arrow-up@2x.png") no-repeat;
        background-size: 100%;
        margin-right: 14px;
        margin-top: 16px;
      }
    }
  }
  i {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-left: -9px;
    margin-top: 11px;
  }
  h6 {
    line-height: 40px;
    font-size: 16px;
    color: #333333;
    flex: 1;
    margin-left: 13px;
    font-weight: 600;
  }
}
.subtitle {
  margin-top: 10px;
  font-size: 14px;
  width: 100%;
  padding: 0 12px 0 10px;
  color: #666;
  display: block;
}
.option {
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
  .option-index {
    width: 50%;
    .icon-down {
      width: 12px;
      height: 8px;
      background: url("./imgs/iconfont-arrow-down@2x.png") no-repeat;
      background-size: 100%;
      margin-left: 2px;
    }
    .icon-up {
      width: 12px;
      height: 8px;
      background: url("./imgs/iconfont-arrow-up@2x.png") no-repeat;
      background-size: 100%;
      margin-left: 2px;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #82aa53;
    }
  }
  .option-index:nth-child(1) {
    color: @green-color;
  }
  .option-detail {
    width: 80%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    color: #999;
    font-size: 14px;
    align-items: center;
    height: 60px;
  }
}
.drugs-index {
  margin: 10px 0 10px 13px;
  p {
    width: 97px;
    height: 24px;
    background-color: #e9f7ff;
    border: solid 1px #c4e5fd;
    opacity: 0.75;
    margin-top: 6px;
  }
}
.drugs-index {
  margin-left: 20px;
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #82aa53;
  }
  .text {
    color: #666;
  }
  .icon-down {
    width: 12px;
    height: 8px;
    background: url("./imgs/iconfont-arrow-down@2x.png") no-repeat;
    background-size: 100%;
    float: right;
    margin-right: 14px;
  }
  .icon-up {
    width: 12px;
    height: 8px;
    background: url("./imgs/iconfont-arrow-up@2x.png") no-repeat;
    background-size: 100%;
    margin-left: 2px;
  }
  .describe {
    margin-right: 24px;
    overflow: hidden;
    span {
      float: left;
      margin: 0 10px 0;
      color: #999;
    }
  }
}
.about {
  padding-bottom: 15px;
  .option {
    margin-right: 24px;
    overflow: hidden;
    .aption-index {
      color: #fff;
      padding: 2px 4px;
      opacity: 0.69;
      margin-top: 15px;
      margin-right: 16px;
      float: left;
    }
    .aption-index:nth-child(1) {
      background-color: #00dd98;
    }
    .aption-index:nth-child(2) {
      background-color: #ff4c66;
    }
    .aption-index:nth-child(3) {
      background-color: #35c4f7;
    }
    .aption-index:nth-child(4) {
      background-color: #ff984f;
    }
    .aption-index:nth-child(5) {
      background-color: #aa71ff;
    }
    .aption-index:nth-child(6) {
      background-color: #ff5069;
    }
    .aption-index:nth-child(7) {
      background-color: #ffd065;
    }
  }
}
</style>


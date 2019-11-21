<template>
  <div id="diseaseDetail">
    <mt-header title="症状百科">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="content-wrap">
      <div class="content">
        <div class="disease">
          <div class="title">
            <i class="icon-jb"></i>
            <div class="title-right">
              <h6>{{detailData.symptom_name}}</h6>
              <i class="icon-down" @click="open" v-show="height>54"></i>
            </div>
          </div>
          <div class="subtitle">
            <p class="subtitle-text" ref="txt" :class="{'subtitleActive':height>54}">{{detailData.briefintro_content}}</p>
            <div v-show="openShow" class="open-wrap">
              <div class="open">
              </div>
              <div class="text">
                <h2>{{detailData.symptom_name}}</h2>
                <i class="icon-down" @click="open"></i>
                <p class="text-descir">{{detailData.briefintro_content}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="visit">
          <div class="title">
            <i class="icon-jzks"></i>
            <div class="title-right">
              <h6>症状原因</h6>
              <i class="icon-down"  v-show="heightTow>54" @click="openTow"></i>
            </div>
          </div>
          <div class="subtitle">
            <p class="txtTow" ref="txtTow" :class="{'subtitleActive':heightTow>54}">{{detailData.cause_detail}}</p>
            <div v-show="openTowShow" class="open-wrap">
              <div class="open">
              </div>
              <div class="text">
                <h2>症状原因</h2>
                <i class="icon-down" @click="openTow"></i>
                <p class="text-descir">{{detailData.cause_detail}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="about">
          <div class="title">
            <i class="icon-xgjb"></i>
            <div class="title-right title-lf">
              <h6>相关疗法</h6>
            </div>
          </div>
          <div class="option">
            <div class="option-title">
              <i class="dot"></i>
              <h6>检查</h6>
              <i class="icon-down" @click="insOpen" v-show="insHeight>54"></i>
            </div>
            <div class="option-detail">
              <p class="dia" ref="ins" :class="{'subtitleActive':insHeight>54}">{{detailData.related_inspections_nlist}}</p>
              <div v-show="insShow" class="open-wrap">
                <div class="open">
                </div>
                <div class="text">
                  <h2>检查</h2>
                  <i class="icon-down" @click="insOpen"></i>
                  <p class="text-descir">{{detailData.related_inspections_nlist}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="option">
            <div class="option-title">
              <i class="dot"></i>
              <h6>诊断</h6>
              <i class="icon-down" @click="diaOpen" v-show="diaHeight>54"></i>
            </div>
            <div class="option-detail">
              <p ref="dia" class="dia" :class="{'subtitleActive':diaHeight>54}">{{detailData.identification_detail}}</p>
              <div v-show="diaShow" class="open-wrap">
                <div class="open">
                </div>
                <div class="text">
                  <h2>诊断</h2>
                  <i class="icon-down" @click="diaOpen"></i>
                  <p class="text-descir">{{detailData.identification_detail}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="option">
            <div class="option-title">
              <i class="dot"></i>
              <h6>预防</h6>
              <i class="icon-down" @click="preOpen" v-show="preHeight>54"></i>
            </div>
            <div class="option-detail">
              <p class="dia" ref="pre" :class="{'subtitleActive':preHeight>54}">{{detailData.prevention_detail}}</p>
              <div v-show="preShow" class="open-wrap">
                <div class="open">
                </div>
                <div class="text">
                  <h2>预防</h2>
                  <i class="icon-down" @click="preOpen"></i>
                  <p class="text-descir">{{detailData.prevention_detail}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Header, Button } from 'mint-ui';
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      openShow: false,
      openTowShow: false,
      diaShow: false,
      preShow: false,
      insShow: false,
      detailData: '',
      height: '',
      heightTow: '',
      diaHeight: '',
      preHeight: '',
      insHeight: ''
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button
  },
  methods: {
    open() {
      this.openShow = !this.openShow;
    },
    openTow() {
      this.openTowShow = !this.openTowShow;
    },
    diaOpen() {
      this.diaShow = !this.diaShow;
    },
    preOpen() {
      this.preShow = !this.preShow;
    },
    insOpen() {
      this.insShow = !this.insShow;
    },
    getData() {
      ajax.get('/api/disease/getsymptomdetail', {
        params: {
          'id': this.$route.query.id
        }
      }).then(data => {
        if (data.data.code === 0 && data.status === 200) {
          this.detailData = data.data.data;
          this.$nextTick(() => {
            this.height = this.$refs.txt.offsetHeight;// document.querySelector('.subtitle-text').offsetHeight;
            this.heightTow = this.$refs.txtTow.offsetHeight;
            this.diaHeight = this.$refs.dia.offsetHeight;
            this.preHeight = this.$refs.pre.offsetHeight;
            this.insHeight = this.$refs.ins.offsetHeight;
          });
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
#diseaseDetail{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: #fff;
}
.content-wrap{
  padding-left: 18px;
  margin-top: 44px;
}
.mint-header{
    border: 0;
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
    .icon-xgjb {
      background: url("./imgs/icon-xgjb@2x.png") no-repeat;
      background-size: 100%;
    }
    .title-lf{
      border-bottom: 1px solid #e6e6e6;
    }
    .title-right {
      display: flex;
      flex: 1;
      .icon-down {
        width: 8px;
        height: 8px;
        background: url("./imgs/icon-jt@2x.png") no-repeat;
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
  padding: 0 12px 0 20px;
  color: #666;
  display: block;
  .subtitle-text{
    line-height: 18px;
    font-size: 14p;
  }
  .subtitleActive{
    display: -webkit-box;
    box-orient: vertical;
    /* autoprefixer: off */;
    -webkit-box-orient: vertical;
    /* autoprefixer: on */;
    -webkit-line-clamp: 3;
    display: -moz-box;
    -moz-line-clamp:3 !important;
    -moz-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 54px;
  }
}
.open-wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .open{
    background: #000;
    opacity: 0.65;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .text{
      background: #fff;
      position: absolute;
      top: 64px;
      bottom: 15px;
      right: 0;
      width: 340px;
      padding: 20px 15px;
      opacity: 1;
      overflow: scroll;
      h2{
        line-height: 50px;
        font-weight: 900;
        font-size: 16px;
        color: #000;
      }
      .text-descir{
        color: #666;
      }
      .icon-down {
        width: 8px;
        height: 8px;
        background: url("./imgs/icon-jt@2x.png") no-repeat;
        background-size: 100%;
        margin-right: 14px;
        margin-top: 16px;
        position: absolute;
        top: 30px;
        right: 15px;
        transform: rotate(180deg);
      }
    }
.option {
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
  .option-title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    .dot {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: @green-color;
      margin-bottom: 8px;
    }
    h6 {
      font-size: 14px;
      color: #666;
    }
    .icon-down {
      width: 8px;
      height: 8px;
      background: url("./imgs/icon-jt@2x.png") no-repeat;
      background-size: 100%;
      margin-right: 14px;
      margin-top: 16px;
    }
  }
  .option-detail {
    padding: 0 26px 0 15px;
    color: #999;
    .dia{
      line-height: 18px;
      font-size: 14p;
    }
    .subtitleActive{
      display: -webkit-box;
      /* autoprefixer: off */;
      -webkit-box-orient: vertical;
      /* autoprefixer: on */;
      -webkit-line-clamp: 3;
      display: -moz-box;
      -moz-line-clamp:3 !important;
      -moz-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      box-orient: vertical;
      height: 54px;
    }
  }
}
.txtTow{
  line-height: 18px;
  font-size: 14p;
}
.subtitleActive{
  display: -webkit-box;
  /* autoprefixer: off */;
  -webkit-box-orient: vertical;
  /* autoprefixer: on */;
  -webkit-line-clamp: 3;
  display: -moz-box;
  -moz-line-clamp:3 !important;
  -moz-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  box-orient: vertical;
  height: 54px;
}
</style>


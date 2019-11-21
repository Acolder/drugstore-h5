<template>
  <div id="symptomDetail">
    <div class="symptDetail_content" v-show="fl">
      <!-- 症状内容开始 -->
    <scroller>
      <div class="symptDetail_contain">
        <div class="symptDetail_classify">
          <!-- 症状名和定义 -->
          <div class="identical symptDeatail_briefintro">
            <i class="icon_left"></i>
            <div class="classify_title_content">
              <div class="classify_title">
                <span>{{GetSymptomDetailData.symptom_name}}</span>
                <em
                  @click="detailAction(GetSymptomDetailData.symptom_name,GetSymptomDetailData.briefintro_content)"
                ></em>
              </div>
              <p>{{GetSymptomDetailData.briefintro_content}}</p>
            </div>
          </div>
          <!-- 相关症状 -->
          <div class="identical identisicationDetail">
            <i class="icon_left icon_relatedSymptom"></i>
            <div class="classify_title_content">
              <div class="classify_title">
                <span>相关症状</span>
                <em @click="detailAction('相关症状',GetSymptomDetailData.identification_detail)"></em>
              </div>
              <p>{{GetSymptomDetailData.identification_detail}}</p>
            </div>
          </div>
          <!-- 并发症 -->
          <div class="identical complication">
            <i class="icon_left icon_complication"></i>
            <div class="classify_title_content">
              <div class="classify_title">
                <span>并发症</span>
              </div>
              <p v-for="(item, key) in GetSymptomDetailData.aboutsymptomlist" :key="key">{{item.name || '无'}}</p>
            </div>
          </div>
          <!-- 易感人群 -->
          <div class="identical">
            <i class="icon_left icon_yigan"></i>
            <div class="classify_title_content">
              <div class="classify_title">
                <span>易感人群</span>
              </div>
              <p>无特发人群</p>
            </div>
          </div>
          <!-- 治愈率 -->
          <div class="identical">
            <i class="icon_left icon_cure"></i>
            <div class="classify_title_content">
              <div class="classify_title">
                <span>治愈率</span>
              </div>
              <p>100%</p>
            </div>
          </div>
          <!-- 常用药品 -->
          <div class="identical">
            <i class="icon_left icon_drugs"></i>
            <div class="classify_title_content">
              <div class="classify_title">
                <span>常用药品</span>
              </div>
              <p>无</p>
            </div>
          </div>
          <!-- 相关疗法 -->
          <div class="identical">
            <i class="icon_left icon_relatCure"></i>
            <div class="classify_title_content">
              <div class="classify_title">
                <span>相关疗法</span>
              </div>
              <ul>
                <li>
                  <div class="classify_title">
                    <span>检查方式</span>
                    <em
                      @click="detailAction('检查方式',GetSymptomDetailData.related_inspections_nlist)"
                    ></em>
                  </div>
                  <p>{{GetSymptomDetailData.related_inspections_nlist}}</p>
                </li>
                <li>
                  <div class="classify_title">
                    <span>预防</span>
                    <em @click="detailAction('治疗方式',GetSymptomDetailData.prevention_detail)"></em>
                  </div>
                  <p>{{GetSymptomDetailData.prevention_detail}}</p>
                </li>
                <li>
                  <div class="classify_title">
                    <span>宜食</span>
                    <em @click="detailAction('宜食',GetSymptomDetailData.should_eat_food_conclusion)"></em>
                  </div>
                  <p>{{GetSymptomDetailData.should_eat_food_conclusion}}</p>
                </li>
                <li>
                  <div class="classify_title">
                    <span>忌食</span>
                    <em @click="detailAction('忌食',GetSymptomDetailData.avoid_eat_food_conclusion)"></em>
                  </div>
                  <p>{{GetSymptomDetailData.avoid_eat_food_conclusion}}</p>
                </li>
                <li>
                  <div class="classify_title">
                    <span>忌食列表</span>
                    <em @click="detailAction('忌食列表',GetSymptomDetailData.avoid_eat_food_list)"></em>
                  </div>
                  <p>{{GetSymptomDetailData.avoid_eat_food_list}}</p>
                </li>
              </ul>
            </div>
          </div>
          <!-- 相关疾病 -->
          <div class="identical ill">
            <i class="icon_left icon_relateIllness"></i>
            <div class="classify_title_content">
              <div class="classify_title">
                <span>相关疾病</span>
              </div>
              <ol>
                <li v-for="(list,index) in getSymptomDisease" :key="index">{{list.name || '无'}}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </scroller>
      <!-- 症状内容结束 -->
    </div>
    <!-- 返回按钮 -->
    <div class="back_btn">
      <button @click="backAction">返回</button>
    </div>
    <div class="ILL" v-show="fl"><a href=""></a></div>
    <!-- 弹窗显示当前的全部内容 -->
    <div class="symptomAllDetail" v-if="isShow === true">
      <div class="classify_title">
        <span>{{title}}</span>
        <em @click="removeDetail"></em>
      </div>
      <div class="boxWraper">
        <scroller>
           <h3>{{contain}}</h3>
        </scroller>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="symptomDetail_layer" v-if="isShow === true"></div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax';
import { FONTSIZE } from './js/fontSze.js';
export default {
  data() {
    return {
      GetSymptomDetailData: {},
      getSymptomDisease: [],
      SymptomDetailID: this.$route.params.id,
      // SymptomDetailID: 888,
      isShow: false,
      title: '',
      contain: '',
      vflag: false,
      fl: false
    };
  },
  methods: {
    // 点击左下箭头显示详细的内容
    detailAction(title, contain) {
      this.isShow = true;
      this.title = title;
      this.contain = contain;
    },
    // 点击右上箭头移除详细内容
    removeDetail() {
      this.isShow = false;
    },
    // 返回上一页面
    backAction() {
      console.log(1);
      // this.$router.back();
      this.$router.replace({
        name: 'symptomList',
        query: {
          organ: this.$route.query.organ,
          sex: this.$route.query.sex,
          sex_: this.$route.query.sex_,
          flag: this.$route.query.flag,
          judge: this.$route.query.judge,
        }
      });
    },
    // 在线问医
    // ILLACTION() {
    //   this.$router.push({
    //     path: '/login'
    //   });
    // },
    goBack() {

      this.$router.replace({
        name: 'symptomList',
        query: {
          organ: this.$route.query.organ,
          sex: this.$route.query.sex,
          sex_: this.$route.query.sex_,
          flag: this.$route.query.flag,
          judge: this.$route.query.judge,
        }
      });

      // replace替换原路由，作用是避免回退死循环

    }
  },
  created() {
    // 请求数据
    FONTSIZE();
    let api = 'api/disease/getsymptomdetail?ID=' + this.SymptomDetailID;
    let AJ = new Promise((resolve, reject) => {
      ajax.get(api).then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          this.GetSymptomDetailData = res.data.data;
          this.getSymptomDisease = res.data.data.aboutdiseaselist;
          console.log(res);
          resolve();
        }
      }).catch((error) => {
        console.log(error);
      });
    });
    AJ.then(() => {
      this.fl = true;
    });
  },
  mounted() {
    // 监听手机物理返回键
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
  },
  destroyed() {

    window.removeEventListener('popstate', this.goBack, false);

  },
};
</script>

<style lang="less" scoped>
// 共同样式
.classify_title {
  padding: 0px 20px 10px 0px;
  display: flex;
  // position: relative;
  align-items: center;
  border-bottom: 1px solid #ccc;
  span {
    flex: 1;
    color: #333333;
    font-weight: 700;
  }
  em {
    display: inline-block;
    background: url(../../assets/jiantou01@2x.png) no-repeat;
    background-size: 12px;
    width: 30px;
    height: 26px;
    background-position: 50%;
    vertical-align: middle;
  }
}
h3 {
  font-weight: normal;
}
#symptomDetail {
  height: 100%;
  position: relative;
  .symptDetail_content {
    box-sizing: border-box;
    height: 89%;
    overflow-y: scroll;
    position: relative;
    // padding-top: 2.99850075vh;
    .symptDetail_contain {
      height: auto;
      margin-left: 5.33333333vw;
      margin-top: 2.99850075vh;
      .symptDetail_classify {
        height: 100%;
        border-left: 2px solid #ccc;
        // 相同样式
        .identical {
          line-height: 22px;
          min-height: 5vh;
          font-size: 17px;
          position: relative;
          padding-left: 21px;
          .icon_left {
            position: absolute;
            left: -14px;
            top: -2px;
            display: inline-block;
            background: url(../../assets/detail.png);
            background-size: 25px;
            width: 25px;
            height: 25px;
            background-position: 0px 75px;
            vertical-align: middle;
          }
          .icon_relatedSymptom {
            background-position: 0px 100px;
          }
          .icon_complication {
            background-position: 0px 225px;
          }
          .icon_yigan {
            background-position: 0px 250px;
          }
          .icon_cure {
            background-position: 0px 175px;
          }
          .icon_drugs {
            background-position: 0px 0px;
          }
          .icon_relatCure {
            background-position: 0px 325px;
          }
          .icon_relateIllness {
            background-position: 0px -50px;
          }
          // 症状内容样式
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            margin: 10px 0px 25px 0px;
            padding-right: 12px;
            color: #666666;
            font-size: 16px;
          }
          // 相关疗法
          ul {
            height: 100%;
            margin-bottom: 20px;
            li {
              padding: 5px;
              .classify_title {
                border: none;
                padding: 8px 20px 7px 0;
                span {
                  color: #919191;
                  font-size: 16px;
                }
                &:before {
                  content: " ";
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background-color: #16c5b7;
                  margin-right: 7px;
                }
              }
              p {
                margin: 0 15px;
                color: #aaaaaa;
                padding-right: 31px;
              }
            }
          }
          // 相关疾病
          ol {
            height: 100%;
            li {
              display: inline-block;
              border: 1px solid #eee;
              padding: 5px 10px;
              background-color: #f7f7f7;
              color: #828282;
              word-break: keep-all;
              white-space: nowrap;
              margin-top: 10px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }

  // 返回按钮
  .back_btn {
    width: 100%;
    height: 10.4947526vh;
    line-height: 10.4947526vh;
    position: absolute;
    bottom: 0px;
    left: 0px;
    text-align: center;
    background: #fff;
    button {
      display: inline-block;
      width: 90%;
      padding: 12px 0;
      align-self: center;
      text-align: center;
      background: #1aad19;
      border-radius: 8px;
      font-size: 18px;
      color: #fff;
    }
  }
}
// 遮罩层
.symptomDetail_layer {
  width: 100%;
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #000;
  opacity: 0.6;
}
// 弹窗显示当前的的全部信息
.symptomAllDetail {
  background: #fff;
  border-radius: 5px;
  position: fixed;
  top: 50px;
  left: 45px;
  right: 0;
  bottom: 10px;
  border: 1px solid #ccc;
  z-index: 99;
  padding: 15px;
  color: #9f9f9f;
  font-size: 17px;
  .classify_title {
    border-bottom: none;
    padding: 10px 20px 20px 0;
    em {
      background: url(../../assets/jiantou@2x.png) no-repeat;
      background-size: 12px;
      background-position: 50%;
    }
  }
  .boxWraper {
    width: 100%;
    height: 90%;
    display: flex;
    position: relative;
    overflow: hidden;
    h3 {
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow: scroll;
      font-size: 16px;
    }
  }
}
.ill {
      min-height: 100px;
      margin-bottom: 5vh;
}
.ILL {
  position: fixed;
  width: 48px;
  height: 48px;
  bottom: 140px;
  right: 20px;
  z-index: 10;
  // background: #000;
  background: url(./img/icon_zxwy.png);
  background-size: 100% 100%;
}
</style>

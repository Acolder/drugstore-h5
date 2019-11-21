<template>
<keep-alive>
    <div class="hunmanBody">
        <!-- 导航条 -->
        <div class="human_nav">
            <div class="human_nav_left">
                   <p class="navP active">人体图</p>
            </div>
            <div class="human_nav_right" @click="listAction">
                   <p class="navP">症状列表</p>
            </div>
        </div>
        <!-- 人体页面 -->
        <div class="human_body">
            <!-- 性别切换 -->
                <div class="select_sex" v-show="valflag">
                    <span :id="item.className" v-for="(item, key) in select" :key="key"
                    @click="clickAction(item)" :class="{'active_':sex_== item.value && item.value != '|'}"
                    >{{item.value}}</span>

                </div>
                <!-- 人体图片 -->
                 <div class="human_body_picture" v-show="valflag">
                     <div @click.stop="mapAction"  class="boy" v-if="sex == 'boy'" :class="{'boybg': !flag && sex == 'boy'}">
                         <!-- boy人体部位 -->
                         <div v-show="name.fl && flag" :class="`man_front_${name.nm} item_imgs_man_front`"></div>
                         <div v-show="name.fl && !flag" :class="`man_front_${name.nm} item_imgs_man_front`" id="qh"></div>
                     </div>
                      <div @click.stop="mapAction" class="girl" v-if="sex == 'girl'" :class="{'girlbg': !flag && sex == 'girl'}">
                         <!-- girl人体部位 -->
                         <div v-show="name.fl && flag" :class="`girl_front_${name.nm} item_imgs_girl_front`"></div>
                         <div v-show="name.fl && !flag" :class="`girl_front_${name.nm} item_imgs_girl_front`" id="gqh"></div>
                         <!--  -->

                      </div>
                      <!-- 人体正反面切换 -->
                      <div class="tab" @click.stop="tabAction">

                     </div>
                 </div>
                 <!-- 人体详情页 -->
                 <div class="bodyDetail" v-if="!valflag">
                     <div class="im">
                         <!-- 男士器官详情 -->
                         <div class="b" v-if="sex == 'boy'">
                                <!-- 头部及颈部详情 -->
                                <img class="img_one" v-if="bodyPic == 1" src='./img/nan-s.png' alt="">
                                <!-- 胸腹部详情 -->
                                <img class="img_two" v-if="bodyPic == 2" src='./img/nan-z1.png' alt="">
                                <!-- 生殖详情 -->
                                <img class="img_three" v-if="bodyPic == 3" src='./img/nan-x.png' alt="">
                         </div>
                         <!-- 女士器官详情 -->
                         <div class="g" v-if="sex == 'girl'">
                                <img class="img_one img_one__" v-if="bodyPic == 4" src='./img/nv-s.png' alt="">
                                <img class="img_two" v-if="bodyPic == 5" src='./img/nv-z1.png' style="height: 7.5rem" alt="">
                                <img class="img_three" v-if="bodyPic == 6" src='./img/nv-x.png' alt="" style="margin: -3px">
                         </div>
                         <!-- 具体器官的名称 -->
                         <p @click="Paction(sex, item)" :class="`img_${se}_${key} img_one_`" v-for="(item, key) in headPosition" :key="key">
                           {{item}}
                           </p>
                           <section v-if="!valflag" class="btn" @click="GOBACK">
                           </section>
                     </div>
                 </div>
        </div>
    </div>
    </keep-alive>
</template>
<script>
import { boyCoord, girlCoord } from './js/boyAndGirlCoordinates.js';
import { girlConfig, boyConfig } from './js/boyAndGirlConfig.js';
import { FONTSIZE } from './js/fontSze.js';
export default {
  data() {
    return {
      sex: 'boy',
      sex_: '男',
      flag: true,
      bodyPic: 1,
      se: '',
      valflag: true,
      bg: false,
      name: {
        nm: '',
        fl: false
      },
      headPosition: ['头部', '眼睛', '鼻子', '耳朵', '口腔', '咽喉', '颈椎'],
      // 男士点击坐标
      boyObjVal: {
        boy: '',
        girl: ''
      },
      CoordValue: {
        boy: '',
        girl: ''
      },
      select: [
        {
          className: 'sex',
          value: '男',
          en: 'boy'
        },
        {
          className: 'line',
          value: '|',
          en: ''
        },
        {
          className: 'sex',
          value: '女',
          en: 'girl'
        }
      ]
    };
  },
  methods: {
    // 切换到症状列表页面
    listAction() {
      this.$router.replace({
        name: 'symptomList',
        query: {
          sex_: this.sex_,
          flag: this.flag,
          sex: this.sex,
          organ: this.$route.query.organ || '全身症状',
          b: 'scroll'
          // valflag: this.valflag
        }
      });
    },
    // 性别切换
    clickAction(val) {
      clearInterval(this.timer);
      this.valflag = true;
      this.name.fl = false;
      if (val.en !== '') {
        this.sex_ = val.value;
        this.sex = val.en;
      }
      this.flag = !this.flag || true;
      console.log(val);
      console.log(this.sex_);
    },
    // 正反面切换
    tabAction() {
      clearInterval(this.timer);
      this.valflag = true;
      this.name.fl = false;
      this.flag = !this.flag;
    },
    // 点击图片触发事件
    mapAction(ev) {
      let docc = document.documentElement.clientWidth;
      // 获取点击坐标
      let x = ev.clientX / docc;
      let y = ev.clientY / docc;
      console.log(x, y);
      // 实现点击不同的部位，执行不同的操作
      new Promise((resolve, reject) => {
        for (let key in this.CoordValue[this.sex]) {
          if (this.CoordValue[this.sex].hasOwnProperty(key)) {
            for (let value of this.CoordValue[this.sex][key]) {
              if (x > value.min_x && x < value.max_x && y >= value.min_y && y < value.max_y) {
                this.se = this.boyObjVal[this.sex][key].se || this.se;
                this.bodyPic = this.boyObjVal[this.sex][key].bodyPic || this.bodyPic;
                this.headPosition = this.boyObjVal[this.sex][key].headPosition || this.headPosition;
                !this.flag ? this.name.nm = this.boyObjVal[this.sex][key].bnm || this.boyObjVal[this.sex][key].nm : this.name.nm = this.boyObjVal[this.sex][key].nm;
                console.log(this.boyObjVal[this.sex][key].nm);
                resolve(this.boyObjVal[this.sex][key].nm);
              }
            }
          }
        }
      }).then((val) => {
        this.animation(val);
      });
    },
    Paction(a, b) {
      console.log(a, b);
      this.$router.replace({
        name: 'symptomList',
        query: {
          sex: a,
          organ: b,
          sex_: this.sex_,
          flag: this.flag,
          valflag: this.valflag,
          b: 'scroll'
        }
      });
      // location.href = `${process.env.WEB_HOST}/self-diagnostic/symptomList?sex=${a}&organ=${b}`;
    },
    // 动画效果
    animation(val) {
      let num = 0;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.name.fl = !this.name.fl;
        num++;
        if (num >= 8) {
          this.name.fl = false;
          if (!this.flag || val === 'foot' || val === 'hand') {
            this.$router.replace({
              name: 'symptomList',
              query: {
                sex: this.sex,
                organ: val,
                judge: 'en',
                sex_: this.sex_,
                flag: this.flag,
                b: 'scroll'
                // valflag: this.valflag
              }
            });
            this.valflag = true;
            clearInterval(this.timer);
            return;
            // location.href = `${process.env.WEB_HOST}/self-diagnostic/symptomList?sex=${this.sex}&organ=${val}&judge=en`;

          }
          this.valflag = !this.flag;
          console.log(this.flag);
          clearInterval(this.timer);
        }
      }, 150);
    },
    // 返回上一步
    GOBACK() {
      this.valflag = true;
    },
    goBack() {

      this.$router.replace({
        path: '/',
      });
      // this.$router.go(0);
      // replace替换原路由，作用是避免回退死循环

    }
  },
  created() {
    // 设置font-size
    FONTSIZE();
    // 设置坐标点
    this.CoordValue.boy = boyCoord();
    this.CoordValue.girl = girlCoord();
    this.boyObjVal.boy = boyConfig();
    this.boyObjVal.girl = girlConfig();
    if (this.$route.query.sex) {
      this.sex = this.$route.query.sex;
    }
    if (this.$route.query.sex_) {
      this.sex_ = this.$route.query.sex_;
    }
    if (this.$route.query.flag === false || 'false' || this.$route.query.flag === true || 'true') {
      this.$route.query.flag === false || this.$route.query.flag === 'false' ? this.flag = false : this.flag = true;
    }
    console.log(this.$route.query);
  },
  mounted() {
    // 监听手机物理返回键
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
    // 定位
    // scrollAnimation(0, -200);
  },
  destroyed() {

    window.removeEventListener('popstate', this.goBack, false);

  },
};
</script>
<style lang="less" scoped>
@import './css/body.less';
//
.hunmanBody {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    .human_body_picture, .bodyDetail {
            // .px2rem(width,375);
            width: 100%;
            // width: 7.5rem;
            .px2rem(height,620);
            // height: 11rem;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%);
            font-size: 100%;

            div {
               width: 100%;
               height: 100%;
               background-size: 100% 100%;
            //    background-position-y: -99px;
               .px2rem(background-position-y,-99);
            }
            .boy, .girl {
                position: absolute;
                z-index: 3;
                background-size: cover;
                background-image: url(./img/man_f-min.png);
                #qh {
                   background-size: cover;
                   background-image: url(./img/man_back.png);
                }
                .item_imgs_man_front, .item_imgs_girl_front {
                    position: absolute;
                    top: 0;
                    left: 0;
                    // display: none;
                    width: 7.5rem;
                    height: 11rem;
                    background-image: url(./img/man_front.png);
                    background-size: 7.5rem;
                }
            }
            .boybg {
                background-image: url(./img/man_b-min.png);
            }
            .girl {
                background-image: url(./img/girl_f-min.png);
                #gqh {
                background-image: url(./img/girl_back.png);
                }
                .item_imgs_girl_front {
                background-image: url(./img/girl_front.png);
                }
            }
            .girlbg {
                background-image: url(./img/girl_b-min.png);
            }
    }
    .human_nav {
         .px2rem(height, 47);
        // height: 47px;
        display: flex;
        overflow: hidden;
        border-bottom: 1px solid #F5F5F5;
        box-sizing: border-box;
        text-align: center;
        .navP {
            display: inline-block;
            // line-height: 47px;
           .px2rem(height, 47);
           .px2rem(line-height, 47);
           .px2rem(width, 125);
            // width: 125px;
            // height: 47px;
            // font-size: 16px;
           .px2rem(font-size, 18);
            box-sizing: border-box;
        }
        .human_nav_left {
            flex: 1;
        }
        .human_nav_right {
            flex: 1;
            border-left: 1px solid #F5F5F5;
        }

    }
    .human_body {
        text-align: center;
        // line-height: 36px;
        // flex: 1;
        width: 100%;
        height: 12.4rem;
        position: relative;
        .select_sex {
           color: #ccc;
           font-weight: 400;
        //    font-size: 16px;
        //    width: 76px;
           .px2rem(width,76);
           .px2rem(height,36);
           .px2rem(line-height,36);
           .px2rem(font-size,16);
        //    height: 36px;
           display: flex;
           position: absolute;
           .px2rem(top,15);
           .px2rem(left,25);
           left: 10px;
           top: 15px;
           z-index: 2;
           #sex {
                flex: 1;
           }
           #line {
               width: 2px;
           }

        }
        .tab {
            .px2rem(width, 40);
            .px2rem(height, 40);
            background: url(./img/icon-zwzd-qh.png);
            background-size: 100% 100%;
            position: absolute;
            .px2rem(right, 40);
            bottom: 4.4rem;
            z-index: 4;
        }
    }
}
.btn {
  width: 0.9rem;
  height: 0.9rem;
  // background: #000;
  position: absolute;
  top: 5.9970015vh;
  left: 16vw;
  background-image: url(./img/icon_fhh.png);
  background-size: 100% 100%;
}
</style>


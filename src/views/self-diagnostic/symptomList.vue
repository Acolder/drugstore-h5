<template>
  <div id="symptomList">
    <!-- 导航栏 -->
    <ul class="tab-item">
      <li v-for="(item,index) in tabData" :key="item" @click="selectAction(index)">
        <a :class="{ active:index == selected}" href="javascript:void(0);">{{item}}</a>
      </li>
    </ul>
    <div class="symptomList_content">
      <!-- 人体图 -->
      <!-- <ul class="humam_body">
        <li v-if="selected=='0'"></li>
      </ul>-->
      <!-- 症状列表 -->
        <div class="sympt_list">
           <!-- 症状位置 -->
              <!-- <keep-alive> -->
                  <div class="sympt_list_left">
                       <!-- <scroller ref="MYSCROLLER"> -->
                          <ol class="sympt_part" ref="sympt_part">
                            <li
                              v-for="item in symptomPartListData"
                              :key="item.id"
                              :id="'move_'+item.id"
                              @click="selectSymptPartAction(item.PositionName,item.HumanSymptomList)"
                              :class="{'active':selectSymptPart == item.PositionName,'sympt_part_List':selectSymptPart == item.PositionName}"
                            >
                              <a
                                :class="{ active:selectSymptPart == item.id}"
                                href="javascript:void(0);"
                              >{{item.PositionName}}</a>
                            </li>
                            <!-- <li class="pp" style="height: 51px"></li> -->
                          </ol>
                        <!-- </scroller> -->
                  </div>
              <!-- </keep-alive> -->
          <!-- 症状表现 -->
          <div class="sympt_list_right">
            <scroller ref="KINDSCROLL">
                  <ol class="sympt_kind" v-if="selectSymptPart">
                    <li
                      v-for="(item,index) in symptomKindListData"
                      :key="index"
                      @click="selectSymptKindAction(item.SymptomID)"
                    >{{item.SymptomName}}</li>
                    <li style="height: 51px"></li>
                  </ol>
            </scroller>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { FONTSIZE } from './js/fontSze.js';
import { ILLDATA } from './js/ILL.js';
// import { scrollAnimation } from './js/scrollAnimation.js';
// import $ from 'jquery';
export default {
  name: 'symptomList',
  props: {
    organ: String,
  },
  data() {
    return {
      tabData: ['人体图', '症状列表'],
      symptomPartListData: [],
      symptomKindListData: [],
      selected: '1',
      selectSymptPart: '全身症状',
      symptomPartId: '0',
      orga: this.$route.query.organ,
      ID: 0,
      startY: 0,
      source: {
        client: {
          x: 0,
          y: 0
        }
      }
    };
  },
  created() {
    FONTSIZE();
    console.log(ILLDATA());
    this.symptomPartListData = ILLDATA();
    // 判断人体页面传入的值
    switch (this.$route.query.organ) {
      case 'chest': this.selectSymptPart = '背部';
        break;
      case 'belly': this.selectSymptPart = '腰腹部';
        break;
      case 'sex': this.selectSymptPart = '排泄部';
        break;
      case 'foot': this.selectSymptPart = '下肢';
        break;
      case 'hand': this.selectSymptPart = '上肢';
        break;
      case 'head': this.selectSymptPart = '头部';
        break;
      case 'neck': this.selectSymptPart = '颈椎';
        break;
    }
    if (this.$route.query.judge !== 'en') {
      if (this.$route.query.sex === 'boy' && this.$route.query.organ === '生殖器') {
        this.selectSymptPart = '男性生殖';
      } else if (this.$route.query.sex === 'girl' && this.$route.query.organ === '生殖器') {
        this.selectSymptPart = '女性生殖';
      } else {
        this.selectSymptPart = this.$route.query.organ;
      }
    }
    for (let item of this.symptomPartListData) {
      if (item.PositionName === this.selectSymptPart) {
        this.symptomKindListData = item.HumanSymptomList.map((item, index) => {
          return item;
        });
      }
    }
    this.$forceUpdate();
  },
  methods: {
    // 切换导航栏
    selectAction(index) {
      this.selected = index;
      if (index === 0) {
        this.$router.replace({
          name: 'humanPic',
          query: {
            sex: this.$route.query.sex,
            sex_: this.$route.query.sex_,
            flag: this.$route.query.flag,
            organ: this.selectSymptPart,
            // valflag: this.$route.query.valflag
          }
        });
      }
    },
    // 选择症状身体部位
    selectSymptPartAction(part, symptom) {
      this.selectSymptPart = part;
      this.symptomPartId = part;
      this.symptomKindListData = symptom.map((item, index) => {
        return item;
      });
      this.$route.query.judge = '';
      this.orga = part;
      this.$refs.KINDSCROLL.scrollTo(0, 0, false);
      this.$forceUpdate();
    },
    // 选择症状表现(跳转详情页并且传ID值)
    selectSymptKindAction(id) {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.replace({ name: 'symptomDetail', params: { id }, query: { judge: this.$route.query.judge, organ: this.orga, sex: this.$route.query.sex, sex_: this.$route.query.sex_, flag: this.$route.query.flag }});
      // location.href = `${process.env.WEB_HOST}/self-diagnostic/symptomDatail/${id}?judge=${this.$route.query.judge}
      //                   &organ=${this.orga}&sex=${this.$route.query.sex}&sex_=${this.$route.query.sex_}&flag=${this.$route.query.flag}`;
    },
    // 物理返回键执行函数
    goBack() {

      this.$router.replace({
        path: '/',
      });
      // replace替换原路由，作用是避免回退死循环
    },
    // 监听手指滑动事件
    touchmoveFunction() {
      return function touchmoveFunction(e) {
        let el = document.querySelector('.sympt_part');// 需要滑动的dom元素
        if (!e.isSCROLL) {
          e.preventDefault(); // 阻止默认事件(上下滑动)
          console.log('阻止了');
        } else {
          // 需要滑动的区域
          let moveY = e.touches[0].pageY;
          let top = el.scrollTop;
          let ch = el.clientHeight;// 对象最顶端和窗口最顶端之间的距离
          let scrollH = el.scrollHeight; // 含滚动内容的元素大小
          // 判断是否禁止事件的条件
          // console.log(top);
          // console.log(ch);
          // console.log(moveY);
          // console.log(this.startY);
          // console.log(top + ch);
          // console.log(scrollH);
          if ((top === 0 && moveY > this.startY) || (top + ch === scrollH && moveY < this.startY)) {
            e.preventDefault();
            console.log('阻止了');
          } else {
            console.log('开启了');
          }
        }
      };
    },
    //
    touchstartFunction() {
      return function touchstartFunction(e) {
        this.startY = e.touches[0].pageY;
        console.log(this.startY);
      };
    }
  },
  mounted() {
    // 监听手机物理返回键
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
    // 列表定位
    this.$nextTick(() => {
      // 实验中的功能，让元素在浏览器可视区显示
      document.querySelector('.sympt_part_List').scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' });
    });
    // 禁止ios橡皮筋效果
    // ********************
    // ********************
    // ********************
    let ios = navigator.userAgent.indexOf('iphone');// 判断是否为ios
    document.body.style = 'position: absolute; top: 0; left: 0; bottom: 0';
    // 获取触摸坐标
    // this.startY = 0;
    let _this = this;
    document.body.addEventListener('touchstart', _this.touchstartFunction(), { passive: false });
    //
    if (ios === -1) {
    // ios下运行
      let el = document.querySelector('.sympt_part');// 需要滑动的dom元素
      iosTrouchFn(el);
    }
    function iosTrouchFn(el) {
    // el需要滑动的元素
      el.addEventListener('touchmove', function(e) {
        e.isSCROLL = true;
      });
      document.body.addEventListener('touchmove', _this.touchmoveFunction(), { passive: false }); // passive防止阻止默认事件不生效
    }
    // *********************
    // *********************
    // *********************
  },
  // 页面销毁前移除事件监听
  beforeDestroy() {
    let _this = this;
    document.body.removeEventListener('touchstart', _this.touchstartFunction(), false);
    document.body.removeEventListener('touchmove', _this.touchmoveFunction(), false);
    document.body.style = '';
  },
  destroyed() {

    window.removeEventListener('popstate', this.goBack, false);

  }
};
</script>
<style lang="less" scoped>
#symptomList {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // 导航栏
  .tab-item {
    width: 100%;
    height: 50px;
    display: flex;
    border-bottom: 1px solid #ccc;
    li {
      text-align: center;
      width: 50%;
      padding: 0px 15px;
      border-right: 1px solid #ccc;
      a {
        display: block;
        color: #000;
        font-size: 18px;
        line-height: 47px;
      }
    }
    .active {
      color: #6ccc56;
      border-bottom: 2px solid #6ccc56;
    }
  }
  // 内容部分
  .symptomList_content {
    // -webkit-overflow-scrolling : touch;
    // height: 100%;
    // width: 100%;
    flex: 1;
    display: flex;
    // 症状列表
    .sympt_list {
      width: 100%;
      height: 100%;
      display: flex;
      overflow:initial ;
      .sympt_list_left {
         overflow:auto;/* winphone8和android4+ */
         -webkit-overflow-scrolling: touch; /* ios5+ */
         width: 35%;
         height: 100%;
         position: relative;
         z-index: 1;
          // 症状位置
        .sympt_part {
            overflow:auto;/* winphone8和android4+ */
           -webkit-overflow-scrolling: touch; /* ios5+ */
            width: 100%;
            height: 100%;
            // overflow-y: scroll;
            // position: absolute;
            // left: 0;
            background: #f1f1f1;
            // &::-webkit-scrollbar{
            //   width: 0;
            //   height: 0;
            // }
            li {
              position: relative;
              padding: 15px 0px;
              text-align: center;
              a {
                font-size: 15px;
                color: #6d6e70;
              }
            }
            .active {
              background: #fff;
              color: #6ccc56;
          }
        }
      }
      .sympt_list_right {
        -webkit-overflow-scrolling : touch;
        width: 65%;
        height: 100%;
        position: relative;
        z-index: 1;
        // 症状表现
      .sympt_kind {
        width: 100%;
        height: 100%;
        overflow: scroll;
        li {
          padding: 15px 25px;
          }
        }
      }
    }
  }
}
.sympt_part_List::before {
  position: absolute;
  left: 0;
  top: 0.15rem;
  display: inline-block;
  content: " ";
  width: 2px;
  height: 40px;
  background: #6ccc56;
}
</style>
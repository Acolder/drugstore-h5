<template>
  <div class='serviceEvaContainer'>
    <mt-header title='问诊评价' v-show="!titleTwo">
      <mt-button icon='back' slot='left' onclick='history.go(-1)'></mt-button>
    </mt-header>
    <mt-header title='赠送锦旗' v-show="titleTwo">
      <mt-button icon='back' slot='left' onclick='history.go(-1)'></mt-button>
    </mt-header>
    <ul class='coupon-title' v-show="!titleTwo">
      <li @click='goRoute(1)' :class="{'couponActive': classIndex == 1 }">服务评价</li>
      <li class='grayBorder'></li>
      <li @click='goRoute(2)' :class="{'couponActive': classIndex == 2 }">赠送锦旗</li>
    </ul>
    <ul v-show='classIndex == 1' class='service'>
      <div class='service-text'>请您对此次咨询服务评价</div>
      <div class='icon-wrap'>
        <div class='icon' v-show="!evaluationEdit">
          <i class='icon-xxx' :class="{iconActive:level>j}"  @click="xxAction(j,$event)" v-for='(i,j) in 5' :key='j'></i>
        </div>
        <div class='icon' v-show="evaluationEdit">
          <i class='icon-xxx' :class="{iconActive:level>j}"  v-for='(i,j) in 5' :key='j'></i>
        </div>
      </div>
      <div class='evaluationButton-box'>
        <div class='evaluationButton'>
          <div v-for='(item,index) in evaluaButton' v-bind:key='item.label_name' @click='changeEBbutton(index)' :class='{ebuttonActive: !item.changeState}' v-show="!evaluationEdit">{{item.label_name}}</div>
          <div v-for='(item,index) in evaluaButton' v-bind:key='index' class='ebuttonActive' v-show="evaluationEdit">{{item}}</div>
        </div>
      </div>
      <div class='service-area'>
        <textarea placeholder='请您对本次医生问诊服务补充评价~' ref='txt' v-model="content" v-show="!evaluationEdit"></textarea>
        <span v-show="evaluationEdit">"{{content}}"</span>
      </div>
      <div class='elect' v-show="!evaluationEdit">
        <img src='./img/iconxh_wz_elect.png' alt='' v-if='anonymousState' @click='anonymousStateChange'>
        <img src='./img/iconxh_wz_unelect.png' alt='' v-else  @click='anonymousStateChange'>
        <span>匿名提交</span>
      </div>
      <div class='submit' v-show="!evaluationEdit">
        <button @click="submitEvaluation">提交评价</button>
      </div>
    </ul>
    <ul :class="{'topChange':titleTwo, 'service':classIndex == 2 , 'send':classIndex == 2}" v-show='classIndex == 2'>
      <div class='service-text'>选择你被治愈的疾病</div>
      <div class='searchInputBox' v-show="!bannerEdit">
        <div class="serviceSearchInput">
          <i class="mintui mintui-search"></i>
          <form  @submit.prevent action="#">
            <input v-model="pointName" placeholder="请输入关键词" ref="searchInput" type="search" @keypress="searchGoods">
          </form>
          <!--<input type="serch" placeholder='请输入关键词'>-->
        </div>
      </div>
      <div class='evaluationButton-box'>
        <div class='jqButton'>
          <div v-for='(item,index) in pennantData' v-bind:key='item.id' @click='changejqBbutton(index)' v-show="!bannerEdit">
            <i :class='{jqActive: !item.changeState}'></i>
            <span :class='{jqActive: !item.changeState}'>
              {{item.banner_name}}
            </span>
            <b :class='{jqActive: !item.changeState}'></b>
          </div>
          <div v-for='(item,index) in pennantData' v-bind:key='index' v-show="bannerEdit">
            <i class='jqActive'></i>
            <span class='jqActive'>
              {{item}}
            </span>
            <b class='jqActive'></b>
          </div>
        </div>
      </div>
      <div class="changeOne" @click="changeOne" v-show="!bannerEdit">
        <img src="./img/xh_icon_change.png" alt="">
        <span>换一批</span>
      </div>
      <div class='service-area' style="margin-top: 30px;">
        <textarea placeholder='补充治疗效果如何，问诊服务怎样，如实填写对患有此病的人更有帮助！' ref='txt' v-model="pennantContent" v-show="!bannerEdit"></textarea>
        <span  v-show="bannerEdit">"{{pennantContent}}"</span>
      </div>
      <div class='submit' v-show="!bannerEdit">
        <button @click="sendPennant">赠送锦旗</button>
      </div>
    </ul>
  </div>
</template>
<script>
import searchInput from '@/components/search/searchInput';
// import javaAjax from '@/utils/javaApiRequest';
import doctorAjax from '@/utils/doctorAjax';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      classIndex: 1,
      products: [],
      evaluaButton: [],
      evaluaButtonList: [[], [], [], [], []],
      anonymousState: false,
      searchComplete: [], // 搜索补全数据
      keywords: '',
      restaurants: [],
      state: '',
      timeout: null,
      level: 5,
      content: '',
      doctor_id: '',
      user_id: '',
      username: '',
      avatar: '',
      pointName: '',
      searchPageIndex: 1,
      searchPageSize: 10,
      pennantData: [],
      pennantPagescount: 0,
      pennantContent: '',
      titleTwo: false,
      evaluationid: '',
      bannerid: '',
      evaluationEdit: false,
      bannerEdit: false
    };
  },
  components: {
    'search-input': searchInput
  },
  methods: {
    // F-1:点击状态切换
    goRoute(classIndex) {
      if (classIndex === this.classIndex) {
        return;
      }
      this.classIndex = classIndex;
      if (classIndex === 2) {
        // 获取锦旗标签
        if (!this.bannerEdit) {
          this.searchPageIndex = 1;
          this.pointName = '';
          this.getSearch();
        }
      } else if (classIndex === 1) {
        if (!this.evaluationEdit) {
          this.GetServiceEvaluation();
        }
      }
    },
    // F-2:评价星级,待修改原有index
    xxAction(j, $event) { // 评价星级
      console.log(j, $event);
      this.level = j + 1;
      this.evaluaButton = this.evaluaButtonList[j];
    },
    // F-3: 医生评论按钮状态切换
    changeEBbutton(index) {
      this.evaluaButton[index].changeState = !this.evaluaButton[index].changeState;
    },
    // F-4: 匿名状态切换
    anonymousStateChange() {
      this.anonymousState = !this.anonymousState;
    },
    // F-5: 搜索
    searchGoods(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.searchPageIndex = 1;
        this.pointName = event.target.value;
        console.log(this.pointName);
        this.getSearch();
      }
    },
    getSearch() {
      let data = {
        pageIndex: this.searchPageIndex,
        pageSize: this.searchPageSize,
        name: this.pointName
      };
      doctorAjax.get(`/api/doctor/GetPresentedBanner`, { params: data }).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0 && res.data.data) {
            console.log(res, '锦旗');
            let pennantData = res.data.data;
            pennantData.forEach((value, index) => {
              this.$set(value, 'changeState', true);
            });
            this.pennantData = pennantData;
            this.pennantPagescount = res.data.pagescount;
          }
        }
      });
    },
    changeOne() {
      this.pointName = '';
      if (this.pennantPagescount === this.searchPageIndex) {
        this.searchPageIndex = 1;
      } else {
        this.searchPageIndex = this.searchPageIndex + 1;
      }
      this.getSearch();
    },
    // F-6:修改锦旗按钮选中取消
    changejqBbutton(index) {
      // 先把所有按钮置灰，再点亮当前选中的按钮
      this.pennantData.forEach((value, index) => {
        if (!value.changeState) {
          value.changeState = !value.changeState;
        }
      });
      this.pennantData[index].changeState = !this.pennantData[index].changeState;
    },
    // F-7: 获取评价标签
    GetServiceEvaluation() {
      doctorAjax.get(`/api/doctor/GetServiceEvaluation`).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0 && res.data.data) {
            let datas = res.data.data;
            let newArr = [[], [], [], [], []];
            newArr.forEach((v, i) => {
              datas.forEach((value, index) => {
                if ((value.label_level - 1) === i) {
                  this.$set(value, 'changeState', true);
                  newArr[i].push(value);
                }
              });
            });
            console.log(newArr);
            this.evaluaButtonList = newArr;
            let levelNum = this.level - 1;
            this.evaluaButton = this.evaluaButtonList[levelNum];
          }
        }
      });
    },
    // F-8: 提交评价
    submitEvaluation() {
      // 1.获取页面选中的评价标签按钮
      let label_item = '';
      this.evaluaButton.forEach((value, index) => {
        if (!value.changeState) {
          if (label_item.length === 0) {
            label_item = value.label_name;
          } else {
            label_item = label_item + ',' + value.label_name;
          }
        }
      });
      if (!label_item) {
        Toast('请选择评价标签');
        return;
      }
      // 2.评价内容，匿名0实名1
      if (!this.content) {
        Toast('请输入评价内容');
        return;
      }
      let anonymous = 1;
      if (this.anonymousState) {
        anonymous = 0;
      }
      let evaluationDatas = {
        doctor_id: this.doctor_id,
        user_id: this.user_id,
        star_num: this.level,
        label_item: label_item,
        content: this.content,
        username: this.username,
        avatar: this.avatar,
        anonymous: anonymous,
        substatus: 1,
        id: this.evaluationid
      };
      doctorAjax.post(`/api/doctor/CreateServiceEvaluation`, evaluationDatas).then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.code === 0) {
            Toast('提交成功');
            window.location.href = '/inquiry/doing?chatTimes=again';
          }
        }
      });
    },
    // F-9: 赠送锦旗
    sendPennant() {
      // 1.获取页面选中的锦旗
      let banner_item = '';
      let banner_item_list = '';
      this.pennantData.forEach((value, index) => {
        if (!value.changeState) {
          banner_item = value.banner_name;
        }
        if (banner_item_list.length === 0) {
          banner_item_list = value.banner_name;
        } else {
          banner_item_list = banner_item_list + ',' + value.banner_name;
        }
      });
      if (!banner_item) {
        Toast('请选择治愈的疾病');
        return;
      }
      if (!this.pennantContent) {
        Toast('请选择赠送锦旗的评价');
        return;
      }
      let datas = {
        doctor_id: this.doctor_id,
        user_id: this.user_id,
        banner_item: banner_item,
        content: this.pennantContent,
        username: this.username,
        avatar: this.avatar,
        substatus: 1,
        banner_item_list: banner_item_list,
        id: this.bannerid
      };
      console.log(datas);
      doctorAjax.post(`/api/doctor/CreatePresentedBanner`, datas).then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.code === 0) {
            Toast('赠送成功');
            if (this.titleTwo) {
              this.$router.push({
                path: '/doctorDetail',
                query: {
                  doctorid: this.doctor_id,
                  user_id: this.user_id,
                  username: this.username,
                  avatar: this.avatar
                }
              });
            } else {
              window.location.href = '/inquiry/doing?chatTimes=again';
            }
          }
        }
      });
    },
    // F-10: 新增
    /**
    addCon() {
      if (this.classIndex === 1) {
        // 服务评价 获取评价标签
        this.GetServiceEvaluation();
      }
      if (this.classIndex === 2) {
        // 获取锦旗标签
        this.searchPageIndex = 1;
        this.pointName = '';
        this.getSearch();
      }
    }
     **/
  },
  mounted() {
    this.doctor_id = this.$route.query.doctor_id;
    this.user_id = this.$route.query.user_id;
    this.username = this.$route.query.username;
    this.avatar = this.$route.query.avatar;
    // 1.进来标题只显示赠送锦旗，新增锦旗
    if (this.$route.query.titleTwo) {
      this.titleTwo = this.$route.query.titleTwo;
      this.classIndex = 2;
      this.searchPageIndex = 1;
      this.pointName = '';
      this.getSearch();
      return;
    }
    // 2.查询id是否服务评价和锦旗评价
    let evaluationid = this.$route.query.evaluationid;
    if (evaluationid) {
      this.evaluationid = evaluationid;
      console.log(evaluationid);
      let edata = { id: evaluationid };
      // 如果有评价id,查询之前是否有过服务评价，没有的话就是简单的新增页
      doctorAjax.get(`/api/doctor/GetServiceEvaluationById`, { params: edata }).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0 && res.data.data) {
            if (res.data.data.substatus === 0) {
              console.log('新增');
              this.GetServiceEvaluation();
            } else {
              console.log('编辑一下');
              this.evaluationEdit = true;
              let eres = res.data.data;
              this.level = eres.star_num;
              this.evaluaButton = eres.label_item.split(',');
              this.content = eres.content;
            }
          }
        }
      });
    }
    // 3.查询锦旗id
    let bannerid = this.$route.query.bannerid;
    if (bannerid) {
      this.bannerid = bannerid;
      console.log(bannerid);
      let bdata = { id: bannerid };
      // 如果有评价id,查询之前是否有过服务评价，没有的话就是简单的新增页
      doctorAjax.get(`/api/doctor/GetPresentedBannerById`, { params: bdata }).then((res) => {
        console.log(res.data.data, '锦旗数据');
        if (res.status === 200) {
          if (res.data.code === 0 && res.data.data) {
            if (res.data.data.substatus === 1) {
              console.log('编辑锦旗');
              this.bannerEdit = true;
              let dres = res.data.data;
              this.pennantData = dres.banner_item.split(',');
              console.log(this.pennantData, 1111111);
              this.pennantContent = dres.content;
            }
          }
        }
      });
    }
  }
};
</script>
<style scoped lang='less'>
@color99: #999;
@colore0: #e0e0e0;
.serviceEvaContainer{
  position:absolute;width:100%;height:100%;top:0;left:0;overflow-y:auto;
  background-color:#fff;
  color: #333;
}
.fff{
  background: #ffffff;
}
.borderBottom{
  border-bottom:1px solid #e0e0e0;
}
.coupon-title{
  .borderBottom;
  .fff;
  position: fixed;
  left:0;
  top:40px;
  width:100%;
  height: 47px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index:20;
  li{
    width:70px;
    height: 100%;
    line-height: 45px;
    font-size: 16px;
    display: flex;
    justify-content: center;
  }
  .grayBorder{
    width:1px;
    height: 80%;
    background:  #e5e5e5;
  }
  .couponActive{
    color:#0ccdd4;
    border-bottom: 1px solid #0ccdd4;
  }
}
.service{
  margin-top: 90px;
  .service-text{
    padding-top: 25px;
    text-align: center;
    font-size: 15px;
    color: #666666;
  }
  .icon-wrap{
    margin-top: 25px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-xxx {
      display: inline-block;
      width:33px;
      height: 31px;
      background: url('./img/xh_icon_star1.png') no-repeat;
      background-size: 100%;
      margin-right: 16px;
    }
    .iconActive {
      display: inline-block;
      width: 33px;
      height: 31px;
      background: url('./img/xh_icon_star.png') no-repeat;
      background-size: 100%;
    }
  }
  .icon {
    margin-left: 7px;
  }
  .evaluationButton-box{
    margin-top:10px;
  }
  .jqButton{
    width:100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    >div{
      width:auto;
      height:28px;
      margin-top: 20px;
      margin-left: 12px;
      margin-right: 12px;
    }
    span,i,b{
      height: 28px;
      float: left;
    }
    span{
      padding: 0px 12px;
      line-height: 28px;
      color: #fb5557;
      white-space: nowrap;
      background: url("./img/xh_btn_normz@2x.png") repeat-x;
      background-size: 1px 28px;
      background-positon: 100% 100%;
    }
    span.jqActive{
      color: #ffffff;
      background-image: url("./img/xh_btn_pressz@2x.png");
    }
    i{
      width: 3px;
      background: url('./img/xh_btn_normy@2x.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    i.jqActive{
      background-image: url("./img/xh_btn_pressy@2x.png");
    }
    b{
      width:8px;
      background: url('./img/xh_btn_norm@2x(2).png')  no-repeat center center;
      background-size: 100%;
    }
    b.jqActive{
      background-image: url("./img/xh_btn_press@2x(2).png");
    }
  }
  .evaluationButton{
    width:100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    >div{
      margin-top: 20px;
      margin-left: 12px;
      margin-right: 12px;
      padding: 5px 8px;
      border-radius: 15px;
      border: solid 1px #999999;
      font-size: 15px;
      color: #666666;
    }
    >div.ebuttonActive{
      border: none;
      background-color: #0ccdd4;
      color: #ffffff;
      padding: 6px 9px;
    }
  }
  .service-area{
    margin-top: 61px;
    display: flex;
    justify-content: center;
    margin-right: 10px;
    margin-left: 10px;
    >textarea{
      width:100%;
      height: 128px;
      color: #666;
      border-color: #E2E2E2;
      padding: 15px 10px;
      font-size: 15px;
    }
    >textarea::-webkit-input-placeholder {
      color: #EBEBED;
    }
    >textarea:-moz-placeholder {
      color: #EBEBED;
    }
    >textarea::-moz-placeholder {
      color: #EBEBED;
    }
    >textarea::-ms-input-placeholder {
      color: #EBEBED;
    }
  }
  .elect{
    margin-top: 9px;
    margin-left: 10px;
    img{
      width: 13px;
      height: 13px;
      margin-right: 4px;
    }
  }
  .submit{
    display: flex;
    justify-content: center;
    margin: 39px 10px 20px;
    button{
      width:100%;
      height: 40px;
      background-color: #0ccdd4;
      border-radius: 3px;
      font-size: 18px;
      color: #ffffff;
    }
  }
  .changeOne{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width:15px;
      height: 15px;
      margin-right: 5px;
    }
    font-size: 15px;
    color: #0ccdd4;
    margin-top: 30px;
  }
}
  .send.topChange{
     margin-top: 44px;
   }
  .send{
    >.searchInputBox{
      width: 100%;
      height: 40px;
      margin-top: 25px;
      padding: 0 10px;
      .serviceSearchInput{
        width:100%;
        border:none;
        height: 40px;
        line-height: 40px;
        background-color: #f1f1f1;
        color: #606266;
        display: flex;
        .mintui.mintui-search{
          color: #999 !important;
          margin: 0 4px 0 12px;
        }
        form{
          flex: 1;
        }
        input{
          background-color: #f1f1f1;
          width:100%;
        }
        >input::-webkit-input-placeholder {
          color: #999;
        }
        >input:-moz-placeholder {
          color: #999;
        }
        >input::-moz-placeholder {
          color: #999;
        }
        >input::-ms-input-placeholder {
          color: #999;
        }
      }
    }
  }

</style>

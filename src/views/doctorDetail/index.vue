<template>
  <div class="has-header gray-background doctor-detail">
    <mt-header fixed title="医生详情">
      <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div v-if="doctorInfo" class="detail-box">
      <div class="basic-info">
        <span class="img-box">
          <img :src="doctorInfo.avatar" class="img" />
          <!--<label class="approve-txt">{{doctorInfo.authdesc}}</label>-->
        </span>
        <label class="doctor-name">{{doctorInfo.real_name}}
          <i style="font-size: 14px">{{doctorInfo.depart_name}}</i>
        </label>
        <p class="doctor-info">{{doctorInfo.title_name}} | {{doctorInfo.referhosname}}</p>
        <!--<label>{{doctorInfo.referhosname}}</label>-->
        <div class="seviceNnum">
          <img src="./img/icon_fw_ysxq@2x.png" alt="">
          <span>服务患者数{{doctorInfo.consultnum}}</span>
        </div>
      </div>
      <!--个人简介-->
      <div class="info-box">
        <img src="./img/xh_icon_grjj.png" class="left icon" />
        <label class="txt">个人简介</label>
        <p class="con-txt">{{doctorInfo.personalinfo}}</p>
      </div>
      <!--擅长-->
      <div class="info-box expert-box">
        <img src="./img/xh_icon_sc.png" class="left icon" />
        <label class="txt">擅长</label>
        <p class="con-txt">{{doctorInfo.expert}}</p>
      </div>
      <div class="goods-row"></div>
      <!--评价-->
      <div class="doctor-evaluation"  @click="goEvaluation">
        <div class="top-box">
          <div>评价({{doctorInfo.commentsnum}})</div>
          <div @click="goEvaluation">
            <span>全部评价</span>
            <img src="../aboutUs/img/icon_jt@3x.png" alt="">
          </div>
        </div>
        <ul class="goods-eMore">
          <li v-for="(item,index) in doctorInfo.serviceevaluationlist" v-bind:key="index">
            <div class="goods-evalTop">
              <img :src="item.avatar" alt="" v-show="item.avatar">
              <img src="../goods/img/niming.png" alt="" v-show="!item.avatar">
              <span>{{item.username?item.username : '匿名用户'}}</span>
              <div class="x-icon">
                <em class="xx-icon" v-for="i in item.commentLevel" :key="i"></em>
              </div>
              <div class="x-icon">
                <em class="xxno-icon" v-for="j in item.commentLevelNo" :key="j"></em>
              </div>
              <i>{{item.create_time}}</i>
            </div>
            <div class="goods-evalBottom">
              <span>
                {{item.content}}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="goods-row"></div>
      <!--荣誉锦旗-->
      <div  class='pennants'>
        <div class="top-box">
          <div>荣誉锦旗({{doctorInfo.presentebanner.presentednum}})</div>
          <div @click="goPennent">
            <span>全部锦旗</span>
            <img src="../aboutUs/img/icon_jt@3x.png" alt="">
          </div>
        </div>
        <div class="pennants-box">
          <div class="pennants-boxleft">
            <img src="./img/xh_icon_flag.png" alt="">
            <span @click="sendPennant">赠送锦旗</span>
          </div>
          <div class="pennants-boxright">
              <div v-for='item in doctorInfo.presentebanner.presentegrouplist' v-bind:key='item.banner_item'>
                <i :class='{jqActive: !item.changeState}'></i>
                <span :class='{jqActive: !item.changeState}'>
                  {{item.banner_item}}({{item.num}})
                </span>
                <b :class='{jqActive: !item.changeState}'></b>
              </div>
            </div>
        </div>
      </div>
    </div>
    <!---->
    <!--再次咨询-->
    <!--在线状态 0：online 在线、1：offline 离线、2：logout 登出-->
    <!--<div class="consulting" v-if="doctorInfo && seeDoctor">-->
      <!--<div v-if="doctorInfo.online_status == 1 || doctorInfo.online_status == 2">-->
        <!--<div class="consulting-span">医生当前不在线</div>-->
        <!--<div class="consulting-button" @click="goInquiry" >-->
          <!--<img src="./img/lyg_ly.png" alt="">-->
          <!--<span>给医生留言</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="consulting-button" v-if="doctorInfo.online_status == 0" @click="goInquiry" >-->
        <!--<img src="./img/lyg_zx.png" alt="">-->
        <!--<span>咨询医生</span>-->
      <!--</div>-->
    <!--</div>-->
    <!--以前进入问诊-->
    <!--<div class="inquiry-btn" @click="goInquiry" v-if="hasInquiry">进入问诊</div>-->
  </div>
</template>
<script>
// import ajax from '@/utils/ajax';
import doctorAjax from '@/utils/doctorAjax';
// import { wxConsultDoctor } from '@/api/wxConsultDoctor';
// import ajax from '@/utils/ajax';
// import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      unionId: null,
      doctorId: '',
      doctorInfo: null,
      hasInquiry: false,
      commentLevel: 5,
      commentLevelNo: 0,
      evaluaButton: [
        { text: '非常敬业', changeState: true },
        { text: '医生态度敷衍', changeState: true },
        { text: '回答不专业', changeState: true },
        { text: '问诊时间不够', changeState: true },
        { text: '有耐心', changeState: true },
        { text: '热情亲切', changeState: true }
      ],
      // seeDoctor: false
    };
  },
  mounted() {
    // this.seeDoctor = this.$route.query.seeDoctor ? this.$route.query.seeDoctor : false;
    this.getInit();
    this.getDetail();
  },
  methods: {
    getInit() {
      // this.unionId = this.$route.query.unionId;
      this.unionId = sessionStorage.getItem('wxUnionId');
      this.hasInquiry = this.unionId ? true : false;
    },
    getDetail() {
      this.doctorId = this.$route.query.doctorid;
      doctorAjax.get(`/api/doctor/getDoctorInfo/${this.doctorId}`).then((res) => {
        console.log(res, '医生详情');
        if (res.status === 200) {
          if (res.data.code === 0) {
            console.log(res);
            let ddata = res.data.data;
            if (ddata.serviceevaluationlist && ddata.serviceevaluationlist.length > 0) {
              ddata.serviceevaluationlist.forEach(function (value, index) {
                value.create_time = value.create_time.substring(0, 10);
                value.commentLevel = parseInt(value.star_num, 10);
                value.commentLevelNo = 5 - parseInt(value.star_num, 10);
              });
            }
            this.doctorInfo = res.data.data;
          }
        }
      });
    },
    //  离线-问诊
    /**
    goInquiry() {
      let doctorInfo = this.doctorInfo;
      // let unionId = this.$route.query.unionId;
      // let unionId = sessionStorage.getItem('wxUnionId');
      let doctorId = doctorInfo.user_id;
      let realName = doctorInfo.real_name;
      let avatar = doctorInfo.avatar;
      // wxConsultDoctor(this.unionId, doctorId, realName, avatar);
      // 获取群组id等信息
      let that = this;
      let params = {
        doctorid: that.doctorId,
        real_name: that.doctorInfo.real_name,
        avatar: that.doctorInfo.avatar
      };
      ajax.post(`/api/user/offlineConsult`, params).then((res) => {
        console.log(res, '群组id');
        if (res.status === 200) {
          if (res.data.code === 0) {
            console.log(res);
            let consultRes = res.data.data;
            let consultData = {
              doctorid: that.doctorId,
              realname: that.doctorInfo.real_name,
              groupid: consultRes.groupid,
              doctorphotopath: that.doctorInfo.avatar,
              consultid: '',
              remainingseconds: 0
            };
            sessionStorage.setItem('consultData', JSON.stringify(consultData));
            window.location.href = '/inquiry/doing?chatTimes=again&fromDoctorDetail=true';
          } else {
            Toast('用户信息验证失败');
          }
        }
      });
    },
    **/
    // 查看所有评价
    goEvaluation() {
      this.$router.push({
        path: '/allEvaluation', query: {
          doctorid: this.doctorId,
          realname: this.doctorInfo.real_name
        }
      });
    },
    // 查看所有锦旗
    goPennent() {
      this.$router.push({
        path: '/allpennant', query: {
          doctorid: this.doctorId,
          realname: this.doctorInfo.real_name,
          user_id: this.$route.query.user_id,
          username: this.$route.query.username,
          avatar: this.$route.query.avatar,
        }
      });
    },
    // 赠送锦旗
    sendPennant() {
      this.$router.push({
        path: '/serviceEvaluation',
        query: {
          doctor_id: this.doctorId,
          user_id: this.$route.query.user_id,
          username: this.$route.query.username,
          avatar: this.$route.query.avatar,
          titleTwo: true
        }
      });
    }
  }
};

</script>
<style lang='less' scoped>
@import '../../styles/mixin.less';
.doctor-detail {
  height: 100%;
}
.gray-background{
  background: #f5f5f5;
}
.detail-box{
  // margin-bottom: 56px;
  .basic-info{
    padding-bottom: 15px;
    overflow: hidden;
    background: url('./img/xh_bg_yszy.png');
    background-size: 100% 100%;
    text-align: center;
    .img-box{
      position: relative;
      display: block;
      margin: 15px auto 13px;
      .img{
        width: 60px;
        height: 60px;
        border: solid 1px @green-color;
        border-radius: 50%;
      }
      .approve-txt{
        position: absolute;
        left: 50%;
        bottom: -3px;
        transform: translateX(-50%);
        background: @white-color;
        .border-radius-btn(16px, 5px, @green-color, 20px, 10px);
      }
    }
    .doctor-name{
      font-size: 17px;
      color: #333333;
    }
    .doctor-info{
      margin: 7px 0;
    }
    .seviceNnum{
      display: inline-block;
      padding: 0 10px;
      height: 16px;
      line-height: 16px;
      background-color: #ff8f2b;
      border-radius: 16px;
      img{
        width: 10px;
        height: 10px;
      }
      span{
        font-size: 10px;
        color: #ffffff;
      }
    }
  }
  .info-box{
    padding: 12px 10px 14px;
    margin-top: 10px;
    background: @white-color;
    .icon{
      width: 18px;
      height: 18px;
      margin-right: 6px;
    }
    .txt{
      font-size: 15px;
    }
    .con-txt{
      margin-top: 7px;
      line-height: 24px;
      font-size: 13px;
      text-align: justify;
      word-break: break-all;
    }
  }
  /*评价*/
  .top-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    height:42px;
    padding: 0 10px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 15px;
    color: #333333;
    div:nth-child(2){
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #666666;
      img{
        width:6px;
        height: 12px;
        margin-left: 5px;
      }
    }
  }
  .goods-row{
    width:100%;
    height: 10px;
    background-color: #f5f5f5;
  }
  .doctor-evaluation{
    /*margin-top: 10px;*/
    background: #ffffff;
    .goods-eMore{
      padding:0px 10px;
      .goods-evalBottom{
        margin-left: 34px;
        margin-top: 12px;
      }
      li{
        padding-bottom: 10px;
      }
      li:not(:first-child){
        border-top: 1px solid #dfdfdf;
        padding-top: 10px;
      }
      .goods-evalTop{
        margin-top: 10px;
        display: flex;
        align-items: center;
        position: relative;
        img{
          background-color:#dddddd;
          border-radius: 50%;
          width: 25px;
          height: 25px;
        }
        span{
          margin-left:10px;
          font-size:13px;
          color: #333;
          margin-right: 5px;
        }
        i{
          font-size:11px;
          color: #888888;
          position: absolute;
          right:10px;
          top:1px;
        }
        .x-icon{
          height: 10px;
          display: flex;
          em{
            display: block;
            width: 12px;
            height: 12px;
            margin-left:3px;
          }
          em.xx-icon{
            background: url("../evaluate/img/icon-xx@2x.png") no-repeat;
            background-size: 100%;
          }
          em.xxno-icon{
            background: url("./img/xh_icon_star1.png") no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
  /*荣誉锦旗*/
  .pennants{
    margin-bottom: 94px;
    .pennants-box{
      padding: 15px 14px 22px 10px;
      display: flex;
      background: #ffffff;
      .pennants-boxleft{
        width:78px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
          width: 52px;
          height: 53px;
        }
        span{
          margin-top: 10px;
          text-align: center;
          line-height: 20px;
          width:64px;
          height: 20px;
          border-radius: 10px;
          border: solid 1px #0ccdd4;
          font-size: 12px;
          color: #0ccdd4;
        }
      }
      .pennants-boxright{
        flex: 1;
        width:100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        >div{
          width:auto;
          height:28px;
          margin: 5px 12px;
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
        i{
          width: 3px;
          background: url('./img/xh_btn_normy@2x.png');
          background-size: 100%;
          background-repeat: no-repeat;
        }
        b{
          width:8px;
          background: url('./img/xh_btn_norm@2x(2).png')  no-repeat center center;
          background-size: 100%;
        }
      }
    }
  }
  /*.pennantsDoctor{*/
    /*margin-bottom: 10px;*/
  /*}*/
}
.inquiry-btn{
  position: fixed;
  bottom: 0;
  width: 100%;
  .background-radius-btn(40px, 0, @green-color, 0, 18px);
}
  /*再次咨询*/
  .consulting{
    width:100%;
    min-height:63px;
    position: fixed;
    left: 0;
    bottom: 0;
    border-top: 1px solid #ebebeb;
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    flex-direction: column;
    padding: 10px 0;
    img{
      margin-right: 7px;
    }
    .consulting-span{
      text-align: center;
      width: 100%;
      font-size: 12px;
      line-height: 20px;
      color: #999999;
    }
    .consulting-button{
      margin: 10px 12px;
      height: 43px;
      display: flex;
      background-color: #0ccdd3;
      border-radius: 3px;
      color: #ffffff;
      font-size: 15px;
      justify-content: center;
      align-items: center;
      img{
        width:14px;
        height: 13px;
      }
    }
  }
</style>

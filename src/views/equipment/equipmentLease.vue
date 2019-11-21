<template>
<div class="equipmentLease">
  <mt-header title="脉诊仪租赁">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    <!-- <mt-button icon="back" slot="left" @click="back"></mt-button> -->
  </mt-header>
  <div class="equipmentLeaseMain">
    <div class="banner">
      <img src="./imgs/lease.jpg" alt="">
      <!-- <mt-swipe :auto="0">
        <mt-swipe-item v-for="(item, index) in bannerSwiper" :key="index">
          <img :src="item" alt="">
        </mt-swipe-item>
      </mt-swipe> -->
    </div>
    <h2>康美智能中医脉诊仪</h2>
    <div class="rent">
      <!-- <span>￥<em>{{Number(info.price).toFixed(2)}}</em></span>/天起 -->
      <span>￥<em>{{info.price}}</em></span>/天起
    </div>
    <!-- <div class="deposit">设备押金：￥{{Number(info.deposit)}}</div> -->
    <div class="deposit">设备押金：￥{{info.deposit}}</div>
    <div class="classics-nav">
      <div @click="classificationAction('1')" :class="listType==='1'?'selected':''"><router-link to="">设备介绍</router-link></div>
      <div @click="classificationAction('2')" :class="listType==='2'?'selected':''"><router-link to="" >租借说明</router-link></div>
    </div>
    <mt-tab-container v-model="listType">
      <mt-tab-container-item id="1">
        <div class="introduce"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="process">租借流程</div>
        <div class="flowChart">
          <div class="flowChartTop">
            <img src="./imgs/icon_p_zjxd.png" alt="" class="icon">
            <p></p>
            <img src="./imgs/icon_p_kdfh.png" alt="" class="icon">
            <p></p>
            <img src="./imgs/icon_n_shty.png" alt="" class="icon">
            <p></p>
            <img src="./imgs/icon_n_jshh.png" alt="" class="icon">
            <p></p>
            <img src="./imgs/icon_n_wc.png" alt="" class="icon">
          </div>
          <div class="flowChartBot">
            <div class="step1">租借下单</div>
            <div class="step2">快递寄发</div>
            <div class="step3">用户收货体验</div>
            <div class="step4">寄送归还</div>
            <div class="step5">订单结束</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="process-item">租借时间</div>
        <div class="process-item no-border">开始时间：确认收货后第二天开始计算租借时间</div>
        <div class="process-item no-border">结束时间：归还设备并支付租金当天</div>
        <div class="line"></div>
        <div class="process-item">租借须知</div>
        <div class="notice">
          <p>1、押金在设备归还后自动原路退还。</p>
          <p>2、租金在归还设备时支付。</p>
          <p>3、使用天数将在确认收货后第二天开始计算。</p>
          <p>4、返还设备的运费需用户自行承担。</p>
          <p>5、最少租用时间为7天，少于7天，租金将按7天计算。</p>
        </div>
        <div class="line height15"></div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
  <div class="immediately-w">
    <!-- <div class="immediately-l">租金：<span>¥{{Number(info.price).toFixed(2)}}/天</span></div> -->
    <div class="immediately-l">租金：<span>¥{{info.price}}/天</span></div>
    <div @click="immediately" class="immediately-r">立即租借</div>
  </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      listType: '2',
      info: {},
      bannerSwiper: []
    };
  },
  methods: {
    back() {
      this.$router.push('/equipment/index');
    },
    // 分类
    classificationAction(res) {
      this.listType = res;
    },
    // 立即租借
    immediately() {
      this.$router.push('/equipment/equipmentLeaseSubmission');
    }
  },
  created() {
    // 获取设置的脉诊仪押金和租金
    ajax.get(`/api/borrow/GetBorrowSetting`).then((res) => {
      console.log(res);
      if (res.status === 200 && res.data.code === 0) {
        this.info = res.data.data;
      } else if (res.status === 200 && res.data.code === -2) {
        Toast({
          message: '未登录，请先登录',
          position: 'middle',
          duration: 1500
        });
      } else {
        Toast({
          message: res.data.message,
          position: 'middle',
          duration: 500
        });
      }
    });
  }
};
</script>

<style lang="less" scoped>
.equipmentLease{
  padding-top: 0.1px;
  .equipmentLeaseMain{
    padding-top: 44px;
    padding-bottom: 40px;
  }
  .banner{
    height: 204px;
    background: #ccc;
    img{
      height: 100%;
      width: 100%;
    }
    /deep/ .mint-swipe-indicators{
      display: none;
    }
  }
  h2{
    height: 46px;
    line-height: 46px;
    padding-left: 10px;
    font-size: 16px;
    font-weight: normal;
  }
  .rent{
    height: 17px;
    line-height: 17px;
    font-size: 12px;
    padding-left: 10px;
    em{
      font-size: 14px;
    }
    span{
      color: #ff4c56;
    }
  }
  .deposit{
    height: 43px;
    line-height: 43px;
    padding-left: 10px;
  }
}
.classics-nav{
  display: flex;
  height: 44px;
  font-size: 15px;
  color: #0ccdd3;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  >div{
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    >a{
      display: inline-block;
      height: 100%;
      line-height: 200%;
      text-align: center;
      padding: 6px 0;
    }
  }
  >div.selected a{
    border-bottom: 1px solid #0ccdd3;
    color: #0fcbd6;
  }
}
.line{
  height: 10px;
  background: #eeeef3;
}
// 设备介绍
.introduce{
  height: 2371px;
  background: url('./imgs/img-d.jpg');
  background-size: 100% 100%;
  position: relative;
}
// 租借说明
.process{
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  color: #333333;
  font-size: 15px;
  border-bottom: 1px solid #e0e0e0;
}
.flowChart{
  height: 23.2vw;
  padding: 5.33333vw 0px;
  .icon{
    width: 7.73333vw;
    height: 7.73333vw;
  }
  .flowChartTop{
    padding: 0 5.33333vw;
    display: flex;
    height: 7.73333vw;
    align-items: center;
    p{
      width: 12.666667vw;
      height: 1px;
      background: #c1c1c1;
    }
  }
  .flowChartBot{
    width: 200%;
    margin-left: -48vw;
    // margin-top: 1.866667vw;
    padding: 0 2.666667vw;
    display: flex;
    transform: scale(0.5);
    div{
      font-size: 6.4vw;
      height: 9.066667vw;
      line-height: 9.066667vw;
      text-align: center;
    }
    .step1{
      // width: 14.933333vw;
      width: 29.86666vw;
      color: #00b0b9;
      margin-right: 8vw;
    }
    .step2{
      width: 29.86666vw;
      color: #00b0b9;
      // margin-right: 2.666667vw;
      margin-right: 5.333334vw;
    }
    .step3{
      // width: 22.4vw;
      width: 44.8vw;
      margin-right: 5.333334vw;
    }
    .step4{
      width: 29.86666vw;
      margin-right: 5.333334vw;
    }
    .step5{
      width: 29.86666vw;
    }
  }
}
.process-item{
  height: 45px;
  line-height: 45px;
  padding-left: 10px;
  border-bottom: 1px solid #e0e0e0;
  color: #333333;
}
.no-border{
  border: none;
  p{
    line-height: 22px;
    font-size: 14px;
  }
}
.notice{
  padding: 15px 10px;
}
.height15{
  height: 15px;
}
.immediately-w{
  position: fixed;
  width: 100%;
  height: 40px;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: flex-end;
  .immediately-l{
    height: 40px;
    line-height: 40px;
    margin-right: 10px;
    span{
      color: #ff4c56;
      margin-left: 5px;
    }
  }
  .immediately-r{
    width: 127px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #0ccdd3;
    color: #ffffff;
    font-size: 18px;
  }
}
</style>

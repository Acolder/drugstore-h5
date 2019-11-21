<template>
  <div id="seeEvaluate">
    <mt-header title="查看评价">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="content">
      <div class="evaluate-item" v-for="(evaluate,index) in evaluateData" :key="index">
        <div class="title">
          <div class="left">
            <img :src="evaluate.userIcon" alt="">
            <span class="name">{{evaluate.nickname}}</span>
            <div class="grade">
              <i class="xx" v-for="i in 5" :key="i" :class="{'iconActive':evaluate.commentLevel>i-1}"></i>
            </div>
          </div>
          <div class="right">
            <span class="time">{{evaluate.createDate}}</span>
          </div>
        </div>
        <div class="subtitle">
          <p>{{evaluate.content}}</p>
        </div>
        <div class="goods" v-if="evaluate.proudctPo">
          <div class="img">
            <img :src="evaluate.proudctPo.productMainImage" alt="">
          </div>
          <div class="decise">
            <p class="name">{{evaluate.proudctPo.productName}}</p>
            <p class="fication">规格：{{evaluate.proudctPo.productSpecification}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-show="show">
      <div class="img"></div>
      <!-- <img src="./img/icon_zwpj@2x.png" alt=""> -->
      <p>暂无评价~</p>
    </div>
  </div>
</template>

<script>
import { Header, Button, Toast } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
import { formatDate } from '@/utils/date';
export default {
  data() {
    return {
      evaluateData: [],
      show: false
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button,
    Toast
  },
  created() {
    let _self = this;
    javaAjax.post('/mall/comment/commentListByOrderId', { 'orderId': _self.$route.query.orderId }).then(res => {
      if (res.data.resultCode === '0' && res.status === 200) {
        if (res.data.resultData.length === 0) {
          _self.show = true;
        }
        _self.evaluateData = res.data.resultData;
        for (let a = 0; a < _self.evaluateData.length; a++) {
          _self.evaluateData[a].createDate = formatDate(new Date(_self.evaluateData[a].createDate), 'yyyy-MM-dd');
        }
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/mixin.less";
  .content{
    font-size: 12px;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .evaluate-item{
    padding: 8px 10px;
    border-bottom: 1px solid #d0d0d0;
    .title{
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left{
        display: flex;
        align-items: center;
        img{
          width: 26px;
          height: 26px;
          border-radius: 50%;
        }
        .name{
          margin-left: 8px;
          font-size: 14px;
        }
        .grade{
          margin-left: 12px;
          .icon-xx {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: url("./img/icon-xxno@2x.png") no-repeat;
            background-size: 100%;
            margin-left: 4px;
          }
          .iconActive {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: url("./img/icon-xx@2x.png") no-repeat;
            background-size: 100%;
            margin-left: 4px;
          }
        }
      }
    }
    .subtitle{
      line-height: 30px;
      font-size: 13px;
    }
    .goods{
      display: flex;
      align-items: center;
      height: 65px;
      padding-top: 10px;
      .img{
        margin-right: 7px;
        width: 50px;
        height: 50px;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .decise{
        display:flex;
        height: 50px;
        flex-direction: column;
        justify-content: space-around;
        .name{
          width: 270px;
          font-weight: 600;
          font-size: 13px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .fication{
          color: #666;
        }
      }
    }
  }
  .noData{
    text-align: center;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    .img{
      background: url('./img/icon_zwpj@2x.png') no-repeat;
      width: 356px;
      height: 212px;
      margin: 150px auto -36px;
      background-size: 100%;
    }
    p{
      font-size: 14px;
      color: #666666;
      margin-top: 18px;
    }
  }
</style>

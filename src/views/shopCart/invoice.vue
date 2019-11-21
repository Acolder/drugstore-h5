<template>
  <div id="invoice">
    <mt-header title="发票信息">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="content">
      <div class="top">
        <div class="top-left">
          <p>是否需要发票</p>
        </div>
        <div class="top-right">
          <mt-switch v-model="value" @change="turn"></mt-switch>
        </div>
      </div>
      <div class="main" v-show="value">
        <div class="tow">
          <div class="tow-left">
            <p>发票抬头</p>
          </div>
          <div class="tow-right">
            <div class="company" @click="imgAction">
              <!-- <img src="./img/icon-n-swmr@2x@2x.png" alt=""> -->
              <i class="img-company" :class="{imgActive:imgShow}"></i>
              <span>公司</span>
            </div>
            <div class="personal" @click="imgAction">
              <i class="img-company" :class="{imgActive:!imgShow}"></i>
              <!-- <img src="./img/icon-p-dx@2x.png" alt=""> -->
              <span>个人</span>
            </div>
          </div>
        </div>
        <div class="text">
          <textarea placeholder="请输入抬头内容" ref="txt" v-model="raised">
          </textarea>
        </div>
        <div class="tax" v-show="imgShow">
          <p class="title">纳税人识别号</p>
          <input placeholder="请输入纳税人识别号" v-model="payTaxes"/>
        </div>
        <div class="bottom">
          <p class="title">发票内容</p>
          <div class="detail" @click="goodsAction">
            <i class="img-company" :class="{goodsActive:goodsShow}"></i>
            <span>商品明细</span>
          </div>
        </div>
        <div class="button">
          <mt-button type="primary" size="large" @click="submitAction">确定</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Header, Button, Switch, Toast } from 'mint-ui';
export default {
  data() {
    return {
      value: false,
      imgShow: true,
      goodsShow: false,
      payTaxes: '',
      raised: ''
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-switch': Switch,
    Toast
  },
  methods: {
    imgAction() {
      this.imgShow = !this.imgShow;
      if (!this.imgShow) {
        this.payTaxes = '';
      }
    },
    goodsAction() {
      this.goodsShow = !this.goodsShow;
    },
    turn(a) {
      if (a) {
        let info = {
          invoiceInfo: this.value,
          invoiceType: '',
          invoiceTitle: this.raised,
          content: this.goodsShow,
          payTaxes: this.payTaxes
        };
        sessionStorage.setItem('invoice', JSON.stringify(info));
      }
    },
    submitAction() {
      let types = '';
      if (this.imgShow) {
        types = '公司';
      } else {
        types = '个人';
      }
      if (this.raised) {
        if (this.imgShow && this.payTaxes === '') {
          Toast('请输入纳税人识别号');
        } else {
          let info = {
            invoiceInfo: this.value,
            invoiceType: types,
            invoiceTitle: this.raised,
            content: this.goodsShow,
            payTaxes: this.payTaxes
          };
          sessionStorage.setItem('invoice', JSON.stringify(info));
          this.$router.back(-1);
        }
      } else {
        Toast('请输入抬头内容');
      }
    }
  },
  created() {
    if (sessionStorage.getItem('invoice')) {
      let Info = JSON.parse(sessionStorage.getItem('invoice'));
      this.value = Info.invoiceInfo;
      this.holed = Info.invoiceTitle;
      this.goodsShow = Info.content;
      this.payTaxes = Info.payTaxes;
      if (Info.invoiceType === '公司') {
        this.imgShow = true;
      } else {
        this.imgShow = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@backgroundColor:#fff;
  .content{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #efeff4;
    z-index: 1;
  }
  .top{
    background: @backgroundColor;
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 9px;
    .top-left{
      padding-left: 13px;
      font-size: 16px;
      color: #333;
    }
    .top-right{
      width: 52px;
      height: 30px;
      .mint-switch{
        width: 100%;
        height: 100%;
        .mint-switch-input:checked + .mint-switch-core{
           background: green;
        }
      }
    }
  }
  .tow{
    background: @backgroundColor;
    height: 45px;
    display: flex;
    align-items: center;
    padding:  0 9px 0 13px;
    justify-content: space-between;
    .tow-left{
      font-size: 16px;
      color: #333;
    }
    .tow-right{
      color: #333;
      display: flex;
      width: 120px;
      justify-content: space-between;
      img{
        width: 18px;
        height: 18px;
      }
      .company{
        display: flex;
        align-items: center;
        width: 56px;
        justify-content: space-between;
        span{
          font-size: 16px;
        }
      }
      .personal{
        display: flex;
        align-items: center;
        width: 56px;
        justify-content: space-between;
        span{
          font-size: 16px;
        }
      }
      .img-company{
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url('./img/icon-n-swmr@2x@2x.png') no-repeat;
        background-size: 100%;
      }
      .imgActive{
        background: url('./img/icon-p-dx@2x.png') no-repeat;
        background-size: 100%;
      }
    }
  }
  .text{
    background: @backgroundColor;
    padding: 7px 10px;
    textarea{
      display: block;
      width: 100%;
      height: 92px;
      border-color: #e0e0e0;
      padding: 3px;
    }
  }
  .bottom{
    height: 70px;
    background: @backgroundColor;
    padding-left: 13px;
    margin-top: 10px;
    .title{
      line-height: 30px;
    }
    .detail{
      height: 30px;
      width: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .img-company{
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url('./img/icon-n-swmr@2x@2x.png') no-repeat;
        background-size: 100%;
      }
      .goodsActive{
        background: url('./img/icon-p-dx@2x.png') no-repeat;
        background-size: 100%;
      }
      span{
        font-size: 16px;
      }
    }
  }
  .button{
    margin-top: 20px;
    padding: 0 10px;
  }
  .copy{
    position: fixed;
    bottom: 50px;
    right: 0;
    left: 0;
    text-align: center;
  }
  .tax{
    padding: 0 9px 5px 13px;
    background: #fff;
    .title{
      line-height: 30px;
    }
    input{
      height: 30px;
      width: 100%;
      border: 1px solid #e0e0e0;
      font-size: 12px;
      padding-left: 5px;
    }
  }
</style>

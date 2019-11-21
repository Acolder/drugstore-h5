<template>
  <div>
    <div class="loading" v-if="!detailData"></div>
    <div class="receive" v-else>
      <div class="header" v-if="detailData.orderStatus === '20' || (detailData.orderStatus === '30' && $route.query.isReceive)">
        <div class="title">你收到一份精美礼品！</div>
        <div class="img">
          <img :src="detailData.image1" alt="">
          <!-- <img :src="detailData.image.split(',')[1] ? detailData.image.split(',')[1] : detailData.image.split(',')[0]" alt=""> -->
          <div class="giftLang">
            <p class="text">想对你说</p>
            <p class="text">{{detailData.remark}}</p>
          </div>
        </div>
        <div class="tips" v-if="detailData.orderStatus === '20'">此手机号码将作为到门店提取礼品的凭证</div>
        <div class="btn" v-if="detailData.orderStatus === '20'">
          <button @click="goPhone">登记手机号码领取礼品</button>
          <button @click="giving">转赠</button>
        </div>
        <div class="btn" v-else>
          <button @click="fenxiang" class="share">炫耀一下</button>
        </div>
      </div>
      <div class="header-end" v-else>
        <p class="title">来晚了，礼包已被领取啦</p>
        <div class="img">
          <img :src="detailData.image1" alt="">
          <div class="ylw"></div>
          <div class="giftLang">
            <p class="text">想对你说</p>
            <p class="text">{{detailData.remark}}</p>
          </div>
        </div>
      </div>
      <!-- <button @click="fenxiang">炫耀一下</button> -->
      <!-- <button @click="goPhone">登记手机号码领取礼品</button> -->
      <div class="see" @click="seeSort">
        <span>查看提货门店</span>
        <i class="arrow-r"></i>
      </div>
      <div class="bottom">
        <div class="subNum">
          共{{detailData.productSum}}件礼品
        </div>
        <div class="goods">
          <div class="item" v-for="(item, i) in detailData.orderDetail" :key="i">
            <div class="img">
              <img :src="item.productMainImage" alt="">
            </div>
            <div class="describe">
              <p>{{item.productName}}</p>
              <div class="spec">
                <span>{{item.productSpecification}}</span>
                <span>x{{item.quantity}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <img src="./image/QRcode.png" alt="">
        <p>更多好礼，关注康美药葫芦</p>
      </div>
      <!-- <div class="dialong" v-if="explainShow">
      <div class="explain">
        <div class="img">
          <img src="./image/pic_thxz.png" alt="">
        </div>
        <div class="explain-box">
          <p class="title">1.礼品有效期</p>
          <span>礼品支付成功后1个月内有效，请及时到门店提取，过期将无法提取。</span>
        </div>
        <div class="explain-box">
          <p class="title">2.预约凭证</p>
          <span>提货时必须提供登记的手机号码和系统发送的提货码，请妥善保存。</span>
        </div>
        <div class="explain-box">
          <p class="title">3.预约提货</p>
          <span>提货需要预约，请提前1天咨询门店。</span>
        </div>
      </div>
      <div class="btn">
        <button @click="seeSort">知道了</button>
      </div>
    </div> -->
      <div class="guide" v-if="guideShow" @click="guideShow = false"></div>
      <!-- <button @click="fenxiang">分享</button> -->
    </div>
  </div>
</template>

<script>
// import foot from './foot';
import wxjs from '@/utils/wxjsInterface';
import javaAjax from '@/utils/javaApiRequest';
import { Indicator, MessageBox } from 'mint-ui';
import mqq from '../../../static/js/qqapi.js';
export default {
  data() {
    return {
      // explainShow: false,
      wx: null,
      guideShow: false,
      detailData: null,
      config: '',
      isWX: ''
    };
  },
  methods: {
    // 炫耀
    fenxiang() {
      let _self = this;
      if (_self.isWX) {
        this.guideShow = true; // 引导层
      } else {
        MessageBox('提示', '请使用应用的分享功能发送给朋友吧');
      }
      let title = '';
      if (this.detailData.orderDetail.length > 1) {
        title = this.detailData.orderDetail[0].productName + '等多件礼品';
      } else {
        title = this.detailData.orderDetail[0].productName;
      }
      // 微信分享
      _self.wx.ready(function () {
        const share = {
          title: title, // 分享标题
          desc: '开心！我领取到了一份精美礼品，快来体验吧~', // 分享描述
          link: `${process.env.WEB_HOST}/gift/receive?orderId=${_self.detailData.orderId}`, // 分享链接
          imgUrl: _self.detailData.image1, // 分享图标
          success: function (e) {
            // 用户确认分享后执行的回调函数
            _self.guideShow = false;
            // alert(e.imgUrl);
          },
          cancel: function (e) {
            // console.log(e);
            // 用户取消分享后执行的回调函数
            _self.guideShow = false;
            _self.getDetail();
          }
        };
        _self.wx.onMenuShareAppMessage(share); // 微信好友
        _self.wx.onMenuShareTimeline(share); // 朋友圈
        _self.wx.onMenuShareQQ(share); // qq好友
        _self.wx.onMenuShareQZone(share); // qq空间
      });
      // qq分享
      let qqshare = {
        title: title, // 分享标题
        desc: '开心！我领取到了一份精美礼品，快来体验吧~', // 分享内容
        image_url: _self.detailData.image1, // 分享图片
        share_url: `${process.env.WEB_HOST}/gift/receive?orderId=${_self.detailData.orderId}`, // 分享链接
      };
      mqq.data.setShareInfo(qqshare, function (e) {
        console.log(e);
      });
    },
    // 转赠
    giving() {
      let _self = this;
      if (_self.isWX) {
        this.guideShow = true; // 引导层
      } else {
        MessageBox('提示', '请使用应用的分享功能发送给朋友吧');
      }
      let title = '';
      if (this.detailData.orderDetail.length > 1) {
        title = this.detailData.orderDetail[0].productName + '等多件礼品';
      } else {
        title = this.detailData.orderDetail[0].productName;
      }
      _self.wx.ready(function () {
        const share = {
          title: title, // 分享标题
          desc: '您的好友给您送了一份精美礼品，快来领取吧', // 分享描述
          link: `${process.env.WEB_HOST}/gift/receive?orderId=${_self.detailData.orderId}`, // 分享链接
          imgUrl: _self.detailData.image1, // 分享图标
          success: function (e) {
            // 用户确认分享后执行的回调函数
            // alert(e.title);
            console.log(e);
            _self.guideShow = false;
          },
          cancel: function (e) {
            console.log(e);
            // 用户取消分享后执行的回调函数
            _self.guideShow = false;
          }
        };
        _self.wx.onMenuShareAppMessage(share); // 微信好友
        _self.wx.onMenuShareTimeline(share); // 朋友圈
        _self.wx.onMenuShareQQ(share); // qq好友
        _self.wx.onMenuShareQZone(share); // qq空间
      });
      let qqshare = {
        title: title, // 分享标题
        desc: '您的好友给您送了一份精美礼品，快来领取吧', // 分享内容
        image_url: _self.detailData.image1, // 分享图片
        share_url: `${process.env.WEB_HOST}/gift/receive?orderId=${_self.detailData.orderId}`, // 分享链接
      };
      mqq.data.setShareInfo(qqshare, function (e) {
        console.log(e);
      });
    },
    goPhone() {
      this.$router.push('/gift/phone?orderId=' + this.detailData.orderId);
    },
    seeSort() {
      this.$router.push('/gift/seeSort?id=' + this.detailData.sellerUserId);
    },
    getDetail() {
      let param = {
        orderId: this.$route.query.orderId
      };
      javaAjax.post('/mall/presentOrder/queryPresentDetail', param).then(res => {
        console.log(res);
        if (res.status === 200 && res.data.resultCode === '0') {
          this.detailData = res.data.resultData;
          Indicator.close();
        }
      });
    },
    restFenxiang() {
      let _self = this;
      let title = '';
      if (this.detailData.orderDetail.length > 1) {
        title = this.detailData.orderDetail[0].productName + '等多件礼品';
      } else {
        title = this.detailData.orderDetail[0].productName;
      }
      _self.wx.ready(function () {
        const share = {
          title: title, // 分享标题
          desc: '开心！我领取到了一份精美礼品，快来体验吧~', // 分享描述
          link: `${process.env.WEB_HOST}/gift/receive?orderId=${_self.detailData.orderId}`, // 分享链接
          imgUrl: _self.detailData.image1, // 分享图标
          success: function (e) {
            // 用户确认分享后执行的回调函数
            _self.guideShow = false;
            // alert(e.imgUrl);
          },
          cancel: function (e) {
            // console.log(e);
            // 用户取消分享后执行的回调函数
            _self.guideShow = false;
            _self.getDetail();
          }
        };
        _self.wx.onMenuShareAppMessage(share); // 微信好友
        _self.wx.onMenuShareTimeline(share); // 朋友圈
        _self.wx.onMenuShareQQ(share); // qq好友
        _self.wx.onMenuShareQZone(share); // qq空间
      });
      let qqshare = {
        title: title, // 分享标题
        desc: '开心！我领取到了一份精美礼品，快来体验吧~', // 分享内容
        image_url: _self.detailData.image1, // 分享图片
        share_url: `${process.env.WEB_HOST}/gift/receive?orderId=${_self.detailData.orderId}`, // 分享链接
      };
      mqq.data.setShareInfo(qqshare, function (e) {
        console.log(e);
      });
    }
  },
  created() {
    let _self = this;
    // loading加载
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    // 初始化微信sdk
    wxjs.init().then(res => {
      _self.wx = res.wx;
      _self.config = res.config;
    });
    _self.getDetail();
    // rem布局
    this.$nextTick(function () {
      (function (doc, win) {
        let docEl = doc.documentElement;
        let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        let recalc = function () {
          let clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = (clientWidth >= 750 ? 100 : clientWidth / 750 * 100) + 'px';
        };
        recalc();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);
    });
    // 初始化自定义分享
    setTimeout(() => {
      _self.restFenxiang();
    }, 1000);
    // 判断是否微信或者qq
    let ua = navigator.userAgent.toLowerCase();
    // alert(ua);
    // alert(ua.match(/MicroMessenger/i));
    // alert(ua.match(/QQ/i));
    // alert(ua.match(/\sQQ/i));
    if (ua.match(/MicroMessenger/i)[0] === 'micromessenger' || ua.match(/\sQQ/i) !== null) {
      this.isWX = true;
    } else {
      this.isWX = false;
    }
  }
};
</script>

<style lang="less" scoped>
  .loading{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
  }
  .receive{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    font-size: .26rem;
  }
  .header{
    width: 100%;
    padding-bottom: .7rem;
    text-align: center;
    .title{
      height: .9rem;
      font-size: .36rem;
      line-height: .9rem;
      color: #0ccdd3;
    }
    .img{
      height: 5.15rem;
      position: relative;
      margin: 0 auto;
      width: 5.15rem;
      img{
        width: 100%;
        height: 100%;;
      }
      .giftLang{
        position: absolute;
        left: 0;
        bottom: .15rem;
        right: 0;
        text-align: center;
        color: #999;
        .text{
          line-height: .5rem;
        }
      }
    }
    .tips{
      height: .6rem;
      line-height: .6rem;
      font-size: .22rem;
      margin-top: .3rem;
    }
    .btn{
      .share{
        margin-top: .3rem;
      }
      button{
        width: 5.2rem;
        height: .68rem;
        background-color: #0ccdd3;
        border-radius: .34rem;
        color: #fff;
        font-size: .32rem;
        &:nth-child(2){
          background: #f5f5f5;
          border: solid 1px #0ccdd3;
          color: #0ccdd3;
          margin-top: .30rem;
        }
      }
    }
  }
.header-end{
  width: 100%;
  padding-bottom: .5rem;
  text-align: center;
  .title{
    height: .9rem;
    font-size: .36rem;
    line-height: .9rem;
    color: #333;
  }
  .img{
    height: 5.15rem;
    position: relative;
    margin: 0 auto;
    width: 5.15rem;
    img{
      height: 100%;
      width: 100%;
    }
    .ylw{
      width: 1.34rem;
      height: 1.34rem;
      background: url('./image/icon_ylq.png') no-repeat;
      background-size: 100%;
      position: absolute;
      left: .3rem;
      bottom: .7rem;
    }
    .giftLang{
      position: absolute;
      left: 0;
      bottom: .15rem;
      right: 0;
      text-align: center;
      color: #999;
      .text{
        line-height: .5rem;
      }
    }
  }
}
.see{
  width: 100%;
  height: .88rem;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .28rem;
  color: #333;
  margin-bottom: .2rem;
  .arrow-r{
    display: block;
    width: .16rem;
    height: .31rem;
    background: url('./image/xh_icon_xbdd@2x.png') no-repeat;
    background-size: 100%;
  }
}
.bottom{
  width: 100%;
  background: #fff;
  padding-bottom: .15rem;
  .subNum{
    height: .66rem;
    line-height: .66rem;
    padding-left: .21rem;
  }
  .goods{
    .item{
      width: 100%;
      height: 1.61rem;
      background-color: #f5f5f5;
      padding: 0 .2rem;
      display: flex;
      align-items: center;
      margin-bottom: .08rem;
      .img{
          width: 1.38rem;
          height: 1.38rem;
          margin-right: .24rem;
        img{
          width: 100%;
          height: 100%;
          border: none;
        }
      }
      .describe{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 1;
        font-size: .28rem;
        .spec{
          color: #666;
          display: flex;
          justify-content: space-between;
          font-size: .24rem;
        }
      }
    }
  }
}
.foot{
    background: #f5f5f5;
    text-align: center;
    padding: .48rem 0;
    p{
      margin-top: .2rem;
      color: #999999;
      font-size: .24rem;
    }
  }
// .dialong{
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(15,15,15,0.3);
//   .explain{
//     width: 5.84rem;
//     background: #fff;
//     border-radius: .12rem;
//     margin: 3rem auto 0;
//     padding-bottom: .5rem;
//     .img{
//       margin-top: -.69rem;
//       text-align: center;
//       img{
//         width: 5.11rem;
//         height: 1.33rem;
//       }
//     }
//     .explain-box{
//       padding: 0 .37rem;
//       margin-top: .47rem;
//       .title{
//         color: #0ccdd3;
//         font-size: .32rem;
//         font-weight: 700;
//         margin-bottom: .23rem;
//       }
//       span{
//         line-height: .55rem;
//       }
//     }
//   }
//   .btn{
//     text-align: center;
//     margin-top: .65rem;
//     button{
//       width: 1.6rem;
//       height: .68rem;
//       background-color: #ffffff;
//       border-radius: .12rem;
//       color: #0ccdd3;
//     }
//   }
// }
.guide{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  background: url('./image/kuang_fx.png') no-repeat;
  background-size: 100% 100%;
}
</style>

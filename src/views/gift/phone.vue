<template>
  <div class="phone">
    <div class="close" @click="closePhone">x</div>
    <div class="header">
      <p>请输入你的手机号码</p>
      <p>我们需要验证你的号码，并给你发送提货码</p>
    </div>
    <div class="from">
      <div class="phone-num box">
        <input type="text" placeholder="请输入手机号" v-model="phone">
        <i v-if="closeShow" @click="clsoe"></i>
      </div>
      <div class="code box">
        <input type="text" placeholder="请输入验证码" v-model="code">
        <p @click="getCode">{{sendcode_msg}}</p>
      </div>
      <div class="btn box">
        <button @click="query" :class="succesBtn ? '' : 'ash'">确 定</button>
      </div>
    </div>
    <!-- <div class="mask" v-show="showMask">
      <div class="imgCode-form">
        <div class="imgCode-form-row">
          <label for="imgcode">图片验证码</label>
          <input type="text" class="input-imgCode" name="imgcode" v-model="imgcode">
          <img :src="codeImgUrl" alt="" class="img-imgCode" @click.stop="getCodeimg()">
        </div>
        <div class="imgCode-form-row button-wrapper">
          <button class="cancel-send" @click.stop="cancel">取消</button>
          <button class="confirm-send" @click.stop="send">发送</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import javaAjax from '@/utils/javaApiRequest';
// import ajax from '@/utils/ajax';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      phone: '',
      code: '',
      orderId: '',
      showMask: false,
      imgcode: '',
      codeImgUrl: '',
      sendcode_msg: '获取验证码',
      succesBtn: false,
      closeShow: false
    };
  },
  watch: {
    code: function() {
      if (this.phone !== '' && this.code !== '') {
        this.succesBtn = true;
      } else {
        this.succesBtn = false;
      }
    },
    phone: function() {
      if (this.phone && this.code) {
        this.succesBtn = true;
      } else {
        this.succesBtn = false;
      }
      if (this.phone) {
        this.closeShow = true;
      } else {
        this.closeShow = false;
      }
    }
  },
  methods: {
    closePhone() {
      this.$router.go('-1');
    },
    clsoe() {
      this.phone = '';
    },
    // 获取图片验证码
    // getCodeimg() {
    //   console.log(1);
    //   ajax.get('/api/system/getImageVerify/' + this.phone).then(res => {
    //     console.log(res);
    //     if (res.status === 200 && res.data.code === 0) {
    //       this.codeImgUrl = 'data:image/png;base64,' + res.data.data;
    //     }
    //   });
    // },
    getCode() {
      this.imgcode = '';
      if (this.sendcode_msg !== '获取验证码' && this.sendcode_msg !== '重新发送') {
        return;
      }
      let phone = '^(1[3-9])\\d{9}$';
      let reg = new RegExp(phone);
      if (!this.phone || !reg.test(this.phone)) {
        Toast({
          message: '请填写有效手机号码！',
          position: 'middle',
          duration: 3000
        });
      } else {
        // this.showMask = true;
        // this.getCodeimg();
        this.getCodeNum();
      }
    },
    getCodeNum() {
      let param = {
        phone: this.phone
      };
      javaAjax.post('/mall/presentOrder/sendValidateCode', param).then(res => {
        if (res.status === 200 && res.data.resultCode === '0') {
          let duration = 60;
          this.sendcode_msg = duration + 's';
          let timer = setInterval(() => {
            duration--;
            this.sendcode_msg = duration + 's';
            if (duration === 0) {
              this.sendcode_msg = '重新发送';
              clearInterval(timer);
            }
          }, 1000);
        } else if (res.data.resultCode !== '0') {
          Toast({
            message: res.data.msg,
            position: 'middle',
            duration: 3000
          });
        }
      });
    },
    // 发送验证码
    // send() {
    //   if (this.imgcode) {
    //     ajax.get('/api/system/SendVerifyCode/' + this.phone + '\/0\/' + this.imgcode).then((res) => {
    //       console.log(res);
    //       if (res.status === 200 && res.data.code === 0) {
    //         this.showMask = false;
    //         let duration = 60;
    //         this.sendcode_msg = duration + 's';
    //         let timer = setInterval(() => {
    //           duration--;
    //           this.sendcode_msg = duration + 's';
    //           if (duration === 0) {
    //             this.sendcode_msg = '重新发送';
    //             clearInterval(timer);
    //           }
    //         }, 1000);
    //       }
    //     });
    //   } else {
    //     Toast({
    //       message: '请填写验证码码！',
    //       position: 'middle',
    //       duration: 3000
    //     });
    //   }
    // },
    // cancel() {
    //   this.showMask = false;
    // },
    query() {
      if (this.succesBtn) {
        let param = {
          orderId: this.$route.query.orderId,
          phone: this.phone,
          validateCode: this.code,
          detailUrl: `${process.env.WEB_HOST}/gift/receive?orderId=${this.$route.query.orderId}`
        };
        javaAjax.post('/mall/presentOrder/receivePresent', param).then(res => {
          console.log(res);
          if (res.status === 200 && res.data.resultCode === '0') {
            Toast({
              message: '领取成功',
              position: 'middle',
              duration: 3000
            });
            this.$router.push('/gift/receive?isReceive=1&orderId=' + this.$route.query.orderId);
          } else if (res.data.resultCode !== '0') {
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 3000
            });
          }
        });
      }
    }
  },
  created() {
    (function(doc, win) {
      console.log(doc, win);
      let docEl = doc.documentElement;
      let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      let recalc = function() {
        let clientWidth = docEl.clientWidth;
        console.log(clientWidth, docEl);
        if (!clientWidth) return;
        docEl.style.fontSize = (clientWidth >= 750 ? 100 : clientWidth / 750 * 100) + 'px';
        console.log(docEl.style.fontSize);
      };
      recalc();
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  }
};
</script>

<style lang="less" scoped>
  .phone{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .close{
    position: absolute;
    top: .4rem;
    left: .4rem;
    font-size: .4rem;
    color: #999;
  }
  .header{
    padding: .9rem 0;
    text-align: center;
    color: #333;
    font-size: .3rem;
    p{
      padding-bottom: .1rem;
    }
  }
  .from{
    .box{
      padding: 0 .3rem;
      position: relative;
      input{
        width: 100%;
        height: .7rem;
        border: solid 1px #e2e2e2;
        padding:  0 1.5rem 0 .28rem;
        border-radius: .06rem;
        font-size: .3rem;
     }
    }
    .phone-num{
      margin-bottom: .46rem;
      i{
        position: absolute;
        top: .2rem;
        right: .62rem;
        display: block;
        width: .3rem;
        height: .3rem;
        background: url('./image/icon_qc.png') no-repeat;
        background-size: 100%;
      }
    }
    .code{
      p{
        position: absolute;
        top: 0;
        right: .62rem;
        height: .7rem;
        line-height: .7rem;
        color: #0ccdd3
      }
    }
  }
  .btn{
    margin-top: 1rem;
    button{
      width: 100%;
      height: .7rem;
      background-color: #0ccdd3;
      border-radius: .34rem;
      color: #fff;
      font-size: .32rem;
    }
    .ash{
      background: #999;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .imgCode-form {
      padding: 20px 0;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 280px;
      background-color: #f8f8f8;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      .imgCode-form-row {
        display: flex;
        padding: 0 15px;
        input {
          flex: 1;
          padding: 0 5px;
          height: 30px;
          width: 100px;
          outline: none;
          -webkit-appearance: none;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          display: inline-block;
          vertical-align: middle;
          border: 1px solid #e0e0e0;
          border-right: 0;
          border-radius: 0;
        }
        label {
          flex: 0 0 1;
          display: inline-block;
          vertical-align: middle;
          line-height: 30px;
          width: 80px;
          font-size: 12px;
        }
        img {
          flex: 0 0 1;
          display: inline-block;
          vertical-align: middle;
          width: 60px;
          height: 30px;
          border: 1px solid #e0e0e0;
          background: #fff;
          outline: none;
          border-left: 0;
        }
        &.button-wrapper {
          justify-content: flex-end;
          .confirm-send {
            margin: 15px 0 0 15px;
            display: inline-block;
            width: 80px;
            height: 24px;
            background-color:#0ccdd3;
            color: #fff;
            border-radius: 3px;
          }
          .cancel-send {
            margin: 15px 0 0 0;
            display: inline-block;
            width: 80px;
            height: 24px;
            background-color: #fefefe;
            color: #0ccdd3;
            border-radius: 3px;
          }
        }
      }
    }
  }
</style>

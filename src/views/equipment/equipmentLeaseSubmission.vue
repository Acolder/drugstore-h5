<template>
<div class="equipmentSubmission">
  <mt-header title="提交订单">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <!-- 图片验证码 -->
  <div class="mask" v-show="showMask">
    <div class="imgCode-form">
      <div class="imgCode-form-row input--wrapper">
        <label for="imgcode">图片验证码</label>
        <input type="text" class="input-imgCode" name="imgcode" v-model="imgcode">
        <img :src="codeImgUrl" alt="" class="img-imgCode" @click.stop="refreshImg()">
      </div>
      <div class="imgCode-form-row button-wrapper">
        <button class="cancel-send" @click.stop="cancel()">取消</button>
        <button class="confirm-send" @click.stop="send()">发送</button>
      </div>
    </div>
  </div>
  <div class="equipmentSubmissionMain">
    <div v-if="login">
      <div class="form-item">手机号验证（用于归还和查看订单）</div>
      <div class="form-item">
        <input type="text" placeholder="请输入手机号" v-model="applyInfo.borrow_account">
        <div class="obtain" @click="obtain">{{sendcode_msg}}</div>
      </div>
      <div class="form-item">
        <input type="text" placeholder="请输入验证码" v-model="applyInfo.VerifyCode">
      </div>
      <div class="line10"></div>
    </div>
    <div class="form-item">收货信息</div>
    <div class="form-item form-item-right">
      <div class="">收货人</div>
      <input type="text" placeholder="请输入收货人" v-model.trim="applyInfo.consignee_name">
    </div>
      <div class="form-item form-item-right">
      <div class="">联系方式</div>
      <input type="text" placeholder="请输入联系方式" v-model.trim="applyInfo.consignee_phone">
    </div>
    <div class="form-item form-item-right" @click='selectAddress'>
      <div class="">收货地址</div>
      <!-- <input type="text" placeholder="请输入收货地址" v-model.trim="applyInfo.consignee_address"> -->
      <div class="address">{{long_address}}</div>
    </div>
    <div class="form-item form-item-right">
      <div class="">详细地址</div>
      <input type="text" placeholder="请输入详细地址" v-model.trim="applyInfo.consignee_detail_address">
    </div>
    <div class="line45"></div>
  </div>
  <div class="equipment-btn" :class="bgColor?'': 'huisi'" @click="equipmentSub">提交订单</div>
  <address-picker :addressShow="addressShow" @ok="ok" @cancel="addressShow=false"></address-picker>
</div>
</template>

<script>
import addressPicker from '../../components/addressPicker/address-picker.vue';
import { Toast } from 'mint-ui';
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      login: true,
      bgColor: true,
      sendcode_msg: '获取验证码',
      // 图片验证码
      codeImgUrl: '',
      // 图片验证码弹窗
      showMask: false,
      // 图片验证码值
      imgcode: '',
      // 手机号码
      // applyInfo.borrow_account: '',
      applyInfo: {
        // 手机区号，默认86
        Code: '86',
        // 手机验证码
        VerifyCode: '',
        // 租借账号
        borrow_account: '',
        // 借用类型
        borrow_type: '1',
        // 发货方式 1、自取 2、物流
        send_delivery_mode: '2',
        // 收货人
        consignee_name: '',
        // 收货人联系方式
        consignee_phone: '',
        // 收货地址
        consignee_address: '',
        // 详细地址
        consignee_detail_address: '',
      },
      long_address: '请选择省市区',
      // 选择省市区组件
      addressShow: false,
      // 省
      addressProvince: '',
      // 市
      addressCity: '',
      // 区
      addressDistrict: '',
    };
  },
  computed: {
    detailedAddress() {
      return this.addressProvince + ' ' + this.addressCity + ' ' + this.addressDistrict;
    }
  },
  components: {
    'address-picker': addressPicker
  },
  methods: {
    // 获取图片验证码
    obtain() {
      this.imgcode = '';
      if (this.sendcode_msg === '获取验证码' || this.sendcode_msg === '重新发送') {
        console.log('获取图片验证码');
        let phone = '^(1[3-9])\\d{9}$';
        let reg = new RegExp(phone);
        if (!this.applyInfo.borrow_account || !reg.test(this.applyInfo.borrow_account)) {
          Toast({
            message: '请填写有效手机号码！',
            position: 'middle',
            duration: 500
          });
          return false;
        }
        ajax.get('/api/system/getImageVerify/' + this.applyInfo.borrow_account).then((res) => {
          console.log(res);
          if (res.data && res.data.code === 0) {
            Toast({
              message: res.data.message,
              position: 'middle',
              duration: 500
            });
            this.codeImgUrl = 'data:image/png;base64,' + res.data.data;
            this.showMask = true;
          } else {
            Toast({
              message: res.data.message,
              position: 'middle',
              duration: 500
            });
          }
        });
      }
    },
    // 刷新图片
    refreshImg() {
      ajax.get('/api/system/getImageVerify/' + this.applyInfo.borrow_account).then((res) => {
        console.log(res);
        if (res.data && res.data.code === 0) {
          Toast({
            message: '刷新图片成功！',
            position: 'middle',
            duration: 500
          });
          this.codeImgUrl = 'data:image/png;base64,' + res.data.data;
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 500
          });
        }
      });
    },
    // 取消
    cancel() {
      Toast({
        message: '已取消！',
        position: 'middle',
        duration: 500
      });
      this.showMask = false;
      this.imgcode = '';
    },
    // 发送手机验证码
    send() {
      if (!this.imgcode) {
        Toast({
          message: '请输入图片验证码！',
          position: 'middle',
          duration: 500
        });
        return false;
      }
      if (this.imgcode) {
        ajax.get('/api/system/SendVerifyCode/' + this.applyInfo.borrow_account + '\/0\/' + this.imgcode).then((res) => {
          console.log(res);
          if (!res.data) {
            Toast({
              message: '发送失败！',
              position: 'middle',
              duration: 500
            });
            return;
          }
          if (res.data.code === 0) {
            Toast({
              message: res.data.message,
              position: 'middle',
              duration: 500
            });
            this.showMask = false;
            let duration = 120;
            this.sendcode_msg = duration + 's';
            let timer = setInterval(() => {
              duration--;
              this.sendcode_msg = duration + 's';
              if (duration === 0) {
                this.sendcode_msg = '重新发送';
                clearInterval(timer);
              }
            }, 1000);
          } else {
            Toast({
              message: res.data.message,
              position: 'middle',
              duration: 500
            });
          }
        }).catch(() => {
          Toast({
            message: '发送失败！',
            position: 'middle',
            duration: 500
          });
        });
      }
    },
    // 选择地址
    selectAddress() {
      this.addressShow = true;
    },
    // 选择地址事件
    ok(address) {
      this.addressShow = false;
      this.addressProvince = address.province;
      this.addressCity = address.city;
      this.addressDistrict = address.town;
      this.applyInfo.consignee_address = this.detailedAddress;
      this.long_address = this.detailedAddress;
      console.log(this.applyInfo.consignee_address);
    },
    // 选择快递方式时候 收货人信息的验证
    verify() {
      let nameReg = /[^a-zA-Z0-9_\u4e00-\u9fa5]/g;
      if (!this.applyInfo.consignee_name) {
        Toast({
          message: '请填写收货人姓名！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (this.applyInfo.consignee_name.length > 200) {
        Toast({
          message: '收货人姓名不能超过200个字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (nameReg.test(this.applyInfo.consignee_name)) {
        Toast({
          message: '收货人姓名不支持特殊符号！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      let phonereg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!this.applyInfo.consignee_phone) {
        Toast({
          message: '请填写收货人手机号码！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (!phonereg.test(this.applyInfo.consignee_phone)) {
        Toast({
          message: '请填写有效的收货人手机号码！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      if (!this.applyInfo.consignee_address) {
        Toast({
          message: '请填写收货人地址！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      if (this.applyInfo.consignee_address && (this.applyInfo.consignee_address.length > 20 || this.applyInfo.consignee_address.length < 4)) {
        Toast({
          message: '收货人地址必须在4至20个字之间',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      if (!this.applyInfo.consignee_detail_address) {
        Toast({
          message: '请填写详细地址！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      if (this.applyInfo.consignee_detail_address && (this.applyInfo.consignee_detail_address.length > 20 || this.applyInfo.consignee_detail_address.length < 4)) {
        Toast({
          message: '详细地址必须在4至20个字之间',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      return true;
    },
    // 用户租借脉诊仪设备下单
    equipmentSub() {
      if (this.bgColor === false) {
        return false;
      }
      if (!this.applyInfo.VerifyCode) {
        Toast({
          message: '请输入手机验证码！',
          position: 'middle',
          duration: 500
        });
        return false;
      }
      if (!this.verify()) {
        return;
      }
      console.log('验证通过', this.applyInfo);
      this.bgColor = false;
      ajax.post(`/api/borrow/SubmitBorrowOrder`, this.applyInfo).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          if (this.login) {
            console.log('保存账号');
            sessionStorage.setItem('MyEquipmentMobile', this.applyInfo.borrow_account);
          }
          this.bgColor = true;
          this.$router.push('/equipment/equipmentLeaseConfirm?id=' + res.data.data);
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 500
          });
          this.bgColor = true;
        }
      });
    }
  },
  created() {
    if (!sessionStorage.getItem('MyEquipmentMobile')) {
      this.login = true;
    } else {
      this.login = false;
      this.applyInfo.borrow_account = sessionStorage.getItem('MyEquipmentMobile');
      this.applyInfo.VerifyCode = 'null';
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
@left-space: 80px;
@color: #000;
.line10{
  height: 10px;
  background: #eeeef3;
}
.line45{
  height: 45px;
  background: #eeeef3;
}
.equipmentSubmission{
  padding-top: 0.1px;
  height: 100%;
  background: #eeeef3;
  .equipmentSubmissionMain{
    margin-top: 44px;
    background: #fff;
  }
  // 图片验证码
  .mask {
    position: fixed;
    z-index: 10;
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
      .input--wrapper{
        margin-bottom: 20px;
      }
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
          width: 70px;
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
            display: inline-block;
            width: 80px;
            height: 24px;
            background-color: @green-color;
            color: #fff;
            border-radius: 3px;
            margin-left: 20px;
          }
          .cancel-send {
            display: inline-block;
            width: 80px;
            height: 24px;
            background-color: #e3e3e3;
            color: @green-color;
            border-radius: 3px;
          }
        }
      }
    }
  }
  .form-item{
    height: 44px;
    padding: 0 10px;
    color: #333333;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
;
  }
  input{
    flex: 1;
    height: 100%;
    line-height: 100%;
    border: none;
  }
  .obtain{
    width: 96px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    border: solid 1px #0ccdd3;
    color: #0ccdd3;
  }
  .form-item-right{
    input{
      text-align: right;
    }
  }
  .address{
    height: 44px;
    line-height: 44px;
    color: #999;
    flex: 1px;
    display: flex;
    justify-content: flex-end;
  }
  .equipment-btn{
    position: fixed;
    width: 100%;
    height: 44px;
    line-height: 44px;
    bottom: 0;
    text-align: center;
    color: #fff;
    background: #0ccdd3;
  }
  .equipment-btn.huisi{
    background: #ccc;
  }
}
</style>
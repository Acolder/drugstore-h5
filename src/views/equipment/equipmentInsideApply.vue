<template>
<div class="equipmentInsideApply">
  <mt-header title="脉诊仪设备申请">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="equipment-main">
    <div class="equipment-item">
      <div class="">子公司名称</div>
      <input type="text" placeholder="总部请填写康美药业股份有限公司" v-model.trim="applyInfo.borrow_company">
    </div>
    <div class="equipment-item">
      <div class="">所属部门</div>
      <input type="text" placeholder="请填写部门名称" v-model.trim="applyInfo.borrow_dept">
    </div>
    <div class="equipment-item">
      <div class="">工号</div>
      <input type="text" placeholder="KMZB" v-model.trim="applyInfo.borrow_word_number">
    </div>
    <div class="equipment-item">
      <div class="">姓名</div>
      <input type="text" placeholder="请填写姓名" v-model.trim="applyInfo.borrow_name">
    </div>
     <div class="equipment-item">
      <div class="">手机号</div>
      <input type="text" placeholder="手机号"  v-model.trim="applyInfo.borrow_account">
    </div>
    <div class="line"></div>
    <div class="equipment-item">
      <div class="">申请数量</div>
      <input type="text" placeholder="请输入数量" v-model.trim="applyInfo.borrow_number">
    </div>
    <div class="equipment-item">
      <div class="">借用时长</div>
      <select v-model="applyInfo.borrow_days">
        <option value ="7">7天</option>
        <option value ="14">14天</option>
        <option value="21">21天</option>
        <option value="30">30天</option>
      </select>
    </div>
    <div class="line"></div>
    <div class="equipment-item">
      <div class="">获取方式</div>
      <div>
        <img v-if="applyInfo.send_delivery_mode==='1'" @click="express" src="./imgs/icon_n_swmr.png" alt="">
        <img v-else @click="express" src="./imgs/icon_p_swmr.png" alt="">
        <div class="">快递</div>
        <img v-if="applyInfo.send_delivery_mode==='2'"  @click="selfExtraction" src="./imgs/icon_n_swmr.png" alt="">
        <img v-else @click="selfExtraction" src="./imgs/icon_p_swmr.png" alt="">
        <div class="">自取</div>
      </div>
    </div>
    <div v-show="applyInfo.send_delivery_mode==='2'">
      <div class="equipment-item">
        <div class="">收货人</div>
        <input type="text" placeholder="请输入收货人" v-model.trim="applyInfo.consignee_name">
      </div>
       <div class="equipment-item">
        <div class="">联系方式</div>
        <input type="text" placeholder="请输入联系方式" v-model.trim="applyInfo.consignee_phone">
      </div>
      <div class="equipment-item" @click='selectAddress'>
        <div class="">收货地址</div>
        <!-- <input type="text" placeholder="请输入收货地址" v-model.trim="applyInfo.consignee_address"> -->
        <div class="address">{{long_address}}</div>
      </div>
      <div class="equipment-item">
        <div class="">详细地址</div>
        <input type="text" placeholder="请输入详细地址" v-model.trim="applyInfo.consignee_detail_address">
      </div>
    </div>
    <div class="line"></div>
    <div class="logo-w">
      <img src="./imgs/img_ewm.png" alt="">
    </div>
    <p class="equipment-til">下载APP体验</p>
    <div class="equipment-btn" :class="bgColor?'': 'huisi'" @click="equipmentSub">提交申请</div>
  </div>
  <address-picker :addressShow="addressShow" @ok="ok" @cancel="addressShow=false"></address-picker>
</div>
</template>

<script>
import addressPicker from '../../components/addressPicker/address-picker.vue';
import ajax from '@/utils/ajax';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      bgColor: true,
      applyInfo: {
        // 用户账号 手机号
        borrow_account: '',
        // 数量
        borrow_number: '',
        // 借用类型
        borrow_type: '2',
        // 借用单位名称
        borrow_company: '',
        // 单位员工工号
        borrow_word_number: '',
        // 单位员工部门
        borrow_dept: '',
        // 单位员工姓名
        borrow_name: '',
        // 借用天数
        borrow_days: '30',
        // 发货方式 1、自取 2、物流
        send_delivery_mode: '1',
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
    express() {
      this.applyInfo.send_delivery_mode = '2';
      console.log(this.applyInfo.send_delivery_mode);
    },
    selfExtraction() {
      this.applyInfo.send_delivery_mode = '1';
      console.log(this.applyInfo.send_delivery_mode);
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
    // 提交申请
    equipmentSub() {
      if (this.bgColor === false) {
        return false;
      }
      // 手机号正则
      let phone = '^(1[3-9])\\d{9}$';
      let reg = new RegExp(phone);
      // 名字正则
      let nameReg = /[^a-zA-Z0-9_\u4e00-\u9fa5]/g;
      // 汉字正则
      let hanziReg = /[\u4E00-\u9FA5]/;
      // 1-10正则
      let shuziReg = /^([1-9]|10)$/;
      // 公司名字验证
      if (!this.applyInfo.borrow_company) {
        Toast({
          message: '请输入公司名称！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (this.applyInfo.borrow_company.length > 200) {
        Toast({
          message: '公司名称不能超过200个字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (nameReg.test(this.applyInfo.borrow_company)) {
        Toast({
          message: '公司名称不支持特殊符号！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      // 所属部门验证
      if (!this.applyInfo.borrow_dept) {
        Toast({
          message: '请输入所属部门！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (this.applyInfo.borrow_dept.length > 200) {
        Toast({
          message: '所属部门不能超过200个字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (nameReg.test(this.applyInfo.borrow_dept)) {
        Toast({
          message: '所属部门不支持特殊符号！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      // 工号验证
      if (!this.applyInfo.borrow_word_number) {
        Toast({
          message: '请输入工号！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (nameReg.test(this.applyInfo.borrow_word_number)) {
        Toast({
          message: '工号不支持特殊符号！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (hanziReg.test(this.applyInfo.borrow_word_number)) {
        Toast({
          message: '工号不能为汉字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      // 姓名验证
      if (!this.applyInfo.borrow_name) {
        Toast({
          message: '请输入名字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (this.applyInfo.borrow_name.length > 200) {
        Toast({
          message: '姓名不能超过200个字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (nameReg.test(this.applyInfo.borrow_name)) {
        Toast({
          message: '姓名不支持特殊符号！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      // 用户账号验证 手机号
      if (!this.applyInfo.borrow_account || !reg.test(this.applyInfo.borrow_account)) {
        Toast({
          message: '请填写有效手机号码！',
          position: 'middle',
          duration: 500
        });
        return false;
      }
      // 申请数量
      if (!this.applyInfo.borrow_number) {
        Toast({
          message: '请输入申请数量！',
          position: 'middle',
          duration: 1500
        });
        return false;
        // else if (nameReg.test(this.applyInfo.borrow_number)) {
        //   Toast({
        //     message: '申请数量不支持特殊符号！',
        //     position: 'middle',
        //     duration: 1500
        //   });
        //   return false;
        // } else if (hanziReg.test(this.applyInfo.borrow_number)) {
        //   Toast({
        //     message: '申请数量不能为汉字！',
        //     position: 'middle',
        //     duration: 1500
        //   });
        //   return false;
        // }
      } else if (!shuziReg.test(this.applyInfo.borrow_number)) {
        Toast({
          message: '申请数量只能为1至10！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      // 选择快递方式的时候 需要进行收货信息的验证
      if (this.applyInfo.send_delivery_mode === '2') {
        if (!this.verify()) {
          return;
        }
      }
      this.bgColor = false;
      console.log('验证通过', this.applyInfo);
      // this.applyInfo.borrow_account = this.applyInfo.borrow_word_number;
      ajax.post(`${process.env.BASE_BACK_HOST}/api/borrow/SubmitBorrowOrder`, this.applyInfo).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          this.bgColor = true;
          this.$router.push('/equipment/equipmentInsideSuccess');
        } else {
          Toast({
            // message: res.data.message,
            message: res.data.message,
            position: 'middle',
            duration: 1500
          });
          this.bgColor = true;
        }
      });
    }
  },
  mounted() {
    // document.title = '脉诊仪申请';
  },
};
</script>

<style lang="less" scoped>
.equipmentInsideApply{
  background: #fff;
  padding-top: 0.1px;
  .equipment-main{
    padding-top: 0.1px;
    margin-top: 44px;
  }
  .line{
    height: 10px;
    background-color: #eeeef3;
  }
  .equipment-item{
    height: 44px;
    padding: 0 10px;
    border-bottom:1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    div,input{
      display: flex;
      align-items: center;
    }
    input{
      border: none;
      text-align: right;
      flex: 1;
    }
    select{
      border: none;
      outline:none;
    }
    img{
      width: 20px;
      height: 20px;
      margin-left: 15px;
      margin-right: 5px;
    }
    .address{
      height: 44px;
      line-height: 44px;
      color: #999;
      flex: 1px;
      display: flex;
      justify-content: flex-end;
    }
  }
  .logo-w{
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 127px;
      height: 127px;
    }
  }
  .equipment-til{
    height: 15px;
    font-size: 14px;
    line-height: 15px;
    color: #333333;
    text-align: center;
    margin-bottom: 25px;
  }
  .equipment-btn{
    height: 44px;
    background:#0ccdd3;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .equipment-btn.huisi{
    background: #ccc;
  }
}
</style>

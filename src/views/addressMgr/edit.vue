<template>
  <div class="page">
    <mt-header fixed :title="pageTitle">
      <a href="javascript:;" slot="left" @click="goback">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="fields">
      <div class="address-input-field noborder">
        <label for="username">联系人</label>
        <input type="text" class="username" name="username" placeholder="收货人姓名" v-model.trim="address.addressName">
      </div>
      <div class="address-input-field">
        <div class="gender-wrapper">
          <label for="gender"></label>
          <span class="gender" @click.stop="selectGender('男')" :class="{active:address.gender==='男'}">先生</span><span class="gender" @click.stop="selectGender('女')" :class="{active:address.gender==='女'}">女士</span>
        </div>
      </div>
      <div class="address-input-field">
        <label for="phone">电话</label>
        <input class="phone" name="phone" placeholder="输入手机号码" @input="limitInput" v-model.trim="address.addressPhone" type="number">
      </div>
      <div class="address-selector-wrapper arrow-right" @click.stop="selectAddress()">
        <p class="title">地址</p>
        <div class="description">
          <span class="addressTitle sigleTextOverflow">{{address.addressDetail}}</span>
          <span class="addressDetail sigleTextOverflow">{{address.addressDw}}</span>
        </div>
      </div>
      <div class="address-input-field address-num">
        <label for="addressnum">门牌号</label>
        <input class="addressnum" name="addressnum" placeholder="输入门牌号码" v-model.trim="address.addressNum" type="text" maxlength="10">
      </div>
      <div class="btn-wrapper">
        <mt-button type="primary" @click="save" size="large">保存</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import addressPicker from '../../components/addressPicker/address-picker.vue';
import java from '@/utils/javaApiRequest';
import { getToken } from '@/utils/auth';
import { Toast, Indicator } from 'mint-ui';
import { getAddress } from '@/api/addressMgr';
export default {
  data() {
    return {
      address: {
        'addressProvince': '省',
        'addressCity': '市',
        'addressDistrict': '区',
        'addressDetail': '',
        'addressPhone': '',
        'addressName': '',
        'addressZip': '',
        'longitude': '',
        'latitude': '',
        'addressNum': '',
        'gender': '男',
        'addressDw': ''
      },
      isEdit: 0,
      pageTitle: '新增收货地址',
      from: ''
    };
  },
  methods: {
    selectAddress() {
      sessionStorage.setItem('editingAddr', JSON.stringify(this.address));
      this.$router.replace({
        path: '/addressMgr/map',
        query: { isEdit: this.isEdit, from: this.from }
      });
    },
    save() {
      let _this = this;
      if (!this.verify()) {
        return;
      }
      let url = '/mall/address/save';
      let userToken = getToken();
      this.address.userToken = userToken;
      Indicator.open();
      java.post(url, _this.address).then((res) => {
        Indicator.close();
        if (res.status === 200 && res.data && String(res.data.resultCode) === '0') {
          if (_this.from && _this.from !== '') {
            if (!_this.address.addressId) {
              _this.address.addressId = res.data.resultData.addressId;
            }
            sessionStorage.setItem('selectedAddress', JSON.stringify(_this.address));
          }
        }
        sessionStorage.removeItem('edit_address');
        _this.$router.replace({
          path: '/addressMgr',
          query: { from: _this.from }
        });
      }).catch((err) => {
        console.log(err);
        Indicator.close();
      });
    },
    goback() {
      sessionStorage.removeItem('edit_address');
      this.$router.replace({
        path: '/addressMgr',
        query: { from: this.from }
      });
    },
    verify() {
      let nameReg = /[^a-zA-Z0-9_\u4e00-\u9fa5]/g;
      if (!this.address.addressName) {
        Toast({
          message: '请填写收货人姓名！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (this.address.addressName.length > 200) {
        Toast({
          message: '姓名不能超过200个字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (nameReg.test(this.address.addressName)) {
        Toast({
          message: '姓名不支持特殊符号！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (!this.address.addressDetail) {
        Toast({
          message: '请选择地址！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (!this.address.addressNum) {
        Toast({
          message: '请填写门牌号码！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      let phone = '^(1[3-9])\\d{9}$';
      let reg = new RegExp(phone);
      if (!this.address.addressPhone || !reg.test(this.address.addressPhone)) {
        Toast({
          message: '请填写有效手机号码！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      return true;
    },
    limitInput(ev) {
      let e = ev.srcElement || ev.target;
      let v = e.value;
      let reg = /^[0-9]\d*$/;
      if (!reg.test(v)) {
        this.address.addressPhone = this.address.addressPhone.substring(0, this.address.addressPhone.length - 1);
      }
    },
    selectGender(g) {
      this.address.gender = g;
    }
  },
  components: {
    'address-picker': addressPicker
  },
  mounted() {
    this.from = this.$route.query.from;
    this.isEdit = this.$route.query.isEdit;
    if (this.isEdit === 1) {
      this.pageTitle = '修改收货地址';
    }
    if (String(this.isEdit) === '1') {
      Object.assign(this.address, JSON.parse(sessionStorage.getItem('edit_address')));
    }
    if (String(this.$route.query.map) === '1') {
      Object.assign(this.address, JSON.parse(sessionStorage.getItem('editingAddr')));
      sessionStorage.removeItem('editingAddr');
    }
    let ma = JSON.parse(sessionStorage.getItem('map_address'));
    sessionStorage.removeItem('map_address');
    if (ma) {
      getAddress(ma.point).then((res) => {
        this.address.addressProvince = res.province;
        this.address.addressCity = res.city;
        this.address.addressDistrict = res.district;
        this.address.latitude = ma.point.lat;
        this.address.longitude = ma.point.lng;
        this.address.addressDetail = ma.title;
        this.address.addressDw = ma.address;
      });
    }
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';

.page {
  position: fixed;
  width:100%;
  background-color: #e0e0e0;
  min-height: 100%;
  padding-top: 44px;
  padding-bottom: 22px;
}

.address-input-field {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 44px;
  .border-1px(#e0e0e0);
  background-color: #fff;
  padding: 0 15px;

  &.noborder:after {
    display: block;
    position: absolute;
    left: 82.5px;
    right: 0;
    bottom: 0;
    border-top: 1px solid #e0e0e0;
    content: '';
  }

  label {
    font-family: '微软雅黑';
    font-size: 15px;
    color: #333;
    display: inline-block;
    flex: 0 0 1;
    width: 5.5em;
    line-height: 1em;
  }

  input {
    font-family: '微软雅黑';
    padding: 0;
    font-size: 15px;
    display: inline-block;
    flex: 1;
    line-height: 1em;
    border: none;
    -webkit-appearance: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: none;
    color: #333;

    &::-webkit-input-placeholder {
      color: #888;
      font-size: 14px;
      line-height: 21px;
      font-family: '微软雅黑';
    }

    &::-moz-placeholder {
      font-size: 14px;
      font-family: '微软雅黑';
    }

    &:-ms-input-placeholder {
      color: #888;
      font-size: 14px;
      font-family: '微软雅黑';
    }
  }

  .gender-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    span.gender {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 25px;
      margin-right: 10px;
      border: 1px solid #eee;
      border-radius: 5px;
      color: #777;
      &.active {
        color: #fff;
        background-color: #0ccdd4;
      }
    }
  }

  &.address-num {
    .border-top-1px(#e0e0e0);
  }
}

.address-selector-wrapper {
  position: relative;
  height: 55px;
  background-color: #fff;
  padding: 0 15px;
  font-size: 15px;
  display: flex;
  color: #333;

  .title {
    flex: none;
    width: 5.5em;
    display: flex;
    align-items: center;
  }

  .description {
    flex: 1;
    height: 100%;
    font-size: 14px;
    color: #888;
    font-family: '微软雅黑';
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    padding-right: 15px;

    .addressTitle {
      color: #333;
      font-size: 14px;
    }

    .addressDetail {
      color: #888;
      font-size: 11px;
    }
  }

  &:after {
    content: " ";
    display: inline-block;
    height: 7px;
    width: 7px;
    border-width: 1px 1px 0 0;
    border-color: #333;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    right: 15px;
    margin-top: -4px;
  }
}

.address-detail {
  height: 125px;
  .border-top-1px(#e0e0e0);
  background-color: #fff;

  textarea {
    width: 100%;
    height: 100%;
    font-size: 15px;
    color: #333;
    padding: 1em;
    border: none;

    &::-webkit-input-placeholder {
      color: #888;
      font-size: 14px;
      font-family: '微软雅黑';
    }

    &::-moz-placeholder {
      font-family: '微软雅黑';
      font-size: 14px;
    }

    &:-ms-input-placeholder {
      color: #888;
      font-size: 14px;
      font-family: '微软雅黑';
    }
  }
}

.btn-wrapper {
  margin-top: 25px;
  padding: 0 3%;
}

</style>

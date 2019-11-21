<template>
  <div class="BuyMedicineWrapper white-background">
    <mt-header fixed title="拍方抓药">
      <i @click="back()" slot="left">
        <mt-button icon="back"></mt-button>
      </i>
    </mt-header>
    <div class="BuyMedicine">
      <div class="prescription" @click="openLocals" :class="{nobg:imgUrls.length>0}">
      <!--<div class="prescription" @click="uploadImg" :class="{nobg:imgUrls.length>0}">-->
        <img :src="imgUrl" alt="" v-show="imgUrls.length>0">
        <!-- <img src="./imgs/cfsl_gf.png" alt="" @click="uploadImg"> -->
      </div>
      <form :id="fileName+'Form'" enctype="multipart/form-data" style="display:none;" ref="imgForm">
        <input ref="pathClear" type="file"  accept="image/*" :name="fileName" @change="fileChanged"/>
      </form>
      <div class="split_row">
        <span class="examples" @click.stop="examples">
          查看处方上传示例
        </span>
      </div>
      <li class="LiCommon num">
        <p>
          <span>剂数</span>
          <label class="jiajian">
            <i><img src="./imgs/icon-p-jhao.png" alt="" @click="reduce()"></i>
            <i class="number">{{suffering_num}}</i>
            <i><img src="./imgs/icon-p-jihao.png" alt="" @click="add()"></i>
          </label>
        </p>
      </li>
      <li class="LiCommon">
        <span class="drugName">手机号</span>
        <input type="text" class="outputName sigleTextOverflow" placeholder="请输入手机号" v-model="phone" @blur="phoneNum()">
      </li>
      <div class="ReceiveAddress arrow" @click.stop="addressMgr">
        <div class="address_name_phone" v-show="!!consignee">
          {{'收货人: &nbsp;&nbsp;'+ consignee+ '&nbsp;&nbsp;&nbsp;&nbsp;'+con_tel}}
        </div>
        <div class="address_detail">
          {{'收货地址：' + addr_str}}
        </div>
      </div>
      <div class="bdeee"></div>
      <li class="LiCommon">
        <span class="drugName help" @click="decoct">是否代煎</span>
        <div class="Choice yes">
          <img src="./imgs/xh_icon_select.png" alt="" v-if="is_suffering == 1" @click="otherTHREE('yes')">
          <img src="./imgs/icon-n-swmr@2x@2x.png" alt="" v-else @click="otherTHREE('yes')">
          <span>是</span>
        </div>
        <div class="Choice no">
          <img src="./imgs/xh_icon_select.png" alt="" v-if="is_suffering == 0" @click="otherTHREE()">
          <img src="./imgs/icon-n-swmr@2x@2x.png" alt="" v-else @click="otherTHREE()">
          <span>否</span>
        </div>
      </li>
      <li class="LiCommon">
        <span class="drugName">是否怀孕：</span>
        <div class="Choice yes">
          <img src="./imgs/xh_icon_select.png" alt="" v-if="is_pregnant == 1" @click="toOther('yes')">
          <img src="./imgs/icon-n-swmr@2x@2x.png" alt="" v-else @click="toOther('yes')">
          <span>是</span>
        </div>
        <div class="Choice no">
          <img src="./imgs/xh_icon_select.png" alt="" v-if="is_pregnant == 0" @click="toOther()">
          <img src="./imgs/icon-n-swmr@2x@2x.png" alt="" v-else @click="toOther()">
          <span>否</span>
        </div>
      </li>
      <div class="remark">
        <p class="title" style="width: 60px;">备注：</p>
        <textarea v-model.trim="remark">

        </textarea>
      </div>
      <mt-popup v-model="popupVisible" popup-transition="popup-fade">代煎服务费约2.5元/剂，不同类方剂价格稍有区别</mt-popup>
      <div class="bdeee"></div>
      <div class="btn">
        <div class="submit_btn" @click="submit()">提交</div>
        <div class="nopre_btn" @click.stop="go_zxwz">
          无处方？点击
          <span class="zxxy">在线询医</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Button, Popup, Toast, Radio } from 'mint-ui';
import doctorAjax from '@/utils/doctorAjax';
import java from '@/utils/javaApiRequest';
import Cookies from 'js-cookie';
import { webPostObject } from '@/api/ossUpload.js';
import $ from 'jquery';
export default {
  data() {
    return {
      togetter: true,
      togetter2: true,
      hidden: true,
      hide: true,
      popupVisible: false,
      phone: '', // 手机号
      suffering_num: 1, // 剂数
      is_pregnant: 0, // 怀孕
      is_suffering: 1, // 代煎
      consignee: '', // 收货人名字
      con_tel: '', // 收货人电话
      addr_str: '', // 收货地址
      address: [], // 默认收货地址
      zhyy_userid: '', // 患者端ID
      docPrescriptions: {},
      username: '', // 患者端用户名
      imgUrls: [],
      imgUrl: '',
      result: '',
      // age: null, // 年龄
      gender: 1, // 姓别  1 男 0 女
      userNews: '', // 用户信息
      suffering_type: '',
      userInfo: 'User-Info',
      remark: '',
      addressObj: null,
      fileName: 'Image'
    };
  },
  components: {
    'mt-button': Button,
    'mt-popup': Popup,
    'mt-Toast': Toast,
    'mt-radio': Radio,
  },
  mounted() {
    // 默认收货地址
    let url = `/mall/address/updateAddreesChecked`;
    let params = {
      addressId: '',
      addressChecked: 1,
    };
    java.post(url, params).then((res) => {
      // console.log(res);
      if (String(res.data.resultCode) === '0') {
        this.address = res.data.resultData;
      }
    });
    this.userNews = JSON.parse(Cookies.get(this.userInfo));
    this.zhyy_userid = this.userNews.userid;
    this.username = this.userNews.nickname;
    let userAddress = sessionStorage.getItem('selectedAddressBm');
    this.addressObj = userAddress;
    if (userAddress) {
      let addressDetail = JSON.parse(userAddress);
      addressDetail.totalAddress = addressDetail.addressProvince + addressDetail.addressCity + addressDetail.addressDistrict + addressDetail.addressDetail + addressDetail.addressNum;
      // 收货人姓名
      this.consignee = addressDetail.addressName;
      // 收货人电话
      this.con_tel = addressDetail.addressPhone;
      // 收货人地址
      this.addr_str = addressDetail.totalAddress;
    }
    this.phone = sessionStorage.getItem('phonenumber') || this.phone;
    this.is_suffering = sessionStorage.getItem('is_suffering') || this.is_suffering;
    this.is_pregnant = sessionStorage.getItem('is_pregnant') || this.is_pregnant;
    this.suffering_num = sessionStorage.getItem('suffering_num') || this.suffering_num;
    this.hidden = sessionStorage.getItem('hidden') || this.hidden;
    // this.age = sessionStorage.getItem('age') || this.age;
    this.gender = sessionStorage.getItem('gender') || this.gender;
    this.remark = sessionStorage.getItem('remark') === 'null' || !sessionStorage.getItem('remark') ? '' : sessionStorage.getItem('remark');
    let buyMedicineImg = sessionStorage.getItem('buyMedicineImgUrl');
    if (buyMedicineImg) {
      this.imgUrl = buyMedicineImg;
      this.imgUrls.push(buyMedicineImg);
    }
  },
  methods: {
    // 跳转到在线问诊
    go_zxwz() {
      this.setStore();
      this.$router.push({
        path: '/inquiry/intoSecond?consultType=1'
      });
    },
    // 是否怀孕
    toOther(type) {
      // if (this.is_pregnant === 1) {
      //   // this.is_pregnant = 0;
      // } else {
      //   this.is_pregnant = 0;
      // }
      if (type === 'yes' && this.is_pregnant !== 1) {
        this.is_pregnant = 1;
      }
      else if (type !== 'yes' && this.is_pregnant !== 0) {
        this.is_pregnant = 0;
      }
    },
    // 是否煎熬
    otherTHREE(type) {
      // if (this.is_suffering === 1) {
      //   this.is_suffering = 0;
      //   return this.is_suffering;
      // } else {
      //   this.is_suffering = 1;
      //   return this.is_suffering;
      // }
      if (type === 'yes' && this.is_suffering !== 1) {
        this.is_suffering = 1;
        this.suffering_num = 3;
        Toast('代煎剂量不能小于3');
      }
      else if (type !== 'yes' && this.is_suffering !== 0) {
        this.is_suffering = 0;
        this.suffering_num = 1;
      }
    },
    // 性别
    // Sex() {
    //   if (this.gender === 1) {
    //     this.gender = 0;
    //     return this.gender;
    //   } else {
    //     this.gender = 1;
    //     return this.gender;
    //   }
    // },
    // 代煎费用
    decoct() {
      this.popupVisible = !this.popupVisible;
    },
    // 剂数加
    add() {
      let num = this.suffering_num;
      num++;
      this.suffering_num = num;
      this.hidden = true;
    },
    // 剂数减
    reduce() {
      let num = this.suffering_num;
      num--;
      if (num <= 0) {
        return;
      }
      this.suffering_num = num;
    },
    // 返回上一页 清除所有值
    back() {
      this.removeStore();
      this.$router.back(-1);
    },
    // 处方示例
    examples() {
      this.setStore();
      this.$router.push('/chineseDrug/examples');
    },
    // 跳转至选择收货地址
    addressMgr() {
      this.setStore();
      this.$router.push({
        path: '/addressMgr/select',
        query: {
          from: 'BuyMedicine'
        }
      });
    },
    setStore() {
      sessionStorage.setItem('phonenumber', this.phone);
      sessionStorage.setItem('is_suffering', this.is_suffering);
      sessionStorage.setItem('is_pregnant', this.is_pregnant);
      sessionStorage.setItem('suffering_num', this.suffering_num);
      sessionStorage.setItem('remark', this.remark);
      sessionStorage.setItem('hidden', this.hidden);
    },
    removeStore() {
      sessionStorage.removeItem('buyMedicineImgUrl');
      sessionStorage.removeItem('phonenumber');
      sessionStorage.removeItem('is_suffering');
      sessionStorage.removeItem('is_pregnant');
      sessionStorage.removeItem('suffering_num');
      sessionStorage.removeItem('hidden');
      // sessionStorage.removeItem('age');
      sessionStorage.removeItem('gender');
      sessionStorage.removeItem('selectedAddressBm');
      sessionStorage.removeItem('remark');
    },
    // 输入手机号
    phoneNum() {
      if (this.phone === '') {
        Toast({
          message: '请输入手机号',
          position: 'middle',
          duration: 1000
        });
      } else {
        return;
      }
    },
    // 年龄
    // ages() {
    //   if (this.age === '' || this.age < 1 || this.age > 200) {
    //     Toast({
    //       message: '请输入1-200之间的年龄',
    //       position: 'middle',
    //       duration: 1000
    //     });
    //   } else {
    //     return;
    //   }
    // },
    // 点击提交数据
    submit() {
      if (this.phone !== '' && this.imgUrls.length > 0 && this.suffering_num > 0) { // 先判断手机号和图片不能为空
        let Mobile = '^(1[3-9])\\d{9}$';
        let reg = new RegExp(Mobile);
        if (this.phone === '' || !reg.test(this.phone)) { // 手机号不为空验证手机号正确性
          Toast({
            message: '请输入有效手机号码！',
            position: 'middle',
            duration: 1200
          });
        }
        else if (!this.addr_str) {
          Toast({
            message: '请选择收货地址！',
            position: 'middle',
            duration: 1200
          });
        }
        else { // 手机号正确、图片不为空，能够提交数据
          let data = {
            consignee: this.consignee, // 收货人名字
            zhyy_userid: this.zhyy_userid, // 患者端ID
            con_tel: this.con_tel, // 收货人电话
            addr_str: this.addr_str, // 收货人地址
            docPrescriptions: [{
              recipe_pic_url: this.imgUrl, // 图片
              username: this.username, // 患者用户名
              tel: this.phone, // 患者联系电话（手机号）
              suffering_type: this.is_suffering,
              is_suffering: this.is_suffering, // 是否代煎 0:不代煎    1:代煎
              is_pregnant: this.is_pregnant, //  是否孕妇  0：非孕妇  1：孕妇
              suffering_num: this.suffering_num, // 代煎剂数
              province: this.addressObj.addressProvince,
              city: this.addressObj.addressCity,
              zone: this.addressObj.addressDistrict,
              remark: this.remark
            }],
          };
          // 向服务器发送拍方购药的数据
          let url1 = `/api/order/patientInsertPhotoOrder`;
          if (this.con_tel !== '' && this.consignee !== '' && this.addr_str !== '') { // 判断收货人信息不能为空，为空不提交
            doctorAjax.post(url1, data).then(res => {
              // console.log(res);
              if (res.status === 200) {
                this.removeStore();
                this.$router.back(-1);
                // this.$router.push('/chineseDrug/index');
                Toast({
                  message: '提交成功',
                  position: 'middle',
                  duration: 1500
                });
              } else {
                Toast({
                  message: '提交失败',
                  position: 'middle',
                  duration: 1500,
                });
              }
            });
          } else if (this.consignee === '' || this.con_tel === '' || this.addr_str === '') { // 收货人信息为空提示
            Toast({
              message: '请输入收货人信息',
              position: 'middle',
              duration: 1000
            });
          }
        }
      } else if (this.imgUrls.length === 0) { // 提示图片不能为空
        Toast({
          message: '请上传图片',
          position: 'middle',
          duration: 1000
        });
      } else if (this.phone === '') { // 提示手机号不能为空
        this.phoneNum();
      } else if (this.suffering_num <= 0) { // 提示拍药剂数不能为空
        Toast({
          message: '请选择拍药剂数',
          position: 'middle',
          duration: 1000
        });
      }
    },
    iswx: function () {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('micromessenger') > 0) { // 微信
        return true;
      } else {
        return false;
      }
    },
    /**
    uploadImg() {
      let _self = this;
      if (_self.iswx()) { // 微信
        _self.wx.ready(function () {
          console.log('_self.wx.ready', _self.wx);
          _self.wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              console.log('success', res);
              let localIds = res.localIds;
              _self.syncUpload(localIds);
            },
            fail: function (err) {
              console.log('fail', err);
              // alert(JSON.stringify(err));
            }
          });
        });
      }
    },
    // 上传图片，采用递归方式解决ios端多图上传不了的问题
    syncUpload(localIds) {
      console.log('localIds', localIds);
      const _self = this;
      let imglink = localIds.pop();
      _self.wx.uploadImage({
        count: 1,
        localId: imglink, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (r) {
          let serverId = r.serverId; // 返回图片的服务器端ID
          let token = _self.wxResponseConfig.access_token;
          ajax.get(`/api/system/UploadWebFile`, {
            params: {
              access_token: token,
              media_id: serverId
            }
          }).then((res) => {
            console.log('上传完成图片', res);
            if (res.status === 200 && res.data.code === 0) {
              let model = JSON.parse(res.data.data);
              _self.imgUrls.push(model.url);
              _self.imgUrl = model.url;
              sessionStorage.setItem('buyMedicineImgUrl', model.url);
            }
          });
          if (localIds.length > 0) {
            _self.syncUpload(localIds);
          }
        }
      });
    },
     **/
    // 上传图片-跳转表单提交
    openLocals() {
      $(`input[type='file'][name='${this.fileName}']`).click();
    },
    // 上传图片-表单上传
    fileChanged() {
      this.uploadImgs();
    },
    uploadImgs() {
      let _self = this;
      let fileElement = $(`input[type='file'][name='${_self.fileName}']`);
      let filename = fileElement.val();
      let ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
      if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg' && ext !== '.bmp') {
        Toast({
          message: '仅支持.jpg、.png、.jpeg、.bmp的图片格式',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
      let file = fileElement[0].files[0];
      let imgSize = Math.ceil(file.size / 1024 / 1024);
      if (imgSize > 20) {
        Toast({
          message: '文件不能大于20MB,重新选择文件',
          position: 'bottom',
          duration: 2000
        });
        _self.$refs.pathClear.value = '';
        return false;
      }
      Indicator.open('图片正在上传中...');
      // oss web直传
      webPostObject(file, file.name).then(data => {
        // console.log(data);
        Indicator.close();
        let model = data.url;
        _self.imgUrls.push(model);
        _self.imgUrl = model;
        sessionStorage.setItem('buyMedicineImgUrl', model);
      }).catch(() => {
        Indicator.close();
        Toast({
          message: '图片上传失败',
          position: 'bottom',
          duration: 2000
        });
      });
    },
  },
};

</script>
<style lang="less" scoped>
@import "../../styles/mixin.less";
@font-size: 15px;

.BuyMedicineWrapper {
  width: 100%;
  position: relative;
  height: 100%;
  background: #fff;
}

.Nameleft {
  margin-left: -5px;
}

.mint-popup {
  top: 43%;
  border-radius: 5px;
  width: 200px;
  padding: 0 10px;
}

.BuyMedicine {
  width: 100%;
  background: #fff;
  position: absolute;
  top: 44px;
  bottom: 0;
  overflow-y: auto;

  .prescription {
    position: relative;
    width: 100%;
    height: 180px;
    background-image: url(./imgs/xh_pfgy_upload.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100px 100px;

    &.nobg {
      background: none;

      &:after {
        content: " ";
      }
    }

    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 110px;
      margin: auto;
    }

    &:after {
      z-index: 0;
      content: "点击上传处方";
      display: inline-block;
      color: #999;
      font-size: 14px;
      position: absolute;
      text-align: center;
      left: 0;
      right: 0;
      width: 100px;
      height: 20px;
      top: 100px;
      margin: 0 auto;
    }
  }

  .split_row {
    height: 25px;
    width: 100%;
    background-color: #eee;
    padding-left: 10px;

    .examples {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #ff4751;
      font-size: 12px;
      height: 100%;

      &:before {
        content: " ";
        display: inline-block;
        width: 14px;
        height: 14px;
        background-image: url(./imgs/xh_icon_cfsl.png);
        background-repeat: no-repeat;
        background-size: cover;
        margin-right: 5px;
      }
    }
  }

  .LiCommon {
    width: 100%;
    height: 47px;
    line-height: 47px;
    padding: 0 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #e0e0e0;
    position: relative;

    &.num {
      .redstar {
        position: absolute;
        left: 13px;
        color: #f75858;
        font-size: 15px;
      }

      p {
        height: 47px;
        line-height: 47px;
        position: relative;

        span {
          color: @black-color;
          font-size: @font-size;
        }

        .jiajian {
          position: absolute;
          right: 15px;
          top: 0;

          img {
            width: 15px;
            height: 15px;
          }

          i.number {
            border: none;
            width: 18px;
            margin: 0 10px;
            text-align: center;
            position: relative;
            top: -2px;
          }
        }
      }
    }

    .drugName {
      color: @black-color;
      font-size: @font-size;

      &.help {
        position: relative;

        &:after {
          content: " ";
          background-image: url(./imgs/xh_icon_cfsl.png);
          position: absolute;
          top: 3px;
          right: -19px;
          width: 14px;
          height: 14px;
          background-size: cover;
        }
      }
    }

    .outputName {
      width: 130px;
      border: none;
      text-align: right;
      padding-right: 18px;
      position: absolute;
      top: 15px;
      right: 10px;
      color: @black-color;
      font-size: @font-size;
    }

    ::-webkit-input-placeholder {
      color: #999;
      text-align: right;
    }

    .Choice {
      position: absolute;
      right: 15px;
      top: 0;

      img {
        width: 18px;
        height: 18px;
        position: relative;
        top: 4px;
      }
    }

    .yes {
      position: absolute;
      right: 75px;
    }

    .no {
      position: absolute;
      right: 14px;
    }
  }

  .Decoct {
    height: 65px;
    position: relative;

    .jianao {
      display: block;
      height: 20px;
      transform: scale(.9);
      position: absolute;
      left: 10px;
      top: 25px;

      img {
        width: 12px;
        height: 12px;
      }

      span {
        color: #666;
        font-size: 10px;
        margin-top: -2px;
      }
    }
  }

  .ReceiveAddress {
    position: relative;
    font-size: 15px;
    color: #333;
    padding: 12px 24px 12px 12px;
    width: 100%;

    &.arrow:after {
      content: " ";
      width: 7px;
      height: 7px;
      top: 0;
      bottom: 0;
      margin: auto;
      border-color: #888;
      border-style: solid;
      border-width: 1px 1px 0 0;
      transform: rotate(45deg);
      position: absolute;
      right: 12px;
    }

    .address_name_phone {}

    .address_detail {}
  }

  .remark {
    font-size: 15px;
    color: #333;
    padding: 12px 24px 12px 12px;
    display: flex;
    width: 100%;
    align-items: flex-start;

    .redstar {
      color: red;
      margin-right: 5px;
    }

    textarea {
      flex: 1;
      font-size: 15px;
      border: none;
      padding-top: 3px;
    }
  }

  .bdeee {
    width: 100%;
    height: 10px;
    background: #eeeef3;
  }

  .btn {
    width: 100%;
    margin-top: 12px;
    margin-bottom: 24px;
    padding: 0 12px;
    box-sizing: border-box;

    .nopre_btn {
      border-radius: 3px;
      width: 100%;
      height: 40px;
      background-color: @green-color;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
      font-size: 18px;

      span {
        font-weight: bold;
      }
    }

    .submit_btn {
      border-radius: 3px;
      width: 100%;
      height: 40px;
      color: @green-color;
      border: 1px solid @green-color;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    p {
      margin-top: 10px;
      font-size: 12px;
      color: @black-color;
    }
  }
}

</style>

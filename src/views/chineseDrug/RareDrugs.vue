<template>
  <div id="retaWrapper">
    <mt-header fixed title="寻稀缺药">
      <a slot="left" @click="home()">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="filter">
      <div class="rate">
        <li class="LiCommon">
          <span style="color:#f75858;font-size:15px;margin-left:-3px;"> ＊</span>
          <span class="drugName Nameleft">药品名称</span>
          <input type="text" class="outputName sigleTextOverflow " placeholder="请输入药品名称" v-model="drugsName" @blur="drugs()">
        </li>
        <li class="LiCommon">
          <span style="color:#f75858;font-size:15px;margin-left:-3px;"> ＊</span>
          <span class="drugName Nameleft">手机号</span>
          <input type="text" class="outputName sigleTextOverflow " placeholder="请输入手机号" v-model="phone" @blur="phoneNum()">
        </li>
        <li class="LiCommon">
          <span class="drugName">药品产地</span>
          <input type="text" class="outputName sigleTextOverflow " placeholder="请填写药品产地" v-model="drugsAddress">
        </li>
        <div class="prescription">
          <div class="Upload">
            <p>上传处方</p>
            <div class="examples">
              <img src="./imgs/icon-chufangshili.png" alt="" class="mark">
              <span @click="examples()">处方示例</span>
            </div>
          </div>
          <div class="imgRegion">
            <img src = "./imgs/icon-sctp.png" alt="" class="uploadImg" @click="uploadImg" v-show="hide">
            <img :src='item' v-for="(item, index) in imgUrls" :key="index" alt="" @click="uploadImg" class="uploadImg" />
          </div>
        </div>
        <div class="Remarkswrap">
          <label for="" class="bz">备注</label>
          <input type="text" class="Remarks" placeholder="请输入备注信息" v-model="Remark">
        </div>
      </div>
      <div class="btn">
        <mt-button type="primary" @click="Submission()">提交寻药</mt-button>
      </div>
      <p class="tips">您提交寻药信息后，我们将在24小时内帮您寻找药品联系购买请您保持电话畅通，客服将通过电话联系您，给您答复寻药进展、药品报价、配送时间。</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../styles/mixin.less';
@background:#fff;
@color:#333;
@font-size:15px;
.mint-popup{
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  margin-top: -30px;
}
#retaWrapper{
  height: 623px;
  .filter{
  width: 100%;
  background: @background;
  position: absolute;
  top: 44px;
  bottom: 0;
  left:0;
  z-index: 0;
  }
  .rate{
    width: 100%;
    background: @background;
    .LiCommon{
      width:100%;
      height: 47px;
      line-height: 47px;
      padding: 0 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #e0e0e0;
      position: relative;
      }
      .Nameleft{
        margin-left: -5px;
      }
      .drugName{
        color: @color;
        font-size: @font-size;
      }
      .outputName{
        width: 130px;
        border: none;
        text-align: left;
        position: absolute;
        top: 15px;
        right: 10px;
        color: @black-color;;
        font-size: @font-size;
      }
      ::-webkit-input-placeholder{
        color: #999;
        text-align: right;
      }
    .prescription{
      width: 100%;
      height: 88px;
      border-bottom: 1px solid #e0e0e0;
      position: relative;
      padding: 0 10px;
      box-sizing: border-box;
      .Upload{
        position: absolute;
        top: 10px;
        font-size: @font-size;
        color: @color;
        .mark{
        width: 9px;
        height: 9px;
      }
      .examples {
        margin: 5px 0 0 -4px;
        transform: scale(0.8);
        span{
        color: #666;
        font-size: 10px;
        }
      }
      }
      .uploadImg{
        width: 102px;
        height: 77px;
        margin: 5px 5px 0 0;
        position: absolute;
        right: 0px;
      }
      .imgBorder{
        margin-right: 0px;
      }
      .imgRegion{
        width: 280px;
        height: 100%;
        position: absolute;
        left: 80px;
      }
    }
    .Remarkswrap{
      margin-top: 12px;
      padding: 0 12px;
      .bz{
        font-size: 14px;
      }
      .Remarks{
        display: block;
        margin-top: 3px;
        border: none;
        width: 100%;
        height: 25px;
        font-size: 15px;
      }
      ::-webkit-input-placeholder{
        color: #999;
        text-align: left;
      }
    }
  }
  .btn{
    margin-top: 50px;
    width: 100%;
    height: 40px;
    text-align: center;
    .mint-button--normal{
      width: 95%;
      height: 100%;
      label{
        font-size: 18px;
      }
    }
  }
  .tips{
    margin: 13px 10px 0;
    font-size: 13px;
    color: @color;
  }
}
.primary-nav[data-v-5ed2bf18]{
  z-index: -1;
}
</style>
<script>
import { Button, Toast } from 'mint-ui';
import wxjs from '@/utils/wxjsInterface';
import ajax from '@/utils/ajax';
// import { getToken } from '@/utils/auth';
import { getQueryString } from '../../utils/index';
export default {
  data() {
    return {
      drugsName: '',  // 药品名
      phone: '',    // 手机号
      drugsAddress: '',    // 药品产地
      hide: true,
      wx: null, // 微信js sdk 实例对象
      wxResponseConfig: {}, // 请求返回的微信config对象
      imgUrls: [],
      Remark: ''  // 备注
    };
  },
  components: {
    'mt-button': Button,
  },
  created() {
    let _self = this;
    let code = getQueryString('code'); // 获取URL请求参数
    wxjs.init(code).then((res) => { // 调用wxjs中的init()
    // console.log(res);
      _self.wx = res.wx;      // 对wx进行赋值
      _self.wxResponseConfig = res.wxconfig;  // 对wxconfig进行赋值
    });
    this.imgUrls.push(sessionStorage.getItem('buyMedicineImgUrl'));
    this.drugsName = sessionStorage.getItem('drugName');
    this.phone = sessionStorage.getItem('phone');
    this.drugsAddress = sessionStorage.getItem('drugsAddress');
    if (this.phone == null) {
      this.phone = '';
    }
    if (this.drugsName == null) {
      this.drugsName = '';
    }
    if (this.drugsAddress == null) {
      this.drugsAddress = '';
    }
    // console.log(this.drugsName, this.phone);
    // sessionStorage.setItem('buyMedicineImgUrl', 'http://upload.jkbat.com/Files/20180621/hpi4x4lw.ozy.jpg');
  },
  methods: {
    // 返回首页
    home() {
      this.$router.push('/home/index');
      sessionStorage.removeItem('drugName');
      sessionStorage.removeItem('phone');
      sessionStorage.removeItem('drugsAddress');
      sessionStorage.removeItem('buyMedicineImgUrl');
    },
    // 处方示例
    examples() {
      this.$router.push('/chineseDrug/examples');
      sessionStorage.setItem('drugName', this.drugsName);
      sessionStorage.setItem('phone', this.phone);
      sessionStorage.setItem('drugsAddress', this.drugsAddress);
    },
    // 去除空格
    removeAllSpace(str) {
      return str.replace(/\s+/g, '');
    },
    // 药品名
    drugs() {
      if (this.removeAllSpace(this.drugsName) === '') {
        Toast({
          message: '请输入药品名称',
          position: 'middle',
          duration: 1500
        });
      } else {
        return;
      }
    },
    // 手机号
    phoneNum() {
      if (this.removeAllSpace(this.phone) === '') {
        Toast({
          message: '请输入手机号',
          position: 'middle',
          duration: 1500
        });
      } else {
        return;
      }
    },
    // 提交寻稀缺药
    Submission() {
      if (this.removeAllSpace(this.drugsName) === '') {
        this.drugs();
      } else if (this.phone === '') {
        this.phoneNum();
      }
      else if (this.phone !== '') {
        let Mobile = '^(1[3-9])\\d{9}$';
        let reg = new RegExp(Mobile);
        if (!this.phone || !reg.test(this.phone)) {
          Toast({
            message: '请填写有效手机号码！',
            position: 'middle',
            duration: 1500
          });
        }
        else if (this.removeAllSpace(this.drugsName) !== '') {
          let url = `/api/raredrug/addraredrug`;
          let params = {
            DrugName: this.drugsName,  // 药品名（必）
            Mobile: this.phone,  // 手机号（必）
            DrugOriginPlace: this.drugsAddress,  // 药品产地
            PrescriptionUrl: this.imgUrls.item,  // 图片
            Remark: this.Remark,  // 备注
          };
          ajax.post(url, params).then(res => {
            // console.log(res);
            if (res.data.code === 0 && res.status === 200) {
              sessionStorage.removeItem('buyMedicineImgUrl');
              sessionStorage.removeItem('drugName');
              sessionStorage.removeItem('phone');
              sessionStorage.removeItem('drugsAddress');
              Toast({
                message: '提交成功',
                position: 'middle',
                duration: 1500
              });
              this.$router.push('/home/index');
              this.drugsName = '';  // 获取药品名
              this.phone = '';   // 获取手机号
              this.drugsAddress = '';   // 获取药品产地
              this.hide = true;
            } else {
              Toast({
                message: '提交失败,请查看是否登录',
                position: 'middle',
                duration: 1500
              });
            }
          });
        }
      }
    },
    // 判断软件的内置浏览器类型
    iswx: function () {
      let ua = navigator.userAgent.toLowerCase();  // 判断浏览器的类型；
      if (ua.indexOf('micromessenger') > 0) { // 微信
        return true;
      }
      else {
        return false;
      }
    },
    // 点击上传图片
    uploadImg() {
      let _self = this;
      if (_self.iswx()) {  // 微信
        _self.wx.ready(function () {
          _self.wx.chooseImage({  // 拍照或从手机相册中选图接口
            success: function (res) {
              let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              _self.syncUpload(localIds);
            }
          });
        });
      }
    },
    // 上传图片，采用异步方式解决（ios端）多图上传不了的问题
    syncUpload(localIds) {
      const _self = this;
      let imglink = localIds.pop();
      _self.wx.uploadImage({   // 上传图
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
            if (res.status === 200 && res.data.code === 0) {
              let model = JSON.parse(res.data.data);
              _self.imgUrls.push(model.url);
              sessionStorage.setItem('buyMedicineImgUrl', model.url);
            }
          });
          if (localIds.length > 0) {
            _self.syncUpload(localIds);
          }
        }
      });
    }
  }
};
</script>

<template>
  <div class="has-header account-manage-body">
    <mt-header fixed title="账号管理">
      <router-link to="/myCenter/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <ul class="account-list">
      <li>
        <span class="avatar">头像</span>
        <div class="list-right" @click="uploadImg">
          <template v-if="userInfo.photopath">
            <img :src="userInfo.photopath" />
          </template>
          <template v-else>
            <img v-if="userInfo.gender === 0" src="./img/account-manage/icon-female.png"/>
            <img v-if="userInfo.gender === 1" src="./img/account-manage/icon-male.png"/>
          </template>
          <i></i>
        </div>
      </li>
      <li>
        <span>手机号</span>
        <div class="list-right">
          {{ userInfo.mobile }}
        </div>
      </li>
      <li>
        <span>昵称</span>
        <div class="list-right" @click="editNickname">
          {{ userInfo.nickname }}
          <i></i>
        </div>
      </li>
      <li>
        <span class="sex-title">性别</span>
        <div class="list-right">
          <mt-radio class="sex" v-model="value" :options="sex" @change="editSex"></mt-radio>
        </div>
      </li>
      <li>
        <span>出生日期</span>
        <div class="list-right" @click="showTimePicker">
          {{ userInfo.birthday }}
          <i></i>
        </div>
      </li>
    </ul>
    <mt-datetime-picker
      ref="picker"
      type="date"
      @confirm="editDate"
      :value="defaultDate"
      :startDate="startDate"
      :endDate="endDate">
    </mt-datetime-picker>
    <div class="exitLoginBtn">
      <mt-button type="primary" size="large" @click="exitLogin()">退出登录</mt-button>
    </div>
  </div>
</template>

<script>

import { Header, Radio, Toast, MessageBox, DatetimePicker } from 'mint-ui';
import ajax from '@/utils/ajax';
import wxjs from '@/utils/wxjsInterface';
import { removeToken } from '@/utils/auth';
import { getUserInfo } from '@/api/user';
import { getQueryString } from '@/utils/index';

export default {
  name: 'accountManage',
  data() {
    return {
      userInfo: '', // 用户信息
      // defaultImg: { // 默认用户头像
      //   male: 'this.src="' + require('./img/account-manage/icon-male.png') + '"',
      //   female: 'this.src="' + require('./img/account-manage/icon-female.png') + '"'
      // },
      value: '',
      sex: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '0'
        }
      ],
      // 日期
      pickerVisible: '',
      startDate: new Date('1900-01-01'),
      endDate: new Date(),
      defaultDate: '',
      // 微信js sdk 实例对象
      wx: null,
      // 请求返回的微信config对象
      wxResponseConfig: {},
      natarUrl: '' // 微信头像
    };
  },
  components: {
    'mt-header': Header,
    'mt-radio': Radio,
    'mt-date-picker': DatetimePicker
  },
  created() {
    let _self = this;
    let code = getQueryString('code');
    wxjs.init(code).then((res) => {
      console.log('init');
      _self.wx = res.wx;
      _self.wxResponseConfig = res.wxconfig;
    });
  },
  mounted() {
    // 获取个人信息
    this.getUserInfoList();
  },
  methods: {
    // 退出登录
    exitLogin() {
      removeToken();
      Toast('退出登录成功');
      this.$router.push({ path: '/myCenter/index' });
    },
    // 获取url中的times参数
    getUrlTimes() {
      let urlTimes = getQueryString('times');
      if (urlTimes) {
        this.$router.push({ path: '/accountManage' });
        window.location.reload();
      }
    },
    // 获取个人信息
    getUserInfoList() {
      let _this = this;
      getUserInfo().then(resp => {
        console.log(resp);
        let resultData = resp.data;
        if (resp.status === 200 && String(resultData.code) === '0') {
          // 获取url中的times参数
          _this.getUrlTimes();
          _this.userInfo = resultData.data;
          _this.value = String(resultData.data.gender);
          _this.defaultDate = new Date(resultData.data.birthday);
        }
      });
    },
    // 是否微信端访问
    iswx: function () {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('micromessenger') > 0) { // 微信
        return true;
      }
      else {
        return false;
      }
    },
    uploadImg() {
      let _self = this;
      if (_self.iswx()) { // 微信
        _self.wx.ready(function () {
          _self.wx.chooseImage({
            count: 1,
            success: function (res) {
              let localIds = res.localIds;
              _self.syncUpload(localIds);
            }
          });
        });
      }
    },
    // 上传图片，采用递归方式解决ios端多图上传不了的问题
    syncUpload(localIds) {
      if (localIds.length > 1) {
        Toast('只能上传1张图片！');
        return false;
      }
      let _self = this;
      let imglink = localIds.pop();
      _self.wx.uploadImage({
        localId: imglink, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
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
              _self.natarUrl = model.url;
              _self.editUserInfo(_self.userInfo.nickname, _self.userInfo.birthday, _self.userInfo.gender, _self.userInfo.age, _self.natarUrl, _self.userInfo.remark);
            }
          });
        }
      });
    },
    // 修改昵称
    editNickname() {
      MessageBox.prompt(' ',
        {
          title: '昵称',
          inputValue: this.userInfo.nickname,
          inputPlaceholder: '请输入昵称'
        }).then(resp => {
        let newName = resp.value;
        newName = newName.replace(/(^\s*)|(\s*$)/g, ''); // 去除字符串两边的空格
        if (newName.length > 0 && newName.length < 9 && newName !== this.userInfo.nickname) {
          this.editUserInfo(newName, this.userInfo.birthday, this.userInfo.gender, this.userInfo.age, this.userInfo.photopath, this.userInfo.remark);
        } else if (newName.length === 0) {
          Toast('昵称不能为空！');
        } else if (newName.length > 8) {
          Toast('昵称长度不能超过8个字符！');
        }
      }, () => {});
    },
    // 修改性别
    editSex() {
      let sexValue = Number(this.value);
      sexValue = sexValue === 1 ? 0 : 1;
      console.log(sexValue);
      this.editUserInfo(this.userInfo.nickname, this.userInfo.birthday, sexValue, this.userInfo.age, this.userInfo.photopath, this.userInfo.remark);
    },
    // 显示日期修改
    showTimePicker() {
      this.$refs.picker.open();
    },
    // 获取选择日期值并修改日期
    editDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month.toString().length > 1 ? month : '0' + month;
      day = day.toString().length > 1 ? day : '0' + day;
      let dates = year + '-' + month + '-' + day;
      this.editUserInfo(this.userInfo.nickname, dates, this.userInfo.gender, this.userInfo.age, this.userInfo.photopath, this.userInfo.remark);
    },
    // 修改个人信息
    editUserInfo(reNickname, reBirthday, reGender, reAge, rePhotopath, reMark) {
      let _this = this;
      let photoPath = rePhotopath;
      let manAvatarUrl = 'https://uploads.kangmei.com.cn/Files/20180801/ysbbwokg.lf4.png';
      let feManAvatarUrl = 'https://uploads.kangmei.com.cn/Files/20180731/2n4d2an5.zvp.png';
      if (photoPath === manAvatarUrl || photoPath === feManAvatarUrl) {
        photoPath = '';
      }
      ajax.post('/api/user/info', {
        NickName: reNickname,
        Birthday: reBirthday,
        Gender: reGender,
        Age: reAge,
        PhotoPath: photoPath,
        Remark: reMark
      }).then(resp => {
        if (resp.status === 200 && String(resp.data.code) === '0') {
          _this.getUserInfoList();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
  @import '../../styles/mixin.less';
  @color-ef3: #eeeef3;
  @color-33: #333;
  @color-e0: #e0e0e0;
  .account-manage-body {
    min-height: 100%;
    background: @color-ef3;
  }
  .account-list {
    background: #fff;
    li {
      display: flex;
      padding: 15px 12px;
      color: @color-33;
      font-size: 16px;
      border-bottom: solid 1px @color-e0;
      span {
        margin-right: 10px;
        &.avatar {
          line-height: 80px;
        }
        &.sex-title {
          line-height: 35px;
        }
      }
      .list-right {
        flex: 1;
        text-align: right;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          vertical-align: middle;
        }
        i {
          .turn-icon(#666,12px,-135deg);
        }
        .sex {
          display: inline-block;
        }
      }
    }
  }
  .exitLoginBtn {
    width:100%;
    padding: 40px 10px 0;
  }
</style>

<style lang="less">
  .account-manage-body {
    .sex {
      .mint-cell {
        display: inline-block;
        min-height: auto;
        .mint-cell-value {
          width: auto;
        }
        .mint-radio-input:checked + .mint-radio-core {
          background-color: transparent;
          border-color: transparent;
          background: url('./img/account-manage/icon-xuanzhong@2x.png') center center no-repeat;
          background-size: 100% 100%;
        }
        .mint-radio-input:checked + .mint-radio-core::after {
          background-color: transparent;
        }
        .mint-radiolist-label {
          padding: 0;
        }
        &:last-child {
          background-image: none;
          background-size: 0 0;
        }
      }
    }
  }
</style>

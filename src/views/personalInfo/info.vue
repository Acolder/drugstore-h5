<template>
  <div class="info-body">
    <mt-header fixed title="个人信息"></mt-header>
    <ul class="cell-body">
      <li>
        <div class="cell-hd">姓名</div>
        <div class="cell-bd">
          <input type="text" v-model="username" placeholder="请输入姓名" />
        </div>
      </li>
      <li>
        <div class="cell-hd">性别</div>
        <div class="cell-bd">
          <div class="sex" :class="{active: sex === 1}" @click="editSex(1)"><span></span>男</div>
          <div class="sex" :class="{active: sex === 0}" @click="editSex(0)"><span></span>女</div>
        </div>
      </li>
      <li>
        <div class="cell-hd">出生日期</div>
        <div class="cell-bd" @click="showTimePicker">
          <input type="text" v-model="birthday" placeholder="请选择出生日期" readonly="readonly"/>
        </div>
      </li>
      <li>
        <div class="cell-hd">手机号码</div>
        <div class="cell-bd">{{ telephone }}</div>
      </li>
      <li>
        <div class="cell-hd">收货地址管理</div>
        <div class="cell-bd" @click="goEdit">点击修改<i></i></div>
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
    <div class="btn-main">
      <mt-button type="primary" size="large">保存</mt-button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import ajax from '@/utils/ajax';
// import yilinAjax from '@/utils/yilinApiRequest';
// import { getQueryString } from '@/utils/index';
import { Header, Button, DatetimePicker } from 'mint-ui';
export default {
  name: 'info',
  data() {
    return {
      username: '张三',
      sex: 1,
      birthday: '',
      age: 18,
      telephone: 13313313313,
      // 日期
      startDate: new Date('1900-01-01'),
      endDate: new Date(),
      defaultDate: '',
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-date-picker': DatetimePicker
  },
  created() {
    // let _this = this;
    // let url = window.location.href;
    // let code = getQueryString('code');
    // ajax.post('/api/system/getWxJsConfig', {
    //   url: url,
    //   appId: 'AppId',
    //   appSecret: 'Secret',
    //   code: code
    // }).then(resp => {
    //   if (resp.status === 200 && resp.data.code === 0) {
    //     console.log('获取openid成功');
    //     console.log(resp);
    //     let openid = resp.data.data.openid;
    //     axios.post(`https://tdocker.kangmei.com.cn/weixin/getPersonInfo.do`, {
    //       openId: openid
    //     }).then(res => {
    //       console.log('请求成功');
    //       console.log(res);
    //     });
    //   }
    // });
  },
  methods: {
    goEdit() {
      this.$router.push({
        path: '/personalInfo/addressList'
      });
    },
    editSex(num) {
      console.log(num);
      this.sex = num;
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
      console.log(dates);
    },
  }
};
</script>

<style lang="less" scoped>
  @import '../../styles/mixin.less';
  .info-body {
    background: #e0e0e0;
    min-height: 100%;
    padding-top: 44px;
  }
  .cell-body {
    margin-bottom: 50px;
    background: #fff;
    li {
      display: flex;
      padding: 10px 12px;
      border-bottom: solid 1px #e0e0e0;
      font-size: 16px;
      .cell-hd {
        width: 100px;
      }
      .cell-bd {
        flex: 1;
        text-align: right;
        color: #333;
        input {
          width: 100%;
          font-size: 16px;
          text-align: right;
          border: none;
          background: none;
          color: #333;
        }
        select {
          width: 100%;
        }
        i {
          margin-left: 5px;
          .turn-icon(#333,10px,-135deg);
        }
        .sex {
          display: inline-block;
          &:first-child {
            margin-right: 30px;
          }
          span {
            display: inline-block;
            width: 15px;
            height: 15px;
            border: solid 1px #ccc;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 5px;
          }
          &.active {
            span {
              border: none;
              background: url("./img/icon-checked.png") center center no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
  .btn-main {
    padding: 0 12px;
  }
</style>

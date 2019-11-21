<template>
  <div class="introduce">
    <mt-header title="账号管理">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="introduce-main">
      <div class="accountPhone">
        <div>
          <img src="./img/icon-sj@3x.png" alt="">
          <span>手机号绑定</span>
        </div>
        <div style="color: #999" v-if="userInfo">{{userInfo.mobile}}</div>
      </div>
      <div class="threeTitle">第三方登录</div>
      <div class="wxBind" @click="bindweixin">
        <div>
          <img src="./img/icon-bdwx@3x.png" alt="" class="leftImg">
          <span>微信绑定</span>
        </div>
        <div v-if="userInfo">
          <span v-if="!userInfo.isbindweixin">未绑定</span>
          <span v-else>已绑定</span>
          <img src="./img/icon_jt@3x.png" alt="" class="rightImg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox, Indicator } from 'mint-ui';
import ajax from '@/utils/ajax';
import wxjs from '@/utils/wxjsInterface';
import { getQueryString } from '@/utils/index';
export default {
  data() {
    return {
      userInfo: null
    };
  },
  created() {
    // 请求用户的信息
    ajax.get('/api/user/info').then(data => {
      console.log(data, '登录信息');
      if (data.status === 200 && data.data.code === 0) {
        this.userInfo = data.data.data;
        // 获取uid
        this.wxjsInterfaceInit();
      } else {
        Toast({
          message: '暂无用户信息',
          position: 'middle',
          duration: 1500
        });
      }
    });
  },
  methods: {
    // 绑定微信，解绑微信
    bindweixin: function () {
      let mes = '';
      let title =  '';
      let ButtonText = '';
      let isbind = this.userInfo.isbindweixin;
      if (isbind) {
        title = '确认解除绑定';
        mes = '确认解除当前微信账户的绑定？';
        ButtonText = '解绑';
      } else {
        title = '确认绑定';
        mes = '确认绑定微信？';
        ButtonText = '绑定';
      }
      MessageBox.confirm('', {
        message: mes,
        title: title,
        confirmButtonText: ButtonText,
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          // 确认的回调
          if (isbind) {
            // 1.解绑
            ajax.post('/api/user/externalUnbind', {
              LoginType: 'weixin'
            }).then(data => {
              console.log(data, '解绑');
              if (data.status === 200 && data.data.code === 0) {
                Toast({
                  message: '解绑成功',
                  position: 'middle',
                  duration: 1500
                });
                this.userInfo.isbindweixin = false;
              }
            });
          } else {
            // 2.绑定-判断缓存是否有unionid，有绑定；没有取值后绑定
            let uid = sessionStorage.getItem('unionId');
            if (uid) {
              this.bindUid(uid);
            } else {
              console.log('没有uid');
              Indicator.open();
              let url = `${process.env.WEB_HOST}/aboutUs/wxRedirect`;
              let link = wxjs.getOpenIdUrl(url);
              location.href = link;
            }
          }
        }
      }).catch(err => {
        if (err === 'cancel') {
          // 取消的回调
          console.log('取消的回调');
        }
      });
    },
    // 绑定uid
    bindUid(uid) {
      ajax.post('/api/user/externalBind', {
        OpenId: uid,
        LoginType: 'weixin'
      }).then(data => {
        console.log(data, '绑定');
        if (data.status === 200 && data.data.code === 0) {
          Toast({
            message: '绑定成功',
            position: 'middle',
            duration: 1500
          });
          this.userInfo.isbindweixin = true;
        }
      });
    },
    // 获取uid
    wxjsInterfaceInit() {
      console.log('wxjsInterfaceInit');
      let wxCode = getQueryString('wxCode');
      console.log(wxCode, 'wxCode');
      if (wxCode && Number(wxCode) === 2) {
        let uid = sessionStorage.getItem('unionId');
        console.log(uid);
        if (uid) {
          this.bindUid(uid);
        }
      }
    },
  }
};


</script>

<style lang="less" scoped>
  .introduce{
    position: absolute;
    top: 0;
    bottom: 0;;
    left: 0;
    right: 0;
    background: #efeef3;
    overflow: auto;
    .introduce-main{
      margin-top: 44px;
      font-size: 12px;
      color: #333333;
      >div{
        width:100%;
        height: 50px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
      }
      .accountPhone,.wxBind{
        background: #ffffff;
        >div{
          display: flex;
          align-items: center;
        }
        img{
          width:12px;
          height: 18px;
          margin-right: 5px;
        }
      }
      .wxBind{
        >div>.leftImg{
          width:20px;
          height: 18px;
        }
        >div>.rightImg{
          width: 8px;
          height: 18px;
          margin-left: 5px;
          margin-right: 0;
        }
      }
    }
  }
</style>


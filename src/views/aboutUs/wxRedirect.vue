<template>
  <div></div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui';
import wxjs from '@/utils/wxjsInterface';
import { getQueryString } from '@/utils/index';
// import { weixinLogin } from '@/api/user';
export default {
  data() {
    return {};
  },
  created() {
    this.wxInterfaceInit();
  },
  methods: {
    wxInterfaceInit() {
      let code = getQueryString('code');
      if (code) {
        wxjs.init(code).then((rs) => {
          if (rs) {
            let unionId = rs.wxconfig.unionid;
            if (unionId) {
              sessionStorage.setItem('unionId', unionId);
              this.$router.replace('/aboutUs/AccountManage?wxCode=2');
              // weixinLogin(unionId).then(() => {
              // Indicator.close();
              // });
            } else {
              // 获取失败回到上一页，等待用户再次点击
              MessageBox.confirm('微信数据获取失败，是否重试？', '提示').then(() => {
                this.$router.replace('/aboutUs/AccountManage?wxCode=1');
              });
            }
          } else {
            console.log('获取code结果内失败');
          }
        });
      } else {
        Toast('获取用户Code失败');
      }

    },
  }
};
</script>


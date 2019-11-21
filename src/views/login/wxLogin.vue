<template>
  <!--<div>微信登录中</div>-->
  <loading :loadingShow="loadingShow"></loading>
</template>
<script>
import { MessageBox } from 'mint-ui';
// import ajax from '@/utils/ajax';
import wxjs from '@/utils/wxjsInterface';
import { getQueryString } from '@/utils/index';
// import { weixinLogin } from '@/api/user';
import { mapActions, mapGetters } from 'vuex';
import loading from '@/components/loading/index';
import { returnPage } from '@/api/user';
export default {
  data() {
    return {
      unionId: '',
      pageindex: 1,
      loadingShow: true
    };
  },
  components: {
    loading
  },
  created() {
    this.wxInterfaceInit();
  },
  computed: {
    ...mapGetters([
      'phone',
    ])
  },
  methods: {
    wxInterfaceInit() {
      console.log(this.loadingShow, 'loadingShow');
      let code = getQueryString('code');
      if (code) {
        wxjs.init(code).then((rs) => {
          if (rs) {
            this.loadingShow = false;
            let unionId = rs.wxconfig.unionid;
            if (unionId) {
              // Indicator.close();
              this.unionId = unionId;
              this.getLogin();
            } else {
              MessageBox.confirm('用户信息获取失败，是否重试？', '提示').then(() => {
                this.$router.push('/fastLogin');
              }).catch(() => {
                this.$router.push('/fastLogin');
              });
            }
          }
        });
      } else {
        this.loadingShow = false;
        MessageBox.confirm('用户信息获取失败，是否重试？', '提示').then(() => {
          this.$router.push('/fastLogin');
        }).catch(() => {
          this.$router.push('/fastLogin');
        });
      }
    },
    ...mapActions([
      'getUserInfo'
    ]),
    // 微信登录
    getLogin() {
      sessionStorage.setItem('unionId', this.unionId);
      let _self = this;
      _self.$store.dispatch('weixinLogin', this.unionId).then((res) => {
        if (res.data) {
          if (res.data.code === 0) {
            _self.getUserInfo().then(() => {
              // 保存登录人的手机号码 用来查询脉诊仪借还的列表数据
              sessionStorage.setItem('MyEquipmentMobile', _self.phone);
            });
            sessionStorage.removeItem('returnUrl');
            returnPage();
          } else if (res.data.code === -1) {
            // Toast('您的账户未绑定手机号');
            this.$router.replace({ path: '/bindPhone' });
          }
        }
      });

    }
  }
};

</script>

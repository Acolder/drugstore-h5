<template>
  <div id="inquiryLayout" class="inquiry-layout">
    <router-view :userId="userId" :hasConnect="hasConnect"></router-view>
  </div>
</template>
<script>
import { Header, Button, Tabbar, TabItem, Field }  from 'mint-ui';
import { getUserInfo } from '@/api/user';
import { connectRongIM, messageListener, connectionStatusListener } from '@/api/connectRongIM';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      instance: null,
      userId: '',
      hasConnect: false,
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-tabbar': Tabbar,
    'mt-tab-item': TabItem,
    'mt-field': Field
  },
  computed: {
    ...mapActions([
      'addUnreadMsg'
    ])
  },
  methods: {
    // 链接融云
    connectIM() {
      getUserInfo().then(res => {
        console.log(res);
        if (res.status === 200) {
          let resData = res.data;
          if (resData.code === 0) {
            connectRongIM(resData.data.rongcloudtoken, instance => {
              this.instance = instance;
            });
            this.messageListeners();
            connectionStatusListener(instance => {
              this.instance = instance;
              this.hasConnect = true;
            }); // 链接状态监听器
            this.userId = resData.data.userid;
          }
          else if (resData.code === -2) {
            this.$router.push({
              path: '/login'
            });
          }
        }
      });
    },
    // 消息监听
    messageListeners() {
      let _this = this;
      messageListener(message => {
        _this.$store.dispatch('addUnreadMsg', message);
      });
    }
  },
  mounted() {
    this.connectIM();
  }
};
</script>
<style scoped lang="less">
  @import "style/inquiry";
</style>

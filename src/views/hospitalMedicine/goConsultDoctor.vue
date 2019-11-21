<template>
  <div></div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { weixinLogin } from '@/api/user';
import { wxConsultDoctor } from '@/api/wxConsultDoctor';
export default {
  data() {
    return {
      unionId: '',
    };
  },
  beforeCreate() {
    Indicator.open();
    let unionId = this.$route.query.unionId;
    let doctorId = this.$route.query.doctorId;
    let realName = this.$route.query.realName;
    let avatar = this.$route.query.avatar;
    weixinLogin(unionId).then(() => {
      this.unionId = unionId;
      wxConsultDoctor(unionId, doctorId, realName, avatar, 'no-back');
    });
  }
};
</script>


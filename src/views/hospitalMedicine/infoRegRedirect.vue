<template>
  <div></div>
</template>
<script>
// import { Indicator } from 'mint-ui';
// import wxjs from '@/utils/wxjsInterface';
export default {
  data() {
    return {};
  },
  beforeCreate() {
    // Indicator.open();
    let unionId = this.$route.query.unionId;
    let doctorId = this.$route.query.doctorId;
    let realName = this.$route.query.realName;
    let avatar = this.$route.query.avatar;
    let wxDoctorInfo = {
      unionId: unionId,
      doctorId: doctorId,
      doctorName: realName,
      avatar: avatar
    };
    sessionStorage.setItem('wxDoctorInfo', JSON.stringify(wxDoctorInfo));
    this.$router.push('/hospitalMedicine/infoReg');
    // let url = `${process.env.WEB_HOST}/hospitalMedicine/infoReg`;
    // let link = wxjs.getOpenIdUrl(url);
    // location.href = link;
  }
};
</script>


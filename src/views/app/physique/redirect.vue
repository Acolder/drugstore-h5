<template>
<div></div>
</template>
<script>
import wxjs from '@/utils/wxjsInterface';
export default {
  data() {
    return {};
  },
  created() {
    // let record_id = this.$route.query.record_id;
    // let wxopen = this.$route.query.wxopen;
    let record_id = {
      'record_id': this.$route.query.record_id,
      'wxopen': this.$route.query.wxopen,
      'lat': this.$route.query.lat ? this.$route.query.lat : '',
      'lon': this.$route.query.lon ? this.$route.query.lon : '',
      'province': this.$route.query.province ? this.$route.query.province : '',
      'city': this.$route.query.city ? this.$route.query.city : '',
      'area': this.$route.query.area ? this.$route.query.area : ''
    };
    record_id = JSON.stringify(record_id);
    let url = `${process.env.WEB_HOST}/physique/reportnew?record_id=` + record_id;
    let link = wxjs.getOpenIdUrl(url);
    location.href = link;
  }
};
</script>


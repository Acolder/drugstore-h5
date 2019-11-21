<template>
  <div></div>
</template>
<script>
import { Indicator } from 'mint-ui';
import wxjs from '@/utils/wxjsInterface';
export default {
  data() {
    return {};
  },
  beforeCreate() {
    Indicator.open();
    let url = `${process.env.WEB_HOST}/physique/reportList`;
    let link = wxjs.getOpenIdUrl(url);
    location.href = link;
  }
};
</script>


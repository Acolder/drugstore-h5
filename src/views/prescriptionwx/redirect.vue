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
    let url = `${process.env.WEB_HOST}/prescriptionwx/list`;
    let link = wxjs.getOpenIdUrl(url);
    location.href = link;
  }
};
</script>


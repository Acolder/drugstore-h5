<template>
  <div></div>
</template>

<script>
import wxjs from '@/utils/wxjsInterface';
export default {
  name: 'index',
  data() {
    return {};
  },
  created() {
    let url = `${process.env.WEB_HOST}/personalInfo/info`;
    let link = wxjs.getOpenIdUrl(url);
    location.href = link;
  }
};
</script>

<style scoped>

</style>

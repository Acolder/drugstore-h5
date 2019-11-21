/** 2018/5/23 autor:zlf
*  summary:
*  usage：
*
*
*/
<template>
  <div id="symptomsSelfDiagnostics">
    <!--<mt-header title="导诊接待" id="head">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>-->
    <human-body></human-body>
  </div>
</template>
<script>
// import { Header }  from 'mint-ui';
// 初始化page.高度。
export default {
  name: 'guideDefault',
  components: {
  },
  data: function () {
    return {};
  }
};
</script>
<style lang="less" scoped>
  #symptomsSelfDiagnostics {
  }
</style>


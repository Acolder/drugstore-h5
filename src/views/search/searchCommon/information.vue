<template>
  <ul class="information-list">
    <li v-for="info in infoData" :key="info.resultId">
      <router-link :to="'/headlines/detail?id='+ info.resultId + '&from=else'" class="display-box clearfix">
        <span class="box-flex">
          <label class="info-name">{{info.title}}</label>
          <span>
            <!--<label class="info-source">{{info.sourceName}}</label>-->
            <label>阅读量: {{info.readingQuantity}}</label>
          </span>
        </span>
        <img :src="info.mainImage" v-show="info.mainImage"/>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ['infoData'],
  mounted() {
    console.log(this.infoData);
  }
};
</script>
<style lang="less" scoped>
  @import '../../../styles/mixin.less';
  .information-list{
    padding: 0 12px 0;
    background: @white-color;
    li{
      padding: 10px 0;
      border-bottom: @border-line;
      .info-name{
        font-size: 14px;
        color: @black-color;
        margin-bottom: 5px;
        .multi-text-overflow(2);
      }
      .info-source{
        padding-right: 12px;
      }
      label{
        font-size: 13px;
        color: @color999;
      }
      img{
        display: block;
        width: 100px;
        height: 75px;
        margin-left: 8px;
      }
    }
  }
  li:last-child{
    border-bottom: none;
  }
</style>

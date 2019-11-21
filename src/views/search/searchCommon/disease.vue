<template>
  <ul class="disease-list">
    <li v-for="diseases in diseaseData" :key="diseases.resultId" class="mint-cell-allow-right">
      <router-link :to="'/home/diseaseDescripDetail?id=' + diseases.resultId">
        {{diseases.resultTitle}}
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ['diseaseData']
};
</script>
<style lang="less" scoped>
  @import '../../../styles/mixin';
  .disease-list{
    background: @white-color;
    li{
      position: relative;
      height: 42px;
      line-height: 42px;
      border-bottom: @border-line;
      a{
        display: block;
        padding: 0 15px 0 8%;
      }
    }
    li:last-child{
      border: none;
    }
    .mint-cell-allow-right{
      &:after{
       .cell-allow-1px(9px, #838383)
      }
    }
  }
  .no-arrows{
    .mint-cell-allow-right{
      &:after{
       display: none;
      }
    }
  }
  .module-box{
    .disease-list{
      li{
        a{
          padding: 0 12px;
        }
      }
    }
  }
</style>

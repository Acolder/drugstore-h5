<template>
  <div class="page">
    <!--<mt-header fixed title="帮助文档">-->
      <!--<a href="javascript:;" slot="left" onClick="history.go(-1);">-->
        <!--<mt-button icon="back"></mt-button>-->
      <!--</a>-->
    <!--</mt-header>-->
    <div class="list">
      <div class="item" v-for="(h,i) in helps" :key="i" @click="goDetail(h)">{{h.title}}</div>
    </div>
  </div>
</template>
<style lang="less" scoped="">
@import '../../../styles/mixin.less';
.page {
  padding: 0;
  .list {
    background: #fff;
    .item {
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      text-align: left;
      padding-left: 14px;
      &:after {
        content: " ";
        position: absolute;
        top: 50%;
        right: 15px;
        margin-top: -4px;
        display: inline-block;
        height: 7px;
        width: 7px;
        border-width: 1px 1px 0 0;
        border-color: #333;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      }
    }
  }
}

</style>
<script>
import ajax from '@/utils/doctorAjax';
export default {
  data() {
    return {
      helps: []
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    goDetail(h) {
      this.$router.push({
        path: '/app/doctorHelper/details',
        query: { id: h.id }
      });
    },
    getlist() {
      let url = '/api/system/getHelperList/0';
      ajax.get(url).then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          this.helps = res.data.data;
        }
      });
    }
  }
};

</script>

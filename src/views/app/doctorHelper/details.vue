<template>
  <div class="page">
    <!--<mt-header fixed title="详情">-->
      <!--<a href="javascript:;" slot="left" onClick="window.history.go(-1);">-->
        <!--<mt-button icon="back"></mt-button>-->
      <!--</a>-->
    <!--</mt-header>-->
    <div class="content" v-html="detail.content">
    </div>
  </div>
</template>
<script>
import ajax from '@/utils/doctorAjax';
export default {
  data() {
    return {
      detail: {}
    };
  },
  created() {
    let id = this.$route.query.id;
    this.getdetail(id);
  },
  methods: {
    getdetail(id) {
      let url = '/api/system/getHelperDetail/' + id;
      ajax.get(url).then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          this.detail = res.data.data;
        }
      });
    }
  }
};

</script>
<style lang="less" scoped="">
.page {
  padding: 0;
  .content {
    padding: 14px;
    background: #fff;
    /deep/img {
      max-width: 100%;
    }
    /deep/p {
      max-width: 100%;
    }
  }
}

</style>

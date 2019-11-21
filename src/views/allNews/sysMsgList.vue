<template>
  <div class="page_contaier">
    <mt-header fixed title="系统消息">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="list_wrapper">
      <div class="list_item" v-for="(r, index) in results" :key="index">
        <div class="title_time">
          <span class="title">
    {{r.title}}
    </span>
          <span class="time">
    {{r.createdtime}}
    </span>
        </div>
        <div class="msg_icon_content">
          <div class="msg_icon">
            <img src="./imgs/xh_icon_cf@2x.png" alt="" v-if="!r.doctoravatar">
            <img :src="r.doctoravatar" alt="" v-else>
            <i v-if="!r.isread"></i>
          </div>
          <div class="msg_content">
            <p class="content">
              {{r.content}}
            </p>
            <p class="order_no">
              订单编号：{{r.relationid}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.page_contaier {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #e8e8e8;
  padding-top: 44px;
}

.list_wrapper {
  background-color: #e8e8e8;
}

.list_item {
  margin: 8px;
  background-color: #fff;
  padding: 0 0 10px 0;

  .title_time {
    display: flex;
    align-items: center;
    padding: 5px 14px;

    .title {
      flex: 1;
      text-align: left;
      color: #333;
      font-size: 16px;
    }

    .time {
      flex: 1;
      text-align: right;
      color: #999;
      font-size: 12px;
    }
  }

  .msg_icon_content {
    display: flex;
    height: 70px;

    .msg_icon {
      position: relative;
      display: flex;
      width: 90px;
      justify-content: center;
      align-items: center;

      i {
        position: absolute;
        right: 11px;
        top: -2px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ff4c56;
      }

      img {
        width: 60px;
        height: 70px;
      }
    }

    .msg_content {
      display: flex;
      height: 100%;
      justify-content: space-between;
      flex-direction: column;
      width: calc(100% - 90px);

      .content {}

      .order_no {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

</style>
<script>
import netAjax from '@/utils/ajax';
export default {
  data() {
    return {
      results: []
    };
  },
  mounted() {
    let url = '/api/message/getmessagelist';
    let cid = this.$route.query.cid || 3;
    netAjax.get(url, {
      params: {
        categoryId: cid,
        pageSize: 30
      }
    }).then((res) => {
      if (res.status === 200 && res.data && res.data.code === 0) {
        this.results = res.data.data;
      }
    });
  }
};

</script>

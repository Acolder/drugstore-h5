<template>
  <div class="page_contaier">
    <mt-header fixed title="处方单">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="list_wrapper">
      <div class="list_item" v-for="(r,index) in results" :key="index">
        <div class="avator">
          <img src="./imgs/icon_messagedoctor@2x.png" alt="">
         </div>
          <div class="pre_infos">
            <div class="name_time">
              <span class="name">{{r.doctorname}}</span>
              <span class="time">{{r.createdtime}}</span>
            </div>
            <div class="pre_content">
              <span class="description">
                {{r.content}}
         </span>
              <i @click.stop="goDetail(r.relationid)">查看详情</i>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
.page_contaier {
  height: 100%;
  width: 100%;
  background-color: #e8e8e8;
  padding-top: 44px;
}

.list_wrapper {
  width: 100%;

  .list_item {
    background-color: #fff;
    padding: 13px 0;
    margin-bottom: 10px;
    display: flex;

    .avator {
      flex: none;
      width: 70px;
      display: flex;
      justify-content: center;

      img {
        width: 42px;
        height: 42px;
      }
    }

    .pre_infos {
      width: calc(100% - 70px);
      text-align: left;

      .name_time {
        width: 100%;
        display: flex;

        .name {
          flex: 1;
        }

        .time {
          flex: 1;
          text-align: right;
          font-size: 12px;
          color: #999;
          padding-right: 1em;
        }
      }

      .pre_content {
        position: relative;
        width: calc(100% - 50px);
        background-color: #bdedee;
        border-radius: 7px;
        height: 50px;
        margin-top: 10px;
        background-image: url(./imgs/xh_icon_cf@2x.png);
        background-repeat: no-repeat;
        background-size: 35px 40px;
        background-position: 10px 6px;
        padding-left: 52px;

        .description {
          display: flex;
          align-items: center;
          height: 100%;
          font-size: 14px;
          color: #333;
          padding-right: 14px;
        }

        i {
          position: absolute;
          bottom: 0;
          right: 11px;
          color: #00c3c3;
          font-size: 12px;
          border: 5px solid transparent;
        }
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
  methods: {
    goDetail(id) {
      console.log(id);
      this.$router.push({
        path: './prescription/index',
        query: { order_id: id }
      });
    }
  },
  mounted() {
    let url = '/api/message/getmessagelist';
    let cid = this.$route.query.cid || 1;
    netAjax.get(url, {
      params: {
        categoryId: cid,
        pageSize: 30
      }
    }).then((res) => {
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.results = res.data.data;
      }
    });
  }
};

</script>

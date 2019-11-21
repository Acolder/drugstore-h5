<template>
  <div class="page_container">
    <mt-header fixed title="消息">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="list_item" v-for="c in categoryList" :key="c.id" @click.stop="goList(c.id)">
      <div class="left">
        <img :src="categoryIcons[c.id]" alt="">
        <i>{{c.unreadcount}}</i>
      </div>
      <div class="right">
        <div class="message_title">
          <span>{{c.categoryname}}</span>
          <span class="time">{{c.updatetime}}</span>
        </div>
        <div class="message_content">{{c.content}}</div>
      </div>
    </div>
    <div class="doctor_messages" v-show="doctorMsgList.length>0">
      <div class="list_item" v-for="(m,index) in doctorMsgList" :key="index">
        <div class="left">
          <img :src="m.doctoravatar" alt="">
          <i>{{m.unreadcount}}</i>
        </div>
        <div class="right">
          <div class="message_title">
            <span>{{m.doctorname}}</span>
            <span class="time">{{m.createdtime}}</span>
          </div>
          <div class="message_content">{{m.content}}</div>
        </div>
      </div>
    </div>
    <div class="doctor_messages empty" v-show="doctorMsgList.length==0">
      <img src="" alt="">
      <span>暂无聊天信息~</span>
    </div>
  </div>
</template>
<style scoped lang="less">
.list_item {
  width: 100%;
  height: 60px;
  background-color: #fff;
  margin-bottom: 1px;
  flex: none;

  .left {
    width: 70px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      width: 42px;
      height: 42px;
    }

    i {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #ff4c56;
      color: #fff;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
      transform: scale(0.55);
    }
  }

  .right {
    height: 100%;
    width: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    justify-content: center;

    .message_title {
      position: relative;

      span {
        font-size: 16px;
        color: #333;

        &.time {
          position: absolute;
          color: #999;
          font-size: 12px;
          right: 10px;
        }
      }
    }

    .message_content {
      font-size: 14px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }
  }
}

.doctor_messages {
  margin-top: 10px;

  &.empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    span {
      color: #999;
    }
  }
}

.page_container {
  padding-top: 44px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #e0e0e0;
}

</style>
<script>
import netAjax from '@/utils/ajax';
export default {
  data() {
    return {
      categoryList: [],
      doctorMsgList: [],
      categoryIcons: {
        '3': require('./imgs/xh_icon_xtxx@2x.png'),
        '1': require('./imgs/xh_icon_cfd@2x.png')
      }
    };
  },
  methods: {
    getCatetoryList() {
      let url = '/api/message/messagecategorylist';
      let req = { 'version': 'v2.0' };
      netAjax.get(url, { params: req }).then((res) => {
        if (res.status === 200 && res.data && res.data.code === 0) {
          this.categoryList = res.data.data;
        }
      });
    },
    getDoctorMsgList() {
      let url = '/api/message/messagecategorylist';
      let req = { 'version': 'v2.0' };
      netAjax.get(url, { params: req }).then((res) => {
        if (res.status === 200 && res.data && res.data.code === 0) {
          this.categoryList = res.data.data;
        }
      });
    },
    goList(cid) {
      if (String(cid) === '3') {
        this.$router.push({
          path: '/allNews/sysMsgList',
          query: { cid: cid }
        });
      } else if (String(cid) === '1') {
        this.$router.push({
          path: '/allNews/preList',
          query: { cid: cid }
        });
      }
    }
  },
  mounted() {
    this.getCatetoryList();
  }
};

</script>

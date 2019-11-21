<!--问医记录-->
<template>
  <div class="has-header ChineseMedicine-box page-navbar">
    <mt-header fixed title="问医记录">
      <router-link to="/myCenter/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-navbar class="ChineseMedicine-Record page-part" v-model="selected">
      <div>
        <mt-tab-item id="1" class="nowing" @click="showaction()">
          <span>进行中</span>
        </mt-tab-item>
      </div>
      <div class="shu"></div>
      <div>
        <mt-tab-item id="2" class="history" @click="showaction()">
          <span>历史记录</span>
        </mt-tab-item>
      </div>
    </mt-navbar>
    <!--继续咨询 进行中-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                             infinite-scroll-distance="30" :style="{height:getHeight(88)}">
        <mt-cell class="cellWrapper" v-for="(item, index) in this.consultingRecordsList" :key="index">
          <div class="recordWrap Consultation">
            <div class="Consultation-time">
              <span>{{item.entrytime}}</span>
            </div>
            <div class="Consultation-doctor">
              <span>咨询医生： {{item.doctorname}}</span>
              <i @click="onlineConsult(item.consulttype)">继续咨询</i>
            </div>
          </div>
        </mt-cell>
        <!--暂无记录-->
        <div class="noRecord" v-if="this.consultingRecordsList.length===0">
          <div class="bgpic"></div>
          <!-- <img class="img_norecord" src="./img/icon_record750.png" alt=""> -->
          <span>暂无记录~</span>
        </div>
      </mt-tab-container-item>
      <!--历史记录-->
      <mt-tab-container-item id="2" class="history-record" v-infinite-scroll="getUserConsultRecordsList"
                             infinite-scroll-disabled="recordedloading"
                             infinite-scroll-distance="10" :style="{height:getHeight(88)}">
        <mt-cell v-for="(item, index) in this.consultedRecordsList" :key="index">
          <div class="recordWrap Consultation">
            <div class="Consultation-time">
              <span>{{item.entrytime}}</span>
              <i class="finish">已完成</i>
            </div>
            <div class="Consultation-doctor">
              <span>咨询医生： {{item.doctorname}}</span>
            </div>
          </div>
        </mt-cell>
        <!--暂无记录-->
        <div class="noRecord" v-if="this.consultedRecordsList.length===0">
          <div class="bgpic"></div>
          <!-- <img class="img_norecord" src="./img/icon_record750.png" alt=""> -->
          <span>暂无记录~</span>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { Header, InfiniteScroll } from 'mint-ui';
import { intoInquiry } from '@/api/user';
import ajax from '@/utils/ajax';
export default {
  name: 'page-navbar',
  data() {
    return {
      selected: '1',
      cellNum: [],
      consultedRecordsList: [],
      consultingRecordsList: [],
      consultingPageIndex: 0,
      consultedPageIndex: 0,
    };
  },
  components: {
    'mt-header': Header,
    'InfiniteScroll': InfiniteScroll,
  },
  methods: {
    onlineConsult: function (consultType) {
      intoInquiry(consultType);
    },
    // 获取咨询-历史记录
    getUserConsultRecordsList: function () {
      let url = 'api/user/consultList';
      let params = {
        ConsultStatus: '2',
        PageIndex: this.consultedPageIndex,
        PageSize: '10'
      };
      ajax.post(url, params).then((res) => {
        if (res.status === 200 && res.statusText === 'OK') {
          let recordedsList = res.data.data;
          // 如果不为空,则添加到数组,页码++
          if (recordedsList.length !== 0) {
            this.consultedRecordsList = this.consultedRecordsList.concat(recordedsList);
            console.info('this.consultedRecordsList', this.consultedRecordsList);
            this.consultedPageIndex++;
          } else if (recordedsList.length === 0) {
            this.recordedloading = false;
            console.info('没有数据了');
          }
        }
      });
    },
    // 获取咨询-正在进行中.
    getUserConsultingRecordsList: function () {
      let url = 'api/user/consultList';
      let params = {
        ConsultStatus: '1',
        PageIndex: this.consultingPageIndex,
        PageSize: '10'
      };
      ajax.post(url, params).then((res) => {
        if (res.status === 200 && res.statusText === 'OK') {
          let consultingRecordsList = res.data.data;
          // 如果不为空,则添加到数组,页码++
          // append next page
          let list = this.consultingRecordsList;
          if (consultingRecordsList.length !== 0) {
            this.consultingRecordsList = list.concat(consultingRecordsList);
            console.info('this.consultingRecordsList:', this.consultingRecordsList);
            this.consultingPageIndex++;
          } else if (consultingRecordsList.length === 0) {
            this.loading = false;
            console.info('没有数据了');
          }
        }
      });
    },
    loadMore: function () {
      this.getUserConsultingRecordsList();
    },
    // adapt screen
    getHeight: function (height) {
      // 设置滚动窗高度。
      let pageHeight;
      pageHeight = document.body.clientHeight - height;
      return pageHeight + 'px';
    }
  },
  mounted: function () {
    // this.getUserConsultRecordsList();
    // this.getUserConsultingRecordsList();
  }
};
</script>
<style lang="less" scoped>
  @import "../../styles/mixin.less";
  .ChineseMedicine-box {
    background: #EEEEF3;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    z-index: 9;
  }
  .mint-navbar {
    .mint-tab-item {
      text-align: center;
      width: 60%;
      margin-left: 20%;
      height: 44px;
      padding: 15px 0;
    }
    .mint-tab-item.is-selected {
      border-bottom: 2px solid @green-color;
      margin-bottom: -2px;
      box-sizing: border-box;
    }
  }
  .mint-tab-item-label {
    font-size: 14px;
  }
  .mint-cell {
    margin-bottom: 10px;
    border-bottom: 1px solid #E0E0E0;
  }
  .ChineseMedicine-Record {
    width: 100%;
    height: 45px;
    background-color: #FFF;
    display: flex;
    border-bottom: 1px solid #E5E5E5;
    div {
      width: 50%;
      height: 100%;
    }
    .nowing {
      span {
        font-size: 15px;
      }
    }
    .shu {
      width: 1px;
      height: 31px;
      background-color: #E5E5E5;
      margin-top: 8px;
    }
    .history {
      span {
        font-size: 15px;
      }
    }
  }
  .Consultation {
    width: 100%;
    height: 79px;
    background-color: #FFF;
    padding: 0 8px 0 10px;
    .Consultation-time {
      height: 34px;
      padding-left: 1px;
      border-bottom: 1px solid #E5E5E5;
      position: relative;
      span {
        font-size: 15px;
        color: #333;
        height: 34px;
        line-height: 34px;
        margin-right: 13px;
      }
      i {
        position: absolute;
        top: 9px;
        right: 4px;
        color: #333;
      }
    }
    .Consultation-doctor {
      padding-left: 2px;
      height: 45px;
      position: relative;
      span {
        font-size: 15px;
        color: #333;
        height: 45px;
        line-height: 45px;
      }
      i {
        width: 79px;
        height: 30px;
        line-height: 29px;
        border-radius: 3px;
        border: solid 1px #999;
        text-align: center;
        color: #333;
        font-size: 15px;
        position: absolute;
        top: 7px;
        right: 0px;
      }
    }
  }
  .mint-tab-container-item {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    overflow: scroll;
    width: 100%;
  }
  .mint-tab-container-wrap {
    display: flex;
    overflow: scroll;
  }
  // 暂无记录
  .noRecord {
    width: 100%;
    height: 100%;
    position: absolute;
    text-align: center;
    font-size: 16px;
    color: #666;
    bottom: 0;
    top: 0;
    background-color: #FFF;
    .bgpic{
      width: 100%;
      height: 205px;
      background: url(./img/icon_record750.png) no-repeat ;
      background-size: 100%;
      margin-top: 100px;
    }
  }
</style>


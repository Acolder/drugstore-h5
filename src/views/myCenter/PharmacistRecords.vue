<template>
  <div class="PharmacistWrapper">
    <mt-header fixed title="药师记录">
      <router-link to="/myCenter/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div id="page">
      <div class="PharmacistHistoryWrap" v-for="(item, index) in this.recordsList" :key="index">
        <div class="PharmacistHistory">
          <div class="Consultation-time">
            {{item.time}}
          </div>
          <div class="Consultation-doctor">
          <span>咨询医生： {{item.doctorname}}
             <i @click="continueConsult(item.targetid,item.doctorname)">继续咨询</i>
          </span>
          </div>
        </div>
      </div>
      <!--暂无记录-->
      <div class="noRecord" v-if="this.recordsList.length===0">
        <div class="bgpic"></div>
        <span>暂无记录~</span>
      </div>
    </div>
    </div>
</template>
<style lang="less" scoped>
  .PharmacistWrapper {
    background: #EEEEF3;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    z-index: 9;
  }
  .PharmacistHistory {
    width: 100%;
    height: 79px;
    background-color: #FFF;
    padding: 0 8px 0 10px;
    border-bottom: 1px solid #E5E5E5;
    margin-bottom: 20px;
    .Consultation-time {
      height: 34px;
      padding-left: 1px;
      border-bottom: 1px solid #E5E5E5;
      span {
        font-size: 15px;
        color: #333;
        height: 34px;
        line-height: 34px;
        margin-right: 13px;
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
  }
  // 暂无记录
  .noRecord {
    position: absolute;
    text-align: center;
    font-size: 16px;
    color: #666;
    background-color: #fff;
    bottom: 0;
    width: 100%;
    top: 0;
    .bgpic{
      width: 100%;
      height: 210px;
      background: url(./img/icon_record750.png) no-repeat ;
      background-size: 100%;
      margin-top: 110px;
    }
  }
</style>
<script>
import { Header }  from 'mint-ui';
import RECORD from '@/api/pharmacistRecords';
export default {
  data() {
    return {
      recordsList: []
    };
  },
  components: {
    'mt-header': Header
  },
  methods: {
    // 获取药师历史记录
    getPharmacistRecords: function () {
      this.recordsList = RECORD.getList();
      console.info(RECORD.getList());
    },
    setRecord: function () {
    },
    initPage: function () {
    },
    continueConsult: function (targetid, doctorName) {
      window.location.href = '/inquiry/consultPharmacist?targetId=' + targetid + '&doctorName=' + doctorName;
    }
  },
  created: function() {
    if (this.recordsList.length === 0) {
      this.hidden = true;
    }
  },
  mounted: function () {
    this.setRecord();
    this.getPharmacistRecords();
  }
};
</script>


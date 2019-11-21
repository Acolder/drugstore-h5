<template>
  <div class="equipmentLogistics">
    <div>
      <mt-header fixed title="物流详情">
        <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
      </mt-header>
      <div class="logisticsCompany" v-if="this.logisticsInfoData">
        <div>
          <span>物流公司：</span>
          <!-- <span>{{logisticsInfoData.shippercode}}</span> -->
          <span>{{logisticsInfo.logisticsType}}</span>
        </div>
        <div>
          <span>运单号：</span>
          <!-- <span>{{logisticsInfoData.logisticcode}}</span> -->
          <span>{{logisticsInfo.logisticsNumber}}</span>
        </div>
      </div>
      <div class="logisticsInformation">
        <ul class="logistics-wrapper" v-if="this.logisticsInfoData.traces&&this.logisticsInfoData.traces.length>0">
          <li class="logistics-item" v-for="item in logisticsInfoData.traces" :key="item.index">
            <div class="item-left">
              <i class="logistics-signal"></i>
              <div class="ftime">{{item.accepttime}}</div>
            </div>
            <div class="item-right">
              {{item.acceptstation}}
            </div>
          </li>
        </ul>
        <div v-else class="no-logistics">
          暂无物流信息，请耐心等待~
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax';
// import javaAjax from '@/utils/javaApiRequest';
export default {
  data() {
    return {
      // logisticsInfo: {
      //   logisticsType: this.$route.query.logisticsType ? this.$route.query.logisticsType : '',
      //   logisticsNumber: this.$route.query.logisticsNumber ? this.$route.query.logisticsNumber : '',
      // },
      logisticsInfo: {
        logisticsType: '韵达速递',
        logisticsNumber: '3102021804731',
      },
      logisticsInfoData: {
        shippercode: '',
        logisticcode: '',
        data: []
      }
    };
  },
  created() {
    console.log(this.logisticsInfo);
    ajax.post('/api/system/getLogisticInfo', this.logisticsInfo).then((res) => {
      console.log(res);
      if (res.status === 200 && res.data.code === 0) {
        this.logisticsInfoData = res.data.data;
      }
    });
  }
};
</script>


<style scoped lang="less">
@white:#fff;
.equipmentLogistics{
  padding-top: 44px;
  height: 100%;
  background-color:#f5f5f5;
}
.logisticsCompany{
  top: 44px;
  height: 68px;
  padding:16px 0 16px 10px;
  background: @white;
  margin-bottom: 10px;
}
.logisticsInformation{
  padding: 15px 10px;
  background: @white;
  .no-logistics{
    font-size: 16px;
  }
  .logistics-wrapper{
    .logistics-item{
      font-size: 12px;
      line-height: 12px;
      color: #666666;
      display: flex;
      .item-left{
        width: 84px;
        height: 62px;
        border-right: 1px solid #e0e0e0;
        position: relative;
        padding-right: 12px;
        text-align:right;
        line-height: 14px;
        .logistics-signal{
          position: absolute;
          width: 6px;
          height: 6px;
          right: -3px;
          background: url(./imgs/icon-wla@2x.png);
          background-size: 100% 100%;
        }
      }
      .item-right{
        width: 270px;
        padding-left: 12px;
        line-height: 16px;
      }
    }
    >li:first-child{
      color: #f75858;
      .item-left{
        height: 67px;
        .logistics-signal{
          width: 9px;
          height: 9px;
          right: -4.5px;
          background: url(./imgs/icon-wlb@2x.png);
          background-size: 100% 100%;
        }
      }
    }
    >li:nth-child(3){
      .day{
        float: right;
      }
    }
    >li:last-child{
      .item-left{
        border: none;
        height: 26px;
        .logistics-signal{
          background: url(./imgs/icon-wlc@2x.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>

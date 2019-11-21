<template>
  <div class="orders">
    <div>
      <mt-header fixed title="物流详情">
        <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
      </mt-header>
      <div class="logisticsCompany" v-if="logisticsInfoData.com && logisticsInfoData.nu ">
        <div>
          <span>物流公司：</span>
          <span>{{logisticsInfoData.com}}</span>
        </div>
        <div>
          <span>运单号：</span>
          <span>{{logisticsInfoData.nu}}</span>
        </div>
      </div>
      <div class="logisticsInformation">
        <ul class="logistics-wrapper" v-if="this.logisticsInfoData.data&&this.logisticsInfoData.data.length>0">
          <li class="logistics-item" v-for="item in logisticsInfoData.data" :key="item.index">
            <div class="item-left">
              <i class="logistics-signal"></i>
              <div class="ftime">{{item.ftime || item.AcceptTime}}</div>
            </div>
            <div class="item-right">
              {{item.context || item.AcceptStation}}
            </div>
          </li>
        </ul>
        <div style="textAlign: center" v-else>
          暂无物流信息，请耐心等待~
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import javaAjax from '@/utils/javaApiRequest';
import medicineRequest from '@/utils/WmedicineRequest.js';
export default {
  data() {
    return {
      // logisticsInfo: {
      //   logisticsNumber: '3101753933856',
      //   logisticsType: 'yunda'
      // },
      logisticsInfo: {
        logisticsNumber: this.$route.query.logisticsNumber || '',
        logisticsType: this.$route.query.logisticsType || '',
        orderId: this.$route.query.logisticsType || ''
      },
      logisticsInfoData: {
        com: '',
        nu: '',
        data: []
      }
    };
  },
  methods: {
    // 转换物流类型，兼容旧接口
    queryKdnName(type) {
      let url = '/mall_suport/back/order/queryKdnName';
      let param = {
        type: type
      };
      medicineRequest.post(url, param).then(res => {
        if (res.status === 200 && res.data.resultCode === '0' && res.data.resultData) {
          this.logisticsInfo.logisticsType = res.data.resultData.kdnName;
          console.log('2.物流类型转换成功，开始获取西药物流信息', this.logisticsInfo);
          this.getLogis2();
        }
      });
    },
    // 获取西药物流信息
    getLogis2() {
      // 西药接口
      let url = '/mall_suport/back/order/logisticsInfo';
      let param = this.logisticsInfo;
      medicineRequest.post(url, param).then((res) => {
        if (res) {
          let response = res.data;
          if (res.status === 200 && response && response.resultCode === '0' && response.resultData) {
            // this.logisticsInfo = response.resultData;
            this.logisticsInfoData.com = response.resultData.ShipperCode || ''; // 快递公司
            this.logisticsInfoData.nu = response.resultData.LogisticCode || ''; // 物流单号
            this.logisticsInfoData.data = response.resultData.Traces; // 时间与描述
            console.log('3.西药物流信息获取成功', this.logisticsInfoData);
          }
        }
      });
    },
  },
  mounted() {
    this.queryKdnName(this.logisticsInfo.logisticsType);
  },
  // created() {
  //   // javaAjax.post('/mall/back/order/logisticsInfo', this.logisticsInfo).then(data => {
  //   //   if (data.status === 200 && data.data.resultCode === '0') {
  //   //     this.logisticsInfoData = data.data.resultData;
  //   //   }
  //   // });
  // }
};
</script>


<style scoped lang="less">
@white:#fff;
.orders{
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
  .logistics-wrapper{
    .logistics-item{
      font-size: 12px;
      line-height: 12px;
      color: #666666;
      display: flex;
      .item-left{
        width: 84px;
        height: 62px;
        // border-right: 1px solid #e0e0e0;
        position: relative;
        padding-right: 12px;
        text-align:right;
        line-height: 14px;
        .logistics-signal{
          position: absolute;
          width: 6px;
          height: 6px;
          right: -3px;
          background: url(./img/icon-wla@2x.png);
          background-size: 100% 100%;
        }
      }
      .item-right{
        width: 270px;
        padding-left: 12px;
        line-height: 16px;
        padding-bottom: 10px;
        border-left: 1px solid #e0e0e0;
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
          background: url(./img/icon-wlb@2x.png);
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
          background: url(./img/icon-wlc@2x.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>

<template>
  <div class="presc-index">
    <mt-header fixed title="处方详情">
      <a href="javascript:;" slot="left" @click="$router.go(-1);">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <!-- 状态图标 -->
    <div class="presc_status_bar">
      <div class="status_item">
        <img :src="img0.src" alt="">
        <span :class="{active: img0.active}">拍方</span>
      </div>
      <div class="status_item">
        <img :src="img1.src" alt="">
        <span :class="{active: img1.active}">医生确认</span>
      </div>
      <div class="status_item">
        <img :src="img2.src" alt="">
        <span :class="{active: img2.active}">用户确认</span>
      </div>
      <div class="status_item">
        <img :src="img3.src" alt="">
        <span :class="{active: img3.active}">付款</span>
      </div>
      <div class="status_item">
        <img :src="img4.src" alt="">
        <span :class="{active: img4.active}">完成</span>
      </div>
    </div>
    <!-- 收货人物流 -->
    <div class="logis_info_bar presc_module">
      <div class="logis_info" @click.stop="goDetail()">
        <div class="logis_desc">
          <span>{{lastLogis['addr_info']}}</span>
        </div>
        <div class="logis_time">{{lastLogis['current_lo_time']||'2018-05-12'}}</div>
      </div>
      <div class="consignee_info">
        <div class="name_phone">
          <span class="name">收货人：{{orderDetails.docprescriptions[0].username}}</span>
          <span class="phone">{{orderDetails.con_tel}}</span>
        </div>
        <p class="address">
          地址：{{orderDetails.detail_address}}
        </p>
      </div>
    </div>
    <!-- 患者信息&主诉及辩证 -->
    <div class="presc_module">
      <div class="presc_row">
        <p class="left">患者信息</p>
        <p class="right">{{orderDetails.docprescriptions[0].username}}/{{orderDetails.docprescriptions[0].gender?'男':'女'}}/{{orderDetails.docprescriptions[0].age}}岁</p>
      </div>
      <div class="presc_row">
        <p class="left">主诉及辩证</p>
        <p class="right">{{orderDetails.docprescriptions[0].diagnosis}}</p>
      </div>
    </div>
    <!-- 处方/西药清单 -->
    <div class="drug_list_wrapper presc_module">
      <p class="drug_list_title">处方清单</p>
      <div class="presc_row noborder">
        <p class="left">浓缩丸</p>
        <p class="right">X1剂</p>
      </div>
      <p class="drug_list_title drugs">当归、红花、花甲</p>
    </div>
  </div>
</template>
<script>
import { MessageBox, Indicator, Button } from 'mint-ui';
import yilin from '@/utils/yilinApiRequest.js';
import doctorAjax from '@/utils/doctorAjax.js';
export default {
  data() {
    return {
      isShow: false,
      audit: true,
      showLogistics: false,
      showButtons: false,
      orderDetails: { status: '0', docprescriptions: [{ username: '', genter: 0, age: 20, suffering_type: 0, diagnosis: '' }] },
      orderStatus: {
        '0': { 'statusText': '待审核', 'icon': require('@/views/prescription/img/icon-dsh@2x.png'), 'logisticsText': '' },
        '5': { 'statusText': '确认中', 'icon': require('@/views/prescription/img/icon-yqx@2x.png'), 'logisticsText': '派送中' },
        '10': { 'statusText': '配送中', 'icon': require('@/views/prescription/img/icon-dsh@2x.png'), 'logisticsText': '派送中' },
        '15': { 'statusText': '配送中', 'icon': require('@/views/prescription/img/icon-dsh@2x.png'), 'logisticsText': '已送达' },
        '20': { 'statusText': '已完成', 'icon': require('@/views/prescription/img/icon-ywc@2x.png'), 'logisticsText': '' },
        '98': { 'statusText': '审核失败', 'icon': require('@/views/prescription/img/icon-yqx@2x.png'), 'logisticsText': '' },
        '1': { 'statusText': '审核失败', 'icon': require('@/views/prescription/img/icon-yqx@2x.png'), 'logisticsText': '' },
        '97': { 'statusText': '已取消', 'icon': require('@/views/prescription/img/icon-yqx@2x.png'), 'logisticsText': '' },
        '99': { 'statusText': '已取消', 'icon': require('@/views/prescription/img/icon-yqx@2x.png'), 'logisticsText': '' },
        '100': { 'statusText': '审核失败', 'icon': require('@/views/prescription/img/icon-yqx@2x.png'), 'logisticsText': '' },
        '101': { 'statusText': '已放弃', 'icon': require('@/views/prescription/img/icon-yqx@2x.png'), 'logisticsText': '' },
        '1000': { 'statusText': '已删除', 'icon': require('@/views/prescription/img/icon-yqx@2x.png'), 'logisticsText': '' },
        '102': { 'statusText': '已取消', 'icon': require('@/views/prescription/img/icon-yqx@2x.png'), 'logisticsText': '' },
        '104': { 'statusText': '已失效', 'icon': require('@/views/prescription/img/icon-yqx@2x.png'), 'logisticsText': '' }
      },
      prescrTypes: {
        '0': '中药',
        '1': '西药',
        '2': '膏方',
        '3': '丸剂',
        '4': '类型异常',
        '5': '固定膏方'
      },
      wjTypes: {
        '0': '丸剂',
        '1': '浓缩丸',
        '2': '水丸(包衣)',
        '3': '水蜜丸',
        '4': '(水丸)素丸'
      },
      lastLogis: {
        'current_lo_time': '',
        'addr_info': '暂无物流信息'
      },
      logisticsInfo: {}
    };
  },
  components: {
    Button
  },
  computed: {
    // 订单状态（0:待审核,5 :待确认, 6:待医网签,7:待发货,10,15:待收货,20:已收货,97,102:已取消(用户患者),99:医生取消,101:平台取消98,100:审核失败,103:商家取消订单,104:订单过期,1000医生APP端删除）
    showPatientInfo() {
      let status = String(this.orderDetails.status);
      console.log(status);
      return status === '5' || status === '10' || status === '15' || status === '20' || status === '97' || status === '98' || status === '99' || status === '100' || status === '101' || status === '102' || status === '103';
    },
    img0() {
      let status = String(this.orderDetails.status);
      let contains = ['0', '1', '5', '6', '7', '10', '15', '20', '97', '102', '99', '101', '100', '103', '104', '1000'];
      let flag = contains.indexOf(status) > -1;
      return { src: flag ? require('./img/icon_pfl@2x.png') : require('./img/icon_pf@2x.png'), active: flag };
    },
    img1() {
      let status = String(this.orderDetails.status);
      let contains = ['1', '5', '7', '10', '15', '20'];
      let flag = contains.indexOf(status) > -1;
      return { src: flag ? require('./img/icon_ysqrl@2x.png') : require('./img/icon_ysqr@2x.png'), active: flag };
    },
    img2() {
      let status = String(this.orderDetails.status);
      let contains = ['1', '10', '15', '20'];
      let flag = contains.indexOf(status) > -1;
      return { src: flag ? require('./img/icon_yhqrl@2x.png') : require('./img/icon_yhqr@2x.png'), active: flag };
    },
    img3() {
      let status = String(this.orderDetails.status);
      let contains = ['1', '20'];
      let flag = contains.indexOf(status) > -1;
      return { src: flag ? require('./img/icon_fkl@2x.png') : require('./img/icon_fk@2x.png'), active: flag };
    },
    img4() {
      let status = String(this.orderDetails.status);
      let contains = ['20'];
      let flag = contains.indexOf(status) > -1;
      return { src: flag ? require('./img/icon_wcl@2x.png') : require('./img/icon_wc@2x.png'), active: flag };
    }
  },
  methods: {
    // 处方查看更多
    showpresc() {
      this.isShow = !this.isShow;
    },
    getPreName(pre) {
      let t = String(pre.prescr_type);
      if (t === '3') {
        return this.wjTypes[pre.wj_type];
      }
      if (t === '5') {
        return this.prescrTypes[t] + '-' + this.orderDetails.pasteFixedName;
      }
      return this.prescrTypes[t];
    },
    refreshUI(status) {
      switch (status) {
        case '0':
          break;
        case '5':
          this.showButtons = true;
          break;
        case '10':
          this.showLogistics = true;
          break;
        case '15':
          this.showLogistics = true;
          break;
        case '20':
          this.showLogistics = true;
          break;
      }
    },
    confirmOrder() {
      this.$router.push({
        path: '/prescription/buy',
        query: {
          order_id: this.$route.query.order_id
        }
      });
    },
    cancelOrder() {
      MessageBox.prompt('确定要取消吗？如果是请输入取消理由', '取消处方').then(({ value, action }) => {
        Indicator.open();
        let url = '/api/order/cancleOrder';
        let params = {
          orderId: this.orderDetails.order_id,
          cancleRemark: value || ''
        };
        doctorAjax.post(url, params).then((res) => {
          Indicator.close();
          this.$router.go(-1);
        });
      }, () => {});
    },
    getLogis() {
      let order_id = this.orderDetails.km_order_id;
      if (!order_id) {
        return;
      }
      let url = 'http://www.kmzhyf.cn:8182/zyf/web';
      let params = {
        'order_id': order_id,
        'methodName': 'getWLInfoNoValicode'
      };
      yilin.get(url, {
        params: params
      }).then((res) => {
        if (res) {
          let response = res.data;
          if (res.status === 200 && response && response.head && response.head.code === '0' && response.data) {
            this.logisticsInfo = response.data;
            if (response.data.list.length > 0) {
              this.lastLogis = response.data.list.pop();
            }
          }
        }
      });
    },
    goDetail() {
      if (this.lastLogis['addr_info'] !== '暂无物流信息') {
        this.$router.push({
          name: 'presc_logistics_detail',
          params: { logisticsInfo: this.logisticsInfo }
        });
      }
    }
  },
  mounted() {
    let order_id = this.$route.query.order_id;
    let url = '/api/order/getPatientOrderDetail/' + order_id;
    doctorAjax.get(url).then((res) => {
      if (res && res.status === 200 && res.data && String(res.data.code) === '0' && res.data.data) {
        this.orderDetails = res.data.data;
        this.refreshUI(String(this.orderDetails.status));
        this.getLogis();
      }
    });
  },
  destroyed() {
    MessageBox.close();
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';

.presc-index {
  padding-top: 44px;
  height: 100%;
  background-color: #eeeef3;
  color: #333;
  font-size: 14px;
}

.presc_status_bar {
  background-color: #fff;
  display: flex;
  padding: 0 20px;
  height: 85px;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 10px;

  &:after {
    content: ' ';
    position: absolute;
    width: calc(100% - 80px);
    height: 2px;
    background-color: #c1c1c1;
    top: 34px;
    left: 40px;
    z-index: 0;
  }

  .status_item {
    z-index: 1;
    height: 45px;
    font-size: 14px;
    color: #999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: calc(25% - 10px);
    flex: none;

    img {
      width: 29px;
      height: 29px;
      border-radius: 50%;
    }

    span {
      &.active {
        color: #00b0b9;
      }
    }
  }
}

.logis_info_bar {
  width: 100%;
  background-color: #fff;

  .logis_info {
    width: 100%;
    height: 70px;
    padding: 16px 10px 16px 31px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    position: relative;

    &:after {
      content: " ";
      border: 1px solid;
      width: 8px;
      height: 8px;
      border-color: #666 #666 transparent transparent;
      position: absolute;
      top: 30px;
      right: 16px;
      transform: rotate(45deg);
    }

    .logis_desc {
      position: relative;
      width: calc(100% - 20px);

      span {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        color: #333;
      }

      &:before {
        content: " ";
        position: absolute;
        left: -20px;
        top: 4px;
        width: 15px;
        height: 11px;
        background-image: url(./img/icon_ck@2x.png);
        background-repeat: no-repeat;
        background-size: cover;
      }
    }

    .logis_time {}
  }

  .consignee_info {
    width: 100%;
    max-height: 90px;
    min-height: 70px;
    padding: 16px 10px 16px 31px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid #eee;

    .name_phone {
      position: relative;
      display: flex;

      &:before {
        content: " ";
        position: absolute;
        left: -20px;
        top: 3px;
        width: 12.5px;
        height: 16.5px;
        background-image: url(./img/icon_bx@2x.png);
        background-repeat: no-repeat;
        background-size: cover;
      }

      .name {
        flex: 1;
      }

      .phone {
        flex: 1;
        text-align: right;
      }
    }
  }
}

.presc_module {
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
}


@titlewidth: 120px;

.presc_row {
  background-color: #fff;
  display: flex;
  padding: 15px 10px;
  border-bottom: 1px solid #eee;

  &.noborder {
    border: none;
  }

  .left {
    font-size: 15px;
    color: #333;
    width: @titlewidth;
  }

  .right {
    width: calc(100% - @titlewidth);
    font-size: 15px;
    color: #666;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

/*处方清单*/
.drug_list_wrapper {
  .drug_list_title {
    font-size: 15px;
    color: #333;
    padding: 15px 10px;
    border: 1px solid #eee;

    &.drugs {
      border: none;
    }
  }
}

</style>

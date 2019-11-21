<template>
  <div class="has-header buy-presc">
    <mt-header fixed title="处方购买">
      <!-- <a href="javascript:;" slot="left" @click="goback"> -->
      <a href="javascript:history.go(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="presc-buyLogistics" @click.stop="selectAddress">
      <div>
        <span>收货人：{{orderDetails.consignee}}</span>
        <span style="margin-right: 50px;">{{orderDetails.con_tel}}</span>
      </div>
      <div class="display-box">
        <p class="box-flex">
          地址：{{orderDetails.detail_address}}
        </p>
        <i></i>
      </div>
    </div>
    <div class="goods-row"></div>
    <div class="presc-presc">
      <h5>处方</h5>
      <dl v-for="(pre,preIndex) in orderDetails.docprescriptions" :key="preIndex" v-if="pre">
        <dt>
          <span>
            <label>{{getPreName(pre)}}</label>
            <label v-if="pre.prescr_type !== 1">* {{pre.amount}}剂</label>
          </span>
          <i @click="showpresc()" :class="{ 'iconchange': isShow== false }">
          </i>
        </dt>
        <dd v-show="isShow" v-for="(pred,predIndex) in pre.docprescriptiondetails" :key="predIndex">
          <b>{{pred.medicines}}</b>
        </dd>
      </dl>
    </div>
    <div class="goods-row"></div>
    <ul class="presc-buymoney">
      <li>
        <span>诊金</span>
        <em>¥{{Number(orderDetails.treat_fee).toFixed(2)}}</em>
      </li>
      <li>
        <span>处方金额</span>
        <em>¥{{Number(orderDetails.docprescriptions[0].money).toFixed(2)}}</em>
      </li>
      <li>
        <span>运费</span>
        <em>¥{{orderDetails.logistics_fee ? Number(orderDetails.logistics_fee).toFixed(2) : '0.00'}}</em>
      </li>
      <li>
        <span>首单优惠</span>
        <em>{{(orderDetails.discount_price>0?'-¥':'¥') + Number(orderDetails.discount_price).toFixed(2)}}</em>
      </li>
      <li>
        <h4>总计</h4>
        <b>¥{{orderDetails.order_price}}</b>
      </li>
    </ul>
    <div class="goods-row"></div>
    <div class="presc-buymess">
      <p>订单编号：{{orderDetails.order_id}}</p>
      <p>下单时间：{{orderDetails.create_time}}</p>
    </div>
    <div class="goods-row" style="height: 60px;"></div>
    <footer>
      <span>合计：
        <i>¥{{orderDetails.order_price}}</i>
      </span>
      <em @click.stop="submit()">提交订单</em>
    </footer>
  </div>
</template>
<script>
import { goPay } from '@/api/goPay';
import { Toast } from 'mint-ui';
import doctorAjax from '@/utils/doctorAjax.js';
import java from '@/utils/javaApiRequest';
import { getToken } from '@/utils/auth';
export default {
  data() {
    return {
      isShow: false,
      orderDetails: { docprescriptions: [{ username: '', genter: 0, age: 20, suffering_type: 0, diagnosis: '' }] },
      defaultAddress: {},
      address: {},
      orderStatus: {
        '0': '录入中',
        '5': '确认中',
        '10': '已确认',
        '15': '已确认',
        '20': '派送完成',
        '98': '已取消',
        '97': '已取消',
        '99': '已取消',
        '100': '已取消',
        '101': '已取消',
        '1000': '已删除',
        '102': '已取消'
      },
      prescrTypes: {
        '0': '中药',
        '1': '西药',
        '2': '膏方',
        '3': '丸剂',
        '4': '类型异常',
        '5': '固定膏方',
        '6': '中成药',
        '7': '药柜'
      },
      wjTypes: {
        '0': '丸剂',
        '1': '浓缩丸',
        '2': '水丸(包衣)',
        '3': '水蜜丸',
        '4': '(水丸)素丸'
      }
    };
  },
  mounted() {
    let address = JSON.parse(sessionStorage.getItem('selectedAddress'));
    console.log(address);
    this.getOrderDetail().then((res) => {
      let response = res.data;
      if (res.status === 200 && String(response.code) === '0' && response.data) {
        console.log('response.data', response.data);
        this.orderDetails = response.data;
        if ((this.orderDetails.status === 0 || this.orderDetails.status === 5) && !this.orderDetails.addr_str) {
          this.getDefaultAddress().then((a) => {
            console.log('默认地址', a);
            if (a && this.$route.query.from !== 'addressSelect') {
              this.orderDetails.consignee = a.addressName;
              this.orderDetails.con_tel = a.addressPhone;
              this.orderDetails.provinces = a.addressProvince;
              this.orderDetails.city = a.addressCity;
              this.orderDetails.zone = a.addressDistrict;
              this.orderDetails.addr_str = a.addressDetail + a.addressNum;
              this.orderDetails.detail_address = a.addressProvince + a.addressCity + a.addressDistrict + a.addressDetail + a.addressNum;
              // this.orderDetails.detail_address = a.addressDW;
              // this.orderDetails.addr_str = a.addressProvince + a.addressCity + a.addressDistrict + a.addressDetail + a.addressNum;
            }
          });
        }
      }
      if (address !== null && this.$route.query.from === 'addressSelect') {
        this.orderDetails.consignee = address.addressName;
        this.orderDetails.con_tel = address.addressPhone;
        this.orderDetails.provinces = address.addressProvince;
        this.orderDetails.city = address.addressCity;
        this.orderDetails.zone = address.addressDistrict;
        this.orderDetails.addr_str = address.addressDetail + address.addressNum;
        this.orderDetails.detail_address = address.addressProvince + address.addressCity + address.addressDistrict + address.addressDetail + address.addressNum;
      }
    });
  },
  methods: {
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
    selectAddress() {
      this.$router.push({
        path: '/addressMgr/select',
        query: { from: 'prescriptionBuy', order_id: this.orderDetails.order_id }
      });
    },
    submit() {
      if (!this.orderDetails.consignee) {
        Toast({
          message: '请选择收货地址',
          position: 'middle',
          duration: 1500
        });
        return;
      }
      let id = this.orderDetails.order_id;
      if (id) {
        let payMsg = { orderList: id, orderAmount: this.orderDetails.order_price, payType: 'prescription', sellerName: '' };
        this.changeAddress().then(() => {
          sessionStorage.setItem('pre_orderid', id);
          goPay(payMsg);
        });
      }
    },
    changeAddress() {
      let url = '/api/order/changeOrderAddress';
      let params = {
        'orderId': this.orderDetails.order_id,
        'consignee': this.orderDetails.consignee,
        'conTel': this.orderDetails.con_tel,
        'province': this.orderDetails.provinces,
        'city': this.orderDetails.city,
        'zone': this.orderDetails.zone,
        'addrStr': this.orderDetails.addr_str,
        'detailAddress': this.orderDetails.detail_address
      };
      return doctorAjax.post(url, params);
    },
    getOrderDetail() {
      let order_id = this.$route.query.order_id || sessionStorage.getItem('pre_orderid');
      sessionStorage.removeItem('pre_orderid');
      if (!order_id) {
        return;
      }
      let url = '/api/order/getPatientOrderDetail/' + order_id;
      return doctorAjax.get(url);
    },
    getDefaultAddress() {
      return new Promise((resolve, reject) => {
        java.post('/mall/address/queryAddress', { userToken: getToken() }).then((res) => {
          console.log(res);
          if (res.data && String(res.data.resultCode) === '0' && res.data.resultData) {
            let result = res.data.resultData;
            let flag = false;
            for (let i = 0; i < result.length; i++) {
              if (String(result[i].addressChecked) === '1') {
                resolve(result[i]);
                flag = true;
                break;
              }
            }
            if (!flag) {
              resolve(result[0]);
            }
          } else {
            resolve(null);
          }
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';

.line-color {
  border-bottom: 1px solid #dfdfdf;
}

.has-header.buy-presc {
  color: #333333;
  background-color: #f5f5f5;
  height: 100%;

  .presc-presc {
    background-color: #fff;

    h5 {
      font-size: 16px;
      color: #333333;
      padding: 15px 15px;
      .line-color;
    }

    dl {
      margin-left: 15px;

      dt,
      dd {
        background-color: #fff;
        padding: 15px 15px 0 0;
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #333333;
      }

      dt {
        padding: 15px 15px 15px 0;
        font-size: 15px;

        i {
          margin-right: 10px;
          .turn-icon(#333, 8px, 135deg);
        }

        .iconchange {
          .turn-icon(#333, 8px, -45deg);
        }
      }

      dd:nth-child(2) {
        border-top: 1px solid #dfdfdf;
      }

      dd:last-child {
        padding-bottom: 15px;
      }
    }
  }
}

.background-white {
  background-color: #ffffff;
}

.presc-buyLogistics {
  .background-white;
  padding: 15px;
  color: #333333;
  line-height: 23px;
  font-size: 14px;

  .presc-default {
    font-size: 15px;
    color: @green-color;
  }

  div {
    display: flex;
    justify-content: space-between;

    i {
      margin-top: 8px;
      margin-left: 3px;
      .turn-icon(#666666, 8px, 225deg);
    }
  }
}

.goods-row {
  width: 100%;
  height: 10px;
  background-color: #f5f5f5;
}

ul.presc-buymoney {
  padding: 13px 15px;
  font-size: 13px;
  .background-white;

  li {
    display: flex;
    justify-content: space-between;
    padding: 0 0 5px;
  }

  li:last-child {
    border-top: 1px solid #dfdfdf;
  }

  span {
    color: #595757;
  }

  em {
    color: #898989;
  }

  h4 {
    margin-top: 8px;
    font-size: 15px;
    color: #333333;
  }

  b {
    margin-top: 8px;
    font-size: 15px;
    color: #f94f4f;
  }
}

.presc-buymess {
  .background-white;
  padding: 15px;
  font-size: 12px;
  line-height: 22px;
  color: #666666;
}

footer {
  width: 100%;
  height: 40px;
  background: #ffffff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  line-height: 40px;

  em {
    width: 33%;
    background-color: @green-color;
    height: 100%;
    font-size: 18px;
    color: #ffffff;
    text-align: center;
  }

  span {
    width: 67%;
    text-align: right;
    padding-right: 15px;
    font-size: 16px;
  }
}

</style>

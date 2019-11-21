<template>
<div class="equipmentReturnDetails">
  <mt-header title="归还脉诊仪">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="equipmentReturnDetailsMain">
    <div class="orderAddress">
      <img src="./imgs/icon_bx.png">
      <div class="orderAddress-txt">
        <div class="orderAddress-top">
          <!-- 该收获人为 需要寄过去的位置（康美公司） -->
          <p class="name">收货人：{{Addressinfo.consignee_name}}</p>
          <p>{{Addressinfo.consignee_phone}}</p>
        </div>
        <div class="orderAddress-bot">
          地址：<span>{{Addressinfo.consignee_address}}</span> <span>{{Addressinfo.detail_address}}</span>
        </div>
      </div>
    </div>
    <div class="line10"></div>
    <div class="list-item">
      <div>归还信息</div>
      <div></div>
    </div>
    <div class="list-item" v-for="item in equipmentList" :key="item.index">
      <div>设备编码</div>
      <div>{{item.device_mac}}</div>
    </div>
    <div class="line10"></div>
    <div class="list-item">
      <div>订单金额</div>
      <div></div>
    </div>
    <div class="list-item">
      <div>租金<i>({{this.startTime}}-{{this.endTime}})</i></div>
      <div><span>￥ {{detailsData.borrow_money}}</span>（{{detailsData.borrow_price}} * {{detailsData.borrow_days}} 天）</div>
    </div>
    <div class="line10"></div>
    <div class="list-item">
      <div>物流公司</div>
      <!-- <input type="text" placeholder="请输入物流公司" v-model.trim="still.back_logis_company"> -->
      <select v-model="still.back_logis_company">
        <option v-for="item in logistics" :value="item.logistic_name" :key="item.index">{{item.logistic_name}}</option>
      </select>
    </div>
    <div class="list-item">
      <div>物流编号</div>
      <input type="text" placeholder="请输入物流编号" v-model.trim="still.back_logis_number">
    </div>
  </div>
  <div class="equipment-btn" @click="equipmentSub">支付订单</div>
</div>
</template>

<script>
// import wxjs from '@/utils/wxjsInterface';
import { goPay } from '@/api/goPay';
import ajax from '@/utils/ajax';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      id: this.$route.query.id ? this.$route.query.id : '',
      user: this.$route.query.user ? this.$route.query.user : '',
      operationId: sessionStorage.getItem('operationId') ? sessionStorage.getItem('operationId') : '',
      Addressinfo: {},
      // 订单详情
      detailsData: {},
      // 订单下的设备列表
      equipmentList: [],
      // 物流公司列表
      logistics: [],
      // 开始时间
      startTime: '',
      // 结束时间
      endTime: '',
      // 归还参数
      still: {
        id: this.$route.query.id,
        user_name: '',
        back_delivery_mode: '2',
        back_logis_company: '',
        back_logis_code: '',
        back_logis_number: '',
      },
      // 支付信息
      payInfo: {},
    };
  },
  methods: {
    // 获取设置的脉诊仪寄回默认地址
    getAddress() {
      ajax.get(`/api/borrow/GetBackAddress`).then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          this.Addressinfo = res.data.data;
        }
      });
    },
    // 获取最近xx天日期 getDay(-7)七天前
    getDay(tim, day) {
      let internationalTim = tim.replace(/-/g, '/');
      let today = new Date(internationalTim);
      let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds);
      let tYear = today.getFullYear();
      let tMonth = today.getMonth();
      let tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + '-' + tMonth + '-' + tDate;
    },
    doHandleMonth(month) {
      let m = month;
      if (month.toString().length === 1) {
        m = '0' + month;
      }
      return m;
    },
    // 获取物流公司
    getLogistics() {
      ajax.get(`/api/borrow/GetLogisticNameInfo`).then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          this.logistics = res.data.data;
        }
      });
    },
    // 租借订单详情数据
    getDetails() {
      ajax.get(`/api/borrow/GetBorrowOrderDetail/` + this.user + '/' + this.id).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          this.detailsData = res.data.data;
          this.startTime = res.data.data.start_time.split(' ')[0];
          this.endTime = this.getDay(res.data.data.start_time, res.data.data.borrow_days);
          this.equipmentList = res.data.data.details;
          this.still.back_logis_company = res.data.data.back_logis_company;
          this.still.back_logis_number = res.data.data.back_logis_number;
          this.still.user_name = res.data.data.consignee_phone;
        }
      });
    },
    // 通过订单ID获取支付租金费用信息
    getPayRentData() {
      ajax.get(`/api/borrow/GetPayRentData/` + this.id).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          this.payInfo = res.data.data;
          // 将设备的需要支付的租金信息保存
          sessionStorage.setItem('equipmentPay', JSON.stringify(res.data.data));
          // 保存user以及订单id 用于后面查询订单详情
          sessionStorage.setItem('equipmentUser', JSON.stringify(this.user));
          sessionStorage.setItem('equipmentId', JSON.stringify(this.id));
          console.log(JSON.parse(sessionStorage.getItem('equipmentPay')));
          console.log(JSON.parse(sessionStorage.getItem('equipmentUser')));
          console.log(JSON.parse(sessionStorage.getItem('equipmentId')));
          let payMsg = {
            // 订单支付id
            orderList: res.data.data.pay_id,
            // 订单金额
            orderAmount: res.data.data.pay_money,
            // 订单商户id
            sellerName: '',
            // 订单商品类型
            payType: 'jinmu'
          };
          console.log(payMsg);
          if (payMsg.orderAmount <= 0) {
            Toast({
              message: '当前租金小于0，无需支付！',
              position: 'middle',
              duration: 1500
            });
            this.$router.go(-1);
            return false;
          }
          goPay(payMsg);
          // 微信支付
          // let url = `${process.env.WEB_HOST}/payment/equipmentPay`;
          // let link = wxjs.getOpenIdUrl(url);
          // location.href = link;
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 1500
          });
          return false;
        }
      });
    },
    // 订单支付
    equipmentSub() {
      // 名字正则
      let nameReg = /[^a-zA-Z0-9_\u4e00-\u9fa5]/g;
      // 汉字正则
      let hanziReg = /[\u4E00-\u9FA5]/;
      // 当为快递时候 需要进行验证物流信息填入物流公司 以及单号
      if (!this.still.back_logis_company) {
        Toast({
          message: '请填入物流公司！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      if (!this.still.back_logis_number) {
        Toast({
          message: '请填入请填写物流单号！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (nameReg.test(this.still.back_logis_number)) {
        Toast({
          message: '物流单号不支持特殊符号！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (hanziReg.test(this.still.back_logis_number)) {
        Toast({
          message: '物流单号不能为汉字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      console.log(this.still);
      ajax.post(`/api/borrow/OrderUserAffirmBack`, this.still).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          if (this.detailsData.borrow_money <= 0) {
            Toast({
              message: '当前租金小于0，无需支付！',
              position: 'middle',
              duration: 1500
            });
            this.$router.go(-1);
            return false;
          }
          this.getPayRentData();
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 500
          });
        }
      });
    }
  },
  created() {
    this.getLogistics();
    this.getAddress();
    this.getDetails();
  }
};
</script>

<style lang="less" scoped>
.line10{
  height: 10px;
  background: #eeeef3;
}
.equipmentReturnDetails{
  padding-top: 0.1px;
  min-height: 100%;
  background: #eeeef3;
  .equipmentReturnDetailsMain{
    background: #fff;
    margin-top: 44px;
    margin-bottom: 60px;
    .orderAddress{
      height: 95px;
      background: #fff;
      padding: 0 10px;
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      >img{
        margin-top: 5px;
        width: 12.5px;
        height: 16.5px;
      }
      .orderAddress-txt{
        margin-left: 8px;
        flex: 1;
        color: #475669;
        font-size: 15px;
        .orderAddress-top{
          display: flex;
          align-items: center;
          justify-content: space-between;
          line-height: 25px;
          .name{
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .orderAddress-bot{
          height: 40px;
          line-height: 20px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .list-item{
    height: 44px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    color: #333333;
    >div:last-child{
      color: #999999;
    }
    i{
      color: #999999;
    }
    span{
      color: #ff0000;
    }
    input{
      flex: 1;
      text-align: right;
      border: none;
    }
    select{
      border: none;
      outline:none;
      background: #fff;
      text-align: center;
    }
  }
  .equipment-btn{
    position: fixed;
    width: 100%;
    height: 44px;
    line-height: 44px;
    bottom: 0;
    text-align: center;
    color: #fff;
    background: #0ccdd3;
  }
}
</style>
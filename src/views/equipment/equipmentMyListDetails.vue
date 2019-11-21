<template>
<div class="equipmentDetails">
  <mt-header title="租赁详情">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="equipmentDetailsMain">
    <div class="list-item">
      <div>订单状态</div>
      <div class="state" v-if="state==-1">已取消</div>
      <div class="state" v-if="state==0">待支付</div>
      <div class="state" v-if="state==1">待发货</div>
      <div class="state" v-if="state==2">待签收</div>
      <div class="state" v-if="state==3">使用中</div>
      <div class="state" v-if="state==4">归还中</div>
      <div class="state" v-if="state==5">已归还</div>
    </div>
    <div class="list-item" v-for="item in equipmentList" :key="item.index">
      <div>设备编码</div>
      <div>{{item.device_mac}}</div>
    </div>
    <div class="list-item"  v-if="equipmentList.length == 0" >
      <div>设备编码</div>
      <div>无</div>
    </div>
    <div class="list-item">
      <div>使用时长</div>
      <div>{{detailsData.borrow_days}}天</div>
    </div>
    <div class="list-item">
      <div>租金</div>
      <div><span class="state">￥ {{detailsData.borrow_money}}</span>（{{detailsData.borrow_price}} * {{detailsData.borrow_days}} 天）</div>
    </div>
    <div class="line10"></div>
    <div class="orderAddress">
      <img src="./imgs/icon_bx.png">
      <div class="orderAddress-txt">
        <div class="orderAddress-top">
          <!-- 该收获人为 需要寄过来的位置（用户） -->
          <p class="name">收货人：{{detailsData.consignee_name}}</p>
          <p>{{detailsData.consignee_phone}}</p>
        </div>
        <div class="orderAddress-bot">
          地址：<span>{{detailsData.consignee_address}}</span> <span>{{detailsData.consignee_detail_address}}</span>
        </div>
      </div>
    </div>
    <div class="line10"></div>
    <div class="list-item">
      <div>总押金</div>
      <div>￥{{detailsData.borrow_deposit}}</div>
    </div>
    <div class="list-item">
      <div>押金方式</div>
      <div>在线支付冻结押金</div>
    </div>
    <div class="list-item">
      <div>押金状态</div>
      <div v-if="payInfo.status === 10">待支付</div>
      <!-- <div v-if="payInfo.status === 11">支付完成</div> -->
      <div v-if="payInfo.status === 11">冻结中</div>
      <div v-if="payInfo.status === 20">退款中</div>
      <div v-if="payInfo.status === 21">退款完成</div>
    </div>
    <div  v-if="state===4 || state===5 ">
      <div class="line10"></div>
      <div class="list-item">
        <!-- 归还寄过去的物流 -->
        <div>物流信息</div>
      </div>
      <div class="list-item">
        <div>物流公司</div>
        <div>{{detailsData.back_logis_company}}</div>
      </div>
      <div class="list-item">
        <div>物流编号</div>
        <div>{{detailsData.back_logis_number}}</div>
      </div>
    </div>
  </div>
  <div class="receivingGoods" @click="payment" v-if="state===0">支付订单</div>
  <!-- <div class="receivingGoods" @click="seeLogistics" v-if="state===2">查看物流</div> -->
  <div class="receivingGoods" @click="receivingGoods" v-if="state===2">确认收货</div>
  <div class="returnGoods" @click="returnGoods" v-if="state===3">归还脉诊仪</div>
  <p class="contact">联系客服：400-033-3888</p>
</div>
</template>

<script>
import ajax from '@/utils/ajax';
import { Toast, MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      id: this.$route.query.id ? this.$route.query.id : '',
      user: this.$route.query.user ? this.$route.query.user : '',
      // 订单详情
      detailsData: {},
      // 设备列表
      equipmentList: [],
      // 订单状态
      state: '',
      // 支付状态信息
      payInfo: {}
    };
  },
  methods: {
    // 租借订单详情数据
    getDetails() {
      ajax.get(`/api/borrow/GetBorrowOrderDetail/` + this.user + '/' + this.id).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          this.detailsData = res.data.data;
          this.equipmentList = res.data.data.details;
          this.state = res.data.data.order_status;
          this.payInfo = res.data.data.pay_deposit;
          console.log(this.detailsData);
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 500
          });
        }
      });
    },
    // 支付订单
    payment() {
      // this.$router.push('/equipment/equipmentLeaseConfirm?id=' + this.id);
      this.$router.push('/equipment/equipmentLeaseConfirm?user=' + this.user + '&id=' + this.id);
    },
    // 归还脉诊仪
    returnGoods() {
      this.$router.push('/equipment/equipmentReturnDetails?user=' + this.user + '&id=' + this.id);
    },
    // 查看物流
    seeLogistics() {
      this.$router.push('/equipment/equipmentLogistics?logisticsType=' + this.detailsData.send_logis_company + '&logisticsNumber=' + this.detailsData.send_logis_number);
    },
    // 确认收货
    receivingGoods() {
      MessageBox.confirm('确定已经收到货物吗？').then(action => {
        if (action === 'confirm') {
          ajax.get(`/api/borrow/OrderUserAffirmReceiving/` + this.user + '/' + this.id).then((res) => {
            console.log(res);
            if (res.status === 200 && res.data.code === 0) {
              this.$router.push('/equipment/equipmentMyListReceiptCompleted');
            } else {
              Toast({
                message: res.data.message,
                position: 'middle',
                duration: 500
              });
            }
          });
        }
      }).catch(err => {
        if (err === 'cancel') {
          console.log('已取消');
        }
      });
    }
  },
  created() {
    this.getDetails();
  }
};
</script>

<style lang="less" scoped>
.line10{
  height: 10px;
  background: #eeeef3;
}
.contact{
  text-align: center;
  color: #666666;
  font-size: 15px;
  line-height: 37px;
  line-height: 37px;
}
.equipmentDetails{
  padding-top: 0.1px;
  min-height: 100%;
  background: #eeeef3;
  .equipmentDetailsMain{
    margin-top: 44px;
    background: #fff;
  }
  .list-item{
    height: 44px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    .state{
      color: #ff0000;
    }
  }
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
  .receivingGoods,.returnGoods{
    width: 205px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #0ccdd3;
    border-radius: 20px;
    color: #fff;
    margin: 50px auto;
  }
}
</style>
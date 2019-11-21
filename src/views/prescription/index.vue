<template>
  <div class="presc-index" :style="'padding-bottom:'+btn.conainerBottom+'px;'">
    <mt-header fixed title="订单详情" style="z-index: 2;">
      <a href="javascript:;" slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <!-- 状态图标 -->
    <div class="presc_status_bar" v-show="orderDetails.order_type == 1">
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
    <div v-show="orderDetails.order_type == 1 && orderDetails.docprescriptions[0].docprescriptiondetails.length == 0">
      <!-- 处方图片 -->
      <div class="logis_info_bar presc_pic presc_module">
        <div class="presc_row" style="display: flex;align-items: center;" v-show="!!orderDetails.docprescriptions[0].recipe_pic_url">
          <p class="left" style="">上传处方</p>
          <p class="right">
            <img :src="orderDetails.docprescriptions[0].recipe_pic_url" alt="" width="64" height="64" @click="bigImg(orderDetails.docprescriptions[0].recipe_pic_url)">
          </p>
        </div>
        <div class="consignee_info">
          <div class="name_phone">
            <span class="name">收货人：{{orderDetails.consignee}}</span>
            <span class="phone">{{orderDetails.con_tel}}</span>
          </div>
          <p class="address">
            地址：{{orderDetails.detail_address}}
          </p>
        </div>
        <div class="presc_row">
          <p class="left">联系方式</p>
          <p class="right">
            {{orderDetails.docprescriptions[0].tel}}
          </p>
        </div>
      </div>
      <!-- 是否怀孕、代煎 -->
      <div class="presc_module">
        <div class="presc_row">
          <p class="left">是否代煎</p>
          <p class="right">{{String(orderDetails.docprescriptions[0].is_suffering)==='0'?'否': '是'}}</p>
        </div>
        <div class="presc_row">
          <p class="left">是否怀孕</p>
          <p class="right">{{String(orderDetails.docprescriptions[0].is_pregnant)==='0'?'否': '是'}}</p>
        </div>
      </div>
    </div>
    <div v-show="orderDetails.docprescriptions[0].docprescriptiondetails.length >= 1">
      <!-- 收货人物流 -->
      <div class="logis_info_bar presc_module" v-show="orderStatusStr==='10' || orderStatusStr==='15' || orderStatusStr==='20' || orderStatusStr==='103'">
        <div class="logis_info" @click="goDetail()">
          <div class="logis_desc">
            <span>{{lastLogis['addr_info']}}</span>
          </div>
          <div class="logis_time">{{lastLogis['current_lo_time']}}</div>
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
        <!-- <div class="presc_module" v-show="orderStatusStr==='5'||orderStatusStr==='10'||orderStatusStr==='15'||orderStatusStr==='20'||orderStatusStr==='100' || orderStatusStr==='104'"> -->
        <div class="presc_row">
          <p class="left">患者信息</p>
          <p class="right">{{orderDetails.docprescriptions[0].username}}/{{orderDetails.docprescriptions[0].gender?'男':'女'}}/{{orderDetails.docprescriptions[0].age}}岁</p>
        </div>
        <div class="presc_row">
          <p class="left">主诉及辩证</p>
          <p class="right">{{orderDetails.docprescriptions[0].diagnosis || '暂无'}}</p>
        </div>
        <div class="presc_row">
          <p class="left">诊断</p>
          <p class="right">{{orderDetails.docprescriptions[0].zhenduan || '暂无'}}</p>
        </div>
      </div>
      <!-- 处方/西药清单 -->
      <div class="drug_list_wrapper presc_module">
        <!-- <div class="drug_list_wrapper presc_module" v-show="orderStatusStr==='5'||orderStatusStr==='10'||orderStatusStr==='15'||orderStatusStr==='20'||orderStatusStr==='100'||orderStatusStr==='104'"> -->
        <p class="drug_list_title">处方</p>
        <div class="presc_row noborder">
          <p class="left">{{getPreName(orderDetails.docprescriptions[0])}}</p>
          <p class="right">{{'X'+orderDetails.docprescriptions[0].amount+'剂'}}</p>
        </div>
        <p class="drug_list_title drugs">{{medicines}}</p>
      </div>
      <!-- 使用说明这块 -->
      <div class="presc_module">
        <!-- <div class="presc_module" v-show="orderStatusStr==='5'||orderStatusStr==='10'||orderStatusStr==='15'||orderStatusStr==='20'||orderStatusStr==='100'||orderStatusStr==='104'"> -->
        <div class="presc_row">
          <p class="left">服用方法</p>
          <p class="right">{{orderDetails.docprescriptions[0].medication_instruction || '暂无'}}</p>
        </div>
        <div class="presc_row">
          <p class="left">医嘱</p>
          <p class="right">{{orderDetails.docprescriptions[0].doctor_advice || '暂无'}}</p>
        </div>
        <div class="presc_row" v-show="String(orderDetails.docprescriptions[0].prescr_type)==='0'">
          <p class="left">煎煮方式</p>
          <p class="right">{{String(orderDetails.docprescriptions[0].suffering_type)==='0'?'一剂两包':'一剂三包'}}</p>
        </div>
        <div class="presc_row noborder">
          <p class="left">备注</p>
          <p class="right">{{orderDetails.remark || '暂无'}}</p>
        </div>
      </div>
      <!-- 费用相关 -->
      <div class="presc_module">
        <!-- <div class="presc_module" v-show="orderStatusStr==='5'||orderStatusStr==='10'||orderStatusStr==='15'||orderStatusStr==='20'||orderStatusStr==='104'"> -->
        <div class="presc_row noborder">
          <p class="left">诊金</p>
          <p class="right">¥{{Number(orderDetails.treat_fee).toFixed(2)}}</p>
        </div>
        <div class="presc_row">
          <p class="left">运费</p>
          <p class="right">¥{{orderDetails.logistics_fee? Number(orderDetails.logistics_fee).toFixed(2) : '0.00'}}</p>
          <!--<p class="right">¥{{orderDetails.docprescriptions[0].logistics_fee ? Number(orderDetails.docprescriptions[0].logistics_fee).toFixed(2) : '0.00'}}</p>-->
        </div>
        <div class="presc_row noborder">
          <p class="left">处方金额</p>
          <p class="right">¥{{Number(orderDetails.docprescriptions[0].money).toFixed(2)}}</p>
        </div>
        <div class="presc_row noborder">
          <p class="left">总计</p>
          <p class="right">¥{{Number(orderDetails.order_price).toFixed(2)}}</p>
        </div>
      </div>
      <!-- 订单号 时间 -->
      <!-- <div class="presc_module" v-show="orderStatusStr !== '0'"> -->
      <div class="presc_module">
        <div class="presc_row">
          <p class="left">订单编号</p>
          <p class="right">{{orderDetails.order_id}}</p>
        </div>
        <div class="presc_row noborder">
          <p class="left">下单时间</p>
          <p class="right">{{orderDetails.create_time}}</p>
        </div>
      </div>
    </div>
    <!-- 按钮 以及状态 -->
    <div class="presc_btn_wrapper">
      <p class="primary" :class="{grey: btn.disabled}" v-if="btn.isSingle" @click.stop="submit()">
        {{btn.text}}
      </p>
      <div class="btns_wrapper" v-else>
        <p class="cancel" @click.stop="cancelOrder()">取消处方</p>
        <p class="confirm" @click.stop="confirmOrder()">确认处方</p>
      </div>
    </div>
    <div class="common-mask" @click="closeBigImg" v-show="isBigImage"></div>
    <img :src="bigImage" class="big-img" v-show="isBigImage"/>
  </div>
</template>
<script>
import { MessageBox, Indicator, Button } from 'mint-ui';
// import yilin from '@/utils/yilinApiRequest.js';
import doctorAjax from '@/utils/doctorAjax.js';
import { getLogis, getLogis1 } from '@/utils/LOG.js';
export default {
  data() {
    return {
      isShow: false,
      audit: true,
      showLogistics: false,
      orderDetails: { status: '0', docprescriptions: [] },
      orderStatus: {
        '0': { 'statusText': '待医生确认' },
        '5': { 'statusText': '医生已确认' },
        '10': { 'statusText': '待收货' },
        '15': { 'statusText': '待收货' },
        '20': { 'statusText': '已完成', },
        '97': { 'statusText': '用户已取消' },
        '98': { 'statusText': '审核失败' },
        '99': { 'statusText': '医生取消' },
        '100': { 'statusText': '审核失败' },
        '101': { 'statusText': '平台取消' },
        '102': { 'statusText': '用户取消订单' },
        '103': { 'statusText': '商家取消订单' },
        '104': { 'statusText': '订单过期' },
        '1000': { 'statusText': '已删除' },
      },
      prescrTypes: {
        '0': '中药清单',
        '1': '西药清单',
        '2': '膏方清单',
        '3': '丸剂清单',
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
      logisticsInfo: {},
      logisticsInfo2: {},
      bigImage: '',
      isBigImage: false,  // 处方大图模式
    };
  },
  components: {
    Button
  },
  computed: {
    // 订单状态（0:待审核,5 :待确认, 6:待医网签,7:待发货,10,15:待收货,20:已收货,97,102:已取消(用户患者),99:医生取消,101:平台取消98,100:审核失败,103:商家取消订单,104:订单过期,1000医生APP端删除）
    img0() {
      let status = String(this.orderDetails.status);
      let contains = ['0', '5', '6', '7', '10', '15', '20', '97', '98', '102', '99', '101', '100', '103', '1000'];
      let flag = contains.indexOf(status) > -1;
      return { src: flag ? require('./img/icon_pfl@2x.png') : require('./img/icon_pf@2x.png'), active: flag };
    },
    img1() {
      let status = String(this.orderDetails.status);
      let contains = ['5', '7', '10', '15', '20', '100', '103'];
      let details = this.orderDetails.docprescriptions[0].docprescriptiondetails.length >= 1;
      let flag = contains.indexOf(status) > -1 || details;
      return { src: flag ? require('./img/icon_ysqrl@2x.png') : require('./img/icon_ysqr@2x.png'), active: flag };
    },
    img2() {
      let status = String(this.orderDetails.status);
      let payStatus = String(this.orderDetails.pay_status);
      let contains = ['10', '15', '20', '103'];
      let flag = contains.indexOf(status) > -1 || payStatus === '2';
      return { src: flag ? require('./img/icon_yhqrl@2x.png') : require('./img/icon_yhqr@2x.png'), active: flag };
    },
    img3() {
      let status = String(this.orderDetails.status);
      let payStatus = String(this.orderDetails.pay_status);
      let contains = ['20', '103'];
      let flag = contains.indexOf(status) > -1 || payStatus === '2';
      return { src: flag ? require('./img/icon_fkl@2x.png') : require('./img/icon_fk@2x.png'), active: flag };
    },
    img4() {
      let status = String(this.orderDetails.status);
      let contains = ['20'];
      let flag = contains.indexOf(status) > -1;
      return { src: flag ? require('./img/icon_wcl@2x.png') : require('./img/icon_wc@2x.png'), active: flag };
    },
    orderStatusStr() {
      return String(this.orderDetails.status);
    },
    btn() {
      let txt = '';
      let status = String(this.orderDetails.status);
      let disabled = false;
      let singleBtn = true;
      let bottom = 44;
      switch (status) {
        case '0':
          txt = '取消订单';
          break;
        case '5':
          singleBtn = false;
          bottom = 75;
          break;
        case '10':
          txt = '确认收货';
          break;
        case '15':
          txt = '确认收货';
          break;
        case '20':
          txt = '订单已完成';
          disabled = true;
          break;
        case '97':
          txt = '订单已取消';
          disabled = true;
          break;
        case '98':
          txt = '审核失败';
          disabled = true;
          break;
        case '99':
          txt = '订单已取消';
          disabled = true;
          break;
        case '100':
          txt = '审核失败';
          disabled = true;
          break;
        case '101':
          txt = '订单已取消';
          disabled = true;
          break;
        case '102':
          txt = '订单已取消';
          disabled = true;
          break;
        case '103':
          txt = '订单已取消';
          disabled = true;
          break;
        case '104':
          txt = '订单已过期';
          disabled = true;
          break;
      }
      return { text: txt, disabled: disabled, isSingle: singleBtn, conainerBottom: bottom };
    },
    medicines() {
      let pre = this.orderDetails.docprescriptions[0] || {};
      let rs = [];
      if (pre.docprescriptiondetails) {
        for (let i = 0; i < pre.docprescriptiondetails.length; i++) {
          rs.push(pre.docprescriptiondetails[i].medicines);
        }
      }
      return rs.join('、');
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
    submit() {
      if (this.btn.disabled) {
        return;
      }
      if (this.btn.text === '取消订单') {
        this.cancelOrder();
      } else if (this.btn.text === '确认收货') {
        this.confirmReceipt();
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
      }, () => { });
    },
    confirmReceipt() {
      MessageBox.confirm('是否确定收到了该订单的货物？', '确认收货').then(({ value, action }) => {
        Indicator.open();
        let url = '/api/order/confirmReceipt/' + this.orderDetails.order_id;
        doctorAjax.get(url).then((res) => {
          Indicator.close();
          this.$router.go(-1);
        });
      }, () => { });
    },
    // getLogis() {
    //   let order_id = this.orderDetails.km_order_id;
    //   if (!order_id) {
    //     return;
    //   }
    //   let url = 'http://www.kmzhyf.cn:8182/zyf/web';
    //   let params = {
    //     'order_id': order_id,
    //     'methodName': 'getWLInfoNoValicode'
    //   };
    //   yilin.get(url, {
    //     params: params
    //   }).then((res) => {
    //     if (res) {
    //       let response = res.data;
    //       if (res.status === 200 && response && response.head && response.head.code === '0' && response.data) {
    //         this.logisticsInfo = response.data;
    //         if (response.data.list.length > 0) {
    //           this.lastLogis = response.data.list.pop();
    //         }
    //       }
    //     }
    //   });
    // },
    goDetail() {
      // if (this.lastLogis['addr_info'] !== '暂无物流信息') {
      this.$router.push({
        path: '/prescription/logisticsDetail',
        query: {
          order_id: this.orderDetails.order_id,
          km_order_id: this.orderDetails.km_order_id,
          prescr_type: this.orderDetails.docprescriptions[0].prescr_type,
        }
      });
      // }
    },
    // 大图模式
    bigImg(url) {
      this.bigImage = url;
      this.isBigImage = true;
    },
    // 关闭大图模式
    closeBigImg() {
      this.isBigImage = false;
    },
    goBack() {
      let formPayments = sessionStorage.getItem('formPayments');
      if (formPayments) {
        let activeId = formPayments === 'yes' ? 3 : formPayments === 'all' ? 1 : 1;
        sessionStorage.removeItem('formPayments');
        this.$router.push({
          path: '/prescription/prescription-order',
          query: { activeId: activeId }
        });
      }
      else {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    let order_id = this.$route.query.order_id;
    let url = '/api/order/getPatientOrderDetail/' + order_id;
    doctorAjax.get(url).then((res) => {
      if (res && res.status === 200 && res.data && String(res.data.code) === '0' && res.data.data) {
        console.log(res.data.data, '处方订单详情');
        this.orderDetails = res.data.data;
        console.log(this.orderDetails);
        // 判断物流,根据prescr_type的类型判断调用什么获取物流信息的接口(西药和非西药的物流信息接口不同)
        if (this.orderDetails.status === 5 || this.orderDetails.status === 0) return;
        switch (Number(res.data.data.docprescriptions['0'].prescr_type)) {
          // 西药物流信息
          case 1: {
            console.log('>>>>开始获取西药物流信息<<<<');
            getLogis1(this);
            break;
          }
          // 非西药物流信息
          default: {
            console.log('>>>>开始获取非西药物流信息<<<<');
            getLogis(this);
          }
        }
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
  min-height: 100%;
  background-color: #eeeef3;
  color: #333;
  font-size: 14px;
}

/*顶部状态图标*/
.presc_status_bar {
  background-color: #fff;
  display: flex;
  padding: 0 20px 8px;
  margin-bottom: 10px;
  height: 85px;
  align-items: center;
  justify-content: center;
  position: relative;

  &:after {
    content: ' ';
    position: absolute;
    width: calc(100% - 80px);
    height: 2px;
    background-color: #c1c1c1;
    top: 27px;
    left: 40px;
    z-index: 0;
  }

  .status_item {
    z-index: 1;
    height: 54px;
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
      /*margin-top: 5px;*/

      &.active {
        color: @green-color;
      }
    }
  }
}

.logis_info_bar {
  width: 100%;
  background-color: #fff;

  .logis_info {
    width: 100%;
    // height: 70px;
    padding: 16px 10px 16px 31px;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    // align-items: center;
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
        font-size: 14px;
        color: #333;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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

    .logis_time {
      width: calc(100% - 20px);
    }
  }
}

/*收货人*/
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
      color: #888;
    }
  }
}

/*底部按钮*/
.presc_btn_wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  p {
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0ccdd3;
    color: #fff;

    &.grey {
      background-color: #b0b0b0;
      color: #fff;
    }
  }

  .btns_wrapper {
    width: 100%;
    background-color: #eee;
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;

    p {
      border-radius: 5px;
      padding: 12px 50px;

      &.confirm {
        color: #fff;
        background-color: #0ccdd3;
      }

      &.cancel {
        border: 1px solid #0ccdd3;
        background-color: #fff;
        color: #0ccdd3;
      }
    }
  }
}
.big-img{
  .align-center(fixed);
  width: 86%;
}
</style>

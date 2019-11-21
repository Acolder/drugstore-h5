<template>
  <div id="evaluate">
    <mt-header title="发表评价">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
      <mt-button slot="right" @click="ReleaseAction" style="font-size: 14px;color: #0ccdd3;">发布</mt-button>
    </mt-header>
    <div class="content">
      <div class="goods-evaluate" v-for="(orderDetail,index) in orderData.orderDetail" :key="index">
        <div class="evaluate-title">
          <div>
            <i class="icon-km"></i>
            <span class="name">{{orderData.sellerUser ? orderData.sellerUser.sellerName : ''}}</span>
          </div>
          <span class="time" v-show="orderData.orderTransport ==1">3天送达</span>
          <span class="time" v-show="orderData.orderTransport ==2">30分钟速达</span>
          <span class="time" v-show="orderData.orderTransport ==3">自提</span>
          <span class="time" v-show="orderData.orderTransport ==4">7天送达</span>
        </div>
        <div class="goods">
          <div class="img">
            <img :src="orderDetail.producInfo.productMainImage" alt="">
          </div>
          <div class="goods-right">
            <div class="pirce">
              <span>{{orderDetail.producInfo.productName}}</span>
              <i>￥{{orderDetail.producInfo.productMarkprice}} </i>
            </div>
            <div class="num">
              <span>规格：{{orderDetail.producInfo.productSpecification}}</span>
              <i>x{{orderDetail.quantity}}</i>
            </div>
          </div>
        </div>
        <div class="level">
          <span class="left">商品评价：</span>
          <div class="icon-wrap">
            <div class="icon">
              <i class="icon-xxx" :class="{iconActive:products[index].level>j}"  @click="xxAction(j,index,$event)" v-for="(i,j) in 5" :key="j"></i>
            </div>
          </div>
        </div>
        <div class="txt">
          <textarea placeholder="药品收到了吗，购买体验是否满意？都可以发布评价哦~" ref="txt" @input="contentAction(index,$event)" v-model="products[index].content"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import javaAjax from '@/utils/javaApiRequest';
import { Header, Button, Toast } from 'mint-ui';
export default {
  data() {
    return {
      orderData: '',
      socre: 5,
      products: []
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button,
    Toast
  },
  methods: {
    // 发布评价
    ReleaseAction() {
      let data = {
        'products': this.products
      };
      if (data.products.length === 0) {
        Toast('您还没有填写任何评价');
      } else {
        javaAjax.post('/mall/comment/save', data).then(res => {
          if (res.data.msg === '成功') {
            Toast('发布成功');
            this.$router.go(-1);
          } else {
            Toast('服务器正忙，请稍后重试');
          }
        });
      }
    },
    xxAction(j, index, $event) { // 评价星级
      this.products[index].level = j + 1;
      // let obj = {
      //   content: $event.target.parentNode.parentNode.parentNode.nextElementSibling.firstChild.value,
      //   productId: this.orderData.orderDetail[index].productId,
      //   level: this.orderData.orderDetail[index].score,
      //   orderId: this.$route.query.orderId,
      //   orderTransport: this.orderData.orderTransport
      // };
      // this.products.push(obj);
      // for (let i = 0; i < this.products.length - 1; i++) {
      //   for (let j = 1; j < this.products.length; j++) {
      //     if (i !== j) {
      //       if (this.products[i].productId === this.products[j].productId) {
      //         this.products.splice(i, 1);
      //       }
      //     }
      //   }
      // }
    }, // 评价内容
    contentAction(index) {
    //   let obj = {
    //     content: $event.target.value,
    //     productId: this.orderData.orderDetail[index].productId,
    //     level: this.orderData.orderDetail[index].score,
    //     orderId: this.$route.query.orderId,
    //     orderTransport: this.orderData.orderTransport
    //   };
    //   this.products.push(obj);
    //   for (let i = 0; i < this.products.length - 1; i++) {
    //     for (let j = 1; j < this.products.length; j++) {
    //       if (i !== j) {
    //         if (this.products[i].productId === this.products[j].productId) {
    //           this.products.splice(i, 1);
    //         }
    //       }
    //     }
    //   }
    }
  },
  created() {
    // 根据订单id查找订单
    let _self = this;
    javaAjax.post('mall/order/queryUserOrderDetailByOrderId', { 'orderId': _self.$route.query.orderId }
    ).then(res => {
      if (res.data.resultCode === '0' && res.status === 200) {
        this.orderData = res.data.resultData;
        this.orderData.orderDetail.map(relust => {
          this.$set(relust, 'score', this.socre);
          return relust;
        });
        for (let i = 0; i < this.orderData.orderDetail.length; i++) {
          this.products.push({
            content: '',
            productId: this.orderData.orderDetail[i].productId,
            orderTransport: this.orderData.orderTransport,
            level: 5,
            orderId: this.orderData.orderId
          });
        }
      }
    });
  }
};


</script>

<style lang="less" scoped>
@import "../../styles/mixin.less";
.mint-button {
  color: #0ccdd3;
  font-size: 17px;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
}
.goods-evaluate {
  padding-top: 10px;
  .evaluate-title {
    padding-left: 13px;
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    padding-right: 15px;
    justify-content: space-between;
    .icon-km {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("./img/icon-ygzt@2x.png") no-repeat;
      background-size: 100%;
    }
    .name {
      margin-left: 7px;
    }
    .time {
      padding: 0px 2px;
      // border: 1px solid #089efd;
      // border-radius: 5px;
      color: #0ccdd3;
      margin-left: 7px;
      font-size: 13px;
      float: right;
    }
  }
}
.goods {
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 13px;
  padding-right: 15px;
  background: #fafafa;
  .img {
    width: 50px;
    height: 50px;
    background: #fff;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .goods-right {
    flex: 1;
    margin-left: 9px;
    overflow: hidden;
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .num {
      color: #666;
    }
    i {
      text-align: right;
      float: right;
    }
  }
}
.level {
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 13px;
  .left {
    font-size: 16px;
  }
  .icon-wrap{
    position: relative;
    .icon-xxx {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("./img/icon-xxno@2x.png") no-repeat;
      background-size: 100%;
      margin-right: 16px;
    }
    .iconActive {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("./img/icon-xx@2x.png") no-repeat;
      background-size: 100%;
    }
  }
  .icon {
    margin-left: 7px;
  }
}
.txt {
  height: 140px;
  .border-1px(#d0d0d0);
  .border-top-1px(#d0d0d0);
  // border-top: 1px solid #d0d0d0;
  // border-bottom: 1px solid #d0d0d0;
  textarea {
    width: 100%;
    height: 100%;
    border: 0;
    padding: 15px 12px;
    font-family: PingFang-SC-Regular;
  }
}
</style>

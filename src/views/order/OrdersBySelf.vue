<template>
  <div class="page" ref="page">
    <mt-header fixed title='自提取货订单'>
      <router-link to='/' slot='left'>
        <mt-button icon='back'></mt-button>
      </router-link>
    </mt-header>
    <div class="orderlist-wrapper">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <ul class="orderlist">
          <li v-for="o in orders" :key="o.orderId">
            <div class="item">
              <div class="title">
                <span class="cabname">{{o.sellerUser.sellerName}}</span>
                <span class="status">{{orderStatus[o.orderStatus]}}</span>
              </div>
              <div class="address">
                <div class="text">
                  地址：{{getAddress(o.userAddress)}}
                </div>
                <div class="nav-wrapper">
                  <obs-distancetime class="distance" :location="o.sellerUser"></obs-distancetime>
                  <button class="nav" type="button" @click.stop="navigate(o.sellerUser)">步行导航</button>
                </div>
              </div>
              <div class="main">
                <div class="orderinfos" v-for="(od,odIndex) in o.orderDetail" :key="odIndex">
                  <div class="prd-img-wrapper">
                  </div>
                  <div class="prd-desc">
                    <div>
                      <span class="left">{{od.proudct?od.proudct.productName:''}}</span>
                      <span class="right">￥{{od.proudct?od.proudct.productMarkprice:0}}</span>
                    </div>
                    <div>
                      <span class="left">规格：{{od.proudct?od.proudct.productSpecification:''}}</span>
                      <span class="right">X{{od.quantity}}</span>
                    </div>
                  </div>
                </div>
                <div class="orderprice">
                  <span>共{{getGoodsTotal(o.orderDetail)}}件商品 合计：</span><span style="color: #f75858">￥{{o.orderPayment}}</span>
                </div>
              </div>
              <div class="actions">
                <button type="button" @click.stop="cancelOrder(o.orderId)" v-show="String(o.orderStatus)==='10'||String(o.orderStatus)==='20'">取消订单</button>
                <button class="blue" @click.stop="showPickupCode(o.extractCode)">查看取货码</button>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
      <div class="nomore" v-show="showNomore">没有更多了</div>
    </div>
    <obs-pickupcode @hidePop="hidePop" :pickup-code="extractCode" :is-show="isShowCode"></obs-pickupcode>
  </div>
</template>
<style lang="less" scoped>
@import '../../styles/mixin.less';
.page {
  height: 100%;
  padding-top: 44px;
  cursor: pointer;
  background-color: #eeeef3;
  .orderlist-wrapper {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    .nomore {
      height: 30px;
      line-height: 30px;
      background-color: #f8f8f8;
      text-align: center;
    }
    .orderlist {
      li {
        background-color: #fff;
        padding-top: 14px;
        margin-bottom: 10px;
        .item {
          .title {
            padding: 0 14px;
            display: flex;
            span {
              flex: 1;
              display: inline-block;
              color: #333;
              font-size: 13px;
              &.cabname {
                text-align: left;
                background-image: url(./img/icon-kmyg@2x.png);
                background-repeat: no-repeat;
                background-size: 15px 13px;
                padding-left: 20px;
                background-position: left 2px;
              }
              &.status {
                text-align: right;
                color: #f75858;
              }
            }
          }
          .address {
            margin-top: 17px;
            padding: 0 14px;
            display: flex;
            .text {
              flex: 1;
              font-size: 12px;
              color: #333;
            }
            .nav-wrapper {
              flex: 0 1 1;
              width: 97px;
              text-align: right;
              .distance {
                text-align: right;
                font-size: 11px;
              }
              .nav {
                display: inline-block;
                font-size: 11px;
                width: 71px;
                height: 18px;
                line-height: 16px;
                border: 1px solid #333;
                border-radius: 2px;
                text-align: center;
                background-image: url(./img/icon-bxdh@2x.png);
                background-repeat: no-repeat;
                background-size: 11px;
                background-position: 6px 4px;
                padding-left: 18px;
                white-space: nowrap;
              }
            }
          }
          .main {
            margin-top: 11px;
            .border-1px(#e0e0e0);
            .orderinfos {
              padding-left: 14px;
              height: 80px;
              background-color: #fafafa;
              display: flex;
              align-items: center;
              margin-top: 5px;
              .prd-img-wrapper {
                flex: 0 1 1;
                width: 70px;
                height: 70px;
                background-color: #fff;
              }
              .prd-desc {
                flex: 1;
                padding: 0 14px;
                line-height: 28px;
                div {
                  color: #333;
                  font-size: 14px;
                  display: flex;
                  &:last-child {
                    font-size: 12px;
                    color: #666;
                  }
                  span {
                    flex: 1;
                    &.left {
                      text-align: left;
                    }
                    &.right {
                      text-align: right;
                    }
                  }
                }
              }
            }
            .orderprice {
              padding: 0 14px;
              line-height: 35px;
              text-align: right;
            }
          }
          .actions {
            padding: 12px 14px;
            text-align: right;
            button {
              display: inline-block;
              border: solid 1px #f75858;
              border-radius: 5px;
              height: 30px;
              line-height: 30px;
              color: #f75858;
              padding: 0 16px;
              &.blue {
                color: @green-color;
                border-color: @green-color;
              }
            }
          }
        }
      }
    }
  }
}

</style>
<script>
import { MessageBox, Indicator, Loadmore, Toast } from 'mint-ui';
import java from '@/utils/javaApiRequest';
import { openMap } from '@/api/coordinate';
import pickupcode from '@/components/pickupCode/index';
import distanceTime from '@/components/distanceTime/index';
export default {
  data() {
    return {
      allLoaded: false,
      bottomText: '下拉加载更多',
      page: 0,
      showNomore: false,
      orders: [],
      orderStatus: {
        '0': '已取消',
        '10': '待付款',
        '20': '待发货',
        '30': '待收货',
        '40': '交易成功',
        '50': '已退款',
        '60': '部分退款',
        '70': '退款中',
        '80': '待评价'
      },
      isShowCode: false,
      extractCode: ''
    };
  },
  components: {
    'mt-loadmore': Loadmore,
    'obs-pickupcode': pickupcode,
    'obs-distancetime': distanceTime
  },
  methods: {
    loadTop() {
      this.orders = [];
      this.search({ page: 0 }).then((res) => {
        this.$refs.loadmore.onTopLoaded();
      });
    },
    loadBottom() {
      this.more().then((res) => {
        this.$refs.loadmore.onBottomLoaded();
      });
    },
    async more() {
      this.page = this.page + 1;
      await this.search({ page: this.page });
    },
    navigate(seller) {
      openMap(seller.latitude, seller.longitude, seller.sellerName, seller.sellerAddress);
    },
    search(conditions) {
      let url = '/mall/order/queryByUser';
      let data = {
        'pageNum': conditions.page,
        'pageSize': '10',
        'orderTransport': '3'
      };
      return java.post(url, data).then((res) => {
        if (res && res.status === 200 && res.data && String(res.data.resultCode) === '0') {
          let total = res.data.resultData.total;
          let hasMore = total !== this.orders.length && total > 0;
          if (hasMore) {
            this.orders = this.orders.concat(res.data.resultData.data);
          }
          this.isHaveMore(hasMore);
          this.$nextTick(function() {
            this.scrollMode = 'touch';
          });
        }
      });
    },
    isHaveMore(isHaveMore) {
      this.allLoaded = true;
      this.showNomore = true;
      if (isHaveMore) {
        this.allLoaded = false;
        this.showNomore = false;
      }
    },
    cancelOrder(orderId) {
      let url = '/mall/order/cancelOrderByUser';
      let data = {
        orderId: orderId
      };
      MessageBox.confirm('确定要取消吗？', '提示').then(() => {
        Indicator.open();
        java.post(url, data).then((res) => {
          Toast({
            message: res.data.msg,
            iconClass: 'icon icon-success',
            duration: 1000
          });
          this.orders = [];
          this.search({ page: 0 }).then(() => {
            Indicator.close();
          });
        });
      }, () => {});
    },
    showPickupCode(extractCode) {
      this.extractCode = String(extractCode);
      this.isShowCode = true;
      // document.addEventListener('click', () => {
      //   this.isShowCode = false;
      // }, false);
    },
    getGoodsTotal(orderDetail) {
      let total = 0;
      for (let i = 0; i < orderDetail.length; i++) {
        let quantity = orderDetail[i]['quantity'];
        if (!Number.isNaN(Number(quantity))) {
          total += Number(quantity);
        }
      }
      return total;
    },
    getAddress(address) {
      if (address) {
        return address.addressProvince + address.addressCity + address.addressDistrict + address.addressDetail;
      }
      return '';
    },
    hidePop(msg) {
      this.isShowCode = msg;
    }
  },
  mounted() {
    this.search({ page: 0 });
  }
};

</script>

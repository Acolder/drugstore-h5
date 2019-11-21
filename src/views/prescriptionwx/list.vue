<template>
  <div class="has-header prescription-body" :class="{'pre-body-white': noData}">
    <mt-header fixed title="处方订单">
      <!-- <router-link to="/myCenter/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link> -->
    </mt-header>
    <div class="load-more-container" :style="{ '-webkit-overflow-scrolling': scrollMode }">
      <div class="nav-bar">
        <div class="menu-item" v-for="(menu, index) in menus" :key="index" :class="{active:activeId===menu.id}" @click="menuClick(menu)">
          {{ menu.name }}
        </div>
      </div>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <div class="list-container">
          <!--全部-->
          <ul class="order-list">
            <li v-for="order in allOrderData" :key="order.order_id">
              <!--待确认-->
              <div v-if="order.status === 5">
                <div class="status clearfix">
                  <span class="left">{{ order.create_time }} <span style="color:red;">（有效期24小时）</span> </span>
                  <span class="status-name">{{ order.statusname }}</span>
                </div>
                <!--拍方抓药-->
                <div class="detail" v-if="Number(order.order_type) === 1">
                  <p>
                    拍方抓药：审核通过
                  </p>
                  <p>抓药清单：
                    <span v-for="(herb, herbIndex) in order.docprescriptions[0].docprescriptiondetails" :key="herbIndex">
                      {{ herb.medicines }} {{ herb.dose }} {{ herb.unit }} {{ herb.m_usage }}
                    </span>
                  </p>
                </div>
                <!--普通下单-->
                <div class="detail" v-else>
                  <p>
                    <span class="name">就诊人：{{ order.docprescriptions[0].username }}</span>
                    <span class="name">开方医生：{{ order.real_name }}</span>
                  </p>
                  <p>诊断：{{ order.diagnosis }}</p>
                </div>
                <div class="footer clearfix">
                  <span>订单金额&nbsp;&nbsp;合计: &yen; {{ order.order_price }}</span>
                  <button class="btn to-confirm right" @click="confirmOrder(order.order_id)">确认处方</button>
                  <button class="btn to-detail right" @click="gotoDetail(order.order_id)">查看订单</button>
                </div>
              </div>
              <!--已确认（待收货）-->
              <div v-if="order.status === 10 || order.status === 15">
                <div class="status clearfix">
                  <span class="left">{{ order.create_time }}</span>
                  <span class="status-name">{{ order.statusname }}</span>
                </div>
                <!--拍方抓药-->
                <div class="detail" v-if="Number(order.order_type) === 1">
                  <p>
                    拍方抓药
                  </p>
                  <p>抓药清单：
                    <span v-for="(herb, herbIndex) in order.docprescriptions[0].docprescriptiondetails" :key="herbIndex">
                      {{ herb.medicines }} {{ herb.dose }} {{ herb.unit }} {{ herb.m_usage }}
                    </span>
                  </p>
                </div>
                <div class="detail" v-else>
                  <p>
                    <span class="name">就诊人：{{ order.docprescriptions[0].username }}</span>
                    <span class="name">开方医生：{{ order.real_name }}</span>
                  </p>
                  <p>诊断：{{ order.diagnosis }}</p>
                </div>
                <div class="footer clearfix">
                  <span>订单金额&nbsp;&nbsp;合计: &yen; {{ order.order_price }}</span>
                  <button class="btn to-logistics right" @click="checkCode(order.extractcode)">查看取货码</button>
                  <button class="btn to-detail right" @click="gotoDetail(order.order_id)">查看订单</button>
                </div>
              </div>
              <!--待审核-->
              <div v-if="order.status === 0">
                <div class="status clearfix">
                  <span class="left">{{ order.create_time }}</span>
                  <span class="status-name">{{ order.statusname }}</span>
                </div>
                <div class="detail">
                  <p>
                    拍方抓药：处方待医生审核
                  </p>
                </div>
                <div class="footer clearfix">
                  <button class="btn to-cancel right" @click="cancelOrder(order.order_id)">取消订单</button>
                </div>
              </div>
              <!--已取消-->
              <div v-if="order.status === 97 || order.status === 102 || order.status === 99 || order.status === 101">
                <div class="status clearfix">
                  <span class="left">{{ order.create_time }}</span>
                  <span class="status-name">{{ order.statusname }}</span>
                </div>
                <!--拍方抓药-->
                <div class="detail" v-if="Number(order.order_type) === 1">
                  <p>
                    拍方抓药
                  </p>
                  <p>抓药清单：
                    <span v-for="(herb, herbIndex) in order.docprescriptions[0].docprescriptiondetails" :key="herbIndex">
                      {{ herb.medicines }} {{ herb.dose }} {{ herb.unit }} {{ herb.m_usage }}
                    </span>
                  </p>
                </div>
                <div class="detail" v-else>
                  <p>
                    <span class="name">就诊人：{{ order.docprescriptions[0].username }}</span>
                    <span class="name">开方医生：{{ order.real_name }}</span>
                  </p>
                  <p>诊断：{{ order.diagnosis }}</p>
                </div>
                <div class="footer clearfix">
                  <span>订单金额&nbsp;&nbsp;合计: &yen; {{ order.order_price }}</span>
                  <button class="btn to-detail right" @click="gotoDetail(order.order_id)">查看订单</button>
                </div>
              </div>
              <!--已完成-->
              <div v-if="order.status === 20">
                <div class="status clearfix">
                  <span class="left">{{ order.create_time }}</span>
                  <span class="status-name">{{ order.statusname }}</span>
                </div>
                <!--拍方抓药-->
                <div class="detail" v-if="Number(order.order_type) === 1">
                  <p>
                    拍方抓药
                  </p>
                  <p>抓药清单：
                    <span v-for="(herb, herbIndex) in order.docprescriptions[0].docprescriptiondetails" :key="herbIndex">
                      {{ herb.medicines }} {{ herb.dose }} {{ herb.unit }} {{ herb.m_usage }}
                    </span>
                  </p>
                </div>
                <div class="detail" v-else>
                  <p>
                    <span class="name">就诊人：{{ order.docprescriptions[0].username }}</span>
                    <span class="name">开方医生：{{ order.real_name }}</span>
                  </p>
                  <p>诊断：{{ order.diagnosis }}</p>
                </div>
                <div class="footer clearfix">
                  <span>订单金额&nbsp;&nbsp;合计: &yen; {{ order.order_price }}</span>
                  <button class="btn to-detail right" @click="gotoDetail(order.order_id)">查看订单</button>
                </div>
              </div>
              <!--审核失败-->
              <div v-if="order.status === 98 || order.status === 100">
                <div class="status clearfix">
                  <span class="left">{{ order.create_time }}</span>
                  <span class="status-name">审核未通过</span>
                </div>
                <div class="detail">
                  <p>
                    拍方抓药：审核未通过
                  </p>
                </div>
                <div class="footer clearfix">
                  <span>订单金额&nbsp;&nbsp;合计: &yen; {{ order.order_price }}</span>
                  <button class="btn to-detail right" @click="gotoDetail(order.order_id)">查看订单</button>
                </div>
              </div>
              <!--待医网签-->
              <div v-if="order.status === 6">
                <div class="status clearfix">
                  <span class="left">{{ order.create_time }}</span>
                  <span class="status-name">{{ order.statusname }}</span>
                </div>
                <!--拍方抓药-->
                <div class="detail" v-if="Number(order.order_type) === 1">
                  <p>
                    拍方抓药
                  </p>
                  <p>抓药清单：
                    <span v-for="(herb, herbIndex) in order.docprescriptions[0].docprescriptiondetails" :key="herbIndex">
                      {{ herb.medicines }} {{ herb.dose }} {{ herb.unit }} {{ herb.m_usage }}
                    </span>
                  </p>
                </div>
                <div class="detail" v-else>
                  <p>
                    <span class="name">就诊人：{{ order.docprescriptions[0].username }}</span>
                    <span class="name">开方医生：{{ order.real_name }}</span>
                  </p>
                  <p>诊断：{{ order.diagnosis }}</p>
                </div>
                <div class="footer clearfix">
                  <span>订单金额&nbsp;&nbsp;合计: &yen; {{ order.order_price }}</span>
                  <button class="btn to-detail right" @click="gotoDetail(order.order_id)">查看订单</button>
                </div>
              </div>
              <!--已过期-->
              <div v-if="order.status === 104">
                <div class="status clearfix">
                  <span class="left">{{ order.create_time }}</span>
                  <span class="status-name">已过期</span>
                </div>
                <!--拍方抓药-->
                <div class="detail" v-if="Number(order.order_type) === 1">
                  <p>
                    拍方抓药
                  </p>
                  <p>抓药清单：
                    <span v-for="(herb, herbIndex) in order.docprescriptions[0].docprescriptiondetails" :key="herbIndex">
                      {{ herb.medicines }} {{ herb.dose }} {{ herb.unit }} {{ herb.m_usage }}
                    </span>
                  </p>
                </div>
                <div class="detail" v-else>
                  <p>
                    <span class="name">就诊人：{{ order.docprescriptions[0].username }}</span>
                    <span class="name">开方医生：{{ order.real_name }}</span>
                  </p>
                  <p>诊断：{{ order.diagnosis }}</p>
                </div>
                <div class="footer clearfix">
                  <span>订单金额&nbsp;&nbsp;合计: &yen; {{ order.order_price }}</span>
                  <button class="btn to-detail right" @click="gotoDetail(order.order_id)">查看订单</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </mt-loadmore>
      <div class="no-more" v-show="showNomore">没有更多了</div>
      <div class="no-data" v-show="noData">
        <img src="./img/icon_order@2x.png" /><br/>暂无订单
      </div>
    </div>
    <v-pickup-code @hidePop="hidePop" :pickup-code="codeTxt" :is-show="showCode"></v-pickup-code>
  </div>
</template>

<script>
import  { Header, Button, Loadmore, Indicator, MessageBox } from 'mint-ui';
import ajax from '@/utils/ajax';
import docAjax from '@/utils/doctorAjax';
import wxjs from '@/utils/wxjsInterface';
import { weixinLogin } from '@/api/user';
import { getQueryString } from '@/utils/index';
import pickupCode from '@/components/pickupCode/index.vue';
export default {
  data() {
    return {
      // 微信js sdk 实例对象
      wx: null,
      // 请求返回的微信config对象
      wxResponseConfig: {},
      activeId: 1, // tab选中项
      userId: '', // userId
      allOrderData: [], // 全部订单数据
      dataStatus: 'data_all', // 请求订单状态
      menus: [
        { name: '全部', status: 'data_all', id: 1 },
        { name: '待确认', status: 'data_not_confirm', id: 2 },
        { name: '已确认', status: 'data_confirmed', id: 3 },
        { name: '审核失败', status: 'data_audit_fail', id: 4 },
        { name: '已取消', status: 'data_cancled', id: 5 }],
      // 上拉下拉数据参数
      allLoaded: false, // 是否全部加载完
      scrollMode: 'auto', // 滑动方式
      pageNum: 1, // 页码
      bottomText: '上拉加载更多...',
      showNomore: false, // 没有更多
      noData: false, // 没有订单数据
      codeTxt: '',
    };
  },
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-loadmore': Loadmore,
    'v-pickup-code': pickupCode,
  },
  methods: {
    menuClick(menu) {
      this.dataStatus = menu.status;
      this.activeId = menu.id;
      this.allOrderData = [];
      this.pageNum = 1;
      Indicator.open();
      this.getPrescription();
    },
    getStatus() {
      let urlActiveId = Number(getQueryString('activeId'));
      if (urlActiveId) {
        this.activeId = Number(urlActiveId);
      }
      switch (urlActiveId) {
        case 1:
          this.dataStatus = 'data_all';
          break;
        case 2:
          this.dataStatus = 'data_not_confirm';
          break;
        case 3:
          this.dataStatus = 'data_confirmed';
          break;
        case 5:
          this.dataStatus = 'data_cancled';
          break;
      }
    },
    // 获取处方列表
    getPrescription() {
      let unionId = this.wxResponseConfig.unionid;
      if (!!unionId === false) {
        return false;
      }
      return ajax.post('/api/user/getwxpatientorderlist', {
        unionId: unionId,
        status: this.dataStatus,
        pageIndex: this.pageNum,
        pageSize: 10
      }).then(resp => {
        Indicator.close();
        if (resp.status === 200 && resp.data.code === 0) {
          let totalCount = resp.data.recordscount; // 数据总条数
          let hasMore = totalCount !== this.allOrderData.length && totalCount > 0;
          let noAnyData = totalCount === 0;
          if (hasMore) {
            this.allOrderData = this.allOrderData.concat(resp.data.data);
          }
          this.isHaveMore(hasMore, noAnyData);
          this.$nextTick(function() {
            this.scrollMode = 'touch';
          });
        }
      });
    },
    // 下拉刷新
    loadTop: function() {
      this.allOrderData = [];
      this.pageNum = 1;
      this.getPrescription().then(() => {
        this.$refs.loadmore.onTopLoaded();
      });
    },
    // 上拉加载
    loadBottom: function() {
      this.pageNum = this.pageNum + 1;
      this.getPrescription();
      this.$refs.loadmore.onBottomLoaded();
    },
    isHaveMore(isHaveMore, noAnyData) {
      this.allLoaded = true;
      this.showNomore = true;
      if (isHaveMore) {
        this.allLoaded = false;
        this.showNomore = false;
        this.noData = false;
      }
      if (noAnyData) {
        this.showNomore = false;
        this.noData = true;
      }
    },
    // 跳转订单详情
    gotoDetail(orderId) {
      // this.$router.push({
      //   path: '/prescriptionwx/detail', query: { orderId: orderId }
      // });
      window.location.href = `${process.env.WEB_HOST}/prescriptionwx/detail?orderId=${orderId}`;
    },
    // 确认处方
    confirmOrder(orderId) {
      this.$router.push({
        path: '/prescriptionwx/buy',
        query: {
          order_id: orderId
        }
      });
    },
    cancelOrder(order_id) {
      MessageBox.prompt('确定要取消吗？如果是请输入取消理由', '取消处方').then(({ value, action }) => {
        Indicator.open();
        let url = '/api/order/cancleOrder';
        let params = {
          orderId: order_id,
          cancleRemark: value || ''
        };
        docAjax.post(url, params).then((res) => {
          Indicator.close();
          this.$router.go(0);
        });
      }, () => {});
    },
    wxjsInterfaceInit() {
      let _self = this;
      let code = getQueryString('code');
      if (code) {
        wxjs.init(code).then(rs => {
          if (rs) {
            _self.wx = rs.wx;
            _self.wxResponseConfig = rs.wxconfig;
            let unionId = rs.wxconfig.unionid;
            if (unionId) {
              sessionStorage.setItem('wxUnionId', unionId);
              weixinLogin(unionId).then(() => {
                _self.getPrescription();
              });
            } else {
              MessageBox.confirm('微信unionId获取失败，是否重试？', '提示').then(() => {
                _self.$router.push('/prescriptionwx/redirect');
              });
            }
          } else {
            _self.noData = true;
            _self.showNomore = false;
          }
        });
      } else {
        MessageBox.confirm('微信Code获取失败，是否重试？', '提示').then(() => {
          _self.$router.push('/prescriptionwx/redirect');
        });
      }
    },
    // 查看取货码
    checkCode(code) {
      this.codeTxt = code;
      this.showCode = true;
    },
    // 隐藏取货码弹窗
    hidePop(msg) {
      this.showCode = msg;
    }
  },
  mounted() {
    this.getStatus();
  },
  created() {
    this.wxjsInterfaceInit();
  }
};
</script>

<style lang="less" scoped>
   @import "../../styles/mixin.less";
   @background-color-e5: #e5e5e5;
   @border-bottom: solid 1px #e0e0e0;
   @color66: #666;
   @color87: #878787;
   @color6a: #6a6a6a;
   @color33: #333;
   @colorD3: #0ccdd3;
   @colorF4c: #ff4c56;
   @colorFae: #ffae00;
  .prescription-body {
    height: 100%;
    background: #eeeef3;
    &.pre-body-white {
      background: #fff;
    }
  }
  .nav-bar {
    position: fixed;
    width: 100%;
    top: 44px;
    z-index: 5;
    left: 0;
    right: 0;
    border-bottom: solid 1px #eeeef3;
    display: flex;
    background: @white-color;
  }
  .menu-item {
    position: relative;
    padding: 17px 0;
    flex: 1;
    font-size: 16px;
    text-align: center;
    &.active {
      color: @colorD3;
      &:after {
        position: absolute;
        bottom: 0;
        left: 10%;
        content: ' ';
        width: 80%;
        height: 2px;
        background: @colorD3;
        display: block;
      }
    }
  }
  .order-list {
    li {
      background: #fff;
      margin-bottom: 15px;
      font-size: 15px;
      color: @color66;
      .status {
        text-align: right;
        padding: 10px 0;
        border-bottom: @border-bottom;
        font-size: 14px;
        margin: 0 10px;
        .order-tobeConfirmed {
          color: @colorF4c;
          font-size: 16px;
        }
        .order-hasConfirmed {
          color: @color33;
          font-size: 16px;
        }
        .order-hasCancelled {
          font-size: 16px;
        }
        .status-name {
          color: @colorF4c;
          font-size: 16px;
        }
      }
      .detail {
        padding: 10px;
        border-bottom: @border-bottom;
        p {
          margin: 5px 0;
        }
        .name {
          &:first-child {
            margin-right: 20px;
          }
        }
      }
      .footer {
        padding: 10px;
        line-height: 30px;
      }
      .btn {
        padding: 5px;
        border-radius: 3px;
        &.to-detail {
          color: @colorD3;
          border: solid 1px @colorD3;
        }
        &.to-confirm {
          color: @colorF4c;
          border: solid 1px @colorF4c;
          margin-left: 10px;
        }
        &.to-logistics {
          color: @colorFae;
          border: solid 1px @colorFae;
          margin-left: 10px;
        }
        &.to-cancel {
          color: #333;
          border: solid 1px #999;
        }
      }
    }
  }
  .load-more-container {
    overflow-y: scroll;
    height: 100%;
    padding-top: 51px;
  }
  .no-more {
    height: 30px;
    line-height: 30px;
    background-color: #f8f8f8;
    text-align: center;
  }
  .no-data {
    width: 100%;
    height: 100%;
    text-align: center;
    background: #fff;
    border-top: solid 2px #eeeef3;
    padding-top: 25%;
    font-size: 16px;
    color: @color66;
    img {
      width: 100%;
      // margin-left: -7%;
      margin-bottom: 15px;
    }
  }
  /*.mint-tab-container {*/
    /*height: 100%;*/
    /*overflow-y: scroll;*/
    /*overflow-x: hidden;*/
    /*width: 100%;*/
  /*}*/
  /*.mint-tab-container-wrap {*/
    /*overflow-x: hidden;*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
</style>

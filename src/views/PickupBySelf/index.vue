<template>
  <div class="page">
    <mt-header fixed title="自提取货订单">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="orders-list">
      <div class="order">
        <div class="title">
          <span class="cabinet">康美药柜AA</span>
          <span class="status">待取货</span>
        </div>
        <div class="address">
          <div class="text">
            地址：广东省揭阳市普宁流沙长春路南侧康美药业 一楼左侧
          </div>
          <div class="nav">
            <div class="distance">800m | 10分钟</div>
            <div class="nav-button">步行导航</div>
          </div>
        </div>
        <div class="numbers"></div>
        <div class="price"></div>
        <div class="operations">
          <span class="cancel"></span>
          <span class="view"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.page {
  padding-top: 44px;
  .orders-list {
    .order {
      .title {
        display: flex;
        padding: 0 10px;
        margin: 16px 0;
        span {
          flex: 1;
          font-size: 13px;
        }
        .cabinet {
          text-align: left;
          color: #333;
        }
        .status {
          text-align: right;
          color: #f75858;
        }
      }
      .address {
        display: flex;
        padding: 0 10px;
        .text {
          flex: 1
        }
        .nav {
          width: 12em;
          flex: 0 1 1;
          font-size: 11px;
          color: #333;
          .distance {}
          .nav-button {
            height: 70px;
            width: 17px;
            border-radius: 2px;
          }
        }
      }
      .numbers {
        background-color: #fafafa;
      }
    }
  }
}

</style>

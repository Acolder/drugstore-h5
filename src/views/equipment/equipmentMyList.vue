<template>
<div class="equipmentMyList">
  <mt-header title="我的租赁">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    <!-- <mt-button icon="back" slot="left" @click="back"></mt-button> -->
  </mt-header>
  <div  class="equipmentMyListMain">
    <div class="login" v-if="login">
      <div @click="gologin">立即登录</div>
    </div>
    <div v-else>
      <div v-if="listData.length>0">
        <div class="list-item" v-for="item in listData" :key='item.index' @click="details(item)">
          <div>{{item.created_time}}</div>
          <div class="txtgreen" v-if="item.order_status === -1">已取消</div>
          <div class="txtgreen" v-if="item.order_status === 0">待支付</div>
          <div class="txtgreen" v-if="item.order_status === 1">待发货</div>
          <div class="txtgreen" v-if="item.order_status === 2">待签收</div>
          <div class="txtgreen" v-if="item.order_status === 3">使用中</div>
          <div class="txtgreen" v-if="item.order_status === 4">归还中</div>
          <div class="txtgreen" v-if="item.order_status === 5">已归还</div>
        </div>
      </div>
      <div v-else class="no-data">
        <img src="./imgs/xh_qs_wdw.png" alt="">
        <p>您还没有过脉诊仪借还快去借用一台吧~</p>
        <div @click="immediately">立即租借</div>
      </div>
    </div>
  </div>
  <mt-tabbar v-model="curTab" class="primary-nav">
    <mt-tab-item id="lease" href="/equipment/equipmentLease">
      <img slot="icon" width="25" height="21" src="./imgs/icon_p_zl.png" alt="租赁" v-if="curTab==='lease'">
      <img slot="icon" width="25" height="21" src="./imgs/icon_n_zl.png" alt="租赁" v-else>
      租赁
    </mt-tab-item>
    <mt-tab-item id="still" href="/equipment/equipmentReturn">
      <img slot="icon" width="25" height="21" src="./imgs/icon_p_gh.png" alt="租赁" v-if="curTab==='still'">
      <img slot="icon" width="25" height="21" src="./imgs/icon_n_gh.png" alt="租赁" v-else>
      归还
    </mt-tab-item>
    <mt-tab-item id="my" href="/equipment/equipmentMyList">
      <img slot="icon" width="25" height="21" src="./imgs/icon_p_wd.png" alt="租赁" v-if="curTab==='my'">
      <img slot="icon" width="25" height="21" src="./imgs/icon_n_wd.png" alt="租赁" v-else>
      我的
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      curTab: 'my',
      login: false,
      queryInfo: {
        PageIndex: '1',
        PageSize: '999',
        account: sessionStorage.getItem('MyEquipmentMobile'),
        status: '',
      },
      total: '',
      listData: [],
    };
  },
  methods: {
    back() {
      this.$router.push('/equipment/index');
    },
    // 我的租借列表数据
    getListData() {
      ajax.post(`/api/borrow/GetUserBorrowOrderList`, this.queryInfo).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          this.listData = res.data.data.data;
          this.total = res.data.data.rcount;
        } else if (res.status === 200 && res.data.code === -1) {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 1500
          });
          // this.$router.push('/equipment/login');
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 1500
          });
        }
      });
    },
    // 详情
    details(item) {
      let id = item.id;
      let user = item.borrow_account;
      this.$router.push('/equipment/equipmentMyListDetails?user=' + user + '&id=' + id);
    },
    // 立即租借
    immediately() {
      this.$router.push('/equipment/equipmentLease');
    },
    // 立即登录
    gologin() {
      this.$router.push('/equipment/login');
    }
  },
  created() {
    if (!sessionStorage.getItem('MyEquipmentMobile')) {
      Toast({
        message: '未登录，请先登录',
        position: 'middle',
        duration: 1500
      });
      this.login = true;
    } else {
      this.getListData();
    }
  }
};
</script>

<style lang="less" scoped>
 @import '../../styles/mixin.less';
.equipmentMyList{
  padding-top: 0.1px;
  height: 100%;
  .login{
    margin: 0 auto;
    margin-top: 200px;
    width: 130px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 20px;
    border: solid 1px #0ccdd3;
    color: #0ccdd3;
  }
  .primary-nav{
    position: fixed;
    height: 48px;
    border-top: solid 1px #e6e6e6;
    .mint-tab-item{
      padding: 4px 0;
    }
    .mint-tab-item:hover,.mint-tab-item.is-selected {
      color: @green-color !important;
    }
    .is-selected{
      background: #fff;
    }
  }
  .equipmentMyListMain{
    position: absolute;
    left: 0px;
    right: 0px;
    top: 44px;
    bottom: 48px;
    overflow: auto;
  }
  .list-item{
    height: 44px;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    color: #333333;
    >:last-child{
      color: #999999;
    }
    .txtgreen{
      color: #0ccdd3;
    }
  }
  .no-data{
    padding-top: 80px;
    img{
      display: block;
      margin: 0 auto;
      width: 195px;
      height: 182.5px;
    }
    p{
      color: #666666;
      font-size: 14px;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    div{
      margin: 0 auto;
      width: 130px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 20px;
      border: solid 1px #0ccdd3;
      color: #0ccdd3;
    }
  }
}
</style>
<template>
  <div class="page">
    <mt-header fixed title="地址管理">
      <a slot="left" href="javascript:;" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="button-manage" @click.stop="manage()">管理</div>
    <div class="address-list">
      <div class="address-item" v-for="a in addresses" :key="a.addressId">
        <div class="name-phone">
          <span class="name">{{a.addressName}}</span>
          <span class="phone">{{a.addressPhone}}</span>
        </div>
        <div class="address">
          收货地址：{{a.addressProvince+a.addressCity+a.addressDistrict+a.addressDetail+a.addressNum}}
        </div>
      </div>
    </div>
    <div class="address-addOne" @click="addOne">
      添加新地址
    </div>
  </div>
</template>
<script>
import java from '@/utils/javaApiRequest';
import { getToken } from '@/utils/auth';
import { Toast } from 'mint-ui';
import { goLogin } from '@/api/user';
export default {
  data() {
    return {
      addresses: [],
      defaultId: '1',
      from: ''
    };
  },
  methods: {
    getAddress() {
      java.post('/mall/address/queryAddress', { userToken: getToken() }).then((res) => {
        if (res.data && String(res.data.resultCode) === '0') {
          this.addresses = res.data.resultData;
        } else if (String(res.data.resultCode) === '-2') {
          Toast('用户未登录，请重新登录');
          goLogin();
        }
      });
    },
    addOne(evt) {
      this.$router.push({
        path: '/addressMgr/edit',
        query: { isEdit: false, from: this.from }
      });
    },
    manage() {
      this.$router.push({
        path: '/addressMgr',
        query: { from: this.from }
      });
    }
  },
  mounted() {
    this.from = this.$route.query.from || '';
    this.getAddress();
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';
.page {
  background-color: #e0e0e0;
  min-height: 100%;
  padding-top: 44px;
  .button-manage {
    position: fixed;
    right: 13px;
    top: 14px;
    color: @green-color;
    font-size: 16px;
    line-height: 1em;
    z-index: 2;
  }
  .address-list {
    .address-item {
      margin-bottom: 10px;
      background-color: #fff;
      .name-phone {
        padding: 10px 10px 0 10px;
        display: flex;
        font-size: 15px;
        .name {
          flex: 1;
          text-align: left;
        }
        .phone {
          flex: 1;
          text-align: right;
        }
      }
      .address {
        padding: 0 10px 10px 10px;
        .border-1px(#e0e0e0);
      }
    }
  }
  .address-addOne {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 44px;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f75858;
  }
}

</style>

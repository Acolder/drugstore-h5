<template>
  <div class="page">
    <mt-header fixed title="地址管理">
      <a slot="left" href="javascript:;" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="address-list" :class="{empty: isEmpty}">
      <div class="empty_content" v-show="isEmpty">
        <img src="./img/icon_pla_queshengadd@2x.png" alt="">
        <h2 class="empty_desc">暂无收货地址~</h2>
        <button @click.stop="addOne" class="add_new_addr" v-show="isEmpty">
          新增地址
        </button>
      </div>
      <div class="address-item" v-for="a in addresses" :key="a.addressId">
        <div class="name-phone">
          <span class="name">{{a.addressName}}</span>
          <span class="phone">{{a.addressPhone}}</span>
        </div>
        <div class="address">
          收货地址：{{a.addressProvince+a.addressCity+a.addressDistrict+a.addressDetail+a.addressNum}}
        </div>
        <div class="operations">
          <div class="set-default-wrapper">
            <span class="set-default" :class="{active:a.addressChecked==='1'}" @click.stop="setDefault(a)">
            设为默认
            </span>
          </div>
          <div class="edit-delete">
            <span class="edit" @click.stop="edit(a)">编辑</span>
            <span class="delete" @click.stop="del(a)">删除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="address-addOne" @click="addOne" v-show="!isEmpty">
      添加新地址
    </div>
  </div>
</template>
<script>
import { MessageBox, Toast, Indicator } from 'mint-ui';
import java from '@/utils/javaApiRequest';
import { getToken } from '@/utils/auth';
import { goLogin } from '@/api/user';
export default {
  data() {
    return {
      addresses: [],
      defaultId: '',
      from: '',
      allLoaded: false,
      bottomText: '上拉加载更多'
    };
  },
  computed: {
    isEmpty() {
      return !this.addresses || this.addresses.length === 0;
    }
  },
  methods: {
    getAddress() {
      // let cpath = this.$route.fullPath;
      return java.post('/mall/address/queryAddress', { userToken: getToken() }).then((res) => {
        if (res.data && String(res.data.resultCode) === '0') {
          this.addresses = res.data.resultData;
        } else if (String(res.data.resultCode) === '-2') {
          Toast('用户未登录，请重新登录');
          goLogin();
          /**
          sessionStorage.setItem('returnUrl', cpath);
          this.$router.replace({
            path: '/login'
          });
          **/
        }
      });
    },
    edit(a) {
      sessionStorage.setItem('edit_address', JSON.stringify(a));
      if (this.from) {
        this.$router.replace({
          path: '/addressMgr/edit',
          query: { isEdit: 1, from: this.from }
        });
      } else {
        this.$router.push({
          path: '/addressMgr/edit',
          query: { isEdit: 1, from: this.from }
        });
      }
    },
    del(a) {
      MessageBox.confirm('确定要删除吗？', '提示').then(() => {
        Indicator.open();
        let storageAddress = JSON.parse(sessionStorage.getItem('selectedAddress'));
        java.post('/mall/address/delAddress', { 'addressId': a.addressId, 'userToken': getToken() }).then((res) => {
          Toast({
            message: res.data.msg,
            iconClass: 'icon icon-success',
            duration: 1000
          });
          if (storageAddress && storageAddress.addressId === a.addressId) {
            sessionStorage.removeItem('selectedAddress');
          }
          this.getAddress().then(() => {
            Indicator.close();
          });
        });
      }, () => {});
    },
    setDefault(a) {
      Indicator.open();
      let checked = '1';
      if (String(a.addressChecked) === '1') {
        checked = '0';
      }
      java.post('/mall/address/updateAddreesChecked', { 'userToken': getToken(), 'addressId': a.addressId, 'addressChecked': checked }).then((res) => {
        if (res.data && String(res.data.resultCode) === '0') {
          this.getAddress().then(() => {
            Indicator.close();
          });
        }
      });
    },
    addOne(evt) {
      if (this.from) {
        this.$router.replace({
          path: '/addressMgr/edit',
          query: { isEdit: 0, from: this.from }
        });
      } else {
        this.$router.push({
          path: '/addressMgr/edit',
          query: { isEdit: 0, from: this.from }
        });
      }
    }
  },
  mounted() {
    this.from = this.$route.query.from;
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
  padding-bottom: 66px;
  position: relative;

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

  .address-list {
    &.empty {
      background-color: #fff;
      width: 100%;
      position: absolute;
      top: 44px;
      bottom: 0;

      .empty_content {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        img {
          width: 125px;
          height: 125px;
        }

        .empty_desc {
          font-size: 13px;
          color: #8e8e8e;
          margin-bottom: 25px;
        }

        .add_new_addr {
          color: #0ccdd3;
          border: 1px solid #0ccdd3;
          width: 140px;
          height: 36px;
          border-radius: 18px;
        }
      }
    }

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

      .operations {
        display: flex;
        height: 32px;

        .set-default-wrapper {
          flex: 1;
          line-height: 32px;
          padding-left: 15px;

          .set-default {
            display: inline-block;
            height: 100%;
            background-image: url(./img/icon-n-swmrs.png);
            background-position: 0 45%;
            background-repeat: no-repeat;
            background-size: 15px;
            padding-left: 20px;

            &.active {
              background-image: url(./img/icon-p-swmrs.png);
            }
          }
        }

        .edit-delete {
          flex: 1;
          line-height: 32px;
          text-align: right;
          padding-right: 15px;
          font-size: 12px;
          color: #333;

          .edit {
            display: inline-block;
            height: 100%;
            background-image: url(./img/icon-bj.png);
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: 0 50%;
            padding-left: 20px;
            margin-right: 20px;
          }

          .delete {
            display: inline-block;
            height: 100%;
            background-image: url(./img/icon-sc.png);
            background-repeat: no-repeat;
            background-position: 0 50%;
            background-size: 15px;
            padding-left: 20px;
          }
        }
      }
    }
  }
}

</style>

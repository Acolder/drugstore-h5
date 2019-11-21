<template>
  <div id="drugstoreList">
    <!-- 歇业提示 -->
    <!-- <div class="drugstoreList_top">
      <span>店铺歇业中，无法下单</span>
    </div>-->
    <div class="drugstoreList_content">
      <!-- 头部 -->
      <div class="header">
        <a href="javascript:void(0);">
          <img src="./img/logo.jpg" alt="logo">
        </a>
        <span>康美大药房</span>
      </div>
      <!-- 搜索框 -->
      <!-- <div class="drugstore_search">
        <mt-search v-model="text" cancel-text="取消" placeholder="请输入门店名称或所在省、市、区县"></mt-search>
      </div>-->
      <search-input
        :placeholderTxt="'请输入门店名称或所在省、市、区县'"
        :position_fixed="false"
        :hasBack="false"
        @onSearch="searchAction"
      ></search-input>
      <!-- 药房门店列表 -->
      <ul class="drugstore_list" v-if="drugstoreListData.length > 0">
        <li v-for="(item,index) in drugstoreListData" :key="index">
          <!-- 店铺名称 -->
          <h2>店铺 : {{getFullShopName(item.shopName)}}</h2>
          <div class="drugstore_listContent">
            <div class="drugstore_listLeft">
              <!-- 门店图片 -->
              <div class="drugstore_img">
                <img :src="item.shopImage" alt="storePicture">
                <span></span>
              </div>
              <!-- 门店地址和营业时间 -->
              <div class="drugstore_address" @click="getMapLocation(item.id)">
                <h3>{{item.addr}}</h3>
                <p>营业时间：周一至周日,{{item.business}};</p>
              </div>
            </div>
            <!-- 门店电话 -->
            <div class="drugstore_listRight" @click="orderAction(item.tel)">
              <img src="./img/mobile@2x.png" alt="phone">
            </div>
          </div>
        </li>
      </ul>
      <!-- 空列表 -->
      <div class="drugstore_list drugstore_konglist" v-else-if="drugstoreListData.length == 0">
        <p>额哦，没有搜到门店～</p>
        <p>换个词搜搜吧</p>
      </div>
      <!-- 电话预约弹窗 -->
      <!-- <div class="phone_window" v-if="tel">
        <div class="phone_windowTop">{{tel}}</div>
        <div class="phone_windowBottom">
          <button @click="orderAction(tel)">预约</button>
          <button @click="clearOrderAction" class="right_btn">取消</button>
        </div>
      </div>-->
      <!-- 遮罩层 -->
      <!-- <div class="layer" v-if="isShow"></div> -->
      <!-- 底部 -->
      <!-- <div class="footer">
        <a href="javascript:void(0);">店铺主页</a>
        <a href="javascript:void(0);">个人中心</a>
        <a href="javascript:void(0);">关注我们</a>
        <a href="javascript:void(0);">线下门店</a>
        <a href="javascript:void(0);">店铺信息</a>
      </div>-->
    </div>
  </div>
</template>

<script>
import { shopData } from './js/shopData.js';
import searchInput from './../../components/search/searchInput';
export default {
  data() {
    return {
      newListData: [],
      drugstoreListData: [],
      text: '',
      isShow: false,
      tel: '',
    };
  },
  components: {
    'search-input': searchInput
  },
  methods: {
    // 跳转到地图
    getMapLocation(id) {
      location.href = `${process.env.WEB_HOST}/drugstore/shopMap?id=${id}`;
    },
    // 搜索门店
    searchAction(text) {
      this.text = text;
      this.isShow = false;
      this.drugstoreListData = this.newListData.data;
      if (this.text === '') {
        this.drugstoreListData = this.newListData.data;
      } else {
        let data = this.drugstoreListData.filter(item => {
          return ((this.getFullShopName(item.shopName).indexOf(this.text) > -1) || (item.region.indexOf(this.text) > -1) || (item.addr.indexOf(this.text) > -1));
        });
        this.text = '';
        this.drugstoreListData = data;
      }
    },
    // 取消搜索
    closeAction() {
      this.isShow = false;
      this.text = '';
    },
    // 监听input输入内容
    inputFunc() {
      this.isShow = true;
      if (this.text === '') {
        this.isShow = false;
      }
    },
    // 电话弹窗
    // phoneAction(phone) {
    //   this.tel = phone;
    //   this.isShow = true;
    // },
    // // 取消预约
    // clearOrderAction() {
    //   this.isShow = false;
    //   this.tel = '';
    // },
    // 预约拨号
    orderAction(phoneNumber) {
      location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
      console.log(phoneNumber.replace(/\D/g, ''));
    },
    // 获取完整的店铺名称
    getFullShopName(name) {
      return `康美大药房（${name}）`;
    }
  },
  created() {
    document.title = '线下门店-康美大药房';
    this.newListData = shopData();
    this.drugstoreListData = this.newListData.data;
  },
};
</script>

<style lang="less" scoped>
@import "mint-ui/lib/style.css";
h2,
h3 {
  font-weight: normal;
  font-size: 100%;
}
#drugstoreList {
  background: #fff;
}
// 顶部歇业提示
.drugstoreList_top {
  padding: 10px;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  background: #fff7cc;
  span {
    color: #f60;
  }
}
.drugstoreList_content {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}

// 头部
.header {
  padding-left: 10px;
  background: #fff;
  a {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-size: cover;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  span {
    display: inline-block;
    margin-left: 0px;
    width: auto;
    padding: 6px 15px;
    overflow: hidden;
    // position: relative;
    font-size: 18px;
    line-height: 22px;
  }
}

// 搜索框
.drugstore_search {
  position: relative;
  padding: 6px 10px;
  margin: 9px 0px;
  background-color: #efefef;
  .mint-search {
    border-radius: 8px;
  }
  .mint-search .mint-searchbar {
    height: 0px;
  }
  input {
    width: 84%;
    height: 30px;
    padding-left: 30px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    box-sizing: border-box;
    outline-width: 0px;
    font-size: 14px;
    background: #fff url(./img/search.png) no-repeat 7px center;
    background-size: 20px 20px;
    padding-right: 10px;
  }
  // 取消搜索
  .close_icon {
    position: absolute;
    top: 2px;
    right: 12%;
    font-size: 29px;
    text-align: center;
    color: #fff;
    font-weight: 900;
    line-height: 40px;
    width: 40px;
    border-radius: 100px;
    background: #a3a3a3;
    transform: scale(0.42);
  }
  // 搜索按钮
  .search_btn {
    display: inline-block;
    line-height: 30px;
    position: absolute;
    top: 7px;
    right: 7%;
    font-size: 17px;
    color: #44bb00;
  }
}
// 药房门店列表
.drugstore_list {
  width: 100%;
  height: 100%;
  // min-height: 479px;
  li {
    width: 100%;
    margin: 10px 0px;
    padding: 5px 10px 4px 10px;
    background: #fff;
    h2 {
      display: inline-block;
      width: 100%;
      line-height: 37px;
      font-size: 12px;
      color: #333;
      border-bottom: 1px solid #e5e5e5;
    }
    .drugstore_listContent {
      width: 100%;
      display: flex;
      padding: 8px 0;
      .drugstore_listLeft {
        width: 97%;
        display: flex;
        .drugstore_img {
          width: 60px;
          height: 60px;
          margin-right: 8px;
          overflow: hidden;
          background-size: cover;
          position: relative;
          img {
            width: 60px;
            height: 45px;
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            max-width: 100%;
            max-height: 100%;
          }
        }
        // 门店地址
        .drugstore_address {
          width: 224px;
          h3 {
            margin-top: 1px;
            color: #333;
            font-size: 12px;
            line-height: 16px;
            width: 100%;
            padding-right: 6px;
          }
          p {
            display: inline-block;
            position: relative;
            font-size: 12px;
            line-height: 16px;
            white-space: nowrap;
            margin: 4px 0;
            color: #999;
          }
        }
      }
      // 门店电话
      .drugstore_listRight {
        text-align: center;
        flex: 1;
        border-left: 1px solid #e5e5e5;
        img {
          width: 59px;
          height: 58px;
        }
      }
    }
  }
}

// 底部
.footer {
  display: flex;
  width: 100%;
  text-align: center;
  line-height: 16px;
  background-color: #f8f8f8;
  padding: 16px 15px 20px 28px;
  a {
    display: inline-block;
    border-right: 1px solid #e5e5e5;
    padding: 0 6px;
    color: #666;
    font-size: 12px;
  }
  li:not(:last-child) {
    border-right: 1px solid #e5e5e5;
  }
}

// 空列表
.drugstore_konglist {
  padding-top: 8px;
  p {
    font-size: 14px;
    line-height: 20px;
    color: #666;
    text-align: center;
  }
}

// 电话预约弹窗
/*
.phone_window {
  width: 250px;
  height: 90px;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  background: #fff;
  z-index: 9;
  text-align: center;
  border-radius: 10px;
  .phone_windowTop {
    font-size: 14px;
    font-weight: 700;
    line-height: 55px;
    border-bottom: 1px solid #ccc;
  }
  .phone_windowBottom {
    width: 100%;
    display: flex;
    button {
      height: 100;
      width: 50%;
      margin-top: 4px;
      font-size: 16px;
      color: #409eff;
      border-right: 1px solid #ccc;
    }
    .right_btn {
      border-right: none;
    }
  }
}

// 遮罩层

.layer {
  width: 100%;
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #000;
  opacity: 0.1;
  // z-index: -1;
}*/
</style>


<template>
  <div class="searchDrug-box">
    <search-input @onSearch="searchByKeyword" @keywordChange="keywordChange" @inputsBlur="searchBlur" :placeholderTxt='placeholderTxt'></search-input>
    <ul class="itemListLi" >
      <li v-for="(detail,index) in drugs" :key="index" @click="goShop(detail.product_id)">
        <div class="drug-GoodLeft">
          <img :src="detail.product_main_image" alt="">
        </div>
        <div class="drug-GoodRight">
          <div class="drug-GoodRightTop">
            <span>{{detail.product_name}}</span>
            <i>￥{{detail.product_markprice|numFilter}}</i>
          </div>
          <p>{{detail.product_description}}</p>
          <div class="drug-GoodRightBot">
            <span>{{detail.product_specification}}</span>
            <img src="./img/iconlh_gwc@2x.png" alt="" @click.stop="addCart(detail.product_id)">
          </div>
        </div>
      </li>
    </ul>
    <loading :loadingShow="loadingShow"></loading>
    <inquiry-cart></inquiry-cart>
  </div>
</template>
<script>
import javaAjax from '@/utils/javaApiRequest';
import loading from '@/components/loading/index';
import { Toast } from 'mint-ui';
import { addShop, bus } from '@/api/shopCart';
import { goLogin } from '@/api/user';
import inquiryCart from '@/components/inquiryCar/index.vue';
import searchInput from '@/components/search/searchInput';
export default {
  data() {
    return {
      loadingShow: false,
      machineId: 0,
      seller_address: '',
      placeholderTxt: '搜索药品',
      drugs: []
    };
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后三位
      let transformVal = parseFloat(value).toFixed(3);
      let realVal = transformVal.substring(0, transformVal.length - 1);
      return realVal;
    }
  },
  components: {
    loading,
    'inquiry-cart': inquiryCart,
    'search-input': searchInput
  },
  methods: {
    // F-1:搜索
    searchByKeyword(keyword) {
      let searchText = keyword;
      searchText = searchText.replace(/(^\s*)|(\s*$)/g, ''); // 去除字符串两边的空格
      if (searchText.length === 0) {
        return false;
      }
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/batsearch/searchCabinetProduct`;
      this.machineId = this.$route.query.machineId;
      let data = {
        keyword: searchText,
        machineId: this.machineId,
        page: 0
      };
      javaAjax.post(url, data).then(res => {
        if (res.status === 200 && res.data.resultCode === '0') {
          let drugs = res.data.resultData.content;
          console.log(drugs, 'drugs11');
          if (!drugs || drugs.length === 0) {
            Toast('找不到相关药品');
            this.loadingShow = false;
          } else {
            drugs.forEach(function (drug) {
              if (drug.product_main_image && drug.product_main_image.indexOf(';') !== -1) {
                let num = drug.product_main_image.indexOf(';');
                drug.product_main_image = drug.product_main_image.substr(0, num);
              }
            });
            this.drugs = drugs;
          }
        }
      });
    },
    // F-2：搜索框失焦-待根据具体要求修改
    searchBlur() {
      return false;
    },
    // F-3:搜索内容改变-待根据具体要求修改
    keywordChange() {
      return false;
    },
    // F-4：加入购物车
    addCart(productId) {
      let that = this;
      this.longIs().then(res => {
        if (res) {
          addShop(productId, that.machineId).then((res) => {
            if (res.data.resultCode === '0') {
              Toast(res.data.msg);
              bus.$emit('txt', 'add');
              let productId = sessionStorage.getItem('addProductId');
              let productIds = productId ? productId.split(',').map(Number) : [];
              productIds.push(productId);
              sessionStorage.setItem('addProductId', productIds);
            } else if (res.data.resultCode === '-2') {
              Toast('用户未登录，请先登录');
              goLogin();
            } else {
              Toast('添加失败，请稍后重试~');
            }
          });
        }
      });
    },
    // F-5:跳转商品详情
    goShop(productId) {
      let that = this;
      this.longIs().then(res => {
        if (res) {
          console.log(res);
          this.$router.push({
            path: `/goods/goodsDetail`,
            query: {
              productId: productId,
              getByself: that.machineId,
              getCommon: '',
              getFast: ''
            }
          });
        }
      });
    },
    // F-6:判断是否超过距离
    longIs() {
      let that = this;
      return new Promise(function (resolve, reject) {
        if (that.$route.query.mdata !== '>30') {
          resolve(true);
        } else {
          Toast('药柜距离超过步行自提范围，暂时无法购买药品');
          resolve(false);
        }
      });
    }
  },
  computed: {
  },
};

</script>
<style lang="less" scoped>
  .searchDrug-box{
    width: 100%;
    height: 100%;
  }
  .itemListLi{
    margin-top: 44px;
    width:100%;
  }
  .itemListLi>li{
    display: flex;
    /*border-bottom:1px solid #dfdfdf;*/
    width:100%;
    padding:10px 20px 20px 20px;
  }
  .drug-GoodLeft{
    width:69px;
    img{
      margin:8px 11px 0 0;
      width:58px;
      height:60px;
      border: solid 1px #e0e0e0;
    }
  }
  .drug-GoodRight{
    flex:1;
    .drug-GoodRightTop{
      display: flex;
      font-size: 13px;
      align-items: center;
      justify-content: space-between;
      span{
        color: #333333;
      }
      i{
        font-size: 13px;
        color: #ff4c56;
      }
    }
    p{
      font-size: 11px;
      color: #666666;
      margin-top:7px;
      /*多行文本溢出*/
      position: relative;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      display: -moz-box;
      -moz-line-clamp:2 !important;
      -moz-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .drug-GoodRightBot{
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        font-size:10px;
        color: #666666;
        text-align: end;
        margin-top: 6px;
      }
      img{
        width:21px;
        height: 20px;
      }
    }
  }
</style>

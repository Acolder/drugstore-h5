<template>
  <div class="has-header shopping-cart-box container">
    <mt-header fixed title="购物车">
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link> -->
      <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
      <mt-button slot="right" class="compile-box">
        <img src="./img/hint-txt.png" class="left hint-img" @click="buyHint" />
        <label class="mint-button-text" @click="editStatus = true" v-if="!editStatus">编辑</label>
        <label class="mint-button-text" @click="editStatus = false" v-else>完成</label>
      </mt-button>
    </mt-header>
    <div class="valid-box" :class="(loseEfficacyGoods.length <= 0 || editStatus) ? 'mg-bttom' : ''">
      <div class="shopping-cart" v-for="(shopCartDatas, i) in shopCartData" :key="shopCartDatas[i]" v-if="editStatus ? shopCartDatas : shopCartDatas.youxiaoshuliang > 0">
        <div class="goods-source display-box">
          <label class="drug-check">
            <!-- <input type="checkbox" class="mint-checkbox-input" :checked="subGoodsList.length > 0 && subGoodsList[0].sellerUser.sellerUserId === shopCartDatas.sellerUser.sellerUserId && subGoodsList.length === shopCartDatas.youxiaoshuliang" @click="checkedProduct(shopCartDatas.cartInfo, shopCartDatas.sellerUserIsChecked, 'all')" v-if="!editStatus"> -->
            <input type="checkbox" class="mint-checkbox-input" :checked="subGoodsList.length > 0 && subGoodsList[0].sellerUserId === shopCartDatas.sellerUser.sellerUserId && subGoodsList.length === shopCartDatas.youxiaoshuliang" @click="checkedProduct(shopCartDatas.cartInfo, shopCartDatas.sellerUserIsChecked, 'all')" v-if="!editStatus">
            <input type="checkbox" class="mint-checkbox-input" :checked="merchantGoodsList.findIndex(v => v.sellerUserId === shopCartDatas.sellerUser.sellerUserId) !== -1 ? merchantGoodsList[merchantGoodsList.findIndex(v => v.sellerUserId === shopCartDatas.sellerUser.sellerUserId)].len === shopCartDatas.cartInfo.length : false" @click="merchantDelProduct(shopCartDatas.cartInfo)" v-else>
            <i class="mint-checkbox-core"></i>
          </label>
          <span class="box-flex">
            <label class="source">{{shopCartDatas.sellerUser.sellerName}}</label>
            <span class="type">
              <label v-html="shopCartDatas.sellerUserType === '1' ? '商城' : shopCartDatas.sellerUserType === '2' ? '速达' : shopCartDatas.sellerUserType === '3' ? '自提' : shopCartDatas.sellerUserType === '4' ? '跨境' :''"></label>
            </span>
          </span>
          <label class="time " v-show="shopCartDatas.sellerUserType === '1'">3天送达</label>
          <label class="time" v-if="shopCartDatas.sellerUserType === '2'">30分钟送达</label>
          <span class="time" v-if="shopCartDatas.sellerUserType === '3'">
            <img src="./img/icon-addr.png" />
            <!-- <label>{{distanceTxtTime.distanceTxt}} (步行{{distanceTxtTime.time}}分钟)</label> -->
            <label>{{shopCartDatas.distanceTxtTime.hintTxt}}</label>
          </span>
          <label class="time" v-show="shopCartDatas.sellerUserType === '4'">7天送达</label>
        </div>
        <p class="carriage-txt" v-if="shopCartDatas.sellerUserType !== '3'">{{shopCartDatas.postageDes}}</p>
        <ul class="drug-list">
          <li v-for="(shopCart, j) in shopCartDatas.cartInfo" :key="shopCart[j]" v-if="editStatus ? shopCart.product : shopCart.product && (shopCart.getByself || shopCart.getFast || shopCart.getCommon || shopCart.isTransnational)" @click="goGoodsDetail(shopCart)">
            <mt-cell-swipe :right="[{content: '删除',handler:() => deleteGoods(shopCart.cartId)}]" v-if="shopCart.product">
              <label class="drug-check" @click.stop>
                <input type="checkbox" class="mint-checkbox-input" :checked="subGoodsList.findIndex(v => v.cartId === shopCart.cartId) > -1" @click="checkedProduct(shopCart, shopCart.isChecked)" v-if="!editStatus">
                <input type="checkbox" class="mint-checkbox-input" :checked="delGoodsList.findIndex(v => v.cartId === shopCart.cartId) > -1" @click="checkedDelProduct(shopCart)" v-else>
                <i class="mint-checkbox-core"></i>
              </label>
              <span class="img-box">
                <img :src="shopCart.product.productMainImage" />
              </span>
              <span class="box-flex drug-info">
                <span class="drug-top display-box">
                  <label class="box-flex drug-name">{{shopCart.product.productName}}</label>
                </span>
                <label class="dosage">{{shopCart.product.productSpecification}}</label>
                <label class="price">￥{{Number(shopCart.product.productMarkprice).toFixed(2)}}</label>
                <div class="bottom">
                  <div class="yhjImg">
                    <img src="./img/pla_icon_couponswwoe@2x.png" alt="" v-if="shopCart.couponLogo ==1">
                  </div>
                  <div>
                    <span class="display-box right" @click.stop>
                      <span class="gray-box operate-box" @click="subtractionGoods(shopCart.cartId, i, j)">
                        <img src="./img/icon-subtract.png" class="btn" />
                      </span>
                      <label class="gray-box txt">{{shopCart.quantity}}</label>
                      <span class="gray-box operate-box" @click="addGoods(shopCart.cartId, i, j)">
                        <img src="./img/icon-add.png" class="btn">
                      </span>
                    </span>
                  </div>
                </div>
              </span>
            </mt-cell-swipe>
          </li>
        </ul>
        <div class="coupon" v-show="shopCartDatas.sellerUser.cartCoupon">
          <img src="./img/pla_icon_couponswwoe@2x.png" alt="">
          <span v-if="shopCartDatas.sellerUser.cartCoupon && shopCartDatas.sellerUser.cartCoupon.preferentialAmount">
           满{{shopCartDatas.sellerUser.cartCoupon.useTheThreshold}}元立减{{shopCartDatas.sellerUser.cartCoupon.preferentialAmount}}元
          </span>
        </div>
      </div>
      <v-no-data txt="暂无可结算商品~" v-show="validNoData && !cartNoData"></v-no-data>
    </div>
    <div class="shopping-cart lose-efficacy-box mg-bttom" v-if="!editStatus && loseEfficacyGoods.length > 0">
      <div class="lose-txt clearfix">
        <span class="left">
          <label>失效商品 {{loseEfficacyGoods.length}} 件</label>
          <img src="./img/hint-txt.png" class="right hint-img" @click="loseHint" />
        </span>
        <span class="right clear-lose" @click="clearLoseEfficacyGoods">清空失效商品</span>
      </div>
      <ul class="drug-list">
        <li v-for="shopCart in loseEfficacyGoods" :key="shopCart.cartId" v-if="shopCart.product">
          <mt-cell-swipe :right="[{content: '删除',handler:() => deleteGoods(shopCart.cartId)}]">
            <label class="drug-check">失效</label>
            <span class="img-box">
              <img :src="shopCart.product.productMainImage" />
            </span>
            <span class="box-flex drug-info">
              <span class="drug-top display-box">
                <label class="box-flex drug-name">{{shopCart.product.productName}}</label>
              </span>
              <label class="dosage">{{shopCart.product.productSpecification}}</label>
              <label class="price">￥{{Number(shopCart.product.productMarkprice).toFixed(2)}}</label>
              <span class="type">
                <label v-html="shopCart.sellerUserType === '1' ? '商城' : shopCart.sellerUserType === '2' ? '速达' : shopCart.sellerUserType === '3' ? '自提' : shopCart.sellerUserType === '4' ? '跨境' :''"></label>
                <span class="lose">商品暂无法购买</span>
              </span>
            </span>
          </mt-cell-swipe>
        </li>
      </ul>
    </div>
    <div class="amount-bottom-box" v-show="shopCartData.length > 0">
      <span class="left all-check" v-if="editStatus">
        <label class="drug-check">
          <input type="checkbox" class="mint-checkbox-input" :checked="delGoodsList.length === shopCartGoods.length" @click="delAllCheck">
          <i class="mint-checkbox-core"></i>
        </label>
        <label class="txt">全选</label>
      </span>
      <span v-if="!editStatus">
        <label class="right btn submit" @click="confirmAccount">结算</label>
        <span class="right sum">总计:
          <label>￥{{totalPrice.toFixed(2)}}</label>
        </span>
      </span>
      <span class="right btn delete" @click="deleteGoods()" v-else>删除</span>
    </div>
    <v-inquiry></v-inquiry>
    <v-no-data txt="购物车空空如也哦~" v-show="cartNoData"></v-no-data>
  </div>
</template>
<script>
import { Header, Toast, MessageBox } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
import inquiry from '../../components/inquiryEntrance/index.vue';
import noData from '../../components/nothingDataPage/shopCart.vue';
import { createOrder, bus } from '@/api/shopCart';
import { distanceByLnglat, distanceTime } from '@/api/coordinate';
import { goLogin } from '@/api/user';
export default {
  data() {
    return {
      drugAllCheck: true,
      goodsNum: [],
      showPop: false,
      isCheckedAll: false,
      locationCoordinate: {  // 地址经纬度
        latitude: 0,
        longitude: 0
      },
      shopCartData: [],   // 购物车数据
      shopCartGoods: [],  // 购物车商品
      efficaciousGoods: [],  // 有效商品
      loseEfficacyGoods: [],  // 失效商品
      checkedList: [],  //  选中商品
      subGoodsList: [],  // 选择的商品(结算)
      delGoodsList: [],  // 选择的商品(删除)
      merchantGoodsList: [], // 商户下选中的商品(删除)
      notSelectedGoods: [],
      totalPrice: 0,
      orderFlg: true,
      cartNoData: false,  // 购物车无数据
      validNoData: false,  // 无有效数据
      editStatus: false,   // 是否处于编辑状态
    };
  },
  components: {
    'mt-header': Header,
    'v-inquiry': inquiry,
    'v-no-data': noData,
  },
  watch: {
    subGoodsList: {
      deep: true,
      handler(newValue) {
        console.log(newValue);
        this.totalPrice = 0;
        newValue.forEach(proData => {
          this.totalPrice += proData.product.productMarkprice * proData.quantity;
          this.toFixed();
        });
      }
    },
    delGoodsList(newValue) {
      console.log(this.shopCartData);
      this.merchantGoodsList = [];
      newValue.forEach(goods => {
        // goods.sellerUserId = goods.getByself || goods.getCommon || goods.getFast || goods.getTransnational;
        let index = this.merchantGoodsList.findIndex(v => v.sellerUserId === goods.sellerUserId);
        if (index !== -1) {
          this.merchantGoodsList[index].len += 1;
        }
        else {
          let msg = {
            sellerUserId: goods.sellerUserId,
            // sellerUserType: goods.sellerUserType,
            len: 1
          };
          this.merchantGoodsList.push(msg);
        }
      });
      console.log(this.merchantGoodsList);
    }
  },
  mounted() {
    this.getLocationCoordinate();
    this.shopCartList();
  },
  methods: {
    // 获取地址经纬度
    getLocationCoordinate() {
      let coordinate = JSON.parse(sessionStorage.getItem('coordinate'));
      if (coordinate) {
        this.locationCoordinate.latitude = coordinate.latitude;
        this.locationCoordinate.longitude = coordinate.longitude;
      }
    },
    // 购物车列表
    shopCartList() {
      let data = {
        latitude: this.locationCoordinate.latitude,
        longitude: this.locationCoordinate.longitude,
        version: '3.1.0'
      };
      javaAjax.post('/mall/cart/queryCart', data).then((res) => {
        console.log(res, '购物车');
        if (res.status === 200) {
          let resData = res.data;
          if (resData.resultCode === '0') {
            this.shopCartData = resData.resultData;
            this.shopCartGoods = [];
            this.subGoodsList = [];
            this.efficaciousGoods = [];
            this.loseEfficacyGoods = [];
            this.shopCartData.forEach((res, i) => {
              this.shopCartGoods = [...this.shopCartGoods, ...res.cartInfo];
              if (res.sellerUserType === '3') {
                let distanceTxtTime = this.getDistance(res.sellerUser.latitude, res.sellerUser.longitude);
                this.$set(this.shopCartData[i], 'distanceTxtTime', distanceTxtTime);
              }
              res.cartInfo.forEach(goods => {
                if (goods.getByself || goods.getCommon || goods.getFast || goods.getTransnational) {
                  // let sellerUserId = goods.getByself || goods.getCommon || goods.getFast || goods.getTransnational;
                  // goods.sellerUserId = sellerUserId;
                  this.efficaciousGoods.push(goods);  // 有效商品
                  if (goods.isChecked === 1) {
                    this.subGoodsList.push(goods);
                  }
                  else {
                    this.notSelectedGoods.push(goods);
                  }
                }
                else {
                  this.loseEfficacyGoods.push(goods);
                }
              });
            });
            this.cartNoData = this.shopCartGoods.length > 0 ? false : true;
            this.validNoData = this.efficaciousGoods.length > 0 ? false : true;
          }
          else if (resData.resultCode === '-2') {
            // goLogin();
          }
          else {
            Toast(resData.msg);
          }
        }
      });
    },
    // 结算商品选择
    checkedProduct(shopCart, checked, type) {
      let submitData = [];
      // let sellerUserType = '';
      let sellerUserId = '';
      if (type === 'all') {    // 商户全选
        // 有选中的商品且是不同商户
        if (this.subGoodsList.length > 0 && this.subGoodsList[0].sellerUserId !== shopCart[0].sellerUserId) {
          this.subGoodsList.forEach(subGoods => {
            let goodsData = {
              cartId: subGoods.cartId,
              isChecked: 2
            };
            submitData.push(goodsData);
          });
        }
        this.subGoodsList = [];
        shopCart.forEach((goods, i) => {
          // let sellerUserId = goods.getByself || goods.getCommon || goods.getFast || goods.getTransnational;
          // shopCart[i].sellerUserId = sellerUserId;
          // 选中状态(取消选择)
          if (checked === 1) {
            let goodsData = {
              cartId: goods.cartId,
              isChecked: 2
            };
            submitData.push(goodsData);
          }
          else {
            let goodsData = {
              cartId: goods.cartId,
              isChecked: 1
            };
            submitData.push(goodsData);
            if (goods.getByself || goods.getCommon || goods.getFast || goods.getTransnational) {
              this.subGoodsList.push(goods);
            }
          }
        });
        sellerUserId = shopCart[0].sellerUserId;
        // sellerUserId = shopCart[0].getByself || shopCart[0].getCommon || shopCart[0].getFast || shopCart[0].getTransnational;
      }
      else {      // 商品单选
        let isChecked = 0;
        sellerUserId = shopCart.sellerUserId;
        // sellerUserId = shopCart.getByself || shopCart.getCommon || shopCart.getFast || shopCart.getTransnational;
        let cIndex = this.subGoodsList.findIndex(v => v.cartId === shopCart.cartId);
        if (cIndex !== -1) {
          isChecked = 2;
          this.subGoodsList.splice(cIndex, 1);
        }
        else {
          if (this.subGoodsList[0] && this.subGoodsList[0].sellerUserId !== sellerUserId) {
            this.subGoodsList.forEach(res => {
              let goods = {
                cartId: res.cartId,
                isChecked: 2
              };
              submitData.push(goods);
            });
            this.subGoodsList = [];
          }
          isChecked = 1;
          this.subGoodsList.push(shopCart);
        }
        let goodsData = {
          cartId: shopCart.cartId,
          isChecked: isChecked
        };
        submitData.push(goodsData);
      }
      console.log(sellerUserId);
      console.log(this.shopCartData);
      let cartIndex = this.shopCartData.findIndex(v => v.sellerUser.sellerUserId === sellerUserId);
      console.log(cartIndex);
      let indexShopCart = this.shopCartData[cartIndex];
      let sellerUserIsChecked = 0;
      if (this.subGoodsList.length === indexShopCart.youxiaoshuliang) {
        sellerUserIsChecked = 1;
      }
      else {
        sellerUserIsChecked = 2;
      }
      this.$set(indexShopCart, 'sellerUserIsChecked', sellerUserIsChecked);
      this.cartCheckedArray(submitData);
    },
    // 修改购物车勾选状态
    cartCheckedArray(submitData) {
      return new Promise((resolve, reject) => {
        javaAjax.post('/mall/cart/updateProductCartCheckedArray', submitData).then((res) => {
          if (res.status === 200) {
            let resData = res.data;
            resolve(resData.resultCode);
          }
        });
      });
    },
    // 删除商品选择
    checkedDelProduct(shopCart, type) {
      let cIndex = this.delGoodsList.findIndex(v => v.cartId === shopCart.cartId);
      if (cIndex !== -1) {
        if (type !== 'all') {
          this.delGoodsList.splice(cIndex, 1);
        }
      }
      else {
        this.delGoodsList.push(shopCart);
      }
    },
    // 商户全选(删除)
    merchantDelProduct(shopCart) {
      console.log(shopCart);
      let sellerUserId = shopCart[0].sellerUserId;
      // let sellerUserId = shopCart[0].getByself || shopCart[0].getCommon || shopCart[0].getFast || shopCart[0].getTransnational;
      let index = this.merchantGoodsList.findIndex(v => v.sellerUserId === sellerUserId);
      if (index !== -1 && this.merchantGoodsList[index].len === shopCart.length) {
        let delArr = [];
        this.delGoodsList.forEach(res => {
          if (res.sellerUserId !== sellerUserId) {
            delArr.push(res);
          }
        });
        this.delGoodsList = delArr;
      }
      else {
        shopCart.forEach(goods => {
          this.checkedDelProduct(goods, 'all');
        });
      }
      console.log(this.merchantGoodsList);
    },
    // 全选（删除）
    delAllCheck() {
      if (this.delGoodsList.length === this.shopCartGoods.length) {
        this.delGoodsList = [];
      }
      else {
        this.delGoodsList = this.shopCartGoods;
      }
    },
    // 减少商品数量
    subtractionGoods(cId, i, j) {
      this.updateGoodsNum(cId, -1, i, j);
    },
    // 添加商品数量
    addGoods(cId, i, j) {
      this.updateGoodsNum(cId, 1, i, j);
    },
    // 修改商品数量
    updateGoodsNum(cId, num, i, j) {
      let url = '/mall/cart/updateProductCart';
      let data = {
        cartId: cId,
        quantity: num
      };
      javaAjax.post(url, data).then((res) => {
        if (res.status === 200) {
          let resData = res.data;
          if (resData.resultCode === '0') {
            let cartInfo = this.shopCartData[i].cartInfo[j];
            let quantity = cartInfo.quantity + num;
            this.$set(cartInfo, 'quantity', quantity);
            bus.$emit('txt', 'revise');
          }
          else if (resData.resultCode === '-2') {
            goLogin();
          }
          else if (resData.msg === '商品数量不能为负数') {
            Toast('不能减少了');
          }
          else {
            Toast(resData.msg);
          }
        }
      });
    },
    // 删除商品
    deleteGoods(cId) {
      let cartIds = [];
      if (cId) {
        cartIds = [{
          cartId: cId
        }];
      }
      else {
        if (this.delGoodsList.length === 0) {
          Toast('请选择要删除的商品');
          return false;
        }
        else {
          this.delGoodsList.forEach(res => {
            let cartId = {
              cartId: res.cartId
            };
            cartIds.push(cartId);
          });
        }
      }
      MessageBox.confirm('确定删除商品吗？').then(action => {
        if (action === 'confirm') {
          let url = '/mall/cart/delCart';
          let data = {
            cartIds: cartIds
          };
          javaAjax.post(url, data).then((res) => {
            if (res.status === 200) {
              let resData = res.data;
              if (resData.resultCode === '0') {
                this.shopCartList();
                bus.$emit('txt', 'revise');
              }
              else if (resData.resultCode === '-2') {
                goLogin();
              }
              else {
                Toast(resData.msg);
              }
            }
          });
        }
      }).catch(err => {
        if (err === 'cancel') {
          console.log('已取消');
        }
      });
    },
    // 结算
    confirmAccount() {
      if (this.subGoodsList.length < 1) {
        Toast('请选择结算商品');
      }
      else {
        let products = [];
        let getByself;
        let getFast;
        let getCommon;
        this.subGoodsList.forEach((goods) => {
          getFast = goods.getFast;
          getByself = goods.getByself;
          getCommon = goods.getCommon;
          let product = {
            cartId: goods.cartId,
            productId: goods.product.productId,
            getByself: getByself,
            getFast: getFast,
            getCommon: getCommon,
            getTransnational: goods.getTransnational,
            quantity: goods.quantity,
            recommendId: goods.recommendId,
          };
          products.push(product);
        });
        createOrder(products);
      }
    },
    // 清空失效商品
    clearLoseEfficacyGoods() {
      MessageBox.confirm('确定清空失效商品吗？').then(action => {
        if (action === 'confirm') {
          let url = '/mall/cart/delShiXiao';
          let data = {
            latitude: this.locationCoordinate.latitude,
            longitude: this.locationCoordinate.longitude,
            version: '3.1.0'
          };
          javaAjax.post(url, data).then((res) => {
            if (res.status === 200) {
              let resData = res.data;
              if (resData.resultCode === '0') {
                this.shopCartList();
                Toast(resData.msg);
              }
              else if (resData.resultCode === '-2') {
                goLogin();
              }
              else {
                Toast(resData.msg);
              }
            }
          });
        }
      }).catch(err => {
        if (err === 'cancel') {
          console.log('已取消');
        }
      });
    },
    // 获取距离和计算时间
    getDistance(lat, lng) {
      let latitude1 = this.locationCoordinate.latitude; // 当前纬度
      let longitude1 = this.locationCoordinate.longitude; // 当前经度
      // let latitude2 = lat; // 目的地纬度
      // let longitude2 = lng; // 目的地经度
      let distance = distanceByLnglat(longitude1, latitude1, lng, lat);
      // this.distanceTxtTime = distanceTime(distance);
      return distanceTime(distance);
    },
    // 查看商品详情
    goGoodsDetail(shopCart) {
      this.$router.push({
        path: '/goods/goodsDetail',
        query: {
          productId: shopCart.productId,
          getCommon: shopCart.getCommon,
          getFast: shopCart.getFast,
          getByself: shopCart.getByself,
          getTransnational: shopCart.getTransnational
        }
      });
    },
    // 购买提示
    buyHint() {
      Toast('不同供货来源的商品配送时效不同，每次仅能购买一种供货来源的商品。');
    },
    // 失效提示
    loseHint() {
      Toast('收货地址、商品库存发生变化，均会造成商品失效。');
    },
    toFixed() {
      if (this.totalPrice > 0 && !Number.isInteger(this.totalPrice)) {
        this.totalPrice = Number(this.totalPrice.toFixed(2));
      }
    }
  },
};
</script>
<style lang="less" scoped>
  @import '../../styles/mixin.less';
  .container{
    position:absolute;width:100%;height:100%;top:0;left:0;overflow-y:auto;
    background-color:#efeff4;
  }
  body, #app {
    background-color: #efeff4;
  }
  .white-backgound(){
    background: #fff;
  }
  .mg-bttom{
    margin-bottom: 90px;
  }
  .hint-img{
    width: 18px;
    height: 18px;
  }
  .type{
    display: inline-block;
    height: 19px;
    text-align: left;
    label{
      .border-radius-btn(19px,4px,@green-color,4px,11px);
      line-height: 17px;
      margin-right: 4px;
    }
    label:last-child{
      margin: 0;
    }
  }
  .shopping-cart-box{
    width: 100%;
    height: 100%;
    .compile-box{
      .hint-img{
        margin-right: 8px;
      }
      .mint-button-text{
        font-size: 15px;
        color: @black-color;
      }
    }
    .mint-checkbox-core{
      width: 18px;
      height: 18px;
      &:after{
         top: 2px;
         left: 5px;
       }
    }
    .mint-checkbox-input:checked{
      + .mint-checkbox-core{
          background-color: @green-color;
          border-color: @green-color;
      }
    }
    .shopping-cart{
      background: #ffffff;
      .goods-source {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        border-bottom: @border-line;
        .source {
          padding: 0 10px;
          text-align: justify;
        }
        .time {
          text-align: right;
          color: @green-color;
          img{
            width: 10px;
            vertical-align: middle;
          }
        }
      }
      .carriage-txt {
        height: 25px;
        line-height: 24px;
        padding-left: 40px;
        font-size: 12px;
        color: @red-color;
        background: #fff6f6;
      }
      .drug-list{
        li{
          border-bottom: @border-line;
          padding: 12px 0;
          background: #fff;
          .drug-check{
            display: block;
            font-size: 8px;
            line-height: 66px;
            text-align: center;
            margin-top: -14px;
          }
          .img-box{
            display: block;
            width: 86px;
            height: 86px;
            text-align: center;
            border: @border-line;
            margin: 0 12px 0 10px;
            img{
              display: inline-block;
              width: 100%;
              height: 100%;
            }
          }
          .drug-info{
            .drug-top{
              color: @black-color;
              .drug-name{
                font-size: 15px;
                margin: 0 6px 0 0;
                .aline-text-overflow(19px);
              }
            }
            .dosage{
              display: block;
              height: 16px;
              line-height: 16px;
              font-size: 12px;
              color: @color999;
              overflow: hidden;
            }
            .price{
              display: block;
              font-size: 14px;
              color: @red-color;
              line-height: 24px;
              margin-top: 4px;
            }
            .bottom{
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              height: 22px;
              margin: -3px 0 3px;
              .yhjImg{
                width:38px;
                height: 16px;
                img{
                  width:100%;
                  height: 100%;
                }
              }
              .right{
                .gray-box{
                  height: 28px;
                  line-height: 28px;
                  text-align: center;
                  background: #f5f5f5;
                }
                .operate-box{
                  width: 28px;
                }
                .btn{
                  width: 10px;
                }
                .txt{
                  display: inline-block;
                  font-size: 15px;
                  padding: 0 21px;
                  margin: 0 2px;
                }
              }
            }
          }
        }
      }
    }
    .valid-box{
      .source{
        float: left;
        max-width: calc(100% - 50px);
        .aline-text-overflow(22px);
        margin-top: 9px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .type{
        margin-right: 15px;
      }
      .nothing-data-page{
        position: relative;
        transform: none;
        left: 0;
        top: 0;
        margin: 40px 0;
      }
    }
    .lose-efficacy-box{
      background: @gray-bg;
      .lose-txt{
        padding: 7px 10px 0;
        .hint-img{
          margin-left: 9px;
        }
        .clear-lose{
          color: @green-color;
        }
      }
      .drug-list{
        li{
          background: @gray-bg;
          .mint-cell{
            background: @gray-bg;
            /deep/.mint-cell-wrapper{
              padding-left: 5px;
              .img-box{
                margin-left: 5px;
              }
              .drug-name,.price{
                color: @color999;
              }
              .drug-check{
                .background-radius-btn(17px,6px,#b7b6b6,20px,11px);
              }
              .type{
                .lose{
                  font-size: 12px;
                  color: @black-color;
                }
              }
            }
          }
        }
      }
    }
    .drug-recommend{
      .white-backgound;
      margin: 30px 0 97px;
      .tlt{
        display: block;
        height: 40px;
        line-height: 40px;
        padding: 0 12px;
        font-size: 14px;
        border-bottom: @border-line;
      }
    }
    .amount-bottom-box{
      position: fixed;
      bottom: 48px;
      width: 100%;
      height: 42px;
      line-height: 42px;
      padding-left: 12px;
      font-size: 13px;
      border-top: @border-line;
      .white-backgound;
      .all-check{
        display: block;
        .drug-check{
          float: left;
          line-height: 38px;
        }
        .txt{
          font-size: 14px;
          color: @color666;
          padding-left: 10px;
        }
      }
      .sum{
        font-size: 16px;
        label{
          color: @red-color;
          margin-right: 10px;
        }
      }
      .btn{
        padding: 0 36px;
        font-size: 18px;
        color: #fff;
        text-align: center;
      }
      .submit{
        background: @green-color;
      }
      .delete{
        background: @red-color;
      }
    }
    .inquiry-entrance{
      bottom: 145px;
    }
    .delivery-way{
      .align-center(fixed);
      width: 80%;
      padding: 20px 0 0;
      border-radius: 5px;
      background: #fff;
      .addr-hint{
        display: block;
        text-align: center;
      }
      .way-box{
        display: block;
        font-size: 15px;
        padding: 0 12px;
        margin-bottom: 20px;
        .mint-radio-input:checked{
           + .mint-radio-core{
               border-color: @orange-color;
               background: @white-color;
               &:after{
                  top:4px;
                  left:4px;
                  width: 10px;
                  height: 10px;
                  background: @orange-color;
               }
           }
        }
        .way-txt{
          padding-left: 10px;
          color: #010101;
        }
        .right{
          color: #000;
        }
      }
      .checked{
        margin-bottom: 8px;
      }
      .btn-box{
        height: 42px;
        line-height: 42px;
        font-size: 14px;
        text-align: center;
        margin-top: 5px;
        border-top: @border-line;
        .confirm{
          color: @green-color;
          border-left: @border-line;
        }
      }
    }
  }
  .mint-cell-swipe-button{
    line-height: 68px;
  }
  .mint-cell:last-child{
    background-image: none;
  }
  .coupon{
    background: #ffffff;
    width:100%;
    height: 30px;
    display: flex;
    align-items: center;
    img{
      width:38px;
      height: 16px;
      margin-left: 36px;
    }
    span{
      font-size: 10px;
      color: #333333;
      margin-left: 5px;
    }
  }
</style>

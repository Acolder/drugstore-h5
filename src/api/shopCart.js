import { Toast } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
import { getToken } from '@/utils/auth';
import { goLogin } from '@/api/user';
import Vue from 'vue';
import router from '@/router';
let userToken = getToken();

// 获取购物车数量
export function getShopCart() {
  let url = '/mall/cart/queryCartNum';
  let data = {
    userToken: userToken,
  };
  return javaAjax.post(url, data);
}
// 添加到购物车
// recommendId: 药师推荐id（没有药师推荐传'', 默认无药师推荐）
// 商品数量(可空，默认1)
export function addShop(pId, getByself, getFast, getCommon, getTransnational, recommendId, quantity) {
  // let url = 'http://10.3.32.248/mall/cart/addCart';
  /* eslint-disable */
  // getByself = getByself ? getByself : '';
  // getFast = getFast ? getFast : '';
  // getCommon = getCommon ? getCommon : '';
  recommendId = recommendId ? recommendId : '';
  quantity = quantity ? quantity : 1;
  let url = '/mall/cart/addCart';
  let data = {
    // userToken: userToken,
    products: [
      {
        productId: pId,
        getByself: getByself,
        getFast: getFast,
        getCommon: getCommon,
        getTransnational: getTransnational,
        recommendId: recommendId,
        quantity: quantity,
      },
    ],
    version: '3.1.0',
  };
  console.log(data);
  // let addShopCartGoods = JSON.parse(sessionStorage.getItem('addShopCartGoods'));
  // addShopCartGoods = addShopCartGoods ? addShopCartGoods : [];
  // addShopCartGoods.push(pId);
  // addShopCartGoods = Array.from(new Set(addShopCartGoods));
  // sessionStorage.setItem('addShopCartGoods', JSON.stringify(addShopCartGoods));
  return javaAjax.post(url, data);
}
// 生成订单
export function createOrder(products, couponId, securitiesInformationId, receiveId, msg) {
  let addrInfo = JSON.parse(sessionStorage.getItem('selectedAddress'));
  let addressId = addrInfo ? addrInfo.addressId : '';
  let url = '/mall/order/initOrder';
  let coordinate = JSON.parse(sessionStorage.getItem('coordinate'));
  let latitude = (coordinate && coordinate.latitude) ? coordinate.latitude : 0;
  let longitude = (coordinate &&coordinate.longitude) ? coordinate.longitude : 0;
  let data = {
    addressId: addressId,
    latitude: latitude,
    longitude: longitude,
    products: products,
    version: '3.1.0',
    couponId: couponId ? couponId : 0,
    securitiesInformationId: securitiesInformationId ? securitiesInformationId : 0,
    receiveId: receiveId ? receiveId : 0
  };
  //console.log(data, '参数');
  console.log(JSON.stringify (data), '参数');
  javaAjax.post(url, data).then(res => {
    console.log(res, '生成订单');
    if (res.status === 200) {
      let resData = res.data;
      if (resData.resultCode === '0') {
        sessionStorage.setItem ('products', JSON.stringify(products));
        sessionStorage.setItem ('shopCartOrder',JSON.stringify(resData.resultData));
        if (securitiesInformationId) {
          router.push({
            path: '/submitOrder/multWayDelivery',
            query: {
              couponId: couponId,
              securitiesInformationId: securitiesInformationId,
              receiveId: receiveId,
              msg: msg
            }
          });
        } else {
          router.push ({path: '/submitOrder/multWayDelivery'});
        }
      } else if (resData.resultCode === '-2') {
        // router.push({path: '/login'});
        goLogin();
      } else {
        Toast(resData.msg);
      }
    }
  });
}
export let bus = new Vue();

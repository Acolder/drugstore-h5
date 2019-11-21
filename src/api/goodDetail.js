import { Toast, MessageBox } from 'mint-ui';
import javaAjax from '@/utils/javaApiRequest';
import { getToken } from '@/utils/auth';
import ajax from '@/utils/ajax';
let userToken = getToken();
// 获取商品详情
export function getGood(productId, getByself, getFast, getCommon, isTransnational) {
  let url = '/mall/product/getProduct';
  let data = {
    userToken: userToken,
    productId: productId,
    getByself: getByself,
    getFast: getFast,
    getCommon: getCommon,
    isTransnational: isTransnational
  };
  return javaAjax.post(url, data);
}
// 处方药 电话
export function prescCall(productName, productId) {
  if (!userToken) {
    Toast('请先登录');
    return false;
  }
  MessageBox.prompt('药品包含处方药，不能直接购买。请留下您的电话，药师将致电并协助购买。', '提示', {
    inputPattern: /^1[3|4|5|7|8][0-9]{9}$/,
    inputErrorMessage: '手机格式错误'
  }).then(({ value, action }) => {
    // let reg = /^1[3|4|5|7|8][0-9]{9}$/;
    // if (!reg.test(value)) {
    //   Toast('手机格式错误');
    //   return false;
    // } else {
    // 发送用户电话接口
    let url =  '/api/presuggest/addpresuggest';
    let data = {
      PrescriptionName: productName,
      PrescriptionPid: productId,
      Mobile: value
    };
    ajax.post(url, data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        Toast(res.data.message);
      } else if (res.data.code === -1) {
        Toast(res.data.message);
      } else {
        Toast('操作失败');
      }
    });
    // }
  }).catch(() => {
    // 取消操作
  });
}
// 获取商品详情3.1.0
export function getGoodNew(productId, getByself, getFast, getCommon, getTransnational) {
  let url = '/mall/product/getProduct';
  let data = {
    userToken: userToken,
    productId: productId,
    getByself: getByself,
    getFast: getFast,
    getCommon: getCommon,
    getTransnational: getTransnational,
    version: '3.1.0'
  };
  console.log(data);
  return javaAjax.post(url, data);
}

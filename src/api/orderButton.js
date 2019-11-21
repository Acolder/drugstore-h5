import javaAjax from '@/utils/javaApiRequest';
import { getToken } from '@/utils/auth';
import router from '@/router';
let userToken = getToken;
// 去评价按钮
export function goEvaluateBtn(orderId) {
  router.push({ path: `/evaluate/index?orderId=${orderId}` });
}
// 查看评价按钮
export function nseeEvaluateBtn(orderId) {
  router.push({ path: `/evaluate/seeEvaluate?orderId=${orderId}` });
}
// 取消订单按钮
export function cancelOrderBtn(orderId) {
  let url = '/mall/order/cancelOrderByUser';
  let data = {
    userToken: userToken,
    orderId: orderId
  };
  return javaAjax.post(url, data);
}
// 查看物流
export function seeLogisticsBtn(logisticsNumber, logisticsType, orderId, orderTransport) {
  let orderTransports = parseInt(orderTransport, 10);
  if (!orderTransports || (orderTransports !== 2 && orderTransports !== 3)) {
    // 当未填或者不为快送和自提时，显示物流详情
    router.push({ path: `/order/logistics?logisticsNumber=${logisticsNumber}&logisticsType=${logisticsType}&orderId=${orderId}` });
  }
}

// 快送查看物流
export function seeLogisticsFastBtn(orderId) {
  router.push({ path: `/order/distribution?orderId=${orderId}` });
}

// 获取美团物流数据
export function mtBtn(logisticsInfo) {
  let url = '/mall/back/order/logisticsInfo';
  let data = logisticsInfo;
  return javaAjax.post(url, data);
}

// 确认收货
export function receiptOrderBtn(orderId) {
  let url = '/mall/order/receiptOrderByUser';
  let data = {
    userToken: userToken,
    orderId: orderId,
  };
  return javaAjax.post(url, data);
}

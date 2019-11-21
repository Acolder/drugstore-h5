import wxjs from '@/utils/wxjsInterface';
// import { getQueryString } from '@/utils/index';
// payMsg为对象  包括orderList: 订单id, orderAmount: 金额, payType: product(商品) prescription( 处方), sellerName: 商户id 例如： {orderList：'123',orderAmount:'500',payType:'prescription',sellerName: '康美商城'}
export function goPay(payMsg) {
  sessionStorage.setItem('payMsg', JSON.stringify(payMsg));
  let url = `${process.env.WEB_HOST}/payment/index`;
  let link = wxjs.getOpenIdUrl(url);
  location.href = link;
}

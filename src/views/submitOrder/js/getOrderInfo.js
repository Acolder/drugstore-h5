export function getOrderInfo(drugType) {
  let shopCartOrder = JSON.parse(sessionStorage.getItem('shopCartOrder'));
  console.log(shopCartOrder);
  let durgListData;
  if (drugType === 'fast') {
    durgListData = shopCartOrder.getFastOrder;
  }
  if (drugType === 'self') {
    durgListData = shopCartOrder.getByselfOrder;
  }
  if (drugType === 'common') {
    durgListData = shopCartOrder.getCommonOrder;
    // let getCommonOrder = shopCartOrder.getCommonOrder;
    // let transnationalOrder = shopCartOrder.transnationalOrder;
    // durgListData.products = [...durgListData.products, ...transnationalOrder.products];
  }
  if (drugType === 'cross') {
    durgListData = shopCartOrder.transnationalOrder;
  }
  return durgListData;
}

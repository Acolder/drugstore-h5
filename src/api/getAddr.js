import javaAjax from '@/utils/javaApiRequest';
import { getToken } from '@/utils/auth';
let userToken = getToken();
// 获取地址
export function getAddr() {
  let url = '/mall/address/queryAddress';
  let data = {
    userToken: userToken
  };
  return javaAjax.post(url, data);
}

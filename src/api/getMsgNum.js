import ajax from '@/utils/ajax';
// 获取未读消息数
export function getMsgNum(callback) {
  let url = '/api/message/getmessagecount';
  ajax.get(url).then((res) => {
    if (res.status === 200 && res.data.code === 0) {
      callback && callback(res.data.data);
    }
  });
}

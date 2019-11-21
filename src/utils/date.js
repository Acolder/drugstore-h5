import { getTimestamp } from '@/utils/auth';
export function formatDate(date, time) {
  let fmt = time;
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  let o = {
    'Y+': date.getYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = `${o[k]}`;
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
// 两个时间戳计算时间差
export function calculateDiffTime(start_time, end_time) {
  let nowTime = getTimestamp() / 1000;
  if (nowTime > end_time || start_time >= end_time) {
    return '已过期';
  }
  let startTime = start_time;
  let endTime = end_time;
  let timeDiff = endTime - startTime;
  let day = Math.floor(timeDiff / (24 * 3600));
  timeDiff = timeDiff % (3600 * 24);
  let hour = Math.floor(timeDiff / 3600);
  timeDiff = timeDiff % 3600;
  let minute = Math.floor(timeDiff / 60);
  minute = (minute >= 0) ? `${minute}分钟` : `0分钟`;
  timeDiff = timeDiff % 60;
  if (day > 0) {
    day = `${day}天`;
    if (hour > 0) {
      hour = `${hour}小时`;
    } else {
      hour = '0小时';
    }
  } else {
    day = '';
    if (hour > 0) {
      hour = `${hour}小时`;
    } else {
      hour = '';
    }
  }

  return `剩${day}${hour}${minute}`;
}
// 格式化聊天时间
export function formatChatTimes(times, isList = false) {
  // isList: 是否聊天列表时间
  // 当前时间
  let nowDate = new Date();
  let nowDay = nowDate.getDate();
  let nowHours = nowDate.getHours();
  let nowTime = nowDate.getTime();
  // 聊天消息时间
  let chatDate = new Date(times);
  let year = chatDate.getFullYear();
  let month = chatDate.getMonth() + 1;
  let day = chatDate.getDate();
  let hours = chatDate.getHours();
  let minutes = chatDate.getMinutes();
  let seconds = chatDate.getSeconds();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  let chatDay = chatDate.getDate();
  // 返回时间
  let time1 = '';
  let time2 = '';
  let chatTime = '';
  // 七天之前的时间
  if (nowTime - times >= 1000 * 60 * 60 * 24 * 7) {
    time1 = year + '-' + month + '-' + day;
    time2 = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    chatTime = isList ? time1 : time2;
  } else if (nowTime - times < 1000 * 60 * 60 * (24 + nowHours)) { // 昨天0点到现在
    if (nowDay - chatDay === 1) {
      // 昨天
      time1 = '昨天';
      time2 = '昨天 ' + hours + ':' + minutes + ':' + seconds;
      chatTime = isList ? time1 : time2;
    } else {
      // 今天
      chatTime = hours + ':' + minutes + ':' + seconds;
    }
  } else {
    // 两天到七天
    let weekday = chatDate.getDay();
    switch (weekday)
    {
      case 0:
        weekday = '周日';
        break;
      case 1:
        weekday = '周一';
        break;
      case 2:
        weekday = '周二';
        break;
      case 3:
        weekday = '周三';
        break;
      case 4:
        weekday = '周四';
        break;
      case 5:
        weekday = '周五';
        break;
      case 6:
        weekday = '周六';
        break;
    }
    time1 = weekday;
    time2 = weekday + ' ' + hours + ':' + minutes + ':' + seconds;
    chatTime = isList ? time1 : time2;
  }
  return chatTime;
}
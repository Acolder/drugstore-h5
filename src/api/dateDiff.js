export function getDateDiff(timespan) {
  let dateTime = new Date(timespan.replace(/-/g, '/'));

  // let year = dateTime.getFullYear();
  // let month = dateTime.getMonth() + 1;
  // let day = dateTime.getDate();
  let time = dateTime.getTime();
  // month = month < 10 ? ('0' + month) : month;
  // day = day < 10 ? ('0' + day) : day;
  // let hour = dateTime.getHours();
  // let minute = dateTime.getMinutes();
  // let second = dateTime.getSeconds();
  let now = new Date();
  let now_new = now.getTime();

  let milliseconds = 0;
  let timeSpanStr;

  milliseconds = now_new - time;

  if (milliseconds < 1000 * 60 * 10) {
    timeSpanStr = '刚刚';
  }
  else if (1000 * 60 * 10 <= milliseconds && milliseconds < 1000 * 60 * 20) {
    timeSpanStr = '10分钟前';
  }
  else if (1000 * 60 * 20 <= milliseconds && milliseconds < 1000 * 60 * 30) {
    timeSpanStr = '20分钟前';
  }
  else if (1000 * 60 * 30 <= milliseconds && milliseconds < 1000 * 60 * 40) {
    timeSpanStr = '30分钟前';
  }
  else if (1000 * 60 * 40 <= milliseconds && milliseconds < 1000 * 60 * 50) {
    timeSpanStr = '40分钟前';
  }
  else if (1000 * 60 * 50 <= milliseconds && milliseconds < 1000 * 60 * 60) {
    timeSpanStr = '50分钟前';
  }
  else if (1000 * 60 * 60 <= milliseconds && milliseconds < 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.floor(milliseconds / (1000 * 60 * 60)) + '小时前';
  }
  else if (1000 * 60 * 60 * 24 <= milliseconds && milliseconds < 1000 * 60 * 60 * 24 * 30) {
    timeSpanStr = Math.floor(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  }
  else if (milliseconds > 1000 * 60 * 60 * 24 * 30 && milliseconds < 1000 * 60 * 60 * 24 * 365) {
    timeSpanStr = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30)) + '个月前';
  }
  else if (milliseconds >= 1000 * 60 * 60 * 24 * 365) {
    timeSpanStr = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 365)) + '年前';
  }
  // else if (milliseconds > 1000 * 60 * 60 * 24 * 3 && year === now.getFullYear()) {
  //   // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  //   timeSpanStr = year + '-' + month + '-' + day;
  // }
  // else {
  //   // timeSpanStr = year + '-' + month + '-' + day;
  //   timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  // }
  return timeSpanStr;
}

/* eslint-disable */
export function getDateSmallDiff(timespan) {
  let dateTime = new Date(timespan.replace(/-/g, '/'));
  let time = dateTime.getTime();
  let now = new Date();
  let now_new = now.getTime();
  let timeSpanStr;

  let milliseconds = now_new - time;

  if (milliseconds < 1000 * 60) {
    timeSpanStr = '刚刚';
  }
  else if (1000 * 60 <= milliseconds && milliseconds < 1000 * 60 * 10) {
    timeSpanStr = Math.floor(milliseconds / (1000 * 60)) + '分钟前';
  }
  else if (1000 * 60 * 10 <= milliseconds && milliseconds < 1000 * 60 * 20) {
    timeSpanStr = '10分钟前';
  }
  else if (1000 * 60 * 20 <= milliseconds && milliseconds < 1000 * 60 * 30) {
    timeSpanStr = '20分钟前';
  }
  else if (1000 * 60 * 30 <= milliseconds && milliseconds < 1000 * 60 * 40) {
    timeSpanStr = '30分钟前';
  }
  else if (1000 * 60 * 40 <= milliseconds && milliseconds < 1000 * 60 * 50) {
    timeSpanStr = '40分钟前';
  }
  else if (1000 * 60 * 50 <= milliseconds && milliseconds < 1000 * 60 * 60) {
    timeSpanStr = '50分钟前';
  }
  else if (1000 * 60 * 60 <= milliseconds && milliseconds < 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.floor(milliseconds / (1000 * 60 * 60)) + '小时前';
  }
  else if (1000 * 60 * 60 * 24 <= milliseconds && milliseconds < 1000 * 60 * 60 * 24 * 30) {
    timeSpanStr = Math.floor(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  }
  else if (milliseconds > 1000 * 60 * 60 * 24 * 30 && milliseconds < 1000 * 60 * 60 * 24 * 365) {
    timeSpanStr = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30)) + '个月前';
  }
  else if (milliseconds >= 1000 * 60 * 60 * 24 * 365) {
    timeSpanStr = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 365)) + '年前';
  }
  return timeSpanStr;
}

export function formatSeconds(value) {
  let second = parseInt(value); // 秒
  let minute = 0; // 分
  let hour = 0; // 小时
  // 如果秒数大于60，将秒数转换成整数
  if(second > 60) {
    // 获取分钟，除以60取整数，得到整数分钟
    minute = parseInt(second / 60);
    // 获取秒数，秒数取佘，得到整数秒数
    second = parseInt(second % 60);
    // 如果分钟大于60，将分钟转换成小时
    if(minute > 60) {
      // 获取小时，获取分钟除以60，得到整数小时
      hour = parseInt(minute / 60);
      // 获取小时后取佘的分，获取分钟除以60取佘的分
      minute = parseInt(minute % 60);
    }
  }
  second = second < 10 ? ('0' + second) : second;
  minute = minute < 10 ? ('0' + minute) : minute;
  hour = hour < 10 ? ('0' + hour) : hour;
  return hour + ':' + minute + ':' + second;
}
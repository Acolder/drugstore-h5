import { Toast } from 'mint-ui';

/* eslint-disable */
export function calculateScore(comScore, versionType) {
  /* 阳虚质--阴虚质--气虚质--痰湿质--湿热质--血瘀质--特禀质--气郁质--平和质 */
  // console.log(comScore);
  let converScore = [];
  for (let i = 0; i < comScore.length; i++) {
    if (comScore[i] == null) {
      comScore[i] = [];
    }
    let everyScore = 0; // 原始分
    let everyLength = comScore[i].length; // 题目数

    if (everyLength > 0) {
      for (let j = 0; j < everyLength; j++) {
        everyScore += comScore[i][j];
      }
      converScore[i] = Math.round([(everyScore - everyLength) / (everyLength * 4)] * 100); // 转化分
    } else {
      converScore[i] = 0;
    }
  }
  console.log(converScore);
  let otherPhy = true; // 其他体质
  let nearOtherPhy = true; // 基本是其他体质
  let otherIndex = []; // 符合其他体质的索引值
  let nearOtherIndex = []; // 符合接近其他体质的索引值

  // 复杂版
  if (versionType === 1 || converScore.length === 9) {
    for (let i = 0; i < converScore.length - 1; i++) {
      if (converScore[i] >= 30) {
        otherPhy = false; // 其他体质转化分非全部小于30
        if (converScore[i] < 40) {
          nearOtherIndex.push(i);
        } else {
          nearOtherPhy = false; // 其他体质转化分非全部小于40
          otherIndex.push(i); // 大于等于40
        }
      }
    }
  } else {
    for (let i = 0; i < converScore.length; i++) {
      if (converScore[i] >= 30) {
        otherPhy = false;// 其他体质转化分非全部小于30
        if (converScore[i] < 40) {
          nearOtherIndex.push(i);
        } else {
          nearOtherPhy = false;// 其他体质转化分非全部小于40
          otherIndex.push(i);// 大于等于40
        }
      }
    }
  }

  // 基本是其他体质
  if (!otherPhy && nearOtherPhy) {
    let flag = 1;
    if (nearOtherIndex.length > 1) {
      for (let i = 0; i < nearOtherIndex.length && flag; i++) {
        flag = 0;
        for (let j = nearOtherIndex.length - 1; j > i; j--) {

          if (converScore[nearOtherIndex[j]] < converScore[nearOtherIndex[j - 1]]) {
            let temp;
            temp = nearOtherIndex[j];
            nearOtherIndex[j] = nearOtherIndex[j - 1];
            nearOtherIndex[j - 1] = temp;

            flag = 1;
          }
        }
      }
      console.log(nearOtherIndex);
      console.log('01');
    } else {
      // 只有一个数
      console.log(nearOtherIndex);
      console.log('02');
    }

  } else if (!otherPhy && !nearOtherPhy) { // 其他体质
    let flag = 1;
    if (otherIndex.length > 1) {
      console.log('more than one');
      console.log(otherIndex);
      console.log(otherIndex.length);

      for (let i = 0; i < otherIndex.length && flag; i++) {
        flag = 0;
        for (let j = otherIndex.length - 1; j > i; j--) {

          if (converScore[otherIndex[j]] > converScore[otherIndex[j - 1]]) {
            let temp;
            temp = otherIndex[j];
            otherIndex[j] = otherIndex[j - 1];
            otherIndex[j - 1] = temp;

            flag = 1;
          }
        }
      }
      console.log(otherIndex);
      console.log('11');
    } else {
      // just one
      console.log(otherIndex);
      console.log('12');
    }
  }

  /* 阳虚质--阴虚质--气虚质--痰湿质--湿热质--血瘀质--特禀质--气郁质--平和质 */
  if (versionType === 1 || converScore.length === 9) {
    if (converScore[converScore.length - 1] >= 60 && otherPhy) {
      // 平和质
      return testResult(8);
    } else if (converScore[converScore.length - 1] >= 60 && nearOtherPhy) {
      /*switch (nearOtherIndex[0]) {
        case 0:
          // 基本是平和质，有阳虚质倾向
          return testResult(0);
          break;
        case 1:
          // 基本是平和质，有阴虚质倾向
          return testResult(1);
          break;
        case 2:
          // 基本是平和质，有气虚质倾向
          return testResult(2);
          break;
        case 3:
          // 基本是平和质，有痰湿质倾向
          return testResult(3);
          break;
        case 4:
          // 基本是平和质，有湿热质倾向
          return testResult(4);
          break;
        case 5:
          // 基本是平和质，有血瘀质倾向
          return testResult(5);
          break;
        case 6:
          // 基本是平和质，有特禀质倾向
          return testResult(6);
          break;
        case 7:
          // 基本是平和质，有气郁质倾向
          return testResult(7);
          break;
      }*/
      return nearOtherIndex[0];
    } else { // 其他体质
      if (otherIndex.length > 0) {
        /*switch (otherIndex[0]) {
          case 0:
            // 阳虚质
            return testResult(0);
            break;
          case 1:
            // 阴虚质
            return testResult(1);
            break;
          case 2:
            // 气虚质
            return testResult(2);
            break;
          case 3:
            // 痰湿质
            return testResult(3);
            break;
          case 4:
            // 湿热质
            return testResult(4);
            break;
          case 5:
            // 血瘀质
            return testResult(5);
            break;
          case 6:
            // 特禀质
            return testResult(6);
            break;
          case 7:
            // 气郁质
            return testResult(7);
            break;
        }*/
        return otherIndex[0];
      } else if (otherIndex.length === 0 && nearOtherIndex.length > 0) {
        /*switch (nearOtherIndex[0]) {
          case 0:
            // 阳虚质
            return testResult(0);
            break;
          case 1:
            // 阴虚质
            return testResult(1);
            break;
          case 2:
            // 气虚质
            return testResult(2);
            break;
          case 3:
            // 痰湿质
            return testResult(3);
            break;
          case 4:
            // 湿热质
            return testResult(4);
            break;
          case 5:
            // 血瘀质
            return testResult(5);
            break;
          case 6:
            // 特禀质
            return testResult(6);
            break;
          case 7:
            // 气郁质
            return testResult(7);
            break;
        }*/
        return nearOtherIndex[0];
      } else {
        Toast('您的答案稍微不够严谨哦！重新作答吧！');
        return 'undefined';
      }
    }
  } else {
    if (otherIndex.length > 0) {
      /*switch (otherIndex[0]) {
        case 0:
          // 阳虚质
          return testResult(0);
          break;
        case 1:
          // 阴虚质
          return testResult(1);
          break;
        case 2:
          // 气虚质
          return testResult(2);
          break;
        case 3:
          // 痰湿质
          return testResult(3);
          break;
        case 4:
          // 湿热质
          return testResult(4);
          break;
        case 5:
          // 血瘀质
          return testResult(5);
          break;
        case 6:
          // 特禀质
          return testResult(6);
          break;
        case 7:
          // 气郁质
          return testResult(7);
          break;
      }*/
      return otherIndex[0];
    } else if (otherIndex.length === 0 && nearOtherIndex.length > 0) {
      /*switch (nearOtherIndex[0]) {
        case 0:
          // 阳虚质
          return testResult(0);
          break;
        case 1:
          // 阴虚质
          return testResult(1);
          break;
        case 2:
          // 气虚质
          return testResult(2);
          break;
        case 3:
          // 痰湿质
          return testResult(3);
          break;
        case 4:
          // 湿热质
          return testResult(4);
          break;
        case 5:
          // 血瘀质
          return testResult(5);
          break;
        case 6:
          // 特禀质
          return testResult(6);
          break;
        case 7:
          // 气郁质
          return testResult(7);
          break;
      }*/
      return nearOtherIndex[0];
    } else {
      // Toast('您的答案稍微不够严谨哦！重新作答吧！');
      // return 'undefined';
      // 平和质
      return testResult(8);
    }
  }
}

// let suggestPageNum = 0;
/* 测试结果显示 */
function testResult(num) {
  console.log('num:' + num);
  return num;
}

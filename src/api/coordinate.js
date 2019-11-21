import wxjs from '@/utils/wxjsInterface';
import { ajaxp } from '@/utils/jsonp';
// 获取当前坐标
function getCoordinate(callback) {
  wxjs.init().then((res) => {
    res.wx.ready(function() {
      res.wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success(res) {
          let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // let speed = res.speed; // 速度，以米/每秒计
          // let accuracy = res.accuracy; // 位置精度
          let mapPoint = mapabcEncryptToBdmap(latitude, longitude);
          let result = {
            latitude: mapPoint.lat,
            longitude: mapPoint.lng,
            speed: res.speed,
            accuracy: res.accuracy
          };
          // alert('当前定位成功' + JSON.stringify(result));
          callback && callback(result);
        },
        fail(res) {
          console.log(res, '当前定位失败');
          // alert('当前定位失败' + JSON.stringify(res));
        },
        cancel(res) {
          let result = 'cancel';
          callback && callback(result);
        },
        complete(dataRes) {
          // alert(778);
          // alert(JSON.stringify(dataRes));
          sessionStorage.setItem('hasGetLocation', 1);
        }
      });
    });
  });
}

// 打开地图 目的地经纬度,名称,地址
function openMap(latitude, longitude, name, address) {
  let mapPoint = bdmapEncryptToMapabc(Number(latitude), Number(longitude));
  let lat = mapPoint.lat;
  let lng = mapPoint.lng;
  // alert(latitude, longitude, name, address);
  wxjs.init().then((res) => {
    // alert('打开地图结果' + JSON.stringify(res));
    res.wx.ready(function() {
      res.wx.openLocation({
        latitude: lat,
        longitude: lng,
        name: name,
        address: address,
        scale: 14,
        infoUrl: '',
        // success(res) {
        //   alert('打开地图成功' + JSON.stringify(res));
        // },
        // fail(res) {
        //   console.log(res, '当前定位失败');
        //   alert('打开地图失败' + JSON.stringify(res));
        // },
      });
    });
  });
}

// 计算距离 lng1(当前经度), lat1(当前纬度), lng2(目的地经度), lat2(目的地纬度)
function distanceByLnglat(lng1, lat1, lng2, lat2) {
  /* eslint-disable */
  lng1 = Number(lng1);
  lat1 = Number(lat1);
  // let point = mapabcEncryptToBdmap(lng1, lat1);
  // lng1 = point.lng;
  // lat1 = point.lat;
  lng2 = Number(lng2);
  lat2 = Number(lat2);
  let radLat1 = Rad(lat1);
  let radLat2 = Rad(lat2);
  let a = radLat1 - radLat2;
  let b = Rad(lng1) - Rad(lng2);
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6371;
  s = Math.round(s * 1000);
  return s;
}

function Rad(d) {
  return d * Math.PI / 180.0;
}

// 输入距离转成km或m，计算时间
function distanceTime(distance) {
  let distanceTxt = '';
  let hintTxt = '';
  let time = Math.round((distance * 1.2 / 1.5) / 60);
  time = time <= 0 ? 1 : time;
  if (distance >= 1000) {
    distanceTxt = (distance / 1000).toFixed(2) + 'km';
  } else {
    distanceTxt = distance + 'm';
  }
  if (distance <= 3000) {
    hintTxt = `${distanceTxt} (步行约${time}分钟)`;
  } else {
    hintTxt = '超出步行范围';
  }
  return {
    distanceTxt: distanceTxt,
    time: time,
    hintTxt: hintTxt
  }
}

// 根据经纬度获取地名
function locationName(latitude, longitude, callback) {
  let latlon = latitude + ',' + longitude;
  // let la = '22.551730572432916,114.05559275391047';
  let url = 'https://api.map.baidu.com/geocoder/v2/?ak=B7dm6TMatflSYBPc5ZS51LnIXBmifqoH&callback=renderReverse&location=' + latlon + '&output=json&pois=0';
  ajaxp({
    url: url,
    jsonp: 'renderReverse',
    data: {},
    success(res) {
      if (res.status === 0) {
        callback && callback(res);
      }
    }
  });
}

// GCJ-02(火星)转BD-09（百度地图）
function mapabcEncryptToBdmap(gg_lat, gg_lon) {
  let point = new Object();
  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  let x = new Number(gg_lon);
  let y = new Number(gg_lat);
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  let bd_lon = z * Math.cos(theta) + 0.0065;
  let bd_lat = z * Math.sin(theta) + 0.006;
  point.lng = bd_lon;
  point.lat = bd_lat;
  //alert("-1:"+point.lng+","+point.lat);
  return point;
}

// BD-09（百度地图）转 GCJ-02(火星)
function bdmapEncryptToMapabc(bd_lat, bd_lon) {
  let point = new Object();
  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  let x = new Number(bd_lon - 0.0065);
  let y = new Number(bd_lat - 0.006);
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  let Mars_lon = z * Math.cos(theta);
  let Mars_lat = z * Math.sin(theta);
  point.lng = Mars_lon;
  point.lat = Mars_lat;
  return point;
}

export {
  getCoordinate,
  openMap,
  distanceByLnglat,
  mapabcEncryptToBdmap,
  bdmapEncryptToMapabc,
  distanceTime,
  locationName
};

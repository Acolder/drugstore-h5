import ajax from '@/utils/ajax';
import { getParamsString } from '@/utils/index';
import { getToken, setToken, setConsultInfo, getUserInfo as getLocaluserInfo } from '@/utils/auth';
import router from '@/router';
let userToken = getToken();

export function login(username, password) {
  // sessionStorage.clear();
  return ajax.post('api/v2/user/login',
    { Mobile: username, Password: password });
}

export function weixinLogin(openId) {
  return ajax.post('/api/user/externalLogin', {
    LoginType: 'weixin',
    OpenId: openId,
  }).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      let data = res.data.data;
      if (data && data.usertoken) {
        setToken(data.usertoken);
      }
    }
  });
}

export function wxLogin(openId) {
  return ajax.post('/api/user/externalLogin', {
    LoginType: 'weixin',
    OpenId: openId,
  });
}

export function logout() {
  return ajax({
    url: '',
    method: 'get'
  });
}
export function getUserByToken(usertoken) {
  return ajax.get('/api/user/info', {
    params: {
      'usertoken': usertoken
    }
  });
}
export function getUserInfo() {
  return ajax.get('/api/user/info', {
    params: {
      usertoken: userToken
    }
  });
}
// 去往登录页
export function goLogin() {
  let returnUrl = location.href;
  sessionStorage.setItem('returnUrl', returnUrl);
  router.push({ path: '/fastLogin' });
}

// 返回缓存中的页面
export function returnPage() {
  let returnUrl = sessionStorage.getItem('returnUrl');
  if (returnUrl) {
    if (returnUrl.indexOf('login') === -1 && returnUrl.indexOf('fastLogin') === -1 && returnUrl.indexOf('findPassword') === -1 && returnUrl.indexOf('bindPhone') === -1) {
      if (returnUrl.indexOf('http') >= 0) {
        console.log('1-地址');
        location.replace(returnUrl);
      } else {
        console.log('2-地址');
        router.replace({
          path: returnUrl
        });
      }
    } else {
      console.log('3-地址');
      router.replace({
        path: '/'
      });
    }
    sessionStorage.removeItem('returnUrl');
  } else {
    router.replace({
      path: '/'
    });
  }
}

// 在线问医入口
export function goInquiry(type) {
  // 保存入口地址
  let documentURl = location.href;
  sessionStorage.setItem('inquiryFromUrl', JSON.stringify(documentURl));
  // 判断是否登录
  let userToken = getToken();
  if (!userToken) {
    goLogin();
  }
  let consultType;
  if (type === 0) {
    consultType = 0; // 0是中医？
  } else {
    consultType = 1; // 1.是在线医生？
  }
  let url = 'api/v2/user/isExistsMember';
  ajax.get(url).then((res) => {
    console.log(res);
    if (res.data.code === 0 && res.status === 200) {
      let returnData = res.data.data;
      if (!returnData.isexistsmember) {
        // 第一次进入页面
        window.location.href = '/inquiry/guideDefault?consultType=' + consultType;
      } else {
        window.location.href = `/inquiry/intoSecond?consultType=${consultType}`;
      }
    } else if (res.data.code === -2) {
      goLogin();
    }
  });
}

// 在线问医
export function intoInquiry(type, callback) {
  // 判断是否登录
  // let userToken = getToken();
  // if (!userToken) {
  //   goLogin();
  // }
  let consultType = type;
  // if (type === 0) {
  //   consultType = 0; // 0是中医？
  // } else {
  //   consultType = 1; // 1.是在线医生？
  // }
  // 把就诊类型存入缓存中.
  setConsultInfo(JSON.stringify({ 'consultType': consultType }));
  // 判断是否已存在就诊人
  let url = 'api/v2/user/isExistsMember';
  ajax.get(url).then((res) => {
    console.log(res);
    if (res.data.code === 0 && res.status === 200) {
      let returnData = res.data.data;
      let href = window.location.href;
      // 1.没有咨询中，候诊中的订单，且没有就诊人,即(第一次进入)
      if (!returnData.isexistsmember) {
        // 第一次进入页面
        if (href.indexOf('/inquiry/guideDefault') === -1) {
          window.location.href = '/inquiry/guideDefault?consultType=' + consultType;
        }
        callback && callback();
      } else {
        // 是否有最近联系人
        if (returnData.memberinfo && JSON.stringify(returnData.memberinfo) !== '{}') {
          let recentMemberInfo = JSON.stringify(returnData.memberinfo);
          sessionStorage.setItem('recentMemberInfo', recentMemberInfo);
        }
        // consultstatus 咨询状态：0未咨询 1咨询中 2咨询结束
        sessionStorage.setItem('consultStatus', returnData.consultstatus);
        // 正在咨询中的医生信息
        if (Number(returnData.consultstatus) === 1) {
          let doctorInfo = {
            user_id: returnData.doctorid, // 医生id
            real_name: returnData.doctorname, // 医生姓名
            doctorphotopath: returnData.doctoravatar, // 医生头像
            groupid: returnData.groupid, // 群主id
            conversationType: 3, // 聊天类型 3 群聊
            consultid: returnData.consultid, // 问诊单id
            remainingseconds: returnData.remainingseconds // 咨询剩余时间（单位秒）
          };
          sessionStorage.setItem('lastDoctorInfo', JSON.stringify(doctorInfo));
        } else {
          sessionStorage.setItem('lastDoctorInfo', JSON.stringify({}));
        }
        if (href.indexOf('/inquiry/intoSecond') === -1) {
          window.location.href = `/inquiry/intoSecond?consultType=${consultType}`;
        }
        callback && callback();
      }
    } else if (res.data.code === -2) {
      goLogin();
    }
  });
}

// 前往e抓药H5
export function goEMedicine() {
  let token = getToken();
  let userInfo = getLocaluserInfo();
  if (userInfo && userInfo.userid && userInfo.rongcloudtoken && token) {
    let queryData = {
      // 药葫芦下单10056 电商平台下单10058
      source: '10056',
      userid: userInfo.userid,
      userToken: token,
      consultSource: '1',
      // 问诊来源：1药葫芦 2问诊室 3药柜 4药箱 5电商
      rongyunToken: encodeURIComponent(userInfo.rongcloudtoken),
      visitUrl: encodeURIComponent(process.env.WEB_HOST)
    };
    let paramsString = getParamsString(queryData);
    console.log(paramsString);
    location.href = `${process.env.E_MEDICINE_HOST}/patSquare/index${paramsString}`;
    // this.$router.push('/chineseDrug/BuyMedicine');
  } else {
    goLogin();
  }
  // if (token) {
  //   router.push({
  //     path: '/chineseDrug/BuyMedicine'
  //   });
  // } else {
  //   goLogin();
  // }
}

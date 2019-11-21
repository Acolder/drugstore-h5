import router  from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import { Toast } from 'mint-ui';
NProgress.configure({ showSpinner: false });
// 路由黑名单
const balackListObj = [
  {
    // 物流详情
    path: '/order/logistics',
  }, {
    // 医生消息
    path: '/allNews',
  }, {
    // 医生订单消息通知
    path: '/allNews/doctorMessage',
  }, {
    // 在线、问医记录
    path: '/myCenter/MedicalRecords',
  }, {
    // 药师记录
    path: '/myCenter/PharmacistRecords',
  }, {
    // 优惠券
    path: '/coupon',
  },
  {
    // 我的头条
    path: '/myCenter/headlines',
  },
  {
    // 寻稀缺药
    path: '/RareDrugs',
  }, {
    // 拍方购药
    path: '/chineseDrug/BuyMedicine',
  }, {
    // 发表评价
    path: '/evaluate/index',
  }, {
    // 订单列表
    path: '/submitOrder/orderList',
  }, {
    // 开发票
    path: '/shopCart/invoice',
  }, {
    // 处方订单
    path: '/prescription/prescription-order',
  }, {
    // 账号管理
    path: '/accountManage',
  }, {
    // 地址管理列表页
    path: '/addressMgr',
  }, {
    // 选择地址页面
    path: '/addressMgr/select',
  }, {
    // 地址编辑页面
    path: '/addressMgr/edit',
  }, {
    // 处方详情
    path: '/prescription/index',
  }, {
    // 购买处方
    path: '/prescription/buy',
  }, {
    // 首页-药品列表
    // path: '/druglist/index',
  }, {
    // 购物车
    path: '/shopCart/index',
  }, {
    // 提交订单（多种方式）
    path: '/submitOrder/multWayDelivery',
  }, {
    // 商品购买订单
    path: '/submitOrder/orderList',
  }, {
    // 支付
    // path: '/payment/index',
  }, {
    // 订单列表
    path: '/submitOrder/orderList',
  }, {
    // 订单详情页
    path: '/order/detail',
  }, {
    // 咨询医师
    path: '/inquiry/consultPharmacist',
  }, {
    //  就诊人管理
    path: '/inquiry/manageinquiryPeople'
  }, {
    //  咨询
    path: '/inquiry/doing'
  }, {
    //  聊天列表
    path: '/inquiry/chatList'
  }, {
    // 体质测试
    // path: '/physique'
  }
  // {
  //   // 医院药柜 我的医生
  //   path: '/hospitalMedicine/myDoctor'
  // }, {
  //   // 医生详情
  //   path: '/doctorDetail'
  // },
  // {
  //   // 微信处方列表
  //   path: '/prescriptionwx/list'
  // }, {
  //   // 微信处方详情
  //   path: '/prescriptionwx/detail'
  // }
];
let balackList = [];
for (let e of balackListObj) {
  balackList.push(e.path);
}
router.beforeEach((to, from, next) => {
  NProgress.start();
  let token = getToken();
  if (token) {
    // has token
    if ((to.path === '/login') || (to.path === '/fastLogin')) {
      next();
      NProgress.done();
    } else {
      next();
    }
  } else {
    // no token
    if (balackList.indexOf(to.path) !== -1) {
      // 黑名单路由，需要登录
      sessionStorage.setItem('returnUrl', to.fullPath);
      console.log(to.fullPath, '保存路由');
      Toast('用户未登录，请先登录');
      next('/fastLogin');
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

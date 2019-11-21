import Vue from 'vue';
import Router from 'vue-router';
import layout from '../views/layout/layout.vue';
import goodsLayout from '../views/goods/layout.vue';
import appLayout from '../views/goods/appLayout.vue';
import inquiryLayout from '../views/inquiry/inquiryLayout.vue';
import healthNotice from '../views/messageNotice/health.vue';
import orderMessage from '../views/messageNotice/order.vue';
// import goodsLink from '../views/goods/goodsLink.vue';
import logistics from '../views/order/logistics.vue';
import classics from '../views/classics/index.vue';
import details from '../views/classics/details.vue';
import humanBody from '../views/self-diagnostic/humanBody.vue';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading2
Vue.use(Router);
export const constantRouterMap = [
  // 症状列表
  {
    path: '/self-diagnostic/symptomList',
    name: 'symptomList',
    component: _import('self-diagnostic/symptomList')
  },
  // 症状详情
  {
    path: '/self-diagnostic/symptomDetail/:id',
    name: 'symptomDetail',
    component: _import('self-diagnostic/symptomDetail')
  },
  // 登录
  {
    path: '/login', component: _import('login/login')
  },
  {
    path: '/em/index', component: _import('e-medicine/index')
  },
  // 快速登录-微信
  {
    path: '/fastLogin', component: _import('login/fastLogin')
  },
  // 快速登录-微信中间页
  {
    path: '/wxLogin', component: _import('login/wxLogin')
  },
  // 微信绑定手机号
  {
    path: '/bindPhone', component: _import('login/bindPhone')
  },
  // 注册
  {
    path: '/registe', component: _import('registe/registe2')
  },
  // 选择国家区号
  {
    path: '/selectCounty', component: _import('registe/selectCountry')
  },
  // 首页
  {
    path: '/',
    name: 'default-name',
    redirect: '/home/index'
  },
  // 中转页
  {
    path: '/hub',
    name: 'hub',
    component: _import('home/hub')
  },
  // 门店地图
  {
    path: '/drugstore/shopMap',
    name: 'drugstore',
    component: _import('drugStoreList/shopMap')
  },
  {
    path: '/home',
    name: 'home',
    component: layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: _import('home/index'),
      },
      // 上传图片
      {
        path: 'wxjsDemo',
        name: 'wxjsDemo',
        component: _import('home/wxjsDemo')
      },
      {
        path: 'wxopenId',
        name: 'wxopenId',
        component: _import('home/wxopenId')
      },
      // 首页-处方详情
      {
        path: 'nurseRecipeDetail',
        name: 'nurseRecipeDetail',
        component: _import('home/nurseRecipeDetail')
      },
      // 首页-病症详情
      {
        path: 'diseaseDetail',
        name: 'diseaseDetail',
        component: _import('home/diseaseDetail')
      }
    ]
  },
  // 首页-调理妙方
  {
    path: '/home/panacea',
    name: 'panacea',
    component: _import('home/panacea')
  },
  // 首页-病症描述详情
  {
    path: '/home/diseaseDescripDetail',
    name: 'diseaseDescripDetail',
    component: _import('home/diseaseDescripDetail')
  },
  {
    // 问诊
    path: '/inquiry',
    name: 'inquiry',
    component: inquiryLayout,
    children: [
      {
        // 问诊向导
        path: 'guideDefault',
        name: 'guideDefault',
        component: _import('inquiry/guideDefault')
      },
      {
        // 管理就诊人
        path: 'manageInquiryPeople',
        name: 'manageInquiryPeople',
        component: _import('inquiry/manageInquiryPeople')
      },
      {
        // 就诊人详细信息
        path: 'inquiryPeopleMes',
        name: 'inquiryPeopleMes',
        component: _import('inquiry/inquiryPeopleMes')
      },
      {
        // 就诊向导二次进入
        path: 'intoSecond',
        name: 'intoSecond',
        component: _import('inquiry/intoSecond')
      },
      {
        // 就诊中
        path: 'doing',
        name: 'doing',
        component: _import('inquiry/doing')
      },
      // {
      //   // 药师推荐，咨询药师
      //   path: 'consultPharmacist',
      //   name: 'consultPharmacist',
      //   component: _import('inquiry/consultPharmacist')
      // },
      // 医生列表页
      {
        path: 'doctorList',
        name: 'doctorList',
        component: _import('inquiry/doctorList')
      },
      // 通用问诊单
      {
        path: 'inquirySheet',
        name: 'inquirySheet',
        component: _import('inquirySheet/index'),
        meta: {
          title: '通用问诊单'
        }
      },
      // 问诊列表
      {
        path: 'chatList',
        name: 'chatList',
        component: _import('allNews/chatList')
      },
      // 医生详情
      // {
      //   path: 'doctorDetail',
      //   name: 'doctorDetail',
      //   component: _import('doctorDetail/index')
      // },
    ]
  },
  {
    // 药师推荐，咨询药师
    path: '/inquiry/consultPharmacist',
    name: 'consultPharmacist',
    component: _import('inquiry/consultPharmacist')
  },
  // 商品，商品详情，商品评论，商品说明书
  {
    path: '/goods',
    redirect: '/goods/goodsDetail',
    name: 'goods',
    component: goodsLayout,
    children: [
      {
        path: 'goodsDetail',
        name: 'goodsDetail',
        component: _import('goods/goodsDetail')
      },
      {
        path: 'goodsEvaluation',
        name: 'goodsEvaluation',
        component: _import('goods/goodsEvaluation')
      },
      {
        path: 'goodsLink',
        name: 'goodsLink',
        component: _import('goods/goodsLink')
      },
      {
        path: 'instruction',
        name: 'instruction',
        component: _import('goods/instruction')
      },
      {
        path: 'goodsLinkNew',
        name: 'goodsLinkNew',
        component: _import('goods/goodsLinkNew')
      },
      {
        path: 'instructionNew',
        name: 'instructionNew',
        component: _import('goods/instructionNew')
      },
    ]
  },
  // app端商品，商品详情，商品评论，商品说明书
  {
    path: '/goodsApp',
    // redirect: '/goods/goodsDetail',
    name: 'goodsApp',
    component: appLayout,
    children: [
      {
        path: 'appGoodsDetail',
        name: 'appGoodsDetail',
        component: _import('goods/appGoodsDetail')
      },
      {
        path: 'goodsAppEvaluation',
        name: 'goodsAppEvaluation',
        component: _import('goods/goodsEvaluation')
      },
      {
        path: 'goodsAppLink',
        name: 'goodsAppLink',
        component: _import('goods/goodsLink')
      },
      {
        path: 'goodsAppinstruction',
        name: 'goodsAppinstruction',
        component: _import('goods/instruction')
      }
    ]
  },
  // 搜索结果页
  {
    path: '/search/result',
    name: 'result',
    component: _import('search/result')
  },
  // 人体详情展示页
  {
    path: '/humanBody/picture',
    name: 'humanPic',
    component: humanBody,
    props: true
  },
  // 购物车
  {
    path: '/shopCart',
    name: 'shopCart',
    component: layout,
    children: [
      {
        path: 'index',
        name: 'shopCartIndex',
        component: _import('shopCart/index')
      },
      // 购物车-支付-开发票
      {
        path: 'invoice',
        name: 'invoice',
        component: _import('shopCart/invoice')
      }
    ]
  },
  // 医生详情
  {
    path: '/doctorDetail',
    name: 'doctorDetail',
    component: _import('doctorDetail/index')
  },
  // 问诊评价-服务评价
  {
    path: '/serviceEvaluation',
    name: 'serviceEvaluation',
    component: _import('doctorDetail/serviceEvaluation')
  },
  // 医生详情-查看全部评论
  {
    path: '/allEvaluation',
    name: 'allEvaluation',
    component: _import('doctorDetail/allEvaluation')
  },
  // 医生详情-查看锦旗
  {
    path: '/allpennant',
    name: 'allpennant',
    component: _import('doctorDetail/allpennant')
  },
  // 首页健康头条
  {
    path: '/headlines',
    name: 'headlines',
    component: _import('headlines/index')
  },
  // 首页健康头条详情
  {
    path: '/headlines/detail',
    name: 'headlines_detail',
    component: _import('headlines/detail')
  },
  // 首页健康头条详情
  {
    path: '/headlines/newsDetail',
    name: 'headlines_newsDetail',
    component: _import('headlines/newsDetail')
  },
  // 中药国医
  {
    path: '/chineseDrug',
    name: 'chineseDrug',
    component: layout,
    children: [
      {
        path: 'index',
        // component: _import('chineseDrug/chineseDrug')
        component: _import('chineseDrug/index')
      }
    ]
  },
  // 中药国药-中药宝典列表
  {
    path: '/chineseDrugList',
    name: 'chineseDrugList',
    component: _import('chineseDrug/chineseDrugList')
  },
  {
    // 中药国药-中药宝典列表-中药宝典详情
    path: '/chineseDrugListDetail',
    name: 'chineseDrugListDetail',
    component: _import('chineseDrug/ChineseDrugListDetail')
  },
  // 寻稀缺药
  {
    path: '/chineseDrug/RareDrugs',
    name: 'RareDrugs',
    component: _import('chineseDrug/RareDrugs')
  },
  // 拍方购药
  {
    path: '/chineseDrug/BuyMedicine',
    name: 'BuyMedicine',
    component: _import('chineseDrug/BuyMedicine')
  },
  // 处方示例
  {
    path: '/chineseDrug/examples',
    name: 'examples',
    component: _import('chineseDrug/examples')
  },
  // 个人中心
  {
    path: '/myCenter',
    name: 'myCenter',
    component: layout,
    children: [
      {
        path: 'index',
        name: 'myCenterIndex',
        component: _import('myCenter/index')
      },
      // 问医记录（进行中和历史记录）
      {
        path: '/myCenter/MedicalRecords',
        name: 'MedicalRecords',
        component: _import('myCenter/MedicalRecords')
      }]
  },
  // 药师记录
  {
    path: '/myCenter/PharmacistRecords',
    name: 'PharmacistRecords',
    component: _import('myCenter/PharmacistRecords')
  },
  // 我的 - 客户服务
  {
    path: '/customerServer',
    name: 'customerServer',
    component: _import('myCenter/customer-server')
  },
  // 我的 - 客户服务 - 问题
  {
    path: '/customerServer/question',
    name: 'customerServerQuestion',
    component: _import('myCenter/customerQuestion/question')
  },
  // 我的 - 客户服务 - 意见反馈
  {
    path: '/customerServer/suggestion',
    name: 'customerServerSuggestion',
    component: _import('myCenter/suggestion')
  },
  // 我的 - 账号管理
  {
    path: '/accountManage',
    name: 'accountManage',
    component: _import('myCenter/account-manage')
  },
  // 我的-优惠券
  {
    path: '/coupon',
    name: 'coupon',
    component: _import('myCenter/coupon')
  },
  // 我的-头条管理
  {
    path: '/myCenter/headlines',
    name: 'headlines',
    component: _import('myCenter/headlines')
  },
  // 消息提示 - 健康头条
  {
    path: '/messageNotice/health',
    name: 'healthNotice',
    component: healthNotice
  },
  // 消息提示 - 订单消息
  {
    path: '/messageNotice/order',
    name: 'orderMessage',
    component: orderMessage
  },
  {
    path: '/messages',
    name: 'messages',
    component: _import('messages/list')
  },
  // 处方订单
  {
    path: '/prescription/prescription-order',
    name: 'prescriptionOrder',
    component: _import('prescription/prescription-order')
  },
  // 微信处方订单列表跳转
  {
    path: '/prescriptionwx/redirect',
    name: 'prescriptionwxRedirect',
    component: _import('prescriptionwx/redirect')
  },
  // 微信处方订单列表
  {
    path: '/prescriptionwx/list',
    name: 'prescriptionwxList',
    component: _import('prescriptionwx/list')
  },
  // 处方订单详情
  {
    path: '/prescription/index',
    name: 'prescriptionDetail',
    component: _import('prescription/index')
  },
  // 微信处方详情
  {
    path: '/prescriptionwx/detail',
    name: 'prescriptionwxDetail',
    component: _import('prescriptionwx/detail')
  },
  // 购买处方
  {
    path: '/prescription/buy',
    name: 'prescriptionBuy',
    component: _import('prescription/buy')
  },
  // 微信购买处方
  {
    path: '/prescriptionwx/buy',
    name: 'WxPrescriptionBuy',
    component: _import('prescriptionwx/buy')
  },
  // 处方详情，物流详情
  {
    path: '/prescription/logisticsDetail',
    name: 'presc_logistics_detail',
    component: _import('prescription/logistics_detail')
  },
  // 地址管理
  {
    path: '/addressMgr',
    name: 'addressMgr',
    component: _import('addressMgr/list')
  },
  // 地址管理-编辑
  {
    path: '/addressMgr/edit',
    name: 'addressEdit',
    component: _import('addressMgr/edit')
  },
  // 地址管理-选择
  {
    path: '/addressMgr/select',
    name: 'addressSelect',
    component: _import('addressMgr/select')
  },
  {
    path: '/addressMgr/citys',
    name: 'addressCity',
    component: _import('addressMgr/citys')
  },
  {
    path: '/addressMgr/map',
    name: 'addressMap',
    component: _import('addressMgr/map')
  },
  // 提交订单（多种方式）
  {
    path: '/submitOrder/multWayDelivery',
    name: 'multWayDelivery',
    component: _import('submitOrder/multWayDelivery')
  },
  // 商品购买订单
  {
    path: '/submitOrder/orderList',
    name: 'orderList',
    component: _import('submitOrder/orderList')
  },
  // 提交订单-选择优惠劵
  {
    path: '/submitOrder/chooseCoupon',
    name: 'chooseCoupon',
    component: _import('submitOrder/chooseCoupon')
  },
  // 订单详情,自提订单详情
  {
    path: '/order/detail',
    name: 'orderDetail',
    component: _import('order/index')
  },
  // 配送详情
  {
    path: '/order/distribution',
    name: 'distribution',
    component: _import('order/distribution')
  },
  // 物流详情
  {
    path: '/order/logistics',
    name: 'logistics',
    component: logistics
  },
  // 药品列表
  {
    path: '/druglist/index',
    name: 'druglist',
    component: _import('drugList/index')
  },
  // 搜索过渡页(药品入口)
  {
    path: '/search/search-transition',
    name: 'searchTransition',
    component: _import('search/search-transition')
  },
  // 搜索过渡页(首页入口)
  {
    path: '/search/index-transition',
    name: 'indexTransition',
    component: _import('search/index-transition')
  },
  // 付款
  {
    path: '/payment/index',
    name: 'payment',
    component: _import('payment/index')
  },
  // 付款成功
  {
    path: '/payment/pay-success',
    name: 'paySuccess',
    component: _import('payment/pay-success')
  },
  // 付款失败
  {
    path: '/payment/pay-error',
    name: 'payError',
    component: _import('payment/pay-error')
  },
  // 症状自诊
  {
    path: '/symptomsSelfDiagnostics',
    name: 'symptomsSelfDiagnosticsIndex',
    component: _import('symptomsSelfDiagnostics/index')
  },
  // 中医典籍
  {
    path: '/classics',
    component: classics,
    children: [
      {
        path: 'classicsSearch',
        component: _import('classics/classicsSearch')
      },
      {
        path: 'classicsResult',
        component: _import('classics/classicsResult')
      },
      {
        path: 'details',
        component: details
      }
    ]
  },
  // 发布评价
  {
    path: '/evaluate/index',
    name: 'evaluate',
    component: _import('evaluate/index')
  },
  // 查看评价
  {
    path: '/evaluate/seeEvaluate',
    name: 'seeEvaluate',
    component: _import('evaluate/seeEvaluate')
  },
  // 关于我们
  {
    path: '/aboutus',
    name: 'aboutus',
    component: _import('aboutUs/index'),
    children: [
      {
        // 产品介绍
        path: 'introduce',
        component: _import('aboutUs/introduce')
      },
      {
        // 用户协议
        path: 'userProtocol',
        component: _import('aboutUs/userProtocol')
      },
      {
        // 账户管理
        path: 'AccountManage',
        component: _import('aboutUs/AccountManage')
      }
    ]
  },
  // 账户管理-微信重定向
  {
    path: '/aboutUs/wxRedirect',
    name: 'wxRedirect',
    component: _import('aboutUs/wxRedirect')
  },
  // 消息
  {
    path: '/allNews',
    component: _import('allNews/index'),
    children: [
      // 医生订单消息
      {
        path: 'doctorMessage',
        component: _import('allNews/doctorMessage')
      },
    ]
  },
  // 聊天列表
  {
    path: '/allNews/myMessages',
    name: 'myMessages',
    component: _import('allNews/myMessages')
  },
  {
    path: '/allNews/sysMsgList',
    name: 'sysMsgList',
    component: _import('allNews/sysMsgList')
  },
  {
    path: '/allNews/preList',
    name: 'preList',
    component: _import('allNews/preList')
  },
  // {
  //   path: '/allNews/chatList',
  //   name: 'chatList',
  //   component: _import('allNews/chatList')
  // },
  // 聊天列表
  {
    path: '/allNews/meChatList',
    name: 'meChatList',
    component: _import('inquiry/Component/meChatList')
  },
  {
    path: '/currentAddress',
    name: 'currentAddress',
    component: _import('currentAddress/index')
  },
  // 专题活动
  // 出行必备
  {
    path: '/special/travelEssential',
    component: _import('special/travelEssential')
  },
  // 康美人参
  {
    path: '/special/renshen',
    component: _import('special/renshen')
  },
  // 春季养生
  {
    path: '/special/mantain',
    component: _import('special/mantain')
  },
  // 出游常备
  {
    path: '/special/travel',
    component: _import('special/travel')
  },
  // 精选好药(爱要大声说出来)
  {
    path: '/special/love',
    component: _import('special/love')
  },
  // 女神节
  {
    path: '/special/womenDay',
    component: _import('special/womenDay')
  },
  // 三九专题
  {
    path: '/special/huaRunspecial',
    component: _import('special/huaRunspecial')
  },
  // 同仁堂专题
  {
    path: '/special/tongren',
    component: _import('special/tongren')
  },
  // 白云山专题
  {
    path: '/special/baiyun',
    component: _import('special/baiyun')
  },
  // 冬季滋补
  {
    path: '/special/newYear',
    component: _import('special/newYear')
  },
  // 年货专题
  {
    path: '/special/newYearGift',
    component: _import('special/newYearGift')
  },
  // 康美精品
  {
    path: '/special',
    component: _import('special/index')
  },
  // 当季常备
  {
    path: '/special/standing',
    component: _import('special/standing')
  },
  // 精选好药
  {
    path: '/special/stomachHealth',
    component: _import('special/stomachHealth')
  },
  // 美容养颜
  {
    path: '/special/cosmetology',
    component: _import('special/cosmetology')
  },
  // 情趣计生
  {
    path: '/special/planning',
    component: _import('special/planning')
  },
  // 跨境购药
  {
    path: '/special/crossBorder',
    component: _import('special/crossBorder')
  },
  // 全球直采
  {
    path: '/special/global',
    component: _import('special/global')
  },
  // 流感专题
  {
    path: '/special/liugan',
    component: _import('special/liugan')
  },
  // 药师邀请同行 (医生端app)
  {
    path: '/invitePeers/druggistInvite',
    name: 'invitePeersDruggistInvite',
    component: _import('app/invitePeers/druggistInvite')
  },
  // 医生邀请同行 (医生端app)
  {
    path: '/invitePeers/doctorInvite',
    name: 'invitePeersDoctorInvite',
    component: _import('app/invitePeers/doctorInvite')
  },
  // 使用说明 (医生端app)
  {
    path: '/useHelps/helps',
    name: 'useHelps',
    component: _import('app/useHelps/useHelps')
  },
  // 自提取货订单
  {
    path: '/order/ordersBySelf',
    name: 'ordersBySelf',
    component: _import('order/OrdersBySelf')
  },
  // 二维码生成地址
  {
    path: '/QRcode/index',
    name: 'QRcode',
    component: _import('QRcode/index')
  },
  {
    path: '/QRcode/wxtemp',
    name: 'wxtemp',
    component: _import('QRcode/wxtemp')
  },
  // 信息提示页面
  {
    path: '/QRcode/information',
    name: 'information',
    component: _import('QRcode/information')
  },
  // 找回密码
  {
    path: '/findPassword',
    name: 'findPassword',
    component: _import('findPassword/index')
  },
  // app 产品介绍
  {
    path: '/introduce/index',
    name: 'introduce',
    component: _import('app/introduce/index')
  },
  {
    path: '/introduce/default',
    name: 'introduceDefault',
    component: _import('app/introduce/default')
  },
  {
    path: '/introduce/merchants',
    name: 'merchants',
    component: _import('app/introduce/merchants')
  },
  {
    path: '/introduce/yaohuluHD',
    name: 'yaohuluHD',
    component: _import('app/introduce/yaohuluHD')
  },
  // h5
  // // 商品优惠劵
  // {
  //   path: '/merchandiseCoupons/merchandiseCoupons',
  //   name: 'merchandiseCoupons',
  //   component: _import('app/merchandiseCoupons/merchandiseCoupons')
  // },
  // // 满减商品页
  // {
  //   path: '/fullScaleActivities/Activities',
  //   name: 'Activities',
  //   component: _import('app/fullScaleActivities/Activities')
  // },
  // // 三九品牌专题
  // {
  //   path: '/brandSpecial/brandSpecial',
  //   name: 'brandSpecial',
  //   component: _import('app/brandSpecial/brandSpecial')
  // },
  // // 超值特卖
  // {
  //   path: '/premiumSale/premiumSale',
  //   name: 'premiumSale',
  //   component: _import('app/premiumSale/premiumSale')
  // },
  // 中医体质测试
  // 体质测试首页
  {
    path: '/physique',
    name: 'physique',
    component: _import('app/physique/index')
  },
  // 体质测试记录
  {
    path: '/physique/record',
    name: 'physiqueRecord',
    component: _import('app/physique/record')
  },
  // 体质报告
  {
    path: '/physique/report',
    name: 'physiqueReport',
    component: _import('app/physique/report')
  },
  // 经络介绍
  {
    path: '/physique/channels',
    name: 'channels',
    component: _import('app/physique/channels')
  },
  // app - 分享体质报告，所有内容显示
  {
    path: '/physique/reportnew',
    name: 'physiqueReportnew',
    component: _import('app/physique/reportnew')
  },
  // app - 分享体质报告，中转页
  {
    path: '/physique/redirect',
    name: 'physiqueRedirect',
    component: _import('app/physique/redirect')
  },
  // app - 分享帖子详情页
  {
    path: '/cardShare/cardDetail_share',
    name: 'cardDetail_share',
    component: _import('app/cardShare/cardDetail_share')
  },
  // app - 体质报告new，部分内容显示，跳转公众号，等待迭代
  {
    path: '/physique/reportapp',
    name: 'physiqueReportapp',
    component: _import('app/physique/reportapp')
  },
  // app -我的脉诊报告中转页
  {
    path: '/physique/reportListRedirect',
    name: 'reportListRedirect',
    component: _import('app/physique/reportListRedirect')
  },
  // app -我的脉诊报告
  {
    path: '/physique/reportList',
    name: 'physiquereportList',
    component: _import('app/physique/reportList')
  },
  // app-查看更多体质报告，关注公众号
  {
    path: '/physique/focusOn',
    name: 'focusOn',
    component: _import('app/physique/focusOn')
  },
  // 医生端报告
  {
    path: '/physique/reportDoctor',
    name: 'reportDoctor',
    component: _import('app/physique/reportDoctor')
  },
  // 养生药膳
  {
    path: '/physique/healthfood',
    name: 'healthFood',
    component: _import('app/physique/healthfood')
  },
  // 体质测试结果
  {
    path: '/physique/result',
    name: 'physiqueResult',
    component: _import('app/physique/result')
  },
  // 体质测试建议
  {
    path: '/physique/suggest',
    name: 'physiqueSuggest',
    component: _import('app/physique/suggest')
  },
  // 体质解读
  {
    path: '/physique/physical',
    name: 'physical',
    component: _import('app/physique/physical')
  },
  // 推广员注册页面
  {
    path: '/popularize/register',
    name: 'popularizeRegister',
    component: _import('app/popularize/register ')
  },
  // 推广注册完成提示页
  {
    path: '/popularize/tips',
    name: 'popularizeTips',
    component: _import('app/popularize/Tips')
  },
  // 膏方详情
  {
    path: '/physique/prescribeDetail',
    name: 'physiquePrescribeDetail',
    component: _import('app/physique/prescribeDetail')
  },
  // 中药国医-国医在线
  {
    path: '/chineseMedicine/doctorList',
    name: 'chineseMedicineDoctorList',
    component: _import('app/chineseMedicine/doctorList2')
  },
  // 中药国医-国医在线H5端，带头部
  {
    path: '/chineseMedicine/dctList',
    name: 'doctorListForH5',
    component: _import('app/chineseMedicine/doctorListForH5')
  },
  // 中药国医-国医在线-医生详情
  {
    path: '/chineseMedicine/doctorDetail',
    name: 'chineseMedicineDoctorDetail',
    component: _import('app/chineseMedicine/doctorDetail')
  },
  // 个人信息页面入口
  {
    path: '/personalInfo/index',
    name: 'personalInfoIndex',
    component: _import('personalInfo/index')
  },
  // 个人信息展示页面
  {
    path: '/personalInfo/info',
    name: 'personalInfo',
    component: _import('personalInfo/info')
  },
  // 个人信息 - 地址列表
  {
    path: '/personalInfo/addressList',
    name: 'personalAddressList',
    component: _import('personalInfo/addressList')
  },
  // 个人信息 - 添加地址
  {
    path: '/personalInfo/addAddress',
    name: 'personalAddAddress',
    component: _import('personalInfo/addAddress')
  },
  // 404页面
  {
    path: '/error/pageNoFound',
    name: 'pageNoFound',
    component: _import('errorPage/pageNoFound')
  },
  // 微信打开提示页面
  {
    path: '/error/weChatOpenTip',
    name: 'weChatOpenTip',
    component: _import('errorPage/weChatOpenTip')
  },
  // demo 页面
  {
    path: '/home/demo',
    name: 'demo',
    component: _import('home/demo')
  },
  // 医生帮助文档
  {
    path: '/app/doctorHelper',
    name: 'doctorHelper',
    component: _import('app/doctorHelper/list')
  },
  // 医生帮助文档
  {
    path: '/app/doctorHelper/details',
    name: 'doctorHelperDetail',
    component: _import('app/doctorHelper/details')
  },
  // APP下载页面
  {
    path: '/qrcodePage',
    name: 'qrcodePage',
    component: _import('qrcodePage/index')
  },
  // 中医药材
  {
    path: '/medicinalMaterials',
    name: 'medicinalMaterials',
    component: _import('chineseDrug/medicinalMaterials'),
    children: [
      {
        // 中医药材详情
        path: 'Details',
        component: _import('chineseDrug/medicinalMaterialsDetails')
      },
    ]
  },
  // 隐私政策
  {
    path: '/PrivacyPolicy',
    name: 'PrivacyPolicy',
    component: _import('app/PrivacyPolicy/index')
  },
  // 隐私政策(杏林圣手)
  {
    path: '/appPrivacyPolicy',
    name: 'appPrivacyPolicy',
    component: _import('app/PrivacyPolicy/appPrivacy')
  },
  // 中秋国庆专题
  {
    path: '/special/nationalDay',
    name: 'nationalDay',
    component: _import('special/nationalDay')
  },
  // 营养保健专题
  {
    path: '/special/nutrition',
    name: 'nutrition',
    component: _import('special/nutrition')
  },
  // 年终钜惠
  {
    path: '/special/yearEndBenefits',
    name: 'yearEndBenefits',
    component: _import('special/yearEndBenefits')
  },
  // 分享-微循环
  {
    path: '/share/weixunhuan',
    name: 'weixunhuan',
    component: _import('app/share/weixunhuan')
  },
  // 脉诊仪设备 借还首页
  {
    path: '/equipment/index',
    name: 'equipmentIndex',
    component: _import('equipment/equipmentIndex')
  },
  // 脉诊仪设备 登录
  {
    path: '/equipment/login',
    name: 'equipmentLogin',
    component: _import('equipment/equipmentLogin')
  },
  // 脉诊仪设备 借还协议
  {
    path: '/equipment/equipmentAgreement',
    name: 'equipmentAgreement',
    component: _import('equipment/equipmentAgreement')
  },
  // 脉诊仪设备 微信支付
  {
    path: '/equipment/equipmentPayment',
    name: 'equipmentPayment',
    component: _import('equipment/equipmentPayment')
  },
  // 脉诊仪设备 微信付款 须前往payment
  {
    path: '/payment/equipmentPay',
    name: 'equipmentPay',
    component: _import('payment/equipmentPay')
  },
  // 脉诊仪设备 物流信息
  {
    path: '/equipment/equipmentLogistics',
    name: 'equipmentLogistics',
    component: _import('equipment/equipmentLogistics')
  },
  // 脉诊仪设备 租借脉诊仪
  {
    path: '/equipment/equipmentLease',
    name: 'equipmentLease',
    component: _import('equipment/equipmentLease')
  },
  // 脉诊仪设备 提交订单
  {
    path: '/equipment/equipmentLeaseSubmission',
    name: 'equipmentLeaseSubmission',
    component: _import('equipment/equipmentLeaseSubmission')
  },
  // 脉诊仪设备 确认订单
  {
    path: '/equipment/equipmentLeaseConfirm',
    name: 'equipmentLeaseConfirm',
    component: _import('equipment/equipmentLeaseConfirm')
  },
  // 脉诊仪设备 提交成功
  {
    path: '/equipment/equipmentLeaseComplete',
    name: 'equipmentLeaseComplete',
    component: _import('equipment/equipmentLeaseComplete')
  },
  // 脉诊仪设备 我的借还
  {
    path: '/equipment/equipmentMyList',
    name: 'equipmentMyList',
    component: _import('equipment/equipmentMyList')
  },
  // 脉诊仪设备 我的租借详情
  {
    path: '/equipment/equipmentMyListDetails',
    name: 'equipmentMyListDetails',
    component: _import('equipment/equipmentMyListDetails')
  },
  // 脉诊仪设备 我的确认收货完成
  {
    path: '/equipment/equipmentMyListReceiptCompleted',
    name: 'equipmentMyListReceiptCompleted',
    component: _import('equipment/equipmentMyListReceiptCompleted')
  },
  // 脉诊仪设备 归还
  {
    path: '/equipment/equipmentReturn',
    name: 'equipmentReturn',
    component: _import('equipment/equipmentReturn')
  },
  // 脉诊仪设备 归还详情页
  {
    path: '/equipment/equipmentReturnDetails',
    name: 'equipmentReturnDetails',
    component: _import('equipment/equipmentReturnDetails')
  },
  // 脉诊仪设备 归还成功
  {
    path: '/equipment/equipmentReturnSuccess',
    name: 'equipmentReturnSuccess',
    component: _import('equipment/equipmentReturnSuccess')
  },
  // 脉诊仪设备 内部介绍页
  {
    path: '/equipment/equipmentInsideIntroduce',
    name: 'equipmentInsideIntroduce',
    component: _import('equipment/equipmentInsideIntroduce')
  },
  // 脉诊仪设备 内部体验申请
  {
    path: '/equipment/equipmentInsideApply',
    name: 'equipmentInsideApply',
    component: _import('equipment/equipmentInsideApply')
  },
  // 脉诊仪设备 内部体验申请成功
  {
    path: '/equipment/equipmentInsideSuccess',
    name: 'equipmentInsideSuccess',
    component: _import('equipment/equipmentInsideSuccess')
  },
  // 脉诊仪设备 企业合作
  {
    path: '/equipment/equipmentEnterprise',
    name: 'equipmentEnterprise',
    component: _import('equipment/equipmentEnterprise')
  },
  // 脉诊仪设备 企业合作申请成功
  {
    path: '/equipment/equipmentEnterpriseSuccess',
    name: 'equipmentEnterpriseSuccess',
    component: _import('equipment/equipmentEnterpriseSuccess')
  },
  // 验证收礼手机
  {
    path: '/gift/phone',
    name: 'phone',
    component: _import('gift/phone')
  },
  // 查看店铺
  {
    path: '/gift/seeSort',
    name: 'sort',
    component: _import('gift/seeSort')
  },
  // 康美人生礼品
  {
    path: '/gift/receive',
    name: 'receive',
    component: _import('gift/receive')
  },
  // 领取店铺优惠券
  {
    path: '/markes/markes',
    name: 'markes',
    component: _import('markes/markes')
  },
  // app脉诊仪页面 介绍
  {
    path: '/app/equipment/introduce',
    name: 'appEquipmentIntroduce',
    component: _import('app/equipment/introduce')
  },
  // 医院药柜 信息填写/显示页中转页
  {
    path: '/hospitalMedicine/infoRegRedirect',
    name: 'infoRegRedirect',
    component: _import('hospitalMedicine/infoRegRedirect')
  },
  // 医院药柜 信息填写/显示页
  {
    path: '/hospitalMedicine/infoReg',
    name: 'infoReg',
    component: _import('hospitalMedicine/infoReg')
  },
  // 医院药柜 我的医生
  {
    path: '/hospitalMedicine/myDoctor',
    name: 'myDoctor',
    component: _import('hospitalMedicine/myDoctor')
  },
  {
    path: '/hospitalMedicine/doctorRedirect',
    name: 'myDoctorRedirect',
    component: _import('hospitalMedicine/doctorRedirect')
  },
  // 医院药柜 去咨询医生
  {
    path: '/hospitalMedicine/goConsultDoctor',
    name: 'goConsultDoctor',
    component: _import('hospitalMedicine/goConsultDoctor')
  },
  // 公众号-脉诊仪报告-待迭代
  {
    path: '/report/report',
    name: 'report',
    component: _import('report/report')
  },
  // 药房门店列表
  {
    path: '/drugStoreList/list',
    name: 'drugstoreList',
    component: _import('drugStoreList/list')
  },
  // 附近药柜-查看药柜
  {
    path: '/MedicineCabinet/CheckDrug',
    name: 'CheckDrug',
    component: _import('MedicineCabinet/CheckDrug')
  },
  // 附近药柜-地图
  {
    path: '/MedicineCabinet/near',
    name: 'near',
    component: _import('MedicineCabinet/near')
  },
  // 附近药柜-搜索药品
  {
    path: '/MedicineCabinet/searchDrug',
    name: 'searchDrug',
    component: _import('MedicineCabinet/searchDrug')
  },
  {
    path: '/drugStoreList/shopData',
    name: 'shopMap',
    component: _import('drugStoreList/shopMap')
  },
];
export const asyncRouterMap = [];
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0, x: 0 }),
  routes: constantRouterMap
});

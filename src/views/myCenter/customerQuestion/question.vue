<template>
  <div class="has-header question-page">
    <mt-header fixed :title="title">
      <a href="javascript:void(0);" @click="$router.go(-1);" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <ul class="questions">
      <li v-for="(data, index) in tempData" :key="index">
        <p class="title">{{ index + 1 }} 、 {{ data.qus }}</p>
        <p v-html="data.ans"></p>
      </li>
    </ul>
  </div>
</template>

<script>
import { Header } from 'mint-ui';
import { getQueryString } from '@/utils/index';
export default {
  name: 'question',
  data() {
    return {
      title: '', // 标题
      tempData: '', // 页面显示数据
      titleTemp: { 'produce': '商品类问题', 'distribution': '配送类问题', 'use': '使用类问题', 'afterSales': '售后类问题' },
      questionTemp: {
        // 商品类问题
        'produce': [{ qus: 'Q：你们的药是正品吗？', ans: 'A：请您放心，我们是由国家药监局认证的合法药品销售网站，保证正品。' },
          { qus: 'Q：为什么这次购买的价格和上次不一样？', ans: 'A：商品价格会受促销活动、商品进价调整等因素影响，所以商品价格会有小范围波动。' },
          { qus: 'Q：什么是代煎？', ans: 'A：代煎即帮忙煎煮中药，寄到手上即可随时服用，无需自己煎煮<br />PS：适宜不知中药煎煮方法、家里不方便煎煮、没时间煎煮客户，拿到手的药材汤液，温热之后即可撕开真空包装服用。' },
          { qus: 'Q：代煎费怎么算？', ans: 'A：三剂起代煎，代煎费大概3元/剂，根据具体药品类别会有差异。广东省外暂不代煎。' },
          { qus: 'Q：药品怎么服用？', ans: 'A：不代煎药品，根据医生嘱咐服用或纸袋提示的煎煮方法进行煎煮服用；代煎药品，需用热水泡热后撕开真空包装服用。' },
          { qus: 'Q：代煎药品可以放多久？', ans: 'A：正常情况下，代煎药放冰箱冷藏存放3-4周，20度以下避光阴凉处存放5-7天 。' },
          { qus: 'Q：购买处方药需要什么东西？', ans: 'A：如果购买的药品没有“OTC”标记，则该药品为处方药，购买时请提供医疗机构医师开具的药房，并根据处方上的药品名称、规格、剂量进行购买，不得超量购买。处方开出当日有效，特殊情况下需要延长有效日期的，由开具处方的医师注明有效期限，但有效期最长不得超过3天。' },
          { qus: 'Q：怎么查看商品是否有优惠活动？', ans: 'A：点开商品页面，如果有优惠活动，会显示具体活动，添加购物车去结算的时候会自动显示优惠后的金额。' },
          { qus: 'Q：能购买含麻黄碱的药品吗？', ans: 'A：购买含麻黄碱的药品，需要提供真实有效的身份证。如果含麻黄碱的药品为处方药，必须提供医疗机构医师开具的处方，购买数量限2个最小包装单位，并登记个人信息及联系方式；如果含麻黄碱药品为非处方药（含麻黄碱30mg以下）可不需提供处方，购买数量限2个最小包装单位，并登记个人信息及联系方式。' }],
        // 配送类问题
        'distribution': [{ qus: 'Q：支持什么配送方式？', ans: 'A：目前支持附近药柜自提、附近药店即时配送、自营商城传统配送这三种方式。' },
          { qus: 'Q：多久可以送达？', ans: 'A：根据您选择的配送方式，附近药柜自提药品的时间参考您步行至药柜的时长；附近药店即时配送的时间需要30-120分钟；自营商城配送的时间需要1-7天。' },
          { qus: 'Q：我的订单很长时间都没有送达怎么办？', ans: 'A：您可在“订单状态”中关注您的配送详情，如有问题也可以联系在线客服了解情况。' },
          { qus: 'Q：配送范围是怎样的？', ans: 'A：配送范围覆盖全国不包括港澳台地区，具体的配送范围及运费以快递公司相关标准为准。代煎中药暂不配送广东省外。' },
          { qus: 'Q：运费是多少？', ans: 'A：当您形成订单以后，系统会根据您所选择的收货地址，以及货品的重量自动为您核算运费，运费将自动生成在订单内。' }],
        // 使用类问题
        'use': [{ qus: 'Q：如何购买？', ans: 'A：（1）药葫芦平台上面展示的商品可直接下单购买，选择配送方式，支付后即可等候配送 <br />（2）点击拍方抓药---上传正规处方清晰照片---完善个人信息--提交订单---等待后台计价---点击查看详情进行支付---等候送货上门。' },
          { qus: 'Q：收不到验证码怎么办？', ans: 'A：可能是由于网络或者供应商原因导致您暂时无法接收到验证码，建议您重新尝试获取，或者尝试更换下单手机或者设备。' },
          { qus: 'Q：忘记登录密码怎么办？', ans: 'A：您可以在移动端登录界面，选择“快速登录”，使用手机号码通过验证后登录，或者点击“忘记密码”，经过验证重新设置您的登录密码。' }],
        // 售后类问题
        'afterSales': [{ qus: 'Q：怎样退货？', ans: 'A：需要退货的请与在线客服沟通，符合下列药品退换货要求的，可以退货。<br />1、由于产品本身存在质量原因，经甲方质量管理部门检验，确属质量问题的。<br />3、乙方因自身提供的地址不全或错误，使得商品未送达成功被退回的。<br />4、 国家权威管理部门发布公告的产品（如停售、收回等）。' },
          { qus: 'Q：如何获得发票？', ans: 'A：你可以在下订单时选择“需要发票”，发票会随药品一起送到，如未收到发票，请联系客服' }]
      }
    };
  },
  components: {
    'mt-header': Header
  },
  methods: {
    setData() {
      const _this = this;
      let type = getQueryString('type');
      _this.title = _this.titleTemp[type];
      _this.tempData = _this.questionTemp[type];
    }
  },
  mounted() {
    // 为页面添加相应数据
    this.setData();
  }
};
</script>

<style lang="less" scoped>
  .question-page {
    min-height: 100%;
    background: #fff;
  }
  .questions {
    padding: 15px 12px;
    background: #fff;
    li {
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 1.7;
      .title {
        font-size: 16px;
      }
    }
  }
</style>

<template>
  <div class="shadeWrapper" v-show="hide">
    <div class="shade">
    </div>
    <div class="userProtocol">
      <div class="userProtocol-header">
        <h3>脉诊仪租赁合同</h3>
        <img src="./imgs/icon-gb@2x.png" alt="" @click="Return()">
      </div>
      <div class="content">
        <div class="paragraph">
          <p>甲方（出租方）：康美智慧医药科技（深圳）有限公司</p>
          <p>地址：深圳市下梅林二街颂德国际大厦</p>
          <p>电话：0755-82530837</p>
          <p>传真：0755-82530837</p>
        </div>
        <div class="paragraph">
          <p>乙方（承租方）：</p>
          <p>地址：</p>
          <p>电话：</p>
          <p>传真：</p>
        </div>
        <div class="paragraph">
          <p>甲、乙双方经友好协商，达成一致意见，根据相关法律、法规，订立本合同，以资共同遵守。</p>
        </div>
        <div class="paragraph">
          <h4>一、租赁设备</h4>
          <h5>1、设备清单：脉诊仪____台。</h5>
          <h5>2、租赁期限：____年____月____日至____年____ 月____日，共计____个月。若乙方需要延长租赁期限的，应于租赁期限到期前15个工作日向甲方提出书面申请，经协商一致的，双方另行签订租赁合同。</h5>
        </div>
        <div class="paragraph">
          <h4>二、租赁费用与支付</h4>
          <h5>1、设备租金：每月人民币 ____元，大写人民币______________圆整，本合同总租金________元，大写人民币__________圆整。</h5>
          <h5>2、租金按月支付，乙方应于每月____日前通过______________（银行转账/电汇/汇票/其他方式）支付当月租金；乙方每逾期一日，应按逾期租金总额每天加收万分之三的违约金金。</h5>
          <h5>3、甲方账户信息：</h5>
          <h5>开户行：上海浦东发展银行股份有限公司深圳梅林支行  </h5>
          <h5>户名：康美智慧医药科技（深圳）有限公司</h5>
          <h5>账号：79330078801000000286</h5>
        </div>
        <div class="paragraph">
          <h4>三、保证金与设备交付</h4>
          <h5>1、设备保证金：人民币____元，大写人民币______________圆整，甲方在收到保证金及首月租金之日起____个工作日内将设备交付给乙方，甲方向乙方出具保证金收据。</h5>
          <h5>2、交付方式____________，运输费用由____方承担。</h5>
        </div>
        <div class="paragraph">
          <h4>四、设备的归还</h4>
          <h5>1、乙方需在租期结束第二日将所租设备退还，甲方在收到乙方归还的设备之日起15个工作日内，将保证金全额无息归还给乙方；若甲方在归还验收时发现设备存在损坏的，甲方有权不予返还保证金；如保证金数额不足以弥补维修费用及甲方损失的，乙方应全额补足。设备归还的运输费用及运输风险由乙方承担。</h5>
          <h5>2、乙方若要续租，需在租赁期限届满前15日与甲方书面协商一致重新签署租赁合同。若乙方租赁同一设备连续达12个月后，乙方享有优先购买权。</h5>
        </div>
        <div class="paragraph">
          <h4>五、甲、乙双方的权利与义务</h4>
          <h5>1、甲方的权利与义务</h5>
          <h6>1.1甲方须保证为乙方所提供设备符合国家相关法规，确保设备质量。</h6>
          <h6>1.2甲方有义务为乙方提供有关该设备的流程培训指导及咨询。甲方为乙方提供每月/每年____次免费咨询解答，如因乙方人员变动等原因需要甲方增加培训指导次数的，应按_____________________的标准支付费用。如需甲方提供上门指导的，甲方人员的食宿、交通等费用由乙方承担。</h6>
          <h6>1.3若设备损坏，甲方有权扣除保证金并要求乙方补足设备维修费用。如要续租，双方需重新签定租赁合同。甲方有权在本合同租赁期限届满后的任何时候收回该设备及收取必要的逾期费用。</h6>
          <h5>2、乙方的权利与义务：</h5>
          <h6>2.1乙方有权对甲方提供的设备质量进行检查。如发现质量问题，乙方应在接收设备后3个工作日内提出书面异议，要求甲方更换；如乙方逾期未提出异议，则视为甲方提供的设备经验收合格。</h6>
          <h6>2.2因乙方原因导致甲方设备丢失、损毁、被盗等的，乙方需配合甲方参与调查和处理，并赔偿甲方全部费用。</h6>
          <h6>2.3 乙方在租用期间不得转租，不能中途退租。</h6>
          <h6>2.4乙方不能擅自拆改设备，必须妥善正确使用，确保设备完好无损，否则造成的一切损失由乙方承担。</h6>
        </div>
        <div class="paragraph">
          <h4>六、保密条款</h4>
          <h5>任何一方对在本合同签署、履行过程中悉知另一方的商业秘密及本协议的内容承担保密义务，包括但不限于技术资料、客户信息等；未经另一方的事先书面同意，任何一方不得将需保密内容披露给第三方。</h5>
        </div>
        <div class="paragraph">
          <h4>七、违约责任</h4>
          <h5>1、除本合同另有约定外，任何一方违反本合同，造成另一方损失的，应赔偿由此造成另一方的全部实际损失，包括但不限于设备维修费用、诉讼费、合理的律师费用等。</h5>
          <h5>2、除本合同另有约定外，任何一方不得将本合同项下的权利义务转给第三方。</h5>
          <h5>3、租赁期限届满，乙方未按照合同约定归还设备的，应自逾期归还之日起，按照每日该设备日租金的两倍向甲方支付违约金。合同有效期内，若乙方未按时支付租金，甲方可按逾期租金总额每天加收乙方万分之三的违约金。</h5>
          <h5>4、合作期限内，如双方协商一致可提前解除本合同。如乙方违反合同约定，甲方有权随时解除合同，要求乙方归还设备及应付租金等费用；未经甲方书面同意，乙方提前终止合同的，除归还设备并按实际承租期限支付租金外，还须向甲方支付月租金2倍的违约金。</h5>
          <h5></h5>
        </div>
        <div class="paragraph">
          <h4>八、不可抗力</h4>
          <h5>本合同所指的不可抗力是指战争、地震、重大疫情等。由于不可抗力致使合同无法履行或无法全部履行的，受不可抗力方应在10日内将事故情况通知另一方。</h5>
        </div>
        <div class="paragraph">
          <h4>九、争议解决方式</h4>
          <h5>1、双方同意，在本合同签署后，对本合同任何未尽事宜，可进行进一步的协商，并达成补充协议。该补充协议构成本合同不可分割的组成部分，具有同等法律效力。</h5>
          <h5>2、本协议书有任何未尽事宜及本协议书所产生的所有争议须由双方通过友好协商解决。协商不成，任何一方可将争议提交合同签订地人民法院解决。</h5>
        </div>
        <div class="paragraph">
          <h4>十、合同生效与终止</h4>
          <h5>1、本合同经双方法定代表人或授权代表签字并盖章之日起生效，自合同权利义务履行完毕之日止。</h5>
          <h5>2、若需续约，需在租赁期届满前15日与对方协商一致，双方重新签订租赁合同。</h5>
          <h5>3、本合同提前解除或期满终止后，乙方应配合甲方在合同解除或到期的次日将所有设备退还甲方。</h5>
        </div>
        <div class="paragraph">
          <h4>十一、其他</h4>
          <h5>本协议书壹式贰份，双方各持壹份。双方在此确认，本协议书的所有条款经双方充分协商，为双方的真实意思表示，不构成任何一方的格式条款。以下无本协议正文。</h5>
        </div>
        <div class="paragraph">
          <h4>甲方：（盖章）</h4>
          <h4>签约代表：</h4>
          <h4>签约时间：</h4>
        </div>
        <div class="paragraph">
          <h4>乙方：（盖章）</h4>
          <h4>签约代表：</h4>
          <h4>签约时间：</h4>
        </div>
      </div>
      <div class="read">
        <span @click="Return()">已阅读</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hide: 'false'
    };
  },
  methods: {
    Return() {
      this.$emit('handle');
    },
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';
@color: #333;
.shadeWrapper {
  height: 100%;
  .shade {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9;
  }
  .userProtocol {
    width: 90%;
    height: 85%;
    background-color: #ffffff;
    border-radius: 7px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 10;
    padding-bottom: 60px;
    .userProtocol-header {
      position: relative;
      height: 52px;
      h3 {
        height: 52px;
        line-height: 52px;
        color: @color;
        font-size: 18px;
        text-align: center;
      }
      img {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 24px;
        height: 24px;
      }
    }
    .content {
      text-align: left;
      position: absolute;
      top: 52px;
      left: 0;
      right: 0;
      bottom: 60px;
      padding: 0 14px;
      color: @color;
      overflow: auto;
      h3{
        font-weight: bold;
        line-height: 30px;
        font-size: 15px;
      }
      .paragraph{
        margin-bottom: 30px;
      }
      p {
        // text-indent: 2em;
        font-size: 15px;
        line-height: 24px;
      }
      h5,h6{
        font-size: 15px;
        line-height: 24px;
        font-weight: normal;
      }
    }
    .read {
      width: 100%;
      position: absolute;
      bottom: 60px;
      background-color: #fff;
      span {
        display: block;
        width: 79px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 3px;
        border: solid 1px @green-color;
        position: absolute;
        left: 50%;
        top: 16px;
        margin-left: -39px;
        color: @green-color;
        font-size: 15px;
      }
    }
  }
}

</style>
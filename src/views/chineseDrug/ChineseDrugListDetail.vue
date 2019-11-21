<template>
  <div id="drugDetailsWrap">
    <mt-header fixed title="白菊花">
      <router-link to="/chineseDrugList" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <div class="Chrysanthemum">
        <img src="http://iph.href.lu/301x198?text=药品图片"/>
      </div>
      <div class="describe">
        <div>别名</div>
        <p>甘菊、家菊、白菊花、杭菊花、贡菊花、甜菊花</p>
        <div>英文学名</div>
        <p>Flos Chrysanthemi</p>
        <div>性味</div>
        <p>辛、甘、苦、微寒</p>
        <div>归经</div>
        <p>肺、肝</p>
        <div>功效</div>
        <div class="effect">
          <i>1.有效疏散风热；感冒风热及温病初起之证</i>
          <i>2.平肝明目；肝经风热或肝阳上亢之目疾、头晕</i>
          <i>3.清热解毒的功效；清肝明目和平肝多用白菊花，热证用白菊花，白菊花是泄</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
  data() {
    return {};
  },
  components: {
    'mt-header': Header
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.content{
  width: 100%;
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 1;
}
.Chrysanthemum{
  padding: 10px 12px;
  box-sizing: border-box;
  text-align: center;
  img{
    width: 301px;
    height: 200px;
    width: 100%;
  }
}
.describe{
  padding-left: 10px;
  div{
    margin: 4px 0;
    font-size: 16px;
    color: #333;
  }
  p{
    font-size: 14px;
    color: #333;
    margin: 0 0 10px 0;
  }
  .effect{
    width: 320px;
    i{
      display: block;
      color: #333;
      font-size: 14px;
      line-height: 22px;
    }
  }
}
</style>
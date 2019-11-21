<template>
  <div class="cmpt-wrapper bkg-img">
    <div class="description">
      <p>定位服务开启失败，请到系统中开启定位，</p>
      <p>将为您匹配最近的药店、药柜服务。</p>
    </div>
    <div class="button-wapper">
      <button type="button" @click.stop="setAddress()">设置地址</button>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../styles/mixin.less';
.cmpt-wrapper {
  height: 100%;
  padding-top: 278px;
  &.bkg-img {
    background-image: url(./img/icon_dwsb@2x.png);
    background-repeat: no-repeat;
    background-size: 195px 186px;
    background-position: center 78px;
  }
  .description {
    font-size: 14px;
    margin-bottom: 25px;
    color: #666;
    p {
      text-align: center;
    }
  }
  .button-wapper {
    margin-bottom: 12px;
    text-align: center;
    button {
      display: inline-block;
      line-height: 36px;
      border: 1px solid @green-color;
      border-radius: 18px;
      width: 140px;
      text-align: center;
      color: @green-color;
    }
  }
}

</style>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {

    };
  },
  methods: {
    ...mapActions([
      'SetSearchConditions'
    ]),
    setAddress() {
      this.$router.push({
        path: '/addressMgr/select',
        query: { from: 'druglist' }
      });
    }
  },
  mounted() {
    // let address = JSON.parse(sessionStorage.getItem('selectedAddress'));
    // if (address) {
    //   // let coordinate = { 'latitude': address.latitude, 'longitude': address.longitude };
    //   // sessionStorage.setItem('coordinate', JSON.stringify(coordinate));
    //   let conditions = this.searchConditions;
    //   conditions.latitude = address.latitude;
    //   conditions.longitude = address.longitude;
    //   // this.SetSearchConditions(conditions);
    // }
  },
  computed: {
    ...mapGetters([
      'searchConditions'
    ])
  },
};

</script>

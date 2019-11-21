<template>
  <div class="txt-border" @click="openMaps">
    <img src="./img/icon-bxdh.png">
    <label>步行导航</label>
  </div>
</template>
<script>
import { openMap } from '@/api/coordinate';
export default {
  props: {
    sellerUser: Object
  },
  methods: {
    openMaps() {
      let sellerUser = this.sellerUser;
      if (sellerUser) {
        let latitude = sellerUser.latitude; // 目的地纬度
        let longitude = sellerUser.longitude; // 目的地经度
        let name = sellerUser.sellerName;
        let addr = sellerUser.sellerAddress;
        openMap(latitude, longitude, name, addr);
      }
    }
  }
};

</script>
<style lang="less" scoped>
  .txt-border {
    max-width: 76px;
    font-size: 12px;
    padding: 2px 5px;
    border: solid 1px#333;
    border-radius: 4px;
    text-align: center;
    img {
      float: left;
      width: 12px;
      height: 14px;
      margin: 4px 2px 0 2px;
    }
  }
</style>


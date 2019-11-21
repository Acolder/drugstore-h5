<template>
  <div class="citys_wrapper" ref="wrapper">
    <mt-header fixed title="城市">
      <a slot="left" href="javascript:;" @click="goback">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="citys_search_bar">
      <input type="search" placeholder="请输入搜索城市" v-model="keyWord" />
      <ul class="fuzzy" v-show="showSearch">
        <li v-for="(f,i) in fuzzy" :key="i" @click.stop="selectCity(f)">{{f}}</li>
      </ul>
    </div>
    <div class="currentcity" v-show="!showSearch">
      <div class="title">当前定位城市</div>
      <div class="location_city">
        <span class="cityname" @click="selectCity(currentCity.replace('市',''))">{{currentCity}}</span>
        <button class="location" @click.stop="locate">重新定位</button>
      </div>
    </div>
    <div class="citys_hot" v-show="!showSearch">
      <div class="title">国内热门城市</div>
      <div class="hot-citys">
        <span @click="selectCity('北京')">北京</span>
        <span @click="selectCity('上海')">上海</span>
        <span @click="selectCity('深圳')">深圳</span>
      </div>
      <div class="hot-citys">
        <span @click="selectCity('广州')">广州</span>
        <span @click="selectCity('成都')">成都</span>
        <span @click="selectCity('杭州')">杭州</span>
      </div>
    </div>
    <citysPicker v-show="!showSearch" @nav="nav" @selectCity="selectCity"></citysPicker>
  </div>
</template>
<style lang="less" scoped>
@import '../../styles/mixin.less';

.citys_wrapper {
  padding-top: 88px;
  height: 100%;
  overflow-y: auto;

  .citys_search_bar {
    .border-1px(#e0e0e0);
    background-color: #fff;
    position: fixed;
    top: 44px;
    padding: 0 8px;
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;

    input {
      font-size: 14px;
      width: 100%;
      border: none;
      background-color: #f5f5f5;
      height: 30px;
      line-height: 30px;
      padding-left: 14px;
    }

    .fuzzy {
      position: absolute;
      left: 0;
      top: 37px;
      z-index: 1;
      background-color: #fff;
      width: 100%;
      height: 84.71vh;
      overflow-y: auto;

      li {
        display: block;
        width: 100%;
        padding-left: 22px;
        line-height: 44px;
      }
    }
  }

  .currentcity {
    .border-1px(#e0e0e0);
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px 0;

    .title {
      color: #888;
      font-size: 12px;
      padding-left: 14px;
    }

    .location_city {
      display: flex;

      span {
        flex: 1;
        display: flex;
        color: #333;
        font-size: 17px;
        font-weight: bold;
        justify-content: flex-start;
        align-items: center;
        padding-left: 14px;
      }

      button {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 14px;
        color: #ff4c56;
        font-size: 13px;

        &:before {
          content: " ";
          display: inline-block;
          width: 24px;
          height: 24px;
          background-image: url(./img/con_xh_dwhy@2x.png);
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    }
  }

  .citys_hot {
    margin-top: 15px;

    .title {
      color: #888;
      font-size: 12px;
      padding-left: 14px;
      margin-bottom: 1.4vh;
    }

    .hot-citys {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1.5vh;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28vw;
        height: 4.8vh;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
      }
    }
  }
}

</style>
<script>
import citysPicker from '@/components/addressPicker/citys-picker';
import { searchCity, locate, getAddress } from '@/api/addressMgr';
export default {
  data() {
    return {
      keyWord: '',
      currentCity: '定位中...',
    };
  },
  mounted() {
    this.locate();
  },
  components: {
    citysPicker
  },
  computed: {
    fuzzy() {
      return searchCity(this.keyWord);
    },
    showSearch() {
      if (this.keyWord) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    nav(p) {
      setTimeout(() => {
        if (p === 'top') {
          this.$refs['wrapper'].scrollTop = 0;
        } else {
          let top = this.$refs['wrapper'].scrollTop;
          this.$refs['wrapper'].scrollTop = top - 88;
        }
      }, 100);
    },
    selectCity(c) {
      sessionStorage.setItem('selectedCity', c + '市');
      this.goback();
    },
    async locate() {
      this.currentCity = '定位中...';
      let p = await locate();
      let address = await getAddress(p);
      this.currentCity = address.city;
    },
    goback() {
      this.$router.replace({
        path: this.$route.query.path,
        query: this.$route.query
      });
    }
  }
};

</script>

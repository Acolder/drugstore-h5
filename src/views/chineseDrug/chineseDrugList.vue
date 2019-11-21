<template>
  <div id="chineseDrugWrap">
    <mt-header fixed title="睡不着">
      <router-link to="/chineseDrug" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="searchWrap">
      <search-input :hasBack="false"></search-input>
    </div>
    <div class="effectWrap">
      <div class="effectLeft">
        <!-- <mt-loadmore ref="loadmore"> -->
        <ul>
          <li v-for="(item, index) in listDetail" :key="index" @click="listAction(index)" :class="{'active':num == index}">{{item}}</li>
        </ul>
        <!-- </mt-loadmore> -->
      </div>
      <div class="effectRight">
        <div style="height:1000px;">
          <p class="HumidifyingDrug">
            <span>化湿药</span>
          </p>
          <ul class="drugs">
            <li v-for="(item, index) in CardamomList" :key="index" @click="junpDetail(index)">
              <img src="" class="Cardamom-imgs"/>
              <div class="Cardamom-details">
                <span>{{item}}</span>
                <p class="sigleTextOverflow">乐山大佛干嘛什么收到了放空管马赛克阿道夫干十点半啥活电脑</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Header, InfiniteScroll } from 'mint-ui';
import searchInput from '../../components/search/searchInput';
export default {
  data() {
    return {
      listDetail: ['解表', '清热', '温里', '泻下', '平肝', '理气', '化湿', '祛风', '利水', '清毒', '化痰', '凉血', '补益', '开窍', '安神', '活血', '收涩', '消食', '呕吐', '驱虫', '外用'],
      CardamomList: ['白豆蔻', '草果', '草豆蔻', '苍术', '广藿香', '红豆蔻', '厚朴花'],
      num: 0
    };
  },
  components: {
    'mt-header': Header,
    'search-input': searchInput,
    'mt-ul': InfiniteScroll
  },
  methods: {
    listAction(index) {
      this.num = index;
    },
    junpDetail() {
      this.$router.push({
        path: '/ChineseDrugListDetail'
      });
    },
    loadMore() {
      this.loading = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/mixin.less";
@color: #333;
#chineseDrugWrap{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.searchWrap {
  width: 100%;
  height: 44px;
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 7;
  .search-input {
    position: static;
  }
}
.active {
  // background: url(./imgs/line-ckyg.png) no-repeat left;
  // background-size: 3%;
  border-left: solid 3px @green-color;
  background-color: #fff;
}
.effectWrap {
  width: 100%;
  height: 667px;
  background: #fff;
  position: fixed;
  top: 88px;
  left: 0;
  bottom: 0;
  z-index: 6;
  .effectLeft {
    width: 79px;
    height: 100%;
    overflow: scroll;
    float: left;
    background-color: #f6f6f6;
    ul {
      li {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
      }
    }
  }
  .effectRight {
    width: 296px;
    height: 100%;
    float: left;
    position: absolute;
    left: 79px;
    background: #fff;
    padding-left: 15px;
    box-sizing: border-box;
    overflow: scroll;
    .HumidifyingDrug {
      height: 34px;
      line-height: 34px;
      border-bottom: 1px solid #e0e0e0;
    }
    .drugs {
      li {
        height: 67px;
        border-bottom: 1px solid #e0e0e0;
        .Cardamom-imgs {
          float: left;
          width: 46px;
          height: 46px;
          margin-top: 10px;
        }
        .Cardamom-details {
          float: left;
          width: 235px;
          padding-left: 15px;
          margin-top: 14px;
          span {
            color: @color;
            font-size: 14px;
          }
          .sigleTextOverflow {
            width: 180px;
          }
        }
      }
    }
  }
}
</style>


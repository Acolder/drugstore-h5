<template>
  <div class="druglist-wrapper" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <div class="drug-header-wrapper headerfixed" :style="{'top':fixedTop+'px'}">
      <drug-header @search="search" ref="drug_header" :fixedTop="fixedTop"></drug-header>
    </div>
    <div class="list_wrapper" v-if="!isEmpty">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <ul class="drug_list" :class="{nomore:showNomore}" :style="{'min-height': listHeight()+'px'}">
          <drug-item v-for="drug in drugs" :drug="drug" :key="drug.product_id"></drug-item>
        </ul>
      </mt-loadmore>
      <!--       <div class="nomore" v-show="showNomore">没有更多了</div> -->
    </div>
    <div class="nothing" v-else>
      <dr-hasnotlocated v-if="!conditions.latitude&&!conditions.longitude&&conditions.activeMenuId!==2"></dr-hasnotlocated>
      <dr-nothing v-else></dr-nothing>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import drugListHeader from '../drugListHeader/index';
import drugListItem from '../drugListItem/index';
import java from '@/utils/javaApiRequest';
import { Loadmore, Indicator } from 'mint-ui';
import nothing from '@/components/nothingDataPage/search';
import hasnotlocated from '@/components/hasnotLocated/index';
export default {
  data() {
    return {
      'drugs': [],
      'searchUrl': `${process.env.ES_BASE_HOST}/elasticsearch/batsearch/getProductMerge`,
      'allLoaded': false,
      'scrollMode': 'auto',
      'conditions': {},
      'bottomText': '上拉加载更多...',
      'showNomore': false,
      'coordinate': {}
    };
  },
  components: {
    'drug-header': drugListHeader,
    'drug-item': drugListItem,
    'mt-loadmore': Loadmore,
    'dr-nothing': nothing,
    'dr-hasnotlocated': hasnotlocated
  },
  props: {
    keywords: {
      default: ''
    },
    fixed: {
      default: false
    },
    fixedTop: {
      default: 44
    }
  },
  methods: {
    ...mapActions([
      'SetSearchConditions'
    ]),
    searchDrugs(isCover) {
      Indicator.open();
      this.conditions = this.searchConditions;
      console.log('conditions:');
      console.log(this.conditions);
      let data = {
        'keyword': this.conditions.keywords,
        'devicetype': 'h5',
        'accountId': '',
        'userDeviceId': '',
        'page': this.conditions.page,
        'sortField': this.conditions.sortField,
        'sort': this.conditions.sortType,
        'categoryName': this.conditions.categoryName,
        'product_bar_code': ''
      };
      let coordinate = JSON.parse(sessionStorage.getItem('coordinate'));
      if (coordinate) {
        data.lat = coordinate.latitude;
        data.lon = coordinate.longitude;
      } else {
        data.lat = 0;
        data.lon = 0;
      }
      return java.post(this.searchUrl, data).then((res) => {
        Indicator.close();
        if (res && res.status === 200 && res.data && String(res.data.resultCode) === '0') {
          this.$nextTick(function() {
            this.scrollMode = 'touch';
          });
          let resultLength = res.data.resultData.content.length || 0;
          let total = res.data.resultData.totalElements;
          let length = this.drugs.length + resultLength;
          let hasMore = total > length && total > 0;
          this.isHaveMore(hasMore);
          if (isCover) {
            this.drugs = res.data.resultData.content;
          } else {
            this.drugs = this.drugs.concat(res.data.resultData.content);
          }
        }
      });
    },
    async more() {
      this.conditions.page = this.conditions.page + 1;
      this.SetSearchConditions(this.conditions);
      await this.searchDrugs(false);
    },
    search() {
      this.searchDrugs(true);
    },
    loadTop: function() {
      this.conditions.page = 0;
      this.SetSearchConditions(this.conditions);
      this.searchDrugs(true).then((res) => {
        this.$refs.loadmore.onTopLoaded();
      });
    },
    loadBottom: function() {
      this.more().then(() => {
        this.$refs.loadmore.onBottomLoaded();
      });
    },
    isHaveMore(isHaveMore) {
      this.allLoaded = true;
      this.showNomore = true;
      if (isHaveMore) {
        this.allLoaded = false;
        this.showNomore = false;
      }
    },
    clearCategory() {
      this.$refs['drug_header'].clear();
    },
    listHeight() {
      let dh = document.body.offsetHeight;
      let top = this.fixedTop + 52;
      return dh - top;
    }
  },
  computed: {
    ...mapGetters([
      'searchConditions'
    ]),
    isEmpty: function() {
      return this.drugs.length === 0;
    }
  }
};

</script>
<style lang="less" scoped>
.druglist-wrapper {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background-color: #fff;

  .drug-header-wrapper {
    &.headerfixed {
      position: fixed;
      z-index: 5;
      left: 0;
      right: 0;
    }
  }

  .list_wrapper {
    padding-top: 52px;

    /deep/.drug_list {
      &.nomore {
        padding-bottom: 30px;

        li {
          &:last-child {
            position: relative;

            &:after {
              content: "没有更多了~";
              display: flex;
              width: 100%;
              height: 30px;
              background-color: #f8f8f8;
              position: absolute;
              bottom: -30px;
              left: 0;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
  }

  .nothing {
    height: 100%;
    background-color: #fff;
  }
}

</style>

<template>
  <div class="druglist-header">
    <ul class="menus-wrapper">
      <li class="menu" @click.stop="popCategories" :class="{active:activeId==='0'}"><span>{{searchConditions.categoryName||currentCn}}</span></li>
      <li class="menu" :class="{active:activeId==='1'}"><span @click.stop="sortBy('1')">默认</span></li>
      <li class="menu" :class="{active:activeId==='2'}"><span @click.stop="sortBy('2')">销量</span></li>
      <li class="menu" :class="{active:activeId==='3'||activeId==='4'}"><span class="sortable" @click.stop="sortByPrice">价格</span></li>
    </ul>
    <div class="category_mask" v-show="showCategory" :style="{'top':(fixedTop+52)+'px'}">
      <div class="categories">
        <div class="categories_row" v-for="(row,rIndex) in ctrArray" :key="rIndex">
          <span v-for="(c,i) in row" :key="i" :class="{item:c.category_name!=='', active: c.category_name===searchConditions.categoryName}" @click.stop="selectCategory(c.category_name)">{{c.category_name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import java from '@/utils/javaApiRequest';
export default {
  data() {
    return {
      showMenu: false,
      showCategory: false,
      categories: [],
      currentCn: '全部',
      priceAsc: true,
      activeId: '0'
    };
  },
  props: {
    fixedTop: {
      default: 44
    }
  },
  methods: {
    ...mapActions([
      'SetSearchConditions'
    ]),
    search() {
      this.$emit('search');
    },
    popCategories() {
      this.showCategory = !this.showCategory;
      this.activeId = '0';
    },
    sortBy(s) {
      this.showMenu = false;
      let conditions = this.searchConditions;
      this.activeId = s;
      switch (s) {
        case '1':
          conditions.sortField = '';
          conditions.sortType = 'asc';
          break;
        case '2':
          conditions.sortField = 'product_sales_volume';
          conditions.sortType = 'desc';
          break;
        case '3':
          conditions.sortField = 'guiding_price';
          conditions.sortType = 'desc';
          break;
        case '4':
          conditions.sortField = 'guiding_price';
          conditions.sortType = 'asc';
          break;
      }
      this.SetSearchConditions(conditions);
      this.search();
    },
    sortByPrice() {
      if (this.priceAsc) {
        this.sortBy('4');
      } else {
        this.sortBy('3');
      }
      this.priceAsc = !this.priceAsc;
    },
    getCategories() {
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/Category/getProductCTopNew`;
      java.post(url).then((res) => {
        if (res && res.status === 200 && res.data && String(res.data.resultCode) === '0') {
          this.categories = res.data.resultData;
        }
      });
    },
    selectCategory(cn) {
      this.showCategory = false;
      if (!cn) {
        return;
      }
      this.currentCn = cn;
      let conditions = this.searchConditions;
      conditions.categoryName = cn;
      conditions.keywords = '';
      this.SetSearchConditions(conditions);
      this.search();
    },
    clear() {
      this.currentCn = '全部';
      let conditions = this.searchConditions;
      conditions.categoryName = '';
      this.SetSearchConditions(conditions);
    }
  },
  mounted() {
    this.getCategories();
    document.addEventListener('click', () => {
      this.showCategory = false;
    });
  },
  computed: {
    ...mapGetters([
      'searchConditions'
    ]),
    ctrArray: function() {
      let array = this.categories;
      let result = [];
      for (let i = 0, len = array.length; i < len; i += 4) {
        result.push(array.slice(i, i + 4));
      }
      if (result.length > 0 && result[result.length - 1].length < 4) {
        for (let j = 4 - result[result.length - 1].length; j > 0; j--) {
          result[result.length - 1].push({ category_name: '' });
        }
      }
      return result;
    }
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';

.druglist-header {
  position: relative;
  z-index: 1;
  background: #fff;
  height: 52px;
  .border-1px(#e0e0e0);

  .menus-wrapper {
    margin: 0 auto;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    position: relative;

    .menu {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 15px;

      &.active {
        span {
          z-index: 1;
          border-bottom: 2px solid @green-color;
          color: #0ccdd3;
        }
      }

      span {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;

        &.sortable {
          position: relative;

          &:after {
            content: "";
            display: inline-block;
            width: 8px;
            height: 12px;
            position: absolute;
            top: 20px;
            right: -14px;
            background-image: url(./img/icon_gg@2x.png);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }
        }
      }
    }
  }

  .category_mask {
    position: fixed;
    z-index: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);

    .categories {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      z-index: 1;
      padding-bottom: 8px;

      .categories_row {
        display: flex;
        padding: 0 8px;
        margin-top: 4px;
        justify-content: space-around;

        span {
          flex: none;
          height: 30px;
          width: 20.933%;
          font-size: 15px;
          color: #333;

          &.item {
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #eee;

            &.active {
              color: @green-color;
              background-color: #fff;
              border: 1px solid @green-color;
            }
          }
        }
      }
    }
  }
}

</style>

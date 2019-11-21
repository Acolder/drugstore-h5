<template>
  <div class="page">
    <div class="search_wrapper">
      <search-input @onSearch="search" :keywords="conditions.keywords"></search-input>
    </div>
    <drug-list ref="drug_list"></drug-list>
    <shop-cart></shop-cart>
  </div>
</template>
<style lang="less" scoped>
.page {
  height: 100%;
  padding-top: 44px;
  cursor: pointer;

  .search_wrapper {
    position: fixed;
    z-index: 1000000000;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
  }
}

</style>
<script>
import search from '@/components/search/searchInput.vue';
import druglist from '@/components/drugsResult/index.vue';
import shopcart from '@/components/inquiryCar/index.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      conditions: {
        keywords: ''
      }
    };
  },
  components: {
    'drug-list': druglist,
    'search-input': search,
    'shop-cart': shopcart
  },
  methods: {
    ...mapActions([
      'SetSearchConditions'
    ]),
    search(keywords) {
      this.conditions.keywords = keywords;
      this.SetSearchConditions(this.conditions);
      this.go();
      this.$refs['drug_list'].clearCategory();
    },
    go() {
      this.$refs['drug_list'].searchDrugs(true);
    }
  },
  mounted() {
    this.conditions = this.searchConditions;
    if (this.$route.params.categoryName) {
      this.conditions.categoryName = this.$route.params.categoryName;
      this.conditions.keywords = '';
      this.conditions.page = 0;
      this.conditions.sortField = '';
      this.conditions.sort = 'ASC';
    }
    let coordinate = JSON.parse(sessionStorage.getItem('coordinate'));
    this.conditions.latitude = coordinate.latitude;
    this.conditions.longitude = coordinate.longitude;
    this.SetSearchConditions(this.conditions);
    this.go();
  },
  computed: {
    ...mapGetters([
      'searchConditions'
    ])
  }
};

</script>

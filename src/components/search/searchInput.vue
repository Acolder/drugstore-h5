<template>
  <div class="display-box search-input" :class="position_fixed?'position_fixed':''">
    <a href="javascript:history.back(-1)" class="router-link-active back-btn" v-show="hasBack">
        <i class="mintui mintui-back"></i>
    </a>
    <!--<div class="box-flex mint-searchbar">-->
    <!--<div class="mint-searchbar-inner">-->
    <!--<i class="mintui mintui-search"></i>-->
    <!--<input type="search" placeholder="搜索" class="mint-searchbar-core">-->
    <!--</div>-->
    <!--<label class="mint-searchbar-cancel" style="">取消</label>-->
    <!--</div>-->
    <div class="box-flex">
      <i class="mintui mintui-search"></i>
      <input v-model.trim="keyword" :placeholder="placeholderTxt" class="input-txt" @blur="inputBlur"/>
    </div>
    <!--<mt-search v-model="keyword" placeholder="请输入搜索关键字" class="box-flex"></mt-search>-->
    <div @click="search" class="txt" v-show="searchyes">搜索</div>
    <!--<mt-button class="" type="default" @click="search"><i class="mintui mintui-search"></i></mt-button>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: ''
    };
  },
  props: {
    keywords: {
      type: String,
      default: ''
    },
    hasBack: {
      type: Boolean,
      default: true
    },
    placeholderTxt: {
      type: String,
      default: '请输入搜索关键字'
    },
    position_fixed: {
      type: Boolean,
      default: true,
    },
    searchyes: {
      type: Boolean,
      default: true,
    }
  },
  mounted() {
    this.defKeywords();
  },
  methods: {
    search() {
      let _self = this;
      _self.$emit('onSearch', _self.keyword);
    },
    defKeywords() {
      if (this.keywords !== '') {
        this.keyword = this.keywords;
      }
    },
    // 输入框失焦
    inputBlur() {
      let _self = this;
      _self.$emit('inputsBlur');
      console.log('视角');
    }
  },
  watch: {
    // 监听搜索关键字是否改变
    keyword: function(newValue) {
      let _self = this;
      _self.$emit('keywordChange', newValue);
      console.log('改变');
    },
    keywords: function(newValue) {
      this.keyword = newValue;
    }
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';
@colorf3: #eeeef3;
.back-btn {
  margin-right: 5px;
}
.position_fixed {
  position: fixed;
}
.search-input {
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  padding: 0 12px;
  border-bottom: @border-line;
  background: @white-color;
  z-index: 5;
  .box-flex {
    position: relative;
    margin: 0 12px 0 0;
    .mintui-search {
      position: absolute;
      left: 12px;
      top: 1px;
      font-size: 12px;
      color: #999;
    }
    .input-txt {
      width: 100%;
      height: 28px;
      padding: 0 16px 0 30px;
      font-size: 12px;
      color: #999;
      background: #eeeef3;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0;
      box-sizing: border-box;
      outline: 0;
      border-radius: 20px;
      margin-top: 7px;
    }
  }
  .txt {
    color: #666;
  }
}

.search-btn {
  height: 28px;
}

</style>

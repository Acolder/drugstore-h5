<template>
  <div class="keywords-wrapper">
    <div class="scroll"> <span v-for="w in words" :class="{active:activeId===w.id}" @click.stop="selectWord(w)" :key="w.id">
    {{w.text}}  </span></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      words: [{ 'id': '0', 'text': '全部' }, { 'id': '1', 'text': '风寒感冒' }, { 'id': '2', 'text': '流行性感冒' }, { 'id': '3', 'text': '感冒咳嗽' }, { 'id': '4', 'text': '流感' }],
      activeId: '0'
    };
  },
  methods: {
    selectWord(w) {
      this.activeId = w.id;
      this.$emit('selectWord', w);
    }
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';
.keywords-wrapper {
  overflow: hidden;
  width: 100%;
  height: 44px;
  .border-1px(#e0e0e0);
  padding-top: 6px;
  .scroll {
    overflow-x: scroll;
    min-width: 100%;
    height: 50px;
    white-space: nowrap;
    padding-left: 15px;
  }
  span {
    display: inline-block;
    border-radius: 15px;
    margin-right: 15px;
    line-height: 30px;
    height: 30px;
    padding: 0 12px;
    border: 1px solid #ccc;
    color: #333;
    &.active {
      color: @green-color;
      border: 1px solid @green-color;
    }
  }
}

</style>

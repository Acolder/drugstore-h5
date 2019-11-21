<template>
  <label>{{time}}</label>
</template>

<script>
export default {
  data() {
    return {
      time: '',
      flag: false,
      sTime: 0,
      intTimer: null
    };
  },
  props: ['surplusTime'],
  mounted() {
    this.timeInit();
  },
  methods: {
    timeInit() {
      let _this = this;
      this.sTime = this.surplusTime / 1000;
      this.intTimer = setInterval(function () {
        if (_this.flag === true) {
          clearInterval(this.intTimer);
        }
        _this.timeDown();
      }, 1000);
    },
    timeDown: function () {
      let h = this.formate(Math.floor(this.sTime / 3600));
      let m = this.formate(Math.floor((this.sTime - h * 3600) / 60));
      let s = this.formate(Math.floor((this.sTime - h * 3600) % 60));
      if (this.sTime <= 0) {
        h = '00';
        m = '00';
        s = '00';
        this.flag = true;
        this.$emit('timeEnd', 'end');
        return false;
      }
      this.time = `${h}:${m}:${s}`;
      this.sTime--;
    },
    formate: function (time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  },
  destroyed() {
    clearInterval(this.intTimer);
  }
};
</script>

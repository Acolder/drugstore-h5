// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Cube from 'cube-ui';
import router from './router';
import store from './store';
import './accessControl';
import 'babel-polyfill';
import mint from 'mint-ui';
import VueScroller from 'vue-scroller';
import App from './App';
// import { Style, Scroll, ScrollNavBar, BetterScroll } from 'cube-ui';
// import './styles/common.less';
// import BaiduMap from 'vue-baidu-map';
Vue.config.productionTip = false;
// Vue.use(ElementUI);
Vue.use(Cube);
Vue.use(mint);
Vue.use(VueScroller);
// Vue.use(Style, Scroll, ScrollNavBar, BetterScroll);
// 使用百度地图插件
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'B7dm6TMatflSYBPc5ZS51LnIXBmifqoH'
// });

// eslint-disable-next-line
/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

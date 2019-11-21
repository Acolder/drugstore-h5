import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import chatMsg from './modules/chatMsg';
import app from './modules/app';
import drug from './modules/drug';
import unReadMsg from './modules/unreadMsg';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    chatMsg,
    drug,
    unReadMsg,
  },
  getters
});

export default store;

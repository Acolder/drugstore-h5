const app = {
  state: {
    tabbar: 'home'
  },
  mutations: {
    SET_TABBAR: (state, tabbarName) => {
      state.tabbar = tabbarName;
    }
  },
  actions: {
    setTabbar({ commit }, tabbarName) {
      commit('SET_TABBAR', tabbarName);
    }
  }
};

export default app;
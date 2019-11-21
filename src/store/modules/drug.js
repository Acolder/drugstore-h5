// import { setToken, setRongcloudtoken } from '@/utils/auth';
const drug = {
  state: {
    searchConditions: {
      keywords: '',
      categoryName: '',
      latitude: 0,
      longitude: 0,
      page: 0,
      sortField: '',
      sort: 'ASC'
    }
  },
  mutations: {
    SET_CONDITIONS: (state, conditions) => {
      state.searchConditions = conditions;
    }
  },
  actions: {
    SetSearchConditions({ commit }, conditions) {
      commit('SET_CONDITIONS', conditions);
    }
  }
};
export default drug;

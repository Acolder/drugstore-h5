import { setToken, setUserInfo, setRongcloudtoken } from '@/utils/auth';
import { login, getUserInfo, wxLogin } from '@/api/user';

const user = {
  state: {
    userid: '',
    nickname: '',
    phone: '',
    token: '',
    avatar: ''
  },
  mutations: {
    SET_USERID: (state, id) => {
      state.userid = id;
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname;
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    }
  },
  actions: {
    UserLogin({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if (response.data && response.data.code === 0) {
            const data = response.data.data;
            commit('SET_TOKEN', data.usertoken);
            setToken(data.usertoken);
            setRongcloudtoken(data.rongcloudtoken);
          }
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    weixinLogin({ commit }, unionid) {
      return new Promise((resolve, reject) => {
        wxLogin(unionid).then(response => {
          console.log(response, 'response');
          if (response.data && response.data.code === 0) {
            const wxdata = response.data.data;
            commit('SET_TOKEN', wxdata.usertoken);
            setToken(wxdata.usertoken);
            setRongcloudtoken(wxdata.rongcloudtoken);
          }
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (!response.data) {
            let e = new Error('获取用户信息失败！');
            reject(e);
          }
          const data = response.data.data;
          commit('SET_USERID', data.userid);
          commit('SET_TOKEN', data.nickname);
          commit('SET_PHONE', data.mobile);
          commit('SET_AVATAR', data.photopath);
          let userStr = JSON.stringify(data);
          setUserInfo(userStr);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
  }
};

export default user;

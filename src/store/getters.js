const getters = {
  tabbar: state => state.app.tabbar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  phone: state => state.user.phone,
  chatMsg: state => state.chatMsg.messages,
  chatMsgFirst: state => state.chatMsg.chatMsgFirst,
  consultVX: state => state.chatMsg.consult,
  searchConditions: state => state.drug.searchConditions,
  unReadMsg: state => state.unReadMsg.unReadMsg,
};
export default getters;

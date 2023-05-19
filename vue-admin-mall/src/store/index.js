import Vue from 'vue';
import Vuex from 'vuex';
import {
  getCookie,
  setCookie,
  removeCookie,
} from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 控制侧边栏的展开或隐藏
    collapsed: false,

    // 登录用户的信息
    user: getCookie(),

    menuRoutes: [],
  },
  mutations: {
    setCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, payload) {
      state.user = payload;
    },
    loginOut(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    setCollapsed({
      commit,
    }) {
      commit('setCollapsed');
    },
    setUserInfo({
      commit,
    }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    loginOut({
      commit,
    }) {
      commit('loginOut');
      removeCookie();
    },
    changeMenuRoutes({
      commit,
    }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
  modules: {},
});

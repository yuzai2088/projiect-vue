import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义类型
const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER"
}

//状态
const state = {
  isAuthenticated: false,//授权状态
  user: {}//用户 信息
}

//获取状态信息
const getters = {
  isAuthenticated: state => state.isAuthenticated,//获取授权状态
  user: state => state.user//获取用户信息
}

//更改状态信息
const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },

  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {}
  }
}

const actions = {
  setIsAutnenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  clearCurrentState:({commit})=>{
    commit(types.SET_AUTHENTICATED,false);
    commit(types.SET_USER,null)
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

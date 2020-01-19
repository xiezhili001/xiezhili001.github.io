import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  // 状态： 放置整个项目中所有能够全局共用的状态。
  state: {
    menuSwitch: true
  },
  // 类似计算属性
  getters: {

  },

  mutations: {
     //导航栏控制
     menuControl (state) {
      state.menuSwitch = !state.menuSwitch
    }
  },

  // 做异步操作的时候，要用到。
  actions: {},

  // 对 store 做拆分，拆分成一个一个的小 store
  modules: {}
})

export default store;

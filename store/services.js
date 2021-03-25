import Vuex from "vuex";

const store = () => new Vuex.Store({
  state: {
    status: false,
    token: null,
    user: {},
    services: {},
    categoryService: {},
  },
  mutations: {
    authStatus(state, payload) {
      state.status = payload.status;
      state.token = payload.token;
    },
    setServices(state, payload) {
      state.services = payload;
    },
    setCategoryService(state, payload) {
      state.categoryService = payload;
    }
  },
  actions: {},

  getters: {
    isAuthenticated(state) {
      return state.status;
    }
  },
});

export default store;

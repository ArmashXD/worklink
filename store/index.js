import Vuex from "vuex";
import location from "./modules/location";

export const strict = false;

const store = () => new Vuex.Store({
  state: {
    status: false,
    token: null,
    user: {},
    services: {},
    categoryService: {},
    settings: {},
    translation: {},
    language: null,
    currentLocation: null,
    searchParams: {}
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
    },
    setSettings(state, payload) {
      state.settings = payload;
    },
    setTranslation(state, payload) {
      state.translation = payload;
    },
    setLanguage(state, payload) {
      state.language = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setCurrentLocation(state, payload) {
      state.currentLocation = payload;
    },
    setSearchParams(state, payload) {
      state.searchParams = payload;
    }
  },
  actions: {},

  getters: {
    isAuthenticated(state) {
      return state.status;
    },
    getServices(state) {
      return state.services;
    },
    getTranslation(state) {
      return state.translation;
    },
    getSelectedLanguage(state) {
      return state.language;
    },
    getCurrentLocation(state) {
      return state.currentLocation;
    },
    getUserDetails(state) {
      return state.user;
    },
    getSearchParams(state) {
      return state.searchParams;
    }
  }, modules: { location }
});

export default store;

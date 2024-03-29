import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import axios from "axios";

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  actions: {},
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
  },
  plugins: [
    createPersistedState({
      key: "tys-ky-cb-a83037wq",
      paths: ["user"],
    }),
  ],
});

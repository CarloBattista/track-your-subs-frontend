import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import axios from "axios";

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      key: "tys-ky-cb-a83037wq",
    }),
  ],
});

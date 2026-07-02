import { clearCookie } from "@/utils/auth";
import { resetRouter } from "@/router";
import User from "@/api/user";

const state = {
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
  symbol: "",
};

const mutations = {
  SET_ACCOUNT_ID: (state, accountID) => {
    state.accountID = accountID;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_SYMBOL: (state, symbol) => {
    state.symbol = symbol;
  }
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      User.login({ username: username.trim(), password: password })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  register({ commit }, userInfo) {
    const { username, email, password } = userInfo;
    return new Promise((resolve, reject) => {
      User.register({ username: username.trim(), email: email.trim(), password: password })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.roles && state.roles.length > 0) {
        const data = {
          roles: state.roles,
          permissions: state.permissions,
        };
        resolve(data);
      } else {
        User.user_info()
          .then((res) => {
            const { data } = res;
            commit("SET_ROLES", [data.role_id]);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      User.logout()
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          resetRouter();

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_ROLES", []);
      clearCookie();
      resolve();
    });
  },

  setSymbol({ commit }, symbol) {
    commit("SET_SYMBOL", symbol);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

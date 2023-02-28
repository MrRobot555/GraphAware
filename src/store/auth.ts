/* 
This could be the second Vuex Store module with a lot of functionality to authorize user

import { Module } from 'vuex';
import { TableRows, StateType } from './types'; */

// just an example file

/* const mutations = {
  SET_LOGGED_IN(state: AuthState, loggedIn: boolean) {
    state.loggedIn = loggedIn;
  },

  SET_USER(state: AuthState, user: { name: string } | null) {
    state.user = user;
  },
};

const getters = {
  loggedIn: (state: AuthState) => state.loggedIn,

  userName: (state: AuthState) => (state.user ? state.user.name : ''),
};

const actions = {
  login({ commit }: any) {
    commit('SET_LOGGED_IN', true);
    commit('SET_USER', { name: 'John Doe' });
  },

  logout({ commit }: any) {
    commit('SET_LOGGED_IN', false);
    commit('SET_USER', null);
  },
};

export const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}; */

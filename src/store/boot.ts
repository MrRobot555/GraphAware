import { Module } from 'vuex';
import { TableRows, StateType } from './types';

const state: StateType = {
  fetchedData: [] as TableRows,
  isFetched: false,
};

const mutations = {
  SET_DATA(state: StateType, fetchedData: TableRows) {
    state.fetchedData = fetchedData;
  },
  SET_STATUS(state: StateType, isFetched: boolean) {
    state.isFetched = isFetched;
  },
};

const getters = {
  getData: (state: StateType) => state.fetchedData,
  getStatus: (state: StateType) => state.isFetched,
};

const actions = {
  async fetchData({ commit }: any) {
    if (!state.isFetched) {
      try {
        fetch('/example-data.json')
          .then((response) => response.json())
          .then((data) => {
            commit('SET_DATA', data);
            commit('SET_STATUS', true);
          });
      } catch (error) {
        console.error(error);
      }
    }
  },
};

export const bootModule: Module<StateType, TableRows> = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

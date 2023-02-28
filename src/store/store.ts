/* an example to develop further */

import Vue from 'vue';
import Vuex from 'vuex';
import { bootModule } from './boot';
/* import { authModule } from './auth'; */

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    boot: bootModule,
    /*     auth: authModule, */
  },
});

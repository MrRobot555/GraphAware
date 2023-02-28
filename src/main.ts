import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from '@/store/store';

import vuetify from '@/plugins/vuetify'; // path to vuetify export

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    //we instruct the Vuex (action) to fetch the data into the Store right at the entry point,
    //from the Vuex Store, any component in the entire application can access the data
    this.$store.dispatch('boot/fetchData');
  },
}).$mount('#app');

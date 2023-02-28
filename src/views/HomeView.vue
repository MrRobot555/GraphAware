<template>
  <div class="home">
    <expand-table :headers="headers" :items="fullState.fetchedData" />
    <!-- we forward the data from the Vuex Store (state) to the component that will
    display it -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import ExpandTable from '../components/ExpandTable.vue';
import { StateType } from '../store/types';

@Component({
  components: {
    ExpandTable,
  },
  computed: mapState('boot', {
    //this is a reactive computed property that takes the state of the Vuex Store's boot mude
    //immediatelly as it changes
    fullState: (state) => state as StateType,
  }),
})
export default class Home extends Vue {
  public get headers() {
    const headArr = [];
    if (this.fullState) {
      if (this.fullState.fetchedData[0]) {
        for (const key in this.fullState.fetchedData[0].data) {
          headArr.push({ text: key, value: key });
        }
        return headArr;
      }
    }
    return undefined;
  }
  public fullState!: StateType;
}
</script>

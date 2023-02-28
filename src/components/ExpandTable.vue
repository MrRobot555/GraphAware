<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/no-deprecated-v-bind-sync -->

<!-- These were needed because of imperfections of Vuetify 2 -->
<template v-if="extendedHeaders && items">
  <div class="flex-container">
    <span class="decoration-text">DATA-1.JSON</span>
    <!-- pre-processed data arrives in as items and table headers -->
    <v-data-table
      v-if="processed.length > 0"
      :headers="extendedHeaders"
      :items="processed"
      item-key="id"
      :expanded.sync="expanded[0]"
      show-expand
      hide-default-header
      hide-default-footer
    >
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th
              v-for="(h, index) in headers"
              :key="index"
              class="custom-header-style"
            >
              <span>{{ h.text }}</span>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item.data-table-expand="{ item, expand, isExpanded }">
        <td v-if="Object.keys(item.kids).length > 0" class="text-start">
          <v-btn
            icon
            @click="expand(!isExpanded)"
            class="v-data-table__expand-icon"
            :class="{
              'v-data-table__expand-icon--active': isExpanded,
              'custom-header-style': isExpanded,
            }"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </td>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="error" text @click="deleteItem(item)">
          <v-icon>mdi-delete-forever</v-icon>
        </v-btn>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          v-if="Object.keys(item.kids).length > 0"
          class="table-padding"
        >
          <div class="flex-container">
            <span class="decoration-text">HAS_RELATIVES</span>
          </div>
          <v-data-table
            :headers="extractHeaders(item.kids.has_relatives.records)"
            :items="item.kids.has_relatives.records"
            item-key="id"
            show-expand
            :expanded.sync="expanded[1]"
            :colspan="headers.length"
            hide-default-header
            hide-default-footer
          >
            <template v-slot:header="{ props: { headers } }">
              <thead>
                <tr>
                  <th
                    v-for="(h, index) in headers"
                    :key="index"
                    class="custom-header-style"
                  >
                    <span>{{ h.text }}</span>
                  </th>
                </tr>
              </thead>
            </template>
            <template
              v-slot:item.data-table-expand="{ item, expand, isExpanded }"
            >
              <td class="text-start" v-if="Object.keys(item.kids).length > 0">
                <v-btn
                  icon
                  @click="expand(!isExpanded)"
                  class="v-data-table__expand-icon"
                  :class="{
                    'v-data-table__expand-icon--active': isExpanded,
                    'custom-header-style': isExpanded,
                  }"
                >
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </td>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn color="error" text @click="deleteItem(item)">
                <v-icon>mdi-delete-forever</v-icon>
              </v-btn>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td
                :colspan="headers.length"
                v-if="Object.keys(item.kids).length > 0"
                class="table-padding"
              >
                <div class="flex-container">
                  <span class="decoration-text">HAS_PHONE</span>
                </div>
                <v-data-table
                  :headers="extractHeaders(item.kids.has_phone.records)"
                  :items="item.kids.has_phone.records"
                  item-key="id"
                  :colspan="headers.length"
                  hide-default-header
                  hide-default-footer
                >
                  <template v-slot:header="{ props: { headers } }">
                    <thead>
                      <tr>
                        <th
                          v-for="(h, index) in headers"
                          :key="index"
                          class="custom-header-style"
                        >
                          <span>{{ h.text }}</span>
                        </th>
                      </tr>
                    </thead>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn color="error" text @click="deleteItem(item)">
                      <v-icon>mdi-delete-forever</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </td>
            </template>
          </v-data-table>
        </td>
      </template>
    </v-data-table>
    <v-container v-else class="fill-height" fluid>
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12">
          <v-card class="mx-auto my-height">
            <v-card-text class="text-center">
              <v-icon x-large class="mb-3">mdi-alert-circle-outline</v-icon>
              <div>No data available</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop /* Watch */ } from 'vue-property-decorator';
import { TableRows, TableRow, HeaderType } from '../store/types';

@Component
export default class ExampleComponent extends Vue {
  @Prop({ type: Array }) items!: TableRows | undefined;
  @Prop({ type: Array }) headers!: HeaderType[] | undefined;
  /* Data arrives in as props here */

  deletedIds: string[] = [];

  //Computed property that sends the data into
  //pre-processing than gets used up on the template
  //after pre-process it indexes the data in full depth
  public get processed(): any {
    if (this.items) {
      const dataWithIds = this.addUniqueIds(this.items);
      const cleanedIds = this.deleteTableRowsByIds(
        this.deletedIds,
        dataWithIds
      );
      return this.transformData(JSON.stringify(cleanedIds));
    }
    return undefined;
  }

  //since data comes from a computed property, deleted element IDs are collected in a string array
  //and being filtered during the composition of the computed property
  //normally deletion would be made through back-end API...

  deleteHeader = {
    text: '',
    value: 'actions',
    class: 'custom-header-style',
  };

  public get extendedHeaders() {
    if (this.headers) {
      const extHead = [];
      this.headers.forEach((elem) => {
        if (elem.text !== 'id') {
          extHead.push(elem);
        }
      });
      extHead.push(this.deleteHeader);
      return extHead;
    }
    return undefined;
  }

  expanded = [] as TableRows[];

  extractHeaders(data: TableRows[]) {
    const headArr = [];
    for (const key in data[0]) {
      if (key !== 'kids' && key !== 'id') {
        headArr.push({ text: key, value: key });
      }
    }
    headArr.push(this.deleteHeader);
    return headArr;
  }

  //Data pre-processor, flattening data, takes out "data" properties
  transformData(data: string): TableRows {
    return JSON.parse(data).map((tableRow: TableRow) => {
      const { data, kids } = tableRow;
      if (kids) {
        Object.keys(kids).forEach((key) => {
          kids[key].records = this.transformData(
            JSON.stringify(kids[key].records)
          );
        });
      }
      return { ...data, kids };
    });
  }

  findObjectById(id: string) {
    function search(obj: any): TableRow | null {
      if (obj.id === id) {
        return obj;
      }
      for (const prop in obj) {
        if (typeof obj[prop] === 'object') {
          const result = search(obj[prop]);
          if (result) {
            return result;
          }
        }
      }
      return null;
    }

    for (const obj of Object.values(this.processed)) {
      const result = search(obj);
      if (result) {
        return result;
      }
    }

    return null;
  }

  deleteTableRowsByIds(ids: string[], dataWithUniqueIds: TableRows): TableRows {
    ids.forEach((id) => {
      for (let i = 0; i < dataWithUniqueIds.length; i++) {
        const tableRow = dataWithUniqueIds[i];
        if (tableRow.data.id === id) {
          Vue.delete(dataWithUniqueIds, i);
          break;
        }
        if (tableRow.kids) {
          for (const key in tableRow.kids) {
            if (tableRow.kids.hasOwnProperty(key)) {
              const kid = tableRow.kids[key];
              if (kid.records) {
                this.deleteTableRowsByIds([id], kid.records);
              }
            }
          }
        }
      }
    });
    return dataWithUniqueIds;
  }

  deleteItem(elem: any) {
    this.deletedIds.push(elem.id);
  }

  addUniqueIds(tableRows: TableRows): TableRows {
    const usedIds = new Set<string>();
    let nextId = 0;

    function generateUniqueId(): string {
      let newId: string;
      do {
        newId = `id-${nextId++}`;
      } while (usedIds.has(newId));
      usedIds.add(newId);
      return newId;
    }

    function addIdToData(data: Record<string, string>): void {
      if (!('id' in data)) {
        const newId = generateUniqueId();
        data.id = newId;
      }
    }

    function addIdsToRow(row: TableRow): void {
      addIdToData(row.data);
      for (const kidName in row.kids) {
        for (const kidRow of row.kids[kidName].records) {
          addIdsToRow(kidRow);
        }
      }
    }

    for (const row of tableRows) {
      addIdsToRow(row);
    }

    return tableRows;
  }
}
</script>
<style scoped>
.custom-header-style {
  background-color: rgb(95, 94, 94);
  color: white !important;
}
.table-padding {
  padding: 20px 15px !important;
}
.decoration-text {
  color: rgb(95, 94, 94);
  font-size: 15px;
  text-align: left;
  padding: 8px 5px;
}
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.v-card {
  max-width: 100%;
}
.my-height {
  min-height: 50vh;
  display: flex;
  justify-content: center;
  background-color: #d6d6d6 !important;
  align-items: center;
}
</style>

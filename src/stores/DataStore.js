import { defineStore } from "pinia";

export const useDataStore = defineStore("DataStore", {
  state: () => ({
    data: [],
  }),
  actions: {},
});

// import { useDataStore } from "../stores/DataStore";
// import { storeToRefs } from "pinia";
// const store = useDataStore();
// const {
//   data,
// } = storeToRefs(store);

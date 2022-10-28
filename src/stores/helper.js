import { reactive } from "vue";
import { defineStore } from "pinia";

export const useHelperStore = defineStore("helper", () => {
  const helper = {
    data: reactive({
      btnState: "--close",
      isDefault: true,
    }),
  };
  return {
    data: helper.data,
  };
});

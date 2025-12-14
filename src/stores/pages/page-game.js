import { reactive, onMounted } from "vue";
import { defineStore } from "pinia";
import { getApiRoleBasic, getApiRoleEquips, getApiSlot } from "../../api";

export const usePageGameStore = defineStore("page-game", () => {
  const temp = {
    data: reactive({
      slot: [],
      basic: {},
      equips: [],
    }),
  };

  onMounted(async () => {
    const [apiSlot, apiRoleBasic, apiRoleEquips] = await Promise.allSettled([
      getApiSlot(),
      getApiRoleBasic(),
      getApiRoleEquips(),
    ]);

    temp.data.slot = apiSlot.value;
    temp.data.basic = apiRoleBasic.value;
    temp.data.equips = apiRoleEquips.value;
  });

  return {
    data: temp.data,
  };
});

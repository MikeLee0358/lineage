import { reactive, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { getApiRoleBasic, getApiRoleEquips, getApiSlot } from "../../api";

export const usePageGameStore = defineStore("page-game", () => {
  const temp = {
    data: reactive({
      slot: [],
      basic: {},
      equips: [],
    }),
    out: {
      getAC: () => {
        let totalEquipsAC = 0;

        temp.data.equips.forEach((roleEquip) => {
          const isArmor = computed(() => /armor/g.test(roleEquip.category));
          const calcTotalEquipAC = computed(
            () => (totalEquipsAC += roleEquip.armor + roleEquip.value),
          );

          if (isArmor.value) {
            calcTotalEquipAC.value;
          }
        });

        return temp.data.basic.ac - totalEquipsAC;
      },
    },
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
    out: temp.out,
  };
});

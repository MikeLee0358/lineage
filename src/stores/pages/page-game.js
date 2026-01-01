import { reactive, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { getApiRoleBasic, getApiRoleEquips, getApiSlot } from "../../api";

export const usePageGameStore = defineStore("page-game", () => {
  const box = {
    data: reactive({
      slot: [],
      basic: {},
      equips: [],
    }),
    out: {
      getAC: () => {
        let totalEquipsAC = 0;

        box.data.equips.forEach((roleEquip) => {
          const isArmor = computed(() => /armor/g.test(roleEquip.category));
          const calcTotalEquipAC = computed(
            () => (totalEquipsAC += roleEquip.armor + roleEquip.value),
          );

          if (isArmor.value) {
            calcTotalEquipAC.value;
          }
        });

        return box.data.basic.ac - totalEquipsAC;
      },
    },
  };

  onMounted(async () => {
    const [apiSlot, apiRoleBasic, apiRoleEquips] = await Promise.allSettled([
      getApiSlot(),
      getApiRoleBasic(),
      getApiRoleEquips(),
    ]);

    box.data.slot = apiSlot.value;
    box.data.basic = apiRoleBasic.value;
    box.data.equips = apiRoleEquips.value;
  });

  return {
    data: box.data,
    out: box.out,
  };
});

import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useKnightStore } from "./knight";
import data from "@/data/dataRole.json";
import { unitTest } from "../utils/UnitTest";

export const useRoleStore = defineStore("role", () => {
  const knightStore = useKnightStore();

  const role = {
    data: reactive({
      data,
      currentRole: "knight", // depends on the VueRouter in RolesPage.vue Component
    }),
    in: {
      getTotalEquipsAC: () => {
        {
          unitTest(role.out.currentData().equips, "array");
        }

        const roleEquips = role.out.currentData().equips;
        let totalEquipsAC = 0;

        roleEquips.forEach((roleEquip) => {
          const isArmor = computed(() => /armor/g.test(roleEquip.category));
          const calcTotalEquipAC = computed(
            () => (totalEquipsAC += roleEquip.armor + roleEquip.value),
          );

          if (isArmor.value) {
            calcTotalEquipAC.value;
          }
        });

        return totalEquipsAC;
      },
    },
    out: {
      currentData: () => {
        {
          unitTest(role.data.currentRole, "===", "knight");
        }

        return role.data.data[role.data.currentRole];
      },
      getAC: () => {
        {
          unitTest(role.out.currentData().basic.ac, "number");
          unitTest(role.in.getTotalEquipsAC(), "number");
        }

        const roleAC = role.out.currentData().basic.ac;
        const totalEquipsAC = role.in.getTotalEquipsAC();

        if (roleAC - totalEquipsAC === -40) {
          knightStore.out.getGameChatEvent("armor1");
        }
        if (roleAC - totalEquipsAC === -45) {
          knightStore.out.getGameChatEvent("armor2");
        }

        return roleAC - totalEquipsAC;
      },
      calcEquipAttribute: (string, equip) => {
        {
          unitTest(string, "string");
          unitTest(equip, "object");
        }

        const equipToAttr = {
          力量手套: "str",
        };

        if (equip.isAttrEquip) {
          const attr = equipToAttr[equip.name];
          const plusAttr = computed(
            () => (role.out.currentData().basic[attr] += equip.attribute[attr]),
          );
          const minusAttr = computed(
            () => (role.out.currentData().basic[attr] -= equip.attribute[attr]),
          );

          if (string === "plusAttribute") plusAttr.value;
          else if (string === "minusAttribute") minusAttr.value;
        }
      },
      getUrlForHashWhenProd: (name) => {
        {
          unitTest(name, "string");
        }

        return new URL(`/src/assets/${name}`, import.meta.url).href;
      },
    },
  };

  return {
    data: role.data,
    out: role.out,
  };
});

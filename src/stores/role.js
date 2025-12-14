import { defineStore } from "pinia";
import { computed } from "vue";
import { usePageGameStore } from "./pages/page-game";
import { ESTest } from "escss-estest";

export const useRoleStore = defineStore("role", () => {
  const pageGameStore = usePageGameStore();

  const temp = {
    in: {
      getTotalEquipsAC: () => {
        const roleEquips = pageGameStore.data.equips;
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
      getAC: () => {
        {
          ESTest(temp.in.getTotalEquipsAC(), "number");
        }

        const roleAC = pageGameStore.data.basic.ac;
        const totalEquipsAC = temp.in.getTotalEquipsAC();

        return roleAC - totalEquipsAC;
      },
      calcEquipAttribute: (string, equip) => {
        {
          ESTest(string, "string");
          ESTest(equip, "object");
        }

        const equipToAttr = {
          力量手套: "str",
        };

        if (equip.isAttrEquip) {
          const attr = equipToAttr[equip.name];
          const plusAttr = computed(
            () => (pageGameStore.data.basic[attr] += equip.attribute[attr]),
          );
          const minusAttr = computed(
            () => (pageGameStore.data.basic[attr] -= equip.attribute[attr]),
          );

          if (string === "plusAttribute") plusAttr.value;
          else if (string === "minusAttribute") minusAttr.value;
        }
      },
      getUrl: (name) => {
        {
          ESTest(name, "string");
        }

        return `/${name}`;
      },
    },
  };

  return {
    out: temp.out,
  };
});

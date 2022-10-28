import { reactive } from "vue";
import { defineStore } from "pinia";
import { unitTest } from "../utils/UnitTest";

export const useScrollStore = defineStore("scroll", () => {
  const scroll = {
    data: reactive({
      targetScroll: "none",
      clickTimerId: 0,
    }),
    out: {
      changeScroll: (string) => {
        {
          unitTest(string, "string");
        }

        switch (string) {
          case "F6":
            scroll.data.targetScroll = "whiteArmor";
            break;

          case "F7":
            scroll.data.targetScroll = "blessedArmor";
            break;

          case "F8":
            scroll.data.targetScroll = "cursedArmor";
            break;
          case "F10":
            scroll.data.targetScroll = "whiteWeapon";
            break;

          case "F11":
            scroll.data.targetScroll = "blessedWeapon";
            break;

          case "F12":
            scroll.data.targetScroll = "cursedWeapon";
            break;

          default:
            scroll.data.targetScroll = "none";
            break;
        }
      },
      getIsScrollType: (type) => {
        {
          unitTest(type, "string");
        }

        return scroll.out.getScrollType() === type;
      },
      getScrollType: () => {
        {
          if (scroll.data.targetScroll === "none") return;
          unitTest(scroll.data.targetScroll, "string");
        }

        return /(white)|(cursed)|(blessed)/g.exec(scroll.data.targetScroll)[0];
      },
      getScrollEquipType: () => {
        {
          if (scroll.data.targetScroll === "none") return;
          unitTest(scroll.data.targetScroll, "string");
        }

        return /(Armor)|(Weapon)/g
          .exec(scroll.data.targetScroll)[0]
          .toLocaleLowerCase();
      },
      clearClickScrollTimer: () => {
        {
          unitTest(scroll.data.clickTimerId, "number");
        }

        clearInterval(scroll.data.clickTimerId);
      },
    },
  };

  return {
    data: scroll.data,
    out: scroll.out,
  };
});

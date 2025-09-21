import { reactive } from "vue";
import { defineStore } from "pinia";
import { ESTest } from "escss-estest";

export const useScrollStore = defineStore("scroll", () => {
  const scroll = {
    data: reactive({
      targetScroll: "none",
      clickTimerId: 0,
    }),
    out: {
      changeScroll: (string) => {
        {
          ESTest(string, "string");
          ESTest(scroll.data.targetScroll, "string");
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
          ESTest(scroll.out.getScrollType() + type, "string");
        }
        return scroll.out.getScrollType() === type;
      },
      getScrollType: () => {
        {
          ESTest(scroll.data.targetScroll, "string");
        }
        if (scroll.data.targetScroll === "none") return;

        return /(white)|(cursed)|(blessed)/g.exec(scroll.data.targetScroll)[0];
      },
      getScrollEquipType: () => {
        {
          ESTest(scroll.data.targetScroll, "string");
        }

        if (scroll.data.targetScroll === "none") return;

        return /(Armor)|(Weapon)/g
          .exec(scroll.data.targetScroll)[0]
          .toLocaleLowerCase();
      },
      clearClickScrollTimer: () => {
        {
          ESTest(scroll.data.clickTimerId, "number");
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

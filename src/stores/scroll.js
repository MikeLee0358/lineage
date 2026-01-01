import { reactive } from "vue";
import { defineStore } from "pinia";
import { ESTest } from "escss-estest";

export const useScrollStore = defineStore("scroll", () => {
  const box = {
    data: reactive({
      targetScroll: "none",
      clickTimerId: 0,
    }),
    out: {
      changeScroll: (string) => {
        {
          ESTest(string, "string");
        }

        switch (string) {
          case "F6":
            box.data.targetScroll = "whiteArmor";
            break;

          case "F7":
            box.data.targetScroll = "blessedArmor";
            break;

          case "F8":
            box.data.targetScroll = "cursedArmor";
            break;
          case "F10":
            box.data.targetScroll = "whiteWeapon";
            break;

          case "F11":
            box.data.targetScroll = "blessedWeapon";
            break;

          case "F12":
            box.data.targetScroll = "cursedWeapon";
            break;

          default:
            box.data.targetScroll = "none";
            break;
        }
      },
      getIsScrollType: (type) => {
        {
          ESTest(type, "string");
        }
        return box.out.getScrollType() === type;
      },
      getScrollType: () => {
        {
          ESTest(box.data.targetScroll, 'string')
        }

        if (box.data.targetScroll === "none") return;

        return /(white)|(cursed)|(blessed)/g.exec(box.data.targetScroll)[0];
      },
      getScrollEquipType: () => {
        {
          ESTest(box.data.targetScroll, "string");
        }

        if (box.data.targetScroll === "none") return;

        return /(Armor)|(Weapon)/g
          .exec(box.data.targetScroll)[0]
          .toLocaleLowerCase();
      },
      clearClickScrollTimer: () => {
        {
          ESTest(box.data.clickTimerId, "number");
        }
        clearInterval(box.data.clickTimerId);
      },
    },
  };

  return {
    data: box.data,
    out: box.out,
  };
});

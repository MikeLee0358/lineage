import { reactive } from "vue";
import { defineStore } from "pinia";
import { ESTest } from "escss-estest";

export const useScrollStore = defineStore("scroll", () => {
  const temp = {
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
            temp.data.targetScroll = "whiteArmor";
            break;

          case "F7":
            temp.data.targetScroll = "blessedArmor";
            break;

          case "F8":
            temp.data.targetScroll = "cursedArmor";
            break;
          case "F10":
            temp.data.targetScroll = "whiteWeapon";
            break;

          case "F11":
            temp.data.targetScroll = "blessedWeapon";
            break;

          case "F12":
            temp.data.targetScroll = "cursedWeapon";
            break;

          default:
            temp.data.targetScroll = "none";
            break;
        }
      },
      getIsScrollType: (type) => {
        {
          ESTest(type, "string");
        }
        return temp.out.getScrollType() === type;
      },
      getScrollType: () => {
        if (temp.data.targetScroll === "none") return;

        return /(white)|(cursed)|(blessed)/g.exec(temp.data.targetScroll)[0];
      },
      getScrollEquipType: () => {
        {
          ESTest(temp.data.targetScroll, "string");
        }

        if (temp.data.targetScroll === "none") return;

        return /(Armor)|(Weapon)/g
          .exec(temp.data.targetScroll)[0]
          .toLocaleLowerCase();
      },
      clearClickScrollTimer: () => {
        {
          ESTest(temp.data.clickTimerId, "number");
        }
        clearInterval(temp.data.clickTimerId);
      },
    },
  };

  return {
    data: temp.data,
    out: temp.out,
  };
});

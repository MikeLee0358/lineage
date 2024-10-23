import { reactive } from "vue";
import { defineStore } from "pinia";

export const useScrollStore = defineStore("scroll", () => {
  const scroll = {
    data: reactive({
      targetScroll: "none",
      clickTimerId: 0,
    }),
    out: {
      changeScroll: (string) => {
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
        return scroll.out.getScrollType() === type;
      },
      getScrollType: () => {
        if (scroll.data.targetScroll === "none") return;

        return /(white)|(cursed)|(blessed)/g.exec(scroll.data.targetScroll)[0];
      },
      getScrollEquipType: () => {
        if (scroll.data.targetScroll === "none") return;

        return /(Armor)|(Weapon)/g
          .exec(scroll.data.targetScroll)[0]
          .toLocaleLowerCase();
      },
      clearClickScrollTimer: () => {
        clearInterval(scroll.data.clickTimerId);
      },
    },
  };

  return {
    data: scroll.data,
    out: scroll.out,
  };
});

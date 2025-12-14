import { defineStore } from "pinia";
import { reactive } from "vue";
import { useScrollStore } from "./scroll";
import { useAlgorithmStore } from "./algorithm";
import { ESTest } from "escss-estest";

export const useChatStore = defineStore("chat", () => {
  const scrollStore = useScrollStore();
  const algorithmStore = useAlgorithmStore();

  const temp = {
    data: reactive({
      lines: Array(7),
    }),
    in: {
      shared: {
        pushAndShiftArray: (text) => {
          {
            ESTest(text, "string");
          }

          temp.data.lines.push(text);
          temp.data.lines.shift();
        },
        showNumber: () => {
          {
            ESTest(algorithmStore.data.target.value, "number");
          }

          return algorithmStore.data.target.value < 0
            ? algorithmStore.data.target.value
            : `+${algorithmStore.data.target.value}`;
        },
        detectColor: () => {
          if (scrollStore.out.getIsScrollType("cursed")) {
            return "黑色的";
          } else if (algorithmStore.out.getIsCategoryType("weapon")) {
            return "藍色的";
          } else {
            return "銀色的";
          }
        },
      },
      updateArmor: () => {
        temp.in.shared.pushAndShiftArray("請選擇一種防具。");
      },
      updateWeapon: () => {
        temp.in.shared.pushAndShiftArray("請選擇一種武器。");
      },
      updateForOne: () => {
        {
          ESTest(algorithmStore.data.target.name, "string");
        }

        temp.in.shared.pushAndShiftArray(
          `${temp.in.shared.showNumber()} ${
            algorithmStore.data.target.name
          } 一瞬間發出 ${temp.in.shared.detectColor()} 光芒。`,
        );
      },
      updateForGone: () => {
        temp.in.shared.pushAndShiftArray(
          `${temp.in.shared.showNumber()} ${
            algorithmStore.data.target.name
          } 產生激烈的 ${temp.in.shared.detectColor()} 光芒，一會兒後就消失了。`,
        );
      },
      updateForNope: () => {
        temp.in.shared.pushAndShiftArray(
          `${temp.in.shared.showNumber()} ${
            algorithmStore.data.target.name
          } 持續發出 激烈的 ${temp.in.shared.detectColor()}光芒，但是沒有任何事情發生。`,
        );
      },
      updateForTwoUp: () => {
        {
          ESTest(algorithmStore.data.target.name, "string");
        }

        temp.in.shared.pushAndShiftArray(
          `${temp.in.shared.showNumber()} ${
            algorithmStore.data.target.name
          } 持續發出 ${temp.in.shared.detectColor()} 光芒。`,
        );
      },
    },
    out: {
      updateChatScroll: () => {
        {
          ESTest(scrollStore.data.targetScroll, "string");
        }

        if (scrollStore.data.targetScroll === "none") return;

        if (scrollStore.data.targetScroll.includes("Armor")) {
          temp.in.updateArmor();
        } else if (scrollStore.data.targetScroll.includes("Weapon")) {
          temp.in.updateWeapon();
        }
      },
      updateChatState: () => {
        if (algorithmStore.data.dice.state === -1) {
          temp.in.updateForNope();
        } else if (algorithmStore.data.dice.state === 0) {
          temp.in.updateForGone();
        } else if (algorithmStore.data.dice.state === 1) {
          temp.in.updateForOne();
        } else {
          temp.in.updateForTwoUp();
        }
      },
    },
  };

  return {
    data: temp.data,
    out: temp.out,
  };
});

import { defineStore } from "pinia";
import { reactive } from "vue";
import { useScrollStore } from "./scroll";
import { useAlgorithmStore } from "./algorithm";
import { unitTest } from "../utils/UnitTest";

export const useChatStore = defineStore("chat", () => {
  const scrollStore = useScrollStore();
  const algorithmStore = useAlgorithmStore();

  const chat = {
    data: reactive({
      lines: Array(7),
    }),
    in: {
      reuse: {
        pushAndShiftArray: (text) => {
          {
            unitTest(text, "string");
          }

          chat.data.lines.push(text);
          chat.data.lines.shift();
        },
        showNumber: () => {
          {
            unitTest(algorithmStore.data.target.value, "number");
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
        chat.in.reuse.pushAndShiftArray("請選擇一種防具。");
      },
      updateWeapon: () => {
        chat.in.reuse.pushAndShiftArray("請選擇一種武器。");
      },
      updateForOne: () => {
        {
          unitTest(algorithmStore.data.target.name, "string");
        }

        chat.in.reuse.pushAndShiftArray(
          `${chat.in.reuse.showNumber()} ${
            algorithmStore.data.target.name
          } 一瞬間發出 ${chat.in.reuse.detectColor()} 光芒。`,
        );
      },
      updateForGone: () => {
        {
          unitTest(algorithmStore.data.target.name, "string");
        }

        chat.in.reuse.pushAndShiftArray(
          `${chat.in.reuse.showNumber()} ${
            algorithmStore.data.target.name
          } 產生激烈的 ${chat.in.reuse.detectColor()} 光芒，一會兒後就消失了。`,
        );
      },
      updateForNope: () => {
        {
          unitTest(algorithmStore.data.target.name, "string");
        }

        chat.in.reuse.pushAndShiftArray(
          `${chat.in.reuse.showNumber()} ${
            algorithmStore.data.target.name
          } 持續發出 激烈的 ${chat.in.reuse.detectColor()}光芒，但是沒有任何事情發生。`,
        );
      },
      updateForTwoUp: () => {
        {
          unitTest(algorithmStore.data.target.name, "string");
        }

        chat.in.reuse.pushAndShiftArray(
          `${chat.in.reuse.showNumber()} ${
            algorithmStore.data.target.name
          } 持續發出 ${chat.in.reuse.detectColor()} 光芒。`,
        );
      },
    },
    out: {
      cleanChat: () => {
        chat.data.lines = Array(7);
      },
      updateChatScroll: () => {
        {
          if (scrollStore.data.targetScroll === "none") return;
          unitTest(scrollStore.data.targetScroll, "string");
        }

        if (scrollStore.data.targetScroll.includes("Armor")) {
          chat.in.updateArmor();
        } else if (scrollStore.data.targetScroll.includes("Weapon")) {
          chat.in.updateWeapon();
        }
      },
      updateChatState: () => {
        {
          unitTest(algorithmStore.data.dice.state, "number");
        }

        if (algorithmStore.data.dice.state === -1) {
          chat.in.updateForNope();
        } else if (algorithmStore.data.dice.state === 0) {
          chat.in.updateForGone();
        } else if (algorithmStore.data.dice.state === 1) {
          chat.in.updateForOne();
        } else {
          chat.in.updateForTwoUp();
        }
      },
    },
  };

  return {
    data: chat.data,
    out: chat.out,
  };
});

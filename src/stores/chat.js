import { defineStore } from "pinia";
import { reactive } from "vue";
import { useScrollStore } from "./scroll";
import { useAlgorithmStore } from "./algorithm";
import { ESTest } from "escss-estest";

export const useChatStore = defineStore("chat", () => {
  const scrollStore = useScrollStore();
  const algorithmStore = useAlgorithmStore();

  const box = {
    data: reactive({
      lines: Array(7),
    }),
    in: {
      updateChat: (text) => {
        {
          ESTest(text, "string");
        }

        box.data.lines.push(text);
        box.data.lines.shift();
      },
      showNumber: () => {
        {
          ESTest(algorithmStore.data.target.value, "number");
        }

        return algorithmStore.data.target.value < 0
          ? algorithmStore.data.target.value
          : `+${algorithmStore.data.target.value}`;
      },
      showColorText: () => {
        if (scrollStore.out.getIsScrollType("cursed")) {
          return "黑色的";
        } else if (algorithmStore.out.getIsCategoryType("weapon")) {
          return "藍色的";
        } else {
          return "銀色的";
        }
      },
    },
    out: {
      updateChatScroll: () => {
        {
          ESTest(scrollStore.data.targetScroll, "string");
        }

        if (scrollStore.data.targetScroll === "none") return;

        if (scrollStore.data.targetScroll.includes("Armor")) {
          box.in.updateChat("請選擇一種防具。");
        } else if (scrollStore.data.targetScroll.includes("Weapon")) {
          box.in.updateChat("請選擇一種武器。");
        }
      },
      updateChatState: () => {
        if (algorithmStore.data.dice.state === -1) {
          box.in.updateChat(
            `${box.in.showNumber()} ${
              algorithmStore.data.target.name
            } 持續發出 激烈的 ${box.in.showColorText()}光芒，但是沒有任何事情發生。`,
          );
        } else if (algorithmStore.data.dice.state === 0) {
          box.in.updateChat(
            `${box.in.showNumber()} ${
              algorithmStore.data.target.name
            } 產生激烈的 ${box.in.showColorText()} 光芒，一會兒後就消失了。`,
          );
        } else if (algorithmStore.data.dice.state === 1) {
          box.in.updateChat(
            `${box.in.showNumber()} ${
              algorithmStore.data.target.name
            } 一瞬間發出 ${box.in.showColorText()} 光芒。`,
          );
        } else {
          box.in.updateChat(
            `${box.in.showNumber()} ${
              algorithmStore.data.target.name
            } 持續發出 ${box.in.showColorText()} 光芒。`,
          );
        }
      },
    },
  };

  return {
    data: box.data,
    out: box.out,
  };
});

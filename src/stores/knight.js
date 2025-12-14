import { reactive } from "vue";
import { defineStore } from "pinia";
import { useChatStore } from "./chat";
import { useAlgorithmStore } from "./algorithm";
import { ESTest } from "escss-estest";

export const useKnightStore = defineStore("knight", () => {
  const chatStore = useChatStore();
  const algorithmStore = useAlgorithmStore();

  const temp = {
    data: reactive({
      chatMsg: "",
      isShowGameChat: false,
      isStopFunction: false,
    }),
    in: {
      GameChatTime: (second) => {
        {
          ESTest(second, "number");
        }

        setTimeout(function () {
          temp.data.isShowGameChat = false;
          temp.data.isStopFunction = false;
          algorithmStore.data.dice.bonus = 0;
        }, second * 1000);
      },
      getArrayFull: (array, string) => {
        {
          ESTest(array, "array");
          ESTest(string, "string");
        }

        let result = [];
        for (let i = 0; i < array.length; i++) {
          result.push(string);
        }
        return result;
      },
    },
    out: {
      getGameChatEvent: (chatEvent) => {
        {
          ESTest(chatEvent, "string");
        }

        switch (chatEvent) {
          case "weaponSuccess":
            temp.data.chatMsg = "果然是天選之人... 佩服佩服";
            break;

          case "weaponFailure":
            temp.data.chatMsg = "10%機率可不是叫假的誒";
            break;

          case "weaponNope":
            temp.data.chatMsg = "NOT TODAY!";
            break;

          case "talk0":
            algorithmStore.data.dice.bonus = 50;
            temp.data.chatMsg = "似乎有風圍繞在你的滑鼠";
            break;

          case "talk1":
            algorithmStore.data.dice.bonus = 25;
            temp.data.chatMsg = "似乎有微風圍繞在你的滑鼠";
            break;

          case "talk2":
            algorithmStore.data.dice.bonus = -100;
            temp.data.chatMsg = "似乎有詛咒圍繞在你的滑鼠";
            break;

          case "talk3":
            temp.data.isStopFunction = true;
            temp.data.chatMsg = "似乎有阻力圍繞在你的滑鼠";
            break;

          case "talk4":
            temp.data.chatMsg = "用白的衝10只有33%成功率";
            break;

          case "talk5":
            temp.data.chatMsg = "用祝福的衝10只有66%成功率";
            break;

          case "talk6":
            temp.data.chatMsg = "用紅的衝10只有50%成功率";
            break;

          case "talk7":
            temp.data.chatMsg = "試著點戒指變身看看吧！";
            break;

          case "talk8":
            temp.data.chatMsg = "講個笑話給你聽 有一天............哈哈";
            break;

          case "talk9":
            chatStore.data.lines = temp.in.getArrayFull(
              Array(7),
              "國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國",
            );
            temp.data.chatMsg =
              "國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國";
            break;
        }

        temp.data.isShowGameChat = true;
        temp.in.GameChatTime(10);
      },
      repeatTalkChatEvent: (second) => {
        {
          ESTest(second, "number");
        }

        setInterval(function () {
          const randomNum = Math.floor(Math.random() * 10);

          temp.out.getGameChatEvent(`talk${randomNum}`);
        }, second * 1000);
      },
    },
  };

  return {
    data: temp.data,
    out: temp.out,
  };
});

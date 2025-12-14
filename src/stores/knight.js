import { reactive } from "vue";
import { defineStore } from "pinia";
import { useChatStore } from "./chat";
import { useAlgorithmStore } from "./algorithm";
import { ESTest } from "escss-estest";

export const useKnightStore = defineStore("knight", () => {
  const chatStore = useChatStore();
  const algorithmStore = useAlgorithmStore();

  const knight = {
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
          knight.data.isShowGameChat = false;
          knight.data.isStopFunction = false;
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
            knight.data.chatMsg = "果然是天選之人... 佩服佩服";
            break;

          case "weaponFailure":
            knight.data.chatMsg = "10%機率可不是叫假的誒";
            break;

          case "weaponNope":
            knight.data.chatMsg = "NOT TODAY!";
            break;

          case "armor1":
            knight.data.chatMsg = "好像沒過幾樣吶....再加油啊";
            break;

          case "armor2":
            knight.data.chatMsg = "老大 別心急啊~~慢慢來嘛";
            break;

          case "talk0":
            algorithmStore.data.dice.bonus = 50;
            knight.data.chatMsg = "似乎有風圍繞在你的滑鼠";
            break;

          case "talk1":
            algorithmStore.data.dice.bonus = 25;
            knight.data.chatMsg = "似乎有微風圍繞在你的滑鼠";
            break;

          case "talk2":
            algorithmStore.data.dice.bonus = -100;
            knight.data.chatMsg = "似乎有詛咒圍繞在你的滑鼠";
            break;

          case "talk3":
            knight.data.isStopFunction = true;
            knight.data.chatMsg = "似乎有阻力圍繞在你的滑鼠";
            break;

          case "talk4":
            knight.data.chatMsg = "用白的衝10只有33%成功率";
            break;

          case "talk5":
            knight.data.chatMsg = "用祝福的衝10只有66%成功率";
            break;

          case "talk6":
            knight.data.chatMsg = "用紅的衝10只有50%成功率";
            break;

          case "talk7":
            knight.data.chatMsg = "試著點戒指變身看看吧！";
            break;

          case "talk8":
            knight.data.chatMsg = "講個笑話給你聽 有一天............哈哈";
            break;

          case "talk9":
            chatStore.data.lines = knight.in.getArrayFull(
              Array(7),
              "國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國",
            );
            knight.data.chatMsg =
              "國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國";
            break;

          case "toBeKnight":
            knight.data.chatMsg = "騎士好棒棒";
            break;

          case "toBeDeathKnight":
            knight.data.chatMsg = "..";
            break;
        }
        knight.data.isShowGameChat = true;
        knight.in.GameChatTime(10);
      },
      repeatTalkChatEvent: (second) => {
        {
          ESTest(second, "number");
        }

        setInterval(function () {
          const randomNum = Math.floor(Math.random() * 10);

          knight.out.getGameChatEvent(`talk${randomNum}`);
        }, second * 1000);
      },
    },
  };

  return {
    data: knight.data,
    out: knight.out,
  };
});

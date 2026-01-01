import { reactive } from "vue";
import { defineStore } from "pinia";
import { useChatStore } from "./chat";
import { useScrollStore } from "./scroll";
import { useKnightStore } from "./knight";
import { ESTest } from "escss-estest";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const chatStore = useChatStore();
  const scrollStore = useScrollStore();
  const knightStore = useKnightStore();

  const box = {
    data: reactive({
      dice: {
        bonus: 0,
        state: 0,
        value: 0,
        successValue: 0,
      },
      target: {
        name: "",
        category: "",
        value: 0,
        safetyValue: 0,
      },
    }),
    in: {
      shared: {
        getRandomStateOneTo: (value) => {
          {
            ESTest(value, "number");
          }

          box.data.dice.state = Number(Math.floor(Math.random() * value) + 1);
        },
        resetAtTheEnd: () => {
          box.data.dice.state = 0;
          scrollStore.data.targetScroll = "none";
        },
        handleUpdate: () => {
          chatStore.out.updateChatState();
          box.in.updateEquipValue();
          box.in.shared.resetAtTheEnd();
        },
        handleUpdateOver9: () => {
          // box.data.dice.state:
          //  1: +1 msg
          // -1: nothing happened msg

          //white: +1
          if (scrollStore.out.getIsScrollType("white") && isSuccessIn([1, 2])) {
            box.data.target.value++;
            box.data.dice.state = 1;
            knightStore.out.getGameChatEvent("weaponSuccess");
          }
          //cursed: +1
          else if (
            scrollStore.out.getIsScrollType("cursed") &&
            isSuccessIn([1, 2, 3])
          ) {
            box.data.target.value--;
            box.data.dice.state = 1;
            knightStore.out.getGameChatEvent("weaponSuccess");
          }
          //blessed: +1
          else if (
            scrollStore.out.getIsScrollType("blessed") &&
            isSuccessIn([1, 2, 3, 4])
          ) {
            box.data.target.value++;
            box.data.dice.state = 1;
            knightStore.out.getGameChatEvent("weaponSuccess");
          }
          // Nothing happened message
          else {
            box.data.dice.state = -1;
            knightStore.out.getGameChatEvent("weaponNope");
          }

          chatStore.out.updateChatState();
          box.in.shared.resetAtTheEnd();

          function isSuccessIn(array) {
            return array.includes(box.data.dice.state);
          }
        },
      },
      getDiceValue: () => {
        box.data.dice.value = Number((Math.random() * 100).toFixed(2));
      },
      handleFailure: (equip, event) => {
        {
          ESTest(equip, "object");
          ESTest(event, "object");
        }

        if (Math.abs(box.data.target.value) === 9) {
          knightStore.out.getGameChatEvent("weaponFailure");
        }

        box.data.dice.state = 0;
        box.data.target.value = 0;
        chatStore.out.updateChatState();
        getEquipGoneEffect();
        box.in.shared.resetAtTheEnd();

        function getEquipGoneEffect() {
          let boxArmor = equip.armor;
          let boxMr = equip.mr;

          goneEffect();
          revertEffect();

          function goneEffect() {
            toggleEquipHidden();
            equip.armor = 0;
          }
          function revertEffect() {
            setTimeout(function () {
              toggleEquipHidden();
              equip.armor = boxArmor;
              equip.mr = boxMr;
            }, 3000);
          }
          function toggleEquipHidden() {
            event.target.classList.toggle("--hidden");
          }
        }
      },
      updateEquipValue: () => {
        if (scrollStore.out.getIsScrollType("cursed")) {
          box.data.target.value--;
        } else {
          box.data.target.value += box.data.dice.state;
        }
      },
      getTargetCategoryEquipType: () => {
        {
          ESTest(box.data.target.category, "string");
        }

        return box.data.target.category.substring(0, 6).toLowerCase().trim();
      },
      getDiceSuccessValue: () => {
        if (getIsSpecialCases()) {
          box.data.dice.successValue = 100;
        } else if (box.out.getIsCategoryType("weapon")) {
          box.in.getWeaponSuccessValue();
        } else if (box.out.getIsCategoryType("armor")) {
          box.in.getArmorSuccessValue();
        }

        function getIsSpecialCases() {
          /* example with Weapon Formula */
          //white & blessed: -7 -8... successValue will be 33%, to prevent this situation happened return 100%
          //cursed: when +6 up use cursedScroll successValue will be 33%, to prevent this situation happened return 100%

          return (
            (scrollStore.out.getIsScrollType("white") &&
              box.data.target.value < 0) ||
            (scrollStore.out.getIsScrollType("blessed") &&
              box.data.target.value < 0) ||
            (scrollStore.out.getIsScrollType("cursed") &&
              box.data.target.value >= Math.abs(box.data.target.safetyValue))
          );
        }
      },
      getArmorSuccessValue: () => {
        {
          ESTest(box.data.target.value, "number");
          ESTest(box.data.target.safetyValue, "number").min(0);
          ESTest(box.data.dice.bonus, "number").min(0);
        }

        /* Armor Formula */

        //|underSafetyValue|:100%
        if (Math.abs(box.data.target.value) < box.data.target.safetyValue) {
          box.data.dice.successValue = 100 + box.data.dice.bonus;
        }
        // |9up|:10%
        else if (Math.abs(box.data.target.value) >= 9) {
          box.data.dice.successValue = 10 + box.data.dice.bonus;
        }
        // |0~8|:1/n * 100%
        else {
          box.data.dice.successValue =
            (1 / Math.abs(box.data.target.value)) * 100 + box.data.dice.bonus;
        }
      },
      getWeaponSuccessValue: () => {
        {
          ESTest(box.data.target.value, "number");
          ESTest(box.data.target.safetyValue, "number").min(0);
          ESTest(box.data.dice.bonus, "number");
        }
        /* Weapon Formula */

        //|underSafetyValue|:100%
        if (Math.abs(box.data.target.value) < box.data.target.safetyValue) {
          box.data.dice.successValue = 100 + box.data.dice.bonus;
        }
        //|9up|:10%
        else if (Math.abs(box.data.target.value) >= 9) {
          box.data.dice.successValue = 10 + box.data.dice.bonus;
        }
        //|0~8|:33.33%
        else {
          box.data.dice.successValue = 33.33 + box.data.dice.bonus;
        }
      },
      getIsSuccess: () => {
        {
          ESTest(box.data.dice.successValue, "number");
          ESTest(box.data.dice.value, "number");
        }

        box.in.getDiceValue();
        box.in.getDiceSuccessValue();

        return box.data.dice.successValue >= box.data.dice.value;
      },
      getIsMatchedScrollEquipType: () => {
        return (
          scrollStore.out.getScrollEquipType() ===
          box.in.getTargetCategoryEquipType()
        );
      },
    },
    out: {
      getIsCategoryType: (text) => {
        {
          ESTest(box.data.target.category, "string");
        }

        return box.data.target.category
          .toLowerCase()
          .includes(text.toLowerCase());
      },
      doAlgorithm: (equip, event) => {
        {
          ESTest(equip, "object");
          ESTest(event, "object");
          ESTest(knightStore.data.isStopFunction, "boolean");
          ESTest(box.in.getIsMatchedScrollEquipType(), "boolean");
          ESTest(box.in.getIsSuccess(), "boolean");
        }

        if (knightStore.data.isStopFunction) return;
        if (!box.in.getIsMatchedScrollEquipType()) return;

        if (box.in.getIsSuccess()) {
          switch (scrollStore.out.getScrollType()) {
            case "blessed":
              if (box.data.target.value < 3) {
                box.in.shared.getRandomStateOneTo(3);
                box.in.shared.handleUpdate();
              } else if (box.data.target.value < 6) {
                box.in.shared.getRandomStateOneTo(2);
                box.in.shared.handleUpdate();
              } else if (box.data.target.value < 9) {
                box.in.shared.getRandomStateOneTo(1);
                box.in.shared.handleUpdate();
              } else {
                box.in.shared.getRandomStateOneTo(6);
                box.in.shared.handleUpdateOver9();
              }
              break;

            case "white":
              if (box.data.target.value < 9) {
                box.in.shared.getRandomStateOneTo(1);
                box.in.shared.handleUpdate();
              } else {
                box.in.shared.getRandomStateOneTo(6);
                box.in.shared.handleUpdateOver9();
              }
              break;

            case "cursed":
              if (box.data.target.value > -9) {
                box.in.shared.getRandomStateOneTo(1);
                box.in.shared.handleUpdate();
              } else {
                box.in.shared.getRandomStateOneTo(6);
                box.in.shared.handleUpdateOver9();
              }
              break;
          }
        } else {
          box.in.handleFailure(equip, event);
        }
      },
    },
  };

  return {
    data: box.data,
    out: box.out,
  };
});

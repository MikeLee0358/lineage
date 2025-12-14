import { reactive } from "vue";
import { defineStore } from "pinia";
import { useChatStore } from "./chat";
import { useRoleStore } from "./role";
import { useScrollStore } from "./scroll";
import { useKnightStore } from "./knight";
import { ESTest } from "escss-estest";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const roleStore = useRoleStore();
  const chatStore = useChatStore();
  const scrollStore = useScrollStore();
  const knightStore = useKnightStore();

  const temp = {
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

          temp.data.dice.state = Number(Math.floor(Math.random() * value) + 1);
        },
        resetAtTheEnd: () => {
          temp.data.dice.state = 0;
          scrollStore.data.targetScroll = "none";
        },
        handleUpdate: () => {
          chatStore.out.updateChatState();
          temp.in.updateEquipValue();
          temp.in.shared.resetAtTheEnd();
        },
        handleUpdateOver9: () => {
          // temp.data.dice.state:
          //  1: +1 msg
          // -1: nothing happened msg

          //white: +1
          if (scrollStore.out.getIsScrollType("white") && isSuccessIn([1, 2])) {
            temp.data.target.value++;
            temp.data.dice.state = 1;
            knightStore.out.getGameChatEvent("weaponSuccess");
          }
          //cursed: +1
          else if (
            scrollStore.out.getIsScrollType("cursed") &&
            isSuccessIn([1, 2, 3])
          ) {
            temp.data.target.value--;
            temp.data.dice.state = 1;
            knightStore.out.getGameChatEvent("weaponSuccess");
          }
          //blessed: +1
          else if (
            scrollStore.out.getIsScrollType("blessed") &&
            isSuccessIn([1, 2, 3, 4])
          ) {
            temp.data.target.value++;
            temp.data.dice.state = 1;
            knightStore.out.getGameChatEvent("weaponSuccess");
          }
          // Nothing happened message
          else {
            temp.data.dice.state = -1;
            knightStore.out.getGameChatEvent("weaponNope");
          }

          chatStore.out.updateChatState();
          temp.in.shared.resetAtTheEnd();

          function isSuccessIn(array) {
            return array.includes(temp.data.dice.state);
          }
        },
      },
      getDiceValue: () => {
        temp.data.dice.value = Number((Math.random() * 100).toFixed(2));
      },
      handleFailure: (equip, event) => {
        {
          ESTest(equip, "object").schema({
            armor: "string",
            mr: "string",
          });
          ESTest(event, "object");
        }

        if (Math.abs(temp.data.target.value) === 9) {
          knightStore.out.getGameChatEvent("weaponFailure");
        }

        temp.data.dice.state = 0;
        temp.data.target.value = 0;
        chatStore.out.updateChatState();
        getEquipGoneEffect();
        temp.in.shared.resetAtTheEnd();

        function getEquipGoneEffect() {
          let tempArmor = equip.armor;
          let tempMr = equip.mr;

          goneEffect();
          revertEffect();

          function goneEffect() {
            roleStore.out.calcEquipAttribute("minusAttribute", equip);
            toggleEquipHidden();
            equip.armor = 0;
          }
          function revertEffect() {
            setTimeout(function () {
              toggleEquipHidden();
              equip.armor = tempArmor;
              equip.mr = tempMr;
              roleStore.out.calcEquipAttribute("plusAttribute", equip);
            }, 3000);
          }
          function toggleEquipHidden() {
            event.target.classList.toggle("--hidden");
          }
        }
      },
      updateEquipValue: () => {
        if (scrollStore.out.getIsScrollType("cursed")) {
          temp.data.target.value--;
        } else {
          temp.data.target.value += temp.data.dice.state;
        }
      },
      getTargetCategoryEquipType: () => {
        {
          ESTest(temp.data.target.category, "string");
        }

        return temp.data.target.category.substring(0, 6).toLowerCase().trim();
      },
      getDiceSuccessValue: () => {
        if (getIsSpecialCases()) {
          temp.data.dice.successValue = 100;
        } else if (temp.out.getIsCategoryType("weapon")) {
          temp.in.getWeaponSuccessValue();
        } else if (temp.out.getIsCategoryType("armor")) {
          temp.in.getArmorSuccessValue();
        }

        function getIsSpecialCases() {
          /* example with Weapon Formula */
          //white & blessed: -7 -8... successValue will be 33%, to prevent this situation happened return 100%
          //cursed: when +6 up use cursedScroll successValue will be 33%, to prevent this situation happened return 100%

          return (
            (scrollStore.out.getIsScrollType("white") &&
              temp.data.target.value < 0) ||
            (scrollStore.out.getIsScrollType("blessed") &&
              temp.data.target.value < 0) ||
            (scrollStore.out.getIsScrollType("cursed") &&
              temp.data.target.value >= Math.abs(temp.data.target.safetyValue))
          );
        }
      },
      getArmorSuccessValue: () => {
        {
          ESTest(temp.data.target.value, "number");
          ESTest(temp.data.target.safetyValue, "number").min(0);
          ESTest(temp.data.dice.bonus, "number").min(0);
        }

        /* Armor Formula */

        //|underSafetyValue|:100%
        if (Math.abs(temp.data.target.value) < temp.data.target.safetyValue) {
          temp.data.dice.successValue = 100 + temp.data.dice.bonus;
        }
        // |9up|:10%
        else if (Math.abs(temp.data.target.value) >= 9) {
          temp.data.dice.successValue = 10 + temp.data.dice.bonus;
        }
        // |0~8|:1/n * 100%
        else {
          temp.data.dice.successValue =
            (1 / Math.abs(temp.data.target.value)) * 100 + temp.data.dice.bonus;
        }
      },
      getWeaponSuccessValue: () => {
        {
          ESTest(temp.data.target.value, "number");
          ESTest(temp.data.target.safetyValue, "number").min(0);
          ESTest(temp.data.dice.bonus, "number");
        }
        /* Weapon Formula */

        //|underSafetyValue|:100%
        if (Math.abs(temp.data.target.value) < temp.data.target.safetyValue) {
          temp.data.dice.successValue = 100 + temp.data.dice.bonus;
        }
        //|9up|:10%
        else if (Math.abs(temp.data.target.value) >= 9) {
          temp.data.dice.successValue = 10 + temp.data.dice.bonus;
        }
        //|0~8|:33.33%
        else {
          temp.data.dice.successValue = 33.33 + temp.data.dice.bonus;
        }
      },
      getIsSuccess: () => {
        {
          ESTest(temp.data.dice.successValue, "number");
          ESTest(temp.data.dice.value, "number");
        }

        temp.in.getDiceValue();
        temp.in.getDiceSuccessValue();

        return temp.data.dice.successValue >= temp.data.dice.value;
      },
      getIsMatchedScrollEquipType: () => {
        return (
          scrollStore.out.getScrollEquipType() ===
          temp.in.getTargetCategoryEquipType()
        );
      },
    },
    out: {
      getIsCategoryType: (text) => {
        {
          ESTest(temp.data.target.category, "string");
        }

        return temp.data.target.category
          .toLowerCase()
          .includes(text.toLowerCase());
      },
      doAlgorithm: (equip, event) => {
        {
          ESTest(equip, "object");
          ESTest(event, "object");
          ESTest(knightStore.data.isStopFunction, "boolean");
          ESTest(temp.in.getIsMatchedScrollEquipType(), "boolean");
          ESTest(temp.in.getIsSuccess(), "boolean");
        }

        if (knightStore.data.isStopFunction) return;
        if (!temp.in.getIsMatchedScrollEquipType()) return;

        if (temp.in.getIsSuccess()) {
          switch (scrollStore.out.getScrollType()) {
            case "blessed":
              if (temp.data.target.value < 3) {
                temp.in.shared.getRandomStateOneTo(3);
                temp.in.shared.handleUpdate();
              } else if (temp.data.target.value < 6) {
                temp.in.shared.getRandomStateOneTo(2);
                temp.in.shared.handleUpdate();
              } else if (temp.data.target.value < 9) {
                temp.in.shared.getRandomStateOneTo(1);
                temp.in.shared.handleUpdate();
              } else {
                temp.in.shared.getRandomStateOneTo(6);
                temp.in.shared.handleUpdateOver9();
              }
              break;

            case "white":
              if (temp.data.target.value < 9) {
                temp.in.shared.getRandomStateOneTo(1);
                temp.in.shared.handleUpdate();
              } else {
                temp.in.shared.getRandomStateOneTo(6);
                temp.in.shared.handleUpdateOver9();
              }
              break;

            case "cursed":
              if (temp.data.target.value > -9) {
                temp.in.shared.getRandomStateOneTo(1);
                temp.in.shared.handleUpdate();
              } else {
                temp.in.shared.getRandomStateOneTo(6);
                temp.in.shared.handleUpdateOver9();
              }
              break;
          }
        } else {
          temp.in.handleFailure(equip, event);
        }
      },
    },
  };

  return {
    data: temp.data,
    out: temp.out,
  };
});

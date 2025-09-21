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

  const algorithm = {
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
      reuse: {
        getRandomStateOneTo: (value) => {
          {
            ESTest(value, "number");
            ESTest(algorithm.data.dice.state, "number");
          }

          algorithm.data.dice.state = Number(
            Math.floor(Math.random() * value) + 1,
          );
        },
        resetAtTheEnd: () => {
          {
            ESTest(algorithm.data.dice.state, "number");
            ESTest(scrollStore.data.targetScroll, "string");
          }

          algorithm.data.dice.state = 0;
          scrollStore.data.targetScroll = "none";
        },
        handleUpdate: () => {
          chatStore.out.updateChatState();
          algorithm.in.updateEquipValue();
          algorithm.in.reuse.resetAtTheEnd();
        },
        handleUpdateOver9: () => {
          {
            ESTest(algorithm.data.target.value, "number");
            ESTest(algorithm.data.dice.state, "number");
          }

          // algorithm.data.dice.state:
          //  1: +1 msg
          // -1: nothing happened msg

          //white: +1
          if (scrollStore.out.getIsScrollType("white") && isSuccessIn([1, 2])) {
            algorithm.data.target.value++;
            algorithm.data.dice.state = 1;
            knightStore.out.getGameChatEvent("weaponSuccess");
          }
          //cursed: +1
          else if (
            scrollStore.out.getIsScrollType("cursed") &&
            isSuccessIn([1, 2, 3])
          ) {
            algorithm.data.target.value--;
            algorithm.data.dice.state = 1;
            knightStore.out.getGameChatEvent("weaponSuccess");
          }
          //blessed: +1
          else if (
            scrollStore.out.getIsScrollType("blessed") &&
            isSuccessIn([1, 2, 3, 4])
          ) {
            algorithm.data.target.value++;
            algorithm.data.dice.state = 1;
            knightStore.out.getGameChatEvent("weaponSuccess");
          }
          // Nothing happened message
          else {
            algorithm.data.dice.state = -1;
            knightStore.out.getGameChatEvent("weaponNope");
          }

          chatStore.out.updateChatState();
          algorithm.in.reuse.resetAtTheEnd();

          function isSuccessIn(array) {
            return array.includes(algorithm.data.dice.state);
          }
        },
      },
      getDiceValue: () => {
        {
          ESTest(algorithm.data.dice.value, "number");
        }

        algorithm.data.dice.value = Number((Math.random() * 100).toFixed(2));
      },
      handleFailure: (equip, event) => {
        {
          ESTest(equip, "object");
          ESTest(event, "object");
          ESTest(algorithm.data.target.value, "number");
          ESTest(algorithm.data.dice.state, "number");
        }

        if (Math.abs(algorithm.data.target.value) === 9) {
          knightStore.out.getGameChatEvent("weaponFailure");
        }

        algorithm.data.dice.state = 0;
        algorithm.data.target.value = 0;
        chatStore.out.updateChatState();
        getEquipGoneEffect();
        algorithm.in.reuse.resetAtTheEnd();

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
        {
          ESTest(algorithm.data.target.value, "number");
          ESTest(algorithm.data.dice.state, "number");
        }

        if (scrollStore.out.getIsScrollType("cursed")) {
          algorithm.data.target.value--;
        } else {
          algorithm.data.target.value += algorithm.data.dice.state;
        }
      },
      getTargetCategoryEquipType: () => {
        {
          ESTest(algorithm.data.target.category, "string");
        }

        return algorithm.data.target.category
          .substring(0, 6)
          .toLowerCase()
          .trim();
      },
      getDiceSuccessValue: () => {
        {
          ESTest(algorithm.data.dice.successValue, "number");
          ESTest(algorithm.data.target.value, "number");
          ESTest(algorithm.data.target.safetyValue, "number");
        }

        if (getIsSpecialCases()) {
          algorithm.data.dice.successValue = 100;
        } else if (algorithm.out.getIsCategoryType("weapon")) {
          algorithm.in.getWeaponSuccessValue();
        } else if (algorithm.out.getIsCategoryType("armor")) {
          algorithm.in.getArmorSuccessValue();
        }

        function getIsSpecialCases() {
          /* example with Weapon Formula */
          //white & blessed: -7 -8... successValue will be 33%, to prevent this situation happened return 100%
          //cursed: when +6 up use cursedScroll successValue will be 33%, to prevent this situation happened return 100%

          return (
            (scrollStore.out.getIsScrollType("white") &&
              algorithm.data.target.value < 0) ||
            (scrollStore.out.getIsScrollType("blessed") &&
              algorithm.data.target.value < 0) ||
            (scrollStore.out.getIsScrollType("cursed") &&
              algorithm.data.target.value >=
                Math.abs(algorithm.data.target.safetyValue))
          );
        }
      },
      getArmorSuccessValue: () => {
        {
          ESTest(algorithm.data.target.value, "number");
          ESTest(algorithm.data.target.safetyValue, "number").min(0);
          ESTest(algorithm.data.dice.bonus, "number").min(0);
          ESTest(algorithm.data.dice.successValue, "number").min(0);
        }

        /* Armor Formula */

        //|underSafetyValue|:100%
        if (
          Math.abs(algorithm.data.target.value) <
          algorithm.data.target.safetyValue
        ) {
          algorithm.data.dice.successValue = 100 + algorithm.data.dice.bonus;
        }
        // |9up|:10%
        else if (Math.abs(algorithm.data.target.value) >= 9) {
          algorithm.data.dice.successValue = 10 + algorithm.data.dice.bonus;
        }
        // |0~8|:1/n * 100%
        else {
          algorithm.data.dice.successValue =
            (1 / Math.abs(algorithm.data.target.value)) * 100 +
            algorithm.data.dice.bonus;
        }
      },
      getWeaponSuccessValue: () => {
        {
          ESTest(algorithm.data.target.value, "number");
          ESTest(algorithm.data.target.safetyValue, "number").min(0);
          ESTest(algorithm.data.dice.successValue, "number").min(0);
          ESTest(algorithm.data.dice.bonus, "number");
        }
        /* Weapon Formula */

        //|underSafetyValue|:100%
        if (
          Math.abs(algorithm.data.target.value) <
          algorithm.data.target.safetyValue
        ) {
          algorithm.data.dice.successValue = 100 + algorithm.data.dice.bonus;
        }
        //|9up|:10%
        else if (Math.abs(algorithm.data.target.value) >= 9) {
          algorithm.data.dice.successValue = 10 + algorithm.data.dice.bonus;
        }
        //|0~8|:33.33%
        else {
          algorithm.data.dice.successValue = 33.33 + algorithm.data.dice.bonus;
        }
      },
      getIsSuccess: () => {
        {
          ESTest(algorithm.data.dice.successValue, "number");
          ESTest(algorithm.data.dice.value, "number");
        }

        algorithm.in.getDiceValue();
        algorithm.in.getDiceSuccessValue();

        return algorithm.data.dice.successValue >= algorithm.data.dice.value;
      },
      getIsMatchedScrollEquipType: () => {
        return (
          scrollStore.out.getScrollEquipType() ===
          algorithm.in.getTargetCategoryEquipType()
        );
      },
    },
    out: {
      updateData: (equip) => {
        {
          ESTest(algorithm.data.target, "object").schema({
            name: "string",
            category: "string",
            value: "number",
            safetyValue: "number",
          });

          ESTest(algorithm.data.target.safetyValue, "number").min(0);
        }

        algorithm.data.target.name = equip.name;
        algorithm.data.target.value = equip.value;
        algorithm.data.target.category = equip.category;
        algorithm.data.target.safetyValue = equip.safetyValue;
      },
      getIsCategoryType: (text) => {
        {
          ESTest(algorithm.data.target.category, "string");
        }

        return algorithm.data.target.category
          .toLowerCase()
          .includes(text.toLowerCase());
      },
      doAlgorithm: (equip, event) => {
        {
          ESTest(equip, "object");
          ESTest(event, "object");
          ESTest(knightStore.data.isStopFunction, "boolean");
          ESTest(algorithm.data.target.value, "number");
        }

        if (knightStore.data.isStopFunction) return;
        if (!algorithm.in.getIsMatchedScrollEquipType()) return;

        if (algorithm.in.getIsSuccess()) {
          switch (scrollStore.out.getScrollType()) {
            case "blessed":
              if (algorithm.data.target.value < 3) {
                algorithm.in.reuse.getRandomStateOneTo(3);
                algorithm.in.reuse.handleUpdate();
              } else if (algorithm.data.target.value < 6) {
                algorithm.in.reuse.getRandomStateOneTo(2);
                algorithm.in.reuse.handleUpdate();
              } else if (algorithm.data.target.value < 9) {
                algorithm.in.reuse.getRandomStateOneTo(1);
                algorithm.in.reuse.handleUpdate();
              } else {
                algorithm.in.reuse.getRandomStateOneTo(6);
                algorithm.in.reuse.handleUpdateOver9();
              }
              break;

            case "white":
              if (algorithm.data.target.value < 9) {
                algorithm.in.reuse.getRandomStateOneTo(1);
                algorithm.in.reuse.handleUpdate();
              } else {
                algorithm.in.reuse.getRandomStateOneTo(6);
                algorithm.in.reuse.handleUpdateOver9();
              }
              break;

            case "cursed":
              if (algorithm.data.target.value > -9) {
                algorithm.in.reuse.getRandomStateOneTo(1);
                algorithm.in.reuse.handleUpdate();
              } else {
                algorithm.in.reuse.getRandomStateOneTo(6);
                algorithm.in.reuse.handleUpdateOver9();
              }
              break;
          }
        } else {
          algorithm.in.handleFailure(equip, event);
        }
      },
    },
  };

  return {
    data: algorithm.data,
    out: algorithm.out,
  };
});

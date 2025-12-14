<template>
  <ul id="🧱StatusEquips">
    <li
      id="🧱StatusEquips__Equip"
      v-for="equip in pageGameStore.data.equips"
      :key="equip.id"
      :class="equip.category"
      :style="{
        backgroundImage: `url(/${equip.src})`,
      }"
      @click="updateEquip(equip, $event)"
      :data-displayEquipInfo="getEquipInfo(equip)"
    />
  </ul>
</template>

<script setup>
import { useScrollStore } from "../stores/scroll";
import { useAlgorithmStore } from "../stores/algorithm";
const algorithmStore = useAlgorithmStore();
const scrollStore = useScrollStore();
import { usePageGameStore } from "../stores/pages/page-game";

const pageGameStore = usePageGameStore();

function changeCursor() {
  if (scrollStore.data.targetScroll === "none") {
    return `url("/UI/UI_pointer.webp"), auto`;
  } else {
    return `url("/UI/UI_target.webp"), auto`;
  }
}

function getEquipInfo(equip) {
  let temp = `${getName()}
${getFeature()}
${getMaterial()}`;

  function showPlusOrMinus(value) {
    return value >= 0 ? `+${value}` : value;
  }

  function getName() {
    const getNameArmor =
      () => `${showPlusOrMinus(equip.value)} ${equip.name} (使用中)
防禦 ${equip.armor}${showPlusOrMinus(equip.value)}`;

    const getNameWeapon = () =>
      `${showPlusOrMinus(equip.value)} ${equip.name} (揮舞)
攻擊力 ${equip.attack.small}${showPlusOrMinus(equip.value)}/${
        equip.attack.large
      }${showPlusOrMinus(equip.value)}` + getIsTwoHandsWeapon();

    const getIsTwoHandsWeapon = () =>
      /雙手武器/.test(equip.grip) ? "\n  雙手武器" : "";

    const getNameJewelry = () => `${equip.name} (使用中)`;

    if (equip.category === "weapon") return getNameWeapon();
    else if (equip.category.includes("armor")) return getNameArmor();
    else if (equip.category.includes("jewelry")) return getNameJewelry();
  }

  function getFeature() {
    //Jewelries are not opened yet
    const getFeatureText = () => {
      const showMR = () => {
        if (equip.mr === undefined) return "";

        if (/cloak/.test(equip.category)) {
          return showPlusOrMinus(equip.mr + equip.value * 2);
        } else if (/helmet|bodyArmor/.test(equip.category)) {
          return showPlusOrMinus(equip.mr + equip.value);
        }
      };
      return `可使用職業:
${equip.occupation}
${equip.feature} ${showMR()}`;
    };
    const getNoneFeatureText = () => `可使用職業:
${equip.occupation}`;

    if (!equip.feature) return getNoneFeatureText();
    if (equip.category.includes("jewelry")) return "";
    return getFeatureText();
  }

  function getMaterial() {
    //Jewelries are not opened yet
    if (equip.category.includes("jewelry")) return "";
    return `材質:${equip.material}
重量 ${equip.weight}`;
  }

  return temp;
}

function updateEquip(equip, event) {
  // save info in pinia
  algorithmStore.data.target.name = equip.name;
  algorithmStore.data.target.value = equip.value;
  algorithmStore.data.target.category = equip.category;
  algorithmStore.data.target.safetyValue = equip.safetyValue;

  algorithmStore.out.doAlgorithm(equip, event);

  // display number in UI
  equip.value = algorithmStore.data.target.value;
}
</script>

<style lang="scss">
#🧱StatusEquips {
  position: absolute;
  inset: 0;

  &:hover {
    cursor: v-bind("changeCursor()");
  }

  #🧱StatusEquips__Equip {
    position: absolute;
    width: 11%;
    height: 9%;
    color: transparent;
    opacity: 1;
    transition: opacity 1s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    background-size: cover;
    background-repeat: round;

    &::after {
      content: attr(data-displayEquipInfo);
      position: absolute;
      top: 102%;
      z-index: 1;
      width: 375%;
      border-width: 0.22vw;
      display: none;

      font-size: 1.3vw;
      line-height: 100%;
      padding: 0.4vw 0px 0.1vw 0.3vw;
      background: rgba(0, 0, 0, 0.45);
      border: 0.3vw solid;
      border-color: #c7c2be #817f80 #817f80 #c7c2be;
      white-space: pre-wrap;
      line-height: 100%;
      color: #e5e7eb;
    }

    &:hover::after {
      display: block;
    }

    &.weapon {
      top: 52.35%;
      left: 35.25%;
    }

    &.armor {
      &.helmet {
        top: 13.75%;
        left: 70%;
        z-index: 2;
      }

      &.shirt {
        top: 31.25%;
        left: 46.5%;
        z-index: 1;
      }

      &.bodyArmor {
        top: 31.25%;
        left: 58.5%;
        z-index: 1;
      }

      &.cloak {
        top: 31.5%;
        left: 70.5%;
        z-index: 1;
      }

      &.shield {
        top: 44.5%;
        left: 78%;
      }

      &.gloves {
        top: 49%;
        left: 47.5%;
      }

      &.boots {
        top: 80%;
        left: 76.5%;
      }
    }

    &.jewelry {
      &.amulet {
        top: 19.5%;
        left: 57.75%;
      }

      &.left-ring {
        top: 42.2%;
        left: 33.75%;
      }

      &.belt {
        top: 41.3%;
        left: 63.75%;
      }

      &.right-ring {
        top: 55%;
        left: 76.5%;
      }

      &.amulet::after,
      &.belt::after,
      &.left-ring::after,
      &.right-ring::after {
        color: #9ca3af;
        border: unset;
        background: unset;
        padding: unset;
        white-space: nowrap;
      }
    }
  }
}
</style>

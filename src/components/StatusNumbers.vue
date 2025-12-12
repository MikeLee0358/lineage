<template>
  <ul id="🧱StatusNumbers">
    <ul id="🧱StatusNumbers__Level">
      <li id="🧱StatusNumbers__Level__Lv">
        {{ roleStore.out.currentData().basic.lv }}
      </li>
      <li id="🧱StatusNumbers__Level__Exp">
        {{ roleStore.out.currentData().basic.exp }}
      </li>
    </ul>
    <ul id="🧱StatusNumbers__Basic">
      <li id="🧱StatusNumbers__Basic__Li">
        {{ roleStore.out.currentData().basic.hp }}/{{
          roleStore.out.currentData().basic.hp
        }}
      </li>
      <li id="🧱StatusNumbers__Basic__Li">
        {{ roleStore.out.currentData().basic.mp }}/{{
          roleStore.out.currentData().basic.mp
        }}
      </li>
      <li id="🧱StatusNumbers__Basic__Li">{{ roleStore.out.getAC() }}</li>
    </ul>
    <ul id="🧱StatusNumbers__Attributes">
      <li id="🧱StatusNumbers__Attributes__Li">
        {{ roleStore.out.currentData().basic.str }}
      </li>
      <li id="🧱StatusNumbers__Attributes__Li">
        {{ roleStore.out.currentData().basic.dex }}
      </li>
      <li id="🧱StatusNumbers__Attributes__Li">
        {{ roleStore.out.currentData().basic.con }}
      </li>
      <li id="🧱StatusNumbers__Attributes__Li">
        {{ roleStore.out.currentData().basic.int }}
      </li>
      <li id="🧱StatusNumbers__Attributes__Li">
        {{ roleStore.out.currentData().basic.wis }}
      </li>
      <li id="🧱StatusNumbers__Attributes__Li">
        {{ roleStore.out.currentData().basic.cha }}
      </li>
    </ul>
    <li id="🧱StatusNumbers__Er">2</li>
  </ul>
</template>

<script setup>
import { useRoleStore } from "../stores/role";

const roleStore = useRoleStore();
</script>

<style lang="scss">
#🧱StatusNumbers {
  position: absolute;
  transform: scale(0.47);
  inset: -56%;

  @media (min-height: 321px) {
    & {
      transform: scale(0.6);
      inset: -34%;
    }
  }

  @media (min-height: 480px) {
    & {
      transform: unset;
      inset: 0%;
      font-size: 2.6vmin;
    }
  }

  #🧱StatusNumbers__Level {
    position: absolute;
    inset: 4% 15% 91.5% 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;
  }

  #🧱StatusNumbers__Basic {
    position: absolute;
    inset: 12.2% 46% 73% 30%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-height: 480px) {
      & {
        top: 12.7%;
      }
    }

    #🧱StatusNumbers__Basic__Li {
      flex: 1;
      line-height: 100%;
      display: flex;
      align-items: center;
    }
  }

  #🧱StatusNumbers__Attributes {
    position: absolute;
    inset: 41.5% 68% 30% 13%;
    display: flex;
    flex-direction: column;
    align-items: center;

    #🧱StatusNumbers__Attributes__Li {
      flex: 1;
      line-height: 100%;
      display: flex;
      align-items: center;
    }
  }

  #🧱StatusNumbers__Er {
    position: absolute;
    inset: 89.8% 25% 5.5% 63%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<template>
  <section id="🧱UINumbers">
    <div id="🧱UINumbers__X1">
      <span id="🧱UINumbers__X1__Lv">1</span>
      <span id="🧱UINumbers__X1__Exp">0.00%</span>
    </div>
    <div id="🧱UINumbers__X2">
      <span id="🧱UINumbers__X2__Ac">{{ pageGameStore.out.getAC() }}</span>
      <span id="🧱UINumbers__X2__State">0</span>
    </div>
  </section>
</template>

<script setup>
import { usePageGameStore } from "../stores/pages/pageGame";

const pageGameStore = usePageGameStore();
</script>

<style lang="scss">
#🧱UINumbers {
  grid-area: 🧱UINumbers;
  position: absolute;
  inset: -15.65% -37% 32.5% -24%;
  display: flex;
  flex-direction: column;
  transform: scale(0.5);
  text-align: center;
  font-size: 2.8vw;
  gap: 7%;
  line-height: 100%;

  @media (min-height: 480px) {
    & {
      font-size: 3vw;
    }
  }

  #🧱UINumbers__X1 {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10vw;
    padding-left: 12%;

    #🧱UINumbers__X1__Lv {
      flex-basis: 9%;
      display: flex;
      justify-content: end;
    }

    #🧱UINumbers__X1__Exp {
      flex: 1;
    }
  }

  #🧱UINumbers__X2 {
    flex: 1;
    display: flex;
    gap: 6vw;
    align-items: center;

    #🧱UINumbers__X2__Ac {
      flex-basis: 31%;
    }

    #🧱UINumbers__X2__State {
      flex: 1;
    }
  }
}
</style>

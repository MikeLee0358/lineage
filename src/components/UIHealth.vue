<template>
  <section id="🧱UIHealth">
    <span id="🧱UIHealth__Hp">
      HP:{{ roleStore.out.currentData().basic.hp }}/{{
        roleStore.out.currentData().basic.hp
      }}
    </span>
    <span id="🧱UIHealth__Mp">
      MP:{{ roleStore.out.currentData().basic.mp }}/{{
        roleStore.out.currentData().basic.mp
      }}
    </span>
  </section>
</template>

<script setup>
import { useRoleStore } from "../stores/role";
const roleStore = useRoleStore();
</script>

<style lang="scss">
#🧱UIHealth {
  grid-area: 🧱UIHealth;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 24.5vw 1fr;
  grid-template-areas: "🧱UIHealth__Hp . 🧱UIHealth__Mp";
  position: relative;
  inset: -39% 0% 0% -24%;
  font-size: 2.5vw;
  width: 149%;
  height: 160%;
  transform: scale(0.6);

  /* Firefox */
  @-moz-document url-prefix() {
    & {
      height: 164%;
    }
  }

  @media (min-height: 321px) {
    & {
      transform: scale(0.6, 0.5);
    }
  }

  #🧱UIHealth__Hp {
    grid-area: 🧱UIHealth__Hp;
    justify-self: end;
    -webkit-text-stroke: 0.05px rgb(89, 9, 9);
    color: rgb(236, 194, 194);
    margin-right: -0.65vw;
  }

  #🧱UIHealth__Mp {
    grid-area: 🧱UIHealth__Mp;
    -webkit-text-stroke: 0.05px rgb(30, 10, 96);
    color: rgb(181, 217, 255);
    margin-top: 1%;
  }
}
</style>

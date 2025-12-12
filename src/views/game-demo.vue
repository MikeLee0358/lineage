<template>
  <article id="🏠game-demo">
    <section id="🏠game-demo__X">
      <UIKnight />
    </section>

    <section id="🏠game-demo__X2">
      <UIHealth />
      <UIChat />
      <UIItems />
      <UINumbers />
      <UIFunction />
    </section>
  </article>
</template>

<script setup>
import UIHealth from "../components/UIHealth.vue";
import UIKnight from "../components/UIKnight.vue";
import UIChat from "../components/UIChat.vue";
import UIItems from "../components/UIItems.vue";
import UINumbers from "../components/UINumbers.vue";
import UIFunction from "../components/UIFunction.vue";
</script>

<style lang="scss">
#🏠game-demo {
  background: black;
  color: #e5e7eb;
  height: 100vh;
  width: 100vw;
  background-image: url("/knight/knight_background.webp");

  background-size: cover;
  background-repeat: round;
  cursor: url("/UI/UI_pointer.webp"), auto;

  @media (orientation: portrait) {
    & {
      background-image: none;
    }

    & > * {
      display: none !important;
    }

    &::after {
      content: "請切換橫幅模式";
      width: 100vw;
      height: 100vh;
      display: grid;
      place-items: center;
      font-size: 12vw;
    }
  }
}

#🏠game-demo__X {
  position: relative;
  height: 73%;
}

#🏠game-demo__X2 {
  display: grid;
  grid-template-columns: 17.5% 1fr 23%;
  grid-template-rows: 20% 64% 16%;
  grid-template-areas:
    ". 🧱UIHealth ."
    "🧱UINumbers 🧱UIChat 🧱UIItems"
    "🧱UINumbers . 🧱UIFunction";

  position: relative;
  height: 27%;
}
</style>

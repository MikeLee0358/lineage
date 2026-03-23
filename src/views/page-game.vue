<template>
  <LayoutComp>
    <main id="🏠page-game">
      <div id="🏠page-game__X">
        <StatusBox />
        <KnightBox />
      </div>

      <div id="🏠page-game__X2">
        <UIHealth />
        <UIChat />
        <UIItems />
        <UINumbers />
      </div>
    </main>
  </LayoutComp>
</template>

<script setup>
import StatusBox from "../components/StatusBox.vue";
import UIHealth from "../components/UIHealth.vue";
import KnightBox from "../components/KnightBox.vue";
import UIChat from "../components/UIChat.vue";
import UIItems from "../components/UIItems.vue";
import UINumbers from "../components/UINumbers.vue";
import LayoutComp from "../layouts/LayoutComp.vue";
</script>

<style lang="scss">
#🏠page-game {
  background: black;
  color: #e5e7eb;
  height: 100vh;
  width: 100vw;
  background-image: url("/knight/knight_background.webp");

  background-size: cover;
  background-repeat: round;
  cursor: url("/UI/UI_pointer.webp"), auto;

  @media (orientation: portrait), (max-width: 500px) {
    & {
      background-image: none;
    }

    & > * {
      display: none !important;
    }

    &::after {
      content: "橫幅模式或瀏覽器開啟(右上角)";
      width: 100vw;
      height: 100vh;
      display: grid;
      align-items: center;
      text-align: center;
      font-size: 10vw;
    }
  }
}

#🏠page-game__X {
  position: relative;
  height: 73%;
}

#🏠page-game__X2 {
  display: grid;
  grid-template-columns: 17.5% 1fr 23%;
  grid-template-rows: 20% 64% 16%;
  grid-template-areas:
    ". 🧱UIHealth ."
    "🧱UINumbers 🧱UIChat 🧱UIItems"
    "🧱UINumbers . .";

  position: relative;
  height: 27%;
}
</style>

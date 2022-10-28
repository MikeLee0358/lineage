<template>
  <article id="⭐SinglePlayer">
    <section id="⭐SinglePlayer__Knight">
      <KnightUI />
    </section>

    <section id="⭐SinglePlayer__PanelUI">
      <HealthUI />
      <ChatUI />
      <ItemsUI />
      <NumbersUI />
      <FunctionUI />
    </section>

    <audio
      autoplay="autoplay"
      loop="loop"
      :src="audioStore.out.getRoleAudioUrl()"
    ></audio>
  </article>
</template>

<script setup>
import HealthUI from "../components/HealthUI.vue";
import KnightUI from "../components/KnightUI.vue";
import ChatUI from "../components/ChatUI.vue";
import ItemsUI from "../components/ItemsUI.vue";
import NumbersUI from "../components/NumbersUI.vue";
import FunctionUI from "../components/FunctionUI.vue";
import { useAudioStore } from "../stores/music";

const audioStore = useAudioStore();
</script>

<style lang="scss">
#⭐SinglePlayer {
  height: 100vh;
  width: 100vw;
  background-image: url("@/assets/knight/knight_background.webp");

  background-size: cover;
  background-repeat: round;
  cursor: url("@/assets/UI/UI_pointer.webp"), auto;

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

#⭐SinglePlayer__Knight {
  position: relative;
  height: 73%;
}

#⭐SinglePlayer__PanelUI {
  display: grid;
  grid-template-columns: 17.5% 1fr 23%;
  grid-template-rows: 20% 64% 16%;
  grid-template-areas:
    ". 🔥HealthUI ."
    "🔥NumbersUI 🔥ChatUI 🔥ItemsUI"
    "🔥NumbersUI . 🔥FunctionUI";

  position: relative;
  height: 27%;
}
</style>

<template>
  <section id="🧱KnightBox">
    <div id="🧱KnightBox__X">
      <p id="🧱KnightBox__X__Title">蛇髮 名模↙</p>
      <p id="🧱KnightBox__X__Name">熱血狂志</p>
      <p
        id="🧱KnightBox__X__ChatEvent"
        v-show="knightStore.data.isShowGameChat"
      >
        熱血狂志: {{ knightStore.data.chatMsg }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { useKnightStore } from "../stores/knight";
const knightStore = useKnightStore();

knightStore.out.repeatTalkChatEvent(10);
</script>

<style lang="scss">
#🧱KnightBox {
  position: relative;
  background-image: url("/knight/knight.gif");
  background-size: cover;
  background-repeat: round;
  top: 48%;
  left: 40%;
  width: 11%;
  height: 15.75%;
}

#🧱KnightBox__X {
  position: absolute;
  inset: -72% -50% 0% -50%;
  font-size: clamp(12px, 3.5vh, 30px);
  line-height: 110%;
  text-align: center;
  transform: translateX(15%);

  @media (min-height: 480px) {
    & {
      inset: -57% -60% 0% -60%;
      font-size: clamp(12px, 2.8vh, 30px);
    }
  }
}

#🧱KnightBox__X__Title {
  color: rgb(60, 255, 255);
}

#🧱KnightBox__X__Name {
  color: rgb(255, 255, 0);
}

#🧱KnightBox__X__ChatEvent {
  position: relative;
  z-index: 1;
  top: 15vh;
  color: #e5e7eb;
  font-size: clamp(12px, 2.6vh, 30px);

  &::before {
    content: "▲";
    position: absolute;
    left: 44.5%;
    z-index: 1;
    transform: translateY(-100%);
  }
}
</style>

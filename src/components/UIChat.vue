<template>
  <ul id="🧱UIChat">
    <li
      id="🧱UIChat__Li"
      v-for="(chatline, index) in chatStore.data.lines"
      :key="index"
    >
      {{ chatline }}
    </li>
  </ul>
</template>

<script setup>
import { useChatStore } from "../stores/chat";
const chatStore = useChatStore();
</script>

<style lang="scss">
#🧱UIChat {
  grid-area: 🧱UIChat;
  position: relative;
  inset: 1% 0 0 0.5%;

  & > * {
    height: 14.28%;
    line-height: 100%;
    transform: scaleY(0.5);
    font-size: 1.85vw;
    color: #fef9c3;
  }
}
</style>

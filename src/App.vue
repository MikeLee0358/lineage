<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss">
#⭐Main {
  display: flex;
  align-items: center;
  justify-content: center;

  @media (orientation: portrait) {
    & {
      & > * {
        display: none !important;
      }

      &::after {
        content: "請切換橫幅模式";
        font-size: 12vw;
      }
    }
  }
}
</style>

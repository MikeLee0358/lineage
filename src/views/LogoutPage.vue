<template>
  <section id="📃LogoutPage">
    <video
      :src="roleStore.out.getUrlForHashWhenProd('logout/classic.mp4')"
      autoplay
      @ended="() => window.location.replace('/')"
    ></video>
  </section>
</template>

<script setup>
import { useRoleStore } from "../stores/role";
const roleStore = useRoleStore();
</script>

<style lang="scss">
#📃LogoutPage {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <section id="🧱StatusBox">
    <StatusNumbers />
    <StatusEquips />
  </section>
</template>

<script setup>
import StatusNumbers from "../components/StatusNumbers.vue";
import StatusEquips from "../components/StatusEquips.vue";
</script>

<style lang="scss">
#🧱StatusBox {
  position: absolute;
  inset: 0% 60% 0% 0%;
  background-image: url("/UI/UI_role.webp");
  background-size: cover;
  background-repeat: round;
}
</style>

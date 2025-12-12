<template>
  <ul id="🧱StatusUI" @click.stop="handleClick">
    <li id="🧱StatusUI__Close" class="--close" />
    <StatusNumbers />
    <StatusEquips />
  </ul>
</template>

<script setup>
import StatusNumbers from "../components/StatusNumbers.vue";
import StatusEquips from "../components/StatusEquips.vue";
import { useHelperStore } from "../stores/helper";

const helperStore = useHelperStore();

function handleClick(e) {
  if (e.target.className === "--close") {
    helperStore.data.btnState = "--close";
    helperStore.data.isDefault = false;
  }
}
</script>

<style lang="scss">
#🧱StatusUI {
  position: absolute;
  inset: -2216% 1359.3% 704.8% -2500%;
  background-image: url("/UI/UI_role.webp");
  background-size: cover;
  background-repeat: round;

  #🧱StatusUI__Close {
    position: absolute;
    inset: 0.5% 2.25% 94% 86.5%;
    z-index: 2;
    opacity: 0;

    background-image: url("/UI/UI_close.webp");
    background-size: cover;
    background-repeat: round;
  }
}

.--close:hover {
  opacity: 1 !important;
}
</style>

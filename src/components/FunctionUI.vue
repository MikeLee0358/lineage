<template>
  <ul id="🔥FunctionUI" @click.stop="handleClick">
    <li class="--btnHelp">
      <HelpUI v-show="helperStore.data.btnState === '--btnHelp'" />
    </li>
    <li class="--btnRole">
      <StatusUI
        v-show="
          helperStore.data.btnState === '--btnRole' ||
          helperStore.data.isDefault
        "
      />
    </li>
  </ul>
</template>

<script setup>
import HelpUI from "./HelpUI.vue";
import StatusUI from "./StatusUI.vue";

import { useHelperStore } from "../stores/helper";
const helperStore = useHelperStore();

function handleClick(e) {
  if (e.target.tagName === "UL") return;

  helperStore.data.btnState = e.target.className;
  helperStore.data.isDefault = false;
}
</script>

<style lang="scss">
#🔥FunctionUI {
  position: relative;
  grid-area: 🔥FunctionUI;
}

.--btnHelp {
  position: absolute !important;
  inset: 0 85% 0 1% !important;
}

.--btnRole {
  position: absolute !important;
  inset: 0 71% 0 15% !important;
}
</style>

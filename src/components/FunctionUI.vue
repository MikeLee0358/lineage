<template>
  <ul id="🔥FunctionUI" @click.stop="FunctionUI.out.handleClick">
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
    <li class="--btnSetting">
      <OptionsUI v-show="helperStore.data.btnState === '--btnSetting'" />
    </li>
    <li class="--btnLogout">
      <SystemUI v-show="helperStore.data.btnState === '--btnLogout'" />
    </li>
  </ul>
</template>

<script setup>
import HelpUI from "./HelpUI.vue";
import StatusUI from "./StatusUI.vue";
import SystemUI from "./SystemUI.vue";
import OptionsUI from "./OptionsUI.vue";
import { unitTest } from "../utils/UnitTest";
import { useAudioStore } from "../stores/music";
import { useHelperStore } from "../stores/helper";
const audioStore = useAudioStore();
const helperStore = useHelperStore();

const FunctionUI = {
  out: {
    handleClick: (e) => {
      {
        if (e.target.tagName === "UL") return;
        unitTest(helperStore.data.btnState, "string");
        unitTest(helperStore.data.isDefault, "boolean");
      }

      audioStore.out.clickToPlayAudio("UI/audio_itemsOpen.mp3");
      helperStore.data.btnState = e.target.className;
      helperStore.data.isDefault = false;
    },
  },
};
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

.--btnSetting {
  position: absolute !important;
  inset: 0 14% 0 72% !important;
}

.--btnLogout {
  position: absolute !important;
  inset: 0% 0% 0% 86.5% !important;
}
</style>

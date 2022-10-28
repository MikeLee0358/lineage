<template>
  <ul id="🔥StatusUI" @click.stop="StatusUI.out.handleClick">
    <li id="🔥StatusUI__Close" class="--close" />
    <StatusNumbers />
    <StatusEquips />
  </ul>
</template>

<script setup>
import StatusNumbers from "../components/StatusNumbers.vue";
import StatusEquips from "../components/StatusEquips.vue";
import { useHelperStore } from "../stores/helper";
import { useAudioStore } from "../stores/music";
import { unitTest } from "../utils/UnitTest";

const helperStore = useHelperStore();
const audioStore = useAudioStore();

const StatusUI = {
  in: {
    handleClose: () => {
      {
        unitTest(helperStore.data.btnState, "string");
        unitTest(helperStore.data.isDefault, "boolean");
      }

      audioStore.out.clickToPlayAudio("UI/audio_itemsClose.mp3");
      helperStore.data.btnState = "--close";
      helperStore.data.isDefault = false;
    },
  },
  out: {
    handleClick: (e) => {
      if (e.target.className === "--close") {
        StatusUI.in.handleClose();
      }
    },
  },
};
</script>

<style lang="scss">
#🔥StatusUI {
  position: absolute;
  inset: -2216% 1359.3% 704.8% -2500%;
  background-image: url("@/assets/UI/UI_role.webp");
  background-size: cover;
  background-repeat: round;

  #🔥StatusUI__Close {
    position: absolute;
    inset: 0.5% 2.25% 94% 86.5%;
    z-index: 2;
    opacity: 0;

    background-image: url("@/assets/UI/UI_close.webp");
    background-size: cover;
    background-repeat: round;
  }
}

.--close:hover {
  opacity: 1 !important;
}
</style>

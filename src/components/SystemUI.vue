<template>
  <figure id="🔥SystemUI" @click.stop="handleClick">
    <li id="🔥SystemUI__Close" class="--close" />
    <RouterLink id="🔥SystemUI__Restart" class="--restart" to="/" />
    <RouterLink id="🔥SystemUI__Quit" class="--quit" to="/logout" />
    <li id="🔥SystemUI__Cancel" class="--cancel" />
  </figure>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useHelperStore } from "../stores/helper";
import { useAudioStore } from "../stores/music";

const helperStore = useHelperStore();
const audioStore = useAudioStore();

function handleClick(e) {
  if (["--cancel", "--close"].includes(e.target.className)) {
    helperStore.data.btnState = "--close";
  }

  audioStore.out.clickToPlayAudio("UI/audio_itemsClose.mp3");
}
</script>

<style lang="scss">
#🔥SystemUI {
  inset: -2216% 0% 704.8% -1016.55%;
  background-image: url("@/assets/UI/UI_logout.webp");

  &,
  & > * {
    position: absolute;
    background-size: cover;
    background-repeat: round;
  }

  #🔥SystemUI__Close {
    inset: 1% 86.75% 95% 2.5%;
    background-image: url("@/assets/UI/UI_close.webp");
    opacity: 0;
  }

  #🔥SystemUI__Restart {
    inset: 20.5% 31.75% 73.25% 43.5%;
    background-image: url("@/assets/UI/UI_restart.webp");
    opacity: 0.3;
  }

  #🔥SystemUI__Quit {
    inset: 29.95% 35% 64.5% 47.25%;
    background-image: url("@/assets/UI/UI_quit.webp");
    opacity: 0.3;
  }

  #🔥SystemUI__Cancel {
    inset: 37.75% 29.25% 55.25% 44%;
    background-image: url("@/assets/UI/UI_cancel.webp");
    opacity: 0.3;
  }
}

.--close:hover {
  opacity: 1 !important;
}

.--restart:hover {
  opacity: 1 !important;
}

.--quit:hover {
  opacity: 1 !important;
}

.--cancel:hover {
  opacity: 1 !important;
}
</style>

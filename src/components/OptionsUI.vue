<template>
  <ul id="🔥OptionsUI" @click.stop="OptionsUI.out.handleClick">
    <li id="🔥OptionsUI__Close" class="--close"></li>
    <li id="🔥OptionsUI__Li">選項</li>
    <li id="🔥OptionsUI__Music" class="--music">
      背景音效:
      <span id="🔥OptionsUI__Li__Span">{{ audioStore.out.showOnOff() }}</span>
    </li>
  </ul>
</template>

<script setup>
import { useHelperStore } from "../stores/helper";
import { useAudioStore } from "../stores/music";
import { unitTest } from "../utils/UnitTest";

const helperStore = useHelperStore();
const audioStore = useAudioStore();

const OptionsUI = {
  in: {
    handleClose: () => {
      {
        unitTest(helperStore.data.btnState, "string");
      }

      audioStore.out.clickToPlayAudio("UI/audio_itemsClose.mp3");
      helperStore.data.btnState = "--close";
    },
    toggleAudio: () => {
      {
        unitTest(audioStore.data.isOn, "boolean");
      }

      audioStore.data.isOn = !audioStore.data.isOn;

      audioStore.data.isOn === true
        ? audioStore.out.playAudio()
        : audioStore.out.pauseAudio();
    },
  },
  out: {
    handleClick: (e) => {
      if (e.target.className === "--music") OptionsUI.in.toggleAudio();
      else if (e.target.className === "--close") OptionsUI.in.handleClose();
    },
  },
};
</script>

<style lang="scss">
#🔥OptionsUI {
  position: absolute;
  inset: -2216% 1759.3% 704.8% -2901%;

  background-image: url("@/assets/UI/UI_template.webp");
  background-size: cover;
  background-repeat: round;

  & > * {
    position: relative;
    top: 6.5%;
    left: 6.5%;
    color: rgb(195, 196, 201);
    font-size: 1.3vw;
  }

  #🔥OptionsUI__Music {
    margin-top: 5%;
  }

  #🔥OptionsUI__Close {
    position: absolute;
    inset: 1.25% 2.5% 95% 87.85%;
    opacity: 0;

    background-image: url("@/assets/UI/UI_close.webp");
    background-size: cover;
    background-repeat: round;
  }

  #🔥OptionsUI__Li__Span {
    color: rgb(195, 196, 201);
  }
}

.--close:hover {
  opacity: 1 !important;
}

.--music {
  color: rgb(255, 255, 190) !important;
}
</style>

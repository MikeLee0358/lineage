<template>
  <ul id="🔥HelpUI" @click.stop="HelpUI.out.handleClick">
    <li id="🔥HelpUI__Close" class="--close"></li>
    <li id="🔥HelpUI__TextBox">
      <h1 id="🔥HelpUI__TextBox__Title">Side project由來</h1>
      <p id="🔥HelpUI__TextBox__Content">
        {{
          `
        靈感來源為“天堂爆爆樂逼真版”，主要是練習技能和回憶天堂。
        當第一版復刻完成後，總覺得還可以加些什麼，所以就踏上了的優化旅程。
        資料和素材取自網路、天堂Ｗ、巴哈姆特、官方網站以及遊戲主程式。`
        }}
      </p>
    </li>
  </ul>
</template>

<script setup>
import { useAudioStore } from "../stores/music";
import { useHelperStore } from "../stores/helper";
const helperStore = useHelperStore();
const audioStore = useAudioStore();

const HelpUI = {
  in: {
    handleClose: () => {
      audioStore.out.clickToPlayAudio("UI/audio_itemsClose.mp3");
      helperStore.data.btnState = "--close";
    },
  },
  out: {
    handleClick: (e) => {
      if (e.target.className === "--close") {
        HelpUI.in.handleClose();
      }
    },
  },
};
</script>

<style lang="scss">
#🔥HelpUI {
  position: absolute;
  inset: -2216% 1252.3% 704.8% -2394%;
  display: flex;
  align-items: center;
  background-image: url("@/assets/UI/UI_template.webp");
  background-size: cover;
  background-repeat: round;

  #🔥HelpUI__Close {
    position: absolute;
    inset: 1.35% 2.75% 94.75% 88%;

    background-image: url("@/assets/UI/UI_close.webp");
    background-size: cover;
    background-repeat: round;
    opacity: 0;
  }

  #🔥HelpUI__TextBox {
    position: absolute;
    inset: -30% -13% -29% -25%;
    transform: scale(0.55);
    font-size: 2.5vw;

    @media (min-height: 480px) {
      & {
        font-size: 2.8vw;
      }
    }

    #🔥HelpUI__TextBox__Title {
      text-align: center;
    }

    #🔥HelpUI__TextBox__Content {
      white-space: pre-wrap;
    }
  }
}

.--close:hover {
  opacity: 1 !important;
}
</style>

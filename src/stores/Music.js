import { reactive } from "vue";
import { defineStore } from "pinia";
import { useKnightStore } from "./knight";
import { unitTest } from "../utils/UnitTest";

export const useAudioStore = defineStore("music", () => {
  const knightStore = useKnightStore();

  const music = {
    data: reactive({
      isOn: false,
    }),
    out: {
      clickToPlayAudio: (url) => {
        {
          unitTest(url, "string");
        }

        const audio = new Audio(music.out.getUrlForHashWhenProd(url));
        audio.play();
      },
      playAudio: () => {
        {
          unitTest(music.data.isOn, "boolean");
        }

        const audio = document.querySelector("audio");
        if (music.data.isOn) {
          audio.play();
        }
      },
      pauseAudio: () => {
        {
          unitTest(music.data.isOn, "boolean");
        }

        const audio = document.querySelector("audio");
        if (music.data.isOn === false) {
          audio.pause();
        }
      },
      getRoleAudioUrl: () => {
        {
          unitTest(knightStore.data.isDeathKnight, "boolean");
        }

        if (knightStore.data.isDeathKnight) {
          return music.out.getUrlForHashWhenProd(
            "knight/deathKnight_audio.mp3",
          );
        } else {
          return music.out.getUrlForHashWhenProd(`knight/knight_audio.mp3`);
        }
      },
      getUrlForHashWhenProd: (name) => {
        {
          unitTest(name, "string");
        }

        return new URL(`/src/assets/${name}`, import.meta.url).href;
      },
      showOnOff: () => {
        {
          unitTest(music.data.isOn, "boolean");
        }

        return music.data.isOn ? "開" : "關";
      },
    },
  };
  return {
    data: music.data,
    out: music.out,
  };
});

import { reactive } from "vue";
import { defineStore } from "pinia";
import { ESTest } from "escss-estest";

export const useAudioStore = defineStore("music", () => {
  const music = {
    data: reactive({
      isOn: false,
    }),
    out: {
      showOnOff: () => {
        {
          ESTest(music.data.isOn, "boolean");
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

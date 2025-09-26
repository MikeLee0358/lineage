<template>
  <section id="🔥ItemsUI" @click.stop="handleClick">
    <figure v-for="slot in data.slotList" :key="slot.id" :class="slot.hotkey">
      <img :src="roleStore.out.getUrl(slot.src)" />
      <figcaption class="slotInfo">
        <h1>{{ slot.name }}</h1>
        <p>{{ slot.description }}</p>
      </figcaption>
    </figure>
  </section>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useChatStore } from "../stores/chat";
import { useRoleStore } from "../stores/role";
import { useScrollStore } from "../stores/scroll";
import { onBeforeRouteLeave } from "vue-router";
import dataSlot from "@/data/dataSlot.json";
const roleStore = useRoleStore();
const chatStore = useChatStore();
const scrollStore = useScrollStore();

const data = reactive({
  cssColor: "",
  slotList: dataSlot,
});

function getSlotColor(imgUrl) {
  //control primary colors to display text color through js logic
  const color = {
    grey: "#aaa9a9",
    white: "#e8e8e8",
    yellow: "#e9ee8b",
    red: "#ff2424",
  };

  if (/blessed/g.test(imgUrl)) {
    data.cssColor = color.yellow;
  } else if (/cursed/g.test(imgUrl)) {
    data.cssColor = color.red;
  } else {
    data.cssColor = color.white;
  }
}

function handleSlot(classOrKey, isRepeatState = false) {
  //classOrKey required string F5 or F6 ... F12
  const slots = Array.from(document.querySelector("#🔥ItemsUI").children);

  slots.forEach((slot) => {
    slot.classList.remove("active");
    slot.lastElementChild.style.opacity = 0;

    if (slot.className === classOrKey) {
      if (isRepeatState) {
        scrollStore.data.clickTimerId = setInterval(function () {
          scrollStore.out.changeScroll(classOrKey);
        }, 750);
      }

      scrollStore.out.changeScroll(classOrKey);
      chatStore.out.updateChatScroll();
      getSlotColor(slot.firstChild.src);
      slot.classList.add("active");
      slot.lastElementChild.style.opacity = 1;
    }
  });
}

function handleClick(e) {
  // F5 ~F12
  const scrollClass = e.target.parentElement.classList[0];

  scrollStore.out.clearClickScrollTimer();
  handleSlot(scrollClass, true);
}

function handleKeyboard(e) {
  e.preventDefault();
  e.stopPropagation();
  scrollStore.out.clearClickScrollTimer();
  handleSlot(e.key);
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyboard);
});
onBeforeRouteLeave(() => {
  document.removeEventListener("keydown", handleKeyboard);
});
</script>

<style lang="scss">
#🔥ItemsUI {
  grid-area: 🔥ItemsUI;
  position: relative;
  padding: 3.75% 3.75% 3% 4%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(2, 50%);

  .slotInfo {
    position: absolute;
    left: 0;
    right: 0%;
    bottom: 100%;
    opacity: 0;
    font-size: clamp(12px, 2rem, 1.9vw);
    color: v-bind("data.cssColor");
    padding: 0.4vw 0 0.2vw 0.3vw;
    background: rgba(0, 0, 0, 0.45);
    border: 0.3vw solid;
    border-color: #c7c2be #817f80 #817f80 #c7c2be;
    line-height: 105%;
  }

  .F5,
  .F9 {
    opacity: 0;
  }

  .active {
    opacity: 1;
    background-image: url("/slot/slot_empty.webp");
    background-size: cover;
    background-repeat: round;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

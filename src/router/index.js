import { createRouter, createWebHashHistory } from "vue-router";
import gameDemo from "@/views/game-demo.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/game-demo",
      name: "gameDemo",
      component: gameDemo,
    },
  ],
});

export default router;

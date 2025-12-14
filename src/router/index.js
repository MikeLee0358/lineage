import { createRouter, createWebHashHistory } from "vue-router";
import gameDemo from "@/views/page-game.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/page-game",
      name: "page-game",
      component: gameDemo,
    },
  ],
});

export default router;

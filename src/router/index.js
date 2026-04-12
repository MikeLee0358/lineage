import { createRouter, createWebHashHistory } from "vue-router";
import gameDemo from "@/views/pageGame.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/pageGame",
      name: "pageGame",
      component: gameDemo,
    },
  ],
});

export default router;

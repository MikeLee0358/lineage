import { createRouter, createWebHashHistory } from "vue-router";
import gameDemo from "@/views/page-demo.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/page-demo",
      name: "gameDemo",
      component: gameDemo,
    },
  ],
});

export default router;

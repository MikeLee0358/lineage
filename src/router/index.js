import { createRouter, createWebHashHistory } from "vue-router";
import SinglePlayer from "@/views/SinglePlayer.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "SinglePlayer",
      component: SinglePlayer,
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/LogoutPage.vue"),
    },
  ],
});

export default router;

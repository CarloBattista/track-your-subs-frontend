import { createRouter, createWebHistory } from "vue-router";

// General
import HomeView from "../views/HomeView.vue";

const routes = [
  // General
  {
    path: "/",
    name: "home",
    component: HomeView,
    props: true,
    meta: { title: "Control - Home" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title;
  if (pageTitle) {
    document.title = pageTitle;
  } else {
    document.title = "Control";
  }
  next();
});

export default router;

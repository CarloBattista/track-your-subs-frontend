import { createRouter, createWebHistory } from "vue-router";

// Middleware
import middlewareAuth from './middlewares/middlewareAuth'

// General
import LandingPage from "../views/LandingPage.vue";
import HomeView from "../views/HomeView.vue";

// onBoarding
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  // General
  {
    path: "/",
    name: "landing-page",
    component: LandingPage,
    props: true,
    meta: { title: "Control - LP" },
    beforeEnter: middlewareAuth.guest
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    props: true,
    meta: { title: "Control - Home" },
    beforeEnter: middlewareAuth.user
  },

  // onBoarding
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    props: true,
    meta: { title: "Control - Register" },
    beforeEnter: middlewareAuth.guest
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    props: true,
    meta: { title: "Control - Login" },
    beforeEnter: middlewareAuth.guest
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

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Start",
    component: () => import("@/views/Start.vue")
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue")
  },
  {
    path: "/List",
    name: "List",
    component: () => import("@/views/List.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

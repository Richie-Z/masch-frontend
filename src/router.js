import Vue from "vue";
import VueRouter from "vue-router";

//views
import Home from "./views/Home.vue";
import Branch from "./views/branch/Branch.vue";
import editBranch from "./views/branch/editBranch.vue";
import createBranch from "./views/branch/createBranch.vue";
import Studio from "./views/studio/Studio.vue";
import createStudio from "./views/studio/createStudio.vue";
import editStudio from "./views/studio/editStudio.vue";
import Movie from "./views/movie/Movie.vue";
import createMovie from "./views/movie/createMovie.vue";
import editMovie from "./views/movie/editMovie.vue";
import Schedule from "./views/schedule/Schedule.vue";
import createSchedule from "./views/schedule/createSchedule.vue";
import editSchedule from "./views/schedule/editSchedule.vue";
import userSchedule from "./views/Schedule.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/branch",
    name: "Branch",
    component: Branch,
    meta: { authOnly: true },
  },
  {
    path: "/branch/add",
    name: "createBranch",
    component: createBranch,
    meta: { authOnly: true },
  },
  {
    path: "/branch/:id",
    name: "editBranch",
    component: editBranch,
    meta: { authOnly: true },
  },
  {
    path: "/studio",
    name: "Studio",
    component: Studio,
    meta: { authOnly: true },
  },
  {
    path: "/studio/add",
    name: "createStudio",
    component: createStudio,
    meta: { authOnly: true },
  },
  {
    path: "/studio/:id",
    name: "editStudio",
    component: editStudio,
    meta: { authOnly: true },
  },
  {
    path: "/movie",
    name: "Movie",
    component: Movie,
    meta: { authOnly: true },
  },
  {
    path: "/movie/add",
    name: "createMovie",
    component: createMovie,
    meta: { authOnly: true },
  },
  {
    path: "/movie/:id",
    name: "editMovie",
    component: editMovie,
    meta: { authOnly: true },
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
    meta: { authOnly: true },
  },
  {
    path: "/schedule/add",
    name: "createSchedule",
    component: createSchedule,
    meta: { authOnly: true },
  },
  {
    path: "/schedule/:id",
    name: "editSchedule",
    component: editSchedule,
    meta: { authOnly: true },
  },
  {
    path: "/user/schedule",
    name: "userSchedule",
    component: userSchedule,
    meta: { guestOnly: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guestOnly: true },
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
function isLoggedIn() {
  return localStorage.getItem("token");
}
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authOnly)) {
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    if (isLoggedIn()) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    } // make sure to always call next()!
  } else {
    next();
  }
});
export default router;

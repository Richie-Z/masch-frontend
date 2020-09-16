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
import Dashboard from "./views/Dashboard.vue";

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
  },
  {
    path: "/branch/add",
    name: "createBranch",
    component: createBranch,
  },
  {
    path: "/branch/:id",
    name: "editBranch",
    component: editBranch,
  },
  {
    path: "/studio",
    name: "Studio",
    component: Studio,
  },
  {
    path: "/studio/add",
    name: "createStudio",
    component: createStudio,
  },
  {
    path: "/studio/:id",
    name: "editStudio",
    component: editStudio,
  },
  {
    path: "/movie",
    name: "Movie",
    component: Movie,
  },
  {
    path: "/movie/add",
    name: "createMovie",
    component: createMovie,
  },
  {
    path: "/movie/:id",
    name: "editMovie",
    component: editMovie,
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
  },
  {
    path: "/schedule/add",
    name: "createSchedule",
    component: createSchedule,
  },
  {
    path: "/schedule/:id",
    name: "editSchedule",
    component: editSchedule,
  },
  {
    path: "/user/schedule",
    name: "userSchedule",
    component: userSchedule,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;

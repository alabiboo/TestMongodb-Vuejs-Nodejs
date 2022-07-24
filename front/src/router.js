import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/contacts",
    name: "contacts",
    component: () => import("./components/ContactList")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
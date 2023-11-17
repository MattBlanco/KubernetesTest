import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/recipes",
    name: "recipes",
    component: () => import("./components/RecipesList"),
  },
  {
    path: "/recipes/:id",
    name: "recipe-details",
    component: () => import("./components/Recipe"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddRecipe"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

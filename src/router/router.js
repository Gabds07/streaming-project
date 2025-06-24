import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Details from "../pages/Details.vue";
import PageNotFound from "../pages/PageNotFound.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/details/:id",
        name: "Details",
        component: Details,
    },
];

const notFoundRoute = [
    {
        path: "/404",
        name: "404",
        component: PageNotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

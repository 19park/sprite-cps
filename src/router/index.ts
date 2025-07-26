import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";
import {trackRouter} from "vue-gtag-next";
import Index from "@/views/Index.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "Index",
        component: Index,
    },
    {
        path: '/:pathMatch(.*)*',
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
    }
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition): any {
        if (savedPosition) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(savedPosition);
                }, 500);
            });
        }
        return {
            top: 0,
            left: 0,
        };
    },
});
trackRouter(router);
export default router;
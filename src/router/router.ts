import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/github_pages/",
        name: "index",
        component: () => import('../components/index.vue'),
        children: [
            {
                path: "home",
                name: "Home",
                component: () => import('../components/content/Home/home.vue')
            },
            {
                path: "test",
                name: "Test",
                component: () => import('../components/content/Test/test.vue')
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router;
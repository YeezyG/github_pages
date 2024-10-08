import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/github_pages/",
        // name: "Index",
        redirect: { name: 'Home' },
        component: () => import('../components/index.vue'),
        children: [
            {
                path: "home",
                name: "Home",
                component: () => import('../components/content/Home/home.vue')
            },
            {
                path: "blog",
                name: "Blog",
                component: () => import('../components/content/Blog/blog.vue')
            },
            {
                path: "escapeFire",
                name: "EscapeFire",
                component: () => import('../components/content/Test/EscapeFire/escapeFire.vue')
            },
            {
                path: "emotionalAnimation",
                name: "EmotionalAnimation",
                component: () => import('../components/content/Test/EmotionalAnimation/emotionalAnimation.vue')
            },
            {
                path: "fishPool",
                name: "FishPool",
                component: () => import('../components/content/Test/FishPool/fishPool.vue')
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
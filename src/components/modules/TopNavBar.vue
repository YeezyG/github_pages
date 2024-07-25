<script setup lang="ts">
import { ref, h } from 'vue'
import {
    NButton,
    NDropdown,
    NFlex,
    NIcon,
} from 'naive-ui';
import router from '../../router/router'

const navBarList = ref<{ 'name': string, 'routerName': string }[]>([
    {
        'name': '博客',
        'routerName': 'Blog'
    }
])

const dropDownOptions = [
    {
        label: '逃离火灾',
        icon() {
            return h(NIcon, null, {
                default: () => h('svg', {
                    xmlns: 'http://www.w3.org/2000/svg',
                    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                    viewBox: '0 0 384 512',
                    innerHTML: '<path d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99c-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z" fill="currentColor"></path>'
                })
            });
        },
        key: 'EscapeFire',
    },
    {
        label: '情绪表情',
        icon() {
            return h(NIcon, null, {
                default: () => h('svg', {
                    xmlns: 'http://www.w3.org/2000/svg',
                    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                    viewBox: '0 0 496 512',
                    innerHTML: '<path d="M152 180c-25.7 0-55.9 16.9-59.8 42.1c-.8 5 1.7 10 6.1 12.4c4.4 2.4 9.9 1.8 13.7-1.6l9.5-8.5c14.8-13.2 46.2-13.2 61 0l9.5 8.5c2.5 2.2 8 4.7 13.7 1.6c4.4-2.4 6.9-7.4 6.1-12.4c-3.9-25.2-34.1-42.1-59.8-42.1zm176-52c-44.2 0-80 35.8-80 80s35.8 80 80 80s80-35.8 80-80s-35.8-80-80-80zm0 128c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48zm0-72c-13.3 0-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24s-10.7-24-24-24zM248 8C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8zm64 400c0 35.6-29.1 64.5-64.9 64c-35.1-.5-63.1-29.8-63.1-65v-42.8l17.7-8.8c15-7.5 31.5 1.7 34.9 16.5l2.8 12.1c2.1 9.2 15.2 9.2 17.3 0l2.8-12.1c3.4-14.8 19.8-24.1 34.9-16.5l17.7 8.8V408zm28.2 25.3c2.2-8.1 3.8-16.5 3.8-25.3v-43.5c14.2-12.4 24.4-27.5 27.3-44.5c1.7-9.9-7.7-18.5-17.7-15.3c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.9-3.1-19.4 5.3-17.7 15.3c2.9 17 13.1 32.1 27.3 44.5V408c0 8.8 1.6 17.2 3.8 25.3C91.8 399.9 48 333 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 77-43.8 143.9-107.8 177.3z" fill="currentColor"></path>'
                })
            });
        },
        key: 'EmotionalAnimation',
    },
    {
        label: '养鱼喂鱼',
        icon() {
            return h(NIcon, null, {
                default: () => h('svg', {
                    xmlns: 'http://www.w3.org/2000/svg',
                    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                    viewBox: '0 0 512 512',
                    innerHTML: '<path d="M512 256c0-16.54-14.27-46.76-45.61-74a207.06 207.06 0 0 0-60.28-36.12a3.15 3.15 0 0 0-3.93 1.56c-.15.29-.3.57-.47.86l-9.59 15.9a183.24 183.24 0 0 0 .07 183.78l.23.39l8.74 16a4 4 0 0 0 4.94 1.82C479.63 337.42 512 281.49 512 256zm-93.92-.14a16 16 0 1 1 13.79-13.79a16 16 0 0 1-13.79 13.79z" fill="currentColor"></path><path d="M335.45 256a214.8 214.8 0 0 1 29.08-108l.12-.21l4.62-7.67a4 4 0 0 0-2.59-6a284.29 284.29 0 0 0-39.26-5.39a7.94 7.94 0 0 1-4.29-1.6c-19.28-14.66-57.5-40.3-96.46-46.89a16 16 0 0 0-18 20.18l10.62 37.17a4 4 0 0 1-2.42 4.84c-36.85 13.69-68.59 38.75-91.74 57.85a8 8 0 0 1-10.06.06q-4.72-3.75-9.69-7.39c-39.64-28.95-86.21-32.76-88.17-32.9a16 16 0 0 0-16.83 19.4c.42 1.93 9.19 40.69 31.7 71.61a8.09 8.09 0 0 1 0 9.55C9.57 291.52.8 330.29.38 332.22a16 16 0 0 0 16.83 19.4c2-.14 48.53-4 88.12-32.88q4.85-3.56 9.47-7.22a8 8 0 0 1 10.06.07c23.25 19.19 55.05 44.28 92 58a4 4 0 0 1 2.42 4.83l-10.66 37.18a16 16 0 0 0 18 20.18c17.16-2.9 51.88-12.86 96.05-46.83a8.15 8.15 0 0 1 4.36-1.65a287.36 287.36 0 0 0 39.22-5.3a4 4 0 0 0 2.69-5.83l-4.51-8.29A214.81 214.81 0 0 1 335.45 256z" fill="currentColor"></path>'
                })
            });
        },
        key: 'FishPool',
    }
]

function handleSelect(key: string | number) {
    router.push({ name: `${key}` })
}

</script>

<template>
    <div class="top-navbar">
        <n-flex :align="'center'" justify="space-between" style="height: 60px;">
            <div class="navbar-logo">
                <router-link to="/github_pages">Logo</router-link>
            </div>
            <n-flex :align="'center'" style="padding: 0 20px;">
                <div v-for="(item, index) in navBarList" :key="index">
                    <n-button class="narbar-btn" text @click="router.push({ name: `${item.routerName}` })">
                        {{ item.name }}
                    </n-button>
                </div>
                <div>
                    <n-dropdown trigger="hover" :options="dropDownOptions" @select="handleSelect">
                        <n-button class="narbar-btn" text>测试</n-button>
                    </n-dropdown>
                </div>
            </n-flex>
        </n-flex>
    </div>
</template>

<style scoped>
.top-navbar {
    width: 100vw;
    background-color: #333;
}

.narbar-btn {
    font-size: 14px;
    margin: 0 10px;
    color: white;
}

.navbar-logo a {
    color: white;
    text-decoration: none;
    font-size: 24px;
    line-height: 1;
    padding: 0 20px;
}
</style>
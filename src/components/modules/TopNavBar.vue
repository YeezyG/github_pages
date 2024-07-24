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
        label: '测试2',
        key: 'test2',
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
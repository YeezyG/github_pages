<script setup lang="ts">
import { ref } from 'vue'
import {
    NButton,
    NFlex,
} from 'naive-ui';
import router from '../../router/router';

const navBarList = ref<{ 'name': string, 'routerName': string }[]>([
    {
        'name': '博客',
        'routerName': 'Blog'
    },
    {
        'name': '测试',
        'routerName': 'Test'
    },
])

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
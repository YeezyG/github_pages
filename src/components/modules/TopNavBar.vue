<script setup lang="ts">
import { ref } from 'vue'
import {
    NButton,
    NFlex,
} from 'naive-ui';
import router from '../../router/router';

const navBarList = ref<{ 'name': string, 'routerName': string }[]>([
    {
        'name': '主页',
        'routerName': 'Home'
    },
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
        <n-flex :align="'center'" justify="center" style="height: 60px;">
            <div v-for="(item, index) in navBarList" :key="index">
                <n-button class="narbar-btn" text @click="router.push({ name: `${item.routerName}` })">
                    {{ item.name }}
                </n-button>
            </div>
        </n-flex>
    </div>
</template>

<style scoped>
.top-navbar {
    width: 100vw;
    background-color: #C3C3C3;
}

.narbar-btn {
    font-size: 16px;
    margin: 0 10px;
}
</style>
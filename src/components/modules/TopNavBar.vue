<script setup lang="ts">
import { ref } from 'vue'
import {
    NButton,
    NFlex,
} from 'naive-ui';
import router from '../../router/router';

</script>
<template>
    <div class="top-navbar">
        <n-flex :align="'center'" justify="center" style="height: 60px;">
            <n-button class="narbar-btn" text @click="router.push({ name: 'Index' })">首页</n-button>
            <n-button class="narbar-btn" text @click="router.push({ name: 'Home' })">主页</n-button>
            <n-button class="narbar-btn" text @click="router.push({ name: 'Test' })">测试</n-button>
        </n-flex>
    </div>
</template>

<style scoped>
.top-navbar {
    width: 100vw;
    background-color: #C3C3C3;
}

.narbar-btn {
    margin: 0 10px;
}
</style>
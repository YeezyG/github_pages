<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router/router';
const navbarList = ref<string[]>([])

</script>
<template>
    <div class="top-navbar">
        <div style="display: flex; justify-content: center; align-items: center; height: 60px;">
            <button class="narbar-btn" @click="router.push({ name: 'Home' })">首页</button>
            <button class="narbar-btn" @click="router.push({ name: 'Test' })">测试</button>
        </div>
    </div>
</template>

<style scoped>
.top-navbar {
    width: 100vw;
    background-color: #C3C3C3;
    position: fixed;
    top: 0;
    left: 0;
}

.narbar-btn {
    margin: 0 10px;
}
</style>
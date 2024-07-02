<script setup lang="ts">
import { ref } from 'vue'
import TopNavBar from './modules/TopNavBar.vue';
const readyRender = ref<boolean>(false)

inital()

function inital(){
    readyRender.value = true
}
</script>

<template>
    <div v-if="readyRender">
        <TopNavBar></TopNavBar>
        <div style="margin-top: 200px">测试</div>
        <router-view></router-view>
    </div>
</template>

<style scoped></style>
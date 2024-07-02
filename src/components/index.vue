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
        <router-view></router-view>
    </div>
</template>

<style scoped></style>
<script setup lang="ts">
import { ref } from 'vue'
import {
    NLayout, NLayoutHeader, NLayoutContent,
} from 'naive-ui'
import TopNavBar from './modules/TopNavBar.vue';
const readyRender = ref<boolean>(false)

inital()

function inital() {
    readyRender.value = true
}
</script>

<template>
    <n-layout v-if="readyRender">
        <n-layout-header>
            <TopNavBar />
        </n-layout-header>
        <n-layout-content embedded :native-scrollbar="false">
            <router-view />
        </n-layout-content>
    </n-layout>
</template>

<style scoped></style>
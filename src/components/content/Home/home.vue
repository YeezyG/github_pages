<script setup lang="ts">
import { ref } from 'vue'
import {
    NFlex,
    NGradientText,
} from 'naive-ui'
const readyRender = ref<boolean>(false)

inital()

function inital() {
    readyRender.value = true
}


</script>

<template>
    <div v-if="readyRender" class="home">
        <n-flex :align="'center'" justify="center" style="height: 100%;">
            <n-gradient-text :size="40" :gradient="{ deg: 180, from: 'rgb(85, 85, 85)', to: 'rgb(170, 170, 170)', }">
                Welcome to Personal Website!
            </n-gradient-text>
        </n-flex>
    </div>
</template>

<style scoped>
.home {
    height: calc(100vh - 120px);
    padding: 30px;
}
</style>
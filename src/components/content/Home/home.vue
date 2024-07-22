<script setup lang="ts">
import { ref } from 'vue'
import {
} from 'naive-ui'
const readyRender = ref<boolean>(false)

inital()

function inital() {
    readyRender.value = true
}
</script>

<template>
    <div v-if="readyRender" class="home">
        测试
    </div>
</template>

<style scoped>
.home {
    height: calc(100vh - 108px);
}
</style>
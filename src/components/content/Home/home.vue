<script setup lang="ts">
import { ref } from 'vue'
const readyRender = ref<boolean>(false)

inital()

function inital() {
    readyRender.value = true
}
</script>
<template>
    <div v-if="readyRender" class="home">
        <div>Home</div>
    </div>
</template>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
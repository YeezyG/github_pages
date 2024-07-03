<script setup lang="ts">
import { ref } from 'vue'
const readyRender = ref<boolean>(false)

inital()

function inital() {
    readyRender.value = true
}
</script>
<template>
    <div v-if="readyRender" class="test">
        <div>Test</div>
    </div>
</template>

<style scoped>
.test {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
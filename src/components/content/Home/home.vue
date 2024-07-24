<script setup lang="ts">
import { ref } from 'vue'
import {
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
        <div class="overlay">
            <n-gradient-text :size="54" :gradient="{ deg: 180, from: 'rgb(255, 255, 255)', to: 'rgb(255, 255, 255)', }">
                <strong>Welcome to Personal Test Page!</strong>
            </n-gradient-text>
        </div>
        <!-- <div class="outer-border">
            <div class="inner-border">
                <n-gradient-text :size="54"
                    :gradient="{ deg: 180, from: 'rgb(255, 255, 255)', to: 'rgb(255, 255, 255)', }">
                    <strong>Welcome to Personal Test Page!</strong>
                </n-gradient-text>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
@keyframes typing {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

@keyframes blink-caret {

    from,
    to {
        border-color: transparent;
    }

    50% {
        border-color: white;
    }
}

.home {
    height: calc(100vh - 60px);
    background-image: url('https://cdn.pixabay.com/photo/2024/03/13/17/57/sea-8631493_1280.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.overlay {
    text-align: center;
    color: white;
    font-size: 24px;
    font-weight: 900;
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 1);
    overflow: hidden;
    white-space: nowrap;
    /* border-right: .15em solid white;  */
    animation: typing 3s steps(60, end), blink-caret .75s step-end infinite;
}

.overlay n-gradient-text {
    font-size: 2rem;
}
</style>
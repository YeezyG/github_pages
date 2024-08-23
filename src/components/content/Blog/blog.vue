<script setup lang="ts">
import { ref } from 'vue'
import {
    NAffix,
    NBackTop,
    NCard,
    NCarousel,
    NFlex,
    NGrid, NGi,
    NH1,
    NImage,
} from 'naive-ui'

const readyRender = ref<boolean>(false)

const containerRef = ref<HTMLElement | undefined>(undefined)

inital()

function inital() {
    readyRender.value = true
}
</script>

<template>
    <div v-if="readyRender" ref="containerRef" class="blog">
        <n-carousel autoplay draggable>
            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg">
        </n-carousel>
        <n-grid cols="4" x-gap="30" style="padding: 30px; width: auto;">
            <n-gi span="3">
                <n-flex vertical :align="'center'" size="large">
                    <n-card class="left-card" v-for="i in 6">
                        <n-flex justify="space-between">
                            <div>
                                <n-h1>{{ i }}</n-h1>
                                <div>卡片内容</div>
                            </div>
                            <n-image height="200" preview-disabled
                                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"></n-image>
                        </n-flex>
                    </n-card>
                </n-flex>
            </n-gi>
            <n-gi span="1">
                <n-flex vertical :align="'center'" size="large" class="right-area">
                    <n-card class="right-card" title="测试">
                        卡片内容卡片内容卡片内容卡片内容卡片内容卡片内容卡片内容卡片内容卡片内容卡片内容卡片内容卡片内容卡片内容
                    </n-card>
                    <n-card class="right-card" title="测试">
                        卡片内容
                    </n-card>
                </n-flex>
            </n-gi>
        </n-grid>
        <n-back-top :right="50" />
    </div>
</template>

<style scoped>
.blog {
    height: calc(100vh - 60px);
    /* background: url('https://cdn.pixabay.com/photo/2024/03/13/17/57/sea-8631493_1280.jpg') no-repeat center center fixed;
    background-size: cover; */
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.n-carousel {
    height: 420px;
}

.carousel-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.img {
    height: 200px;
}

.left-card {
    max-width: 100%;
    max-height: 240px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
}

.left-card:hover {
    transform: scale(1.027);
    /* box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2); */
}

.right-area{
    position: sticky;
    top: 30px;
}

.right-card {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
}
</style>
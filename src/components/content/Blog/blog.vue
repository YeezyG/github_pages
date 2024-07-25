<script setup lang="ts">
import { ref } from 'vue'
import {
    NBackTop,
    NCard,
    NFlex,
    NGrid, NGi,
    NH1,
    NImage,
} from 'naive-ui'
const readyRender = ref<boolean>(false)

inital()

function inital() {
    readyRender.value = true
}
</script>

<template>
    <div v-if="readyRender" class="blog">
        <n-grid cols="4" x-gap="24">
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
                <n-flex vertical :align="'center'" size="large">
                    <n-card class="right-card" title="测试">
                        卡片内容
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
    height: calc(100vh - 120px);
    padding: 30px;
    background: url('https://cdn.pixabay.com/photo/2024/03/13/17/57/sea-8631493_1280.jpg') no-repeat center center fixed;
    background-size: cover;
    overflow-y: auto;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;

    /* Firefox */
    &::-webkit-scrollbar {
        /* WebKit browsers */
        display: none;
    }
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
    transform: scale(1.03);
    /* box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2); */
}

.right-card {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
}
</style>
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
                    <n-card title="测试">
                        <template #cover>
                            <n-image preview-disabled
                                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"></n-image>
                        </template>
                        卡片内容
                    </n-card>
                    <n-card title="测试">
                        <template #cover>
                            <n-image preview-disabled
                                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"></n-image>
                        </template>
                        卡片内容
                    </n-card>
                </n-flex>
            </n-gi>
        </n-grid>
    </div>
    <n-back-top :right="50" />
</template>

<style scoped>
.blog {
    height: calc(100vh - 108px);
}

.img {
    height: 200px;
}

.left-card {
    max-width: 100%;
    max-height: 240px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
}

.left-card:hover {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
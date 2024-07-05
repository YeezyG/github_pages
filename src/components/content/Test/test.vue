<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import {
    NFlex,
    NH1,
    NSlider,
} from 'naive-ui'

const readyRender = ref<boolean>(false);

// 定义单元格类型
enum CellType {
    Empty,
    Wall,
    Fire,
    Person,
    House
}

// 定义常量
const rows = 5;
const cols = 7;
const cellSize = 50;
const dirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const minutes = ref<number>(0);

const marks = {
    0: '0 min',
    10: '10 min'
}

const grid = reactive<CellType[][]>(Array.from({ length: rows }, () => Array(cols).fill(CellType.Empty)));

// 初始化网格
grid[0][0] = CellType.Person;
grid[0][6] = CellType.House;
grid[1][1] = grid[1][3] = grid[1][5] = CellType.Wall;
grid[3][0] = grid[3][4] = grid[3][5] = CellType.Wall;
grid[3][2] = grid[2][5] = CellType.Fire;

const initialGrid = JSON.parse(JSON.stringify(grid));

const getCellClass = (cell: CellType) => {
    switch (cell) {
        case CellType.Wall:
            return 'wall';
        case CellType.Fire:
            return 'fire';
        case CellType.Person:
            return 'person';
        case CellType.House:
            return 'house';
        default:
            return '';
    }
};

const updateFireSpread = () => {
    const newGrid = JSON.parse(JSON.stringify(initialGrid));
    const fireQueue: [number, number][] = [];
    const visited = new Set<string>();

    // 寻找初始火源
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (newGrid[i][j] === CellType.Fire) {
                fireQueue.push([i, j]);
                visited.add(`${i},${j}`);
            }
        }
    }

    // 火蔓延
    let time = 0;
    while (fireQueue.length > 0 && time < minutes.value) {
        const levelSize = fireQueue.length;
        for (let i = 0; i < levelSize; i++) {
            const [x, y] = fireQueue.shift()!;
            for (const [dx, dy] of dirs) {
                const nx = x + dx;
                const ny = y + dy;
                if (
                    nx >= 0 && nx < rows &&
                    ny >= 0 && ny < cols &&
                    newGrid[nx][ny] === CellType.Empty &&
                    !visited.has(`${nx},${ny}`)
                ) {
                    newGrid[nx][ny] = CellType.Fire;
                    fireQueue.push([nx, ny]);
                    visited.add(`${nx},${ny}`);
                }
            }
        }
        time++;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = newGrid[i][j];
        }
    }
};

watch(minutes, updateFireSpread);

inital()

function inital() {
    readyRender.value = true
}


</script>
<template>
    <div v-if="readyRender" class="test">
        <n-flex vertical :align="'center'" justify="center" size="large">
            <n-h1>逃离火灾</n-h1>
            <div>
                <div class="grid-container">
                    <div class="grid-row" v-for="(row, rowIndex) in grid" :key="`row-${rowIndex}`">
                        <div v-for="(cell, colIndex) in row" :key="`cell-${rowIndex}-${colIndex}`"
                            :class="getCellClass(cell)" :style="{ width: `${cellSize}px`, height: `${cellSize}px` }">
                        </div>
                    </div>
                </div>
                <n-slider v-model:value="minutes" :step="1" :max="10" :marks="marks" />
            </div>
        </n-flex>
    </div>
</template>

<style scoped>
.grid-container {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    border-collapse: collapse;
}

.grid-row {
    display: flex;
}

.grid-container>.grid-row>div {
    border: 1px solid black;
}

.wall {
    background-color: gray;
}

.fire {
    background-color: red;
}

.person {
    background-color: blue;
}

.house {
    background-color: green;
}

.controls {
    margin-top: 10px;
}
</style>
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
    Fire,
    Wall,
    Person,
    House
}

// 定义常量
const rows = 5;
const cols = 7;
const cellSize = 50;
const dirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const minutes = ref<number>(0);

const marks = ref<Record<number, string>>({
    0: '0 min',
    10: '10 min'
})

const formatTooltip = (value: number) => `${value} min`

const grid = reactive<CellType[][]>(Array.from({ length: rows }, () => Array(cols).fill(CellType.Empty)));

// 初始化网格
grid[0][0] = CellType.Person;
grid[rows - 1][cols - 1] = CellType.House;
grid[2][4] = grid[1][5] = CellType.Fire;

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

// 点击格子事件处理函数
const handleCellClick = (row: number, col: number) => {
    if (minutes.value === 0) {
        if (grid[row][col] === CellType.Empty) {
            grid[row][col] = CellType.Wall;
            initialGrid[row][col] = CellType.Wall;
        } else if (grid[row][col] === CellType.Wall) {
            grid[row][col] = CellType.Empty;
            initialGrid[row][col] = CellType.Empty;
        }
        marks.value = {
            0: '0 min',
            10: '10 min'
        };
        const maxMinutes = maximumMinutes(grid);
        console.log(maxMinutes)
        if (maxMinutes !== -1) {
            marks.value[maxMinutes] = 'Max';
        }
    }
};

// maximumMinutes 函数
function maximumMinutes(grid: CellType[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const fire = new Array(m).fill(null).map(() => new Array(n).fill(false));
    const vis = new Array(m).fill(null).map(() => new Array(n).fill(false));
    const dirs: number[] = [-1, 0, 1, 0, -1];
    let [l, r] = [-1, m * n];

    const spread = (q: [number, number][]): [number, number][] => {
        const nq: [number, number][] = [];
        while (q.length) {
            const [i, j] = q.shift()!;
            for (let k = 0; k < 4; k++) {
                const [x, y] = [i + dirs[k], j + dirs[k + 1]];
                if (x >= 0 && x < m && y >= 0 && y < n && !fire[x][y] && (grid[x][y] === CellType.Empty || grid[x][y] === CellType.Person || grid[x][y] === CellType.House)) {
                    fire[x][y] = true;
                    nq.push([x, y]);
                }
            }
        }
        return nq;
    };

    const check = (t: number): boolean => {
        for (let i = 0; i < m; i++) {
            fire[i].fill(false);
            vis[i].fill(false);
        }
        let q1: [number, number][] = [];
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === CellType.Fire) {
                    q1.push([i, j]);
                    fire[i][j] = true;
                }
            }
        }
        for (; t && q1.length; t--) {
            q1 = spread(q1);
        }
        if (fire[0][0]) {
            return false;
        }
        const q2: [number, number][] = [[0, 0]];
        vis[0][0] = true;
        for (; q2.length; q1 = spread(q1)) {
            for (let d = q2.length; d; d--) {
                const [i, j] = q2.shift()!;
                if (fire[i][j]) {
                    continue;
                }
                for (let k = 0; k < 4; k++) {
                    const [x, y] = [i + dirs[k], j + dirs[k + 1]];
                    if (x >= 0 && x < m && y >= 0 && y < n && !vis[x][y] && !fire[x][y] && (grid[x][y] === CellType.Empty || grid[x][y] === CellType.House)) {
                        if (x === m - 1 && y === n - 1) {
                            return true;
                        }
                        vis[x][y] = true;
                        q2.push([x, y]);
                    }
                }
            }
        }
        return false;
    };

    while (l < r) {
        const mid = (l + r + 1) >> 1;
        if (check(mid)) {
            l = mid;
        } else {
            r = mid - 1;
        }
    }

    return l === m * n ? 1e9 : l;
}


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
                            :class="getCellClass(cell)" :style="{ width: `${cellSize}px`, height: `${cellSize}px` }"
                            @click="handleCellClick(rowIndex, colIndex)">
                        </div>
                    </div>
                </div>
                <n-slider v-model:value="minutes" :step="1" :max="10" :marks="marks" :format-tooltip="formatTooltip"/>
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
    transition: background-color 0.3s ease;
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
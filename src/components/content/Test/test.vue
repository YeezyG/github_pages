<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import {
    NFlex,
    NH1,
    NSlider,
} from 'naive-ui'

enum CellType {
    Empty,
    Fire,
    Wall,
    Person,
    House
}

const rows = 7;

const cols = 7;

const cellSize = 50;

const dirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const minutes = ref<number>(0);

const pathLength = ref<number>(0);

const maxStayMinutes = ref<number>(0);

const maxSliderValue = ref<number>(30);

const showSlider = ref<boolean>(false);

const path = reactive<[number, number][]>([]);

const marks = ref<Record<number, string>>({
    0: '0 min',
})

const formatTooltip = (value: number) => `${value} min`

const grid = reactive<CellType[][]>(Array.from({ length: rows }, () => Array(cols).fill(CellType.Empty)));

grid[2][3] = CellType.Fire;

grid[0][0] = CellType.Person;

grid[rows - 1][cols - 1] = CellType.House;

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


// // 计算火的数量
// const calculateFireCount = (rows: number, cols: number): number => {
//     const maxLength = Math.max(rows, cols);
//     return Math.floor(maxLength / 6) + 1;
// };

// // 随机生成火的位置
// const generateRandomFirePositions = (count: number, rows: number, cols: number): [number, number][] => {
//     const positions: [number, number][] = [];
//     const occupied = new Set<string>();
//     occupied.add('0,0'); // 左上角
//     occupied.add(`${rows - 1},${cols - 1}`); // 右下角
//     while (positions.length < count) {
//         const row = Math.floor(Math.random() * rows);
//         const col = Math.floor(Math.random() * cols);
//         const key = `${row},${col}`;
//         if (!occupied.has(key) && grid[row][col] === CellType.Empty) {
//             positions.push([row, col]);
//             occupied.add(key);
//         }
//     }
//     return positions;
// };

// // 设置火的位置
// const setFirePositions = (positions: [number, number][]) => {
//     positions.forEach(([row, col]) => {
//         grid[row][col] = CellType.Fire;
//     });
// };

// // 初始化火的位置
// const fireCount = calculateFireCount(rows, cols);

// const firePositions = generateRandomFirePositions(fireCount, rows, cols);

// setFirePositions(firePositions);

const initialGrid = JSON.parse(JSON.stringify(grid));

const updateFireSpread = (value: number) => {
    minutes.value = value;
    const newGrid = JSON.parse(JSON.stringify(initialGrid));
    if (minutes.value > maxStayMinutes.value) {
        newGrid[0][0] = CellType.Empty
    }
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
        const fireQueueLength = fireQueue.length;
        for (let i = 0; i < fireQueueLength; i++) {
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

    // 记录人物路径
    // path.length = 0
    let queue: [number, number][] = [[0, 0]];
    const parentMap = new Map<string, [number, number]>();

    while (queue.length > 0) {
        const [x, y] = queue.shift()!;
        if (x === rows - 1 && y === cols - 1) {
            let current: [number, number] | null = [x, y];
            while (current) {
                path.unshift(current);
                const parent = parentMap.get(`${current[0]},${current[1]}`);
                current = parent ? parent : null;
            }
            break;
        }
        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            if (
                nx >= 0 && nx < rows &&
                ny >= 0 && ny < cols &&
                !parentMap.has(`${nx},${ny}`) &&
                (newGrid[nx][ny] === CellType.Empty || newGrid[nx][ny] === CellType.House)
            ) {
                parentMap.set(`${nx},${ny}`, [x, y]);
                queue.push([nx, ny]);
            }
        }
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = newGrid[i][j];
        }
    }

    if (pathLength.value === 0) {
        pathLength.value = path.length;
        maxSliderValue.value = maxStayMinutes.value + pathLength.value - 1;
    }

    marks.value[maxSliderValue.value] = 'Arrive';

    if (minutes.value > maxStayMinutes.value) {
        movePerson();
    }
};

// watch(minutes, updateFireSpread);

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
        };
        const maxMinutes = getMaxMintues(grid);
        if (maxMinutes !== -1) {
            marks.value[maxMinutes] = 'Max';
            maxStayMinutes.value = maxMinutes;
            showSlider.value = true;
        }
    }
};

// 移动人物
const movePerson = () => {
    const targetIndex = Math.min(minutes.value - maxStayMinutes.value, path.length - 1);
    let [prevX, prevY] = [-1, -1];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === CellType.Person) {
                prevX = i;
                prevY = j;
                break;
            }
        }
        if (prevX !== -1 && prevY !== -1) {
            break;
        }
    }
    const [px, py] = path[targetIndex];
    grid[px][py] = CellType.Person;
    if (prevX !== -1 && prevY !== -1) {
        grid[prevX][prevY] = CellType.Empty;
    }
};

// 得到最大停留时间
function getMaxMintues(grid: CellType[][]): number {
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
                if (x >= 0 && x < m && y >= 0 && y < n && !fire[x][y] && grid[x][y] !== CellType.Wall) {
                    fire[x][y] = true;
                    nq.push([x, y]);
                }
            }
        }
        return nq;
    };

    const check = (t: number): boolean => {
        fire.forEach(row => row.fill(false));
        vis.forEach(row => row.fill(false));
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
</script>

<template>
    <div class="test">
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
                <n-slider v-if="showSlider" @update:value="updateFireSpread($event)" :step="1" :max="maxSliderValue"
                    :marks="marks" :format-tooltip="formatTooltip" />
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

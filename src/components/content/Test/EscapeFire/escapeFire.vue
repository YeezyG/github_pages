<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import {
    NButton,
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

const rows = 8;

const cols = 8;

const cellSize = 50;

const dirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const maxStayMinutes = ref<number>(0)

const maxSlider = ref<number>(10)

const minutes = ref<number>(0);

const path = ref<[number, number][]>([]);

const showSlider = ref<boolean>(false)

const marks = ref<Record<number, string>>({
    0: '0 min'
})

const formatTooltip = (value: number) => `${value} min`

const grid = reactive<CellType[][]>(Array.from({ length: rows }, () => Array(cols).fill(CellType.Empty)));

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

const calculateFireCount = (rows: number, cols: number): number => {
    const maxLength = Math.max(rows, cols);
    return Math.floor(maxLength / 6) + 1;
};

const generateFirePositions = (count: number, rows: number, cols: number): [number, number][] => {
    const positions: [number, number][] = [];
    const occupied = new Set<string>();
    occupied.add('0,0');
    occupied.add(`${rows - 1},${cols - 1}`);

    while (positions.length < count) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        const key = `${row},${col}`;
        if (!occupied.has(key) && grid[row][col] === CellType.Empty) {
            positions.push([row, col]);
            occupied.add(key);
        }
    }

    return positions;
};

const setFirePositions = (positions: [number, number][]) => {
    positions.forEach(([row, col]) => {
        grid[row][col] = CellType.Fire;
    });
};

const fireCount = calculateFireCount(rows, cols);

const firePositions = generateFirePositions(fireCount, rows, cols);

setFirePositions(firePositions);

const initialGrid = JSON.parse(JSON.stringify(grid));

const updateFireSpread = () => {
    const newGrid = JSON.parse(JSON.stringify(initialGrid));
    const fireQueue: [number, number][] = [];
    const visited = new Set<string>();
    if (minutes.value > maxStayMinutes.value) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (newGrid[i][j] === CellType.Person) {
                    newGrid[i][j] = CellType.Empty;
                }
            }
        }

        const exceedMinutes = minutes.value - maxStayMinutes.value

        const [x, y] = path.value[exceedMinutes]

        newGrid[x][y] = CellType.Person;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (newGrid[i][j] === CellType.Fire) {
                    fireQueue.push([i, j]);
                    visited.add(`${i},${j}`);
                }
            }
        }
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (newGrid[i][j] === CellType.Fire) {
                fireQueue.push([i, j]);
                visited.add(`${i},${j}`);
            }
        }
    }

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

const shortestPath = (grid: CellType[][], start: [number, number], end: [number, number]): [number, number][] => {
    const queue: [[number, number], [number, number][]][] = [[[start[0], start[1]], []]];
    const visited = new Set<string>();
    visited.add(`${start[0]},${start[1]}`);
    while (queue.length > 0) {
        const [[x, y], path] = queue.shift()!;
        if (x === end[0] && y === end[1]) {
            return path.concat([[x, y]]);
        }
        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            if (
                nx >= 0 && nx < rows &&
                ny >= 0 && ny < cols &&
                !visited.has(`${nx},${ny}`) &&
                (grid[nx][ny] === CellType.Empty || grid[nx][ny] === CellType.House)
            ) {
                visited.add(`${nx},${ny}`);
                queue.push([[nx, ny], path.concat([[x, y]])]);
            }
        }
    }
    return [];
};

watch(minutes, updateFireSpread);

const handleCellClick = (row: number, col: number) => {
    if (minutes.value === 0) {
        if (grid[row][col] === CellType.Empty) {
            grid[row][col] = CellType.Wall;
            initialGrid[row][col] = CellType.Wall;
        } else if (grid[row][col] === CellType.Wall) {
            grid[row][col] = CellType.Empty;
            initialGrid[row][col] = CellType.Empty;
        }
        path.value = shortestPath(grid, [0, 0], [rows - 1, cols - 1]);
        marks.value = {
            0: '0 min'
        };
        maxStayMinutes.value = getMaxStayMinutes(grid);
        if (maxStayMinutes.value > 0 && maxStayMinutes.value !== 1e9) {
            marks.value[maxStayMinutes.value] = 'Max';
            maxSlider.value = maxStayMinutes.value + shortestPath(grid, [0, 0], [rows - 1, cols - 1]).length - 1;
            marks.value[maxSlider.value] = 'Arrive';
            showSlider.value = true
        } else if (maxStayMinutes.value === 0) {
            maxSlider.value = maxStayMinutes.value + shortestPath(grid, [0, 0], [rows - 1, cols - 1]).length - 1;
            marks.value[maxSlider.value] = 'Arrive';
            showSlider.value = true
        } else if (maxStayMinutes.value === 1e9) {
            maxStayMinutes.value = 0
            maxSlider.value = maxStayMinutes.value + shortestPath(grid, [0, 0], [rows - 1, cols - 1]).length - 1;
            marks.value[maxSlider.value] = 'Arrive';
            showSlider.value = true
        } else {
            showSlider.value = false
        }
    }
};

function getMaxStayMinutes(grid: CellType[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const fire = new Array(m).fill(null).map(() => new Array(n).fill(false));
    const vis = new Array(m).fill(null).map(() => new Array(n).fill(false));
    let [l, r] = [-1, m * n];
    const spread = (q: [number, number][]): [number, number][] => {
        const nq: [number, number][] = [];
        while (q.length) {
            const [i, j] = q.shift()!;
            for (const [dx, dy] of dirs) {
                const x = i + dx;
                const y = j + dy;
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
                for (const [dx, dy] of dirs) {
                    const x = i + dx;
                    const y = j + dy;
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

const refreshPage = () => {
    window.location.reload();
};

</script>
<template>
    <div class="escapeFire">
        <n-flex vertical :align="'center'" justify="center" size="large">
            <n-flex vertical :align="'center'" justify="center" size="large">
                <n-h1 style="margin: 0; color: white;">逃离火灾</n-h1>
                <n-button type="primary" round @click="refreshPage">刷新</n-button>
            </n-flex>
            <div>
                <div class="grid-container">
                    <div class="grid-row" v-for="(row, rowIndex) in grid" :key="`row-${rowIndex}`">
                        <div v-for="(cell, colIndex) in row" :key="`cell-${rowIndex}-${colIndex}`"
                            :class="getCellClass(cell)"
                            :style="{ width: `${cellSize}px`, height: `${cellSize}px`, cursor: minutes === 0 ? 'pointer' : 'default' }"
                            @click="handleCellClick(rowIndex, colIndex)">
                        </div>
                    </div>
                </div>
                <n-slider v-if="showSlider" v-model:value="minutes" :step="1" :max="maxSlider" :marks="marks"
                    :format-tooltip="formatTooltip" />
            </div>
        </n-flex>
    </div>
</template>

<style scoped>
.escapeFire {
    height: calc(100vh - 120px);
    padding: 30px;
}

.grid-container {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    border-collapse: collapse;
    background-color: rgba(255, 255, 255, 0.8);
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
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const fishNum = ref<number>(10) // 生成鱼的数量

const fishList = ref<any[]>([]) // 小鱼数组

const bubbleList = ref<any[]>([]) // 气泡数组

const foodList = ref<any[]>([]) // 食物数组

const poolRef = ref<HTMLElement | null>(null);

const width = ref<number>(0)

const height = ref<number>(0)

onMounted(() => {
    init();
})

function init() {
    // 初始化事件
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    for (let i = 0; i < fishNum.value; i++) {
        ;
        let fish = addFish(i);
        fishList.value.push(fish)
    }
    move();
    foodMove();
    throwFood();
    window.onresize = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    }
}
function addFish(i: number) {
    return {
        index: `fish_${i}`,
        x: random(0, width.value - 60),
        y: random(15, height.value - 30),
        direction: (random(0, 1) > 0.5) ? 1 : -1,
        type: 'fish-type' + ~~(random(1, 6)),
        speed: random(1, 3),
        bTime: random(1, 3) * 100,
        bMax: random(3, 10) * 100,
        sy: Math.random() * 10,
        level: ~~(random(0, 2))
    }
}
function move() {
    window.requestAnimationFrame(() => {
        fishList.value.forEach(fish => {

            // 到达临界值时吐气泡
            if (++fish.bTime > fish.bMax) {
                fish.bTime = 0;
                addBubble(fish);
            }

            // 找到最近的食物
            if (foodList.value.length > 0) {
                let foodIndex = 0;
                if (foodList.value.length > 1) {
                    for (let i = 0, sub = null; i < foodList.value.length; i++) {
                        let num = Math.abs(foodList.value[i].x - fish.x);
                        if (sub == null) sub = num;
                        if (num < sub) {
                            sub = num;
                            foodIndex = i;
                        }
                    }
                }

                // 根据最近的食物找到改变与的方向
                let food = foodList.value[foodIndex];
                let dx = food.x - fish.x;
                let dy = food.y - fish.y;
                if (dx >= 0) {
                    fish.direction = 1;
                } else {
                    fish.direction = -1;
                }

                // 计算方向改变鱼的移动，如果触碰到食物则升级
                let angle = Math.atan2(dy, dx);
                if (dx < 10 && dx > -10 && dy < 10 && dy > -10) {
                    fish.level++; // 升级长胖
                    foodList.value.splice(foodIndex, 1);
                    fish.direction = Math.random() > 0.5 ? 1 : -1;
                } else {
                    let vx = fish.speed * 1.2 * Math.cos(angle);
                    let vy = fish.speed * 1.2 * Math.sin(angle);
                    fish.x += vx;
                    fish.y += vy;
                }
            } else {
                fish.x += fish.speed * fish.direction;
                fish.sy += 0.01;
                fish.y += Math.cos(fish.sy) * 2;
            }

            // 边界判断
            if (fish.x < -60) {
                fish.x = -60;
                fish.direction *= -1;
                fish.speed = random(1, 3);
            }
            if (fish.x > width.value + 30) {
                fish.x = width.value + 30;
                fish.direction *= -1;
                fish.speed = random(1, 3);
            }
            if (fish.y < 0) {
                fish.y = 0;
            }
            if (fish.y > height.value - 30) {
                fish.y = height.value - 30;
            }
        });

        move();
    });
}

function addBubble(fish: any) {
    const { index, x, y } = fish;
    for (let i = 0; i < bubbleList.value.length; i++) {
        if (bubbleList.value[i].index == index) {
            bubbleList.value.splice(i, 1);
        }
    }
    bubbleList.value.push({ x, y, index });
}
function throwFood() {
    if (poolRef.value) {
        poolRef.value.addEventListener("click", (e: any) => {
            let food = {
                x: e.layerX,
                y: e.layerY
            };
            foodList.value.push(food);
        });
    } else {
        console.error("poolRef.value is null");
    }
}
function foodMove() {
    // 投喂食物不断下沉
    window.requestAnimationFrame(() => {
        foodList.value.forEach((food, index) => {
            food.y++;
            if (food.y > height.value) {
                foodList.value.splice(index, 1);
            }
        })
        foodMove();
    });
}
function random(min: number, max: number) {
    return min + Math.random() * max
}


</script>

<template>
    <div class="main" ref="poolRef">
        <div class="fish" ref="fish" v-for="(item, index) in fishList" :key="index"
            :class="{ 'left': item.direction == -1, [item.type]: true }"
            :style="{ 'transform': 'translate(' + item.x + 'px,' + item.y + 'px)' }">
            <div class="fish-main" :style="{ 'transform': 'scale(' + (1 + item.level * 0.025) + ')' }">
                <div class="fish-body">
                    <div class="fish-fins"></div>
                </div>
            </div>
        </div>
        <div class="bubble" :key="item.index" v-for="item in bubbleList"
            :style="{ 'left': item.x + 'px', 'top': item.y + 'px' }">
            <div class="bubble-body"></div>
        </div>
        <div class="food" v-for="item in foodList" :key="item.index"
            :style="{ 'left': item.x + 'px', 'top': item.y + 'px' }">
            <div class="food-body"></div>
        </div>
    </div>
</template>

<style scoped>
.main {
    width: 100%;
    height: calc(100vh - 60px);
    background: linear-gradient(180deg, #86defc 0%, #71cceb 20%, #73b2f1, #349ef8 83%, #cce293 93%, #e6cd6a 100%);
    overflow: hidden;
    position: relative;
}

.fish {
    width: 60px;
    height: 30px;
    position: absolute;
    z-index: 99;
}

.fish.left .fish-body {
    transform: scaleX(-1);
}

.fish.fish-type1 .fish-body {
    --main-skin: rgb(230, 136, 72);
}

.fish.fish-type2 .fish-body {
    --main-skin: rgb(230, 90, 72);
}

.fish.fish-type3 .fish-body {
    --main-skin: rgb(72, 127, 230);
}

.fish.fish-type4 .fish-body {
    --main-skin: rgb(241, 207, 94);
}

.fish.fish-type5 .fish-body {
    --main-skin: rgb(82, 151, 100);
}

.fish.fish-type6 .fish-body {
    --main-skin: rgb(255, 117, 117);
}

.fish-main {
    transition: .3s all;
}

.fish-body {
    position: relative;
    margin-left: 6px;
    width: 50px;
    height: 30px;
    border-radius: 50% 50%;
    border-bottom: 1px solid rgba(0, 0, 0, .12);
    border-top: 1px solid rgba(0, 0, 0, .06);
    background-color: var(--main-skin);
    transition: 1s all;
    transform-origin: 50% 50%;
}

.fish-body::before {
    content: '';
    display: block;
    position: absolute;
    left: -11px;
    width: 0;
    height: 0;
    border-left: solid 25px var(--main-skin);
    border-top: solid 15px transparent;
    border-bottom: solid 15px transparent;
    animation: move2 .24s linear infinite;
}

.fish-body::after {
    content: '';
    display: block;
    position: absolute;
    top: 8px;
    left: 34px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: black;
    box-shadow: 0px 0px 0 2px white;
}

.fish-fins {
    width: 0;
    height: 0;
    border-left: solid 6px var(--main-skin);
    border-top: solid 3px transparent;
    border-bottom: solid 3px transparent;
    position: absolute;
    top: 17px;
    left: 20px;
    filter: brightness(5.5);
    opacity: .1;
    animation: move .24s linear infinite;
    transform-origin: 100% 100%;
}

@keyframes move {
    0% {
        opacity: .1;
        transform: scaleX(1);
    }

    50% {
        opacity: .15;
        transform: scaleX(1.3);
    }

    100% {
        opacity: .1;
        transform: scaleX(1);
    }
}

@keyframes move2 {
    0% {
        opacity: .9;
        transform: scaleX(1);
    }

    50% {
        opacity: 1;
        transform: scaleX(1.3);
    }

    100% {
        opacity: .9;
        transform: scaleX(1);
    }
}



.bubble {
    width: 5px;
    height: 5px;
    position: absolute;
    animation: up 5s linear;
    animation-fill-mode: forwards;
}

.bubble-body {
    width: 5px;
    height: 5px;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 50%;
    position: absolute;
    left: 60px;
    top: 10px;
    opacity: 1;
    animation: sway 3s linear infinite;
}

.food {
    width: 10px;
    height: 7px;
    position: absolute;
    opacity: 1;
}

.food-body {
    position: absolute;
    width: 10px;
    height: 7px;
    border-radius: 45% 42%;
    background: rgb(82, 57, 43);
    animation: sway 3s linear infinite;
}

@keyframes up {
    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(-600px);
    }
}

@keyframes sway {

    0%,
    20%,
    40%,
    60%,
    80%,
    100% {
        transform: translateX(0px) rotate(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translateX(-10px) rotate(30deg);
    }
}
</style>
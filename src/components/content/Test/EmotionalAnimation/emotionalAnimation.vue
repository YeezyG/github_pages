<script setup lang="ts">
import { ref, onMounted } from 'vue';

const target = ref<HTMLDivElement | null>(null);
const emotion = ref<NodeListOf<HTMLLIElement> | null>(null);
const menu = ref<HTMLUListElement | null>(null);
let walkThrough: any | null = null;
let n = 0;

function initEmotions() {
    target.value = document.querySelector("#head");
    emotion.value = document.querySelectorAll("#nav li");
    menu.value = document.querySelector("#nav");

    emotion.value!.forEach((em, i) => {
        em.addEventListener("click", () => {
            clearInterval(walkThrough);

            // 清除所有选中的类
            emotion.value!.forEach(e => e.classList.remove("selected"));

            // 为当前表情添加 'selected' 类
            em.classList.add("selected");

            // 清除目标元素的所有表情类
            const allClasses = ['astonished', 'happy', 'anguished', 'feared', 'angry', 'tired', 'ondrugs'];
            allClasses.forEach(className => target.value!.classList.remove(className));

            // 为目标元素添加相应的表情类
            const classNames = em.className.split(' ').filter(name => name);
            classNames.forEach(name => target.value!.classList.add(name));
        });
    });

    // 初始化时遍历表情
    walkThrough = setInterval(() => {
        const currentEmotion = emotion.value![n % emotion.value!.length];
        target.value!.className = currentEmotion.className;
        n++;
        if (n >= emotion.value!.length) {
            target.value!.className = emotion.value![0].className;
            setTimeout(() => {
                menu.value!.style.transform = "translateX(0)";
            }, 1000);
            clearInterval(walkThrough);
        }
    }, 1250);
}

onMounted(() => {
    initEmotions();
});
</script>

<template>
    <div id="app" class="body">
        <ul class="happy" id="head">
            <li class="slice">
                <div class="hair"></div>
                <div class="folds" id="fold-1"></div>
                <div class="folds" id="fold-2"></div>
            </li>
            <li class="slice">
                <div class="ears" id="ear-l"></div>
                <div class="ears" id="ear-r"></div>
                <div class="eyes" id="eye-l">
                    <div class="eyelid"></div>
                </div>
                <div class="eyes" id="eye-r">
                    <div class="eyelid"></div>
                </div>
            </li>
            <li class="slice">
                <div class="nose">
                    <div class="hole"></div>
                    <div class="hole"></div>
                </div>
            </li>
            <li class="slice">
                <div class="mouth">
                    <div class="teeth top">
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                    </div>
                    <div class="teeth bottom">
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="corpus">
            <div class="belly"></div>
            <div class="chain"></div>
        </div>
        <ul id="nav">
            <li class="happy selected">😃</li>
            <li class="astonished">😲</li>
            <li class="feared">😱</li>
            <li class="anguished">😧</li>
            <li class="angry">😡</li>
            <li class="tired">😪</li>
            <li class="ondrugs">🎁</li>
        </ul>
    </div>
</template>

<style scoped>
* {
    list-style: none;
    margin: 0;
    padding: 0;
}

.reference {
    position: absolute;
    right: 24px;
    bottom: 24px;
    padding: 2vh;
    color: #fff;
    font-family: arial;
    text-decoration: none;
    background: #323264;
    box-shadow: 0 0 2vh rgba(0, 0, 0, 0.25);
    border-radius: 2vh;
}

.body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    height: calc(100vh - 60px);
}

ul#nav {
    position: absolute;
    transform: translateX(-100%);
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 3vh;
    background: #323264;
    box-shadow: inset 0 0 0.5vh rgba(0, 0, 0, 0.25);
    transition: 0.8s ease;
}

ul#nav li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6vh;
    max-width: 6vh;
    height: 6vh;
    max-height: 6vh;
    box-shadow: 0 0 0.5vh rgba(0, 0, 0, 0.25);
    border-radius: 1vh;
    transition: 0.2s ease;
    background: #efefef;
    font-size: 3vh;
}

ul#nav li.selected {
    transform: scale(1.2);
    background: #fff;
}

ul#nav li:hover {
    cursor: pointer;
    transform: scale(1.1);
    background: #fff;
}

.corpus {
    position: absolute;
    bottom: 0;
    width: 80vh;
    height: 50vh;
    background: radial-gradient(#008068, #006653);
    border-radius: 40vh 40vh 0 0;
    filter: drop-shadow(1vh 1vh 2vh rgba(0, 0, 50, 0.5));
    box-shadow: inset 2vh 2vh 2vh rgba(0, 0, 50, 0.1);
}

.corpus .chain {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -40%);
    width: 30vh;
    height: 50vh;
    border: 2vh solid #ffbb33;
    border-radius: 50%;
    filter: drop-shadow(0 0 2vh rgba(0, 0, 50, 0.05));
    box-shadow: inset 2vh 2vh 2vh rgba(0, 0, 50, 0.1);
}

.corpus .belly {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40vh;
    height: 20vh;
    border-right: 2vh solid rgba(0, 0, 0, 0.25);
    border-left: 2vh solid rgba(0, 0, 0, 0.25);
    border-radius: 20vh 20vh 0 0;
    filter: drop-shadow(2vh 2vh 2vh rgba(0, 0, 50, 0.5));
    box-shadow: inset 2vh 2vh 2vh rgba(0, 0, 50, 0.1);
}

#head {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 16vh;
    width: 40vh;
    height: 60vh;
    background: #008068;
    border-radius: 20vh;
    filter: drop-shadow(1vh 1vh 4vh rgba(0, 0, 50, 0.5));
    box-shadow: inset 2vh 2vh 2vh rgba(0, 0, 50, 0.1);
    transition: 0.8s ease;
    z-index: 1;
}

#head li.slice {
    width: 100%;
    height: 10vh;
}

#head li.slice:first-child {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20vh 20vh 0 0;
    height: 20vh;
}

#head li.slice:first-child .hair {
    position: absolute;
    top: -2vh;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ff3333;
    width: 6vh;
    height: 8vh;
    border-radius: 50%;
    clip-path: polygon(50% 50%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

#head li.slice:first-child .folds {
    height: 1vh;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 2vh;
}

#head li.slice:first-child #fold-1 {
    margin-bottom: 2vh;
    width: 50%;
}

#head li.slice:first-child #fold-2 {
    width: 25%;
}

#head li.slice:nth-child(2) {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

#head li.slice:nth-child(2) .eyebrows {
    position: absolute;
    background: red;
    width: 20vh;
    height: 20vh;
    transform: rotate(45deg);
}

#head li.slice:nth-child(2) .ears {
    position: absolute;
    top: 0;
    height: 10vh;
    width: 4vh;
    transition: 0.8s ease;
    box-shadow: inset 0 0 2vh rgba(0, 0, 50, 0.5);
}

#head li.slice:nth-child(2) .ears:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "";
    width: 1vh;
    height: 6vh;
}

#head li.slice:nth-child(2) .ears#ear-l {
    left: 0;
    transform: translateX(-100%);
    border-right: 0.5vh solid rgba(0, 0, 0, 0.25);
    border-radius: 5vh 5vh 5vh 10vh;
    background: #008068;
}

#head li.slice:nth-child(2) .ears#ear-l:before {
    border: 0.5vh solid rgba(0, 0, 0, 0.25);
    border-right: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 5vh 5vh 5vh 10vh;
}

#head li.slice:nth-child(2) .ears#ear-r {
    right: 0;
    transform: translateX(100%);
    border-left: 0.5vh solid rgba(0, 0, 0, 0.25);
    border-radius: 5vh 5vh 10vh 5vh;
    background: #008068;
}

#head li.slice:nth-child(2) .ears#ear-r:before {
    border: 0.5vh solid rgba(0, 0, 0, 0.25);
    border-left: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 5vh 5vh 10vh 5vh;
}

#head li.slice:nth-child(2) .eyes {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    width: 10vh;
    background: #ffbb33;
    border: 0.5vh solid rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    transition: 1s ease;
    overflow: hidden;
    transition: 0.8s ease;
}

#head li.slice:nth-child(2) .eyes:before {
    content: "";
    height: 4vh;
    width: 4vh;
    background: #000;
    border-radius: 50%;
    border: 0.5vh solid #550080;
    transition: 0.8s ease;
    filter: drop-shadow(0 0 0.25vh #550080);
    box-shadow: inset 0 0 1vh #32324b;
}

#head li.slice:nth-child(2) .eyes:after {
    content: "";
    position: absolute;
    top: 35%;
    right: 35%;
    height: 1vh;
    width: 1vh;
    background: white;
    border-radius: 50%;
    filter: drop-shadow(0 0 0.25vh #c8c8c8);
    box-shadow: inset 0 0 1vh rgba(120, 120, 120, 0.25);
}

#head li.slice:nth-child(2) .eyes .eyelid {
    position: absolute;
    transform: translateY(-100%);
    width: 40vh;
    height: 40vh;
    background: radial-gradient(#008068, #006653);
    transition: 0.8s ease;
}

#head li.slice:nth-child(3) {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

#head li.slice:nth-child(3) .nose {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 10vh;
    width: 10vh;
    border-top: 1vh solid rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    transition: 0.8s ease;
    filter: drop-shadow(0 1vh 1vh black);
}

#head li.slice:nth-child(3) .nose .hole {
    transform: translateY(-100%);
    width: 2vh;
    height: 2vh;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
}

#head li.slice:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 20vh 20vh;
    height: 20vh;
}

#head li.slice:last-child .mouth {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 24vh;
    height: 12vh;
    background: #005580;
    border-radius: 2vh 2vh 12vh 12vh;
    border: 1vh solid rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transition: 0.8s ease;
    filter: drop-shadow(0 0 2vh rgba(0, 0, 50, 0.2));
    box-shadow: inset 0 0 8vh rgba(0, 0, 0, 0.75);
}

#head li.slice:last-child .mouth .teeth {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 2vh;
}

#head li.slice:last-child .mouth .teeth.top .tooth {
    width: 22%;
    height: 2vh;
    background: #fff;
    border-right: 0.2vh solid rgba(0, 0, 0, 0.25);
    border-bottom: 0.2vh solid rgba(0, 0, 0, 0.25);
    border-left: 0.2vh solid rgba(0, 0, 0, 0.25);
    border-radius: 0.5vh 0.5vh 1vh 1vh;
    filter: drop-shadow(0 0 2vh rgba(0, 0, 0, 0.2));
    box-shadow: inset 0 0 2vh rgba(200, 200, 200, 0.25);
}

#head li.slice:last-child .mouth .teeth.bottom .tooth {
    width: 22%;
    height: 2vh;
    border: 0.2vh solid rgba(0, 0, 0, 0.25);
    background: #fff;
    border-radius: 1vh 1vh 0.5vh 0.5vh;
    filter: drop-shadow(0 0 2vh rgba(0, 0, 0, 0.2));
    box-shadow: inset 0 0 2vh rgba(200, 200, 200, 0.25);
}

#head.happy .eyes {
    transform: scale(1);
}

#head.happy .eyes#eye-l:before {
    transform: scale(1.33);
}

#head.happy .eyes#eye-r:before {
    transform: scale(1.33);
}

#head.Astonished {
    transform: translateY(-4vh);
}

#head.Astonished:first-child .eyes {
    transform: scale(0.75);
}

#head.Astonished .slice:last-child .mouth {
    border-radius: 12vh 12vh 2vh 2vh;
    transform: scale(0.75) rotate(-5deg);
}

#head.feared:nth-child(1) .eyes {
    transform: scale(1.25);
}

#head.feared .slice:last-child .mouth {
    height: 16vh;
    border-radius: 12vh 12vh 8vh 8vh;
}

#head.angry {
    transform: translateY(-4vh) rotate(-5deg);
}

#head.angry:first-child .ears {
    width: 2.5vh !important;
}

#head.angry:first-child .eyes {
    transform: scale(1);
}

#head.angry:first-child .eyes#eye-l {
    clip-path: polygon(30% 0%, 61% 11%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

#head.angry:first-child .eyes#eye-l:before {
    transform: scale(0.75);
    border: 2vh solid #550080;
}

#head.angry:first-child .eyes#eye-r {
    clip-path: polygon(34% 14%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

#head.angry:first-child .eyes#eye-r:before {
    transform: scale(0.75);
    border: 2vh solid #550080;
}

#head.angry:nth-child(1) .nose {
    transform: scale(1.2);
}

#head.angry .slice:last-child .mouth {
    transform: rotate(4deg);
    height: 4vh;
    border-radius: 12vh 12vh 8vh 8vh;
}

#head.anguished {
    transform: translateY(-4vh) rotate(5deg);
}

#head.anguished:nth-child(1) .eyes {
    border: 0.5vh solid #008068 !important;
    transform: scale(1);
}

#head.anguished:nth-child(1) #eye-l {
    transform: scale(1.25);
}

#head.anguished:nth-child(1) #eye-l .eyelid {
    transform: translateY(-62.5%) rotate(-23deg);
}

#head.anguished:nth-child(1) #eye-l .eyelid:before {
    transform: scale(0.75);
}

#head.anguished:nth-child(1) #eye-r {
    transform: scale(0.75);
}

#head.anguished:nth-child(1) #eye-r .eyelid {
    transform: translateY(-62.5%) rotate(23deg);
}

#head.anguished:nth-child(1) #eye-r .eyelid:before {
    transform: scale(0.75);
}

#head.anguished .slice:last-child .mouth {
    height: 12vh;
    border-radius: 4vh 4vh 12vh 12vh;
    transform: rotate(-5deg);
}

#head.tired {
    transform: translateY(8vh);
}

#head.tired:first-child .ears {
    width: 3.5vh !important;
}

#head.tired:first-child .ears#ear-l {
    border-radius: 10vh 5vh 5vh 5vh !important;
}

#head.tired:first-child .ears#ear-l:before {
    border-radius: 10vh 5vh 5vh 5vh !important;
}

#head.tired:first-child .ears#ear-r {
    border-radius: 5vh 10vh 5vh 5vh !important;
}

#head.tired:first-child .ears#ear-r:before {
    border-radius: 5vh 10vh 5vh 5vh !important;
}

#head.tired:first-child .eyes {
    border: 0.5vh solid #008068 !important;
    transform: scale(0.75);
}

#head.tired:first-child .eyes .eyelid {
    z-index: 1;
    border-bottom: 1vh solid rgba(0, 0, 0, 0.25);
    border-radius: 50%;
}

#head.tired:first-child #eye-l .eyelid {
    transform: translateY(-49%);
}

#head.tired:first-child #eye-r .eyelid {
    transform: translateY(-52%);
}

#head.tired .slice:last-child .mouth {
    height: 16vh;
    border-radius: 4vh 4vh 12vh 12vh;
    transform: rotate(-5deg);
}

#head.ondrugs {
    transform: translateY(-4vh);
}

#head.ondrugs:nth-child(1) .eyes {
    transform: scale(1.25);
}

#head.ondrugs:nth-child(1) .eyes#eye-l:before {
    transform: scale(1.75);
    border: 0.3333333333vh solid #550080;
}

#head.ondrugs:nth-child(1) .eyes#eye-r:before {
    transform: scale(1.75);
    border: 0.3333333333vh solid #550080;
}

#head.ondrugs:nth-child(1) .nose {
    transform: scale(0.75);
}

#head.ondrugs .slice:last-child .mouth {
    height: 16vh;
    border-radius: 4vh 4vh 12vh 12vh;
}
</style>
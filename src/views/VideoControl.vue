<template>
    <section class="w-full relative">
        <img class="w-full absolute max-h-screen object-fill" :src="getImageAssets('bg.png')" alt="背景圖">
        <div class="w-full h-screen absolute flex flex-col justify-center items-center p-5 ">
            <div class="mb-5">
                <p class="text-3xl mb-3">在線人數 {{ info.online_amt }}</p>
                <p class="text-3xl">Q5 投A人數 {{ info.Q5_A_amt }}</p>
                <p class="text-3xl mb-3">Q5 投B人數 {{ info.Q5_B_amt }}</p>
                <button
                    class="block border-2 rounded-md bg-green-500 p-3 w-[200px] hover:opacity-80 active:bg-green-600"
                    @click="handleGetInfo">刷新當前資訊</button>
            </div>
            <button class="block border-2 rounded-md bg-red-500 p-3 w-[200px] active:bg-red-600 hover:opacity-80"
                @click="handleReset">重置遊戲</button>
        </div>
        <TransitionGroup class="absolute top-10 left-1/2 translate-x-[-50%]" name="msgList" tag="ul">
            <li v-for="msg, index in msgUl" :key="index" class="text-green-500 text-3xl">{{ msg }}</li>
        </TransitionGroup>
    </section>
</template>

<script setup lang="ts">
import { VideoInfor } from "@/types/video";
import { reset, getInfo } from "../api"
import useUtils from "@/composables/useUtils";
const { getImageAssets } = useUtils()
const info = ref<VideoInfor>({
    online_amt: 0,
    Q5_A_amt: 0,
    Q5_B_amt: 0
})
const msgUl = ref<string[]>([])

onMounted(async () => {
    init()
})

function init() {
    getInfo().then(res => info.value = res)
}
async function handleReset() {
    const wantToreset = confirm("重置將影響整個遊戲進行，確定重置?");
    if(!wantToreset) return
    await reset()
    msgUl.value.push('重置成功!')
     setTimeout(()=>{
        msgUl.value.shift()
    }, 2000)
}
async function handleGetInfo() {
    const infoRes = await getInfo()
    info.value = infoRes
    msgUl.value.push('訊息刷新成功!')
    setTimeout(()=>{
        msgUl.value.shift()
    }, 2000)
}
</script>
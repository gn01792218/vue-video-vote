<template>
    <section class="w-[88%] h-screen relative mx-auto text-center flex flex-col items-center justify-center">
        <p class="text-gary-500">當前關卡{{ videoController.current_video_index + 1 }}</p>
        <div v-if="showButton" class="max-w-[400px]">
            <p class="text-red-500 mb-5">你會怎麼決定呢?!!!</p>
            <p class="text-3xl text-red-500 mb-5">請選擇!</p>
            <button class="border-2 w-[150px] h-[150px] bg-green-500 mb-5" @click="vote(VideoSide.A)">A</button>
            <p class="text-2xl mb-5">還是!</p>
            <button class="border-2 w-[150px] h-[150px] bg-blue-500 " @click="vote(VideoSide.B)">B</button>
        </div>
        <div v-else>
            <p class="text-3xl">
                準備下一次的投票...
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Video, VideoControler, VideoSide, VideoStatus } from "@/types/video";
import { getVIdeoControl, postVote } from "../api"
const currentVideo = ref<Video>()
const currentIndex = computed(()=>{
    return videoController.value.current_video_index
})
const videoController = ref<VideoControler>({
    current_video_index: 0,
    video_status: VideoStatus.STOP
})
const showButton = ref(false)
const hasVoted = ref(false)

onMounted(() => {
    init()
})
watch(currentIndex,()=>{
    //關卡改變時
    showButton.value = false
    hasVoted.value = false
})
watch(videoController,()=>{
   onStatusChange()
})

function init() {
    getVIdeoControl().then(res => videoController.value = res)
    intervalData()
}
async function vote(side: VideoSide) {
    postVote({
        video_index: videoController.value.current_video_index,
        vote_side: side
    })
    showButton.value = false
    hasVoted.value = true
}
function intervalData(){
  setInterval(()=>{
    getVIdeoControl().then(res => videoController.value = res)
    onStatusChange()
  },3000)
}
function onStatusChange() {
    console.log(videoController.value.video_status)
    switch(Number(videoController.value.video_status)){
        case VideoStatus.VOTING:
            showButton.value = true
            console.log('showBtne', showButton.value)
            break
        default:
           showButton.value = false
    }
    console.log(showButton.value)
}
</script>
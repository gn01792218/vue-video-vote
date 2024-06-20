<template>
    <section class="h-screen relative mx-auto text-center flex flex-col items-center justify-center">
        <img class="absolute" :src="getImageAssets('bg.png')" alt="背景圖">
        <div v-if="!currentVIdeo" class="absolute">
            <p class="text-3xl font-bold mb-1">登入成功</p>
            <p class="text-xl mb-5">請稍後片刻</p>
            <p>Login Successfully</p>
            <p>Please wait for a moment</p>
        </div>
        <!-- <p class="text-gary-500">當前關卡{{ Number(videoController.current_video_index) +1 }}</p> -->
        <div v-else-if="showButton" class="flex flex-col items-center absolute">
            <p class="text-3xl font-extrabold text-black">{{ currentVIdeo?.Qstring_C }}</p>
            <p class="text-xl text-gray-600 mb-16">{{ currentVIdeo?.Qstring_E }}</p>
            <button class="text-white w-[300px] h-[200px] bg-orange-500 mb-16 flex flex-col justify-center items-center" @click="vote(VideoSide.A)">
                <p class="text-2xl font-bold mb-2">{{ currentVIdeo?.Btn_A_C }}</p>
                <p>{{ currentVIdeo?.Btn_A_E }}</p>
            </button>
            <button class="text-white w-[300px] h-[200px] bg-green-500 flex flex-col justify-center items-center" @click="vote(VideoSide.B)">
                <p class="text-2xl font-bold mb-2">{{ currentVIdeo?.Btn_B_C }}</p>
                <p>{{ currentVIdeo?.Btn_B_E }}</p>
            </button>
        </div>
        <div v-else class="absolute">
            <p class="text-3xl font-extrabold">
                請繼續觀賞 P&C Showtime
            </p>
            <p>
                Please turn your attention back to the main screen
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Video, VideoControler, VideoSide, VideoStatus } from "@/types/video";
import { getVIdeoControl, postVote, getVideoByIndex, postUserLogin } from "../api"
import useUtils from "@/composables/useUtils";
const { getImageAssets } = useUtils()
const currentIndex = computed(()=>{
    return Number(videoController.value.current_video_index)
})
const currentStatus = computed(()=>{
    return videoController.value.video_status
})
const videoController = ref<VideoControler>({
    current_video_index: 0,
    video_status: VideoStatus.STOP
})
const currentVIdeo = ref<Video | null>(null)
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
watch( currentStatus,()=>{
    if(currentStatus.value === VideoStatus.VOTING){
        getVideoByIndex(videoController.value.current_video_index).then(res=>currentVIdeo.value = res)
    }
})
watch(videoController,()=>{
   onStatusChange()
})

function init() {
    postUserLogin()
    getVIdeoControl().then(res => videoController.value = res)
    intervalData()
}
async function vote(side: VideoSide) {
    postVote({
        video_index: Number(videoController.value.current_video_index),
        vote_side: side
    })
    showButton.value = false
    hasVoted.value = true
}
function intervalData(){
  setInterval(()=>{
    getVIdeoControl().then(res => videoController.value = res)
    onStatusChange()
  },2000)
}
function onStatusChange() {
    switch(Number(videoController.value.video_status)){
        case VideoStatus.VOTING:
            if(hasVoted.value) return
            // if(Number(videoController.value.current_video_index) === 4) return
            showButton.value = true
            break
        default:
           showButton.value = false
    }
}
</script>
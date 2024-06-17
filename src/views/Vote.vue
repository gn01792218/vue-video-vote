<template>
    <section class="w-[88%] h-screen relative mx-auto text-center flex flex-col items-center justify-center">
        <p class="text-gary-500">當前關卡{{ videoController.current_video_index + 1 }}</p>
        <div v-if="showButton && videoController.video_status === VideoStatus.VOTING" class="max-w-[400px]">
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
import { getCurrentVideo, getVIdeoControl, postVote } from "../api"
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
    getCurrentVideo().then(res => currentVideo.value = res)
    getVIdeoControl().then(res => videoController.value = res)
    intervalData()
}
function vote(side: VideoSide) {
    if (!currentVideo.value) return alert('找不到當前影片')
    //這裡最好也請求一下當下的影片currentId
    postVote({
        video_id: currentVideo.value?.id!,
        vote_side: side
    })
    showButton.value = false
    hasVoted.value = true
}
function intervalData(){
  setInterval(()=>{
    getCurrentVideo().then(res => currentVideo.value = res)
    getVIdeoControl().then(res => videoController.value = res)
  },3000)
}
function onStatusChange() {
    console.log(videoController.value.video_status)
    if (videoController.value.video_status === VideoStatus.VOTING) {
        videoController.value.video_status = VideoStatus.STOP
        showButton.value = false
        console.log('把按鈕改成false')
    }else {
        videoController.value.video_status = VideoStatus.VOTING
        showButton.value = false
        console.log('把顯示按鈕改成true')
    }
    console.log('onStatusChange完畢')
}
</script>
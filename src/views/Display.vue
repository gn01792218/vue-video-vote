<template>
    <section class="w-full bg-black">
        <div id="fullScreen" class="w-[88%] relative mx-auto">
            <!-- <p>
                當前關卡 :
                {{ Number(videoControler.current_video_index) + 1 }}
            </p> -->
            <video ref="videoElement" @play="fullScreen" class="w-full" autoplay controls muted
                :src="currentVideo ? currentVideo.url : ''">
            </video>
            <div v-show="showVoteInfo"
                class="w-[80%] absolute bottom-[30%] left-1/2 translate-x-[-50%] flex justify-between">
                <div class="text-orange-500 display-text">
                    <p class="">{{ currentVideo?.vote_A }}</p>
                </div>
                <div class="text-green-500 display-text">
                    <p class="">{{ currentVideo?.vote_B }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { getVIdeoControl, postVIdeoControl, getVideoByIndex } from '../api'
import { VideoStatus, type Video, type VideoControler } from '../types/video';
import screenfull from 'screenfull';
const videoElement = ref<HTMLVideoElement | null>(null)
const currentVideo = ref<Video | null>(null)
const videoControler = ref<VideoControler>({
    current_video_index: 0,
    video_status: VideoStatus.STOP
})
const votingProgress = ref(89) //幾%的時候要呈現投票
const isBranchVideo = computed(() => {
    return currentVideo.value?.url.includes('A.mp4') || currentVideo.value?.url.includes('B.mp4')
})
const currentTime = ref(0)
const showVoteInfo = ref(false)
const showInfoInterval = ref<NodeJS.Timer | null>(null)
const last_video_Index = ref(4) //第幾支影片是最後一支影片

const videoProgress = computed(() => {
    if (!videoElement.value) return 0
    return (currentTime.value / videoElement.value?.duration) * 100
})
onMounted(async () => {
    init()
})
watch(currentTime, () => {
    setVotingProgress()
    setStatus()
    detechShowVoteInfo();
    if (videoControler.value.video_status === VideoStatus.VOTED) onVideoVoteComplete()
    if (videoControler.value.video_status === VideoStatus.BRANCHVIDEOCOMPLETE) onBranchVideoComplete()
})
async function init() {
    const video = await getVideoByIndex(videoControler.value.current_video_index)
    const videoControl = await getVIdeoControl()
    registerVideoTimeUpdate()
    videoControler.value = videoControl
    currentVideo.value = video
    playVideo()
}
function setVotingProgress() { //設置個關卡要顯示投票的%數
    switch (videoControler.value.current_video_index) {
        case 1:
            votingProgress.value = 85
            break
        case 2:
            votingProgress.value = 79
            break
        case 3:
            votingProgress.value = 97
            break
        case 4:
            votingProgress.value = 32
            break
    }
}
function setStatus() { //修改狀態以及通知server
    if (videoProgress.value > 42 && videoControler.value.current_video_index === last_video_Index.value) {  //最後一支影片要設置的關閉投票顯示
        if (videoControler.value.video_status === VideoStatus.BRANCHVIDEOCOMPLETE) return
        showVoteInfo.value = false
        videoControler.value.video_status = VideoStatus.BRANCHVIDEOCOMPLETE
        postVIdeoControl({
            current_video_index: videoControler.value.current_video_index,
            video_status: VideoStatus.BRANCHVIDEOCOMPLETE
        })
    }
    if (videoProgress.value >= votingProgress.value && videoProgress.value < 100 && !isBranchVideo.value) {
        if (videoControler.value.video_status >= VideoStatus.VOTING) return //已經是投票狀態就不需要再改了
        console.log('投票中，前一個狀態為', videoControler.value.video_status)
        videoControler.value.video_status = VideoStatus.VOTING
        postVIdeoControl({
            current_video_index: videoControler.value.current_video_index,
            video_status: VideoStatus.VOTING
        })
    }
    if (videoProgress.value === 100 && !isBranchVideo.value) {
        if (videoControler.value.video_status >= VideoStatus.VOTED) return //已經是投票狀態就不需要再改了
        console.log('投票完了，前一個狀態為', videoControler.value.video_status)
        videoControler.value.video_status = VideoStatus.VOTED
        postVIdeoControl({
            current_video_index: videoControler.value.current_video_index,
            video_status: VideoStatus.VOTED
        })
    }
    if (videoProgress.value === 100 && isBranchVideo.value) {
        if (videoControler.value.video_status >= VideoStatus.BRANCHVIDEOCOMPLETE) return //已經播完分支影片就不需要再改了
        console.log('分支影片播完了，前一個狀態為', videoControler.value.video_status)
        videoControler.value.video_status = VideoStatus.BRANCHVIDEOCOMPLETE

        postVIdeoControl({
            current_video_index: videoControler.value.current_video_index,
            video_status: VideoStatus.BRANCHVIDEOCOMPLETE
        })
    }
}
function detechShowVoteInfo() {
    if (videoControler.value.video_status === VideoStatus.VOTING) { //投票的時候
        if (showInfoInterval.value) return //已經有interval就不要再設置了
        showVoteInfo.value = true;
        showInfoInterval.value = setInterval(() => {
            getVideoByIndex(videoControler.value.current_video_index).then(res => currentVideo.value = res)
        }, 1000)
        console.log('為了獲取投票資料，設置Intaval')
    }
    else {
        //非投票的時候
        showVoteInfo.value = false
        if (!showInfoInterval.value) return
        clearInterval(showInfoInterval.value)
        showInfoInterval.value = null
        console.log('投票完了，清除Intaeval')
    }
}
function playVideo() {
    if (!videoElement.value) return
    if(!videoElement.value.paused) return 
    stopVIdeo() 
    videoElement.value.play()
    videoElement.value.muted = false
}
function stopVIdeo(){
    if(!videoElement.value) return 
    videoElement.value?.pause()
    videoElement.value.currentTime = 0;
}
function onVideoVoteComplete() {
    if (!currentVideo.value) return alert('找不到當前的影片資料!')
    const { vote_A, vote_B, branch_A_url, branch_B_url } = currentVideo.value
    if (vote_A > vote_B) currentVideo.value.url = branch_A_url
    else if (vote_A === vote_B) currentVideo.value.url = branch_B_url
    else currentVideo.value.url = branch_B_url
    console.log(`播放${videoControler.value.current_video_index}分支影片，此時狀態${videoControler.value.video_status}`)
    playVideo()
}
async function onBranchVideoComplete() {
    if (videoControler.value.current_video_index === last_video_Index.value) return //最後一關的時候不要再往下撥了
    videoControler.value.current_video_index = Number(videoControler.value.current_video_index) + 1 //播下一部
    videoControler.value.video_status = VideoStatus.STOP
    postVIdeoControl({
        current_video_index: videoControler.value.current_video_index,
        video_status: VideoStatus.STOP
    })
    //進入下一關
    const video = await getVideoByIndex(videoControler.value.current_video_index)
    // const control = await getVIdeoControl()
    currentVideo.value = video //更新下一關的video
    // videoControler.value = control  //更新controler的狀態
    console.log('撥放下一關影片', videoControler.value.current_video_index, '此時狀態', videoControler.value.video_status)
    playVideo()
}
function registerVideoTimeUpdate() {
    videoElement.value?.addEventListener('timeupdate', () => {
        if (!videoElement.value) return
        currentTime.value = videoElement.value.currentTime
    })
}
function fullScreen(){
    if(screenfull.isEnabled){
        const f = document.getElementById('fullScreen')
        if(f)screenfull.request(f)
        console.log('全螢幕',f)
    }
}
</script>
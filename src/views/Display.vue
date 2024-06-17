<template>
    <section class="w-[88%] relative mx-auto">
        <p>
            當前關卡 :
            {{ videoControler.current_video_index +1 }}
        </p>
        <video ref="videoElement" class="w-full " autoplay controls muted :src="currentVideo? currentVideo.url : ''">
        </video>
        <div v-show="showVoteInfo" class="w-[80%] absolute bottom-1/4 left-1/2 translate-x-[-50%] flex justify-between">
            <div class="bg-red-500/40 text-3xl p-1 text-center">
                <p>A</p>
                <p>{{ currentVideo?.vote_A }} 人</p>
            </div>
            <div class="bg-blue-500/40 text-3xl p-1 text-center">
                <p>B</p>
                <p>{{ currentVideo?.vote_B }}人</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// import { videos, videoControl } from '../assets/data/video'
import { getCurrentVideo, getVIdeoControl } from '../api'
import { VideoStatus, type Video, type VideoControler } from '../types/video';
const videoElement = ref<HTMLVideoElement | null>(null)
const currentVideo = ref<Video| null>(null)
const videoControler = ref<VideoControler>({
    current_video_index:0,
    video_status:VideoStatus.STOP
})
const isBranchVideo = computed(()=>{
    return currentVideo.value?.url.includes('A.mp4') || currentVideo.value?.url.includes('B.mp4')
})
const currentTime = ref(0)
const showVoteInfo = ref(false)

const videoProgress = computed(()=>{
    if(!videoElement.value) return 0
    return (currentTime.value/videoElement.value?.duration)*100
})
onMounted(async()=>{
    init()
})
watch(videoControler,()=>{

})
watch(currentTime,()=>{
    setStatus()
    detechShowVoteInfo();
    if (videoControler.value.video_status === VideoStatus.VOTED ) onVideoVoteComplete()
    if( videoControler.value.video_status === VideoStatus.BRANCHVIDEOCOMPLETE ) onBranchVideoComplete()
})
function setStatus(){
    if( videoProgress.value >= 87 && !isBranchVideo.value) videoControler.value.video_status = VideoStatus.VOTING
    if( videoProgress.value === 100 && !isBranchVideo.value) videoControler.value.video_status = VideoStatus.VOTED
    if( videoProgress.value === 100 && isBranchVideo.value ) videoControler.value.video_status = VideoStatus.BRANCHVIDEOCOMPLETE
    //暫時的
    if(videoProgress.value >50 && currentVideo.value) {
        currentVideo.value.vote_A = 5
    }
}
function detechShowVoteInfo() {
  if(videoControler.value.current_video_index === 4) return 
  if(videoControler.value.video_status === VideoStatus.VOTING) //投票狀態下才顯示
    showVoteInfo.value=true;
  else
    showVoteInfo.value=false;
}

async function init(){
    const video = await getCurrentVideo()
    const videoControl = await getVIdeoControl()
    intavlVideoAndControl()
    registerVideoTimeUpdate()
    // const video = videos[0] //暫時的
    videoControler.value = videoControl
    currentVideo.value = video
    playVideo()
}
function playVideo(){
    if(!videoElement.value) return 
    videoElement.value.play()
    videoElement.value.muted = false
}
function registerVideoTimeUpdate(){
    videoElement.value?.addEventListener('timeupdate', ()=>{
        if(!videoElement.value) return 
        currentTime.value = videoElement.value.currentTime
    })
}
function intavlVideoAndControl(){
    setInterval(async()=>{
       getCurrentVideo().then(res=>currentVideo.value = res)
       getVIdeoControl().then(res=>videoControler.value = res)
    }, 3000)
}
function onVideoVoteComplete(){
    if(!currentVideo.value) return alert('找不到當前的影片資料!')
    const { vote_A, vote_B, branch_A_url, branch_B_url } = currentVideo.value
    if(vote_A > vote_B) currentVideo.value.url = branch_A_url
    else if(vote_A === vote_B) currentVideo.value.url = branch_B_url
    else currentVideo.value.url = branch_B_url
    playVideo()
    console.log('呼叫主video vote完成完成')
}
async function onBranchVideoComplete(){
    //進入下一關
    // const video = await getCurrentVideo()
    // currentVideo.value = video
    // monckPlayNextVideo()  
    playVideo()
    console.log('呼叫分支影片完成')
}
// function monckPlayNextVideo(){ //暫時的
//     videoControler.value = {
//         current_video_index:videoControler.value.current_video_index+1,
//         video_status:VideoStatus.STOP
//     }
//     currentVideo.value = videos[videoControler.value.current_video_index]
// }
</script>
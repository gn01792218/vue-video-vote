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
import { getCurrentVideo, getVIdeoControl, postVIdeoControl } from '../api'
import { VideoStatus, type Video, type VideoControler } from '../types/video';
const videoElement = ref<HTMLVideoElement | null>(null)
const currentVideo = ref<Video| null>(null)
const videoControler = ref<VideoControler>({
    current_video_index:0,
    video_status:VideoStatus.STOP
})
const currentVIdeoVoteing = computed(()=>{
    return currentVideo.value && (currentVideo.value?.vote_A>0 || currentVideo.value.vote_B>0)
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
function setStatus(){ //修改狀態以及通知server
    if( videoProgress.value >= 87 && !isBranchVideo.value) {
        videoControler.value.video_status = VideoStatus.VOTING
        postVIdeoControl({
            current_video_index:videoControler.value.current_video_index,
            video_status:VideoStatus.VOTING
        })
    }
    if( videoProgress.value === 100 && !isBranchVideo.value) {
        videoControler.value.video_status = VideoStatus.VOTED
        postVIdeoControl({
            current_video_index:videoControler.value.current_video_index,
            video_status:VideoStatus.VOTED
        })
    }
    if( videoProgress.value === 100 && isBranchVideo.value ) {
        videoControler.value.video_status = VideoStatus.BRANCHVIDEOCOMPLETE
        postVIdeoControl({
            current_video_index:videoControler.value.current_video_index,
            video_status:VideoStatus.BRANCHVIDEOCOMPLETE
        })
    }
}
function detechShowVoteInfo() {
  if(videoControler.value.current_video_index === 4) return 
  if(videoControler.value.video_status === VideoStatus.VOTING && currentVIdeoVoteing.value) //投票狀態下才顯示
    showVoteInfo.value=true;
  else
    showVoteInfo.value=false;
}
function playVideo(){
    if(!videoElement.value) return 
    videoElement.value.play()
    videoElement.value.muted = false
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
    const video = await getCurrentVideo()
    const control = await getVIdeoControl()
    currentVideo.value = video //更新下一關的video
    videoControler.value = control  //更新controler的狀態
    playVideo()
}
function registerVideoTimeUpdate(){
    videoElement.value?.addEventListener('timeupdate', ()=>{
        if(!videoElement.value) return 
        currentTime.value = videoElement.value.currentTime
    })
}
function intavlVideoAndControl(){
    setInterval(async()=>{
    //    getCurrentVideo().then(res=>currentVideo.value = res)
    //    getVIdeoControl().then(res=>videoControler.value = res)
    }, 3000)
}
</script>
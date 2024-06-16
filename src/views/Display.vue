
<template>
    <section class="w-[88%] relative mx-auto">
        <video ref="videoElement" class="w-full " autoplay controls muted :src="currentVideo? currentVideo.url : ''">
        </video>
        <div class="w-[80%] absolute bottom-1/4 left-1/2 translate-x-[-50%] flex justify-between">
            <div class="bg-red-500/40 text-3xl p-1 text-center">
                <p>A</p>
                <p>25人</p>
            </div>
            <div class="bg-blue-500/40 text-3xl p-1 text-center">
                <p>B</p>
                <p>18人</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { getCurrentVideo } from '../api'
import type { Video } from '../types/video';
const videoElement = ref<HTMLVideoElement | null>(null)
const currentVideo = ref<Video| null>(null)

const videoProgress = computed(()=>{
    if(!videoElement.value) return 0
    return (videoElement.value?.currentTime/videoElement.value?.duration)*100
})
onMounted(async()=>{
    init()
})
watch(videoProgress,()=>{
    console.log(videoProgress.value)
})
async function init(){
    // const video = await useFetch('/api/video/currentVideo')
    // // currentVideo.value = video
    // console.log(video)
    const videos = await getCurrentVideo()
    console.log(videos)
    // if(videoElement.value) videoElement.value.src = video.url
    playVideo(videoElement.value!)
}
function playVideo(video:HTMLVideoElement){
    video.play()
    video.muted = false
    console.log('撥放', video.src)
}

</script>
<template>
  <main class="h-screen relative">
    <section class="h-[10%] bg-slate-500 flex justify-center items-center">
      <h1 class="text-5xl text-white">2023華字輩年度尾牙感恩晚宴</h1>
      <button type="button"
        class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        @click="openKeywordInputModal">
        關鍵字搜尋
      </button>
      <button :disabled="lotteryBtndisabled || disableLottery" type="button"
        class="disabled:bg-slate-600 disabled:text-slate-500 disabled:border-0 disabled:animate-none  w-[100px] h-[50px] border-2 animate-bounce border-blue-500 bg-blue-800 ml-5 text-white rounded-xl"
        @click="playLottery">抽 {{ lotteryList[currentLotteryIndex].name }} </button>
    </section>
    <section class="flex w-full h-[90%] items-center bg-slate-500">
      <aside class="w-[10%] h-full">
        <LotteryList :lottery-list="lotteryList" />
      </aside>
      <section id="lottery-area" class="bg-slate-600 w-[90%] h-full flex overflow-hidden relative">
        <div v-show="showWinAnimation" class="absolute top-0 w-full h-full z-[100]">
          <img class="w-full h-full" :src="getImageAssets('winAnimation.gif')" alt="得獎動畫">
        </div>
        <UserNewsTicker class="absolute top-0" v-show="showUserNewsTicker" :each-list-user-number="userBarRows"
          :news-ticker-number="userBarCols" :user-list="userList" />
        <LotteryModal :lotter-owner="ownerName" :lottery-name="lotteryList[currentLotteryIndex].name" />
        <UserListBar :id="`userBar-${index}`" v-for="index in userBarCols" :key="index" :rows="userBarRows"
          :user-list="sliceUserList(index - 1)" :style='`width: ${100 / userBarCols}%;`' />
      </section>
      <KeywordInputModal />
    </section>
  </main>
  <LoadingBackDrop v-show="loading" class="absolute w-screen h-screen top-0" />
</template>
<script setup lang="ts">
import { postLotteryReport } from "@/api"
import { storeToRefs } from 'pinia';
import { useLotteryStore } from '@/store/useLotteryStore';
import { useUserStore } from '@/store/useUserStore'
import useUtils from "@/composables/useUtils"
import UserListBar from '@/component/UserListBar.vue'
import LotteryList from "@/component/LotteryItemList.vue"
import LotteryModal from '@/component/LotteryModal.vue';
import UserNewsTicker from '@/component/UserNewsTicker.vue';
import KeywordInputModal from '@/component/KeywordInput.vue'
import LoadingBackDrop from "@/component/LoadingBackDrop.vue"
import {
  Animate,
  Modal,
  initTE
} from "tw-elements";
import { useLoadingStore } from '@/store/useLoadingStore';
initTE({ Animate });

//Pinia
const { lotteryList } = storeToRefs(useLotteryStore())
const { loadLotteryList } = useLotteryStore()
const { loading } = storeToRefs(useLoadingStore())
const { userList } = storeToRefs(useUserStore())

//composable
const { getImageAssets, randomInRange } = useUtils()

//基本資料
const userBarCols = 10
const userBarRows = 20
const showUserNewsTicker = ref(false)
const showWinAnimation = ref(false)
const disableLottery = ref(false)
const lotteryBtndisabled = computed(() => {
  let disable
  if (!userList.value.length) disable = true
  if (currentLotteryIndex.value > lotteryList.value.length - 1) disable = true 
  return disable
})

//抽獎資訊
const ownerName = ref('')
const currentLotteryIndex = ref(0)

//function
async function playLottery() {
  if (disableLottery.value) return
  showUserNewsTicker.value = true
  disableLottery.value = true
  await new Promise<boolean>((res, rej) => { //彩帶開噴
    setTimeout(() => {
      showWinAnimation.value = true
      res(true)
    }, 2000)
  })
  getLotteryOwner()
  await new Promise<boolean>((res, rej) => { //彈出中獎視窗
    setTimeout(() => {
      const myModal = new Modal(document.getElementById("lotteryModal"));
      myModal.show()
      showUserNewsTicker.value = false
      res(true)
    }, 1000)
  })
  await new Promise<boolean>((res, rej) => {  //關閉彩帶、準備抽下一獎
    setTimeout(() => {
      showWinAnimation.value = false
      //2.準備抽下一獎
      if(currentLotteryIndex.value === lotteryList.value.length-1) return //到底了就不要再開啟按鈕了
      disableLottery.value = false //開啟下一次的按鈕
      currentLotteryIndex.value++
      res(true)
    }, 5000)
  })
}
async function getLotteryOwner() {
  //1.先從userList中選出一人
  const index = randomInRange(0, userList.value.length - 1)
  const { id, name } = userList.value[index]
  const { name:lotteryName } = lotteryList.value[currentLotteryIndex.value]
  ownerName.value = name
  //2.儲存到Data中
  lotteryList.value[currentLotteryIndex.value].owners.push({ id, name })
  //3.儲存到DB
  await postLotteryReport({
    ownerName:name,
    lotteryName,
    date:new Date()
  })
}
function openKeywordInputModal() {
  const myModal = new Modal(document.getElementById("keywordInputModal"));
  myModal.show()
}
function sliceUserList(index: number) {
  // console.log('原本的userList',userList)
  // console.log('擷取的起始', userBarRows * index , '擷取的末端',userBarRows*index + userBarRows)
  const list = userList.value.slice(userBarRows * index, userBarRows * index + userBarRows)
  // console.log('新的清單',list)
  return list
}
</script>

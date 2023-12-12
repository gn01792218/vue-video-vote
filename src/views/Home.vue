<template>
  <main class="h-screen relative">
    <section class="h-[10%] bg-slate-500 flex justify-center items-center">
      <h1 class="text-5xl text-white">XX公司尾牙大樂透</h1>
      <button type="button"
        class="w-[100px] h-[50px] border-2 animate-bounce border-blue-500 bg-blue-800 ml-5 text-white rounded-xl"
        @click="play">抽獎</button>
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
        <LotteryModal />
        <UserListBar :id="`userBar-${index}`" v-for="index in userBarCols" :key="index" :rows="userBarRows"
          :user-list="userList.slice(userBarRows * index, userBarRows * index + userBarRows)"
          :style='`width: ${100 / userBarCols}%;`' />
      </section>
    </section>
  </main>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLotteryStore } from '@/store/useLotteryStore';
import { useUserStore } from '@/store/useUserStore'
import useUtils from "@/composables/useUtils"
import UserListBar from '@/component/UserListBar.vue'
import LotteryList from "@/component/LotteryItemList.vue"
import LotteryModal from '@/component/LotteryModal.vue';
import UserNewsTicker from '@/component/UserNewsTicker.vue';
import {
  Animate,
  Modal,
  initTE
} from "tw-elements";
initTE({ Animate });

//Pinia
const { lotteryList } = storeToRefs(useLotteryStore())
const { loadLotteryList } = useLotteryStore()
const { userList } = storeToRefs(useUserStore())
const { loadUserList } = useUserStore()

//composable
const { getImageAssets } = useUtils()

//基本資料
const userBarCols = 10
const userBarRows = 20
const showUserNewsTicker = ref(false)
const showWinAnimation = ref(false)
//初始化
for (let i = 0; i <= 10; i++) {
  loadUserList()
}
loadLotteryList()

//function
async function play() {
  showUserNewsTicker.value = true
   await new Promise<boolean>((res,rej)=>{ //彩帶開噴
    setTimeout(() => {
      showWinAnimation.value = true
      res(true)
    }, 2000)
  })
  await new Promise<boolean>((res,rej)=>{ //彈出中獎視窗
    setTimeout(() => {
      const myModal = new Modal(document.getElementById("lotteryModal"));
      myModal.show()
      showUserNewsTicker.value = false
      res(true)
    }, 1000)
  })
   await new Promise<boolean>((res,rej)=>{  //關閉彩帶
    setTimeout(() => {
      showWinAnimation.value = false
      res(true)
    }, 5000)
  })
}
</script>

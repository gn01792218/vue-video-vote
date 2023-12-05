<template>
  <main class="h-screen">
    <section class="h-[10%] bg-slate-500 flex justify-center items-center">
      <h1 class="text-5xl">XX公司尾牙大樂透</h1>
      <button type="button" class="w-[100px] h-[50px] border-2 animate-bounce border-blue-500 bg-blue-800 ml-5 text-white rounded-xl" @click="play">抽獎</button>
    </section>
    <section class="flex w-full h-[90%]">
      <aside class="w-[10%] h-full">
        <LotteryList :lottery-list="lotteryList" />
      </aside>
      <section class="bg-slate-600 w-[90%] h-full flex">
        <UserListBar v-for="index in userBarCols" :key="index" :rows="userBarRows"
          :user-list="userList.slice(userBarRows * index, userBarRows * index + userBarRows)" 
          :style='`width: ${100/userBarCols}%;`'
          />
      </section>
    </section>
  </main>
  <LotteryModal />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLotteryStore } from '@/store/useLotteryStore';
import { useUserStore } from '@/store/useUserStore'
import UserListBar from '@/component/UserListBar.vue'
import LotteryList from "@/component/LotteryItemList.vue"
import LotteryModal from '@/component/LotteryModal.vue';
import {
  Modal,
} from "tw-elements";

//Pinia
const { lotteryList } = storeToRefs(useLotteryStore())
const { loadLotteryList } = useLotteryStore()
const { userList } = storeToRefs(useUserStore())
const { loadUserList } = useUserStore()

//基本資料
const userBarCols = 10
const userBarRows = 20
//初始化
for (let i = 0; i <= 10; i++) {
  loadUserList()
}
loadLotteryList()

//function
function play() {
  const myModal = new Modal(document.getElementById("lotteryModal"));
  myModal.show()
}
</script>

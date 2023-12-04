<template>
  <main class="h-screen">
    <section class="h-[10%] bg-slate-500 flex justify-center items-center">
      <h1 class="text-5xl">XX公司尾牙大樂透</h1>
      <button class="border-2" @click="play">抽獎</button>
    </section>
    <section class="flex w-100 h-[90%]">
      <aside class="w-[10%] h-full">
        <LotteryList
          :lottery-list="lotteryList"
        />
      </aside>
      <section class="bg-slate-600 w-[90%] h-full flex">
        <UserListBar
          :class="[`w-[${100/userBarCols}%]`]"
          v-for="index in userBarCols" :key="index"
          :rows="userBarRows"
          :user-list="userList.slice(userBarRows*index,userBarRows*index+userBarRows)"
        />
      </section>
    </section>
  </main>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLotteryStore } from '@/store/useLotteryStore';
import { useUserStore } from '@/store/useUserStore'
import UserListBar from '@/component/UserListBar.vue'
import LotteryList from "@/component/LotteryItemList.vue"

//Pinia
const { lotteryList } = storeToRefs(useLotteryStore())
const { loadLotteryList } = useLotteryStore()
const { userList } = storeToRefs(useUserStore())
const { loadUserList } = useUserStore()

//基本資料
const userBarCols = 20
const userBarRows = 10
//初始化
for(let i = 0 ; i<10; i++ ){
  loadUserList()
}
loadLotteryList()

//function
function play(){
  alert('抽獎')
}
</script>

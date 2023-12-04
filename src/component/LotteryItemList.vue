<template>
    <ul class="bg-red-500 h-full overflow-scroll">
        <li v-for="lotteryItem in lotteryList" :key="lotteryItem.id" class="flex" :class="[`h-[${100/lotteryList.length}%]`]">
            <div class="h-full flex">
                <p class="mr-1">{{ lotteryItem.name }}</p>
                <ul class="h-full overflow-hidden">
                    <li v-for="owner in lotteryItem.owners" :key="owner.id">
                        <p>{{ owner.name }}</p>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { LotteryItem } from "@/types/lottery"
defineProps<{
    lotteryList: LotteryItem[]
}>()
</script>
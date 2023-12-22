<template>
    <section id="newsTickerArea" class="w-full h-full overflow-hidden">
        <div class="newsTicker w-full h-[100px] flex" :id="`newsTicker-${number}`" v-for="number in newsTickerNumber" :key="`newsTicker-${number}`" v-show="sliceUser(number-1).length">
            <ul class="list flex bg-red-200 whitespace-nowrap newsTickerAnimate items-center">
                <li class="mr-5 text-5xl" 
                    v-for="user,index in sliceUser(number-1)" :key="user.id"
                ><span :class="[index%2 ===0 ? 'text-stroke':'']">
                    {{ user.name }}
                </span>
            </li>
            </ul>
            <ul class="fake-list flex bg-red-200 whitespace-nowrap newsTickerAnimate2 items-center">
                <li class="mr-5 text-5xl"
                    v-for="user,index in sliceUser(number-1)" :key="user.id"
                >
                <span :class="[index%2 ===0 ? 'text-stroke':'']">
                    {{ user.name }}
                </span>
            </li>
            </ul>
        </div>
    </section>    
</template>

<script setup lang="ts">
import { User } from "@/types/user"
const props = defineProps<{
    newsTickerNumber:number,  //頂多10條?
    eachListUserNumber:number, //每個名單有多少人
    userList:User[]
}>()
function sliceUser(index:number){
    return props.userList.slice(props.eachListUserNumber * index , props.eachListUserNumber*(index) + props.eachListUserNumber) 
}

</script>
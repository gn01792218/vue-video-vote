<template>
    <ul class="even:bg-slate-400">
        <li class=" border-b-2 border-b-slate-400 flex items-center justify-center" :style="`height:${100/rows}%`" v-for="user in userList" :key="user.id"
        ><p class="overflow-hidden text-ellipsis whitespace-nowrap">
            {{ user.name }}
        </p>
    </li>
    </ul>
</template>

<script setup lang="ts">
import { User } from "@/types/user"
defineProps<{
    rows:number,
    userList:User[]
}>()
</script>